# UART（串口）


## 1. 模块概览

UART（Universal Asynchronous Receiver/Transmitter，通用异步收发器）是嵌入式最常用的串行通信接口，用于：
- 调试日志（printf 重定向）；
- 模块通信（GPS、蓝牙、WiFi）；
- 工业设备（RS232/RS485）；
- 模块固件烧录（Bootloader）；
- 串口控制台；
- 与 PC 通信。

特点：
- 异步（无时钟线）；
- 全双工（TX/RX 两根线）；
- 点对点（UART 本身），多设备需 RS485 总线；
- 简单可靠；
- 速度：1.2 kbps ~ 数 Mbps。


## 2. 工作原理与适用场景

### 2.1 物理层

- **TX**：发送；
- **RX**：接收；
- **GND**：共地；
- 电平：TTL（0~VCC）/ RS232（-12V~+12V）/ RS485（差分）。

### 2.2 数据格式

```text
空闲线（高电平）
起始位（低电平 1 bit）
数据位（5/6/7/8/9 bit，LSB 在前）
校验位（None/Even/Odd/Mark/Space，0/1 bit）
停止位（1/1.5/2 bit，高电平）
```

### 2.3 波特率

- 双方必须一致；
- 常用：1200、2400、4800、9600、19200、38400、57600、115200、230400、460800、921600、1500000、2000000；
- 误差：< 2%（多数 UART 容忍 2~3%）；
- 高速：MCU 内部时钟分频需精确。


## 3. 常见型号与价格

### 3.1 USB-UART 桥接芯片

| 型号 | 速率 | 接口 | 特点 | 参考价 |
|---|---|---|---|---:|
| CH340 | 2 Mbps | USB-UART | 国产经典 | ¥1~3 |
| CH340G | 2 Mbps | USB-UART | 经典 | ¥1~3 |
| CH340C | 2 Mbps | USB-UART | 集成晶振 | ¥1~3 |
| CH340E | 2 Mbps | USB-UART | 微型 | ¥1~3 |
| CH342 | 3 Mbps | USB-UART | 新版 | ¥1~3 |
| CP2102 | 1 Mbps | USB-UART | Silicon Labs | ¥3~8 |
| CP2102N | 3 Mbps | USB-UART | 升级 | ¥5~12 |
| CP2104 | 1 Mbps | USB-UART | 小型 | ¥3~8 |
| FT232RL | 3 Mbps | USB-UART | FTDI 经典 | ¥10~25 |
| FT232H | 12 Mbps | USB-UART/SPI/I2C | 多功能 | ¥20~45 |
| FT230X | 3 Mbps | USB-UART | 小型 FTDI | ¥3~8 |
| FT240X | 3 Mbps | USB-FIFO | FIFO 模式 | ¥5~15 |
| PL2303 | 1 Mbps | USB-UART | 老款（山寨多） | ¥1~3 |
| PL2303HXD | 12 Mbps | USB-UART | 升级 | ¥3~8 |
| XR21V1410 | 12 Mbps | USB-UART | Exar | ¥10~25 |

### 3.2 UART 电平转换

| 型号 | 类型 | 特点 | 参考价 |
|---|---|---|---:|
| MAX3232 | RS232 | 经典 | ¥1~3 |
| SP3232 | RS232 | Sipex | ¥1~3 |
| MAX485 | RS485 | 收发器 | ¥1~3 |
| SP485 | RS485 | Sipex | ¥1~3 |
| MAX3485 | RS485 | 3.3V | ¥1~3 |
| ADM485 | RS485 | ADI | ¥1~3 |
| ISO1050 | 隔离 RS485 | TI | ¥10~25 |
| MAX13487 | RS485 自动方向 | 自动收发控制 | ¥3~8 |

### 3.3 串口调试器

| 类型 | 型号 | 参考价 |
|---|---|---:|
| USB-TTL 模块（CH340） | 经典 6 引脚 | ¥3~8 |
| USB-TTL 模块（CP2102） | 6 引脚 | ¥5~12 |
| USB-TTL 模块（FT232） | 6 引脚 | ¥15~30 |
| USB-RS485 模块 | CH340 + MAX485 | ¥5~15 |
| USB-RS232 模块 | CH340 + MAX3232 | ¥10~25 |
| USB 隔离模块 | ADUM3160 | ¥30~80 |
| ESP32-C3 串口烧录板 | 集成 | ¥10~25 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 波特率 | bps |
| 数据位 | 5~9 |
| 停止位 | 1 / 1.5 / 2 |
| 校验位 | None / Even / Odd / Mark / Space |
| 流控 | 无 / XON-XOFF / RTS-CTS |
| FIFO | 字节缓冲 |
| 工作电压 | 1.8V / 3.3V / 5V |
| 驱动电流 | mA |

**选型建议**：
- 入门调试：CH340 模块（最便宜）；
- 工业稳定：FT232RL；
- 高速：CH342、CP2102N；
- 多协议：FT232H；
- 3.3V 兼容：MAX3485 / CP2102；
- 隔离：ADUM3160 / ISO1050。


## 5. 硬件连接

### 5.1 TTL UART

- 3.3V / 5V 兼容（多数）；
- TX 接 RX（交叉）；
- GND 共地；
- 注意：3.3V MCU 接 5V UART 需电平转换。

