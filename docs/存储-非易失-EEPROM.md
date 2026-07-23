---
title: EEPROM
description: DriverKit · 存储分类下的 EEPROM 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。
keywords: EEPROM,存储,非易失,DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试,AT24C256,EEPROM,I2C存储
category: 存储
field: 非易失
module: EEPROM
---
# EEPROM


## 1. 模块概览

EEPROM（Electrically Erasable Programmable Read Only Memory，电可擦除可编程只读存储器）是非易失性存储器，可按字节读写，掉电保持数据。常见于：
- 配置参数存储（设备 ID、校准参数）；
- 用户设置（阈值、模式）；
- 日志记录；
- 序列号、唯一标识；
- 加密密钥；
- I2C 总线（最常见）；
- SPI 总线（高速）。

特点：
- 按字节读写；
- 掉电保持（10~100 年）；
- 写次数有限（10⁶ 次）；
- 容量小（1 Kbit ~ 1 Mbit）；
- 写时延（5~10 ms）；
- 待机功耗极低（µA 级）。


## 2. 工作原理与适用场景

- **存储单元**：浮栅晶体管（FG-FET）；
- **擦写**：高压电脉冲（电荷注入/释放浮栅）；
- **写操作**：先擦除再写入；
- **按字节写**：无需先擦整页；
- **按页写**：多数芯片支持页写入（提高效率）。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 AT24C 系列（I2C）

| 型号 | 容量 | I2C 地址 | 页大小 | 特点 | 参考价 |
|---|---|---|---|---|---|
| AT24C01 | 1 Kbit | 0x50~0x53 | 8 B | 入门 | ¥1~3 |
| AT24C02 | 2 Kbit | 0x50~0x57 | 8 B | 经典 | ¥1~3 |
| AT24C04 | 4 Kbit | 0x50~0x53 | 16 B | 通用 | ¥1~3 |
| AT24C08 | 8 Kbit | 0x50~0x51 | 16 B | 通用 | ¥1~5 |
| AT24C16 | 16 Kbit | 0x50 | 16 B | 通用 | ¥2~5 |
| AT24C32 | 32 Kbit | 0x50~0x57 | 32 B | 通用 | ¥2~5 |
| AT24C64 | 64 Kbit | 0x50~0x57 | 32 B | 经典 | ¥2~5 |
| AT24C128 | 128 Kbit | 0x50~0x57 | 64 B | 中等 | ¥3~8 |
| AT24C256 | 256 Kbit | 0x50~0x57 | 64 B | 中等 | ¥3~8 |
| AT24C512 | 512 Kbit | 0x50~0x57 | 128 B | 大容量 | ¥5~15 |
| AT24C1024 | 1 Mbit | 0x50/0x51/0x52/0x53 | 256 B | 大容量 | ¥8~20 |

### 3.2 M24C / M24256（I2C，ST）

| 型号 | 容量 | 特点 | 参考价 |
|---|---|---|---|
| M24C01 | 1 Kbit | 通用 | ¥1~3 |
| M24C02 | 2 Kbit | 通用 | ¥1~3 |
| M24C16 | 16 Kbit | 通用 | ¥2~5 |
| M24C32 | 32 Kbit | 通用 | ¥2~5 |
| M24C64 | 64 Kbit | 通用 | ¥2~5 |
| M24256 | 256 Kbit | 通用 | ¥3~8 |
| M24512 | 512 Kbit | 通用 | ¥5~15 |

### 3.3 FM24C 系列（FRAM）

| 型号 | 容量 | 类型 | 特点 | 参考价 |
|---|---|---|---|---|
| FM24C04 | 4 Kbit | FRAM | 无限写 | ¥10~25 |
| FM24C16 | 16 Kbit | FRAM | 无限写 | ¥15~35 |
| FM24C64 | 64 Kbit | FRAM | 无限写 | ¥15~35 |
| FM24CL16 | 16 Kbit | FRAM | 低功耗 | ¥10~25 |
| FM24CL64 | 64 Kbit | FRAM | 低功耗 | ¥15~35 |

### 3.4 25AA/25LC 系列（SPI）

| 型号 | 容量 | 接口 | 参考价 |
|---|---|---|---|
| 25AA040A | 4 Kbit | SPI | ¥2~5 |
| 25AA080C | 8 Kbit | SPI | ¥2~5 |
| 25AA160C | 16 Kbit | SPI | ¥3~8 |
| 25AA256 | 256 Kbit | SPI | ¥5~12 |
| 25LC512 | 512 Kbit | SPI | ¥5~15 |
| 25LC1024 | 1 Mbit | SPI | ¥8~20 |

### 3.5 其他 EEPROM

| 类型 | 型号 | 特点 |
|---|---|---|
| 93C 系列（Microwire） | 93C46/56/66 | 老式串行 EEPROM |
| M93C 系列（ST） | M93C46/56/66 | 替代 93C 系列 |
| CAT24C 系列 | CAT24C01~256 | ON Semi 替代 |
| BR24 系列 | BR24L01~256 | ROHM 替代 |
| IS24 系列 | IS24C01~256 | ISSI |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 容量 | Kbit / Byte |
| 接口 | I2C / SPI / Microwire |
| 工作电压 | 1.8V / 2.5V / 3.3V / 5V |
| 写次数 | 10⁶ 次（EEPROM）/ 10¹⁴ 次（FRAM） |
| 数据保持 | 100~200 年 |
| 写时延 | 5~10 ms（EEPROM）/ 0（FRAM） |
| 页大小 | B（AT24C02 = 8，AT24C512 = 128） |
| 地址引脚 | 0~3 个（A0/A1/A2） |
| 写保护 | WP 引脚 |

