---
title: LED
description: "DriverKit — LED (under Actuators): working principles, common part numbers & reference prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: LED,actuator,light source,DriverKit,embedded,hardware driver,selection,wiring,principle,code example,debugging,WS2812,SK6812,APA102,RGB strip
category: 执行器
field: 光源
module: LED
---
# LED


## 1. Module Overview

LED (Light Emitting Diode) is an electroluminescent semiconductor device. Common uses:

- Indicator lights
- Decorative lighting
- Displays
- LED strips
- Street lighting / illumination
- Automotive lighting
- Plant lighting
- UV sterilization, UV curing
- IR communication / IR remote control

Types:

- **Indicator LED**: single color, low power (5mm)
- **Power LED**: high brightness (1W, 3W, 5W)
- **RGB LED**: independent R/G/B control
- **RGBW LED**: RGB + white
- **Addressable LED**: built-in driver IC (WS2812, SK6812, APA102)
- **LED strip**: 5050 / 2835 LEDs in series
- **COB LED**: high-density integration
- **Dot-matrix display**: 8×8 / 16×32 etc.
- **UV LED**: 365nm / 395nm
- **IR LED**: 850nm / 940nm


## 2. Working Principle and Use Cases

When a semiconductor PN junction is forward-biased, electrons and holes recombine to release photons. The wavelength of light depends on the semiconductor material (bandgap).

Basic characteristics:

- Unidirectional conduction
- Threshold voltage (Vf): 1.8V~3.5V (color/material dependent)
- Forward current (If): typically 5~20 mA (indicator) or 100~700 mA (power)
- Brightness is proportional to If (within the allowed range)

Colors and wavelengths:

- Infrared (IR): 850 nm, 940 nm
- Red: 620~630 nm
- Yellow: 580~590 nm
- Green: 520~530 nm
- Blue: 460~470 nm
- White (blue + yellow phosphor): 5000K~6500K
- UV: 365 nm, 395 nm


## 3. Common Part Numbers and Reference Prices

> Prices are for budgeting only.

### 3.1 Indicator LEDs (5mm / 3mm)

| Type | Color | Quantity | Reference Price |
|---|---|---|---:|
| 5mm LED | Red / Green / Yellow / Blue / White | 100 pcs | $3~8 |
| 3mm LED | Various | 100 pcs | $2~5 |
| Flashing LED | Multiple | 50 pcs | $4~10 |
| Slow-flash LED | Multiple | 50 pcs | $5~12 |
| Multi-color LED (R/G/B) | Three color | 50 pcs | $7~15 |

### 3.2 Power LEDs

| Part Number | Power | Color | Reference Price |
|---|---|---|---:|
| 1W LED (Luxeon clone) | 1W | White / Warm white | $0.5~1 |
| 3W LED (high power) | 3W | White / Warm white | $1~3 |
| 5W LED | 5W | White / Warm white | $2~5 |
| 10W LED | 10W | White / Warm white | $3~8 |
| 20W LED | 20W | White / Warm white | $5~12 |
| 50W LED | 50W | White / Warm white | $12~30 |
| 100W LED | 100W | White / Warm white | $20~50 |
| COB LED 10W | 10W | White / Warm white | $3~8 |
| COB LED 50W | 50W | White / Warm white | $8~20 |
| COB LED 100W | 100W | White / Warm white | $15~40 |

### 3.3 RGB / RGBW LEDs

| Part Number | Type | Interface | Reference Price |
|---|---|---|---:|
| Common-anode RGB LED | 5mm | 4 pins | $0.5~1 |
| Common-cathode RGB LED | 5mm | 4 pins | $0.5~1 |
| RGB 5050 LED | SMD | 4 pins | $0.5~1 |
| RGBW 5050 LED | SMD | 5 pins | $0.5~1 |
| WS2812B | Addressable | Single wire | $0.5~1 |
| WS2812B strip | Strip | Single wire | $2~5 / m |
| WS2812B ring | 12/16/24 LEDs | Single wire | $3~10 |
| SK6812 | Addressable RGBW | Single wire | $0.5~1 |
| SK6812 strip | Strip | Single wire | $3~8 / m |
| APA102 | Addressable SPI | Dual wire | $0.5~1 |
| APA102 strip | Strip | SPI | $3~8 / m |
| WS2801 | Addressable SPI | Dual wire | $1~3 |
| LPD8806 | Addressable SPI | Dual wire | $1~3 |
| TLC59401 | Addressable PWM | Multiple wires | $1~3 |
| HD107S | Addressable | Single wire | $0.5~1 |

