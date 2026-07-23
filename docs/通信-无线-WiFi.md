# Wi-Fi


## 1. 模块概览

Wi-Fi 是 IEEE 802.11 标准的无线局域网技术，工作在 2.4/5/6 GHz ISM 频段。常见于：
- IoT 设备（智能家居、传感器）；
- 工业网关；
- 视频传输（监控摄像头、无人机）；
- 智能手机、平板；
- 笔记本、电视；
- 智能音箱；
- POS 机；
- 可穿戴设备。

特点：
- 高速（数百 Mbps~数 Gbps）；
- 覆盖广（家庭 / 办公 / 户外）；
- 基础设施模式（STA + AP）；
- 安全性好（WPA2/WPA3）；
- 功耗较高（与 BLE 相比）。


## 2. 工作原理与适用场景

### 2.1 IEEE 802.11 标准

- **802.11b**：1999，2.4 GHz，最高 11 Mbps；
- **802.11a**：1999，5 GHz，最高 54 Mbps；
- **802.11g**：2003，2.4 GHz，最高 54 Mbps；
- **802.11n**（Wi-Fi 4）：2009，2.4/5 GHz，MIMO，最高 600 Mbps；
- **802.11ac**（Wi-Fi 5）：2014，5 GHz，MU-MIMO，最高 6.93 Gbps；
- **802.11ax**（Wi-Fi 6）：2019，2.4/5 GHz，OFDMA，最高 9.6 Gbps；
- **802.11ax**（Wi-Fi 6E）：2020+ 6 GHz；
- **802.11be**（Wi-Fi 7）：2024+，320 MHz，MLO，最高 30 Gbps。

### 2.2 拓扑

- **STA（Station）**：客户端连接 AP；
- **AP（Access Point）**：接入点（基站）；
- **Ad-Hoc**：点对点；
- **Wi-Fi Direct**：P2P 直连；
- **Mesh**：多跳网状（EasyMesh 等）；
- **WDS**：无线分布式系统（桥接）。

### 2.3 加密

- **Open**：无加密（不安全）；
- **WEP**：早期（已破解，禁用）；
- **WPA**：2003，TKIP 加密（已过时）；
- **WPA2**：2004，CCMP/AES-128（主流）；
  - WPA2-Personal（PSK）：家用；
  - WPA2-Enterprise（802.1X EAP）：企业；
- **WPA3**：2018，AES-128/256（更安全）；
  - SAE（Simultaneous Authentication of Equals）；
  - Enhanced Open（OWE）；
  - Enterprise 192-bit。

### 2.4 调制

- DSSS / CCK（802.11b）；
- OFDM（802.11a/g/n/ac）；
- OFDMA（802.11ax）；
- 1024-QAM（802.11ax）；
- 4096-QAM（802.11be）。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 Wi-Fi 芯片/模组

