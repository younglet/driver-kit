---
title: CAN
description: DriverKit · 通信分类下的 CAN 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。
keywords: CAN,通信,总线,DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试,CAN,CAN总线,CAN收发器,TJA1050
category: 通信
field: 总线
module: CAN
---
# CAN 总线


## 1. 模块概览

CAN（Controller Area Network，控制器局域网）是 Bosch 于 1986 年开发的串行通信协议，最初用于汽车，现已广泛应用于工业、医疗、轨道交通等。

特点：
- 多主总线（基于报文 ID 仲裁）；
- 高可靠性（CRC、ACK、错误检测）；
- 实时性（优先级仲裁）；
- 速率：125 kbps~1 Mbps（CAN）；CAN FD 5 Mbps；
- 距离：< 1 km（低速）；
- 节点数：理论上无限（实际 < 几十）；
- 应用：汽车 ECU、工业控制、医疗设备、机器人。


## 2. 工作原理与适用场景

### 2.1 物理层

- **CAN_H / CAN_L**：差分信号；
- 显性（Dominant）：CAN_H = 3.5V，CAN_L = 1.5V（差分 2V） = 逻辑 0；
- 隐性（Recessive）：CAN_H = CAN_L = 2.5V（差分 0V） = 逻辑 1；
- 终端电阻：120Ω（总线两端）；
- 共地：必须共地。

### 2.2 协议层（CAN 2.0）

- **帧类型**：数据帧、远程帧、错误帧、过载帧；
- **帧格式**：
  - SOF（Start of Frame）；
  - 仲裁段（11-bit ID 或 29-bit ID）；
  - 控制段（DLC）；
  - 数据段（0~8 字节）；
  - CRC 段；
  - ACK 段；
  - EOF（End of Frame）。

### 2.3 CAN 2.0A vs 2.0B

- **CAN 2.0A**：11-bit ID（标准帧）；
- **CAN 2.0B**：29-bit ID（扩展帧）；
- 2.0B 兼容 2.0A。

### 2.4 CAN FD

- **CAN with Flexible Data rate**；
- 数据段速率更高（最高 5 Mbps）；
- 数据段可达 64 字节；
- 与经典 CAN 兼容。

### 2.5 仲裁

- 多主机同时发送时，按 ID 大小仲裁（小 ID 优先）；
- ID 优先级：数值越小优先级越高；
- 仲裁失败方转为接收。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 CAN 收发器

| 型号 | 类型 | 速率 | 特点 | 参考价 |
|---|---|---|---|---:|
| TJA1050 | 高速 | 1 Mbps | NXP 经典 | ¥2~5 |
| TJA1051 | 高速 | 5 Mbps | NXP 新版 | ¥3~8 |
| TJA1057 | 高速 | 5 Mbps | NXP 低功耗 | ¥3~8 |
| TJA1042 | 高速 | 5 Mbps | NXP | ¥3~8 |
| TJA1044 | 高速 | 5 Mbps | NXP | ¥3~8 |
| TJA1053 | 容错 | 125 kbps | 容错低速 | ¥3~8 |
| TJA1054 | 容错 | 125 kbps | 容错低速 | ¥3~8 |
| SN65HVD230 | 高速 | 1 Mbps | TI 经典 | ¥3~8 |
| SN65HVD231 | 高速 | 1 Mbps | TI | ¥3~8 |
| SN65HVD232 | 高速 | 1 Mbps | TI | ¥3~8 |
| SN65HVD234 | 高速 | 1 Mbps | TI | ¥3~8 |
| SN65HVD251 | 高速 | 1 Mbps | TI 工业 | ¥5~12 |
| SN65HVD1050 | 高速 | 1 Mbps | TI | ¥3~8 |
| MAX3051 | 高速 | 1 Mbps | Maxim | ¥3~8 |
| MCP2551 | 高速 | 1 Mbps | Microchip | ¥3~8 |
| MCP2562 | 高速 | 1 Mbps | Microchip | ¥3~8 |
| ISO1050 | 隔离 | 1 Mbps | TI 隔离 | ¥15~30 |
| ADM3053 | 隔离 | 1 Mbps | ADI 隔离 | ¥15~30 |
| ADM3054 | 隔离 | 1 Mbps | ADI 隔离 | ¥15~30 |

