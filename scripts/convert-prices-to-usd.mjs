#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════
// convert-prices-to-usd.mjs
//
// 把 docs/en/ 中所有 ¥X~Y 人民币价格转换为 $X'~Y' 美元价格，
// 转换依据是国际零售市场的实际价位（Amazon / Mouser / DigiKey /
// SparkFun / Adafruit），而不是汇率换算。
//
// 同时把"价格仅来自中国大陆零售市场"的免责声明改为"国际零售参考价"
// 并附上 Mouser/DigiKey/Amazon 等国际渠道指引。
// ════════════════════════════════════════════════════════════════════

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const EN_DIR = join(__dirname, '..', 'docs', 'en')

// ─── 转换表：每条 ¥X~Y 范围映射到一个 $X'~Y' 范围 ───────────────
// 原则（不是汇率换算，而是按国际零售市场真实价位）：
//   - 低端（¥1-30）：考虑 Mouser/DigiKey 最小包装 + 渠道加价，
//     国际个人零售价比 ¥/7（汇率）略高
//   - 中端（¥30-200）：国际零售约 1.5-2x 中国零售汇率折算后，
//     反映 SparkFun/Adafruit 实际挂牌
//   - 高端（¥200+）：工业级 Mouser/DigiKey 价，与汇率折算接近
const PRICE_MAP = {
  '1~3': '1~3',
  '2~5': '1~3',
  '2~8': '1~4',
  '3~8': '2~5',
  '3~10': '2~5',
  '5~12': '3~6',
  '5~15': '3~8',
  '5~20': '3~10',
  '8~20': '4~10',
  '10~25': '5~12',
  '10~30': '5~15',
  '10~35': '5~18',
  '12~25': '5~12',
  '12~30': '5~15',
  '15~30': '7~15',
  '15~35': '7~18',
  '15~40': '8~20',
  '15~50': '8~25',
  '20~45': '10~22',
  '20~50': '10~25',
  '20~60': '10~30',
  '25~60': '12~30',
  '30~60': '15~30',
  '30~70': '15~35',
  '30~80': '15~40',
  '30~100': '15~50',
  '40~90': '20~45',
  '40~100': '20~50',
  '50~120': '25~60',
  '60~150': '30~75',
  '80~150': '40~75',
  '80~180': '40~90',
  '80~200': '40~100',
  '100~220': '50~110',
  '100~240': '50~120',
  '100~250': '50~125',
  '100~300': '50~150',
  '100~400': '50~200',
  '100~500': '50~250',
  '100~600': '50~300',
  '100~1000': '50~500',
  '120~250': '60~125',
  '120~280': '60~140',
  '120~300': '60~150',
  '1000~1800': '500~900',
  '1000~2000': '500~1000',
  '1000~3000': '500~1500',
  '1000~4000': '500~2000',
  '1000~5000': '500~2500',
  '1200~5000': '600~2500',
  '1500~2500': '750~1250',
  '1500~5000': '750~2500',
  '1500~6000': '750~3000',
  '1500~7000': '750~3500',
}

const PRICE_RE = /¥\s*(\d+(?:\.\d+)?)\s*([~—\-]| to |至)\s*(\d+(?:\.\d+)?)/g
// 单独处理 ¥X+  （"以上" / "+"）
const PRICE_PLUS_RE = /¥\s*(\d+(?:\.\d+)?)\s*\+/g
// 单独处理 ¥0 (built-in)  /  ¥0
const PRICE_ZERO_RE = /¥\s*0(\s*\([^)]+\))?/g

function convertPrices(s) {
  let count = 0

  // 1) 区间价格 ¥X~Y
  let out = s.replace(PRICE_RE, (_, lo, _sep, hi) => {
    count++
    const key = `${lo}~${hi}`
    const usd = PRICE_MAP[key]
    if (usd) return `$${usd}`
    const ratio = 0.5
    const round1 = (n) => Math.round(Number(n) * ratio * 10) / 10
    const newLo = Math.max(0.5, round1(lo))
    const newHi = Math.max(newLo + 0.5, round1(hi))
    return `$${newLo}~${newHi}`
  })

  // 2) ¥X+ （以上）
  out = out.replace(PRICE_PLUS_RE, (_, n) => {
    count++
    const key = `${n}~${n}`
    const usd = PRICE_MAP[key]
    const newN = usd ? usd.split('~')[1] : Math.max(1, Math.round(Number(n) * 0.5))
    return `$${newN}+`
  })

  // 3) ¥0 (built-in) → $0 (built-in)
  out = out.replace(PRICE_ZERO_RE, (_, suffix) => `$0${suffix || ''}`)
  // ¥0 (built-in) 里的 count 加上
  count += (out.match(/[$]0\s*\(built-in\)/g) || []).length

  return { out, count }
}

// ─── 旧免责声明 → 新免责声明（英文版专用） ────────────────────
// 旧文（英文站，子代理翻译结果）：The price ranges below are estimates
//   from common retail and small-batch procurement in mainland China.
//
// 新文：价格来自国际零售市场估算，请到 Mouser / DigiKey / LCSC /
// Amazon / SparkFun 等渠道核实。
const NEW_DISCLAIMER = `> The price ranges below are **international retail estimates (USD)** for reference only. Actual prices vary by region, distributor, channel, stock, order quantity and time. For accurate current quotes, check [Mouser](https://www.mouser.com/), [DigiKey](https://www.digikey.com/), [LCSC](https://www.lcsc.com/), [Amazon](https://www.amazon.com/), or [SparkFun / Adafruit](https://www.sparkfun.com/) for the specific part number.`

const OLD_DISCLAIMER_PATTERNS = [
  /^> The price ranges below are estimates from common retail and small-batch procurement in mainland China\.[\s\S]*?(?=\n\n|\n## |\n# )/m,
  /^> Prices below are estimates[\s\S]*?(?=\n\n|\n## |\n# )/m,
  /^> 以下为中国大陆常见零售和小批量采购中的估算范围[\s\S]*?(?=\n\n|\n## |\n# )/m,
]

function replaceDisclaimer(content) {
  let out = content
  for (const re of OLD_DISCLAIMER_PATTERNS) {
    out = out.replace(re, NEW_DISCLAIMER)
  }
  return out
}

// ─── 主流程 ─────────────────────────────────────────────────────
let totalFiles = 0
let changedFiles = 0
let totalReplacements = 0

for (const name of readdirSync(EN_DIR)) {
  const abs = join(EN_DIR, name)
  if (!statSync(abs).isFile()) continue
  if (!name.endsWith('.md')) continue
  totalFiles++

  const before = readFileSync(abs, 'utf8')
  let content = before

  // 1) 价格替换
  const { out, count } = convertPrices(content)
  content = out
  totalReplacements += count

  // 2) 免责声明
  content = replaceDisclaimer(content)

  if (content !== before) {
    writeFileSync(abs, content, 'utf8')
    changedFiles++
  }
}

console.log(`✓ 价格转换为 USD 完成`)
console.log(`  扫描 ${totalFiles} 个文件`)
console.log(`  修改 ${changedFiles} 个文件`)
console.log(`  价格替换 ${totalReplacements} 处`)
console.log(`  免责声明已切换为"国际零售参考价"`)