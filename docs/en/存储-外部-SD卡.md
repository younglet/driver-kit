---
title: SD Card
description: "DriverKit — SD Card module documentation under the Storage category: working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods, and FAQ."
keywords: SD Card,Storage,External,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debug,microSD,FATFS,SDHC,SDXC,exFAT
category: Storage
field: External
module: SD Card
---
# SD Card


## 1. Module Overview

SD card (Secure Digital Memory Card) is a common portable storage card. Common use cases:

- Cameras, camcorders;
- Mobile phones (some);
- Embedded data logging (black box, data acquisition);
- Raspberry Pi system disk;
- Music players;
- GPS logging;
- Video surveillance;
- Device upgrade SD cards.

Types:

- **SD** (SDSC, Standard Capacity): < 2 GB (FAT16);
- **SDHC** (High Capacity): 2~32 GB (FAT32);
- **SDXC** (Extended Capacity): 32 GB ~ 2 TB (exFAT);
- **SDUC** (Ultra Capacity): 2 TB ~ 128 TB;
- **microSD**: miniaturized version;
- **SD Express**: PCIe + NVMe (high speed).


## 2. Working Principle and Use Cases

### 2.1 Interface

- **SD bus (4-wire SD mode)**: CLK/CMD/DAT0~3;
- **SPI mode**: CLK/MOSI/MISO/CS (compatible with SPI bus);
- Speed class: see table below;
- SD Express (PCIe 3.0): high speed up to 1 GB/s.

### 2.2 Speed Class

- **Class 2/4/6/10**: SD minimum write speed 2/4/6/10 MB/s;
- **U1/U3**: UHS minimum write speed 10/30 MB/s;
- **V6/V10/V30/V60/V90**: Video Speed Class;
- **A1/A2**: Application Class performance (random IOPS).

### 2.3 File System

- FAT16 (< 2 GB);
- FAT32 (2~32 GB);
- exFAT (32 GB~2 TB);
- Linux file systems (ext4, btrfs) less common on SD cards;
- Long filename support (VFAT / LFN).

### 2.4 Command Set

- CMD0 (GO_IDLE_STATE): reset;
- CMD8 (SEND_IF_COND): interface condition;
- ACMD41 (SD_SEND_OP_COND): initialization;
- CMD17 (READ_SINGLE_BLOCK): read single block;
- CMD24 (WRITE_BLOCK): write single block;
- CMD18 (READ_MULTIPLE_BLOCK): read multiple blocks;
- CMD25 (WRITE_MULTIPLE_BLOCK): write multiple blocks;
- CMD55 (APP_CMD): ACMD prefix;
- ACMD23 (SET_WR_BLK_ERASE_COUNT): pre-erase.


## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 microSD Cards

| Model | Capacity | Speed Class | Feature | Reference Price |
|---|---|---|---|---|
| SanDisk Extreme 32 GB | 32 GB | A1/U3/V30 | High speed | $15~25 |
| SanDisk Extreme 64 GB | 64 GB | A2/U3/V30 | High speed | $25~45 |
| SanDisk Extreme 128 GB | 128 GB | A2/U3/V30 | High speed | $40~75 |
| SanDisk Extreme 256 GB | 256 GB | A2/U3/V30 | High speed | $75~140 |
| SanDisk Extreme 512 GB | 512 GB | A2/U3/V30 | High speed | $150~250 |
| SanDisk Ultra 32 GB | 32 GB | A1/U1/Class 10 | General | $10~18 |
| SanDisk Ultra 64 GB | 64 GB | A1/U1/Class 10 | General | $18~28 |
| SanDisk Ultra 128 GB | 128 GB | A1/U1/Class 10 | General | $28~45 |
| Samsung EVO Select 64 GB | 64 GB | U3/V30 | High speed | $25~45 |
| Samsung EVO Select 128 GB | 128 GB | U3/V30 | High speed | $40~75 |
| Samsung PRO Endurance 64 GB | 64 GB | U1/Class 10 | High endurance | $40~75 |
| Kingston Canvas Go Plus 64 GB | 64 GB | U3/V30 | High speed | $25~45 |
| Kingston SDCS2/64 GB | 64 GB | A1/U1/V10 | Entry | $15~25 |
| Kioxia EXCERIA 64 GB | 64 GB | U1/V10 | Entry | $15~25 |
| Kioxia EXCERIA HIGH ENDURANCE 64 GB | 64 GB | U3/V30 | High endurance | $40~75 |
| Lexar 633x 64 GB | 64 GB | U1/V10 | Entry | $18~30 |
| Lexar PLAY 1 TB | 1 TB | U3/V30/A2 | Large capacity | $250~450 |

