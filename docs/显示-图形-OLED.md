---
title: OLED
description: DriverKit · 显示分类下的 OLED 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。
keywords: OLED,显示,图形,DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试,SSD1306,SH1106,0.96寸,I2C屏
category: 显示
field: 图形
module: OLED
---
# OLED 显示


## 1. 模块概览

OLED（Organic Light-Emitting Diode，有机发光二极管）显示屏是自发光显示技术，与 LCD 不同无需背光。常见于：
- 智能手表；
- 手机屏幕（高端）；
- 创客项目（ESP32、Arduino）；
- 仪表显示；
- 电视面板；
- 工业控制面板；
- 医疗设备。

类型：
- **PMOLED**（无源矩阵）：小尺寸，简单，单色/双色/全彩；
- **AMOLED**（有源矩阵 TFT）：大尺寸，手机屏幕主流；
- **OLED 显示模块**：驱动 IC + OLED 面板（I2C/SPI 接口）。


## 2. 工作原理与适用场景

OLED 像素是电流驱动的有机发光材料，通电时自发光。
- 优点：对比度高（纯黑）、响应快、薄、可弯曲；
- 缺点：寿命有限（蓝光退化）、易烧屏、户外可见度一般。

常见驱动 IC：
- **SSD1306**：单色 128x64 / 128x32（I2C/SPI）；
- **SSD1315**：SSD1306 升级；
- **SH1106**：与 SSD1306 兼容（I2C/SPI）；
- **SSD1351**：RGB 128x128 / 128x96；
- **CH1115**：128x64；
- **SSD1322**：256x64（灰度）；
- **SSD1327**：128x128 灰度 / 96x96 灰度；
- **SSD1331**：96x64 RGB；
- **LD7032**：OLED 灰度；
- **HX8703**：AMOLED 驱动。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 单色 OLED

| 型号 | 尺寸 | 分辨率 | 接口 | 颜色 | 参考价 |
|---|---|---|---|---|---:|
| 0.96" OLED | 0.96 寸 | 128x64 | I2C/SPI | 蓝/白/双色 | ¥10~25 |
| 1.3" OLED | 1.3 寸 | 128x64 | I2C/SPI | 蓝/白/双色 | ¥10~25 |
| 0.91" OLED | 0.91 寸 | 128x32 | I2C | 蓝/白 | ¥8~20 |
| 1.54" OLED | 1.54 寸 | 128x64 | SPI | 单色 | ¥15~30 |
| 2.42" OLED | 2.42 寸 | 128x64 | SPI | 单色 | ¥25~50 |
| 2.7" OLED | 2.7 寸 | 128x64 | I2C/SPI/8080 | 单色 | ¥30~70 |
| 3.12" OLED | 3.12 寸 | 256x64 | SPI | 单色 | ¥40~90 |
| 0.49" OLED | 0.49 寸 | 64x32 | I2C | 单色 | ¥5~15 |

### 3.2 彩色 OLED

| 型号 | 尺寸 | 分辨率 | 接口 | 参考价 |
|---|---|---|---|---:|
| 0.96" SSD1331 | 0.96 寸 | 96x64 | SPI | ¥20~40 |
| 1.5" SSD1351 | 1.5 寸 | 128x128 | SPI | ¥30~70 |
| 1.27" RGB OLED | 1.27 寸 | 128x96 | SPI | ¥30~70 |
| 1.5" RGB OLED | 1.5 寸 | 128x128 | SPI | ¥40~90 |
| 0.78" Micro OLED | 0.78 寸 | 128x64 | SPI | ¥50~120 |
| SSD1322 256x64 灰度 | 2.8 寸 | 256x64 | SPI | ¥40~90 |
| SSD1327 128x128 16 灰度 | 1.5 寸 | 128x128 | SPI | ¥40~90 |

### 3.3 AMOLED

