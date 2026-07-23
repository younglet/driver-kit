# SD 卡


## 1. 模块概览

SD 卡（Secure Digital Memory Card）是常见的便携式存储卡。常见于：
- 相机、摄像机；
- 手机（部分）；
- 嵌入式数据记录（黑匣子、数据采集）；
- 树莓派系统盘；
- 音乐播放器；
- GPS 记录；
- 视频监控；
- 设备升级 SD 卡。

类型：
- **SD**（SDSC，标准容量）：< 2 GB（FAT16）；
- **SDHC**（高容量）：2~32 GB（FAT32）；
- **SDXC**（扩展容量）：32 GB ~ 2 TB（exFAT）；
- **SDUC**（超大容量）：2 TB ~ 128 TB；
- **microSD**：小型化版本；
- **SD Express**：PCIe + NVMe（高速）。


## 2. 工作原理与适用场景

### 2.1 接口

- **SD 总线（4 线 SD 模式）**：CLK/CMD/DAT0~3；
- **SPI 模式**：CLK/MOSI/MISO/CS（兼容 SPI 总线）；
- 速度等级：详见下表；
- SD Express（PCIe 3.0）：高速可达 1 GB/s。

### 2.2 速度等级

- **Class 2/4/6/10**：SD 最低写入速度 2/4/6/10 MB/s；
- **U1/U3**：UHS 最低写入速度 10/30 MB/s；
- **V6/V10/V30/V60/V90**：Video Speed Class 视频速度；
- **A1/A2**：Application Class 应用性能（随机 IOPS）。

### 2.3 文件系统

- FAT16（< 2 GB）；
- FAT32（2~32 GB）；
- exFAT（32 GB~2 TB）；
- Linux 文件系统（ext4、btrfs）较 SD 卡上少见；
- 长文件名（VFAT / LFN）支持。

### 2.4 命令集

- CMD0（GO_IDLE_STATE）：复位；
- CMD8（SEND_IF_COND）：接口条件；
- ACMD41（SD_SEND_OP_COND）：初始化；
- CMD17（READ_SINGLE_BLOCK）：读单块；
- CMD24（WRITE_BLOCK）：写单块；
- CMD18（READ_MULTIPLE_BLOCK）：读多块；
- CMD25（WRITE_MULTIPLE_BLOCK）：写多块；
- CMD55（APP_CMD）：ACMD 前缀；
- ACMD23（SET_WR_BLK_ERASE_COUNT）：预擦除。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 microSD 卡

| 型号 | 容量 | 速度等级 | 特点 | 参考价 |
|---|---|---|---|---|
| SanDisk Extreme 32 GB | 32 GB | A1/U3/V30 | 高速 | ¥30~50 |
| SanDisk Extreme 64 GB | 64 GB | A2/U3/V30 | 高速 | ¥50~90 |
| SanDisk Extreme 128 GB | 128 GB | A2/U3/V30 | 高速 | ¥80~150 |
| SanDisk Extreme 256 GB | 256 GB | A2/U3/V30 | 高速 | ¥150~280 |
| SanDisk Extreme 512 GB | 512 GB | A2/U3/V30 | 高速 | ¥300~500 |
| SanDisk Ultra 32 GB | 32 GB | A1/U1/Class 10 | 通用 | ¥20~35 |
| SanDisk Ultra 64 GB | 64 GB | A1/U1/Class 10 | 通用 | ¥35~55 |
| SanDisk Ultra 128 GB | 128 GB | A1/U1/Class 10 | 通用 | ¥55~90 |
| Samsung EVO Select 64 GB | 64 GB | U3/V30 | 高速 | ¥50~90 |
| Samsung EVO Select 128 GB | 128 GB | U3/V30 | 高速 | ¥80~150 |
| Samsung PRO Endurance 64 GB | 64 GB | U1/Class 10 | 高耐久 | ¥80~150 |
| Kingston Canvas Go Plus 64 GB | 64 GB | U3/V30 | 高速 | ¥50~90 |
| 金士顿 SDCS2/64 GB | 64 GB | A1/U1/V10 | 入门 | ¥30~50 |
| 铠侠 EXCERIA 64 GB | 64 GB | U1/V10 | 入门 | ¥30~50 |
| 铠侠 EXCERIA HIGH ENDURANCE 64 GB | 64 GB | U3/V30 | 高耐久 | ¥80~150 |
| Lexar 633x 64 GB | 64 GB | U1/V10 | 入门 | ¥35~60 |
| 雷克沙 PLAY 1 TB | 1 TB | U3/V30/A2 | 大容量 | ¥500~900 |

