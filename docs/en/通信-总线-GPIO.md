---
title: GPIO
description: "DriverKit — GPIO (under Communication): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: GPIO,communication,bus,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,GPIO,pull-up,pull-down,interrupt,push-pull output
category: Communication
field: Bus
module: GPIO
---
# GPIO


## 1. Module Overview

GPIO (General Purpose Input/Output) is the most basic interface between the MCU and the outside world. It is the foundation of all digital interfaces (I2C, SPI, UART, etc.).

Applications:
- Controlling LEDs, buzzers, and relays;
- Reading buttons and level signals;
- Emulating interfaces (I2C, SPI, UART, PWM);
- Interrupt triggering (external interrupts);
- Wake-up (low-power sleep);
- ADC and DAC input/output;
- Touch detection (on some MCUs);
- On-chip interconnect.


## 2. Working Principle and Use Cases

Each GPIO pin internally contains:
- Input buffer (TTL/CMOS-compatible Schmitt trigger);
- Output driver (push-pull / open-drain / open-collector);
- Configurable pull-up / pull-down resistors;
- Control logic (direction, data registers);
- Multiplexer (connects to alternate-function peripherals).

Output modes:
- **Push-pull**: actively drives both high and low, with strong current capability;
- **Open-drain**: actively drives only low; high level requires an external pull-up;
- **Open-collector**: similar to open-drain (for bipolar transistors);
- **Input-only**: used as analog inputs such as ADC.

Input modes:
- **Floating**: high impedance;
- **Pull-up**: internally tied to VDD;
- **Pull-down**: internally tied to GND.


## 3. Key Parameters and Selection

| Parameter | Description |
|---|---|
| Pin count | Varies by MCU |
| Operating voltage | 1.8V / 3.3V / 5V |
| Output current | mA (push-pull typically 4~25 mA) |
| Pull resistor | kΩ (50~100 kΩ internal pull-up / pull-down) |
| Toggle speed | MHz (fast / slow IO) |
| Interrupt capability | Rising / Falling / Both / Level |
| Wake-up capability | Some GPIOs support wake-up from deep sleep |
| Alternate function | UART, SPI, I2C, ADC, PWM, CAN, etc. |
| 5V tolerance | Some MCUs (Arduino, some ESP32) |
| Protection | ESD, back-EMF |

**Selection guide**:
- Entry-level: Arduino UNO, ESP32, STM32F1;
- High performance: STM32F4, ESP32-S3, Raspberry Pi;
- Ultra-low power: STM32L, ESP32-C3;
- AI inference: Raspberry Pi, Jetson Nano;
- GPIO expansion: MCP23017 (I2C), 74HC595 (SPI).


## 4. Hardware Connection

### 5.1 Input

- **Schmitt trigger**: rejects noise;
- **Pull-up / pull-down**: floating inputs are noise-sensitive; buttons need pull-up or pull-down;
- **Protection**: TVS for ESD;
- **Current limiting**: large input currents need a series resistor;
- **Level shifting**: use resistor divider or level shifter to connect 3.3V MCU to 5V signals.

### 5.2 Output

- **Push-pull**: can drive both high and low;
- **Open-drain**: actively drives low; high comes from external pull-up (I2C, wired-AND);
- **Current limit**: exceeding the spec will damage the GPIO;
- **Inductive loads**: flyback diode;
- **Total current limit**: the MCU usually has an overall current limit (e.g. 200 mA).

### 5.3 Multiplexing

- AF0~AF15: each pin has multiple alternate functions;
- Check the datasheet before configuring;
- Two alternate functions cannot be enabled at the same time.

### 5.4 Interrupts and Wake-up

- **External interrupt**: enters ISR when triggered;
- **Wake-up**: wakes the MCU from deep sleep;
- **Debouncing**: hardware RC or software delay.


## 5. Communication Method

- Single-wire: GPIO bit-banging (UART, WS2812, etc.);
- Bus: pins used as peripheral functions (I2C, SPI, UART, PWM, CAN, etc.);
- Parallel: 8/16/32-bit data bus (high-speed transfer);
- Interrupt: event-driven.


## 6. Initialization Flow

1. Configure RCC (clock);
2. Configure GPIO registers (mode, speed, pull-up / pull-down, alternate function);
3. Configure interrupts (NVIC, EXTI);
4. Set initial level;
5. Start.