| 型号 | 尺寸 | 分辨率 | 接口 | 特点 | 参考价 |
|---|---|---|---|---|---:|
| 1.39" AMOLED | 1.39 寸 | 454x454 | SPI | 圆形手表屏 | ¥80~180 |
| 1.43" AMOLED | 1.43 寸 | 466x466 | SPI | 圆形 | ¥100~200 |
| 1.8" AMOLED | 1.8 寸 | 368x448 | SPI | 方形 | ¥150~300 |
| 2.0" AMOLED | 2.0 寸 | 410x502 | SPI | 方形 | ¥200~400 |
| 4.0" AMOLED | 4.0 寸 | 360x640 | MIPI | 手机 | ¥300~600 |
| 5.5" AMOLED | 5.5 寸 | 1080x1920 | MIPI | 手机 | ¥500~1500 |
| 6.5" AMOLED | 6.5 寸 | 1080x2400 | MIPI | 手机 | ¥800~2000 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 尺寸 | 0.49 ~ 6+ 寸 |
| 分辨率 | 64x32 ~ 1080x2400 |
| 颜色 | 单色（白/蓝）/ 灰度（4/16）/ RGB / 16M 色 |
| 接口 | I2C（低速）/ SPI（高速）/ 8080 并口 / MIPI（AMOLED） |
| 驱动电压 | 3.3V / 5V（部分） |
| 逻辑电平 | 3.3V（多数）/ 5V（部分） |
| 亮度 | cd/m²（nits） |
| 寿命 | 30,000~100,000 小时 |
| 视角 | 160°~180°（OLED 全视角） |

**选型建议**：
- 创客/小项目：0.96" I2C SSD1306；
- 中尺寸：1.3"、1.5" SPI SSD1351（彩色）；
- 灰度显示：SSD1327；
- 智能手表：AMOLED 1.39"+ 圆形；
- 高分辨率：AMOLED + MIPI（需强 MCU）。


## 5. 硬件连接

- 电源：3.3V 主流，加去耦电容；
- 通信电平：3.3V TTL；
- I2C 上拉：4.7kΩ；
- SPI 速率：最高 10 MHz（多数驱动）；
- 复位引脚（RST）：上电时序；
- 直流升压（内部）：OLED 需要 ~7~15V 高电压驱动，IC 内部升压；
- 防烧屏：避免长时间显示静止图像（AMOLED 严重）；
- 静电防护；
- 阳光直射下亮度可能不够（OLED 不如 LED 背光 LCD）。


## 6. 通信方式

- **I2C**：100/400 kHz，慢刷新（SSD1306 单色小尺寸）；
- **SPI**：10 MHz 高速，全彩大屏；
- **8/16 位并口（8080）**：极快刷新；
- **MIPI DSI**：AMOLED 大屏；
- **I2C 地址**：SSD1306 默认 0x3C（部分 0x3D）。


## 7. 初始化流程

1. 配置 GPIO（DC/RST/CS/数据线）；
2. 配置 SPI 或 I2C；
3. 复位（RST 拉低 100ms → 拉高）；
4. 发送初始化序列（多组命令）；
5. 开启显示（CMD_AE 或类似）；
6. 关闭显示（CMD_AF）。
7. 启动显示缓冲填充。


## 8. 驱动接口

```python
class OLED:
    """SSD1306 128x64 单色 OLED。"""
    def __init__(self, spi, dc, rst, cs=None, width=128, height=64):
        self.spi = spi
        self.dc = dc
        self.rst = rst
        self.width = width
        self.height = height
        self.buf = bytearray(width * height // 8)  # 1 bit/pixel

    def begin(self):
        """初始化。"""
        pass

    def clear(self):
        self.buf = bytearray(len(self.buf))

    def show(self):
        """发送帧缓冲到 OLED。"""
        pass

    def draw_pixel(self, x, y, color=1):
        if 0 <= x < self.width and 0 <= y < self.height:
            idx = x + (y // 8) * self.width
            if color:
                self.buf[idx] |= (1 << (y % 8))
            else:
                self.buf[idx] &= ~(1 << (y % 8))

    def draw_text(self, x, y, text, size=1):
        """绘制 5x8 字符。"""
        pass

    def draw_line(self, x0, y0, x1, y1):
        pass

    def draw_rect(self, x, y, w, h, fill=False):
        pass

    def draw_circle(self, cx, cy, r, fill=False):
        pass


class ColorOLED:
    """SSD1351 128x128 RGB OLED。"""
    def __init__(self, spi, dc, rst, cs, width=128, height=128):
        self.buf = bytearray(width * height * 2)  # RGB565

    def draw_pixel(self, x, y, color):
        """color: RGB565。"""
        pass

    def show(self):
        pass
```