### 3.4 LED Matrix and Strips

| Type | Part Number | Reference Price |
|---|---|---:|
| 8x8 LED matrix | 1588BS | $3~8 |
| 8x32 RGB matrix | HUB75 | $15~40 |
| 16x32 RGB matrix | HUB75 | $25~75 |
| 32x64 RGB matrix | HUB75 | $100~300 |
| 16x16 RGB matrix | HUB75 | $15~40 |
| WS2812 matrix | 8x8 / 16x16 | $15~75 |
| WS2812 round board | 1/8/12/16/24 LEDs | $3~15 |
| WS2812 flexible strip | 30/60/144 LEDs/m | $2~8 / m |

### 3.5 UV and IR LEDs

| Part Number | Wavelength | Power | Reference Price |
|---|---|---|---:|
| UV LED 365nm | 365nm | 3W | $5~15 |
| UV LED 395nm | 395nm | 3W | $3~8 |
| UV LED 405nm | 405nm | 3W | $3~8 |
| UV lamp tube | 254nm | 8-30W | $15~75 |
| IR LED 850nm | 850nm | 3W | $3~8 |
| IR LED 940nm | 940nm | 3W | $3~8 |
| IR LED array | 850nm | 10W+ | $10~40 |


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Color / wavelength | nm (determines color and use) |
| Forward voltage Vf | V |
| Forward current If | mA |
| Brightness | mcd, lumens |
| Viewing angle | degrees |
| Power | W (power LEDs) |
| Color temperature K | warm white / neutral white / cool white |
| Color rendering index CRI | Ra (high CRI 90+) |
| Working temperature | -40 ~ 80°C |
| Lifetime | 25,000~50,000 hours |

**Selection suggestions**:

- Indicator: 5mm LED (R/G/Y/B) + current-limiting resistor
- Decoration: WS2812B strip
- Display: HUB75 matrix + Gigabit Ethernet driver
- Illumination: COB LED + constant-current driver
- Plant lighting: purple light (660nm + 450nm)
- UV curing: 365nm UV LED
- IR remote control: 940nm IR LED


## 5. Hardware Connection

### 5.1 Current-Limiting Resistor

```text
R = (Vcc - Vf) / If
e.g., Vcc=5V, Vf=2.0V, If=10mA
R = (5 - 2.0) / 0.01 = 300 Ω
```

### 5.2 Power LED

Requires constant-current (CC) driver:

- 1W LED: 350 mA
- 3W LED: 700 mA
- 5W LED: 1000 mA
- 10W LED: 1200 mA
- Pay attention to heat dissipation (aluminum substrate, air cooling)

### 5.3 WS2812B

- Single-wire communication (NZR / return-to-zero)
- 800 kbps
- Data level 5V (some support 3.3V)
- Multiple in series require sufficient 5V supply capacity (60 mA per LED at full white)
- Long-distance transmission needs a signal amplifier

### 5.4 APA102

- SPI dual wire (data + clock)
- High refresh rate
- More stable than WS2812, more reliable over long distances

### 5.5 LED Matrix (HUB75)

- Common drivers: HX1230, FM6126, ICN2038
- Data pins: R1/G1/B1/R2/G2/B2 + A/B/C/D (row select) + CLK + LAT + OE
- Scan types: 1/4, 1/8, 1/16 etc.
- High-density needs Gigabit Ethernet or FPGA driver


## 6. Communication Method

- **GPIO + current-limiting resistor**: single-color LED
- **PWM**: brightness control (> 200 Hz to avoid flicker)
- **Single-wire NZR (WS2812B)**: single-wire addressable
- **SPI (APA102, WS2801)**: dual-wire addressable
- **HUB75**: RGB matrix protocol
- **DMX512**: stage lighting
- **I2C**: LP8860 etc. LED driver chips


## 7. Initialization Flow

1. Wiring (VCC/GND + signal)
2. Configure GPIO / PWM / SPI
3. Power-on initialization
4. Start control


## 8. Driver Interface

