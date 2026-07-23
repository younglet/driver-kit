---
title: SPI
description: DriverKit · 通信分类下的 SPI 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。
keywords: SPI,通信,总线,DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试,SPI,SCK,MOSI,MISO,片选,全双工
category: 通信
field: 总线
module: SPI
---
# SPI


## 1. 模块概览

SPI（Serial Peripheral Interface，串行外设接口）是 Motorola 于 1980 年代提出的同步全双工串行总线，常用于：
- Flash 存储器；
- SD 卡；
- 显示屏；
- 传感器（高速）；
- ADC/DAC；
- 音频编解码器；
- 无线模块（LoRa、NRF24L01）。

特点：
- 全双工（同时收发）；
- 主从架构（多从机）；
- 高速（几十 MHz~100+ MHz）；
- 简单协议；
- 占用较多引脚（4~6 根）。


## 2. 工作原理与适用场景

### 2.1 信号线

- **SCK**（SCLK）：串行时钟（主机驱动）；
- **MOSI**（SIMO）：主机输出从机输入；
- **MISO**（SOMI）：主机输入从机输出；
- **SS/CS**（nCS）：从机片选（主机驱动，低电平有效）。

### 2.2 时钟模式

通过 CPOL（时钟极性）和 CPHA（时钟相位）定义 4 种模式：

| 模式 | CPOL | CPHA | 空闲状态 | 采样边沿 |
|---|---|---|---|---|
| 0 | 0 | 0 | 低 | 上升沿 |
| 1 | 0 | 1 | 低 | 下降沿 |
| 2 | 1 | 0 | 高 | 下降沿 |
| 3 | 1 | 1 | 高 | 上升沿 |

### 2.3 帧格式

- **MSB/LSB**：多数设备 MSB 在前；
- **位宽**：8/16/32 bit（多数 8 bit）；
- **帧长度**：固定或可变。

### 2.4 多从机

- 独立片选：每个从机一根 CS（最常用）；
- 菊花链：从机 MISO 连接下一从机 MOSI（用于多个相同从机）；
- 总线拓扑：仅主机 MOSI/MISO/SCK 共用。


## 3. 常见型号与价格

### 3.1 SPI 设备（典型应用）

| 设备 | 类型 | 接口 | 特点 | 参考价 |
|---|---|---|---|---:|
| W25Q 系列 Flash | SPI Flash | SPI | 16Mbit~2Gbit | ¥2~10 |
| SD 卡 | SD/MMC | SPI | 存储 | ¥10~50 |
| SSD1351 OLED | 显示 | SPI | RGB OLED | ¥15~30 |
| ILI9341 TFT | 显示 | SPI/8080 | TFT LCD | ¥15~40 |
| ST7735 TFT | 显示 | SPI | 小型 TFT | ¥10~25 |
| ADXL345 | 加速度 | SPI/I2C | 传感器 | ¥5~15 |
| BMI270 | IMU | SPI/I2C | 6 轴 | ¥15~40 |
| ICM-42688-P | IMU | SPI/I2C | 6 轴高端 | ¥20~50 |
| ADS1256 | ADC | SPI | 24-bit 高精度 | ¥30~80 |
| ADS1115 | ADC | I2C | 16-bit | ¥5~15 |
| DAC8564 | DAC | SPI | 16-bit 4 通道 | ¥15~35 |
| MAX31855 | 热电偶 | SPI | 温度 | ¥15~30 |
| MAX31865 | RTD | SPI | 温度 | ¥15~35 |
| NRF24L01 | 无线 | SPI | 2.4GHz | ¥3~10 |
| SX1276/78 LoRa | 无线 | SPI | LoRa | ¥15~40 |
| RA8875 | TFT 控制 | SPI | 大屏 | ¥15~35 |
| FT81x 显示控制 | 显示 | SPI | EVE 系列 | ¥30~80 |
| RFM69 | 无线 | SPI | 433/868MHz | ¥5~15 |
| CC1101 | 无线 | SPI | Sub-GHz | ¥5~15 |
| MAX31865 | RTD | SPI | PT100/PT1000 | ¥10~25 |
| ESP32 SPI Slave | MCU | SPI | 从机 | ¥8~25 |

### 3.2 SPI 总线扩展器

| 型号 | 特点 | 参考价 |
|---|---|---:|
| 74HC4053 | 多路复用 | ¥1~3 |
| 74HCT4067 | 模拟开关 | ¥2~5 |
| SN74CBTLV3257 | 总线开关 | ¥3~8 |
| PCA9548 | I2C/SPI 切换 | ¥10~25 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 时钟频率 | MHz（1~50 常见） |
| 工作电压 | 1.8V / 3.3V / 5V |
| 时钟模式 | 0/1/2/3 |
| 数据位宽 | 8/16/32 bit |
| 帧大小 | 可配置 |
| DMA | 部分 MCU 支持 |

**选型建议**：
- Flash 存储器：W25Q 系列（SPI）；
- 显示屏：ST7735 / SSD1351（SPI）；
- 高速传感器：IMU、ADC/DAC；
- 无线模块：LoRa、NRF24L01；
- 多从机：独立片选（避免菊花链复杂度）。


## 5. 硬件连接

### 5.1 接线

