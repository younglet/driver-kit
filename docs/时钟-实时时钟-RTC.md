# RTC（实时时钟）


## 1. 模块概览

RTC（Real-Time Clock，实时时钟）是一种专门用于跟踪时间的集成电路，可在断电时由备用电池继续运行。常见于：
- 万年历时钟；
- 数据记录器时间戳；
- 考勤机；
- 工业 PLC；
- 智能家居定时；
- 仪表（电表、水表）；
- 医疗设备；
- 物联网设备时间同步；
- 闹钟系统。

类型：
- **外置 RTC**：DS1307、DS3231、PCF8563 等（带晶振）；
- **MCU 内置 RTC**：部分 MCU 内置 RTC（精度有限）；
- **网络时间协议（NTP）**：通过 WiFi/以太网同步；
- **GPS 时间**：通过 GPS 接收机同步。


## 2. 工作原理与适用场景

- 32.768 kHz 晶振提供 1 Hz 时基；
- 计数器：秒、分、时、日、月、年、星期（BCD 格式）；
- 备用电池（CR2032）维持运行（断电时）；
- 报警中断（闹钟）；
- 方波输出（32.768 kHz / 1 Hz / 1 kHz / 32 kHz 等）；
- 温度补偿（高端 RTC）。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 外置 RTC 芯片

| 型号 | 接口 | 精度 | 特点 | 参考价 |
|---|---|---|---|---|
| DS1307 | I2C | ±2 ppm（取决于晶振） | 经典 | ¥1~3 |
| DS1307+ | I2C | ±2 ppm | 升级 | ¥1~3 |
| DS3231 | I2C | ±2 ppm（±1 分钟/年） | 高精度 | ¥3~8 |
| DS3231S | I2C | ±2 ppm | 高精度 SOIC | ¥3~8 |
| DS3231M | I2C | ±5 ppm | 集成 MEMS | ¥5~15 |
| DS3232 | I2C | ±2 ppm | 带 SRAM | ¥5~15 |
| DS3234 | SPI | ±2 ppm | SPI 版本 | ¥5~15 |
| PCF8563 | I2C | ±50 ppm | NXP 经典 | ¥2~5 |
| PCF85063 | I2C | ±50 ppm | 升级 | ¥2~5 |
| PCF8523 | I2C | ±50 ppm | NXP | ¥2~5 |
| PCF85263 | I2C | ±20 ppm | 高精度 | ¥3~8 |
| MCP79400 | I2C | ±50 ppm | Microchip | ¥2~5 |
| MCP79410 | I2C | ±50 ppm | 带 SRAM | ¥3~8 |
| MCP79411 | I2C | ±50 ppm | 带 EEPROM | ¥3~8 |
| RX8025 | I2C | ±5 ppm | EPSON | ¥5~12 |
| RX8900 | I2C | ±5 ppm | EPSON 高精度 | ¥5~12 |
| SD2403 | I2C | ±5 ppm | 国产 | ¥3~8 |
| SD2405 | I2C | ±5 ppm | 国产 | ¥3~8 |
| SD3088 | I2C | ±5 ppm | 国产高精度 | ¥3~8 |
| ISL12022 | I2C | ±5 ppm | Renesas | ¥3~8 |
| ISL12026 | I2C | ±5 ppm | 带 EEPROM | ¥5~12 |
| ISL1208 | I2C | ±5 ppm | Renesas | ¥3~8 |
| AB1805 | I2C | ±5 ppm | Abracon | ¥3~8 |
| AM1805 | I2C | ±5 ppm | 集成晶振 | ¥5~15 |

### 3.2 RTC 模块

- DS1307 模块：¥3~8（带 CR2032 座）；
- DS3231 模块：¥5~15（带 CR2032 座）；
- PCF8563 模块：¥3~10；
- 高精度 DS3231SN 模块：¥5~15；
- 大容量电池模块（CR1220）：¥3~10。

### 3.3 MCU 内置 RTC