## 7. Driver Interface

```python
class GPIO:
    """Base GPIO."""
    def __init__(self, pin, mode):
        self.pin = pin
        self.mode = mode  # INPUT / OUTPUT

    def begin(self):
        pass

    def high(self):
        pass

    def low(self):
        pass

    def value(self):
        pass

    def toggle(self):
        pass


class ExtInt:
    """External interrupt."""
    def __init__(self, pin, trigger):
        self.pin = pin
        self.trigger = trigger  # RISING / FALLING / BOTH / LOW / HIGH

    def begin(self, callback):
        """callback: interrupt callback function."""
        pass

    def disable(self):
        pass

    def enable(self):
        pass


class ExpanderGPIO:
    """MCP23017 GPIO expander."""
    def __init__(self, bus, address=0x20):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def pin_mode(self, pin, mode):
        pass

    def digital_write(self, pin, value):
        pass

    def digital_read(self, pin):
        pass

    def digital_write_word(self, value):
        """16-bit write."""
        pass
```


## 8. Data Format and Units

- Single GPIO: boolean (0/1);
- Port: multi-bit (e.g. 8/16/32 bit);
- Analog expansion (CD4051): channel number (0~15);
- Interrupt events: callback function.


## 9. Calibration and Filtering

### 10.1 Hardware Debouncing

```text
Button → 10nF capacitor → GND
Button → 100Ω → MCU GPIO
```

### 10.2 Software Debouncing

```python
def debounce(pin, last_state, last_time, stable_time_ms=20):
    current = pin.value()
    if current != last_state:
        last_time = time.ticks_ms()
        last_state = current
    elif time.ticks_diff(time.ticks_ms(), last_time) > stable_time_ms:
        return current, last_state, last_time
    return None, last_state, last_time
```


## 10. Interrupts and DMA

- Trigger modes: rising, falling, both, low, high;
- Priority: configured in NVIC;
- Interrupt nesting: a high-priority ISR can preempt a low-priority one;
- ISR: keep it short to avoid blocking;
- Debouncing: hardware RC or software delay.


## 11. Error Handling

- **Wrong level**: wrong pin configuration or level mismatch;
- **GPIO burned out**: over-current or ESD;
- **Interrupt storm**: level trigger + bouncing → software rate limiting;
- **Bus conflict**: multiple devices sharing a GPIO;
- **Floating input**: pull-up / pull-down not configured.


## 12. Low Power

- After deep sleep, only special GPIOs can wake the MCU;
- ESP32: RTC_GPIO can wake from deep sleep;
- STM32: WKUP pin wakes Standby;
- The interrupt triggers a wake-up callback.



- Unused GPIOs should be configured as analog input (lowest power);
- Unused peripherals should have their clocks turned off;
- Use RTC GPIOs as wake-up sources;
- During deep sleep, disable all pins except the wake-up pin.


## 13. Example Code

```python
led = GPIO(pin, OUTPUT)
button = GPIO(pin, INPUT_PULLUP)
btn_int = ExtInt(button_pin, FALLING)

def on_press():
    led.toggle()

btn_int.begin(on_press)
while True:
    time.sleep_ms(100)
```


## 14. Debugging Methods

1. Measure pin voltage (multimeter);
2. Measure waveforms (oscilloscope, logic analyzer);
3. Toggle an LED to test output;
4. Use a button input to test reading;
5. Check register configuration;
6. Run long-term current measurement.


## 15. Frequently Asked Questions

- **Not responding**: wrong pin configuration, level mismatch;
- **GPIO burned out**: over-current, ESD;
- **Interrupt not triggering**: wrong trigger mode, interrupt not enabled;
- **Interrupt storm**: bouncing not removed;
- **Level bouncing**: long-line interference; needs shielding / pull-up / drive strength.


## 16. References

- Each MCU's datasheet (ST, Espressif, NXP, Raspberry Pi)
- STM32 Standard Peripheral Library / HAL Library
- ESP-IDF GPIO driver documentation
- Arduino GPIO reference
- 74HC595 / MCP23017 datasheets

## 17. Common Platforms and Reference Prices

> Prices are for reference only.

### 3.1 MCU Built-in GPIO

