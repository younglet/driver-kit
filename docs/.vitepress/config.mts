import { defineConfig } from 'vitepress'

// ════════════════════════════════════════════════════════════════════
//   站点基础常量
// ════════════════════════════════════════════════════════════════════
const SITE_BASE = '/driver-kit/'
const SITE_URL = 'https://younglet.github.io'
const SITE_FULL_ZH = SITE_URL + SITE_BASE
const SITE_FULL_EN = SITE_URL + SITE_BASE + 'en/'
const OG_IMAGE = '/og-image.svg'

// ─── 中文 SEO 默认值 ────────────────────────────────────────────
const ZH_DESCRIPTION =
  'DriverKit · 驱动派 — 嵌入式硬件驱动实战文档库。53 个常用模块的原理、选型、接线、驱动和调试速查手册，覆盖传感器、执行器、总线协议、无线通信、显示、电源等。'
const ZH_KEYWORDS =
  'DriverKit,驱动派,嵌入式,硬件,驱动,传感器,执行器,I2C,SPI,UART,LoRa,IMU,陀螺仪,加速度计,OLED,机器人,无人机,IoT,STM32,Arduino,ESP32,选型,接线,原理,代码示例,FAQ,数据手册'

// ─── 英文 SEO 默认值 ────────────────────────────────────────────
const EN_DESCRIPTION =
  'DriverKit · Driver-Pie — A practical embedded hardware driver documentation library. A quick-reference manual covering principles, selection, wiring, driver code, and debugging for 53 common modules (sensors, actuators, bus protocols, wireless, displays, power, etc.).'
const EN_KEYWORDS =
  'DriverKit,Driver-Pie,embedded,hardware,driver,sensor,actuator,I2C,SPI,UART,LoRa,IMU,gyroscope,accelerometer,OLED,robot,drone,IoT,STM32,Arduino,ESP32,selection,wiring,principle,code example,FAQ,datasheet'

// ─── 8 大类中英文对照（用于 transformPageData 注入描述） ─────────
const CAT_ZH = ['传感器', '执行器', '通信', '显示', '输入', '存储', '电源', '时钟']
const CAT_EN = [
  'Sensors',
  'Actuators',
  'Communication',
  'Display',
  'Input',
  'Storage',
  'Power',
  'Clock',
]
const CAT_EN_MAP: Record<string, string> = {
  传感器: 'Sensors',
  执行器: 'Actuators',
  通信: 'Communication',
  显示: 'Display',
  输入: 'Input',
  存储: 'Storage',
  电源: 'Power',
  时钟: 'Clock',
}
const CAT_ZH_MAP: Record<string, string> = {
  Sensors: '传感器',
  Actuators: '执行器',
  Communication: '通信',
  Display: '显示',
  Input: '输入',
  Storage: '存储',
  Power: '电源',
  Clock: '时钟',
}

