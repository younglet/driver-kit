---
title: OLED
description: "DriverKit — OLED module documentation under the Display category: working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods, and FAQ."
keywords: OLED,Display,Graphics,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debug,SSD1306,SH1106,0.96 inch,I2C screen
category: Display
field: Graphics
module: OLED
---
# OLED Display


## 1. Module Overview

OLED (Organic Light-Emitting Diode) displays are self-emissive — unlike LCDs, they do not require a backlight. Common use cases:

- Smart watches;
- Mobile phone screens (high-end);
- Maker projects (ESP32, Arduino);
- Instrument panels;
- TV panels;
- Industrial control panels;
- Medical devices.

Types:

- **PMOLED** (Passive Matrix): small size, simple, monochrome / dual-color / full color;
- **AMOLED** (Active Matrix TFT): large size, mainstream for phones;
- **OLED display modules**: driver IC + OLED panel (I2C/SPI interface).


## 2. Working Principle and Use Cases

OLED pixels are made of organic light-emitting materials driven by current — they emit light when current flows.

- Pros: high contrast (true black), fast response, thin, flexible;
- Cons: limited lifetime (blue degradation), burn-in, average outdoor visibility.

Common driver ICs:

- **SSD1306**: monochrome 128x64 / 128x32 (I2C/SPI);
- **SSD1315**: upgrade of SSD1306;
- **SH1106**: compatible with SSD1306 (I2C/SPI);
- **SSD1351**: RGB 128x128 / 128x96;
- **CH1115**: 128x64;
- **SSD1322**: 256x64 (grayscale);
- **SSD1327**: 128x128 grayscale / 96x96 grayscale;
- **SSD1331**: 96x64 RGB;
- **LD7032**: OLED grayscale;
- **HX8703**: AMOLED driver.


## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 Monochrome OLED

| Model | Size | Resolution | Interface | Color | Reference Price |
|---|---|---|---|---|---:|
| 0.96" OLED | 0.96 inch | 128x64 | I2C/SPI | Blue/White/Dual-color | $5~12 |
| 1.3" OLED | 1.3 inch | 128x64 | I2C/SPI | Blue/White/Dual-color | $5~12 |
| 0.91" OLED | 0.91 inch | 128x32 | I2C | Blue/White | $4~10 |
| 1.54" OLED | 1.54 inch | 128x64 | SPI | Monochrome | $7~15 |
| 2.42" OLED | 2.42 inch | 128x64 | SPI | Monochrome | $13~25 |
| 2.7" OLED | 2.7 inch | 128x64 | I2C/SPI/8080 | Monochrome | $15~35 |
| 3.12" OLED | 3.12 inch | 256x64 | SPI | Monochrome | $20~45 |
| 0.49" OLED | 0.49 inch | 64x32 | I2C | Monochrome | $3~8 |

### 3.2 Color OLED

| Model | Size | Resolution | Interface | Reference Price |
|---|---|---|---|---:|
| 0.96" SSD1331 | 0.96 inch | 96x64 | SPI | $10~20 |
| 1.5" SSD1351 | 1.5 inch | 128x128 | SPI | $15~35 |
| 1.27" RGB OLED | 1.27 inch | 128x96 | SPI | $15~35 |
| 1.5" RGB OLED | 1.5 inch | 128x128 | SPI | $20~45 |
| 0.78" Micro OLED | 0.78 inch | 128x64 | SPI | $25~60 |
| SSD1322 256x64 grayscale | 2.8 inch | 256x64 | SPI | $20~45 |
| SSD1327 128x128 16-grayscale | 1.5 inch | 128x128 | SPI | $20~45 |

### 3.3 AMOLED

| Model | Size | Resolution | Interface | Feature | Reference Price |
|---|---|---|---|---|---:|
| 1.39" AMOLED | 1.39 inch | 454x454 | SPI | Round watch screen | $40~90 |
| 1.43" AMOLED | 1.43 inch | 466x466 | SPI | Round | $50~100 |
| 1.8" AMOLED | 1.8 inch | 368x448 | SPI | Square | $75~150 |
| 2.0" AMOLED | 2.0 inch | 410x502 | SPI | Square | $100~200 |
| 4.0" AMOLED | 4.0 inch | 360x640 | MIPI | Phone | $150~300 |
| 5.5" AMOLED | 5.5 inch | 1080x1920 | MIPI | Phone | $250~750 |
| 6.5" AMOLED | 6.5 inch | 1080x2400 | MIPI | Phone | $400~1000 |


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Size | 0.49 ~ 6+ inch |
| Resolution | 64x32 ~ 1080x2400 |
| Color | Monochrome (white/blue) / Grayscale (4/16) / RGB / 16M colors |
| Interface | I2C (low speed) / SPI (high speed) / 8080 parallel / MIPI (AMOLED) |
| Drive Voltage | 3.3V / 5V (partial) |
| Logic Level | 3.3V (most) / 5V (partial) |
| Brightness | cd/m² (nits) |
| Lifetime | 30,000~100,000 hours |
| Viewing Angle | 160°~180° (full viewing angle for OLED) |

**Selection suggestions**:

- Maker / small projects: 0.96" I2C SSD1306;
- Mid-size: 1.3", 1.5" SPI SSD1351 (color);
- Grayscale display: SSD1327;
- Smart watches: AMOLED 1.39"+ round;
- High resolution: AMOLED + MIPI (requires strong MCU).


## 5. Hardware Connection