### 5.2 RS232

- -12V~+12V 电平；
- MAX3232 / SP3232 转换；
- 短距离（< 15m）；
- 现已少用，被 USB 取代。

### 5.3 RS485（详见 RS485 文档）

- 差分（A/B）；
- 终端电阻 120Ω；
- 长距离（< 1200m）；
- 总线型。

### 5.4 静电保护

- TVS 二极管；
- 屏蔽线（强干扰环境）；
- 隔离（医疗、工业）。


## 6. 通信方式

- 异步串行；
- 全双工；
- 多设备：RS485 总线（半双工）+ 地址；
- 软件流控（XON/XOFF）：ASCII 控制字符；
- 硬件流控（RTS/CTS）：硬件握手信号。


## 7. 初始化流程

1. 配置 GPIO（TX 输出、RX 输入）；
2. 配置 UART 控制器（波特率、数据位、停止位、校验、流控）；
3. 配置 FIFO（深度）；
4. 配置中断（接收完成、发送完成）；
5. 启用 UART；
6. 测试。


## 8. 驱动接口

```python
class UART:
    def __init__(self, tx_pin, rx_pin, baud=115200):
        self.tx = tx_pin
        self.rx = rx_pin
        self.baud = baud

    def begin(self):
        pass

    def write(self, data):
        """发送 bytes/bytearray/str。"""
        pass

    def read(self, n=1):
        """读 n 字节。"""
        pass

    def readline(self):
        """读一行（遇 \\n）。"""
        pass

    def any(self):
        """是否有可读数据。"""
        pass

    def flush(self):
        """等待发送完成。"""
        pass


class UARTConsole:
    """调试控制台。"""
    def __init__(self, uart):
        self.uart = uart

    def print(self, *args):
        s = ' '.join(str(a) for a in args) + '\r\n'
        self.uart.write(s.encode())

    def printf(self, fmt, *args):
        s = fmt % args + '\r\n'
        self.uart.write(s.encode())
```



### 10.1 软件流控（XON/XOFF）

- XON（0x11）：恢复发送；
- XOFF（0x13）：暂停发送；
- 占用数据带宽；
- 简单但延迟高。

### 10.2 硬件流控（RTS/CTS）

- RTS：主机告诉从机"准备接收"；
- CTS：从机告诉主机"可以发送"；
- 实时性好；
- 多占用 2 个 GPIO。


## 9. 数据格式与单位

- 字节流（MSB 在前，多数）；
- 文本（ASCII）：调试日志；
- 二进制：协议；
- 帧：起始位 + 数据 + 校验 + 停止位；
- 一帧 10 bit（8N1，无校验）。


## 10. 中断与 DMA

- 中断：RX 完成 / TX 完成 / 错误；
- DMA：连续收发（如 GPS 数据流）；
- FIFO：硬件字节缓冲（部分 MCU 16~64 字节）；
- 环形缓冲区（软件）：接收数据到环形 buffer。

### 11.1 环形缓冲

```python
class RingBuffer:
    def __init__(self, size):
        self.buf = bytearray(size)
        self.head = 0
        self.tail = 0
        self.count = 0

    def write(self, data):
        for b in data:
            self.buf[self.head] = b
            self.head = (self.head + 1) % len(self.buf)
            self.count = min(self.count + 1, len(self.buf))

    def read(self, n):
        data = bytearray(n)
        for i in range(n):
            data[i] = self.buf[self.tail]
            self.tail = (self.tail + 1) % len(self.buf)
        return bytes(data)
```


## 11. 错误处理

- **校验错误**：检查波特率、线缆；
- **溢出错误**：FIFO 溢出，降低速率或提高处理速度；
- **帧错误**：停止位错误，检查电平；
- **总线冲突**：多主机同时发送（UART 不支持多主机）；
- **断线**：检测 TX 失联。


## 12. 低功耗

- 关闭未使用的 UART；
- 主机休眠前 flush；
- 设备支持硬件唤醒（特定字符）。


## 13. 示例代码

```python
uart = UART(tx_pin, rx_pin, baud=115200)
uart.begin()

# 发送
uart.write(b'AT\r\n')

# 接收
while uart.any():
    data = uart.read()
    print(data)

# 调试输出
console = UARTConsole(uart)
console.print("Hello World")
```


## 14. 调试方法

1. 测 TX/RX 电平；
2. 用逻辑分析仪抓波形；
3. 用 USB-TTL 模块连接到 PC（串口助手）；
4. 检查波特率、数据位；
5. 检查 GND 共地；
6. 短接 TX-RX 自环测试。


## 15. 常见问题

- **收到乱码**：波特率/数据位错、电平不匹配；
- **无响应**：TX/RX 接反、共地断；
- **丢数据**：环形缓冲不够大、处理慢；
- **过载**：FIFO 溢出；
- **PC 识别不到**：驱动未装（CH340 常见）；
- **断电重启丢失数据**：流控未启用。


## 16. 参考资料

- 各 MCU UART HAL 文档
- CH340 / CP2102 / FT232 数据手册
- MAX3232 / MAX485 数据手册
- RS232 / RS485 标准（EIA/TIA）