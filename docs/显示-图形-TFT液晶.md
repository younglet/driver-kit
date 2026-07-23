# TFT 液晶


## 1. 模块概览

TFT（Thin Film Transistor，薄膜晶体管）液晶显示是 LCD 的一种，使用薄膜晶体管驱动每个像素。常见于：
- 工业控制面板；
- 智能家居面板；
- 仪器仪表；
- 创客项目（ESP32 / STM32）；
- 车载中控；
- 平板、手机；
- POS 机；
- 教育设备。

类型：
- **TFT LCD**（常见）；
- **IPS LCD**（广视角）；
- **LTPS LCD**（低温多晶硅，高分辨率）；
- **IGZO LCD**（高分辨率低功耗）；
- **AMOLED**（自发光，见 OLED 文档）。


## 2. 工作原理与适用场景

- TFT 矩阵驱动每个像素；
- 背光（LED）提供光源；
- 液晶分子在外加电场下改变偏振方向，控制透光；
- 彩色：RGB 三色滤光片；
- 主流驱动 IC：
  - **ST7735**：128x160 / 80x160（SPI/8080）；
  - **ST7789**：240x240 / 240x320（SPI/8080）；
  - **ILI9341**：240x320（SPI/8080）；
  - **ILI9486**：480x320（SPI/8080）；
  - **ILI9488**：480x320（SPI/8080，16/18 bit）；
  - **HX8347**：240x320；
  - **RA8875**：800x480（8080 并口，含图形加速）；
  - **NT35510**：800x1280 高清；
  - **SSD1963**：800x480（8080）；
  - **LT7683**：800x480（8080/SPI）；


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 小尺寸 TFT（创客常用）

| 型号 | 尺寸 | 分辨率 | 接口 | 驱动 | 参考价 |
|---|---|---|---|---|---:|
| 0.96" TFT | 0.96 寸 | 80x160 | SPI | ST7735S | ¥10~25 |
| 1.14" TFT | 1.14 寸 | 135x240 | SPI | ST7789V | ¥10~25 |
| 1.28" 圆形 TFT | 1.28 寸 | 240x240 | SPI | GC9A01 | ¥15~35 |
| 1.44" TFT | 1.44 寸 | 128x128 | SPI | ST7735 | ¥10~25 |
| 1.8" TFT | 1.8 寸 | 128x160 | SPI | ST7735 | ¥10~25 |
| 1.54" TFT | 1.54 寸 | 240x240 | SPI | ST7789 | ¥12~30 |
| 2.0" TFT | 2.0 寸 | 176x220 | SPI | ILI9225 | ¥15~35 |
| 2.0" TFT IPS | 2.0 寸 | 240x320 | SPI | ILI9341 | ¥20~45 |
| 2.4" TFT | 2.4 寸 | 240x320 | SPI/8080 | ILI9341 | ¥20~45 |
| 2.8" TFT | 2.8 寸 | 240x320 | SPI/8080 | ILI9341 | ¥25~50 |
| 3.2" TFT | 3.2 寸 | 240x320 | 8080 | ILI9341 | ¥30~70 |
| 3.5" TFT | 3.5 寸 | 320x480 | SPI/8080 | ILI9488 | ¥40~90 |
| 4.0" TFT | 4.0 寸 | 480x320 | 8080 | SSD1963 | ¥50~120 |
| 4.3" TFT | 4.3 寸 | 480x272 | 8080 | RA8875 / SSD1963 | ¥60~150 |
| 5.0" TFT | 5.0 寸 | 800x480 | 8080 | RA8875 / SSD1963 | ¥80~180 |
| 7.0" TFT | 7.0 寸 | 800x480 | 8080 | SSD1963 / RA8875 | ¥100~250 |
| 7.0" TFT 高清 | 7.0 寸 | 1024x600 | LVDS / RGB | - | ¥150~400 |
| 10.1" TFT | 10.1 寸 | 1024x600 | LVDS / RGB | - | ¥300~800 |

### 3.2 IPS 屏

- 1.5" IPS 240x240 SPI：¥15~35；
- 2.0" IPS 240x320 SPI：¥20~45；
- 3.5" IPS 320x480 8080：¥50~120；
- 4.3" IPS 480x272 RGB：¥80~200；
- 5.0" IPS 800x480 RGB：¥120~300。

### 3.3 带触摸 TFT

