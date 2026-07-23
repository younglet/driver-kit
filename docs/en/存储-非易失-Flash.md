---
title: Flash
description: "DriverKit — Flash module documentation under the Storage category: working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods, and FAQ."
keywords: Flash,Storage,Non-volatile,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debug,W25Q64,SPI Flash,Nor Flash,QSPI,LittleFS
category: Storage
field: Non-volatile
module: Flash
---
# Flash Memory


## 1. Module Overview

Flash memory is an electrically erasable non-volatile memory (NVM), divided into NOR and NAND:

- **NOR Flash**: random access, byte-level read, sector erase, commonly used for firmware storage;
- **NAND Flash**: sequential access, page read/write, block erase, large capacity, commonly used for data storage.

Applications:

- MCU internal Flash (program storage);
- External SPI NOR Flash (parameters, logs, font libraries);
- QSPI NOR Flash (high-speed data);
- SD NAND (eMMC replacement);
- NAND Flash (large-capacity storage);
- UFS/eMMC (mobile devices).


## 2. Working Principle and Use Cases

### 2.1 NOR Flash

- Similar to EEPROM, but erases by sector / block;
- Read operations can be byte / word;
- Write operations require erasing first (sector set to all 1s, then write 0s);
- Write speed slow (ms level);
- Read speed fast (ns level);
- Capacity: 1 Mbit ~ 2 Gbit;
- Interface: SPI, QSPI, parallel.

### 2.2 NAND Flash

- Read/write by page, erase by block;
- Both read/write operate in page units (512 B / 2 KB / 4 KB);
- Block erase (128 KB / 256 KB / 1 MB);
- ECC verification required;
- Bad block management required;
- Capacity: 1 Gbit ~ 1 Tbit+;
- Interface: ONFI, Toggle, NFC.

### 2.3 Key Characteristics

- **Erase/Write Cycles**: NOR 10⁵, NAND 10⁴;
- **Data Retention**: NOR 20 years, NAND 10 years;
- **Sector Size**: NOR 4 KB / 32 KB / 64 KB;
- **Block Size**: NAND 128 KB / 256 KB / 1 MB+;
- **Page Size**: NAND 512 B / 2 KB / 4 KB.


## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 SPI NOR Flash

| Model | Capacity | Interface | Feature | Reference Price |
|---|---|---|---|---|
| W25Q16 | 16 Mbit (2 MB) | SPI/QSPI | General | $1~3 |
| W25Q32 | 32 Mbit (4 MB) | SPI/QSPI | General | $1~3 |
| W25Q64 | 64 Mbit (8 MB) | SPI/QSPI | Classic | $2~5 |
| W25Q128 | 128 Mbit (16 MB) | SPI/QSPI | General | $3~6 |
| W25Q256 | 256 Mbit (32 MB) | SPI/QSPI | Large capacity | $4~10 |
| W25Q512 | 512 Mbit (64 MB) | SPI/QSPI | Large capacity | $7~18 |
| W25Q01 | 1 Gbit (128 MB) | SPI/QSPI | Large capacity | $12~30 |
| W25Q02 | 2 Gbit (256 MB) | SPI/QSPI | Large capacity | $20~50 |
| MX25L1606E | 16 Mbit | SPI | Macronix | $1~3 |
| MX25L6433F | 64 Mbit | SPI | Macronix | $2~5 |
| MX25L12835F | 128 Mbit | SPI | Macronix | $3~6 |
| MX25L25645G | 256 Mbit | SPI/QSPI | Large capacity | $4~10 |
| MX25L51245G | 512 Mbit | SPI/QSPI | Large capacity | $7~18 |
| SST26VF016 | 16 Mbit | SPI | SST | $2~5 |
| SST26VF032 | 32 Mbit | SPI | SST | $2~5 |
| SST26VF064 | 64 Mbit | SPI | SST | $3~6 |
| IS25LP128 | 128 Mbit | SPI | ISSI | $3~6 |
| GD25Q64 | 64 Mbit | SPI | Domestic | $2~5 |
| GD25Q128 | 128 Mbit | SPI | Domestic | $3~6 |
| ZD25Q64 | 64 Mbit | SPI | Domestic | $2~5 |
| ZD25Q128 | 128 Mbit | SPI | Domestic | $3~6 |
| BY25Q64 | 64 Mbit | SPI | Domestic | $2~5 |
| BY25Q128 | 128 Mbit | SPI | Domestic | $3~6 |
| XT25F64 | 64 Mbit | SPI | Domestic | $2~5 |

