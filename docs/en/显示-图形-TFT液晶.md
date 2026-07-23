---
title: TFT LCD
description: "DriverKit — TFT LCD module documentation under the Display category: working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods, and FAQ."
keywords: TFT LCD,Display,Graphics,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debug,ILI9341,ST7789,ST7735,RA8875
category: Display
field: Graphics
module: TFT LCD
---
# TFT LCD


## 1. Module Overview

TFT (Thin Film Transistor) LCD is a type of LCD that uses thin-film transistors to drive each pixel. Common use cases:

- Industrial control panels;
- Smart home panels;
- Instruments and meters;
- Maker projects (ESP32 / STM32);
- Vehicle infotainment;
- Tablets, phones;
- POS terminals;
- Education equipment.

Types:

- **TFT LCD** (common);
- **IPS LCD** (wide viewing angle);
- **LTPS LCD** (low-temperature polycrystalline silicon, high resolution);
- **IGZO LCD** (high resolution, low power);
- **AMOLED** (self-emissive, see OLED document).


## 2. Working Principle and Use Cases

- TFT matrix drives each pixel;
- Backlight (LED) provides light source;
- Liquid crystal molecules change polarization direction under applied electric field, controlling light transmission;
- Color: RGB three-color filter;
- Mainstream driver ICs:
  - **ST7735**: 128x160 / 80x160 (SPI/8080);
  - **ST7789**: 240x240 / 240x320 (SPI/8080);
  - **ILI9341**: 240x320 (SPI/8080);
  - **ILI9486**: 480x320 (SPI/8080);
  - **ILI9488**: 480x320 (SPI/8080, 16/18 bit);
  - **HX8347**: 240x320;
  - **RA8875**: 800x480 (8080 parallel, with graphics acceleration);
  - **NT35510**: 800x1280 HD;
  - **SSD1963**: 800x480 (8080);
  - **LT7683**: 800x480 (8080/SPI);


## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 Small-size TFT (common for makers)

| Model | Size | Resolution | Interface | Driver | Reference Price |
|---|---|---|---|---|---:|
| 0.96" TFT | 0.96 inch | 80x160 | SPI | ST7735S | $5~12 |
| 1.14" TFT | 1.14 inch | 135x240 | SPI | ST7789V | $5~12 |
| 1.28" Round TFT | 1.28 inch | 240x240 | SPI | GC9A01 | $7~18 |
| 1.44" TFT | 1.44 inch | 128x128 | SPI | ST7735 | $5~12 |
| 1.8" TFT | 1.8 inch | 128x160 | SPI | ST7735 | $5~12 |
| 1.54" TFT | 1.54 inch | 240x240 | SPI | ST7789 | $5~15 |
| 2.0" TFT | 2.0 inch | 176x220 | SPI | ILI9225 | $7~18 |
| 2.0" TFT IPS | 2.0 inch | 240x320 | SPI | ILI9341 | $10~22 |
| 2.4" TFT | 2.4 inch | 240x320 | SPI/8080 | ILI9341 | $10~22 |
| 2.8" TFT | 2.8 inch | 240x320 | SPI/8080 | ILI9341 | $13~25 |
| 3.2" TFT | 3.2 inch | 240x320 | 8080 | ILI9341 | $15~35 |
| 3.5" TFT | 3.5 inch | 320x480 | SPI/8080 | ILI9488 | $20~45 |
| 4.0" TFT | 4.0 inch | 480x320 | 8080 | SSD1963 | $25~60 |
| 4.3" TFT | 4.3 inch | 480x272 | 8080 | RA8875 / SSD1963 | $30~75 |
| 5.0" TFT | 5.0 inch | 800x480 | 8080 | RA8875 / SSD1963 | $40~90 |
| 7.0" TFT | 7.0 inch | 800x480 | 8080 | SSD1963 / RA8875 | $50~125 |
| 7.0" TFT HD | 7.0 inch | 1024x600 | LVDS / RGB | - | $75~200 |
| 10.1" TFT | 10.1 inch | 1024x600 | LVDS / RGB | - | $150~400 |

### 3.2 IPS Screens

