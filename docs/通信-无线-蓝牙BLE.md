---
title: 蓝牙BLE
description: DriverKit · 通信分类下的 蓝牙BLE 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。
keywords: 蓝牙BLE,通信,无线,DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试
category: 通信
field: 无线
module: 蓝牙BLE
---
# 蓝牙 BLE


## 1. 模块概览

蓝牙（Bluetooth）是一种 2.4 GHz ISM 频段的短距离无线通信协议。BLE（Bluetooth Low Energy，低功耗蓝牙）是 4.0 引入的低功耗版本，常见于：
- 可穿戴设备（手环、手表）；
- 智能家居（灯、锁、传感器）；
- 医疗设备（血压计、血糖仪）；
- 信标（iBeacon、Eddystone）；
- 室内定位；
- 手机外设；
- IoT 设备。

特点：
- 低功耗（数 mA 到 µA 级）；
- 短距离（< 100 m）；
- 2.4 GHz ISM 频段（2400~2483.5 MHz）；
- 主从 + 广播模式；
- 数据吞吐：1~2 Mbps（BLE 5.0）。


## 2. 工作原理与适用场景

### 2.1 频段

- 2.4 GHz ISM；
- BLE 4.0/4.1/4.2：40 信道（0~39），其中 37/38/39 为广播信道；
- BLE 5.0+：增加 LE 2M PHY、LE Coded PHY（长距离）；
- 跳频（自适应跳频）；
- GFSK 调制。

### 2.2 角色

- **Broadcaster**：广播（iBeacon）；
- **Observer**：扫描；
- **Peripheral**：从机（接受连接）；
- **Central**：主机（发起连接）；
- 同一时间一个设备可担任一个角色。

### 2.3 协议栈

- **物理层（PHY）**：2M / 1M / Coded；
- **链路层（LL）**：广播、扫描、连接管理；
- **HCI**：主机控制器接口；
- **L2CAP**：逻辑链路控制；
- **ATT/GATT**：属性协议 / 通用属性；
- **GAP**：通用访问协议（角色、配对、广播）；
- **SMP**：安全管理（配对、绑定、加密）；
- **应用层（Profile）**：Service / Characteristic。

### 2.4 GATT 数据模型

- **Service**：服务（如电池服务、环境传感服务）；
- **Characteristic**：特征（数据点，包含数据 + 描述符）；
- **UUID**：128-bit 唯一标识（部分 16-bit 标准）；
- **Descriptor**：描述符（CCCD 用户配置等）；
- 客户端读写服务器数据。

### 2.5 广播

- **ADV_IND**：通用可连接广播；
- **ADV_SCAN**：可扫描广播；
- **ADV_NONCONN**：不可连接广播（iBeacon）；
- **ADV_DIRECT**：定向广播；
- 广播数据：31 字节（4.0/4.1/4.2）/ 254 字节（5.0 扩展广播）；
- 扫描响应：扫描请求/响应获取更多数据。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 BLE 芯片/模组

