#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════
// ping-search-engines.mjs
//
// 部署后调用，向上报 URL 到搜索引擎，加速收录：
//   - Bing（IndexNow API，无需 token 也能 ping；推荐加 INDEXNOW_KEY）
//   - 百度站长平台（需要 BAIDU_PUSH_TOKEN + BAIDU_SITE env）
//   - Google（通过 IndexNow，Bing/Yandex 共享 key）
//
// 用法：
//   node scripts/ping-search-engines.mjs
//
// 环境变量（可选；都通过 GitHub Secrets 配置即可）：
//   INDEXNOW_KEY       IndexNow API key（24 字符 hex）
//   BAIDU_PUSH_TOKEN   百度站长平台的"推送接口" token
//   BAIDU_SITE         百度站长平台注册的站点，如 https://younglet.github.io/driver-kit/
//
// 任一环境变量缺失则跳过对应引擎。
// ════════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITEMAP = join(__dirname, '..', 'docs', 'public', 'sitemap.xml')

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? ''
const BAIDU_PUSH_TOKEN = process.env.BAIDU_PUSH_TOKEN ?? ''
const BAIDU_SITE = process.env.BAIDU_SITE ?? ''

// ─── 读取 sitemap 中的 URL ───────────────────────────────────────
if (!existsSync(SITEMAP)) {
  console.error(`✗ sitemap.xml 不存在：${SITEMAP}`)
  console.error(`  请先运行 npm run docs:build 生成 dist/sitemap.xml`)
  process.exit(1)
}

const xml = readFileSync(SITEMAP, 'utf8')
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log(`📋 sitemap 中共 ${urls.length} 个 URL`)

// ─── Bing / IndexNow（Google + Bing + Yandex 都共享 IndexNow） ────
async function pingIndexNow() {
  if (!INDEXNOW_KEY) {
    console.log('⏭  INDEXNOW_KEY 未配置，跳过 IndexNow（Bing/Google/Yandex）')
    return
  }
  const host = new URL(urls[0] ?? 'https://example.com').host
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }
  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })
    console.log(`✓ IndexNow 提交 ${urls.length} 个 URL：HTTP ${res.status}`)
  } catch (e) {
    console.warn(`⚠ IndexNow 提交失败：${e.message}`)
  }
}

// ─── 百度站长平台推送 ──────────────────────────────────────────
async function pingBaidu() {
  if (!BAIDU_PUSH_TOKEN || !BAIDU_SITE) {
    console.log('⏭  BAIDU_PUSH_TOKEN / BAIDU_SITE 未配置，跳过百度推送')
    return
  }
  const api = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(BAIDU_SITE)}&token=${BAIDU_PUSH_TOKEN}`
  try {
    const res = await fetch(api, {
      method: 'POST',
      body: urls.join('\n'),
      headers: { 'Content-Type': 'text/plain' },
    })
    const text = await res.text()
    console.log(`✓ 百度推送 ${urls.length} 个 URL：${text.slice(0, 200)}`)
  } catch (e) {
    console.warn(`⚠ 百度推送失败：${e.message}`)
  }
}

// ─── 入口 ────────────────────────────────────────────────────────
;(async () => {
  console.log('🚀 开始上报搜索引擎...\n')
  await pingIndexNow()
  await pingBaidu()
  console.log('\n✅ 完成')
})()