| MCU Series | GPIO Count | Features | Reference Price (chip) |
|---|---|---|---:|
| STM32F0 | 14~51 | Mainstream ARM Cortex-M0 | $2~8 |
| STM32F1 | 26~112 | Mainstream ARM Cortex-M3 | $3~13 |
| STM32F4 | 50~176 | High-performance Cortex-M4 | $5~25 |
| STM32H7 | 80~168 | High-performance Cortex-M7 | $10~40 |
| STM32G0 | 14~44 | Low-power Cortex-M0+ | $2~8 |
| STM32L0 | 14~51 | Ultra-low-power Cortex-M0+ | $3~10 |
| STM32L4 | 27~83 | Low-power Cortex-M4 | $5~20 |
| ESP8266 | 16 | Wi-Fi + GPIO | $3~8 |
| ESP32 | 34 | Wi-Fi + BLE + GPIO | $4~13 |
| ESP32-S3 | 45 | Upgraded version | $5~12 |
| ESP32-C3 | 22 | RISC-V single-core | $3~8 |
| ESP32-H2 | 22 | 802.15.4 | $3~8 |
| Raspberry Pi Pico RP2040 | 30 | Dual-core Cortex-M0+ | $3~8 |
| Arduino UNO (ATmega328P) | 20 | Classic 8-bit | $5~12 (board) |
| Arduino Mega (ATmega2560) | 54 | 8-bit large board | $15~30 (board) |
| Arduino Nano / Pro Mini | 14~22 | Compact 8-bit | $5~15 (board) |
| Raspberry Pi 4 GPIO | 40 | Linux SBC | $150~300 (board) |
| Raspberry Pi Zero | 26 | Compact SBC | $50~100 (board) |
| NVIDIA Jetson series | 40+ | AI SBC | $250~2500 (board) |
| NXP i.MX RT | varies | Crossover MCU | $5~25 |
| GD32 | STM32-like | Domestic alternative | $2~8 |
| CH32V | varies | RISC-V domestic | $2~8 |
| BL702 / BL808 | varies | Bouffalo | $3~8 |

### 3.2 GPIO Expander Chips

| Part Number | Type | Interface | Features | Chip Price | Module Price |
|---|---|---|---|---:|---:|
| 74HC595 | 8-bit SIPO | SPI | Classic expander | $0.5~1 | $1~4 |
| 74HC164 | 8-bit SIPO | SPI | Shift register | $0.5~1 | $1~4 |
| 74HC165 | 8-bit PISO | SPI | Input expander | $1~3 | $2~5 |
| 74HC4067 | 16-to-1 analog mux | Digital | Analog expansion | $1~3 | $2~5 |
| CD4051 | 8-to-1 analog mux | Digital | Analog expansion | $1~3 | $2~5 |
| CD4052 | Dual 4-to-1 analog mux | Digital | Analog expansion | $1~3 | $2~5 |
| CD4067 | 16-to-1 analog mux | Digital | Analog expansion | $1~3 | $2~5 |
| MCP23017 | 16-bit I/O expander | I2C | Classic | $2~5 | $3~8 |
| MCP23008 | 8-bit I/O expander | I2C | Simplified | $1~3 | $2~5 |
| MCP23S17 | 16-bit I/O expander | SPI | SPI version | $2~5 | $3~8 |
| PCA9535 | 16-bit I/O expander | I2C | TI | $2~5 | $3~8 |
| PCA9555 | 16-bit I/O expander | I2C | TI | $2~5 | $3~8 |
| PCA9539 | 16-bit I/O expander | I2C | TI | $2~5 | $3~8 |
| PCA9554 | 8-bit I/O expander | I2C | TI | $1~3 | $2~5 |
| TCA9534 | 8-bit I/O expander | I2C | TI | $1~3 | $2~5 |
| TCA6424 | 24-bit I/O expander | I2C | Large expander | $3~6 | $5~10 |
| SX1509 | 16-bit I/O + LED driver | I2C | Multi-function | $3~6 | $5~12 |
| AW9523 | 16-bit I/O + LED driver | I2C | Multi-function | $2~5 | $3~8 |
| PCF8574 | 8-bit I/O expander | I2C | TI legacy | $1~3 | $2~5 |
| PCF8575 | 16-bit I/O expander | I2C | TI legacy | $2~5 | $3~8 |