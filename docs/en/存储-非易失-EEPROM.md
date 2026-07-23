---
title: EEPROM
description: "DriverKit — EEPROM module documentation under the Storage category: working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods, and FAQ."
keywords: EEPROM,Storage,Non-volatile,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debug,AT24C256,I2C storage,FRAM,FM24CL
category: Storage
field: Non-volatile
module: EEPROM
---
# EEPROM


## 1. Module Overview

EEPROM (Electrically Erasable Programmable Read Only Memory) is a non-volatile memory that can be read/written byte by byte, retaining data when power is off. Common use cases:

- Configuration parameter storage (device ID, calibration parameters);
- User settings (thresholds, modes);
- Log records;
- Serial numbers, unique identifiers;
- Encryption keys;
- I2C bus (most common);
- SPI bus (high speed).

Features:

- Byte-by-byte read/write;
- Data retention when power off (10~100 years);
- Limited write cycles (10⁶);
- Small capacity (1 Kbit ~ 1 Mbit);
- Write delay (5~10 ms);
- Very low standby power (µA level).


## 2. Working Principle and Use Cases

- **Storage cell**: floating-gate transistor (FG-FET);
- **Erase/Write**: high-voltage electrical pulse (charge injection/release into floating gate);
- **Write operation**: erase first, then write;
- **Byte write**: no need to erase whole page first;
- **Page write**: most chips support page write (improves efficiency).


## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 AT24C Series (I2C)

| Model | Capacity | I2C Address | Page Size | Feature | Reference Price |
|---|---|---|---|---|---|
| AT24C01 | 1 Kbit | 0x50~0x53 | 8 B | Entry-level | $1~3 |
| AT24C02 | 2 Kbit | 0x50~0x57 | 8 B | Classic | $1~3 |
| AT24C04 | 4 Kbit | 0x50~0x53 | 16 B | General | $1~3 |
| AT24C08 | 8 Kbit | 0x50~0x51 | 16 B | General | $1~3 |
| AT24C16 | 16 Kbit | 0x50 | 16 B | General | $1~3 |
| AT24C32 | 32 Kbit | 0x50~0x57 | 32 B | General | $1~3 |
| AT24C64 | 64 Kbit | 0x50~0x57 | 32 B | Classic | $1~3 |
| AT24C128 | 128 Kbit | 0x50~0x57 | 64 B | Medium | $2~5 |
| AT24C256 | 256 Kbit | 0x50~0x57 | 64 B | Medium | $2~5 |
| AT24C512 | 512 Kbit | 0x50~0x57 | 128 B | Large capacity | $3~8 |
| AT24C1024 | 1 Mbit | 0x50/0x51/0x52/0x53 | 256 B | Large capacity | $4~10 |

### 3.2 M24C / M24256 (I2C, ST)

| Model | Capacity | Feature | Reference Price |
|---|---|---|---|
| M24C01 | 1 Kbit | General | $1~3 |
| M24C02 | 2 Kbit | General | $1~3 |
| M24C16 | 16 Kbit | General | $1~3 |
| M24C32 | 32 Kbit | General | $1~3 |
| M24C64 | 64 Kbit | General | $1~3 |
| M24256 | 256 Kbit | General | $2~5 |
| M24512 | 512 Kbit | General | $3~8 |

### 3.3 FM24C Series (FRAM)

| Model | Capacity | Type | Feature | Reference Price |
|---|---|---|---|---|
| FM24C04 | 4 Kbit | FRAM | Unlimited writes | $5~12 |
| FM24C16 | 16 Kbit | FRAM | Unlimited writes | $7~18 |
| FM24C64 | 64 Kbit | FRAM | Unlimited writes | $7~18 |
| FM24CL16 | 16 Kbit | FRAM | Low power | $5~12 |
| FM24CL64 | 64 Kbit | FRAM | Low power | $7~18 |

### 3.4 25AA/25LC Series (SPI)