// ─── 模块名中英对照（transformHead JSON-LD breadcrumb 用） ───────
const MODULE_EN_MAP: Record<string, string> = {
  // 短名 + 全名（侧边栏中同时使用）都在这里
  三轴陀螺仪: '3-Axis Gyroscope',
  三轴加速度计: '3-Axis Accelerometer',
  '六轴 IMU': '6-Axis IMU',
  '九轴 IMU': '9-Axis IMU',
  磁力计: 'Magnetometer',
  编码器: 'Encoder',
  温湿度: 'Temperature & Humidity',
  气压: 'Barometric Pressure',
  气体: 'Gas Sensor',
  光照: 'Ambient Light',
  超声波: 'Ultrasonic',
  红外测距: 'Infrared Distance',
  激光测距: 'Laser Distance',
  红外避障: 'Infrared Obstacle',
  电容触摸: 'Capacitive Touch',
  摄像头: 'Camera',
  颜色: 'Color Sensor',
  直流电机: 'DC Motor',
  无刷电机: 'Brushless Motor',
  步进电机: 'Stepper Motor',
  舵机: 'Servo',
  伺服电机: 'Servo Motor',
  电机驱动器: 'Motor Driver',
  继电器: 'Relay',
  电磁阀: 'Solenoid Valve',
  水泵: 'Water Pump',
  LED: 'LED',
  蜂鸣器: 'Buzzer',
  GPIO: 'GPIO',
  I2C: 'I2C',
  SPI: 'SPI',
  UART: 'UART',
  RS485: 'RS485',
  CAN: 'CAN',
  USB: 'USB',
  Modbus: 'Modbus',
  '蓝牙 BLE': 'Bluetooth BLE',
  'Wi-Fi': 'Wi-Fi',
  LoRa: 'LoRa',
  GNSS: 'GNSS',
  OLED: 'OLED',
  'TFT 液晶': 'TFT LCD',
  电子纸: 'E-Paper',
  按键: 'Button',
  旋转编码器: 'Rotary Encoder',
  摇杆: 'Joystick',
  EEPROM: 'EEPROM',
  Flash: 'Flash',
  'SD 卡': 'SD Card',
  // ── 带后缀的全名（侧边栏里使用）─
  电压监测: 'Voltage Monitoring',
  电压: 'Voltage',
  电流监测: 'Current Monitoring',
  电流: 'Current',
  锂电充电器: 'Li-Ion Charger',
  RTC: 'RTC',
  'RTC 实时时钟': 'RTC Real-Time Clock',
  'SD 卡 ': 'SD Card',
}

const ZH_OVERVIEW = {
  分类总览: 'Category Overview',
  编写规范: 'Authoring Guide',
  传感器: 'Sensors',
  执行器: 'Actuators',
  通信: 'Communication',
  显示: 'Display',
  输入: 'Input',
  存储: 'Storage',
  电源: 'Power',
  时钟: 'Clock',
}

// ════════════════════════════════════════════════════════════════════
//   模块侧边栏（中英两套，文件名相同，只翻译显示文本）
// ════════════════════════════════════════════════════════════════════
const SENSOR = [
  { text: '三轴陀螺仪', link: '/传感器-位姿-三轴陀螺仪' },
  { text: '三轴加速度计', link: '/传感器-位姿-三轴加速度计' },
  { text: '六轴 IMU', link: '/传感器-位姿-六轴IMU' },
  { text: '九轴 IMU', link: '/传感器-位姿-九轴IMU' },
  { text: '磁力计', link: '/传感器-位姿-磁力计' },
  { text: '编码器', link: '/传感器-位姿-编码器' },
  { text: '温湿度', link: '/传感器-环境-温湿度' },
  { text: '气压', link: '/传感器-环境-气压' },
  { text: '气体', link: '/传感器-环境-气体' },
  { text: '光照', link: '/传感器-环境-光照' },
  { text: '超声波', link: '/传感器-测距-超声波' },
  { text: '红外测距', link: '/传感器-测距-红外测距' },
  { text: '激光测距', link: '/传感器-测距-激光测距' },
  { text: '红外避障', link: '/传感器-接近-红外避障' },
  { text: '电容触摸', link: '/传感器-接近-电容触摸' },
  { text: '摄像头', link: '/传感器-视觉-摄像头' },
  { text: '颜色', link: '/传感器-视觉-颜色' },
]

const ACTUATOR = [
  { text: '直流电机', link: '/执行器-运动-直流电机' },
  { text: '无刷电机', link: '/执行器-运动-无刷电机' },
  { text: '步进电机', link: '/执行器-运动-步进电机' },
  { text: '舵机', link: '/执行器-运动-舵机' },
  { text: '伺服电机', link: '/执行器-运动-伺服电机' },
  { text: '电机驱动器', link: '/执行器-运动-电机驱动器' },
  { text: '继电器', link: '/执行器-开关-继电器' },
  { text: '电磁阀', link: '/执行器-流体-电磁阀' },
  { text: '水泵', link: '/执行器-流体-水泵' },
  { text: 'LED', link: '/执行器-光源-LED' },
  { text: '蜂鸣器', link: '/执行器-声光-蜂鸣器' },
]