```python
class LED:
    def __init__(self, pin):
        self.pin = pin

    def on(self):
        self.pin.high()

    def off(self):
        self.pin.low()

    def toggle(self):
        self.pin.toggle()


class PWMLED:
    def __init__(self, pwm):
        self.pwm = pwm

    def set_brightness(self, percent):
        """0~100."""
        self.pwm.duty(percent)


class RGBLED:
    def __init__(self, r_pwm, g_pwm, b_pwm):
        self.r = r_pwm
        self.g = g_pwm
        self.b = b_pwm

    def set_color(self, r, g, b):
        self.r.duty(r)
        self.g.duty(g)
        self.b.duty(b)


class WS2812:
    def __init__(self, pin, n_leds):
        self.pin = pin
        self.n = n_leds
        self.buf = bytearray(n_leds * 3)

    def begin(self):
        pass

    def set_pixel(self, i, r, g, b):
        idx = i * 3
        # WS2812B uses GRB order
        self.buf[idx] = g
        self.buf[idx+1] = r
        self.buf[idx+2] = b

    def set_all(self, r, g, b):
        for i in range(self.n):
            self.set_pixel(i, r, g, b)

    def show(self):
        """Transmit data (implemented by the specific driver)."""
        pass
```



- Frequency > 200 Hz to avoid visible flicker
- 100 Hz suits movie / game (avoids camera-sync flicker)
- Breathing effect: slow sine wave
- Analog dimming: DC current adjustment (higher precision)


## 9. Data Format, Units, and Timing

- Single color: boolean or PWM duty cycle
- RGB: three 8-bit values (0~255)
- RGBW: four 8-bit values
- WS2812: 24-bit GRB
- APA102: 32-bit (5-bit global + 3×8-bit RGB + 5-bit global)
- HUB75: scan-type, row select + R/G/B data


## 10. Error Handling and Exception Recovery

- **Doesn't light up**: reversed power, resistor too large, no signal output
- **Burnt out**: resistor too small, excessive current, insufficient heat dissipation
- **Wrong color**: RGB wiring wrong, common-anode / common-cathode wrong
- **WS2812 wrong color**: data order (GRB vs RGB)
- **WS2812 signal distortion**: insufficient voltage, long-distance transmission, timing off
- **Flicker**: PWM frequency too low, supply current insufficient



- Do not look directly at bright LEDs (retinal damage)
- Do not expose skin or eyes to UV LED
- Pay attention to heat dissipation for high-power LEDs (fire hazard)


## 11. Low Power

- Faint glow when off (some LEDs)
- Cut power to reduce quiescent draw
- PWM dimming saves energy


## 12. Example Code

```python
# RGB LED
led = RGBLED(r_pwm, g_pwm, b_pwm)
led.set_color(255, 0, 0)  # red
time.sleep_ms(1000)
led.set_color(0, 255, 0)  # green
time.sleep_ms(1000)

# WS2812 strip
strip = WS2812(led_pin, n=60)
strip.begin()
strip.set_all(0, 0, 255)  # all blue
strip.show()
```


## 13. Debugging Methods

1. Test single LED brightness/color
2. Measure voltage across the current-limiting resistor
3. PWM signal waveform (oscilloscope)
4. WS2812: capture single-wire signal with a logic analyzer
5. Long-time temperature check (power LEDs)
6. Check supply current (full-load vs idle)


## 14. Frequently Asked Questions

- **Doesn't light up**: current-limiting resistor too large, power not connected
- **Burnt out**: resistor too small or missing, insufficient heat dissipation
- **Uneven brightness**: power-line voltage drop (long strips); use thicker wires + multiple feed points
- **WS2812 wrong color**: voltage drop (> 5m add power injection)
- **WS2812 no response**: timing off (frequency drift)
- **Matrix flicker**: scan frequency too low (> 200 Hz)
- **Visible flicker**: PWM frequency too low (> 200 Hz)


## 15. References

- WS2812B / SK6812 / APA102 datasheets
- HUB75 LED matrix protocol
- Cree / Nichia / OSRAM power LED specifications
- OSRAM horticultural LED application notes
- TLC59401 16-channel PWM LED driver datasheet

## 16. Color Space

```python
def hsv_to_rgb(h, s, v):
    """h: 0~360, s: 0~1, v: 0~1."""
    i = int(h / 60) % 6
    f = h / 60 - int(h / 60)
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    if i == 0: return int(v*255), int(t*255), int(p*255)
    if i == 1: return int(q*255), int(v*255), int(p*255)
    if i == 2: return int(p*255), int(v*255), int(t*255)
    if i == 3: return int(p*255), int(q*255), int(v*255)
    if i == 4: return int(t*255), int(p*255), int(v*255)
    if i == 5: return int(v*255), int(p*255), int(q*255)
```