### 3.2 SD Card Adapters / Modules

| Type | Feature | Reference Price |
|---|---|---|
| microSD Module (SPI) | General | $2~5 |
| microSD Module (SD bus) | High speed | $3~8 |
| SD Card Holder Module | General | $1~4 |
| SPI + microSD Adapter | Breadboard | $3~8 |
| SD Card to USB Reader | PC use | $3~10 |

### 3.3 SD Express

- Speed up to 1 GB/s (PCIe 3.0);
- Expensive, rare in consumer market;
- Mainly for professional applications.


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Capacity | 2 GB ~ 1 TB+ |
| Interface | SPI / SD / UHS-I/II/III |
| Speed Class | Class 2/4/6/10, U1/U3, V6~V90 |
| Application Class | A1 (1500 IOPS read, 500 IOPS write) / A2 (4000 IOPS read, 2000 IOPS write) |
| Endurance | TBW (Total Bytes Written) |
| Operating Voltage | 3.3V |
| Operating Temperature | -25~85°C (consumer) / -40~85°C (industrial) |
| Lifetime | Related to write volume |

**Selection suggestions**:

- General: SanDisk Ultra / Samsung EVO Select;
- High speed: SanDisk Extreme / Samsung PRO;
- High endurance (video, dash cam): SanDisk High Endurance / Samsung PRO Endurance;
- Embedded data logging: industrial-grade SD card (high endurance + anti-interference);
- Raspberry Pi system: A2 + 32 GB+;
- Budget: domestic cards (need to test stability).


## 5. Hardware Connection

### 5.1 SPI Mode (MCU common)

