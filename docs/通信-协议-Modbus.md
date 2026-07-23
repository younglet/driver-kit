# Modbus


## 1. 模块概览

Modbus 是 Modicon（现 Schneider Electric）于 1979 年发布的工业通信协议，现已成为工业自动化领域事实标准。特点：
- 简单、开放；
- 主从架构（Modbus RTU/ASCII）；
- 客户端/服务器（Modbus TCP）；
- 多种物理层（RS232、RS485、TCP、UDP）；
- 多种寄存器类型；
- 应用：PLC、变频器、伺服、电表、传感器、仪表。


## 2. 工作原理与适用场景

### 2.1 协议层（PDU）

PDU（Protocol Data Unit）独立于物理层：

```text
[功能码 (1 byte)] [数据 (0~252 bytes)]
```

### 2.2 物理层

- **Modbus RTU**（二进制）：RS485/RS232；
- **Modbus ASCII**（可读字符）：RS232/485；
- **Modbus TCP**（以太网）：TCP/IP；
- **Modbus UDP**（UDP/IP）；
- **Modbus Plus**（令牌总线，专用芯片，已较少）。

### 2.3 数据模型

四类寄存器（每类 65536 个）：

| 类型 | 访问 | 常见用途 |
|---|---|---|
| 线圈（Coil） | 读写 | DO（数字输出） |
| 离散输入（Discrete Input） | 只读 | DI（数字输入） |
| 保持寄存器（Holding Register） | 读写 | AO（模拟输出）/ 参数 |
| 输入寄存器（Input Register） | 只读 | AI（模拟输入） |

地址编号：
- Modbus 地址从 1 开始（人类）；
- 协议地址从 0 开始（PDU）；
- 转换：协议地址 = Modbus 地址 - 1。

### 2.4 通用帧格式（Modbus RTU）

```text
[从机地址 (1 byte)] [PDU (功能码 + 数据)] [CRC16 (2 bytes)]
```

帧间隔：3.5 字符时间无数据 = 帧结束。

### 2.5 通用帧格式（Modbus TCP）

```text
[MBAP 头 (7 bytes)] [PDU]
```

MBAP：
- Transaction ID（2 bytes）：事务标识；
- Protocol ID（2 bytes）：0x0000（Modbus）；
- Length（2 bytes）：后续字节数；
- Unit ID（1 bytes）：从机地址（TCP 中可省略）。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 Modbus 主控器（MCU/PLC）

| 设备 | 特点 | 参考价 |
|---|---|---|
| 西门子 S7-200 SMART | Modbus RTU/TCP | ¥1000~3000 |
| 西门子 S7-1200/1500 | Modbus RTU/TCP | ¥3000~20000 |
| 三菱 FX5U | Modbus RTU | ¥1500~5000 |
| 汇川 H5U / AM600 | Modbus | ¥1000~5000 |
| Arduino + MAX485 | Modbus RTU | ¥30~80 |
| ESP32 + MAX485 | Modbus RTU/TCP | ¥30~80 |
| 树莓派 | Modbus TCP | ¥300~600 |
| 工业网关 | 多协议转换 | ¥500~3000 |

### 3.2 Modbus 从机（传感器/仪表）

| 设备 | 类型 | 参考价 |
|---|---|---|
| 工业电表 | Modbus RTU | ¥100~500 |
| 工业水表/气表/热量表 | Modbus RTU | ¥200~1000 |
| 变频器（汇川/英威腾/西门子） | Modbus RTU | ¥500~3000 |
| 温度变送器 | Modbus RTU | ¥100~500 |
| 压力变送器 | Modbus RTU | ¥200~800 |
| 流量计 | Modbus RTU | ¥500~3000 |
| 电力监控仪 | Modbus RTU | ¥100~500 |
| IO 模块（开关量/模拟量） | Modbus RTU | ¥100~500 |
| 协议转换器（Modbus RTU-TCP） | 网关 | ¥200~1000 |