### 3.2 QSPI NOR Flash

- Compatible with SPI Flash, but supports 4 data lines;
- Double the speed (QSPI 80 MHz vs SPI 40 MHz);
- Most W25Q models support QSPI;
- Suitable for: ESP32 / STM32 QSPI interface.

### 3.3 NAND Flash

| Type | Capacity | Interface | Reference Price |
|---|---|---|---|
| SLC NAND | 1~8 Gbit | ONFI | $10~40 |
| MLC NAND | 4~64 Gbit | ONFI | $15~75 |
| TLC NAND | 32~256 Gbit | ONFI | $25~150 |
| QLC NAND | 1~10 Tbit | ONFI | $50~500 |
| SD NAND (CSNP1GCR01) | 1 Gbit | SPI | $8~20 |
| Industrial SLC NAND | 512 Mbit ~ 4 Gbit | SPI/ONFI | $10~50 |

### 3.4 eMMC / UFS

- eMMC 4 GB~256 GB, $15~150;
- UFS 64 GB~512 GB, $50~300;
- Modular products, easy to integrate.


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Capacity | Mbit / Gbit |
| Interface | SPI / QSPI / Parallel / ONFI |
| Clock Frequency | MHz (40~104 common) |
| Erase/Write Cycles | 10⁴~10⁵ |
| Data Retention | 10~20 years |
| Page Size | 256 B (NOR) / 2 KB (NAND) |
| Sector / Block Size | 4 KB (NOR) / 128 KB (NAND) |
| Operating Voltage | 1.8V / 2.5V / 3.3V |
| Power Consumption | mA level |
| Temperature Range | Consumer (-25~85°C) / Industrial (-40~85°C) |

**Selection suggestions**:

- General storage: W25Q64 (8 MB SPI);
- Font library / UI: W25Q128 (16 MB SPI);
- Large capacity: W25Q256 / W25Q512;
- High speed: QSPI mode;
- Industrial grade: ISSI, Macronix;
- Domestic: GD, ZD, BY;
- NAND large capacity: SD NAND / SLC NAND;
- Mobile devices: eMMC.


## 5. Hardware Connection

### 5.1 SPI NOR Flash

- SCK/MOSI/MISO/CS;
- WP (write protect), HOLD (pause);
- QSPI mode: 4 data lines (IO0~IO3) + SCK + CS;
- Decoupling capacitor (100nF);
- 3.3V mainstream;
- ESD protection.

### 5.2 NAND Flash

- 8/16-bit data bus;
- Control lines (WE, RE, CLE, ALE, CE);
- R/B (ready / busy);
- ECC required (hardware or software);
- Bad block management required.

### 5.3 Routing

- Equal-length routing for high-speed SPI;
- Impedance matching;
- Keep away from interference sources.


## 6. Communication Method

- **SPI**: 4-wire (SCK/MOSI/MISO/CS);
- **QSPI**: 6-wire (4 data + SCK + CS);
- **Octal SPI**: 8 data lines (higher performance);
- **HyperBus**: high performance;
- **Parallel NOR**: 8/16-bit data + control;
- **ONFI NAND**: 8/16-bit data + control.


## 7. Initialization Flow

1. Configure GPIO/SPI;
2. Read JEDEC ID (verify communication);
3. Read SFDP (get parameters);
4. Configure status register (QE, SR);
5. Disable write protection;
6. Test read/write.


## 8. Common Driver Interfaces

