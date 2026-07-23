#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════
// generate-sitemap.mjs
//
// 读取 docs/ 下的所有 .md 文件 + 显式声明的特殊页面，自动生成
// docs/public/sitemap.xml。VitePress 构建时会自动把 public/ 目录
// 复制到 dist/，所以最终 sitemap 会出现在站点根。
//
// 特性：
//   - 自动收集全部 53 个模块文档
//   - 从 git log 取每个文件的最后修改时间作为 lastmod
//   - 跳过下划线开头的文件（如 _*.md）
//   - 输出符合 sitemaps.org/0.9 规范的 XML
// ════════════════════════════════════════════════════════════════════

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS_DIR = join(ROOT, 'docs')
const OUT_FILE = join(DOCS_DIR, 'public', 'sitemap.xml')

// ─── GitHub Pages 子路径；用户站点改为 '/' ─────────────────────
const SITE_BASE = '/driver-kit/'
const SITE_URL = 'https://younglet.github.io'

// ─── 优先级策略 ──────────────────────────────────────────────────
// 首页最高 1.0；总览/分类页 0.8；模块页 0.7；规范 0.5
function priorityFor(route) {
  if (route === '/') return '1.0'
  if (route === '/分类总览' || route === '/编写规范') return '0.8'
  if (route.endsWith('总览') === false && route.split('/').length === 1) return '0.7' // 分类总览
  if (route.includes('-')) return '0.7' // 模块页
  return '0.6'
}

// ─── 用 git log 取最后修改时间，回退到文件 mtime ─────────────────
function lastmodFor(fileAbs) {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${fileAbs}"`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
    if (iso) return iso
  } catch {}
  return statSync(fileAbs).mtime.toISOString()
}

// ─── 收集所有需要收录的页面 ──────────────────────────────────────
const collected = new Map() // route -> { absPath, priority }

function visit(dir) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.vitepress' || name === 'public') continue
      visit(abs)
    } else if (st.isFile() && name.endsWith('.md') && !name.startsWith('_')) {
      const relToDocs = relative(DOCS_DIR, abs).replace(/\\/g, '/')
      const route = '/' + relToDocs.replace(/\.md$/, '')
      collected.set(route, { absPath: abs, file: relToDocs })
    }
  }
}

visit(DOCS_DIR)

// ─── 生成 XML ────────────────────────────────────────────────────
const urls = [...collected.keys()].sort()
const nowIso = new Date().toISOString()

const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
]
for (const route of urls) {
  const { absPath } = collected.get(route)
  const loc = SITE_URL + SITE_BASE.replace(/\/$/, '') + route
  const lastmod = lastmodFor(absPath)
  const priority = priorityFor(route)
  const changefreq = priority === '1.0' ? 'weekly' : 'monthly'
  lines.push('  <url>')
  lines.push(`    <loc>${loc}</loc>`)
  lines.push(`    <lastmod>${lastmod}</lastmod>`)
  lines.push(`    <changefreq>${changefreq}</changefreq>`)
  lines.push(`    <priority>${priority}</priority>`)
  lines.push('  </url>')
}
lines.push('</urlset>')

const xml = lines.join('\n') + '\n'
writeFileSync(OUT_FILE, xml, 'utf8')
console.log(`✓ sitemap.xml: ${urls.length} URLs → ${relative(ROOT, OUT_FILE)}`)