| MCU | RTC 精度 | 备份域 | 参考价 |
|---|---|---|---|
| STM32 | ±20 ppm | VBAT | ¥5~25 |
| ESP32 | ±50 ppm | 内置 + 外接 | ¥8~25 |
| Arduino（ATmega） | ±50 ppm | 无 | ¥10~25 |
| RP2040 | ±50 ppm | 无 | ¥5~15 |
| Nordic nRF52 | ±20 ppm | 无 | ¥10~25 |

### 3.4 网络时间同步（NTP）

- 通过 WiFi/以太网；
- 精度：10~100 ms（取决于网络）；
- NTP 服务器：pool.ntp.org、cn.ntp.org、time.windows.com；
- 协议：NTP（UDP 123）。

### 3.5 GPS 时间同步

- 精度：µs 级；
- 需 GNSS 模块；
- PPS 信号高精度同步。


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 接口 | I2C / SPI |
| 精度 | ppm（2 ppm = ±1 min/year；50 ppm = ±30 min/year） |
| 备用电池 | CR2032/CR1220/超级电容/锂电池 |
| 备份电流 | < 1 µA |
| 报警中断 | 支持 |
| 方波输出 | 多种频率 |
| SRAM | 部分芯片内置（如 DS3232：236B） |
| 工作电压 | 1.8V / 3.3V |
| 工作温度 | -40~85°C |

**选型建议**：
- 入门：DS1307 + CR2032；
- 高精度：DS3231（±2 ppm）；
- 超高精度：DS3231 + 温度补偿；
- 低功耗：PCF8563 / RX8900；
- 国产：SD2405 / SD3088；
- 嵌入式：MCU 内置 RTC + NTP 同步。


## 5. 硬件连接

### 5.1 基本电路

- VCC：主电源（3.3V/5V）；
- GND：地；
- SDA/SCL：I2C（4.7kΩ 上拉）；
- 32.768 kHz 晶振（多数内置）；
- VBAT：备用电池正极；
- INT：报警中断输出；
- SQW：方波输出；
- DS1307 外接 32.768 kHz 晶振（多数模块内置）；
- DS3231 内置晶振（温度补偿）；

### 5.2 备用电池

- CR2032：240 mAh，~10 年；
- CR1220：35 mAh，~3 年；
- 超级电容：可充电，但容量小（F）；
- 锂电池：ML2032（可充电）；
- 充电电流 < 1 µA；
- 防反接二极管。

### 5.3 走线

- 晶振走线短；
- 远离干扰源；
- 屏蔽（敏感环境）。



- 电池电压检测（部分芯片）；
- 低电量警告；
- 自动切换主电源 → 备用电池；
- 充电管理（ML2032）。


## 6. 通信方式

- **I2C**：多数 RTC（DS1307/DS3231/PCF8563）；
- **SPI**：少数 RTC（DS3234）；
- **3 线**：部分老式 RTC。


## 7. 初始化流程

1. 配置 I2C；
2. 检查芯片 ID；
3. 检查振荡器；
4. 检查备用电池电压；
5. 设置时间（首次）；
6. 启动。


## 8. 驱动接口

```python
class RTC:
    """通用 RTC。"""
    def __init__(self, bus, address=0x68):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def read_time(self):
        """返回 (year, month, day, hour, minute, second, weekday)。"""
        pass

    def write_time(self, year, month, day, hour, minute, second):
        pass

    def read_datetime(self):
        """返回 datetime 对象。"""
        pass

    def write_datetime(self, dt):
        pass

    def set_alarm(self, hour, minute, second, callback):
        pass

    def enable_square_wave(self, freq):
        """使能方波输出。"""
        pass

    def is_running(self):
        """返回振荡器是否在运行。"""
        pass


class DS3231(RTC):
    """DS3231 高精度 RTC。"""
    def __init__(self, bus, address=0x68):
        super().__init__(bus, address)

    def read_temperature(self):
        """返回内部温度（用于补偿）。"""
        pass


class PCF8563(RTC):
    """PCF8563 RTC。"""
    def __init__(self, bus, address=0x51):
        super().__init__(bus, address)
```