const COMMUNICATION = [
  { text: 'GPIO', link: '/通信-总线-GPIO' },
  { text: 'I2C', link: '/通信-总线-I2C' },
  { text: 'SPI', link: '/通信-总线-SPI' },
  { text: 'UART', link: '/通信-总线-UART' },
  { text: 'RS485', link: '/通信-总线-RS485' },
  { text: 'CAN', link: '/通信-总线-CAN' },
  { text: 'USB', link: '/通信-总线-USB' },
  { text: 'Modbus', link: '/通信-协议-Modbus' },
  { text: '蓝牙 BLE', link: '/通信-无线-蓝牙BLE' },
  { text: 'Wi-Fi', link: '/通信-无线-WiFi' },
  { text: 'LoRa', link: '/通信-无线-LoRa' },
  { text: 'GNSS', link: '/通信-无线-GNSS' },
]

const DISPLAY = [
  { text: 'OLED', link: '/显示-图形-OLED' },
  { text: 'TFT 液晶', link: '/显示-图形-TFT液晶' },
  { text: '电子纸', link: '/显示-图形-电子纸' },
]

const INPUT = [
  { text: '按键', link: '/输入-人机-按键' },
  { text: '旋转编码器', link: '/输入-人机-旋转编码器' },
  { text: '摇杆', link: '/输入-人机-摇杆' },
]

const STORAGE = [
  { text: 'EEPROM', link: '/存储-非易失-EEPROM' },
  { text: 'Flash', link: '/存储-非易失-Flash' },
  { text: 'SD 卡', link: '/存储-外部-SD卡' },
]

const POWER = [
  { text: '电压监测', link: '/电源-监测-电压' },
  { text: '电流监测', link: '/电源-监测-电流' },
  { text: '锂电充电器', link: '/电源-充电-锂电充电器' },
]

const CLOCK = [{ text: 'RTC 实时时钟', link: '/时钟-实时时钟-RTC' }]

// ─── 把中文 sidebar 翻译为英文 sidebar（text 用查表，link 不变） ─
function translate(items: { text: string; link: string }[]) {
  return items.map((it) => ({
    text: MODULE_EN_MAP[it.text] ?? it.text,
    link: it.link,
  }))
}

const SENSOR_EN = translate(SENSOR)
const ACTUATOR_EN = translate(ACTUATOR)
const COMMUNICATION_EN = translate(COMMUNICATION)
const DISPLAY_EN = translate(DISPLAY)
const INPUT_EN = translate(INPUT)
const STORAGE_EN = translate(STORAGE)
const POWER_EN = translate(POWER)
const CLOCK_EN = translate(CLOCK)

// ════════════════════════════════════════════════════════════════════
//   中文 sidebar（默认）
// ════════════════════════════════════════════════════════════════════
const sidebar_zh = [
  { text: '分类总览', link: '/分类总览' },
  { text: '传感器总览', link: '/传感器', collapsed: false, items: SENSOR },
  { text: '执行器总览', link: '/执行器', collapsed: false, items: ACTUATOR },
  { text: '通信总览', link: '/通信', collapsed: false, items: COMMUNICATION },
  { text: '显示总览', link: '/显示', collapsed: false, items: DISPLAY },
  { text: '输入总览', link: '/输入', collapsed: false, items: INPUT },
  { text: '存储总览', link: '/存储', collapsed: false, items: STORAGE },
  { text: '电源总览', link: '/电源', collapsed: false, items: POWER },
  { text: '时钟总览', link: '/时钟', collapsed: false, items: CLOCK },
]