### 3.2 CAN 控制器（独立芯片）

| 型号 | 接口 | 特点 | 参考价 |
|---|---|---|---|
| MCP2515 | SPI | Microchip 经典 | ¥5~12 |
| MCP2517 | SPI | Microchip CAN FD | ¥15~35 |
| MCP2518 | SPI | Microchip CAN FD | ¥15~35 |
| TJA1043 | SPI | NXP | ¥15~30 |
| STM32 内置 bxCAN | - | STM32 集成 | ¥0（内置） |
| ESP32 内置 TWAI | - | ESP32 集成 | ¥0（内置） |

### 3.3 CAN 工具

| 设备 | 特点 | 参考价 |
|---|---|---:|
| USB-CAN 分析仪 | 调试工具 | ¥50~200 |
| CANable | 开源 USB-CAN | ¥80~200 |
| PEAK PCAN-USB | 工业级 | ¥1000~3000 |
| Kvaser Leaf | 工业级 | ¥1500~5000 |
| CANalyzer / CANoe | Vector 工具 | ¥5000+ |
| 周立功 CAN 分析仪 | 国产工业 | ¥300~1000 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 协议 | CAN 2.0A / 2.0B / CAN FD |
| 速率 | bps（125k-1M） |
| 距离 | < 1 km（低速）/ 40 m（1 Mbps） |
| 终端电阻 | 120Ω |
| 收发器数 | 理论上无限 |
| 工作电压 | 3.3V / 5V |
| 隔离 | 抗地环路 |

**选型建议**：
- 入门：TJA1050 + MCP2515 + STM32；
- 集成方案：STM32 bxCAN + TJA1050；
- ESP32：内置 TWAI + TJA1050；
- CAN FD：MCP2517 / MCP2518 + TJA1051；
- 工业：隔离收发器（ISO1050）。


## 5. 硬件连接

### 5.1 接线

- CAN_H / CAN_L 双绞线；
- 总线两端 120Ω 终端电阻；
- 共地（必须）；
- 不能星型拓扑；
- 总线电容限制节点数。

### 5.2 终端电阻

- 总线两端各一个 120Ω（与线缆特性阻抗匹配）；
- 短总线或低速率可省；
- 中继器：在中继点也加 120Ω。

### 5.3 保护

- TVS 二极管（防浪涌）；
- ESD 保护（部分收发器内置 ±8 kV / ±15 kV）；
- 隔离：长距离、强干扰环境；
- 共模扼流圈。

### 5.4 走线

- 等长（差分线）；
- 阻抗匹配（100Ω 差分）；
- 远离干扰源；
- 屏蔽线缆。


## 6. 通信方式

- 多主机总线（基于 ID 仲裁）；
- 报文 ID 标识优先级；
- 报文过滤（接收方过滤）；
- 远程帧（请求数据）；
- 时间触发（CAN TTCAN）。


## 7. 初始化流程

1. 配置 GPIO（CAN TX/RX）；
2. 配置 CAN 控制器（波特率、时序、过滤器）；
3. 配置收发器使能；
4. 配置中断（接收、发送完成、错误）；
5. 启动 CAN；
6. 测试（自发自收）；
7. 开始通信。


## 8. 驱动接口