- 1.5" IPS 240x240 SPI: $7~18;
- 2.0" IPS 240x320 SPI: $10~22;
- 3.5" IPS 320x480 8080: $25~60;
- 4.3" IPS 480x272 RGB: $40~100;
- 5.0" IPS 800x480 RGB: $60~150.

### 3.3 TFT with Touch

| Model | Touch IC | Reference Price |
|---|---|---|
| 1.44" TFT + Touch | XPT2046 | $7~18 |
| 2.4" TFT + Touch | XPT2046 | $15~30 |
| 2.8" TFT + Touch | XPT2046 | $18~35 |
| 3.2" TFT + Touch | XPT2046 | $23~45 |
| 3.5" TFT + Touch | XPT2046 / GT911 | $25~60 |
| 4.0" TFT + Touch | XPT2046 / GT911 | $30~75 |
| 4.3" TFT + Touch | GT911 / FT6336 | $40~100 |
| 5.0" TFT + Touch | GT911 | $50~125 |
| 7.0" TFT + Touch | GT911 / FT6336 | $60~150 |


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Size | 0.96 ~ 10+ inch |
| Resolution | 80x160 ~ 1920x1080 |
| Color | 16-bit RGB565 / 18-bit RGB666 / 24-bit RGB888 |
| Interface | SPI (slow) / 8080 parallel (medium) / RGB (fast) / LVDS (very fast) |
| Backlight | LED constant current drive |
| Touch | Resistive (XPT2046) / Capacitive (GT911, FT6336) |
| Brightness | 200~1000 nits |
| Viewing Angle | TN (narrow) / IPS (wide) |
| Response Time | ms (typical) |
| Operating Temperature | -20~70°C |

**Selection suggestions**:

- Entry / maker: 1.44" / 1.8" SPI ST7735;
- Mid-size: 2.4" / 2.8" SPI/8080 ILI9341;
- Round / smart watch: 1.28" GC9A01;
- High resolution: ST7789 240x240 / 240x320;
- Industrial panels: 4.3" / 5" / 7" 8080 RA8875;
- With touch: GT911 / FT6336 capacitive touch;
- HD large screen: LVDS / RGB.


## 5. Hardware Connection

- Power: 3.3V mainstream, 5V partial;
- Backlight: constant current source (e.g. 50 mA~200 mA), PWM dimming supported;
- Communication level: 3.3V (most);
- SPI speed: up to 40~80 MHz (some support higher);
- 8080 parallel: 16-bit data + WR/RD/CS/RS control;
- RGB interface: 16/18/24-bit parallel;
- LVDS: differential high speed;
- Reset timing: RST low 10ms → high → wait 100ms;
- ESD protection;
- High brightness required in sunlight (> 800 nits).


## 6. Communication Method