### 3.2 SD 卡适配器/模块

| 类型 | 特点 | 参考价 |
|---|---|---|
| microSD 模块（SPI） | 通用 | ¥3~10 |
| microSD 模块（SD 总线） | 高速 | ¥5~15 |
| SD 卡座模块 | 通用 | ¥2~8 |
| SPI + microSD 适配 | 面包板 | ¥5~15 |
| SD 卡转 USB 读卡器 | PC 用 | ¥5~20 |

### 3.3 SD Express

- 速度可达 1 GB/s（PCIe 3.0）；
- 价格昂贵，消费市场少见；
- 主要面向专业应用。


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 容量 | 2 GB ~ 1 TB+ |
| 接口 | SPI / SD / UHS-I/II/III |
| 速度等级 | Class 2/4/6/10、U1/U3、V6~V90 |
| 应用等级 | A1（1500 IOPS 读，500 IOPS 写）/ A2（4000 IOPS 读，2000 IOPS 写） |
| 耐久性 | 写入 TBW（Total Bytes Written） |
| 工作电压 | 3.3V |
| 工作温度 | -25~85°C（消费级）/ -40~85°C（工业级） |
| 寿命 | 与写入量相关 |

**选型建议**：
- 通用：SanDisk Ultra / Samsung EVO Select；
- 高速：SanDisk Extreme / Samsung PRO；
- 高耐久（视频、行车记录）：SanDisk High Endurance / Samsung PRO Endurance；
- 嵌入式数据记录：工业级 SD 卡（高耐久 + 抗干扰）；
- 树莓派系统：A2 级 + 32 GB+；
- 廉价：国产卡（需测试稳定性）。


## 5. 硬件连接

### 5.1 SPI 模式（MCU 常用）

- SCK/MOSI/MISO/CS；
- CS 引脚必须有上拉（SD 卡未插入时 MISO 不会变高阻）；
- 3.3V 电源；
- 100nF 去耦；
- TVS 防静电；
- 注意 SPI 速率（25 MHz 起步，50 MHz DSPI 高端）。

### 5.2 SD 总线模式（4 线）

- CLK/CMD/DAT0~3；
- 高速（50 MHz~208 MHz UHS）；
- 必须等长布线；
- 阻抗匹配（50Ω）。

### 5.3 供电

- 稳定 3.3V（最大 200 mA）；
- 写时电流尖峰（需大电容缓冲）；
- 部分卡支持 1.8V（UHS）。

### 5.4 走线

- 短而直；
- 等长（SD/SDR 模式）；
- 阻抗控制（SD 总线）；
- 远离干扰源。


## 6. 通信方式

- **SPI 模式**：兼容、慢（25 MHz）；
- **SD 1-bit 模式**：1 根数据线（默认）；
- **SD 4-bit 模式**：4 根数据线（推荐）；
- **UHS-I/II**：DDR 高速模式；
- **SD Express**：PCIe + NVMe。


## 7. 驱动接口

