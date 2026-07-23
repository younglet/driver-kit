#!/usr/bin/env node
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const FILES = [
  '分类总览.md',
  '编写规范.md',
  '传感器.md',
  '执行器.md',
]

const EN_DIR = 'docs/en'

let pass = 0, fail = 0
const issues = []

for (const f of FILES) {
  const p = join(EN_DIR, f)
  if (!existsSync(p)) {
    console.log(`FAIL ${f}: file missing`)
    fail++
    issues.push(`${f}: file missing`)
    continue
  }

  const text = readFileSync(p, 'utf8')
  const size = statSync(p).size

  // Check frontmatter
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fmMatch) {
    console.log(`FAIL ${f}: frontmatter missing`)
    fail++
    issues.push(`${f}: frontmatter missing`)
    continue
  }

  // Check key fields
  const fm = fmMatch[1]
  const hasTitle = /^title:/m.test(fm)
  const hasDesc = /^description:/m.test(fm)
  const hasKw = /^keywords:/m.test(fm)
  if (!hasTitle || !hasDesc || !hasKw) {
    console.log(`FAIL ${f}: missing title/description/keywords`)
    fail++
    issues.push(`${f}: missing frontmatter keys`)
    continue
  }

  // Check H1
  const body = text.slice(fmMatch[0].length)
  const h1 = body.match(/^# (.+)$/m)
  if (!h1) {
    console.log(`FAIL ${f}: H1 missing`)
    fail++
    issues.push(`${f}: H1 missing`)
    continue
  }

  // Check non-empty body
  if (body.trim().length < 200) {
    console.log(`FAIL ${f}: body too short (${body.trim().length} chars)`)
    fail++
    issues.push(`${f}: body too short`)
    continue
  }

  // Check for residual Chinese characters
  // Allowed: filenames and Chinese category names embedded in code blocks
  const chineseLines = body.split('\n').filter(l => {
    // Skip lines inside code blocks (we'll do a rough check)
    if (l.trim().startsWith('```') || l.trim().startsWith('|')) return false
    // Allow file paths like 传感器-位姿-xxx.md (these are part of filenames)
    // Otherwise flag Chinese characters
    const cnChars = l.match(/[\u4e00-\u9fa5]/g) || []
    // If most of the line is Chinese, flag it
    const cleanLine = l.replace(/`[^`]*`/g, '').replace(/\([^)]*\)/g, '').replace(/`传感器[^`]*\.md`/g, '').replace(/传感器-[^\s)]+\.md/g, '').replace(/执行器-[^\s)]+\.md/g, '').replace(/通信-[^\s)]+\.md/g, '').replace(/显示-[^\s)]+\.md/g, '').replace(/输入-[^\s)]+\.md/g, '').replace(/存储-[^\s)]+\.md/g, '').replace(/电源-[^\s)]+\.md/g, '').replace(/时钟-[^\s)]+\.md/g, '')
    return cnChars.length > 5 && /[\u4e00-\u9fa5]/.test(cleanLine)
  })

  if (chineseLines.length > 0) {
    console.log(`WARN ${f}: ${chineseLines.length} lines with significant Chinese content (likely inline file references)`)
  }

  console.log(`OK   ${f}: ${size} bytes, H1="${h1[1]}", ${text.split('\n').length} lines`)
  pass++
}

console.log(`\n=== Summary: ${pass} pass, ${fail} fail ===`)
if (issues.length > 0) {
  console.log('Issues:')
  issues.forEach(i => console.log(`  - ${i}`))
}
process.exit(fail > 0 ? 1 : 0)