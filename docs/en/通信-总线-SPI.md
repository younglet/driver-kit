---
title: SPI
description: "DriverKit — SPI (under Communication): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: SPI,communication,bus,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,SPI,SCK,MOSI,MISO,chip select,full-duplex
category: Communication
field: Bus
module: SPI
---
# SPI


## 1. Module Overview

SPI (Serial Peripheral Interface) is a synchronous full-duplex serial bus proposed by Motorola in the 1980s, commonly used for:
- Flash memory;
- SD cards;
- Displays;
- High-speed sensors;
- ADC / DAC;
- Audio codecs;
- Wireless modules (LoRa, NRF24L01).

Features:
- Full-duplex (simultaneous transmit and receive);
- Master / slave architecture (multiple slaves);
- High speed (tens of MHz to 100+ MHz);
- Simple protocol;
- Uses more pins (4~6 wires).


## 2. Working Principle and Use Cases

### 2.1 Signal Lines

- **SCK** (SCLK): serial clock (driven by master);
- **MOSI** (SIMO): master out, slave in;
- **MISO** (SOMI): master in, slave out;
- **SS / CS** (nCS): slave chip select (driven by master, active low).

### 2.2 Clock Modes

CPOL (clock polarity) and CPHA (clock phase) define 4 modes:

| Mode | CPOL | CPHA | Idle State | Sampling Edge |
|---|---|---|---|---|
| 0 | 0 | 0 | Low | Rising edge |
| 1 | 0 | 1 | Low | Falling edge |
| 2 | 1 | 0 | High | Falling edge |
| 3 | 1 | 1 | High | Rising edge |

### 2.3 Frame Format

- **MSB / LSB**: most devices use MSB first;
- **Bit width**: 8 / 16 / 32 bits (mostly 8 bits);
- **Frame length**: fixed or variable.

### 2.4 Multiple Slaves

- Independent chip select: one CS line per slave (most common);
- Daisy chain: slave MISO connected to next slave MOSI (used for multiple identical slaves);
- Bus topology: only the master's MOSI / MISO / SCK are shared.


## 3. Common Part Numbers and Prices

### 3.1 SPI Devices (Typical Applications)

| Device | Type | Interface | Features | Reference Price |
|---|---|---|---|---:|
| W25Q series Flash | SPI Flash | SPI | 16Mbit~2Gbit | $1~5 |
| SD card | SD / MMC | SPI | Storage | $5~25 |
| SSD1351 OLED | Display | SPI | RGB OLED | $7~15 |
| ILI9341 TFT | Display | SPI / 8080 | TFT LCD | $8~20 |
| ST7735 TFT | Display | SPI | Small TFT | $5~12 |
| ADXL345 | Accelerometer | SPI / I2C | Sensor | $3~8 |
| BMI270 | IMU | SPI / I2C | 6-axis | $8~20 |
| ICM-42688-P | IMU | SPI / I2C | 6-axis high-end | $10~25 |
| ADS1256 | ADC | SPI | 24-bit high-precision | $15~40 |
| ADS1115 | ADC | I2C | 16-bit | $3~8 |
| DAC8564 | DAC | SPI | 16-bit 4-channel | $7~18 |
| MAX31855 | Thermocouple | SPI | Temperature | $7~15 |
| MAX31865 | RTD | SPI | Temperature | $7~18 |
| NRF24L01 | Wireless | SPI | 2.4 GHz | $2~5 |
| SX1276 / 78 LoRa | Wireless | SPI | LoRa | $8~20 |
| RA8875 | TFT controller | SPI | Large display | $7~18 |
| FT81x display controller | Display | SPI | EVE series | $15~40 |
| RFM69 | Wireless | SPI | 433 / 868 MHz | $3~8 |
| CC1101 | Wireless | SPI | Sub-GHz | $3~8 |
| MAX31865 | RTD | SPI | PT100 / PT1000 | $5~12 |
| ESP32 SPI slave | MCU | SPI | Slave | $4~13 |

### 3.2 SPI Bus Extenders

| Part Number | Features | Reference Price |
|---|---|---:|
| 74HC4053 | Multiplexer | $1~3 |
| 74HCT4067 | Analog switch | $1~3 |
| SN74CBTLV3257 | Bus switch | $2~5 |
| PCA9548 | I2C / SPI switch | $5~12 |


## 4. Key Parameters and Selection

| Parameter | Description |
|---|---|
| Clock frequency | MHz (1~50 common) |
| Operating voltage | 1.8V / 3.3V / 5V |
| Clock mode | 0 / 1 / 2 / 3 |
| Data width | 8 / 16 / 32 bit |
| Frame size | Configurable |
| DMA | Supported on some MCUs |

**Selection guide**:
- Flash memory: W25Q series (SPI);
- Displays: ST7735 / SSD1351 (SPI);
- High-speed sensors: IMU, ADC / DAC;
- Wireless modules: LoRa, NRF24L01;
- Multiple slaves: independent chip selects (avoid daisy-chain complexity).