```python
class SDCard:
    """SD 卡 SPI 模式。"""
    def __init__(self, spi, cs):
        self.spi = spi
        self.cs = cs

    def begin(self, freq=20000000):
        """初始化。"""
        pass

    def read_block(self, block, buf):
        """读 512 字节。"""
        pass

    def write_block(self, block, buf):
        """写 512 字节。"""
        pass

    def read_blocks(self, block, count):
        """读多个块。"""
        pass

    def write_blocks(self, block, count, data):
        pass

    def get_size_mb(self):
        """返回容量 MB。"""
        pass


class FATFS:
    """FAT 文件系统（基于 SDCard）。"""
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



- **FAT16/FAT32/exFAT**：PC 兼容；
- **LittleFS**：嵌入式专用，断电安全；
- **SDFS**：Arduino SD 库；
- **ChaN FAT**：FatFs（开源）；
- 嵌入式文件系统选择：可靠性 > PC 兼容性。


## 8. 数据格式与单位

- 字节流（块 512 字节）；
- 文件系统（FAT）；
- 数据日志（CSV、BIN）；
- 图像（JPEG、PNG）；
- 视频（MP4、AVI）；
- 音频（MP3、WAV）。


## 9. 错误处理

- **初始化失败**：卡未插好、CS 未拉低、电源不稳；
- **CMD 超时**：SPI 速率过高、时序错；
- **CRC 错误**：EMI、线缆差、阻抗不匹配；
- **写入失败**：写保护（机械开关）；
- **文件系统损坏**：突然掉电，扫描修复（fsck）；
- **卡失效**：磨损、热关断、低质量。


## 10. 低功耗

- 待机 < 1 mA；
- 睡眠 < 100 µA；
- 关闭 SPI 时钟；
- 间歇读写（按需）；
- 不用时关闭 SD 卡电源。


## 11. 示例代码

```python
# MicroPython 示例
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


## 12. 调试方法

1. 测 CS、MOSI、MISO、SCK 波形；
2. 测电源电流（写时 ~100 mA）；
3. 读 CID/CSD 寄存器（卡 ID）；
4. 读写测试；
5. 用 chkdsk 检查文件系统；
6. 用 H2testw 检查卡真伪。


## 13. 常见问题

- **初始化失败**：卡未插好、CS 上拉、电源不稳；
- **写入失败**：写保护开关、卡损坏；
- **读取错误**：SPI 速率过高、EMI；
- **卡容量异常**：分区错误、卡格式异常；
- **掉电后文件丢失**：未 sync 或用 FAT（不安全）；
- **卡过热**：长时间连续写、SD 卡质量差；
- **卡被识别为只读**：写保护开关、磨损、损坏。


## 14. 参考资料

- SD 卡 SPI 模式下只能到 25 MHz 左右；
- SD 4-bit 模式可达 50 MHz（UHS-I 104 MHz）；
- 突然掉电可能损坏文件系统；
- 工业应用选工业级卡；
- 高耐久卡适合视频/数据记录；
- 定期备份重要数据；
- 卡的真伪问题（扩容卡）。



- SD 协会 Physical Specification V8.0
- SD 协会 File System Specification V3.0
- MicroSD SPI 模式应用笔记
- ELM Chan FAT 文件系统
- Arduino SD 库
- ESP32 SD 卡参考
- 各种 microSD 模块原理图


## 15. 初始化流程（SPI 模式）

1. 延时等待 SD 卡稳定（> 1 ms）；
2. CS 拉高，发送 CMD0（74+ 个时钟）；
3. 发送 CMD55 + ACMD41 或 CMD8 识别版本；
4. 循环发送 ACMD41 直到卡 ready；
5. 读取 OCR 寄存器；
6. 设置块大小（CMD16，默认 512）；
7. 进入 SPI 模式；
8. 切换到高速（25 MHz+）。


## 16. 写入策略

### 11.1 写入平衡

- SD 卡内部有 wear-leveling（但有限）；
- 频繁写日志：轮换文件；
- 批量写（积累 4 KB+ 再写）；
- 关闭不必要的小写。

### 11.2 写入性能

- 连续写入：~10~30 MB/s（U3）；
- 随机 4K 写入：~1~5 MB/s（A1/A2）；
- 同步写入：阻塞（fsync）；
- 异步写入：双缓冲。

### 11.3 写入安全

- 同步写入（sync）保证数据落盘；
- 双缓冲 + CRC 校验；
- 掉电时关键数据丢失（FAT 损坏）；
- 解决：使用 LittleFS 或事务日志。
