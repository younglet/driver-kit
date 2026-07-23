---
layout: home
title: DriverKit · 驱动派 — 嵌入式硬件驱动实战文档库
titleTemplate: DriverKit · 驱动派
description: DriverKit · 驱动派 — 嵌入式硬件驱动实战文档库。53 个常用模块的原理、选型、接线、驱动和调试速查手册，覆盖传感器、执行器、总线协议、无线通信、显示、电源等。
keywords: DriverKit,驱动派,嵌入式,硬件,驱动,传感器,执行器,I2C,SPI,UART,LoRa,IMU,陀螺仪,加速度计,OLED,机器人,无人机,IoT,STM32,Arduino,ESP32,选型,接线,原理,代码示例,FAQ,数据手册

hero:
  name: DriverKit
  text: 嵌入式硬件驱动实战库
  tagline: 53 个常用模块的 原理 · 选型 · 接线 · 驱动 · 调试 一站式速查手册
  image:
    src: /favicon.svg
    alt: DriverKit · 驱动派
  actions:
    - theme: brand
      text: 开始浏览
      link: /分类总览
    - theme: alt
      text: GitHub
      link: https://github.com/

features:
  - icon: 🧭
    title: 传感器
    details: 17 个模块 — 陀螺仪、加速度计、IMU、磁力计、编码器、温湿度、气压、气体、光照、超声波、红外测距、激光测距、避障、触摸、摄像头、颜色
  - icon: ⚙️
    title: 执行器
    details: 11 个模块 — 直流/无刷/步进/舵机/伺服电机、电机驱动器、继电器、电磁阀、水泵、LED、蜂鸣器
  - icon: 📡
    title: 通信
    details: 12 个模块 — GPIO、I2C、SPI、UART、RS485、CAN、USB、Modbus、BLE、Wi-Fi、LoRa、GNSS
  - icon: 🖥️
    title: 显示
    details: 3 个模块 — OLED、TFT 液晶、电子纸
  - icon: 🎚️
    title: 输入
    details: 3 个模块 — 按键、旋转编码器、摇杆
  - icon: 💾
    title: 存储
    details: 3 个模块 — EEPROM、Flash、SD 卡
  - icon: ⚡
    title: 电源
    details: 3 个模块 — 电压监测、电流监测、锂电充电器
  - icon: 🕐
    title: 时钟
    details: 1 个模块 — RTC 实时时钟
---

## ✨ 为什么需要 DriverKit

- **机器人 / 无人机 / IoT 开发** 必备的硬件速查手册
- **选型不再纠结** —— 每个模块都有型号表、参考价格、关键参数、应用场景
- **接线不再翻数据手册** —— 电气注意事项、上拉电阻、终端电阻、电平匹配都给你标清楚
- **驱动代码拿来即用** —— Python 风格示例，begin/read/write/calibrate API 跨平台一致
- **调试不再抓瞎** —— 常见错误、调试方法、FAQ 全有

## 📖 怎么用

- **按模块找**：左侧导航直接列出全部 53 个模块，按 8 大类组织
- **按场景找**：[分类总览](./分类总览) 提供完整的索引表
- **按关键字找**：顶部搜索框支持中英文模糊匹配
- **离线阅读**：`npm run docs:build` 后是纯静态文件，可本地部署 / 内网分发

## 📄 内容质量保证

- ✅ 每篇文档遵循统一的 **17 节标准结构**
- ✅ 价格标注"仅用于预算参考"，重要规格以原厂数据手册为准
- ✅ 全部内容基于公开芯片手册、应用笔记与社区实践整理
- ✅ 持续维护，欢迎通过 Issue / PR 反馈

---

**MIT License** · 持续更新中 · 最近更新：见每个文档底部的"最后更新"时间