- **SPI** (4-wire): SCK/MOSI/CS/DC, limited speed (suitable for small sizes);
- **8080 parallel** (8/16-bit): medium speed (medium sizes);
- **RGB interface**: high speed (large sizes 4.3"+);
- **LVDS**: differential very high speed;
- **MIPI DSI**: large AMOLED screens.


## 7. Initialization Flow

1. Configure GPIO (CS/DC/RST/BL/data lines);
2. Configure SPI/8080/RGB;
3. Hardware reset (RST low → high);
4. Software reset (CMD 0x01);
5. Exit sleep mode;
6. Set pixel format (RGB565/RGB666);
7. Configure display orientation (landscape/portrait);
8. Set window (area to be drawn);
9. Turn display on;
10. Start frame buffer filling.


## 8. Common Driver Interfaces

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
        """color: RGB565."""
        pass

    def set_window(self, x, y, w, h):
        pass

    def write_pixels(self, data):
        """RGB565 data."""
        pass

    def draw_pixel(self, x, y, color):
        pass

    def fill_rect(self, x, y, w, h, color):
        pass

    def draw_image(self, x, y, w, h, data):
        """Draw bitmap (RGB565)."""
        pass

    def set_brightness(self, percent):
        """PWM dimming."""
        pass


class TouchResistive:
    """XPT2046 resistive touch."""
    def __init__(self, spi, cs, irq):
        self.spi = spi
        self.cs = cs
        self.irq = irq

    def begin(self):
        pass

    def read(self):
        """Returns (x, y) or None."""
        pass

    def is_pressed(self):
        return self.irq.value() == 0


class TouchCapacitive:
    """GT911 / FT6336 capacitive touch."""
    def __init__(self, i2c, addr, rst, irq):
        self.i2c = i2c

    def begin(self):
        pass

    def read(self):
        """Returns (x, y) or None."""
        pass

    def get_touches(self):
        """Returns multi-touch list."""
        pass
```



Some TFT controllers have built-in hardware acceleration:

- **RA8875**: rectangle fill, bitmap copy, line drawing;
- **SSD1963**: window setting, hardware scrolling;
- **LT7683**: 2D graphics acceleration, character engine, PNG decoding;
- **ST7796**: window setting, hardware scrolling;
- Reduces MCU computational load.



Embedded GUI libraries:

- **LVGL** (Light and Versatile Graphics Library): open-source, cross-platform, feature-rich;
- **emWin**: commercial, high performance;
- **TouchGFX**: optimized for STM32;
- **uGFX**: lightweight;
- **Adafruit_GFX**: simple Arduino library;
- **TFT_eSPI**: efficient driver for ESP32/STM32 Arduino;
- **LovyanGFX**: high-performance LVGL-compatible driver.



- Pixel fonts (bitmap);
- Anti-aliased fonts;
- Custom fonts (e.g. 5x8 / 8x16 / 12x12 Chinese font library);
- LVGL supports vector fonts (FreeType);
- Chinese font library is large (~a few MB), needs Flash storage;
- SD card storage can reduce MCU Flash usage.



- TE (Tearing Effect) signal: TFT outputs short pulse at end of frame;
- MCU synchronous refresh avoids tearing;
- Double buffering / partial refresh;
- LVGL provides double buffering support.


## 9. Data Format, Units, and Timing

- RGB565: 16 bit = R(5) G(6) B(5);
- RGB666: 18 bit = R(6) G(6) B(6);
- RGB888: 24 bit = R(8) G(8) B(8);
- Frame buffer: typically in row-scan order;
- Byte order: depends on driver (mostly big-endian).


## 10. Calibration, Compensation, and Filtering

- Resistive touch: 4-point / 5-point calibration;
- Calculate coordinate transformation matrix;
- Save to Flash (with checksum);
- Need re-calibration when screen orientation changes.


## 11. Error Handling

- **White / garbled screen**: reset failed, initialization commands wrong;
- **Color error**: pixel format not configured;
- **Partial display**: window setting error;
- **Touch no response**: touch IC initialization failed, coordinate calibration lost;
- **Touch jitter**: insufficient software debounce;
- **Tearing**: TE signal not used.


## 12. Low Power

- Turn off backlight (saves the most);
- Reduce refresh rate;
- Screen sleep mode (some drivers support);
- Partial refresh (partial support).


## 13. Example Code

```python
tft = TFT(spi, dc_pin, rst_pin, cs_pin, bl_pin, 240, 320)
tft.begin()

# Clear screen (red RGB565 = 0xF800)
tft.clear(0xF800)

# Draw rectangle
tft.fill_rect(10, 10, 100, 50, 0x07E0)  # Green

# Draw text
# ... (using GUI library)
```


## 14. Debugging Methods

1. Check power (3.3V, backlight power);
2. Measure RST waveform;
3. Measure SPI / 8080 waveform;
4. Check CS / DC control timing;
5. Test with vendor example code;
6. Use logic analyzer to capture communication;
7. Adjust initialization commands.


## 15. Frequently Asked Questions

- **White screen**: backlight not on, reset not pulled, initialization failed;
- **Garbled screen**: SPI timing wrong, driver model mismatch;
- **Color shift**: RGB order wrong (BGR vs RGB);
- **Orientation wrong**: MV/MX/MY register not configured;
- **Touch offset**: not calibrated;
- **Touch jitter**: software debounce;
- **Hard to see outdoors**: backlight not bright enough;
- **Tearing**: not synchronously refreshed.


## 16. References

- ST7735 / ST7789 / ILI9341 Datasheet
- ILI9488 / SSD1963 / RA8875 Datasheet
- XPT2046 Touch Datasheet
- GT911 / FT6336 Touch Datasheet
- LVGL documentation
- TFT_eSPI library
- Adafruit GFX library