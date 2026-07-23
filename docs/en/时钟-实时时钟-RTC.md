---
title: RTC
description: "DriverKit — Real-Time Clock (RTC) module (under Clock): working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: RTC,clock,real-time clock,DriverKit,embedded,hardware driver,selection,wiring,principle,code example,debug,DS1307,DS3231,RX8025,PCF8563
category: Clock
field: Real-Time Clock
module: RTC
---
# RTC (Real-Time Clock)


## 1. Module Overview

An RTC (Real-Time Clock) is a dedicated integrated circuit for tracking time; it can keep running from a backup battery when the main supply is removed. Common applications include:

- Perpetual calendar clocks
- Data-logger timestamps
- Time-attendance terminals
- Industrial PLCs
- Smart-home scheduling
- Utility meters (electricity, water)
- Medical equipment
- IoT device time synchronization
- Alarm clock systems

Common RTC categories:

- **External RTC**: DS1307, DS3231, PCF8563, etc. (with crystal)
- **MCU internal RTC**: built into some MCUs (limited accuracy)
- **Network Time Protocol (NTP)**: synchronized over WiFi / Ethernet
- **GPS time**: synchronized from a GNSS receiver


## 2. Working Principles and Use Cases

- 32.768 kHz crystal provides the 1 Hz time base
- Counters for seconds, minutes, hours, day, month, year, weekday (BCD format)
- Backup battery (CR2032) keeps it running when the main supply is off
- Alarm interrupt (can wake the MCU)
- Square-wave output (32.768 kHz / 1 Hz / 1 kHz / 32 kHz, etc.)
- Temperature compensation (high-end RTCs)


## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 External RTC ICs

| Part Number | Interface | Accuracy | Features | Reference Price |
|---|---|---|---|---|
| DS1307 | I2C | ±2 ppm (depends on the crystal) | Classic | $1~3 |
| DS1307+ | I2C | ±2 ppm | Refreshed | $1~3 |
| DS3231 | I2C | ±2 ppm (±1 minute / year) | High accuracy | $2~5 |
| DS3231S | I2C | ±2 ppm | High accuracy SOIC | $2~5 |
| DS3231M | I2C | ±5 ppm | Integrated MEMS | $3~8 |
| DS3232 | I2C | ±2 ppm | With SRAM | $3~8 |
| DS3234 | SPI | ±2 ppm | SPI version | $3~8 |
| PCF8563 | I2C | ±50 ppm | NXP classic | $1~3 |
| PCF85063 | I2C | ±50 ppm | Refreshed | $1~3 |
| PCF8523 | I2C | ±50 ppm | NXP | $1~3 |
| PCF85263 | I2C | ±20 ppm | High accuracy | $2~5 |
| MCP79400 | I2C | ±50 ppm | Microchip | $1~3 |
| MCP79410 | I2C | ±50 ppm | With SRAM | $2~5 |
| MCP79411 | I2C | ±50 ppm | With EEPROM | $2~5 |
| RX8025 | I2C | ±5 ppm | EPSON | $3~6 |
| RX8900 | I2C | ±5 ppm | EPSON high accuracy | $3~6 |
| SD2403 | I2C | ±5 ppm | Domestic | $2~5 |
| SD2405 | I2C | ±5 ppm | Domestic | $2~5 |
| SD3088 | I2C | ±5 ppm | Domestic high accuracy | $2~5 |
| ISL12022 | I2C | ±5 ppm | Renesas | $2~5 |
| ISL12026 | I2C | ±5 ppm | With EEPROM | $3~6 |
| ISL1208 | I2C | ±5 ppm | Renesas | $2~5 |
| AB1805 | I2C | ±5 ppm | Abracon | $2~5 |
| AM1805 | I2C | ±5 ppm | Integrated crystal | $3~8 |

### 3.2 RTC Modules

- DS1307 module: $2~5 (with CR2032 holder)
- DS3231 module: $3~8 (with CR2032 holder)
- PCF8563 module: $2~5
- High-accuracy DS3231SN module: $3~8
- Large backup-battery module (CR1220): $2~5

### 3.3 MCU Internal RTC

| MCU | RTC Accuracy | Backup Domain | Reference Price |
|---|---|---|---|
| STM32 | ±20 ppm | VBAT | $3~13 |
| ESP32 | ±50 ppm | Internal + external | $4~13 |
| Arduino (ATmega) | ±50 ppm | None | $5~12 |
| RP2040 | ±50 ppm | None | $3~8 |
| Nordic nRF52 | ±20 ppm | None | $5~12 |

