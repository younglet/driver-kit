#!/usr/bin/env node
// 简单的 SEO 审计脚本：抽样检查多种页面是否都有完整的 meta
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'docs/.vitepress/dist'
const samples = [
  'index.html',
  '分类总览.html',
  '传感器.html',
  '传感器-位姿-三轴陀螺仪.html',
  '通信-总线-I2C.html',
  '编写规范.html',
]

function pick(html, re) {
  const m = html.match(re)
  return m ? m[1] : ''
}

const header = ['页面', 'title长度', 'desc长度', 'kw数', 'og:url', 'canon', 'OG匹配', 'JSON-LD', 'twitter:card']
const widths = [30, 8, 8, 5, 6, 6, 8, 8, 14]
console.log(header.map((h, i) => h.padEnd(widths[i])).join(''))
console.log('='.sum ? '=' : '='.repeat(95))

for (const s of samples) {
  const path = join(DIST, s)
  try {
    const html = readFileSync(path, 'utf8')
    const title = pick(html, /<title>([^<]+)<\/title>/)
    const desc = pick(html, /<meta name="description" content="([^"]+)"/)
    const kws = pick(html, /<meta name="keywords" content="([^"]+)"/)
    const ogUrl = pick(html, /<meta property="og:url" content="([^"]+)"/)
    const canon = pick(html, /<link rel="canonical" href="([^"]+)"/)
    const twitter = pick(html, /<meta name="twitter:card" content="([^"]+)"/)
    const jsonlds = (html.match(/application\/ld\+json/g) || []).length
    const ogMatch = ogUrl && canon && ogUrl === canon ? '✓' : '✗'
    const kwCount = kws ? kws.split(',').length : 0
    const row = [
      s.slice(0, 30),
      String(title.length),
      String(desc.length),
      String(kwCount),
      ogUrl ? '✓' : '✗',
      canon ? '✓' : '✗',
      ogMatch,
      String(jsonlds),
      twitter || '-',
    ]
    console.log(row.map((c, i) => c.padEnd(widths[i])).join(''))
  } catch (e) {
    console.log(`⚠ ${s}: ${e.message}`)
  }
}