- SCK/MOSI/MISO/CS;
- CS pin must have pull-up (MISO doesn't go high-Z when card not inserted);
- 3.3V power;
- 100nF decoupling;
- TVS for ESD protection;
- Note SPI speed (25 MHz starting, 50 MHz DSPI high-end).

### 5.2 SD Bus Mode (4-wire)

- CLK/CMD/DAT0~3;
- High speed (50 MHz~208 MHz UHS);
- Equal-length routing required;
- Impedance matching (50Ω).

### 5.3 Power Supply

- Stable 3.3V (max 200 mA);
- Current spike during write (needs large capacitor buffer);
- Some cards support 1.8V (UHS).

### 5.4 Routing

- Short and straight;
- Equal-length (SD/SDR mode);
- Impedance control (SD bus);
- Keep away from interference sources.


## 6. Communication Method

- **SPI mode**: compatible, slow (25 MHz);
- **SD 1-bit mode**: 1 data line (default);
- **SD 4-bit mode**: 4 data lines (recommended);
- **UHS-I/II**: DDR high-speed mode;
- **SD Express**: PCIe + NVMe.


## 7. Common Driver Interfaces

```python
class SDCard:
    """SD card SPI mode."""
    def __init__(self, spi, cs):
        self.spi = spi
        self.cs = cs

    def begin(self, freq=20000000):
        """Initialize."""
        pass

    def read_block(self, block, buf):
        """Read 512 bytes."""
        pass

    def write_block(self, block, buf):
        """Write 512 bytes."""
        pass

    def read_blocks(self, block, count):
        """Read multiple blocks."""
        pass

    def write_blocks(self, block, count, data):
        pass

    def get_size_mb(self):
        """Returns capacity in MB."""
        pass


class FATFS:
    """FAT file system (based on SDCard)."""
    def __init__(self, sd):
        self.sd = sd

    def mount(self):
        pass

    def open(self, path, mode='r'):
        pass

    def listdir(self, path):
        pass

    def mkdir(self, path):
        pass

    def remove(self, path):
        pass

    def rename(self, old, new):
        pass
```



- **FAT16/FAT32/exFAT**: PC compatible;
- **LittleFS**: embedded-specific, power-loss safe;
- **SDFS**: Arduino SD library;
- **ChaN FAT**: FatFs (open source);
- Embedded file system choice: reliability > PC compatibility.


## 8. Data Format, Units, and Timing

- Byte stream (512 byte block);
- File system (FAT);
- Data logs (CSV, BIN);
- Images (JPEG, PNG);
- Videos (MP4, AVI);
- Audio (MP3, WAV).


## 9. Error Handling

- **Initialization failure**: card not properly inserted, CS not pulled low, unstable power;
- **CMD timeout**: SPI speed too high, timing wrong;
- **CRC error**: EMI, poor cable, impedance mismatch;
- **Write failure**: write protect (mechanical switch);
- **File system corruption**: sudden power loss, scan and repair (fsck);
- **Card failure**: wear, thermal shutdown, low quality.


## 10. Low Power

- Standby < 1 mA;
- Sleep < 100 µA;
- Turn off SPI clock;
- Intermittent read/write (on demand);
- Turn off SD card power when not in use.


## 11. Example Code

```python
# MicroPython example
from machine import SPI, Pin
import sdcard, os

spi = SPI(1, baudrate=20000000, sck=Pin(10), mosi=Pin(11), miso=Pin(12))
cs = Pin(13, Pin.OUT)
sd = sdcard.SDCard(spi, cs)
os.mount(sd, '/sd')

with open('/sd/test.txt', 'w') as f:
    f.write('Hello World!')

print(os.listdir('/sd'))
```


## 12. Debugging Methods

1. Measure CS, MOSI, MISO, SCK waveforms;
2. Measure power supply current (~100 mA during write);
3. Read CID/CSD register (card ID);
4. Read/write test;
5. Use chkdsk to check file system;
6. Use H2testw to check card authenticity.


## 13. Frequently Asked Questions

- **Initialization failure**: card not properly inserted, CS pull-up, unstable power;
- **Write failure**: write protect switch, card damage;
- **Read error**: SPI speed too high, EMI;
- **Card capacity abnormal**: partition error, card format abnormal;
- **Files lost after power loss**: not synced or using FAT (unsafe);
- **Card overheating**: long continuous write, poor quality SD card;
- **Card recognized as read-only**: write protect switch, wear, damage.


## 14. References

- SD card SPI mode can only reach about 25 MHz;
- SD 4-bit mode can reach 50 MHz (UHS-I 104 MHz);
- Sudden power loss may corrupt file system;
- Choose industrial grade cards for industrial applications;
- High endurance cards suitable for video / data logging;
- Regularly back up important data;
- Card authenticity issues (capacity expansion cards).



- SD Association Physical Specification V8.0
- SD Association File System Specification V3.0
- MicroSD SPI Mode Application Notes
- ELM Chan FAT File System
- Arduino SD Library
- ESP32 SD Card Reference
- Various microSD Module Schematics


## 15. Initialization Flow (SPI Mode)

1. Delay to wait for SD card stable (> 1 ms);
2. CS high, send CMD0 (74+ clocks);
3. Send CMD55 + ACMD41 or CMD8 to identify version;
4. Loop sending ACMD41 until card is ready;
5. Read OCR register;
6. Set block size (CMD16, default 512);
7. Enter SPI mode;
8. Switch to high speed (25 MHz+).


## 16. Write Strategies

### 11.1 Write Balancing

- SD card has internal wear-leveling (but limited);
- Frequent log writes: rotate files;
- Batch write (accumulate 4 KB+ before writing);
- Avoid unnecessary small writes.

### 11.2 Write Performance

- Sequential write: ~10~30 MB/s (U3);
- Random 4K write: ~1~5 MB/s (A1/A2);
- Sync write: blocking (fsync);
- Async write: double buffering.

### 11.3 Write Safety

- Sync write (sync) ensures data is on disk;
- Double buffering + CRC verification;
- Critical data may be lost on power loss (FAT corruption);
- Solution: use LittleFS or transaction log.