- Power: 3.3V mainstream, add decoupling capacitors;
- Communication level: 3.3V TTL;
- I2C pull-up: 4.7kΩ;
- SPI speed: up to 10 MHz (most drivers);
- Reset pin (RST): power-on timing;
- DC-DC boost (internal): OLED requires ~7~15V high voltage drive, internal IC boost;
- Anti burn-in: avoid long-term display of static images (AMOLED is severe);
- ESD protection;
- May be insufficiently bright under direct sunlight (OLED is not as bright as LED-backlit LCD).


## 6. Communication Method

- **I2C**: 100/400 kHz, slow refresh (SSD1306 small monochrome);
- **SPI**: 10 MHz high speed, full-color large screens;
- **8/16-bit parallel (8080)**: very fast refresh;
- **MIPI DSI**: large AMOLED screens;
- **I2C address**: SSD1306 default 0x3C (some 0x3D).


## 7. Initialization Flow

1. Configure GPIO (DC/RST/CS/data lines);
2. Configure SPI or I2C;
3. Reset (RST low 100ms → high);
4. Send initialization sequence (multiple command groups);
5. Turn display on (CMD_AE or similar);
6. Turn display off (CMD_AF).
7. Start frame buffer filling.


## 8. Common Driver Interfaces

```python
class OLED:
    """SSD1306 128x64 monochrome OLED."""
    def __init__(self, spi, dc, rst, cs=None, width=128, height=64):
        self.spi = spi
        self.dc = dc
        self.rst = rst
        self.width = width
        self.height = height
        self.buf = bytearray(width * height // 8)  # 1 bit/pixel

    def begin(self):
        """Initialize."""
        pass

    def clear(self):
        self.buf = bytearray(len(self.buf))

    def show(self):
        """Send frame buffer to OLED."""
        pass

    def draw_pixel(self, x, y, color=1):
        if 0 <= x < self.width and 0 <= y < self.height:
            idx = x + (y // 8) * self.width
            if color:
                self.buf[idx] |= (1 << (y % 8))
            else:
                self.buf[idx] &= ~(1 << (y % 8))

    def draw_text(self, x, y, text, size=1):
        """Draw 5x8 characters."""
        pass

    def draw_line(self, x0, y0, x1, y1):
        pass

    def draw_rect(self, x, y, w, h, fill=False):
        pass

    def draw_circle(self, cx, cy, r, fill=False):
        pass


class ColorOLED:
    """SSD1351 128x128 RGB OLED."""
    def __init__(self, spi, dc, rst, cs, width=128, height=128):
        self.buf = bytearray(width * height * 2)  # RGB565

    def draw_pixel(self, x, y, color):
        """color: RGB565."""
        pass

    def show(self):
        pass
```



ASCII characters (5x8 font):

- Each character is 5 bytes (5x8 = 40 bits, 1 byte per column);
- 6x8 / 8x16 / 12x16 and other fonts;
- Chinese font support (requires Flash to store glyphs).



- Image to XBM / BMP data;
- Tools: Image2LCD, LCD Image Converter, GIMP export;
- Store to Flash (SPIFFS, SD card);
- Recommend compression for large images.



- Do not display static images for long periods;
- AMOLED is severe, PMOLED is mild;
- Screensaver: random pixels;
- Turn off screen (black background);
- Periodically shift pixel positions (pixel offset);
- Auto screen-off (timeout shutdown).


## 9. Data Format, Units, and Timing

- Monochrome: 1 bit/pixel (128x64 = 1KB buffer);
- Grayscale: 4/8 bit/pixel;
- 16-grayscale SSD1327: 4 bit/pixel;
- RGB565: 16 bit/pixel;
- RGB888: 24 bit/pixel.


## 10. Interrupts, DMA, FIFO, and Buffers

- Data-ready interrupt (some drivers);
- Frame buffer DMA transfer (high-speed refresh);
- TE (Tearing Effect) signal: synchronizes refresh to avoid tearing.


## 11. Error Handling

- **No display**: power not connected, reset not pulled, initialization failed;
- **Garbled screen**: SPI timing wrong, buffer overflow, driver incompatible;
- **Slow refresh**: buffer transfer slow, I2C speed low;
- **Burn-in**: long-term static images;
- **Color shift**: color calibration not done;
- **Poor contrast**: contrast register not configured;
- **Partial black screen**: internal IC boost circuit failure.


## 12. Low Power

- Turn off display (CMD_AE): < 10 µA;
- Reduce brightness during display to save power;
- Intermittent display (turn on on demand).


## 13. Example Code

```python
oled = OLED(spi, dc_pin, rst_pin, cs_pin, 128, 64)
oled.begin()
oled.clear()
oled.draw_text(0, 0, "Hello World")
oled.draw_line(0, 30, 127, 30)
oled.draw_rect(0, 32, 128, 32, fill=False)
oled.show()
```


## 14. Debugging Methods

1. Check power voltage;
2. Test RST timing;
3. Measure SPI/I2C waveform;
4. Read driver IC ID;
5. Run vendor example code;
6. Use logic analyzer to capture communication.


## 15. Frequently Asked Questions

- **All black**: power, reset, initialization failed;
- **Garbled screen**: driver IC mismatch (SSD1306 vs SH1106), SPI timing wrong;
- **White screen**: brightness not configured, boost failed;
- **Color shift**: color register not configured;
- **Slow refresh**: SPI speed low, buffer transfer slow;
- **Burn-in**: static images for too long;
- **Invisible outdoors**: OLED brightness is limited;
- **Communication failure**: CS not pulled low (SPI), pull-up not connected (I2C).


## 16. References

- SSD1306 / SSD1351 Datasheet
- SH1106 Datasheet
- Adafruit SSD1306 / GFX library reference
- U8g2 / U8g2 library documentation
- AMOLED driver board manual
- LVGL graphics library (embedded GUI)