// ─── 英文 sidebar（locale.en 用） ────────────────────────────────
const sidebar_en = [
  { text: 'Category Overview', link: '/分类总览' },
  { text: 'Sensors', link: '/传感器', collapsed: false, items: SENSOR_EN },
  { text: 'Actuators', link: '/执行器', collapsed: false, items: ACTUATOR_EN },
  { text: 'Communication', link: '/通信', collapsed: false, items: COMMUNICATION_EN },
  { text: 'Display', link: '/显示', collapsed: false, items: DISPLAY_EN },
  { text: 'Input', link: '/输入', collapsed: false, items: INPUT_EN },
  { text: 'Storage', link: '/存储', collapsed: false, items: STORAGE_EN },
  { text: 'Power', link: '/电源', collapsed: false, items: POWER_EN },
  { text: 'Clock', link: '/时钟', collapsed: false, items: CLOCK_EN },
]

// ════════════════════════════════════════════════════════════════════
//   主题配置（中英两套）
// ════════════════════════════════════════════════════════════════════
const themeConfig_zh = {
  siteTitle: 'DriverKit',

  // ─── 顶部导航（11 项） ────────────────────────────────────────
  nav: [
    { text: '首页', link: '/' },
    { text: '总览', link: '/分类总览' },
    { text: '传感器', link: '/传感器' },
    { text: '执行器', link: '/执行器' },
    { text: '通信', link: '/通信' },
    { text: '显示', link: '/显示' },
    { text: '输入', link: '/输入' },
    { text: '存储', link: '/存储' },
    { text: '电源', link: '/电源' },
    { text: '时钟', link: '/时钟' },
    { text: '规范', link: '/编写规范' },
  ],

  sidebar: sidebar_zh,

  outline: { level: [2, 3] as const, label: '本页目录' },

  docFooter: { prev: '上一篇', next: '下一篇' },

  socialLinks: [],

  search: {
    provider: 'local' as const,
    options: {
      miniSearch: {
        searchOptions: { boost: { title: 4, text: 2, terms: 1 }, prefix: true, fuzzy: 0.2 },
      },
    },
  },

  footer: {
    message: 'DriverKit · 驱动派 · 共 53 个硬件模块文档',
    copyright: `MIT License · <a href="/编写规范" target="_blank">编写规范</a>`,
  },

  editLink: {
    pattern: '**/*.md',
    text: '在 GitHub 上编辑此页',
  },
}

const themeConfig_en = {
  siteTitle: 'DriverKit',

  // ─── Top Navigation ───────────────────────────────────────────
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Overview', link: '/分类总览' },
    { text: 'Sensors', link: '/传感器' },
    { text: 'Actuators', link: '/执行器' },
    { text: 'Communication', link: '/通信' },
    { text: 'Display', link: '/显示' },
    { text: 'Input', link: '/输入' },
    { text: 'Storage', link: '/存储' },
    { text: 'Power', link: '/电源' },
    { text: 'Clock', link: '/时钟' },
    { text: 'Guide', link: '/编写规范' },
  ],

  sidebar: sidebar_en,

  outline: { level: [2, 3] as const, label: 'On this page' },

  docFooter: { prev: 'Previous', next: 'Next' },

  socialLinks: [],

  search: {
    provider: 'local' as const,
    options: {
      miniSearch: {
        searchOptions: { boost: { title: 4, text: 2, terms: 1 }, prefix: true, fuzzy: 0.2 },
      },
    },
  },

  footer: {
    message: 'DriverKit · Driver-Pie · 53 hardware modules documented',
    copyright: `MIT License · <a href="/编写规范" target="_blank">Authoring Guide</a>`,
  },

  editLink: {
    pattern: '**/*.md',
    text: 'Edit this page on GitHub',
  },
}

