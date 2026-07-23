#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════════
// inject-module-frontmatter.mjs
//
// 扫描 docs/ 下的所有模块文档（命名形如 分类-领域-模块.md），
// 若文件尚无 YAML frontmatter，则在文件顶部注入：
//   ---
//   title: 模块名
//   description: ...（针对模块优化的描述）
//   keywords: ...（分类、领域、模块名、常见型号）
//   category: 分类
//   field: 领域
//   module: 模块名
//   ---
//
// 不会覆盖已有 frontmatter。仅影响 SEO，不修改正文内容。
// ════════════════════════════════════════════════════════════════════

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = join(__dirname, '..', 'docs')

// ─── 模块名 → 关键词映射（精选长尾搜索词） ──────────────────────
const KEYWORDS_HINT = {
  '三轴陀螺仪': 'MPU6050,BMI270,L3GD20H,角速度,陀螺仪',
  '三轴加速度计': 'ADXL345,LIS3DH,加速度计',
  '六轴 IMU': 'MPU6050,ICM-42688,六轴姿态,加速度+陀螺仪',
  '九轴 IMU': 'BNO055,BMX160,九轴,航向,姿态融合',
  '磁力计': 'HMC5883,QMC5883,电子罗盘,磁场',
  '编码器': '光电编码器,霍尔编码器,正交解码,增量式',
  '温湿度': 'DHT22,SHT30,BME280,AHT20,SI7021',
  '气压': 'BMP280,BMP390,MS5611,海拔',
  '气体': 'MQ-2,CCS811,SGP30,PM2.5,CO2',
  '光照': 'BH1750,TSL2561,VEML7700,lux,ALS',
  '超声波': 'HC-SR04,US-100,JSN-SR04T',
  '红外测距': 'GP2Y0A21,GP2Y0A02,Sharp红外',
  '激光测距': 'VL53L0X,VL53L1X,TFMini,ToF',
  '红外避障': 'TCRT5000,红外反射',
  '电容触摸': 'TTP223,AT42QT1010,触摸按键',
  '摄像头': 'OV2640,OV7725,ESP32-CAM',
  '颜色': 'TCS34725,TCS3200,RGB识别',
  '直流电机': 'TB6612,L298N,H桥,PWM调速',
  '无刷电机': 'BLDC,Xnova,电调,ESC',
  '步进电机': 'A4988,TMC2209,DRV8825,42步进',
  '舵机': 'SG90,MG996R,PWM舵机',
  '伺服电机': '三菱伺服,松下伺服,编码器反馈',
  '电机驱动器': 'DRV8871,BTS7960,VNH5019',
  '继电器': '5V继电器,光耦隔离,低电平触发',
  '电磁阀': '2位3通,水阀,气阀',
  '水泵': '12V水泵,蠕动泵,直流隔膜泵',
  'LED': 'WS2812,SK6812,APA102,RGB灯带',
  '蜂鸣器': '有源蜂鸣器,无源蜂鸣器,PWM音调',
  GPIO: 'GPIO,上下拉,中断,推挽输出',
  I2C: 'I2C,SDA,SCL,TWI,上拉电阻,400kHz',
  SPI: 'SPI,SCK,MOSI,MISO,片选,全双工',
  UART: 'UART,串口,TTL,RS232,波特率',
  RS485: 'RS485,差分,MAX485,终端电阻',
  CAN: 'CAN,CAN总线,CAN收发器,TJA1050',
  USB: 'USB,USB CDC,USB HID,Type-C',
  Modbus: 'Modbus RTU,Modbus TCP,功能码',
  '蓝牙 BLE': 'BLE,蓝牙低功耗,HM-10,nRF52',
  'Wi-Fi': 'WiFi,ESP8266,ESP32,无线联网',
  LoRa: 'LoRa,SX1278,SX1262,扩频通信',
  GNSS: 'GPS,北斗,u-blox,NMEA',
  OLED: 'SSD1306,SH1106,0.96寸,I2C屏',
  'TFT 液晶': 'ILI9341,ST7789,TFT彩屏,SPI屏',
  电子纸: 'E-Paper,电子墨水屏,SSD1681,2.9寸',
  按键: '按键消抖,矩阵按键,中断按键',
  '旋转编码器': 'EC11,旋转编码器,正交解码',
  摇杆: '双轴摇杆,PS2摇杆,ADC摇杆',
  EEPROM: 'AT24C256,EEPROM,I2C存储',
  Flash: 'W25Q64,SPI Flash,Nor Flash',
  'SD 卡': 'SD卡,FATFS,SDIO,SPI模式',
  电压: '电压监测,ADC采样,分压电阻',
  电流: 'INA219,ACS712,电流采样',
  '锂电充电器': 'TP4056,BQ25896,锂电管理,充放电',
  RTC: 'DS1307,DS3231,RX8025,PCF8563',
}

function visit(dir, found) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.vitepress' || name === 'public') continue
      visit(abs, found)
    } else if (st.isFile() && name.endsWith('.md')) {
      const relToDocs = relative(DOCS_DIR, abs).replace(/\\/g, '/')
      // 仅处理 分类-领域-模块.md 形式的文件
      const m = relToDocs.match(/^(.+)-(.+)-([^/]+)\.md$/)
      if (!m) continue
      found.push({ absPath: abs, relToDocs, cat: m[1], field: m[2], mod: m[3] })
    }
  }
}

const files = []
visit(DOCS_DIR, files)

let updated = 0
let skipped = 0

for (const f of files) {
  const content = readFileSync(f.absPath, 'utf8')
  // 若首部已有 frontmatter，跳过（不覆盖）
  if (/^---\n[\s\S]*?\n---\n/.test(content)) {
    skipped++
    continue
  }

  const hint = KEYWORDS_HINT[f.mod] ?? ''
  const keywords = [
    f.mod,
    f.cat,
    f.field,
    'DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试',
    hint,
  ]
    .filter(Boolean)
    .join(',')

  const description = `DriverKit · ${f.cat}分类下的 ${f.mod} 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。`

  const fm = [
    '---',
    `title: ${f.mod}`,
    `description: ${description}`,
    `keywords: ${keywords}`,
    `category: ${f.cat}`,
    `field: ${f.field}`,
    `module: ${f.mod}`,
    '---',
    '',
  ].join('\n')

  writeFileSync(f.absPath, fm + content, 'utf8')
  updated++
}

console.log(`✓ 模块页 frontmatter 注入完成：${updated} 个新增，${skipped} 个跳过（已有 frontmatter）`)
console.log(`  共扫描 ${files.length} 个模块文档`)