| Model | Capacity | Interface | Reference Price |
|---|---|---|---|
| 25AA040A | 4 Kbit | SPI | $1~3 |
| 25AA080C | 8 Kbit | SPI | $1~3 |
| 25AA160C | 16 Kbit | SPI | $2~5 |
| 25AA256 | 256 Kbit | SPI | $3~6 |
| 25LC512 | 512 Kbit | SPI | $3~8 |
| 25LC1024 | 1 Mbit | SPI | $4~10 |

### 3.5 Other EEPROMs

| Type | Model | Feature |
|---|---|---|
| 93C Series (Microwire) | 93C46/56/66 | Legacy serial EEPROM |
| M93C Series (ST) | M93C46/56/66 | Replacement for 93C series |
| CAT24C Series | CAT24C01~256 | ON Semi replacement |
| BR24 Series | BR24L01~256 | ROHM replacement |
| IS24 Series | IS24C01~256 | ISSI |


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Capacity | Kbit / Byte |
| Interface | I2C / SPI / Microwire |
| Operating Voltage | 1.8V / 2.5V / 3.3V / 5V |
| Write Cycles | 10⁶ (EEPROM) / 10¹⁴ (FRAM) |
| Data Retention | 100~200 years |
| Write Delay | 5~10 ms (EEPROM) / 0 (FRAM) |
| Page Size | B (AT24C02 = 8, AT24C512 = 128) |
| Address Pins | 0~3 (A0/A1/A2) |
| Write Protect | WP pin |

**Selection suggestions**:

- Entry: AT24C02 (256 bytes);
- Medium config: AT24C64 (8 KB);
- Large config: AT24C512 (64 KB);
- High-frequency write: FRAM (FM24CL series);
- High speed: SPI 25LC series;
- Unique ID / serial number: DS28CM00 / DS2401 (Silicon ID).


## 5. Hardware Connection

### 5.1 I2C EEPROM (AT24C Series)

- SDA, SCL each with 4.7kΩ pull-up to VCC;
- A0/A1/A2: address selection (effective on some models);
- WP: write protect (high level = protected, low level = writable);
- Power: decoupling capacitor (100nF);
- ESD protection.

### 5.2 SPI EEPROM

- SCK/MOSI/MISO/CS;
- HOLD pin (some support);
- WP pin;
- 3.3V mainstream;
- Note SPI mode (most use mode 0).

### 5.3 Write Protection

- Hardware write protect: WP pin;
- Software write protect: status register;
- Partial protect (e.g. first 256 bytes protected, last 256 bytes writable).


## 6. Communication Method

- I2C: most common (AT24C series);
- SPI: high speed (25LC series);
- Microwire: legacy (93C series);
- 1-Wire: DS24 series ID chip.


## 7. Initialization Flow

1. Configure I2C/SPI;
2. Verify communication (read address 0);
3. Check WP state;
4. Ready to use.


## 8. Common Driver Interfaces

```python
class EEPROM:
    def __init__(self, bus, address=0x50, capacity=256):
        self.bus = bus
        self.address = address
        self.capacity = capacity
        self.page_size = 8
        self.write_delay_ms = 5

    def begin(self):
        pass

    def read(self, addr, n=1):
        """Read n bytes."""
        return self.bus.read_then_write(self.address,
                                         addr.to_bytes(2, 'big'),
                                         n)

    def write(self, addr, data):
        """Write data (bytes/bytearray), auto-paging."""
        offset = 0
        while offset < len(data):
            page_offset = addr % self.page_size
            page_remain = self.page_size - page_offset
            chunk_size = min(page_remain, len(data) - offset)
            self._write_page(addr, data[offset:offset+chunk_size])
            addr += chunk_size
            offset += chunk_size
            time.sleep_ms(self.write_delay_ms)

    def _write_page(self, addr, data):
        self.bus.write_then_write(self.address,
                                   addr.to_bytes(2, 'big'),
                                   data)

    def read_u16(self, addr):
        return int.from_bytes(self.read(addr, 2), 'big')

    def write_u16(self, addr, value):
        self.write(addr, value.to_bytes(2, 'big'))


class FRAM:
    """FRAM (FM24C series), no write delay."""
    def __init__(self, bus, address=0x50):
        self.bus = bus

    def begin(self):
        pass

    def read(self, addr, n):
        return self.bus.read_then_write(self.address,
                                         addr.to_bytes(2, 'big'),
                                         n)

    def write(self, addr, data):
        self.bus.write_then_write(self.address,
                                   addr.to_bytes(2, 'big'),
                                   data)
```