| 型号 | 类型 | 接口 | 特点 | 芯片参考价 | 模块参考价 |
|---|---|---|---|---:|---:|
| Nordic nRF51822 | BLE 4.0 | - | ARM Cortex-M0 | ¥10~25 | ¥20~50 |
| Nordic nRF52832 | BLE 5.0 | - | ARM Cortex-M4 | ¥15~35 | ¥30~70 |
| Nordic nRF52840 | BLE 5.0 | USB | ARM Cortex-M4 | ¥25~60 | ¥50~120 |
| Nordic nRF5340 | BLE 5.2 | - | 双核 | ¥30~80 | ¥80~180 |
| Nordic nRF52811 | BLE 5.1 | - | Cortex-M4 | ¥15~35 | ¥30~70 |
| TI CC2540 | BLE 4.0 | - | 8051 | ¥8~20 | ¥15~35 |
| TI CC2541 | BLE 4.0 | - | 8051 | ¥8~20 | ¥15~35 |
| TI CC2640 | BLE 5.0 | - | Cortex-M3 | ¥15~35 | ¥30~70 |
| TI CC2642 | BLE 5.1 | - | Cortex-M4F | ¥20~45 | ¥40~90 |
| TI CC2652 | BLE 5.1 | - | Cortex-M4F | ¥25~50 | ¥50~100 |
| Dialog DA14580 | BLE 4.2 | - | Cortex-M0 | ¥5~15 | ¥10~25 |
| Dialog DA14585 | BLE 5.0 | - | Cortex-M0 | ¥10~25 | ¥20~45 |
| Dialog DA14681 | BLE 5.0 | - | Cortex-M0 | ¥15~35 | ¥30~70 |
| Telink TLSR8258 | BLE 5.0 | - | RISC-V | ¥5~15 | ¥10~25 |
| 博通（Broadcom）BCM20734 | BLE 4.0 | - | ARM | ¥10~25 | ¥20~45 |
| Espressif ESP32 | BLE 4.2 | - | 内置 | ¥0（内置） | - |
| ESP32-S3 | BLE 5.0 | - | 内置 | ¥0（内置） | - |
| ESP32-C3 | BLE 5.0 | - | RISC-V | ¥0（内置） | - |
| ESP32-H2 | BLE 5.0 + 802.15.4 | - | RISC-V | ¥0（内置） | - |
| 炬芯 ATS2831 | BLE 5.0 | - | - | ¥10~25 | ¥20~45 |
| 中科蓝讯 AB5654 | BLE 5.2 | - | - | ¥8~20 | ¥15~35 |
| Realtek RTL8762 | BLE 5.0 | - | Cortex-M0 | ¥5~15 | ¥10~25 |
| 博流 BL702 | BLE 5.0 | - | RISC-V | ¥3~8 | ¥8~20 |

### 3.2 BLE USB 适配器

| 型号 | 特点 | 参考价 |
|---|---|---|
| nRF52840 USB Dongle | 开发用 | ¥50~150 |
| CC2540 USB Dongle | 经典 | ¥20~50 |
| BLED112 | Bluegiga | ¥100~200 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 协议版本 | 4.0 / 4.2 / 5.0 / 5.1 / 5.2 / 5.3 |
| 发射功率 | -20 ~ +10 dBm |
| 接收灵敏度 | -95 ~ -100 dBm |
| 距离 | 10~100 m（视距） |
| 数据吞吐 | 1 Mbps（LE 1M）/ 2 Mbps（LE 2M）/ 125 kbps（LE Coded） |
| 功耗 | mA 级（发送）/ µA 级（休眠） |
| 信道 | 40（4.0+） |
| 加密 | AES-128 |

**选型建议**：
- 入门/小批量：CC2540、DA14580；
- 现代开发：nRF52832、nRF52840；
- 集成方案：ESP32、ESP32-S3、ESP32-C3；
- 长距离：nRF52840 LE Coded PHY；
- 低成本国产：TLSR8258、RTL8762；
- 高端 BLE 5.3：nRF5340。


## 5. 硬件连接

- 电源：1.7V~3.6V（多数），加去耦电容（100nF）；
- 天线：PCB 天线（简单）、IPEX 连接器外接天线（更好）；
- 屏蔽：金属外壳（外壳作为天线延展）；
- 匹配网络：天线匹配电路（50Ω）；
- DC-DC 电源纹波：影响 RF 性能；
- 晶振：32 kHz（睡眠定时器）+ 32 MHz（主时钟）；
- ESD：TVS 防静电；
- 2.4 GHz 干扰：远离 WiFi、其他蓝牙设备。


## 6. 通信方式

- 广播（单向，无连接）；
- 扫描（接收广播）；
- 发起连接；
- 接受连接；
- 连接参数：interval、latency、timeout；
- 通知（Notification）和指示（Indication）；
- MTU（最大传输单元）：默认 23 字节，可协商到 247+。


## 7. 初始化流程

1. 配置 GPIO；
2. 配置时钟（32 kHz + 32 MHz）；
3. 初始化 BLE 协议栈；
4. 设置 GAP 角色（Peripheral/Central/Broadcaster）；
5. 设置广播数据（ADV 包）；
6. 注册 GATT 服务和特征；
7. 注册应用回调（连接、断开、读写）；
8. 启动广播/扫描。


## 8. 驱动接口

