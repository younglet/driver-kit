#!/usr/bin/env node
// fix-yaml-colons.mjs
//
// 修复 markdown frontmatter 中 description / title 包含冒号导致的
// YAML 解析错误。对含冒号但未加引号的 value 加双引号包裹。

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const EN_DIR = join(__dirname, '..', 'docs', 'en')

const KEYS_TO_QUOTE = new Set(['description', 'title', 'keywords'])

function quoteIfNeeded(value) {
  const v = value.trim()
  // 已带引号不动
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v
  }
  // 含冒号 → YAML 会解析为嵌套映射，必须加引号
  if (v.includes(':') || v.includes('#') || v.startsWith('&') || v.startsWith('*') || v.startsWith('!')) {
    return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'
  }
  return v
}

let fixed = 0
let visited = 0

for (const name of readdirSync(EN_DIR)) {
  const abs = join(EN_DIR, name)
  if (!statSync(abs).isFile()) continue
  if (!name.endsWith('.md')) continue
  visited++

  const content = readFileSync(abs, 'utf8')
  const m = content.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) continue

  const lines = m[1].split('\n')
  const newLines = []
  let changed = false
  for (const line of lines) {
    const km = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/)
    if (km && KEYS_TO_QUOTE.has(km[1])) {
      const k = km[1]
      const v = km[2]
      const newV = quoteIfNeeded(v)
      if (newV !== v) {
        newLines.push(`${k}: ${newV}`)
        changed = true
      } else {
        newLines.push(line)
      }
    } else {
      newLines.push(line)
    }
  }
  if (changed) {
    const newFm = newLines.join('\n')
    const newContent = content.replace(/^---\n[\s\S]*?\n---\n/, `---\n${newFm}\n---\n`)
    writeFileSync(abs, newContent, 'utf8')
    fixed++
  }
}

console.log(`✓ YAML frontmatter 修复完成：访问 ${visited} 个文件，修复 ${fixed} 个`)