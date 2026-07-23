import { defineConfig } from 'vitepress'

// ════════════════════════════════════════════════════════════════════
//   所有 53 个硬件的直接列表（按大类顺序，扁平展开）
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

const CLOCK = [
  { text: 'RTC 实时时钟', link: '/时钟-实时时钟-RTC' },
]

// ─── 完整扁平侧边栏（8 大类作为可点击分组标题） ─────────────────
const sidebar = [
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

// ════════════════════════════════════════════════════════════════════
//   SEO 常量集中配置
// ════════════════════════════════════════════════════════════════════
const SITE_BASE = '/driver-kit/'
const SITE_URL = 'https://younglet.github.io'
const SITE_FULL = SITE_URL + SITE_BASE
const DEFAULT_DESCRIPTION =
  'DriverKit · 驱动派 — 嵌入式硬件驱动实战文档库。53 个常用模块的原理、选型、接线、驱动和调试速查手册，覆盖传感器、执行器、总线协议、无线通信、显示、电源等。'
const DEFAULT_KEYWORDS =
  'DriverKit,驱动派,嵌入式,硬件,驱动,传感器,执行器,I2C,SPI,UART,LoRa,IMU,陀螺仪,加速度计,OLED,机器人,无人机,IoT,STM32,Arduino,ESP32,选型,接线,原理,代码示例,FAQ,数据手册'
const OG_IMAGE = '/og-image.svg'

// ─── JSON-LD: 站点级结构化数据（WebSite + Organization） ─────────
const JSONLD_SITE = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': SITE_FULL + '#website',
      url: SITE_FULL,
      name: 'DriverKit · 驱动派',
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'zh-CN',
      publisher: { '@id': SITE_FULL + '#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: SITE_FULL + '?q={search_term_string}' },
        // 静态站本身没有搜索后端，但 schema 仍然合法（声明搜索意图）
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': SITE_FULL + '#organization',
      name: 'DriverKit Contributors',
      url: SITE_FULL,
      logo: { '@type': 'ImageObject', url: SITE_FULL + OG_IMAGE },
      sameAs: [],
    },
  ],
}