// ════════════════════════════════════════════════════════════════════
//   JSON-LD: 站点级结构化数据（每语言一份）
// ════════════════════════════════════════════════════════════════════
function buildSiteJsonLd(lang: 'zh-CN' | 'en-US') {
  const siteFull = lang === 'zh-CN' ? SITE_FULL_ZH : SITE_FULL_EN
  const name = lang === 'zh-CN' ? 'DriverKit · 驱动派' : 'DriverKit · Driver-Pie'
  const desc = lang === 'zh-CN' ? ZH_DESCRIPTION : EN_DESCRIPTION
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': siteFull + '#website',
        url: siteFull,
        name,
        description: desc,
        inLanguage: lang,
        publisher: { '@id': siteFull + '#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: siteFull + '?q={search_term_string}' },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': siteFull + '#organization',
        name: 'DriverKit Contributors',
        url: siteFull,
        logo: { '@type': 'ImageObject', url: siteFull + OG_IMAGE.replace(/^\//, '') },
        sameAs: [],
      },
    ],
  }
}

// ════════════════════════════════════════════════════════════════════
//   工具：判断当前页面 locale
//   通过 pageData.relativePath 开头是否是 "en/" 来判断。
// ════════════════════════════════════════════════════════════════════
function detectLocale(relativePath: string): 'zh-CN' | 'en-US' {
  const rel = relativePath.replace(/\\/g, '/')
  if (rel.startsWith('en/') || rel === 'en') return 'en-US'
  return 'zh-CN'
}

function stripLocalePrefix(rel: string, locale: 'zh-CN' | 'en-US'): string {
  const r = rel.replace(/\\/g, '/')
  if (locale === 'en-US' && (r === 'en' || r.startsWith('en/'))) {
    return r === 'en' ? '' : r.slice(3)
  }
  return r
}