```python
class CANMessage:
    def __init__(self, id, data, ext=False, rtr=False):
        self.id = id
        self.data = data
        self.ext = ext
        self.rtr = rtr
        self.dlc = len(data)


class CAN:
    def __init__(self, can_id=0, baud=500000):
        self.baud = baud
        self.filters = []

    def begin(self):
        pass

    def set_filter(self, id, mask):
        """设置过滤器（只接收匹配的 ID）。"""
        pass

    def send(self, msg):
        """发送报文。"""
        pass

    def recv(self, timeout_ms=0):
        """接收报文，返回 CANMessage 或 None。"""
        pass

    def available(self):
        """是否有可读报文。"""
        pass


class CANopen:
    """CANopen 应用层协议。"""
    def __init__(self, can, node_id):
        self.can = can
        self.node_id = node_id
        self.od = {}  # 对象字典

    def begin(self):
        pass

    def send_pdo(self, pdo_id, data):
        """发送过程数据对象。"""
        pass

    def read_sdo(self, index, sub_index):
        """读服务数据对象。"""
        pass

    def write_sdo(self, index, sub_index, value):
        pass
```



- **CANopen**：对象字典、PDO、SDO；
- **J1939**：卡车、工程机械；
- **DeviceNet**：工业（北美）；
- **NMEA 2000**：船舶；
- **CAN Kingdom**：工业；
- **CCP/XCP**：标定协议；
- **OSEK/VDX**：汽车 RTOS 网络管理。


## 9. 数据格式与单位

- **CAN 2.0A 标准帧**：11-bit ID + 0~8 字节数据；
- **CAN 2.0B 扩展帧**：29-bit ID + 0~8 字节数据；
- **CAN FD**：11/29-bit ID + 0~64 字节数据；
- **CANopen**：预定义连接集 + 对象字典（OD）；
- **J1939**：29-bit ID + 应用层协议（卡车、工程机械）。



CAN 位时间由以下段组成：
- 同步段（Sync）：1 Tq；
- 传播段（Prop）：1~8 Tq；
- 相位缓冲段 1（PS1）：1~8 Tq；
- 相位缓冲段 2（PS2）：1~8 Tq；
- 总位时间 = 1 + Prop + PS1 + PS2（典型 8~25 Tq）；
- 采样点：60~87.5% 之间。

例如：1 Mbps，CAN 时钟 8 MHz → 1 Tq = 125 ns → 位时间 8 Tq = 1 µs。


## 10. 低功耗

- CAN 控制器待机（< 1 mA）；
- 收发器待机（< 0.1 mA）；
- 整机休眠时关闭 CAN 模块；
- CAN 硬件唤醒（部分芯片）。


## 11. 调试方法

1. 测 CAN_H / CAN_L 波形（示波器差分探头）；
2. 用 USB-CAN 工具抓包；
3. 检查终端电阻（120Ω）；
4. 自发自收测试；
5. 检查波特率误差；
6. 检查过滤器配置。


## 12. 常见问题

- **无法发送**：CAN 控制器未启动、总线关闭、终端电阻错；
- **无法接收**：过滤器阻挡、波特率错、终端电阻错；
- **错误帧频繁**：波特率错、线缆问题、终端电阻错；
- **Bus Off**：错误次数过多，需 MCU 恢复；
- **节点丢失**：地址冲突、过滤器错。


## 13. 参考资料

- 终端电阻必须正确；
- 长距离必须隔离；
- 多节点必须严格 ID 规划；
- 报文优先级由 ID 决定（小 ID 高优先级）；
- 错误处理必须可靠。



- ISO 11898 CAN 标准
- Bosch CAN 规范 2.0
- CiA 301 CANopen 协议
- SAE J1939 应用层
- TJA1050 / MCP2515 数据手册
- STM32 bxCAN 参考手册


## 14. 过滤器

- 接收方可以配置过滤器，只接收特定 ID；
- 掩码模式：id & mask == filter & mask；
- 列表模式：精确匹配；
- 节省 MCU 处理时间。


## 15. 错误检测和处理

CAN 控制器自动检测：
- 位错误；
- 填充错误；
- CRC 错误；
- 形式错误；
- ACK 错误；

错误状态：
- 主动错误（Error Active）；
- 被动错误（Error Passive）；
- 总线关闭（Bus Off）。

错误计数器 TEC/REC 自动增减。Bus Off 时需 MCU 恢复。