| 型号 | 标准 | 接口 | 特点 | 芯片参考价 | 模块参考价 |
|---|---|---|---|---:|---:|
| Espressif ESP8266 | 802.11 b/g/n | SPI/UART | 经典 IoT | ¥5~15 | ¥10~25 |
| ESP32 | 802.11 b/g/n + BLE | - | 双核 | ¥8~25 | ¥15~35 |
| ESP32-S2 | 802.11 b/g/n + USB | - | 单核 | ¥10~25 | ¥20~45 |
| ESP32-S3 | 802.11 b/g/n + BLE 5.0 + AI | - | 双核 + AI | ¥12~30 | ¥25~55 |
| ESP32-C3 | 802.11 b/g/n + BLE 5.0 | - | RISC-V | ¥5~15 | ¥12~25 |
| ESP32-C6 | 802.11 ax + BLE 5 + 802.15.4 | - | RISC-V | ¥10~25 | ¥20~45 |
| ESP32-H2 | 802.15.4 + BLE 5 | - | RISC-V | ¥8~20 | ¥15~35 |
| Realtek RTL8710 | 802.11 b/g/n | SPI/UART | 低成本 | ¥3~8 | ¥8~20 |
| Realtek RTL8720 | 802.11 b/g/n + BLE | SPI/UART | 升级 | ¥5~15 | ¥10~25 |
| Realtek RTL8189 | 802.11 b/g/n | SDIO/USB | PC/TV | ¥3~8 | ¥5~15 |
| Realtek RTL8821 | 802.11 ac + BT | USB/SDIO | PC | ¥10~25 | ¥20~45 |
| Realtek RTL8852 | Wi-Fi 6 + BT 5.3 | USB/SDIO | PC | ¥15~35 | ¥30~70 |
| TI CC3200 | 802.11 b/g/n | - | ARM Cortex-M4 | ¥15~35 | ¥30~70 |
| TI CC3220 | 802.11 b/g/n | - | 升级 | ¥20~50 | ¥40~100 |
| TI CC3235 | 802.11 b/g/n | - | 双频 | ¥25~60 | ¥50~120 |
| TI CC3551 | Wi-Fi 6 | - | 最新 | ¥30~70 | ¥60~150 |
| Microchip SAM W25 | 802.11 b/g/n | - | ARM | ¥15~35 | ¥30~70 |
| Microchip SAM W35 | 802.11 b/g/n | - | 升级 | ¥20~45 | ¥40~90 |
| Nordic nRF7002 | Wi-Fi 6 (station) | SPI | 辅助 MCU | ¥15~35 | ¥30~70 |
| Nordic nRF52840 + nRF7002 | BLE + Wi-Fi | - | 组合 | ¥40~100 | - |
| Broadcom BCM4343X | 802.11 b/g/n | SDIO | 嵌入式 | ¥10~25 | ¥20~45 |
| Broadcom BCM43455 | 802.11 ac | SDIO | 嵌入式 | ¥15~35 | ¥30~70 |
| Broadcom AP6256 | 802.11 ac + BT | SDIO | 模块 | - | ¥30~70 |
| MediaTek MT7697 | 802.11 b/g/n + BLE | - | IoT | ¥10~25 | ¥20~45 |
| MediaTek MT7699 | 802.11 b/g/n | - | 升级 | ¥12~30 | ¥25~55 |
| MediaTek MT7687 | 802.11 b/g/n | - | Cortex-M4 | ¥10~25 | ¥20~45 |
| MediaTek MT7921 | Wi-Fi 6 + BT 5.2 | PCIE | PC | ¥15~35 | ¥30~70 |
| 高通 QCA4004 | 802.11 b/g/n | - | IoT | ¥10~25 | ¥20~45 |
| 高通 QCA4020 | 802.11 b/g/n + BLE + Zigbee | - | 三模 | ¥15~35 | ¥30~70 |
| 高通 QCA9377 | Wi-Fi 5 + BT | USB/SDIO | PC | ¥10~25 | ¥20~45 |

### 3.2 USB Wi-Fi 适配器

- 入门级：基于 RTL8188 / RTL8811，¥15~40；
- 中端：RTL8812（5 GHz），¥40~80；
- 高端：RTL8852（Wi-Fi 6），¥80~200。


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 标准 | b/g/n/ac/ax/be |
| 频段 | 2.4 / 5 / 6 GHz |
| 带宽 | 20/40/80/160/320 MHz |
| MIMO | 1x1 ~ 8x8 |
| 调制 | BPSK~4096-QAM |
| 发射功率 | dBm（典型 15~20） |
| 接收灵敏度 | dBm（典型 -90~-100） |
| 加密 | WPA2 / WPA3 |
| 速率 | Mbps ~ Gbps |
| 功耗 | mA 级 |

**选型建议**：
- 入门 IoT：ESP8266、ESP32-C3；
- 现代 IoT：ESP32-S3、ESP32-C6；
- 高速传输：Wi-Fi 5/6 模组（ESP32-C5、BCM43455）；
- 双频：ESP32-C6、CC3235、AP6256；
- 低成本：RTL8710、TLSR8258；
- 工业：CC3200/CC3220/CC3235、QCA4020。


## 5. 硬件连接

- 电源：3.3V（多数），加去耦电容（100nF + 10µF）；
- 天线：
  - PCB 天线（简单，性能一般）；
  - 陶瓷天线（小型）；
  - 外置天线（IPEX/U.FL/MHF）；
  - 天线匹配（50Ω）；
- RF 走线：50Ω 阻抗控制；
- 屏蔽：金属外壳影响天线；
- DC-DC 电源纹波：影响 RF；
- 晶振：26 MHz / 40 MHz（部分）；
- ESD：TVS 防静电；
- 远离干扰：2.4 GHz 拥挤。


## 6. 通信方式

- TCP/IP（socket）；
- UDP；
- HTTP / HTTPS（REST API）；
- WebSocket；
- MQTT（IoT 消息协议）；
- mDNS（局域网发现）；
- SmartConfig / SoftAP 配网；
- OTA（空中升级）。


## 7. 初始化流程

