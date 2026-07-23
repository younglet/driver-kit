# USB


## 1. 模块概览

USB（Universal Serial Bus，通用串行总线）是 Intel 等公司于 1995 年提出的有线串行通信接口，现已普及到几乎所有设备。

应用：
- 充电（USB PD）；
- 数据传输；
- 调试（USB-CDC）；
- 鼠标、键盘（HID）；
- U 盘 / 移动硬盘（MSC）；
- 音频（USB Audio）；
- 视频（UVC）；
- 设备固件升级（DFU）。


## 2. 工作原理与适用场景

### 2.1 拓扑

- 主从架构（Host-Device）；
- 主机（PC、手机 OTG）；
- 设备（鼠标、键盘、U 盘）；
- 集线器（Hub）：扩展端口；
- 最多 127 个设备（一层 Hub）；
- 7 层 Hub 级联。

### 2.2 物理层

- **差分信号**：D+ / D-；
- 速率分档：
  - Low Speed（LS）：1.5 Mbps；
  - Full Speed（FS）：12 Mbps；
  - High Speed（HS）：480 Mbps；
  - Super Speed（SS）：5 Gbps（USB 3.0）；
  - Super Speed+（SS+）：10 Gbps（USB 3.1）；
  - USB4：20~40 Gbps。
- **NRZI 编码**（FS/HS）+ 位填充；
- **8b/10b 编码**（SS）。

### 2.3 协议层

- **包（Packet）**：令牌包、数据包、握手包、特殊包；
- **事务（Transaction）**：控制 / 同步 / 中断 / 批量；
- **传输（Transfer）**：多个事务完成一次完整传输；
- **端点（Endpoint）**：设备上的数据通道；
  - EP0：控制端点（双向）；
  - EP_IN/EP_OUT：数据端点。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 USB 控制器

| 型号 | 类型 | 速率 | 特点 | 参考价 |
|---|---|---|---|---:|
| CH376 | SPI/并行 | FS | 文件管理 | ¥5~12 |
| CH376S | SPI/并行 | FS | 文件管理 | ¥5~12 |
| CH375 | 并行 | FS | 文件管理 | ¥3~8 |
| MAX3421 | SPI | FS | Maxim | ¥15~35 |
| TUSB2046 | 4 端口 Hub | FS | TI | ¥10~25 |
| TUSB2070 | 7 端口 Hub | FS | TI | ¥15~30 |
| TUSB4041 | 4 端口 Hub | HS | TI | ¥15~35 |
| TUSB8041 | 4 端口 Hub | SS | TI | ¥25~60 |
| USB3300 | ULPI | HS | SMSC/Microchip | ¥15~35 |
| USB5744 | 4 端口 Hub | HS/SS | Microchip | ¥25~60 |
| RP2040 内置 | - | FS/LS | Raspberry Pi | ¥5~15 |
| STM32 内置 USB FS | - | FS | STM32 | ¥0（内置） |
| STM32 内置 USB HS | - | HS | 部分 STM32 | ¥0（内置） |
| ESP32-S2 内置 | - | FS | Espressif | ¥8~20 |
| ESP32-S3 内置 | - | HS | Espressif | ¥10~25 |

### 3.2 USB Type-C PD 控制器

| 型号 | 角色 | 特点 | 参考价 |
|---|---|---|---:|
| FUSB302 | PD DRP | 可编程 PD | ¥3~8 |
| CH224K | PD DRP | 诱骗 | ¥2~5 |
| HUSB238 | PD Sink | 诱骗 | ¥2~5 |
| FUSB251 | PD Source | 供电 | ¥5~15 |
| RT1715 | PD DRP | Richtek | ¥5~15 |
| IP2721 | PD Sink | Injoinic | ¥2~5 |

### 3.3 USB-UART 桥接芯片（详见 UART 文档）

CH340、CP2102、FT232、PL2303 等。

### 3.4 USB 工具

| 设备 | 特点 | 参考价 |
|---|---|---|
| USB 协议分析仪 | 抓包分析 | ¥1000~5000 |
| USB 电流表 | 充电测试 | ¥10~30 |
| USB 测试仪 | 电压电流 | ¥20~50 |
| USB 隔离器 | 抗干扰 | ¥30~100 |
| USB Hub 工业级 | 多端口 | ¥50~300 |
| USB-C 转接板 | 测试用 | ¥5~20 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 速率 | LS / FS / HS / SS |
| 角色 | Host / Device / OTG / DRP |
| 协议类 | HID / CDC / MSC / DFU / Audio / Vendor |
| 端点数 | 1~15（除 EP0） |
| 工作电压 | 5V（默认）/ 12/20V（PD） |
| 电流 | 500 mA（USB 2.0）/ 900 mA（USB 3.0）/ 5A（PD） |
| 物理接口 | USB-A / USB-B / Mini / Micro / Type-C |

**选型建议**：
- 串口调试：CH340、CP2102；
- 数据采集：STM32 + USB FS；
- U 盘读写：CH376、CH375；
- 高速传输：USB HS（如 STM32F4）；
- Type-C PD：FUSB302、CH224K、HUSB238；
- USB Host：MAX3421（SPI）+ MCU。


## 5. 硬件连接

### 5.1 物理接口

- **USB-A**：经典（主机）；
- **USB-B**：方口（设备）；
- **Mini USB**：早期手机；
- **Micro USB**：手机/充电；
- **Type-C**：现代设备（可正反插）。

### 5.2 电气

- VBUS：5V（USB 2.0）/ 5V/12V/20V（PD）；
- D+ / D-：差分信号，90Ω 差分阻抗；
- 屏蔽：金属外壳；
- ESD：±15 kV（部分芯片内置）。

### 5.3 走线