### 3.3 Modbus 库和工具

| 名称 | 类型 | 特点 |
|---|---|---|
| libmodbus | C 库 | 跨平台，开源 |
| pymodbus | Python | 主机/从机 |
| modbus-tk | Python | 简化 |
| ModbusTools | Windows 工具 | 调试 |
| Modbus Poll | Windows 调试 | 主机 |
| Modbus Slave | Windows 调试 | 从机 |
| QModMaster | 开源工具 | 跨平台 |
| mbpoll | Linux 命令行 | 调试 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 物理层 | RTU / ASCII / TCP / UDP |
| 波特率 | 1200 ~ 115200 bps（RTU） |
| 数据位 | 8（RTU/TCP） |
| 停止位 | 1 / 2 |
| 校验 | None / Even / Odd |
| 帧间隔 | 3.5 字符 |
| 节点数 | 1~247（RTU） |
| 速率 | 10 Mbps（TCP） |

**选型建议**：
- 简单传感器：Modbus RTU over RS485；
- 工业现场：Modbus RTU 4 线 RS485；
- 长距离：Modbus RTU + RS485 中继器；
- 多设备联网：Modbus TCP（以太网）；
- 远程监控：Modbus TCP + 4G/物联网网关。


## 5. 硬件连接

### 5.1 RTU/ASCII 物理层

- RS485（推荐）：A、B 双绞线；
- RS232：单点通信；
- 终端电阻 120Ω（两端）；
- 共地（必须）；
- 屏蔽（强干扰环境）；
- 隔离收发器（长距离）。

### 5.2 TCP 物理层

- 标准以太网（RJ45）；
- 网络交换机（多设备）；
- TCP 端口 502（Modbus）；
- 可走局域网/互联网。


## 6. 通信方式

- 主从（Master-Slave）：主机轮询从机；
- 广播（功能码 0）：主机向所有从机发送（无响应）；
- TCP：客户端/服务器（C/S）；
- 多主机：需自定义协议或协调；
- 大数据：Modbus TCP 性能更好。


## 7. 初始化流程

### 7.1 主机

1. 配置串口/网络；
2. 设置从机地址（1~247）；
3. 设置功能码；
4. 设置寄存器地址；
5. 设置数据；
6. 发送请求；
7. 等待响应（超时检测）；
8. 解析响应（CRC 校验）。

### 7.2 从机

1. 配置串口/网络；
2. 设置本机地址；
3. 配置寄存器数据（DO/DI/AO/AI）；
4. 监听请求；
5. 解析（地址匹配、功能码校验、CRC）；
6. 响应。


## 8. 驱动接口

```python
class ModbusClient:
    """Modbus RTU/TCP 主机。"""
    def __init__(self, transport, slave=1):
        self.t = transport
        self.slave = slave

    def read_holding_registers(self, addr, qty):
        """功能码 0x03。"""
        return self._send(0x03, addr, qty)

    def read_input_registers(self, addr, qty):
        """功能码 0x04。"""
        return self._send(0x04, addr, qty)

    def write_register(self, addr, value):
        """功能码 0x06。"""
        return self._send(0x06, addr, value)

    def write_registers(self, addr, values):
        """功能码 0x10。"""
        return self._send(0x10, addr, values)

    def read_coils(self, addr, qty):
        """功能码 0x01。"""
        return self._send(0x01, addr, qty)


class ModbusServer:
    """Modbus RTU/TCP 从机。"""
    def __init__(self, transport, slave=1):
        self.t = transport
        self.slave = slave
        self.coils = bytearray(65536 // 8)
        self.holding = [0] * 65536
        self.input = [0] * 65536

    def begin(self):
        pass

    def poll(self):
        """轮询请求（在主循环或中断中）。"""
        pass

    def set_coil(self, idx, val):
        self.coils[idx // 8] |= (1 << (idx % 8)) if val else 0

    def get_holding(self, idx):
        return self.holding[idx]
```