- 报警时间：秒/分/时/日/月/年；
- INT 引脚输出低电平；
- 中断唤醒 MCU（深度休眠）；
- 单次/周期性报警。



- 1 Hz：秒脉冲；
- 1.024 kHz：标准频率；
- 4.096 kHz：标准频率；
- 8.192 kHz：标准频率；
- 32.768 kHz：原始晶振频率；
- 部分 RTC 提供频率配置。


## 9. 数据格式与单位

- BCD（Binary Coded Decimal）：如 25 秒 = 0x25；
- 时间寄存器（DS1307）：
  - 0x00：秒（BCD）；
  - 0x01：分钟（BCD）；
  - 0x02：小时（BCD）；
  - 0x03：星期（1=周日）；
  - 0x04：日（BCD）；
  - 0x05：月（BCD）；
  - 0x06：年（BCD，00~99）。


## 10. 校准与滤波

### 11.1 时间校准

- 手动：写时间寄存器；
- 网络：通过 NTP 同步；
- GPS：通过 PPS 同步；
- 长期漂移：DS3231 ±2 ppm 每年 ±1 分钟；
- 普通 RTC：±50 ppm 每年 ±15 分钟。

### 11.2 振荡器校准

- 调整晶振负载电容；
- 数字校准（部分芯片支持 +N/-N ppm）；
- DS3231 + 老化补偿（每月手动 +1 ppm 或 -1 ppm）。


## 11. 错误处理

- **振荡器停止**：晶振坏、焊接不良；
- **时间不更新**：I2C 错误、芯片未配置；
- **备用电池耗尽**：电量监测（部分芯片）；
- **报警不响应**：中断未启用、INT 引脚未接；
- **年溢出**：100 年需要重新设置（闰年补偿有）。


## 12. 低功耗

- 待机电流 < 1 µA（备用电池）；
- 主电源断开后备用电池供电；
- 备份电池可用 5~10 年；
- NTP 同步可减少 RTC 依赖。


## 13. 示例代码

```python
class DS3231:
    def __init__(self, bus, address=0x68):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def set_time(self, year, month, day, hour, minute, second):
        """设置时间。"""
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
        """读时间。"""
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


## 14. 调试方法

1. 测 VCC 和 VBAT 电压；
2. 测 I2C 通信；
3. 检查晶振波形（32.768 kHz）；
4. 用示波器测方波输出；
5. 长时间测试精度（对比 NTP）；
6. 测试备用电池断电保持。


## 15. 常见问题

- **时间不准确**：晶振误差、补偿缺失、温度影响；
- **备用电池失效**：电池没电、焊接错；
- **I2C 不通**：地址错（DS3231 = 0x68，PCF8563 = 0x51）、上拉未接；
- **时间错乱**：CH/STOP 位、振荡器停止；
- **报警不工作**：中断未启用、时间未配置；
- **闰年错**：闰年补偿未启用；
- **年溢出**：100 年需要重新设置。


## 16. 参考资料

- DS1307 精度依赖外部晶振（多数模块用普通晶振，误差大）；
- DS3231 内置晶振 + 温度补偿，精度高；
- 初次使用必须设置时间；
- 备用电池不可拆除（会丢失时间）；
- 长时间（10 年）后晶振老化精度下降；
- 高精度需求考虑 NTP 或 GPS 同步；
- 报警中断可用于低功耗唤醒。



- Maxim DS1307 / DS3231 / DS3232 数据手册
- NXP PCF8563 / PCF8523 数据手册
- EPSON RX8025 / RX8900 数据手册
- SD2405 / SD3088 国产 RTC 数据手册
- STM32 RTC 参考手册
- NTP 协议规范（RFC 5905）
- ESP32 内置 RTC 参考文档


## 17. BCD ↔ Binary 转换

```python
def bcd_to_bin(bcd):
    return (bcd >> 4) * 10 + (bcd & 0x0F)

def bin_to_bcd(bin):
    return ((bin // 10) << 4) | (bin % 10)
```