```python
class Flash:
    """SPI NOR Flash (W25Q series)."""
    def __init__(self, spi, cs):
        self.spi = spi
        self.cs = cs

    def begin(self):
        self._check_id()

    def _check_id(self):
        """Read JEDEC ID."""
        self.cs.low()
        self.spi.transfer(0x9F)  # JEDEC ID command
        id1 = self.spi.transfer(0)  # Manufacturer
        id2 = self.spi.transfer(0)  # Capacity
        id3 = self.spi.transfer(0)  # Type
        self.cs.high()
        return (id1, id2, id3)

    def read(self, addr, n):
        """Read n bytes from addr."""
        self.cs.low()
        self.spi.transfer(0x03)
        self.spi.transfer((addr >> 16) & 0xFF)
        self.spi.transfer((addr >> 8) & 0xFF)
        self.spi.transfer(addr & 0xFF)
        data = self.spi.read(n)
        self.cs.high()
        return data

    def _enable_write(self):
        self.cs.low()
        self.spi.transfer(0x06)  # WREN
        self.cs.high()

    def _wait_busy(self):
        while (self.read_status() & 0x01) != 0:
            time.sleep_ms(1)

    def read_status(self):
        self.cs.low()
        self.spi.transfer(0x05)
        status = self.spi.transfer(0)
        self.cs.high()
        return status

    def sector_erase(self, addr):
        """Erase 4KB sector."""
        self._enable_write()
        self.cs.low()
        self.spi.transfer(0x20)
        self.spi.transfer((addr >> 16) & 0xFF)
        self.spi.transfer((addr >> 8) & 0xFF)
        self.spi.transfer(addr & 0xFF)
        self.cs.high()
        self._wait_busy()

    def page_program(self, addr, data):
        """Program 256 bytes (one page)."""
        self._enable_write()
        self.cs.low()
        self.spi.transfer(0x02)
        self.spi.transfer((addr >> 16) & 0xFF)
        self.spi.transfer((addr >> 8) & 0xFF)
        self.spi.transfer(addr & 0xFF)
        self.spi.write(data)
        self.cs.high()
        self._wait_busy()
```



Implement file system on Flash:

- **LittleFS**: embedded-specific, power-loss safe;
- **SPIFFS**: common in Arduino, deprecated;
- **FAT (FatFS)**: PC-compatible, but not power-loss safe;
- **Wear Leveling**: required for balancing writes.

```python
# MicroPython example
import lfs
flash = Flash(...)
fs = lfs.LittleFS(flash, block_size=4096, block_count=256)
```


## 9. Data Format, Units, and Timing

- Byte stream;
- Multi-byte values;
- Strings;
- File systems (FAT, LittleFS).


## 10. Error Handling

- **JEDEC ID wrong**: SPI wiring wrong, CS not pulled low;
- **Read error**: timing wrong, speed too fast;
- **Write failure**: write protection not disabled;
- **Erase failure**: insufficient voltage;
- **Bad block**: NAND bad block management required;
- **ECC error**: NAND data verification failed.


## 11. Low Power

- Deep sleep current < 1 µA;
- During write ~20 mA (3.3V);
- During read ~10 mA;
- Intermittent use (read/write on demand);
- File system mount / unmount.


## 12. Example Code

```python
flash = Flash(spi, cs_pin)
flash.begin()
print("ID:", flash._check_id())

# Read
data = flash.read(0, 16)
print(data)

# Erase + Write
flash.sector_erase(0)
flash.page_program(0, b'Hello World!')
```


## 13. Debugging Methods

1. Check JEDEC ID;
2. Read parameters via SFDP;
3. Read/write test;
4. Measure read/write speed (throughput);
5. Test erase/write cycles (lifetime);
6. Check bad blocks.


## 14. Frequently Asked Questions

- **JEDEC ID wrong**: SPI wiring, CS not pulled low, timing wrong;
- **Write invalid**: write protection not disabled;
- **Data error**: erase not executed, address wrong;
- **NOR read/write failure**: speed too fast, signal integrity;
- **NAND damage**: ECC error, bad block, write jitter.


## 15. References

- Must erase before write;
- Write time is relatively long (ms level);
- Write cycles are limited, pay attention to wear leveling;
- Data slowly lost when not used for long periods (data retention);
- Difference from MCU internal Flash (external Flash typically uses SPI);
- Must add write protection circuit (prevent accidental writes);
- Choose industrial grade chips for industrial applications.



- Winbond W25Q Series Datasheet
- Macronix MX25L Series Datasheet
- SST SST26VF Series Datasheet
- ONFI Standard (Open NAND Flash Interface)
- JEDEC JESD216 SFDP Standard
- LittleFS / FatFS File System Documentation
- Micron / Toshiba / Hynix NAND Technical Specs


## 16. Write Strategies

### 11.1 Wear Leveling

- Don't repeatedly write to the same sector;
- Wear leveling algorithm spreads across different sectors;
- LittleFS has built-in wear leveling.

### 11.2 Write Time

- Write one page (256 bytes): ~3 ms;
- Erase one sector (4 KB): ~50 ms;
- Write one sector (4 KB): ~50 ms (erase then write);
- Slower than EEPROM, but larger capacity.

### 11.3 Erase Before Write

- NOR Flash write can only go from 1 → 0;
- After erase, all is 1 (0xFF);
- Incomplete write results in data corruption.