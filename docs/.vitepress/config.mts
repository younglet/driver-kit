import { defineConfig } from 'vitepress'

// ════════════════════════════════════════════════════════════
//  所有 53 个硬件的直接列表（按大类顺序，扁平展开）
// ════════════════════════════════════════════════════════════
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

// ─── 完整扁平侧边栏（8 大类作为可点击分组标题） ─────────────
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

export default defineConfig({
  title: 'DriverKit · 驱动派',
  description:
    'DriverKit · 驱动派 — 嵌入式硬件驱动实战文档库。53 个常用模块的原理、选型、接线、驱动和调试速查手册',
  lang: 'zh-CN',
  lastUpdatedText: '最后更新',
  cleanUrls: true,
  appearance: 'dark',

  // GitHub Pages 部署在 https://younglet.github.io/driver-kit/ 子路径下
  // 如果以后改为 user/org page (younglet.github.io)，把这里改成 '/'
  base: '/driver-kit/',

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'DriverKit,驱动派,嵌入式,硬件,驱动,传感器,执行器,通信,IoT,机器人,无人机,嵌入式开发',
      },
    ],
    ['meta', { name: 'author', content: 'DriverKit Contributors' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

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