// ════════════════════════════════════════════════════════════════════
//   主配置
// ════════════════════════════════════════════════════════════════════
export default defineConfig({
  title: 'DriverKit · 驱动派',
  titleTemplate: ':title — DriverKit · 驱动派',
  description: ZH_DESCRIPTION,
  lang: 'zh-CN',
  lastUpdatedText: '最后更新',
  cleanUrls: true,
  appearance: 'dark',
  base: SITE_BASE,

  // ─── locales: zh-CN 默认（/），en 挂在 /en/ ──────────────────
  locales: {
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'DriverKit · 驱动派',
      titleTemplate: ':title — DriverKit · 驱动派',
      themeConfig: themeConfig_zh,
    },
    en: {
      label: 'English',
      lang: 'en-US',
      path: '/en/',
      title: 'DriverKit · Driver-Pie',
      titleTemplate: ':title — DriverKit · Driver-Pie',
      themeConfig: themeConfig_en,
    },
  },

  // ─── transformPageData: 为每页注入 SEO frontmatter 默认值 ────
  transformPageData(pageData) {
    const fm = (pageData.frontmatter ??= {}) as Record<string, unknown>
    const locale = detectLocale(pageData.relativePath ?? '')
    const rel = stripLocalePrefix(pageData.relativePath ?? '', locale).replace(/\.md$/, '')

    const isEn = locale === 'en-US'
    const defaultDesc = isEn ? EN_DESCRIPTION : ZH_DESCRIPTION
    const defaultKw = isEn ? EN_KEYWORDS : ZH_KEYWORDS

    if (!fm.description) {
      if (rel === 'index') {
        fm.description = isEn ? EN_DESCRIPTION : ZH_DESCRIPTION
      } else if (rel === '分类总览') {
        fm.description = isEn
          ? 'DriverKit — full index of all 53 modules organized by category: 17 Sensors, 11 Actuators, 12 Communication, 3 Display, 3 Input, 3 Storage, 3 Power, 1 Clock.'
          : 'DriverKit 全部 53 个模块文档按分类索引：传感器 17 个、执行器 11 个、通信 12 个、显示 3 个、输入 3 个、存储 3 个、电源 3 个、时钟 1 个。'
      } else if (rel === '编写规范') {
        fm.description = isEn
          ? 'Authoring guide for DriverKit module docs — the standard 17-section structure covering selection, wiring, drivers, debugging and FAQ.'
          : 'DriverKit 模块文档的 17 节标准结构与撰写规范：选型、接线、驱动、调试、FAQ 一站式。'
      } else if (/^.+-.+-.+$/.test(rel)) {
        // 模块页：分类-领域-模块
        const parts = rel.split('-')
        const cat = parts[0] ?? ''
        const mod = parts[parts.length - 1] ?? ''
        const catEn = CAT_EN_MAP[cat] ?? cat
        const modEn = MODULE_EN_MAP[mod] ?? mod
        if (isEn) {
          fm.description = `DriverKit — ${modEn} (under ${catEn}): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ.`
        } else {
          fm.description = `DriverKit · ${cat}分类下的 ${mod} 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。`
        }
      } else if (CAT_ZH.includes(rel)) {
        const catEn = CAT_EN_MAP[rel]
        if (isEn) {
          fm.description = `DriverKit · all modules under ${catEn}: principles, selection, wiring, drivers, and debugging quick reference.`
        } else {
          fm.description = `DriverKit · ${rel}分类下的全部模块文档，原理、选型、接线、驱动、调试速查。`
        }
      } else {
        fm.description = defaultDesc
      }
    }
    if (!fm.keywords) {
      fm.keywords = defaultKw
    }
  },

  // ─── 静态全局 head：站点级 JSON-LD 在 transformHead 注入，这里只放通用 meta ──
  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'author', content: 'DriverKit Contributors' }],
    [
      'meta',
      {
        name: 'robots',
        content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      },
    ],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['meta', { name: 'baiduspider', content: 'index,follow' }],
    ['meta', { property: 'og:site_name', content: 'DriverKit · 驱动派' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.svg' }],
  ],

  // ─── transformHead: 每页动态注入 description / OG / canonical / JSON-LD ──
  transformHead(ctx) {
    const { pageData, siteData } = ctx
    const fm = (pageData?.frontmatter ?? {}) as Record<string, unknown>
    const locale = detectLocale(pageData?.relativePath ?? '')
    const isEn = locale === 'en-US'
    const rel = stripLocalePrefix(pageData?.relativePath ?? '', locale).replace(/\.md$/, '')

    const siteFull = isEn ? SITE_FULL_EN : SITE_FULL_ZH
    const pageUrl = siteFull + rel

    const pageTitle =
      (typeof fm.title === 'string' && fm.title) ||
      pageData?.title ||
      `${siteData.title}`
    const description =
      (typeof fm.description === 'string' && fm.description) ||
      (isEn ? EN_DESCRIPTION : ZH_DESCRIPTION)
    const keywords =
      (typeof fm.keywords === 'string' && fm.keywords) ||
      (isEn ? EN_KEYWORDS : ZH_KEYWORDS)

    const isHome = rel === '' || rel === 'index'
    const isHomeFile = pageData?.relativePath === 'index.md' || pageData?.relativePath === 'en/index.md'
    const fullTitle = isHomeFile
      ? pageTitle
      : `${pageTitle} · ${siteData.title}`

    // ─── 页面类型判断 ──────────────────────────────────────────
    const isModule = /.+-.+-.+/.test(rel)
    const isCategoryOverview = rel === '分类总览' || rel === '编写规范'
    const isCatPage = CAT_ZH.includes(rel)

    // ─── JSON-LD: 站点级（按 locale 区分） ────────────────────
    const siteJsonLd = buildSiteJsonLd(locale)

    // ─── JSON-LD: 页面级 ───────────────────────────────────────
    let jsonldPage: Record<string, unknown> | null = null
    if (isHome) {
      jsonldPage = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        description,
        url: pageUrl,
        inLanguage: locale,
        isPartOf: { '@id': siteFull + '#website' },
      }
    } else if (isModule) {
      const parts = rel.split('-')
      const cat = parts[0] ?? ''
      const mod = parts[parts.length - 1] ?? ''
      const modEn = MODULE_EN_MAP[mod] ?? mod
      const catEn = CAT_EN_MAP[cat] ?? cat
      const homeLabel = isEn ? 'Home' : '首页'
      const overviewLabel = isEn ? 'Overview' : '分类总览'
      const catLabel = isEn ? catEn : cat
      const modLabel = isEn ? modEn : mod

      const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeLabel, item: siteFull },
          { '@type': 'ListItem', position: 2, name: overviewLabel, item: siteFull + '分类总览' },
          { '@type': 'ListItem', position: 3, name: catLabel, item: siteFull + cat },
          { '@type': 'ListItem', position: 4, name: modLabel, item: pageUrl },
        ],
      }
      const article = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: modLabel,
        description,
        inLanguage: locale,
        author: { '@type': 'Organization', name: 'DriverKit Contributors' },
        publisher: { '@id': siteFull + '#organization' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        keywords,
        about: { '@type': 'Thing', name: modLabel },
        genre: ['Hardware', 'Embedded Systems', 'Driver Development'],
        proficiencyLevel: 'Intermediate',
        dependencies: (isEn ? catEn : cat) + ' > ' + parts[1],
      }
      jsonldPage = { '@context': 'https://schema.org', '@graph': [breadcrumb, article] }
    } else if (isCategoryOverview) {
      jsonldPage = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: pageTitle,
        description,
        url: pageUrl,
        inLanguage: locale,
        isPartOf: { '@id': siteFull + '#website' },
      }
    } else if (isCatPage) {
      const catLabel = isEn ? CAT_EN_MAP[rel] : rel
      jsonldPage = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: pageTitle,
            description,
            url: pageUrl,
            inLanguage: locale,
            isPartOf: { '@id': siteFull + '#website' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : '首页', item: siteFull },
              { '@type': 'ListItem', position: 2, name: isEn ? 'Overview' : '分类总览', item: siteFull + '分类总览' },
              { '@type': 'ListItem', position: 3, name: catLabel, item: pageUrl },
            ],
          },
        ],
      }
    }

    return [
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'keywords', content: keywords }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:locale', content: isEn ? 'en_US' : 'zh_CN' }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:title', content: fullTitle }],
      ['meta', { property: 'og:description', content: description }],
      [
        'meta',
        { property: 'og:image', content: siteFull + OG_IMAGE.replace(/^\//, '') },
      ],
      ['meta', { property: 'og:image:alt', content: pageTitle }],
      ['meta', { name: 'twitter:title', content: fullTitle }],
      ['meta', { name: 'twitter:description', content: description }],
      [
        'meta',
        { name: 'twitter:image', content: siteFull + OG_IMAGE.replace(/^\//, '') },
      ],
      ['link', { rel: 'canonical', href: pageUrl }],
      // ─── hreflang 标注每页的多语言对应关系（关键 SEO 国际化） ──
      ...(rel === ''
        ? [
            ['link', { rel: 'alternate', hreflang: 'zh-CN', href: SITE_FULL_ZH }],
            ['link', { rel: 'alternate', hreflang: 'en', href: SITE_FULL_EN }],
            ['link', { rel: 'alternate', hreflang: 'x-default', href: SITE_FULL_ZH }],
          ]
        : [
            ['link', { rel: 'alternate', hreflang: 'zh-CN', href: SITE_FULL_ZH + rel }],
            ['link', { rel: 'alternate', hreflang: 'en', href: SITE_FULL_EN + rel }],
          ]),
      // ─── JSON-LD: 站点级 + 页面级 ──────────────────────────
      ['script', { type: 'application/ld+json' }, JSON.stringify(siteJsonLd)],
      ...(jsonldPage
        ? [['script', { type: 'application/ld+json' }, JSON.stringify(jsonldPage)]]
        : []),
    ]
  },

  markdown: {
    lineNumbers: false,
    theme: { light: 'github-light', dark: 'github-dark' },
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '说明',
      detailsLabel: '详情',
    },
  },

  ignoreDeadLinks: true,
})