| 型号 | 触摸 IC | 参考价 |
|---|---|---|
| 1.44" TFT + 触摸 | XPT2046 | ¥15~35 |
| 2.4" TFT + 触摸 | XPT2046 | ¥30~60 |
| 2.8" TFT + 触摸 | XPT2046 | ¥35~70 |
| 3.2" TFT + 触摸 | XPT2046 | ¥45~90 |
| 3.5" TFT + 触摸 | XPT2046 / GT911 | ¥50~120 |
| 4.0" TFT + 触摸 | XPT2046 / GT911 | ¥60~150 |
| 4.3" TFT + 触摸 | GT911 / FT6336 | ¥80~200 |
| 5.0" TFT + 触摸 | GT911 | ¥100~250 |
| 7.0" TFT + 触摸 | GT911 / FT6336 | ¥120~300 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 尺寸 | 0.96 ~ 10+ 寸 |
| 分辨率 | 80x160 ~ 1920x1080 |
| 颜色 | 16 位 RGB565 / 18 位 RGB666 / 24 位 RGB888 |
| 接口 | SPI（慢）/ 8080 并口（中）/ RGB（快）/ LVDS（超快） |
| 背光 | LED 恒流驱动 |
| 触摸屏 | 电阻（XPT2046）/ 电容（GT911、FT6336） |
| 亮度 | 200~1000 nits |
| 视角 | TN（窄）/ IPS（宽） |
| 响应时间 | ms（一般） |
| 工作温度 | -20~70°C |

**选型建议**：
- 入门/创客：1.44"/1.8" SPI ST7735；
- 中尺寸：2.4"/2.8" SPI/8080 ILI9341；
- 圆形/智能手表：1.28" GC9A01；
- 高分辨率：ST7789 240x240 / 240x320；
- 工业面板：4.3"/5"/7" 8080 RA8875；
- 带触摸：GT911 / FT6336 电容触摸；
- 高清大屏：LVDS / RGB。


## 5. 硬件连接

- 电源：3.3V 主流，5V 部分；
- 背光：恒流源（如 50 mA~200 mA），可 PWM 调光；
- 通信电平：3.3V（多数）；
- SPI 速率：最高 40~80 MHz（部分支持更高）；
- 8080 并口：16 位数据 + WR/RD/CS/RS 控制；
- RGB 接口：16/18/24 位并行；
- LVDS：差分高速；
- 复位时序：RST 拉低 10ms → 拉高 → 等待 100ms；
- 静电防护；
- 阳光下需要高亮度（> 800 nits）。


## 6. 通信方式

- **SPI**（4 线）：SCK/MOSI/CS/DC，速度有限（适合小尺寸）；
- **8080 并口**（8/16 位）：中速（中等尺寸）；
- **RGB 接口**：高速（大尺寸 4.3"+）；
- **LVDS**：差分超高速；
- **MIPI DSI**：AMOLED 大屏。


## 7. 初始化流程

1. 配置 GPIO（CS/DC/RST/BL/数据线）；
2. 配置 SPI/8080/RGB；
3. 硬件复位（RST 拉低 → 拉高）；
4. 软件复位（CMD 0x01）；
5. 退出睡眠模式；
6. 设置像素格式（RGB565/RGB666）；
7. 配置显示方向（横竖屏）；
8. 设置窗口（要绘制的区域）；
9. 启动显示；
10. 开始帧缓冲填充。


## 8. 驱动接口

```python
class TFT:
    def __init__(self, spi, dc, rst, cs, bl, width, height):
        self.spi = spi
        self.dc = dc
        self.rst = rst
        self.cs = cs
        self.bl = bl
        self.width = width
        self.height = height
        self.buf = bytearray(width * height * 2)  # RGB565

    def begin(self):
        pass

    def clear(self, color=0):
        """color: RGB565。"""
        pass

    def set_window(self, x, y, w, h):
        pass

    def write_pixels(self, data):
        """RGB565 数据。"""
        pass

    def draw_pixel(self, x, y, color):
        pass

    def fill_rect(self, x, y, w, h, color):
        pass

    def draw_image(self, x, y, w, h, data):
        """绘制位图（RGB565）。"""
        pass

    def set_brightness(self, percent):
        """PWM 调光。"""
        pass


class TouchResistive:
    """XPT2046 电阻触摸。"""
    def __init__(self, spi, cs, irq):
        self.spi = spi
        self.cs = cs
        self.irq = irq

    def begin(self):
        pass

    def read(self):
        """返回 (x, y) 或 None。"""
        pass

    def is_pressed(self):
        return self.irq.value() == 0


class TouchCapacitive:
    """GT911 / FT6336 电容触摸。"""
    def __init__(self, i2c, addr, rst, irq):
        self.i2c = i2c

    def begin(self):
        pass

    def read(self):
        """返回 (x, y) 或 None。"""
        pass

    def get_touches(self):
        """返回多点触摸列表。"""
        pass
```