1. 配置 GPIO；
2. 初始化 Wi-Fi 协议栈；
3. 设置工作模式（STA / AP / STA+AP）；
4. 配置认证和加密（WPA2/WPA3）；
5. 配置静态 IP 或 DHCP；
6. 连接 AP 或启动 AP；
7. 注册事件回调（连接、断开、IP 分配）；
8. 测试（ping、TCP）。



### 10.1 SmartConfig

- 通过 Wi-Fi 数据包传 SSID/密码；
- 设备处于混杂模式（Sniffer）；
- 微信小程序 / TI SmartConfig 等。

### 10.2 SoftAP 配网

- 设备启动 AP（如 ESP-XXXXXX）；
- 手机连接 AP 后，通过 HTTP/UDP 配置；
- 设备连接目标 Wi-Fi 后关闭 AP。

### 10.3 Bluetooth 配网

- BLE 通道传 Wi-Fi 凭据（如 ESP32 + BluFi）。

### 10.4 物理输入

- 屏幕+键盘输入 SSID/密码；
- 按键切换 AP 模式。


## 8. 驱动接口

```python
class WiFiStation:
    def __init__(self):
        self.connected = False
        self.ip = None

    def begin(self, ssid, password):
        pass

    def disconnect(self):
        pass

    def status(self):
        """返回连接状态。"""
        pass

    def local_ip(self):
        """返回 IP 地址。"""
        pass

    def scan(self):
        """扫描附近 AP。"""
        pass


class WiFiAP:
    def __init__(self):
        pass

    def begin(self, ssid, password):
        """启动 AP 模式。"""
        pass


class HTTPClient:
    def __init__(self):
        pass

    def begin(self, url):
        pass

    def get(self):
        """发送 GET 请求。"""
        pass

    def post(self, data):
        pass


class MQTTClient:
    def __init__(self):
        self.callback = None

    def begin(self, server, port):
        pass

    def connect(self, client_id, user=None, password=None):
        pass

    def publish(self, topic, data):
        pass

    def subscribe(self, topic, callback):
        pass
```


## 9. 数据格式与单位

- TCP：字节流；
- UDP：数据报；
- HTTP：文本协议（请求头+响应头+body）；
- MQTT：二进制（MQTT 3.1.1/5.0）；
- WebSocket：双向通信；
- JSON / Protobuf / CBOR 等应用层格式。


## 10. 错误处理

- 必须使用 WPA2/WPA3；
- 避免 WEP（已不安全）；
- 强密码（12+ 字符）；
- 不要开放 Open 网络；
- 定期更新固件；
- IoT 设备应隔离在独立网络。


## 11. 低功耗

- **Modem Sleep**：空闲时关闭 RF（典型）；
- **Light Sleep**：CPU 暂停，保留 RAM；
- **Deep Sleep**：完全休眠，仅 RTC 工作；
  - 唤醒：定时器 / GPIO / ULP 协处理器；
- **Power Save**：周期性唤醒接收 Beacon；
- 典型电流：
  - 主动：100~200 mA；
  - 接收：80 mA；
  - 发送（+18 dBm）：200 mA；
  - 睡眠（Modem Sleep）：3 mA；
  - 深度睡眠：10 µA。


## 12. 调试方法

1. 扫描 AP（SSID 列表）；
2. 测 RSSI（信号强度）；
3. 测吞吐量（iperf）；
4. 测功耗（电流表）；
5. 用 Wireshark 抓包（监视模式）；
6. 用 ping / curl 测试连通性。


## 13. 常见问题

- **无法连接**：密码错、加密方式不兼容、信道错；
- **频繁断线**：AP 信号弱、干扰、认证失败；
- **速率低**：距离远、信道拥挤、干扰；
- **无法配网**：混杂模式不支持、加密不匹配；
- **高功耗**：未使用 Modem Sleep；
- **OTA 失败**：下载中断、Flash 损坏；
- **IP 冲突**：DHCP 冲突、静态 IP 重复。


## 14. 参考资料

- 法规：不同国家允许信道不同（FCC / ETSI / 中国）；
- 2.4 GHz 仅 1~13 信道（部分国家 11/14）；
- 5 GHz 在中国可用信道较少；
- 6 GHz 仅 Wi-Fi 6E/7 在部分国家开放。



- IEEE 802.11 标准
- Wi-Fi Alliance 规范（WPA3 等）
- Espressif ESP-IDF Wi-Fi 文档
- TI CC3200/CC3220 文档
- ESP8266 Non-OS SDK / RTOS SDK
- 各 Wi-Fi 芯片数据手册