export default defineConfig({
  title: 'DriverKit · 驱动派',
  description: DEFAULT_DESCRIPTION,
  lang: 'zh-CN',
  lastUpdatedText: '最后更新',
  cleanUrls: true,
  appearance: 'dark',

  // GitHub Pages 部署在 https://younglet.github.io/driver-kit/ 子路径下
  // 如果以后改为 user/org page (younglet.github.io)，把这里改成 '/'
  base: SITE_BASE,

  // ─── transformPageData: 为每页注入 SEO frontmatter 默认值 ────
  // 如果某页 markdown 顶部显式声明了 title/description/keywords，
  // 不会覆盖；否则用这里的兜底，让每页都拥有独立的 meta description。
  transformPageData(pageData) {
    const fm = (pageData.frontmatter ??= {}) as Record<string, unknown>

    // 兜底 title（VitePress 默认会用第一个 H1，所以这里只补 description/keywords）
    if (!fm.description) {
      // 不同页面类型生成不同描述
      const rel = pageData.relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
      if (rel === 'index') {
        fm.description =
          'DriverKit · 驱动派 — 嵌入式硬件驱动实战文档库。53 个常用模块的原理、选型、接线、驱动、调试速查手册，覆盖传感器、执行器、总线协议、无线通信等。'
      } else if (rel === '分类总览') {
        fm.description =
          'DriverKit 全部 53 个模块文档按分类索引：传感器 17 个、执行器 11 个、通信 12 个、显示 3 个、输入 3 个、存储 3 个、电源 3 个、时钟 1 个。'
      } else if (rel === '编写规范') {
        fm.description =
          'DriverKit 模块文档的 17 节标准结构与撰写规范：选型、接线、驱动、调试、FAQ 一站式。'
      } else if (/^.+-.+-.+$/.test(rel)) {
        // 模块页：分类-领域-模块
        const parts = rel.split('-')
        const cat = parts[0] ?? ''
        const modName = parts[parts.length - 1] ?? ''
        fm.description = `DriverKit · ${cat}分类下的 ${modName} 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。`
      } else if (/^(传感器|执行器|通信|显示|输入|存储|电源|时钟)$/.test(rel)) {
        // 8 大类总览页
        fm.description = `DriverKit · ${rel}分类下的全部模块文档，原理、选型、接线、驱动、调试速查。`
      } else {
        fm.description = DEFAULT_DESCRIPTION
      }
    }
    if (!fm.keywords) {
      fm.keywords = DEFAULT_KEYWORDS
    }
  },

  // ─── head 是静态全局 meta（所有页面共用） ─────────────────────
  //    每页动态注入通过 transformHead 钩子完成。
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
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'DriverKit · 驱动派' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.svg' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(JSONLD_SITE)],
  ],

  // ─── transformHead: 每页动态注入 description / keywords / OG / canonical / JSON-LD ──
  //    这是 SEO 关键钩子：每页都会独立调用，输出独一无二的 meta。
  transformHead(ctx) {
    const { pageData, siteData, head: baseHead } = ctx
    const fm = (pageData?.frontmatter ?? {}) as Record<string, unknown>
    const rel = (pageData?.relativePath ?? '').replace(/\\/g, '/').replace(/\.md$/, '')
    const pageUrl = SITE_FULL + rel

    // 标题：优先用 frontmatter.title，否则用 siteData.title
    const pageTitle =
      (typeof fm.title === 'string' && fm.title) ||
      pageData?.title ||
      `${siteData.title}`

    // description / keywords（兜底在 transformPageData 已注入）
    const description =
      (typeof fm.description === 'string' && fm.description) || DEFAULT_DESCRIPTION
    const keywords =
      (typeof fm.keywords === 'string' && fm.keywords) || DEFAULT_KEYWORDS

    // 全文标题（用于 og:title / twitter:title）
    // 首页已经在 frontmatter.title 里带了副标题，不重复拼接；
    // 其他页面拼接成 "模块名 · 站名" 的形式
    const isHome2 = pageData?.relativePath === 'index.md'
    const fullTitle = isHome2
      ? pageTitle
      : `${pageTitle} · ${siteData.title}`

    // ─── 判断页面类型（用于 JSON-LD） ────────────────────────
    const isHome = rel === '' || rel === 'index'
    const isModule = /.+-.+-.+/.test(rel)
    const isCategoryOverview = ['分类总览', '编写规范'].includes(rel)
    const isCatPage = ['传感器', '执行器', '通信', '显示', '输入', '存储', '电源', '时钟'].includes(rel)

    let jsonldPage: Record<string, unknown> | null = null
    if (isHome) {
      jsonldPage = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        description,
        url: pageUrl,
        inLanguage: 'zh-CN',
        isPartOf: { '@id': SITE_FULL + '#website' },
      }
    } else if (isModule) {
      // 模块页：TechArticle + BreadcrumbList
      const parts = rel.split('-')
      const cat = parts[0] ?? ''
      const field = parts[1] ?? ''
      const mod = parts[parts.length - 1] ?? ''
      const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: SITE_FULL },
          { '@type': 'ListItem', position: 2, name: '分类总览', item: SITE_FULL + '分类总览' },
          { '@type': 'ListItem', position: 3, name: cat, item: SITE_FULL + cat },
          { '@type': 'ListItem', position: 4, name: mod, item: pageUrl },
        ],
      }
      const article = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: mod,
        description,
        inLanguage: 'zh-CN',
        author: { '@type': 'Organization', name: 'DriverKit Contributors' },
        publisher: { '@id': SITE_FULL + '#organization' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        keywords,
        about: { '@type': 'Thing', name: mod },
        genre: ['Hardware', 'Embedded Systems', 'Driver Development'],
        proficiencyLevel: 'Intermediate',
        dependencies: cat + ' > ' + field,
      }
      jsonldPage = { '@context': 'https://schema.org', '@graph': [breadcrumb, article] }
    } else if (isCategoryOverview) {
      jsonldPage = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: pageTitle,
        description,
        url: pageUrl,
        inLanguage: 'zh-CN',
        isPartOf: { '@id': SITE_FULL + '#website' },
      }
    } else if (isCatPage) {
      // 8 大类总览页：CollectionPage + BreadcrumbList
      jsonldPage = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: pageTitle,
            description,
            url: pageUrl,
            inLanguage: 'zh-CN',
            isPartOf: { '@id': SITE_FULL + '#website' },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: '首页', item: SITE_FULL },
              { '@type': 'ListItem', position: 2, name: '分类总览', item: SITE_FULL + '分类总览' },
              { '@type': 'ListItem', position: 3, name: rel, item: pageUrl },
            ],
          },
        ],
      }
    }

    // ─── 返回每页增量 meta（VitePress 会自动 mergeHead(ctx.head, ...)） ─
    //    ctx.head 已包含站点级 head（含站点 JSON-LD），
    //    所以这里只返回增量部分，避免重复。
    return [
      // ─── 每页动态 meta description / keywords ──────────────
      ['meta', { name: 'description', content: description }],
      ['meta', { name: 'keywords', content: keywords }],

      // ─── Open Graph（每页动态） ────────────────────────────
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:title', content: fullTitle }],
      ['meta', { property: 'og:description', content: description }],
      [
        'meta',
        { property: 'og:image', content: SITE_FULL + OG_IMAGE.replace(/^\//, '') },
      ],
      ['meta', { property: 'og:image:alt', content: pageTitle }],

      // ─── Twitter Card（每页动态） ──────────────────────────
      ['meta', { name: 'twitter:title', content: fullTitle }],
      ['meta', { name: 'twitter:description', content: description }],
      [
        'meta',
        { name: 'twitter:image', content: SITE_FULL + OG_IMAGE.replace(/^\//, '') },
      ],

      // ─── canonical（每页动态，避免重复内容） ────────────────
      ['link', { rel: 'canonical', href: pageUrl }],

      // ─── JSON-LD 页面级结构化数据 ─────────────────────────
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

  themeConfig: {
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

    // ─── 侧边栏（全局数组，所有非首页页面共用） ──────────────────
    sidebar,

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    socialLinks: [],

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            boost: { title: 4, text: 2, terms: 1 },
            prefix: true,
            fuzzy: 0.2,
          },
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
  },

  ignoreDeadLinks: true,
})