## 9. 数据格式与单位

每个设备都有寄存器映射表（地址 → 物理量）：

```text
地址 40001：温度值（°C × 10，整数）
地址 40002：湿度值（%RH × 10）
地址 40003：压力值（kPa × 100）
地址 40004：设备状态
地址 00001：继电器 1
地址 00002：继电器 2
...
```

主机读取时按映射表解读。


## 10. 错误处理

- **无响应**：地址错、波特率错、断线；
- **CRC 错误**：电磁干扰、波特率误差；
- **异常响应**：查看异常码；
- **超时**：响应时间过长；
- **寄存器错误**：地址超出范围。


## 11. 示例代码

```python
# Modbus RTU 主机（读温度）
client = ModbusClient(rs485, slave=1)
client.begin()

# 读保持寄存器（地址 0 = 温度）
result = client.read_holding_registers(0, 1)
if result and not result.isError():
    temp = result.registers[0] / 10.0  # 温度 ×10
    print("温度: %.1f°C" % temp)
```


## 12. 调试方法

1. 用 Modbus Poll 工具测试；
2. 用 USB-RS485 模块连接 PC；
3. 检查波特率、校验、地址；
4. 用示波器观察 A/B 波形；
5. 单独测试每个功能码；
6. 验证 CRC。


## 13. 参考资料

- 主从架构：从机不能主动发送（除少数异常）；
- 多主机：需要协议仲裁；
- 长距离：必须用 RS485；
- 高速：Modbus TCP（以太网）；
- 实时性：RTU 1ms~50ms 轮询周期，TCP 更短；
- 总线竞争：主机轮询避免冲突。



- Modbus Application Protocol V1.1b3（Modbus.org）
- Modbus Serial Line Protocol V1.02
- Modbus Messaging on TCP/IP V1.0b
- libmodbus 开源库
- Schneider Modbus 入门指南


## 14. 常用功能码

| 功能码 | 名称 | 操作 |
|---|---|---|
| 0x01 | 读线圈 | 读多个 DO |
| 0x02 | 读离散输入 | 读多个 DI |
| 0x03 | 读保持寄存器 | 读多个 AO/参数 |
| 0x04 | 读输入寄存器 | 读多个 AI |
| 0x05 | 写单个线圈 | 写 1 个 DO |
| 0x06 | 写单个寄存器 | 写 1 个 AO |
| 0x0F | 写多个线圈 | 写多个 DO |
| 0x10 | 写多个寄存器 | 写多个 AO |
| 0x14 | 读文件记录 | 高级 |
| 0x17 | 读写多个寄存器 | 原子操作 |

### 8.1 异常响应

主机请求错误时，从机返回异常码：

| 异常码 | 含义 |
|---|---|
| 0x01 | 非法功能码 |
| 0x02 | 非法数据地址 |
| 0x03 | 非法数据值 |
| 0x04 | 从机设备故障 |
| 0x05 | 确认（处理中） |
| 0x06 | 从机设备忙 |
| 0x08 | 存储奇偶校验差错 |
| 0x0A | 网关路径不可用 |
| 0x0B | 网关目标无响应 |


## 15. CRC16 校验（Modbus RTU）

CRC16（多项式 0xA001）：

```python
def crc16(data):
    crc = 0xFFFF
    for byte in data:
        crc ^= byte
        for _ in range(8):
            if crc & 1:
                crc = (crc >> 1) ^ 0xA001
            else:
                crc >>= 1
    return crc
```

CRC16 字节顺序：低字节在前（Modbus RTU）。


## 16. 安全考虑

- Modbus 本身无认证和加密（RTU）；
- Modbus TCP 需部署在受信任网络；
- 工业互联网：使用 VPN / TLS 隧道；
- 设备鉴权：自定义实现（Modbus Security）；
- 关键设备：禁止外部访问。