部分 TFT 控制器内置硬件加速：
- **RA8875**：矩形填充、位图复制、画线；
- **SSD1963**：窗口设置、硬件滚动；
- **LT7683**：2D 图形加速、字符引擎、PNG 解码；
- **ST7796**：窗口设置、硬件滚动；
- 减少 MCU 计算负担。



嵌入式 GUI 库：
- **LVGL**（Light and Versatile Graphics Library）：开源、跨平台、功能强大；
- **emWin**：商业、性能高；
- **TouchGFX**：STM32 优化；
- **uGFX**：轻量级；
- **Adafruit_GFX**：简单 Arduino 库；
- **TFT_eSPI**：ESP32/STM32 Arduino 高效驱动；
- **LovyanGFX**：高性能 LVGL 兼容驱动。



- 像素字体（点阵）；
- 抗锯齿字体；
- 自定义字体（如 5x8 / 8x16 / 12x12 中文字库）；
- LVGL 支持矢量字体（FreeType）；
- 中文字库大（~几 MB），需 Flash 存储；
- SD 卡存储可减少 MCU Flash 占用。



- TE（撕裂效果）信号：TFT 在帧结束后输出短脉冲；
- MCU 同步刷新避免撕裂；
- 双缓冲 / 局部刷新；
- LVGL 提供双缓冲支持。


## 9. 数据格式与单位

- RGB565：16 bit = R(5) G(6) B(5)；
- RGB666：18 bit = R(6) G(6) B(6)；
- RGB888：24 bit = R(8) G(8) B(8)；
- 帧缓冲：通常按行扫描顺序；
- 字节序：取决于驱动（多数 big-endian）。


## 10. 校准与滤波

- 电阻触摸：4 点 / 5 点校准；
- 计算坐标转换矩阵；
- 保存到 Flash（带校验）；
- 屏幕方向不同时需要重新校准。


## 11. 错误处理

- **白屏/花屏**：复位失败、初始化命令错；
- **颜色错**：像素格式未配置；
- **部分显示**：窗口设置错误；
- **触摸不响应**：触摸 IC 初始化失败、坐标校准丢失；
- **触摸跳变**：软件去抖不足；
- **撕裂**：未使用 TE 信号。


## 12. 低功耗

- 关闭背光（最高节省）；
- 降低刷新率；
- 屏幕睡眠模式（部分驱动支持）；
- 局部刷新（部分支持）。


## 13. 示例代码

```python
tft = TFT(spi, dc_pin, rst_pin, cs_pin, bl_pin, 240, 320)
tft.begin()

# 清屏（红色 RGB565 = 0xF800）
tft.clear(0xF800)

# 画矩形
tft.fill_rect(10, 10, 100, 50, 0x07E0)  # 绿色

# 画文字
# ... (使用 GUI 库)
```


## 14. 调试方法

1. 检查电源（3.3V、背光电源）；
2. 测 RST 波形；
3. 测 SPI / 8080 波形；
4. 检查 CS / DC 控制时序；
5. 用厂商示例代码测试；
6. 用逻辑分析仪抓通信；
7. 调整初始化命令。


## 15. 常见问题

- **白屏**：背光未亮、复位未拉、初始化失败；
- **花屏**：SPI 时序错、驱动型号不匹配；
- **颜色偏**：RGB 顺序错（BGR vs RGB）；
- **方向错**：MV/MX/MY 寄存器未配置；
- **触摸偏移**：未校准；
- **触摸抖**：软件去抖；
- **户外看不清**：背光不够亮；
- **撕裂**：未同步刷新。


## 16. 参考资料

- ST7735 / ST7789 / ILI9341 数据手册
- ILI9488 / SSD1963 / RA8875 数据手册
- XPT2046 触摸数据手册
- GT911 / FT6336 触摸数据手册
- LVGL 文档
- TFT_eSPI 库
- Adafruit GFX 库