**选型建议**：
- 入门：AT24C02（256 字节）；
- 中等配置：AT24C64（8 KB）；
- 大配置：AT24C512（64 KB）；
- 高频写：FRAM（FM24CL 系列）；
- 高速：SPI 25LC 系列；
- 唯一 ID/序列号：DS28CM00 / DS2401（Silicon ID）。


## 5. 硬件连接

### 5.1 I2C EEPROM（AT24C 系列）

- SDA、SCL 各 4.7kΩ 上拉到 VCC；
- A0/A1/A2：地址选择（部分型号有效）；
- WP：写保护（高电平 = 保护，低电平 = 可写）；
- 电源：去耦电容（100nF）；
- ESD 保护。

### 5.2 SPI EEPROM

- SCK/MOSI/MISO/CS；
- HOLD 引脚（部分支持）；
- WP 引脚；
- 3.3V 主流；
- 注意 SPI 模式（多数模式 0）。

### 5.3 写保护

- 硬件写保护：WP 引脚；
- 软件写保护：状态寄存器；
- 部分保护（如前 256 字节保护，后 256 字节可写）。


## 6. 通信方式

- I2C：最常见（AT24C 系列）；
- SPI：高速（25LC 系列）；
- Microwire：老式（93C 系列）；
- 单线（1-Wire）：DS24 系列 ID 芯片。


## 7. 初始化流程

1. 配置 I2C/SPI；
2. 验证通信（读 0 地址）；
3. 检查 WP 状态；
4. 准备使用。


## 8. 驱动接口

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
        """读 n 字节。"""
        return self.bus.read_then_write(self.address,
                                         addr.to_bytes(2, 'big'),
                                         n)

    def write(self, addr, data):
        """写 data（bytes/bytearray），自动分页。"""
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
    """FRAM（FM24C 系列），无写延迟。"""
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
    # 头部：magic + version
    eeprom.write(0, b'CFG')
    eeprom.write(3, b'\x01')  # version 1
    eeprom.write(4, config.to_bytes())

def load_config(eeprom):
    if eeprom.read(0, 3) == b'CFG':
        version = int.from_bytes(eeprom.read(3, 1), 'big')
        if version == 1:
            return eeprom.read(4, ...)
```


## 9. 数据格式与单位

- 字节流；
- 多字节值（uint16、uint32、float）；
- 结构化数据（json、protobuf）；
- 字符串。


## 10. 错误处理

- **I2C 错误**：检查地址、上拉、电源；
- **写入失败**：检查 WP 状态；
- **读出 0xFF**：未初始化或写入失败；
- **数据损坏**：掉电、CRC 错误，恢复默认；
- **寿命耗尽**：写次数超限，需更换；
- **地址越界**：检查写入地址。


## 11. 低功耗

- 待机电流 < 1 µA；
- 写入电流 ~3 mA（5 ms）；
- 间歇写（按需）；
- 深度休眠时关闭 EEPROM（电源开关）。


## 12. 示例代码

```python
eeprom = EEPROM(i2c, address=0x50, capacity=256)
eeprom.begin()

# 写配置
config = b'\x01\x02\x03\x04'
eeprom.write(0, config)

# 读配置
data = eeprom.read(0, 4)
```


## 13. 调试方法

1. 测 SDA/SCL 波形；
2. 扫描 I2C 地址；
3. 读写测试 0x00 地址；
4. 测试页写入（跨页）；
5. 测试 CRC 校验；
6. 测试掉电保持（断电重读）。


## 14. 常见问题

- **I2C 不通**：地址错、上拉未接、WP 接错；
- **写入数据损坏**：掉电、CRC 未加；
- **读取全 0xFF**：未写入或写入失败；
- **多次写失败**：WP 处于保护状态；
- **地址越界**：写入地址超出容量；
- **寿命耗尽**：频繁写，更换。


## 15. 参考资料

- 写入时序要求严格，遵守 5 ms 写时延；
- 同一页写入数据不能跨页（部分芯片会自动处理）；
- 写次数限制（10⁶）；
- 频繁写入关键参数要考虑寿命；
- 备份机制（双份 + CRC）；
- 写入前确保 WP 正确。



- Atmel AT24C 系列数据手册
- ST M24C 系列数据手册
- Cypress FM24CL FRAM 数据手册
- Microchip 25LC SPI EEPROM 数据手册
- Maxim DS28CM00 唯一 ID 数据手册
- 各种 I2C EEPROM 应用笔记


## 16. 写入策略

### 10.1 写入平衡

- 避免频繁写同一位置（损耗）；
- 写次数计数器：单字节可达 10⁶ 次；
- 写均衡：分散到不同位置；
- 寿命监控：每次写入递增计数器，溢出后告警。

### 10.2 掉电保护

- 写入前先读旧值；
- 写完后校验；
- 关键数据加 CRC 校验和；
- 双份存储（主备）；
- 写不完整时保留旧值。

### 10.3 校验和保护

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
    return None  # 数据损坏
```