### 3.4 Network Time Synchronization (NTP)

- Over WiFi / Ethernet
- Accuracy: 10 ~ 100 ms (network dependent)
- NTP servers: pool.ntp.org, cn.ntp.org, time.windows.com
- Protocol: NTP (UDP 123)

### 3.5 GPS Time Synchronization

- Accuracy: µs level
- Requires a GNSS module
- PPS signal for high-precision synchronization


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Interface | I2C / SPI |
| Accuracy | ppm (2 ppm = ±1 min/year; 50 ppm = ±30 min/year) |
| Backup battery | CR2032 / CR1220 / super-cap / Li-Ion |
| Backup current | < 1 µA |
| Alarm interrupt | Supported |
| Square-wave output | Multiple frequencies |
| SRAM | Some ICs include (e.g. DS3232: 236 B) |
| Supply voltage | 1.8 V / 3.3 V |
| Operating temperature | -40 ~ 85 °C |

**Selection recommendations**:

- Entry-level: DS1307 + CR2032
- High accuracy: DS3231 (±2 ppm)
- Ultra-high accuracy: DS3231 with temperature compensation
- Low power: PCF8563 / RX8900
- Domestic: SD2405 / SD3088
- Embedded: MCU internal RTC + NTP sync


## 5. Hardware Connection and Electrical Notes

### 5.1 Basic circuit

- VCC: main power (3.3 V / 5 V)
- GND: ground
- SDA / SCL: I2C (with 4.7 kΩ pull-ups)
- 32.768 kHz crystal (most ICs are integrated)
- VBAT: backup battery positive
- INT: alarm interrupt output
- SQW: square-wave output
- DS1307 uses an external 32.768 kHz crystal (most modules include it)
- DS3231 has an integrated crystal (with temperature compensation)

### 5.2 Backup battery

- CR2032: 240 mAh, ~10 years
- CR1220: 35 mAh, ~3 years
- Super-capacitor: rechargeable, but lower capacity
- Lithium battery: ML2032 (rechargeable)
- Charge current < 1 µA
- Reverse-polarity protection diode

### 5.3 PCB routing

- Keep crystal traces short
- Keep them away from interference sources
- Shield if the environment is noisy (some sensitive applications)

Battery features (on supported chips):

- Battery voltage detection
- Low-battery warning
- Automatic switchover between main supply and backup
- Charge management (ML2032)


## 6. Communication Method or Control Signal

- **I2C**: most RTCs (DS1307 / DS3231 / PCF8563)
- **SPI**: a few RTCs (DS3234)
- **3-wire**: some legacy RTCs


## 7. Initialization Flow

1. Configure I2C
2. Check the chip ID
3. Check the oscillator
4. Check the backup-battery voltage
5. Set the time (on first use)
6. Start


## 8. Common Driver Interfaces

```python
class RTC:
    """Generic RTC."""
    def __init__(self, bus, address=0x68):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def read_time(self):
        """Return (year, month, day, hour, minute, second, weekday)."""
        pass

    def write_time(self, year, month, day, hour, minute, second):
        pass

    def read_datetime(self):
        """Return a datetime object."""
        pass

    def write_datetime(self, dt):
        pass

    def set_alarm(self, hour, minute, second, callback):
        pass

    def enable_square_wave(self, freq):
        """Enable square-wave output."""
        pass

    def is_running(self):
        """Return whether the oscillator is running."""
        pass


class DS3231(RTC):
    """DS3231 high-accuracy RTC."""
    def __init__(self, bus, address=0x68):
        super().__init__(bus, address)

    def read_temperature(self):
        """Return internal temperature (used for compensation)."""
        pass


class PCF8563(RTC):
    """PCF8563 RTC."""
    def __init__(self, bus, address=0x51):
        super().__init__(bus, address)
```

Alarm interrupt:

- Alarm on second / minute / hour / day / month / year
- INT pin pulled low on match
- Wakes the MCU from deep sleep
- Single-shot or periodic alarms

Square-wave output:

- 1 Hz: pulse-per-second
- 1.024 kHz: standard frequency
- 4.096 kHz: standard frequency
- 8.192 kHz: standard frequency
- 32.768 kHz: raw crystal frequency
- Some RTCs allow frequency configuration


## 9. Data Format, Units, and Timing