- SCK / MOSI / MISO / CS 各一根 + GND 共地；
- CS：每个从机独立（低电平有效）；
- 长距离：低电压差分（如 RS422 转换）；
- 屏蔽：强干扰环境用屏蔽线。

### 5.2 上拉/下拉

- CS 引脚：主机侧上拉到 VCC（确保上电时 CS 高 = 未选中）；
- MISO：部分设备上拉（增强驱动）；
- SCK/MOSI：通常不上拉（推挽输出）。

### 5.3 走线

- 短距离（< 30 cm）效果最好；
- 等长布线（高速 SPI 50 MHz+）；
- 阻抗匹配（微带线/带状线 50Ω）；
- 远离噪声源。

### 5.4 电源

- 稳定供电 + 去耦电容（100nF）；
- 多设备独立供电时共地；
- 某些高速设备需特殊 PCB 设计。


## 6. 通信方式

- 全双工（同时收发）；
- 主机主动发起；
- 字节级（8 bit 多数）；
- DMA：连续传输减少 CPU 占用。


## 7. 初始化流程

1. 配置 GPIO（SCK/MOSI 输出、MISO 输入、CS 输出）；
2. 配置 SPI 控制器（时钟、模式、位宽）；
3. 初始化 CS 引脚为高；
4. 测试（读寄存器验证）；
5. 开始通信。


## 8. 驱动接口

```python
class SPI:
    def __init__(self, sck, mosi, miso, cs=None, freq=10000000, mode=0):
        self.sck = sck
        self.mosi = mosi
        self.miso = miso
        self.cs = cs
        self.freq = freq
        self.mode = mode

    def begin(self):
        pass

    def transfer(self, data):
        """单字节收发。"""
        pass

    def write(self, data):
        """写数据（多字节）。"""
        pass

    def read(self, n):
        """读 n 字节。"""
        pass

    def write_then_read(self, write_data, read_n):
        pass


class SPIDevice:
    """SPI 设备基类。"""
    def __init__(self, spi, cs):
        self.spi = spi
        self.cs = cs

    def begin(self):
        self.cs.high()
        self.verify()  # 读 WHO_AM_I

    def write_reg(self, reg, value):
        """写 8-bit 寄存器。"""
        self.cs.low()
        self.spi.transfer(reg)
        self.spi.transfer(value)
        self.cs.high()

    def read_reg(self, reg):
        """读 8-bit 寄存器。"""
        self.cs.low()
        self.spi.transfer(reg | 0x80)  # 读位
        val = self.spi.transfer(0)
        self.cs.high()
        return val
```


## 9. 数据格式与单位

- 字节流（MSB 多数）；
- 命令字节 + 数据字节（如 Flash：0x03 读 + 地址 24bit + 数据）；
- 16-bit 寄存器（部分设备）；
- 数据/时钟双线传输（区别于 I2C）。


## 10. 中断与 DMA

- 部分 SPI 控制器支持 TX/RX 中断；
- DMA：连续大量数据传输（Flash、显示屏）；
- FIFO：部分 MCU 支持多字节缓冲。


## 11. 错误处理

- **MISO 一直低**：CS 未拉低、SPI 时序错、设备未上电；
- **数据错误**：时钟模式错、速率过高、EMI；
- **设备不响应**：CS 未拉低、设备未上电、SPI 配置错；
- **多设备冲突**：菊花链 CS 错、总线竞争；
- **CRC 错误**：部分 SPI 设备支持 CRC。


## 12. 低功耗

- 不通信时关闭 SPI 控制器；
- 关闭 SCK 时钟；
- 设备支持深度休眠；
- 主机休眠时关闭 SPI。


## 13. 示例代码

```python
spi = SPI(sck_pin, mosi_pin, miso_pin, cs_pin, freq=10_000_000, mode=0)
device = SPIDevice(spi, cs_pin)
device.begin()
device.write_reg(0x00, 0xFF)  # 写寄存器
val = device.read_reg(0x00)   # 读寄存器
```


## 14. 调试方法

1. 测 SCK 波形（示波器）；
2. 测 MOSI/MISO 数据波形；
3. 检查 CS 时序（应在 SCK 之前拉低、之后拉高）；
4. 用逻辑分析仪抓整个帧；
5. 验证 WHO_AM_I 寄存器；
6. 降速测试排除时序问题。


## 15. 常见问题

- **设备不响应**：CS 错、SPI 模式错、设备未上电；
- **数据错误**：时钟模式错（CPOL/CPHA）、速率过高；
- **读全 0xFF / 0x00**：设备未连接或 CS 错；
- **MISO 无输出**：设备损坏、CS 错、上拉未接；
- **多设备冲突**：CS 共享或菊花链错。


## 16. 参考资料

- SPI 没有标准协议，设备间差异大；
- 注意时钟模式（0~3）；
- 注意 MSB/LSB；
- 注意位宽（8/16/32 bit）；
- 高速时必须阻抗匹配；
- 长距离需要总线扩展器。



- Motorola SPI Block Guide
- W25Q Flash 数据手册
- ST7735 / ILI9341 显示控制器手册
- 各 MCU 的 SPI HAL 文档
- NRF24L01 / SX1276 数据手册