- 差分对（D+/D-）等长；
- 90Ω 差分阻抗；
- 短而直（< 50mm 最佳）；
- 保护器件（TVS、共模扼流圈）。

### 5.4 Type-C 注意事项

- CC1/CC2 引脚检测正反插；
- PD 通信通过 CC 线；
- SBU1/SBU2（音频/DP 辅助）；
- 高速差分（SS）。


## 6. 通信方式

- 控制传输：EP0，配置/状态；
- 中断传输：小数据、实时（键盘、鼠标）；
- 批量传输：大数据、可靠（U 盘）；
- 同步传输：实时数据流（音频、视频）；
- 测试模式：电气测试。


## 7. 初始化流程

### 8.1 USB Device

1. 配置 GPIO（DP/DM）；
2. 配置 USB 时钟（48 MHz）；
3. 配置 USB 协议类（HID/CDC/MSC）；
4. 配置端点；
5. 配置描述符（设备、配置、接口、端点、字符串）；
6. 启动 USB；
7. 等待主机枚举。

### 8.2 USB Host

1. 配置 GPIO（DP/DM）；
2. 配置 USB Host 控制器；
3. 检测设备插入；
4. 枚举设备（读描述符）；
5. 选择驱动（HID/CDC/MSC）；
6. 与设备通信。


## 8. 驱动接口

```python
class USBCDC:
    """USB 虚拟串口。"""
    def __init__(self):
        pass

    def begin(self):
        pass

    def write(self, data):
        pass

    def read(self, n=1):
        pass


class USBMSC:
    """USB 大容量存储。"""
    def __init__(self):
        pass

    def begin(self):
        pass

    def read_file(self, path):
        pass

    def write_file(self, path, data):
        pass


class USBHID:
    """USB HID 设备（键盘/鼠标）。"""
    def __init__(self):
        pass

    def begin(self):
        pass

    def mouse_move(self, dx, dy):
        pass

    def mouse_click(self, button):
        pass

    def keyboard_print(self, text):
        pass
```


## 9. 中断与 DMA

- 端点 FIFO（USB 控制器内置）；
- 中断：传输完成、错误、复位、挂起/恢复；
- DMA：高速传输。


## 10. 错误处理

- **无法枚举**：描述符错误、时钟不准；
- **无法识别**：驱动未装；
- **断线**：物理连接断开；
- **过流**：VBUS 过流保护；
- **握手错误**：重试。


## 11. 低功耗

- USB Suspend 模式（< 2.5 mA）；
- 远程唤醒（Resume）；
- USB BC 1.2 充电协议；
- PD 待机模式。


## 12. 示例代码

```python
# USB CDC（虚拟串口）
usb = USBCDC()
usb.begin()
while True:
    if usb.any():
        data = usb.read()
        usb.write(b"Echo: " + data)
```


## 13. 调试方法

1. lsusb（Linux）查看设备；
2. 设备管理器（Windows）查看；
3. Wireshark USB 抓包（需 USBPcap）；
4. 协议分析仪（USBlyzer、Ellisys）；
5. 测 D+/D- 波形；
6. 检查 VBUS 电压电流。


## 14. 常见问题

- **无法识别**：驱动未装、描述符错；
- **无法枚举**：时钟不准（48 MHz 误差 > 0.25%）；
- **断线**：VBUS 不稳定、ESD 损坏；
- **Type-C 不识别**：CC 接线错、PD 控制器故障；
- **PD 协议失败**：Source/Sink 不匹配、线缆不支持；
- **数据丢失**：FIFO 溢出、带宽不足。


## 15. 参考资料

- USB 2.0 / USB 3.2 规范
- USB Type-C 规范
- USB PD 2.0 / 3.0 / 3.1 规范
- USB 类规范（HID、CDC、MSC、Audio）
- 各 MCU USB HAL 文档
- FUSB302 / CH224 PD 控制器数据手册

## 16. 协议类（Class）

- **HID**：Human Interface Device（键盘、鼠标）；
- **CDC**：Communication Device Class（虚拟串口）；
- **MSC**：Mass Storage Class（U 盘）；
- **DFU**：Device Firmware Upgrade；
- **Audio**：音频；
- **CDC-ACM**：抽象控制模型（虚拟串口）；
- **RNDIS / ECM / NCM**：以太网；
- **UVC**：USB Video Class（摄像头）；
- **UAC**：USB Audio Class；
- **Vendor**：厂商自定义。


## 17. 描述符

USB 设备通过描述符向主机报告：

- **设备描述符（Device）**：VID/PID、版本；
- **配置描述符（Configuration）**：电源、最大电流；
- **接口描述符（Interface）**：类、子类、协议；
- **端点描述符（Endpoint）**：地址、属性、最大包大小；
- **字符串描述符（String）**：制造商、产品名、序列号；
- **HID 描述符**：报告描述符等。

VID/PID：
- VID（Vendor ID）：16-bit，由 USB-IF 分配（购买）；
- PID（Product ID）：16-bit，厂商自定义；
- **未购买 VID 不能发布产品**（开源项目可使用测试 VID）。


## 18. USB Type-C 和 Power Delivery

### 11.1 Type-C 连接器

- 24 引脚（USB 3.1）；
- 正反插（CC1/CC2 检测）；
- 高速数据（SS 差分对）；
- USB PD（通过 CC 线通信）。

### 11.2 USB PD

- PD 2.0：5V/9V/15V/20V，最高达 100W；
- PD 3.0：PPS（可编程电源）；
- PD 3.1：EPR（扩展电源范围），达 240W；
- 协议：BMC 编码（CC 线）。

### 11.3 PD 角色

- **Source**：供电方（充电器）；
- **Sink**：受电方（设备）；
- **DRP**：双角色端口（可切换）；
- **Cable**：E-mark 线缆（标识能力）。