- BCD (Binary Coded Decimal): e.g. 25 seconds = `0x25`
- Time registers (DS1307):
  - `0x00`: seconds (BCD)
  - `0x01`: minutes (BCD)
  - `0x02`: hours (BCD)
  - `0x03`: weekday (1 = Sunday)
  - `0x04`: day (BCD)
  - `0x05`: month (BCD)
  - `0x06`: year (BCD, 00 ~ 99)


## 10. Calibration, Compensation, and Filtering

### 11.1 Time calibration

- Manual: write the time registers
- Network: via NTP sync
- GPS: via PPS sync
- Long-term drift: DS3231 ±2 ppm → ±1 minute per year
- Typical RTC: ±50 ppm → ±15 minutes per year

### 11.2 Oscillator calibration

- Adjust the crystal load capacitor
- Digital trim (some ICs support +N / -N ppm)
- DS3231 + aging compensation (manually add ±1 ppm per month)


## 11. Error Handling and Exception Recovery

- **Oscillator stopped**: faulty crystal or poor soldering
- **Time does not update**: I2C error, chip not configured
- **Backup battery exhausted**: monitor it (some ICs support this)
- **Alarm not responding**: interrupt not enabled, INT pin not connected
- **Year overflow**: needs re-setting after 100 years (leap-year compensation exists)


## 12. Low Power

- Standby current < 1 µA (from the backup battery)
- After main supply is removed, the backup battery takes over
- Backup battery lasts 5 ~ 10 years
- NTP sync can reduce dependence on the RTC


## 13. Example Code

```python
class DS3231:
    def __init__(self, bus, address=0x68):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def set_time(self, year, month, day, hour, minute, second):
        """Set the time."""
        self.bus.write_then_write(self.address, b'\x00', bytes([
            bin_to_bcd(second),
            bin_to_bcd(minute),
            bin_to_bcd(hour),
            bin_to_bcd(0),  # weekday
            bin_to_bcd(day),
            bin_to_bcd(month),
            bin_to_bcd(year - 2000),
        ]))

    def read_time(self):
        """Read the time."""
        data = self.bus.read_then_write(self.address, b'\x00', 7)
        return {
            'year': 2000 + bcd_to_bin(data[6]),
            'month': bcd_to_bin(data[5]),
            'day': bcd_to_bin(data[4]),
            'hour': bcd_to_bin(data[2]),
            'minute': bcd_to_bin(data[1]),
            'second': bcd_to_bin(data[0]),
        }


rtc = DS3231(i2c, address=0x68)
rtc.begin()
rtc.set_time(2024, 1, 15, 12, 30, 0)
print(rtc.read_time())
```


## 14. Debugging Methods

1. Measure VCC and VBAT voltages
2. Verify I2C communication
3. Check the crystal waveform (32.768 kHz)
4. Use an oscilloscope on the square-wave output
5. Long-term accuracy test (compare against NTP)
6. Test backup retention after power removal


## 15. Frequently Asked Questions

- **Inaccurate time**: crystal tolerance, no compensation, temperature drift
- **Backup battery failed**: dead cell or wrong soldering
- **I2C not working**: wrong address (DS3231 = 0x68, PCF8563 = 0x51), missing pull-ups
- **Garbled time**: CH / STOP bit set, oscillator stopped
- **Alarm not firing**: interrupt not enabled, time not configured
- **Leap-year error**: leap-year compensation not enabled
- **Year overflow**: needs re-setting after 100 years


## 16. References

- DS1307 accuracy depends on the external crystal (most modules ship with a plain crystal, so error is large)
- DS3231 integrates the crystal and temperature compensation, giving much better accuracy
- The time must be set on first use
- Do not remove the backup battery (otherwise time is lost)
- After many years (10+) the crystal ages and accuracy drops
- For high accuracy, consider NTP or GPS sync
- The alarm interrupt can wake the MCU from low-power modes

- Maxim DS1307 / DS3231 / DS3232 datasheets
- NXP PCF8563 / PCF8523 datasheets
- EPSON RX8025 / RX8900 datasheets
- SD2405 / SD3088 domestic RTC datasheets
- STM32 RTC reference manual
- NTP protocol specification (RFC 5905)
- ESP32 internal-RTC reference documentation


## 17. BCD ↔ Binary Conversion

```python
def bcd_to_bin(bcd):
    return (bcd >> 4) * 10 + (bcd & 0x0F)

def bin_to_bcd(bin):
    return ((bin // 10) << 4) | (bin % 10)
```
