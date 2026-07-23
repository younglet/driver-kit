# Flash 存储器


## 1. 模块概览

Flash 存储器是一种电可擦除的非易失性存储器（NVM），分 NOR 和 NAND 两种：
- **NOR Flash**：随机访问、字节级读、按扇区擦除，常用于固件存储；
- **NAND Flash**：顺序访问、页读写、按块擦除、容量大，常用于数据存储。

应用：
- MCU 内部 Flash（程序存储）；
- 外部 SPI NOR Flash（参数、日志、字库）；
- QSPI NOR Flash（高速数据）；
- SD NAND（eMMC 替代）；
- NAND Flash（大容量存储）；
- UFS/eMMC（移动设备）。


## 2. 工作原理与适用场景

### 2.1 NOR Flash

- 类似 EEPROM，但按扇区/块擦除；
- 读操作可字节/字；
- 写操作需要先擦除（扇区全置 1，再写 0）；
- 写速度慢（ms 级）；
- 读速度快（ns 级）；
- 容量：1 Mbit ~ 2 Gbit；
- 接口：SPI、QSPI、并行。

### 2.2 NAND Flash

- 按页读/写、按块擦除；
- 读/写都以页为单位（512 B / 2 KB / 4 KB）；
- 块擦除（128 KB / 256 KB / 1 MB）；
- 必须 ECC 校验；
- 必须坏块管理；
- 容量：1 Gbit ~ 1 Tbit+；
- 接口：ONFI、Toggle、NFC。

### 2.3 关键特性

- **擦写次数**：NOR 10⁵、NAND 10⁴；
- **数据保持**：NOR 20 年、NAND 10 年；
- **扇区大小**：NOR 4 KB / 32 KB / 64 KB；
- **块大小**：NAND 128 KB / 256 KB / 1 MB+；
- **页大小**：NAND 512 B / 2 KB / 4 KB。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 SPI NOR Flash

| 型号 | 容量 | 接口 | 特点 | 参考价 |
|---|---|---|---|---|
| W25Q16 | 16 Mbit (2 MB) | SPI/QSPI | 通用 | ¥2~5 |
| W25Q32 | 32 Mbit (4 MB) | SPI/QSPI | 通用 | ¥2~6 |
| W25Q64 | 64 Mbit (8 MB) | SPI/QSPI | 经典 | ¥3~8 |
| W25Q128 | 128 Mbit (16 MB) | SPI/QSPI | 通用 | ¥5~12 |
| W25Q256 | 256 Mbit (32 MB) | SPI/QSPI | 大容量 | ¥8~20 |
| W25Q512 | 512 Mbit (64 MB) | SPI/QSPI | 大容量 | ¥15~35 |
| W25Q01 | 1 Gbit (128 MB) | SPI/QSPI | 大容量 | ¥25~60 |
| W25Q02 | 2 Gbit (256 MB) | SPI/QSPI | 大容量 | ¥40~100 |
| MX25L1606E | 16 Mbit | SPI | Macronix | ¥2~5 |
| MX25L6433F | 64 Mbit | SPI | Macronix | ¥3~8 |
| MX25L12835F | 128 Mbit | SPI | Macronix | ¥5~12 |
| MX25L25645G | 256 Mbit | SPI/QSPI | 大容量 | ¥8~20 |
| MX25L51245G | 512 Mbit | SPI/QSPI | 大容量 | ¥15~35 |
| SST26VF016 | 16 Mbit | SPI | SST | ¥3~8 |
| SST26VF032 | 32 Mbit | SPI | SST | ¥3~8 |
| SST26VF064 | 64 Mbit | SPI | SST | ¥5~12 |
| IS25LP128 | 128 Mbit | SPI | ISSI | ¥5~12 |
| GD25Q64 | 64 Mbit | SPI | 国产 | ¥3~8 |
| GD25Q128 | 128 Mbit | SPI | 国产 | ¥5~12 |
| ZD25Q64 | 64 Mbit | SPI | 国产 | ¥3~8 |
| ZD25Q128 | 128 Mbit | SPI | 国产 | ¥5~12 |
| BY25Q64 | 64 Mbit | SPI | 国产 | ¥3~8 |
| BY25Q128 | 128 Mbit | SPI | 国产 | ¥5~12 |
| XT25F64 | 64 Mbit | SPI | 国产 | ¥3~8 |