ASCII 字符（5x8 字体）：
- 每个字符 5 字节（5x8 = 40 bit，每列 1 字节）；
- 6x8 / 8x16 / 12x16 等不同字体；
- 支持中文字库（需要 Flash 存字模）。



- 图像转 XBM / BMP 数据；
- 工具：Image2LCD、LCD Image Converter、GIMP 导出；
- 存储到 Flash（SPIFFS、SD 卡）；
- 大图像建议压缩。



- 不长时间显示静止图像；
- AMOLED 严重，PMOLED 较轻；
- 屏保：随机像素；
- 关闭屏幕（黑底）；
- 定期刷新像素位置（像素偏移）；
- 自动息屏（超时关闭）。


## 9. 数据格式与单位

- 单色：1 bit/pixel（128x64 = 1KB 缓冲）；
- 灰度：4/8 bit/pixel；
- 16 灰度 SSD1327：4 bit/pixel；
- RGB565：16 bit/pixel；
- RGB888：24 bit/pixel。


## 10. 中断与 DMA

- 数据就绪中断（部分驱动）；
- 帧缓冲 DMA 传输（高速刷新）；
- TE（撕裂效果）信号：同步刷新避免撕裂。


## 11. 错误处理

- **无显示**：电源未接、复位未拉、初始化失败；
- **花屏**：SPI 时序错、缓冲溢出、驱动不兼容；
- **刷新慢**：缓冲传输慢、I2C 速率低；
- **烧屏**：长时间静止图像；
- **色彩偏**：颜色校准未做；
- **对比度差**：对比度寄存器未配置；
- **部分黑屏**：IC 内部升压电路故障。


## 12. 低功耗

- 关闭显示（CMD_AE）：< 10 µA；
- 显示时降低亮度节能；
- 间歇显示（按需点亮）。


## 13. 示例代码

```python
oled = OLED(spi, dc_pin, rst_pin, cs_pin, 128, 64)
oled.begin()
oled.clear()
oled.draw_text(0, 0, "Hello World")
oled.draw_line(0, 30, 127, 30)
oled.draw_rect(0, 32, 128, 32, fill=False)
oled.show()
```


## 14. 调试方法

1. 检查电源电压；
2. 测试 RST 时序；
3. 测 SPI/I2C 波形；
4. 读取驱动 IC ID；
5. 跑厂商示例代码；
6. 用逻辑分析仪抓通信。


## 15. 常见问题

- **全黑**：电源、复位、初始化失败；
- **花屏**：驱动 IC 不匹配（SSD1306 vs SH1106）、SPI 时序错；
- **白屏**：亮度未配置、升压失败；
- **颜色偏**：颜色寄存器未配置；
- **刷新慢**：SPI 速率低、缓冲传输慢；
- **烧屏**：静止图像过长；
- **室外看不见**：OLED 亮度有限；
- **通信失败**：CS 未拉低（SPI）、上拉未接（I2C）。


## 16. 参考资料

- SSD1306 / SSD1351 数据手册
- SH1106 数据手册
- Adafruit SSD1306 / GFX 库参考
- U8g2 / U8g2 库文档
- AMOLED 驱动板手册
- LVGL 图形库（嵌入式 GUI）