```python
class BLEPeripheral:
    def __init__(self, name):
        self.name = name
        self.services = []

    def begin(self):
        pass

    def add_service(self, uuid):
        pass

    def add_characteristic(self, uuid, properties):
        """properties: READ, WRITE, NOTIFY。"""
        pass

    def start_advertising(self):
        pass

    def stop_advertising(self):
        pass

    def notify(self, char_uuid, data):
        pass


class BLECentral:
    def __init__(self):
        self.devices = []

    def begin(self):
        pass

    def scan(self, duration_ms=5000):
        """扫描并返回附近设备。"""
        pass

    def connect(self, device):
        pass

    def disconnect(self):
        pass

    def read(self, char_uuid):
        pass

    def write(self, char_uuid, data):
        pass

    def subscribe(self, char_uuid, callback):
        """订阅通知/指示。"""
        pass
```



- **Just Works**：无加密（不安全，IoT 常用）；
- **Passkey**：6 位数字配对码（显示器+键盘输入）；
- **OOB**（Out of Band）：NFC 等通道传密钥；
- **LE Secure Connections**：ECDH P-256 加密（BLE 4.2+）；
- 绑定：保存密钥，下次连接自动加密。



### 12.1 iBeacon（Apple）

- 广播格式：`02 01 06 1A FF 4C 00 02 15 [UUID 16B] [Major 2B] [Minor 2B] [TX 1B]`;
- UUID 标识组织；
- Major/Minor：分层定位；
- TX Power：1 m 处信号强度（用于距离估算）。

### 12.2 Eddystone（Google）

- 多种类型：UID（标识）、URL（网址）、TLM（遥测）；
- 通过 Chrome 应用扫描。



- SIG 标准（BLE 5.0）；
- 网状网络（多跳）；
- 节点类型：Friend、Low Power、Relay、Proxy；
- 应用：智能照明、智能楼宇；
- nRF52 / ESP32 系列支持。


## 9. 数据格式与单位

- GATT：Characteristic 数据（bytes）；
- 通知/指示：自动推送数据；
- 读/写：客户端主动读写；
- UUID：128-bit 标识符。


## 10. 中断与 DMA

- 中断：连接事件、扫描完成、GATT 事件；
- 睡眠：System OFF（< 1 µA）/ System ON（保留 RAM）；
- 唤醒：GPIO / 定时器 / 广播（观察）；
- 电流：发送 ~5~10 mA，接收 ~5 mA，睡眠 < 1 µA。


## 11. 调试方法

1. 用 nRF Connect / LightBlue 扫描；
2. 测广播数据（UUID、Major、Minor）；
3. 测试连接参数（interval、latency）；
4. 测试 MTU 协商；
5. 测试配对绑定；
6. 测功耗（电流表）。


## 12. 常见问题

- **无法广播**：协议栈未启动、广播数据错；
- **无法连接**：广播间隔太短/太长、过滤；
- **断线频繁**：连接参数不当、信号弱；
- **配对失败**：认证方式不匹配；
- **数据收发失败**：MTU 协商错、Characteristic 属性错；
- **功耗高**：连接参数不当、未使用睡眠；
- **距离近**：天线匹配差、发射功率低、干扰。


## 13. 参考资料

- BLE 5.0 LE 2M PHY 可提高吞吐；
- LE Coded PHY 可长距离（125 kbps，~4 倍距离）；
- 苹果生态需 MFi 认证（iOS 13+ 部分免认证）；
- 广播数据大小限制（4.0/4.1/4.2 为 31 字节，5.0 扩展可达 254 字节）。



- Bluetooth Core Specification V5.3
- Bluetooth GATT 规范
- Assigned Numbers（UUID 列表）
- Nordic nRF52 SDK 文档
- Espressif ESP-IDF BLE 文档
- nRF Connect 调试工具


## 14. 配置文件（Profile）

- 标准 Profile：
  - 电池服务（BAS）；
  - 心率服务（HRS）；
  - 环境传感服务（ESS）；
  - 设备信息服务（DIS）；
  - HID（键盘/鼠标）；
  - 通用音频（GATT-based）；
- 自定义 Profile：私有 Service/Characteristic。