### 3.2 QSPI NOR Flash

- 与 SPI Flash 兼容，但支持 4 线数据；
- 速度翻倍（QSPI 80 MHz vs SPI 40 MHz）；
- 多数 W25Q 型号支持 QSPI；
- 适用：ESP32 / STM32 QSPI 接口。

### 3.3 NAND Flash

| 类型 | 容量 | 接口 | 参考价 |
|---|---|---|---|
| SLC NAND | 1~8 Gbit | ONFI | ¥20~80 |
| MLC NAND | 4~64 Gbit | ONFI | ¥30~150 |
| TLC NAND | 32~256 Gbit | ONFI | ¥50~300 |
| QLC NAND | 1~10 Tbit | ONFI | ¥100~1000 |
| SD NAND（CSNP1GCR01） | 1 Gbit | SPI | ¥15~40 |
| 工业 SLC NAND | 512 Mbit ~ 4 Gbit | SPI/ONFI | ¥20~100 |

### 3.4 eMMC / UFS

- eMMC 4 GB~256 GB，¥30~300；
- UFS 64 GB~512 GB，¥100~600；
- 模块化产品，方便集成。


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 容量 | Mbit / Gbit |
| 接口 | SPI / QSPI / 并行 / ONFI |
| 时钟频率 | MHz（40~104 常见） |
| 擦写次数 | 10⁴~10⁵ |
| 数据保持 | 10~20 年 |
| 页大小 | 256 B（NOR）/ 2 KB（NAND） |
| 扇区/块大小 | 4 KB（NOR）/ 128 KB（NAND） |
| 工作电压 | 1.8V / 2.5V / 3.3V |
| 功耗 | mA 级 |
| 温度范围 | 消费级（-25~85°C）/ 工业级（-40~85°C） |

**选型建议**：
- 通用存储：W25Q64（8 MB SPI）；
- 字库/UI：W25Q128（16 MB SPI）；
- 大容量：W25Q256 / W25Q512；
- 高速：QSPI 模式；
- 工业级：ISSI、Macronix；
- 国产：GD、ZD、BY；
- NAND 大容量：SD NAND / SLC NAND；
- 移动设备：eMMC。


## 5. 硬件连接

### 5.1 SPI NOR Flash

- SCK/MOSI/MISO/CS；
- WP（写保护）、HOLD（暂停）；
- QSPI 模式：4 根数据线（IO0~IO3）+ SCK + CS；
- 去耦电容（100nF）；
- 3.3V 主流；
- 静电防护。

### 5.2 NAND Flash

- 8/16 位数据总线；
- 控制线（WE、RE、CLE、ALE、CE）；
- R/B（就绪/忙碌）；
- 必须 ECC（硬件或软件）；
- 必须坏块管理。

### 5.3 走线

- 高速 SPI 走线等长；
- 阻抗匹配；
- 远离干扰源。


## 6. 通信方式

- **SPI**：4 线（SCK/MOSI/MISO/CS）；
- **QSPI**：6 线（4 数据 + SCK + CS）；
- **Octal SPI**：8 数据线（性能更高）；
- **HyperBus**：高性能；
- **并行 NOR**：8/16 位数据 + 控制；
- **ONFI NAND**：8/16 位数据 + 控制。


## 7. 初始化流程

1. 配置 GPIO/SPI；
2. 读 JEDEC ID（验证通信）；
3. 读 SFDP（获取参数）；
4. 配置状态寄存器（QE、SR）；
5. 解除写保护；
6. 测试读写。


## 8. 驱动接口