```python
def save_config(eeprom, config):
    # Header: magic + version
    eeprom.write(0, b'CFG')
    eeprom.write(3, b'\x01')  # version 1
    eeprom.write(4, config.to_bytes())

def load_config(eeprom):
    if eeprom.read(0, 3) == b'CFG':
        version = int.from_bytes(eeprom.read(3, 1), 'big')
        if version == 1:
            return eeprom.read(4, ...)
```


## 9. Data Format, Units, and Timing

- Byte stream;
- Multi-byte values (uint16, uint32, float);
- Structured data (JSON, protobuf);
- Strings.


## 10. Error Handling

- **I2C error**: check address, pull-up, power;
- **Write failure**: check WP state;
- **Read 0xFF**: not initialized or write failed;
- **Data corruption**: power loss, CRC error, restore defaults;
- **Lifetime exhausted**: write cycles exceeded, needs replacement;
- **Address out of bounds**: check write address.


## 11. Low Power

- Standby current < 1 µA;
- Write current ~3 mA (5 ms);
- Intermittent write (on demand);
- Turn off EEPROM (power switch) during deep sleep.


## 12. Example Code

```python
eeprom = EEPROM(i2c, address=0x50, capacity=256)
eeprom.begin()

# Write config
config = b'\x01\x02\x03\x04'
eeprom.write(0, config)

# Read config
data = eeprom.read(0, 4)
```


## 13. Debugging Methods

1. Measure SDA/SCL waveform;
2. Scan I2C address;
3. Read/write test address 0x00;
4. Test page write (cross-page);
5. Test CRC verification;
6. Test power-off retention (power off and re-read).


## 14. Frequently Asked Questions

- **I2C not working**: address wrong, pull-up not connected, WP connected wrong;
- **Written data corrupted**: power loss, CRC not added;
- **Read all 0xFF**: not written or write failed;
- **Multiple write failures**: WP in protected state;
- **Address out of bounds**: write address exceeds capacity;
- **Lifetime exhausted**: frequent writes, needs replacement.


## 15. References

- Strict write timing requirements, obey 5 ms write delay;
- Data within the same page write must not cross pages (some chips handle automatically);
- Write cycle limit (10⁶);
- Consider lifetime for frequent writes of key parameters;
- Backup mechanism (dual + CRC);
- Ensure WP is correct before writing.



- Atmel AT24C Series Datasheet
- ST M24C Series Datasheet
- Cypress FM24CL FRAM Datasheet
- Microchip 25LC SPI EEPROM Datasheet
- Maxim DS28CM00 Unique ID Datasheet
- Various I2C EEPROM application notes


## 16. Write Strategies

### 10.1 Write Wear-Leveling

- Avoid frequent writes to the same location (wear);
- Write counter: single byte can reach 10⁶ writes;
- Wear leveling: spread across different locations;
- Lifetime monitoring: increment counter on each write, warn when overflow.

### 10.2 Power-Loss Protection

- Read old value before write;
- Verify after write;
- Add CRC checksum for critical data;
- Dual storage (primary + backup);
- Keep old value on incomplete write.

### 10.3 Checksum Protection

```python
import zlib

def save_with_crc(eeprom, addr, data):
    crc = zlib.crc32(data)
    eeprom.write(addr, data)
    eeprom.write(addr + len(data), crc.to_bytes(4, 'big'))

def load_with_crc(eeprom, addr, n):
    data = eeprom.read(addr, n)
    stored_crc = int.from_bytes(eeprom.read(addr + n, 4), 'big')
    actual_crc = zlib.crc32(data)
    if stored_crc == actual_crc:
        return data
    return None  # Data corrupted
```