## 5. Hardware Connection

### 5.1 Wiring

- SCK / MOSI / MISO / CS each one wire + common GND;
- CS: each slave independent (active low);
- Long distance: low-voltage differential (e.g. RS422 conversion);
- Shielding: use shielded cable in strong-interference environments.

### 5.2 Pull-up / Pull-down

- CS pin: pulled up to VCC on the master side (ensure CS is high at power-up = unselected);
- MISO: some devices need a pull-up (to strengthen the drive);
- SCK / MOSI: usually no pull-up (push-pull output).

### 5.3 Routing

- Short distance (< 30 cm) works best;
- Matched length routing (high-speed SPI 50 MHz+);
- Impedance matching (microstrip / stripline 50Ω);
- Keep away from noise sources.

### 5.4 Power

- Stable supply + decoupling capacitor (100 nF);
- Common ground when multiple devices are powered independently;
- Some high-speed devices need special PCB design.


## 6. Communication Method

- Full-duplex (simultaneous transmit and receive);
- Master initiates transactions;
- Byte-oriented (mostly 8-bit);
- DMA: continuous transfer reduces CPU load.


## 7. Initialization Flow

1. Configure GPIO (SCK / MOSI as output, MISO as input, CS as output);
2. Configure the SPI controller (clock, mode, bit width);
3. Initialize CS pin high;
4. Test (read a register to verify);
5. Start communication.


## 8. Driver Interface

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
        """Single-byte transfer."""
        pass

    def write(self, data):
        """Write data (multi-byte)."""
        pass

    def read(self, n):
        """Read n bytes."""
        pass

    def write_then_read(self, write_data, read_n):
        pass


class SPIDevice:
    """Base class for SPI devices."""
    def __init__(self, spi, cs):
        self.spi = spi
        self.cs = cs

    def begin(self):
        self.cs.high()
        self.verify()  # read WHO_AM_I

    def write_reg(self, reg, value):
        """Write an 8-bit register."""
        self.cs.low()
        self.spi.transfer(reg)
        self.spi.transfer(value)
        self.cs.high()

    def read_reg(self, reg):
        """Read an 8-bit register."""
        self.cs.low()
        self.spi.transfer(reg | 0x80)  # read bit
        val = self.spi.transfer(0)
        self.cs.high()
        return val
```


## 9. Data Format and Units

- Byte stream (mostly MSB first);
- Command byte + data bytes (e.g. Flash: 0x03 read + 24-bit address + data);
- 16-bit registers (on some devices);
- Data / clock on two separate lines (different from I2C).


## 10. Interrupts and DMA

- Some SPI controllers support TX / RX interrupts;
- DMA: continuous large data transfers (Flash, display);
- FIFO: some MCUs support multi-byte buffering.


## 11. Error Handling

- **MISO stays low**: CS not asserted, SPI timing wrong, device not powered;
- **Data error**: wrong clock mode, speed too high, EMI;
- **Device unresponsive**: CS not asserted, device not powered, SPI misconfigured;
- **Multi-device conflict**: daisy-chain CS error, bus contention;
- **CRC error**: some SPI devices support CRC.


## 12. Low Power

- Disable the SPI controller when not communicating;
- Turn off SCK clock;
- Devices support deep sleep;
- The master turns off SPI when sleeping.


## 13. Example Code

```python
spi = SPI(sck_pin, mosi_pin, miso_pin, cs_pin, freq=10_000_000, mode=0)
device = SPIDevice(spi, cs_pin)
device.begin()
device.write_reg(0x00, 0xFF)  # write register
val = device.read_reg(0x00)    # read register
```


## 14. Debugging Methods

1. Measure SCK waveform (oscilloscope);
2. Measure MOSI / MISO data waveforms;
3. Check CS timing (should go low before SCK and high after);
4. Use a logic analyzer to capture the whole frame;
5. Verify the WHO_AM_I register;
6. Lower the speed to rule out timing issues.


## 15. Frequently Asked Questions

- **Device unresponsive**: wrong CS, wrong SPI mode, device not powered;
- **Data error**: wrong clock mode (CPOL / CPHA), speed too high;
- **Reads all 0xFF / 0x00**: device not connected or wrong CS;
- **No MISO output**: device damaged, wrong CS, no pull-up;
- **Multi-device conflict**: shared CS or daisy-chain wiring error.


## 16. References

- SPI has no formal standard; device differences are large;
- Pay attention to clock modes (0~3);
- Pay attention to MSB / LSB;
- Pay attention to bit width (8 / 16 / 32 bit);
- Impedance matching is mandatory at high speed;
- Long distance requires bus extenders.



- Motorola SPI Block Guide
- W25Q Flash datasheets
- ST7735 / ILI9341 display controller manuals
- Each MCU's SPI HAL documentation
- NRF24L01 / SX1276 datasheets