```python
class Flash:
    """SPI NOR Flash（W25Q 系列）。"""
    def __init__(self, spi, cs):
        self.spi = spi
        self.cs = cs

    def begin(self):
        self._check_id()

    def _check_id(self):
        """读 JEDEC ID。"""
        self.cs.low()
        self.spi.transfer(0x9F)  # JEDEC ID 命令
        id1 = self.spi.transfer(0)  # 制造商
        id2 = self.spi.transfer(0)  # 容量
        id3 = self.spi.transfer(0)  # 类型
        self.cs.high()
        return (id1, id2, id3)

    def read(self, addr, n):
        """从 addr 读 n 字节。"""
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
        """擦除 4KB 扇区。"""
        self._enable_write()
        self.cs.low()
        self.spi.transfer(0x20)
        self.spi.transfer((addr >> 16) & 0xFF)
        self.spi.transfer((addr >> 8) & 0xFF)
        self.spi.transfer(addr & 0xFF)
        self.cs.high()
        self._wait_busy()

    def page_program(self, addr, data):
        """编程 256 字节（一页）。"""
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



在 Flash 上实现文件系统：
- **LittleFS**：嵌入式专用，断电安全；
- **SPIFFS**：Arduino 常用，已淘汰；
- **FAT（FatFS）**：兼容 PC，但断电不安全；
- **Wear Leveling**：均衡写（必备）。

```python
# Micropython 示例
import lfs
flash = Flash(...)
fs = lfs.LittleFS(flash, block_size=4096, block_count=256)
```


## 9. 数据格式与单位

- 字节流；
- 多字节值；
- 字符串；
- 文件系统（FAT、LittleFS）。


## 10. 错误处理

- **JEDEC ID 错**：SPI 接线错、CS 未拉低；
- **读错误**：时序错、速度过快；
- **写失败**：写保护未解除；
- **擦除失败**：电压不足；
- **坏块**：NAND 必备坏块管理；
- **ECC 错误**：NAND 数据校验失败。


## 11. 低功耗

- 深度休眠电流 < 1 µA；
- 写入时 ~20 mA（3.3V）；
- 读取时 ~10 mA；
- 间歇使用（按需读写）；
- 文件系统挂载/卸载。


## 12. 示例代码

```python
flash = Flash(spi, cs_pin)
flash.begin()
print("ID:", flash._check_id())

# 读
data = flash.read(0, 16)
print(data)

# 擦除 + 写
flash.sector_erase(0)
flash.page_program(0, b'Hello World!')
```


## 13. 调试方法

1. 检查 JEDEC ID；
2. 用 SFDP 读取参数；
3. 读写测试；
4. 测读写速度（通过率）；
5. 测试擦写循环（寿命）；
6. 检查坏块。


## 14. 常见问题

- **JEDEC ID 错**：SPI 接线、CS 未拉低、时序错；
- **写入无效**：写保护未解除；
- **数据错**：擦除未执行、地址错；
- **NOR 读写失败**：速度过快、信号完整性；
- **NAND 损坏**：ECC 错误、坏块、写入抖动。


## 15. 参考资料

- 写之前必须擦除；
- 写时间较长（ms 级）；
- 写次数有限，注意磨损均衡；
- 长时间不使用会缓慢丢失数据（数据保持）；
- 与 MCU 内部 Flash 区别（外部 Flash 一般用 SPI）；
- 必须加写保护电路（防止意外写）；
- 工业应用选工业级芯片。



- Winbond W25Q 系列数据手册
- Macronix MX25L 系列数据手册
- SST SST26VF 系列数据手册
- ONFI 标准（Open NAND Flash Interface）
- JEDEC JESD216 SFDP 标准
- LittleFS / FatFS 文件系统文档
- Micron / Toshiba / Hynix NAND 技术规格


## 16. 写入策略

### 11.1 磨损均衡

- 同一扇区不要反复写；
- 写均衡算法分散到不同扇区；
- LittleFS 自带磨损均衡。

### 11.2 写入时间

- 写一页（256 字节）：~3 ms；
- 擦一个扇区（4 KB）：~50 ms；
- 写一扇区（4 KB）：~50 ms（先擦后写）；
- 比 EEPROM 慢，但容量大。

### 11.3 写前擦

- NOR Flash 写只能从 1 → 0；
- 擦除后全为 1（0xFF）；
- 写不完整则数据损坏。
