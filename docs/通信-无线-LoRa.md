# LoRa


## 1. 模块概览

LoRa（Long Range）是一种基于扩频调制的低功耗广域网（LPWAN）技术，由 Semtech 持有专利。常见于：
- 远程抄表（水表、电表、气表）；
- 农业监测（土壤、气象）；
- 资产追踪；
- 智能城市（路灯、停车）；
- 工业 IoT（设备监控）；
- 户外环境监测；
- 应急通信；
- 远距离控制（灌溉、阀门）。

特点：
- 超远距离（数 km ~ 数十 km 视距）；
- 低功耗（电池供电可工作数年）；
- 抗干扰强；
- 数据率低（0.3~50 kbps）；
- 多种扩频因子和带宽组合；
- 工作在 Sub-GHz 频段（433/868/915 MHz）。


## 2. 工作原理与适用场景

### 2.1 调制

- **CSS（Chirp Spread Spectrum）**：线性调频扩频；
- 每个数据符号用整个带宽 + 长时间传播；
- 抗噪声能力强；
- 解调简单（低功耗）。

### 2.2 关键参数

- **SF（Spreading Factor）扩频因子**：5~12
  - SF 越大，灵敏度越高，距离越远，但速率越低；
  - 常用 SF7~SF12；
- **BW（Bandwidth）带宽**：7.8~500 kHz
  - 带宽越大，速率越高，但灵敏度降低；
  - 常用 125 kHz；
- **CR（Coding Rate）编码率**：4/5、4/6、4/7、4/8
  - 前向纠错（FEC）冗余；
  - 数值越大越稳健但速率降低；
- **频率**：433/868/915 MHz（区域不同）；
- **发射功率**：+5~+20 dBm；
- **灵敏度**：-110 ~ -148 dBm；
- **空中时间**：取决于 SF、BW、数据长度。

### 2.3 链路预算

```text
链路预算 (dB) = 发射功率 + 发射天线增益
              + 接收天线增益 - 自由空间损耗
              - 各种损耗（电缆、阻挡、雨衰）
```

### 2.4 协议层

- LoRa 仅定义了物理层（PHY）；
- 协议栈：
  - **LoRaWAN**（LoRa Alliance）：MAC + 应用层；
  - **私有协议**：基于 LoRa 芯片的自定义协议；
- LoRaWAN 架构：
  - **终端设备（End Device）**：传感器节点；
  - **网关（Gateway）**：中继（8 信道）；
  - **网络服务器（Network Server）**：路由、去重、安全；
  - **应用服务器（Application Server）**：数据处理。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 LoRa 芯片

| 型号 | 频段 | SF | 特点 | 芯片参考价 |
|---|---|---|---|---:|
| Semtech SX1276 | 137~1020 MHz | 6~12 | 经典 | ¥15~35 |
| Semtech SX1278 | 137~525 MHz | 6~12 | 经典 | ¥15~35 |
| Semtech SX1262 | 150~960 MHz | 5~12 | 新一代 | ¥15~35 |
| Semtech SX1268 | 150~960 MHz | 5~12 | 中国频段 | ¥15~35 |
| Semtech SX1280 | 2.4 GHz | 5~12 | 2.4G LoRa | ¥20~45 |
| Semtech SX1302 | 多信道 | 8/16 | 网关 | ¥80~180 |
| Semtech SX1303 | 多信道 | 8/16 | 网关新 | ¥100~250 |
| HopeRF RFM95 | 868/915 MHz | 6~12 | 兼容 | ¥15~35 |
| HopeRF RFM96 | 433 MHz | 6~12 | 兼容 | ¥15~35 |
| HopeRF RF6500 | 多种 | 6~12 | 兼容 | ¥15~35 |

### 3.2 LoRa 模组

| 型号 | 类型 | 频段 | 功率 | 接口 | 参考价 |
|---|---|---|---|---|---:|
| RA-01 / RA-02 | 模组 | 433/868 | +17 dBm | SPI | ¥10~25 |
| RA-08 | 模组 | 470~510 | +20 dBm | SPI/UART | ¥15~35 |
| E22-400T22S | 模组 | 433 | +22 dBm | UART | ¥15~35 |
| E22-900T22S | 模组 | 868/915 | +22 dBm | UART | ¥15~35 |
| E32-433T20S | 模组 | 433 | +20 dBm | UART | ¥12~30 |
| E32-868T20S | 模组 | 868 | +20 dBm | UART | ¥12~30 |
| E220-900T22S | 模组 | 868/915 | +22 dBm | UART | ¥15~35 |
| E22-400M30S | 模组 | 433 | +30 dBm | UART | ¥30~70 |
| ATK-LORA-01 | 模组 | 433 | +20 dBm | UART | ¥15~30 |
| ATK-LORA-02 | 模组 | 868 | +20 dBm | UART | ¥15~30 |
| 致远电子 ZLAN6804 | 串口 LoRa | 433 | +20 dBm | UART | ¥30~80 |
| Lora1268 | 模组 | 470~510 | +20 dBm | SPI | ¥15~35 |

### 3.3 LoRa 网关

| 类型 | 特点 | 参考价 |
|---|---|---|
| 单信道网关 | 入门，DIY | ¥100~300 |
| 8 信道网关（SX1302） | 标准 LoRaWAN | ¥500~2000 |
| 工业级 16 信道网关 | RAK / MultiTech | ¥1500~5000 |
| Outdoor 8 信道室外网关 | 防水 | ¥1500~5000 |
| Indoor 网关 | 家用 | ¥300~1000 |
| 全双工网关 | 同时收发 | ¥3000~10000 |

### 3.4 LoRa 开发板

- TTGO LoRa 系列（ESP32 + LoRa）：¥50~150；
- Heltec LoRa 系列（ESP32 + OLED + LoRa）：¥80~200；
- RAK Wireless WisBlock（模块化）：¥100~400；
- Pycom LoPy（ESP32 + LoRa + Sigfox）：¥200~500；
- Murata ABZ LoRa 模组：¥30~80。


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 频段 | 433 / 470~510 / 868 / 915 MHz |
| 距离 | 数 km（城市）/ 10+ km（视距） |
| 数据率 | 0.3~50 kbps |
| 灵敏度 | -110 ~ -148 dBm |
| 发射功率 | +5 ~ +22 dBm |
| 调制 | CSS（LoRa）/ FSK / OOK |
| 扩频因子 | SF5~SF12 |
| 带宽 | 7.8 ~ 500 kHz |
| 加密 | AES-128（LoRaWAN） |
| 工作电压 | 1.8V~3.6V |
| 功耗 | 接收 ~10 mA，发送 ~100 mA@+17dBm |

**选型建议**：
- 433 MHz：中国大陆 ISM；
- 868 MHz：欧洲主流；
- 915 MHz：美国/澳洲；
- 470~510 MHz：中国 LoRaWAN 推荐；
- 终端设备：SX1262/SX1278；
- 网关：SX1302/SX1303 + 树莓派/工业主机；
- 模组化：RA-01、ATK-LORA、E22 系列。


## 5. 硬件连接

- 电源：3.3V（多数），去耦电容；
- 天线：
  - SMA / IPEX 外置天线；
  - 弹簧天线（PCB 板载）；
  - 433 MHz：约 17 cm 1/4 波长天线；
  - 868/915 MHz：约 8~9 cm；
- 阻抗匹配：50Ω；
- DC-DC 电源纹波：影响 RF；
- 屏蔽：金属外壳（与天线配合）；
- 静电：TVS 防静电；
- 干扰：避开同频段设备；
- 法规：遵守当地无线法规（占空比、发射功率限制）。


## 6. 通信方式

### 6.1 私有协议

- 透明传输（UART 转 LoRa）；
- 简单点对点；
- 自定义协议。

### 6.2 LoRaWAN 协议

- A 类（Class A）：最低功耗；
- B 类（Class B）：同步窗口；
- C 类（Class C）：持续接收；
- 激活方式：
  - **OTAA**（Over-The-Air Activation）：动态密钥；
  - **ABP**（Activation By Personalization）：静态密钥；
- ADR（Adaptive Data Rate）：自适应速率；
- 终端设备类型：
  - Class A（双向，最省电）；
  - Class B（同步接收）；
  - Class C（持续接收）。


## 7. 初始化流程

### 7.1 终端设备（LoRaWAN）

1. 配置 SPI；
2. 复位 LoRa 芯片；
3. 设置频段（区域）；
4. 设置 SF、BW、CR；
5. 设置 DevEUI、AppEUI、AppKey；
6. 加入网络（OTAA Join）；
7. 上下行数据通信。

### 7.2 网关

1. 安装 SX1302/SX1303 模块；
2. 配置网络（以太网 / 4G）；
3. 安装 packet forwarder（udp_forwarder / lora_pkt_fwd）；
4. 配置到网络服务器（TTN / ChirpStack / 自建）；
5. 启动监听。


## 8. 驱动接口

```python
class LoRa:
    def __init__(self, spi, cs, rst, busy=None):
        self.spi = spi

    def begin(self, freq=433):
        """初始化并设置频段。"""
        pass

    def set_spreading_factor(self, sf):
        pass

    def set_bandwidth(self, bw):
        pass

    def set_coding_rate(self, cr):
        pass

    def set_tx_power(self, dbm):
        pass

    def send(self, data):
        pass

    def recv(self, timeout_ms=0):
        """接收数据包。"""
        pass

    def rssi(self):
        pass


class LoRaWAN:
    def __init__(self, lora, dev_eui, app_eui, app_key):
        self.lora = lora
        self.dev_eui = dev_eui
        self.app_eui = app_eui
        self.app_key = app_key

    def begin(self):
        pass

    def join(self, timeout=30000):
        """OTAA 入网。"""
        pass

    def send(self, port, data, confirmed=False):
        pass

    def recv(self, timeout_ms=0):
        pass
```


## 9. 数据格式与单位

- 私有协议：自定义字节流；
- LoRaWAN：MAC payload；
- 常用应用层：JSON / CBOR / CayenneLPP。


## 10. 中断与 DMA

- 接收中断：数据包到达；
- CAD（Channel Activity Detection）：信道检测；
- 睡眠：< 1 µA；
- 间歇接收：LoRaWAN Class A/B/C 模式；
- 电池供电：CR2032 可工作数年（低数据率）。


## 11. 错误处理

- **无响应**：网络未入网、频率错；
- **CRC 错误**：增加 SF 或重传；
- **占空比超限**：遵守 1%（868 MHz 欧洲）法规；
- **频段违规**：使用正确区域芯片；
- **碰撞**：随机退避 + 重传。


## 12. 调试方法

1. 测 TX 功率（频谱仪）；
2. 测 RX 灵敏度（信号源 + 频谱仪）；
3. 测 RSSI（接收信号强度）；
4. 测丢包率（不同距离、SF）；
5. 测功耗（电流表）；
6. 用 LoRaWAN 网络服务器（TTN、ChirpStack）调试。


## 13. 常见问题

- **距离短**：天线性能差、阻挡、SF 太低；
- **高丢包率**：带宽冲突、占空比超限、干扰；
- **频繁碰撞**：网络容量超载、ADR 未启用；
- **入网失败**：DevEUI/AppKey 错、频段错、网关未启动；
- **法规违规**：发射功率过大、占空比超限、频段错误。


## 14. 参考资料

```text
链路预算 = TX 功率(dBm) + TX 天线增益(dBi)
          + RX 天线增益(dBi) - 路径损耗(dB)

路径损耗（自由空间）= 32.45 + 20log10(f_MHz) + 20log10(d_km)
```



- 电池供电应用：估算平均功耗（占空比 + 收发功耗）；
- 大量部署：网关信道容量限制；
- 实时性差：LoRaWAN Class A 上行至下行 1~2 秒延迟；
- 适合低数据率、远距离应用；
- 不适合高速（视频、声音）。



- Semtech SX1276/SX1262 数据手册
- LoRa Alliance LoRaWAN L1~L4 规范
- TTN（The Things Network）文档
- ChirpStack 开源 LoRaWAN 网络服务器
- RAK Wireless 应用笔记
- 各地区 ISM 法规（FCC、ETSI、中国）


## 15. 法规

不同地区 ISM 频段和占空比不同：

- **欧洲（ETSI EN 300 220）**：433 MHz 10% 占空比 / 868 MHz 1% 或 LRWPAN 频段（868.0~868.6, 869.4~869.65）；
- **美国（FCC）**：902~928 MHz，FCC Part 15；
- **中国**：433 MHz SRD、470~510 MHz LoRaWAN 推荐、2.4 GHz SRD；
- **日本（ARIB）**：920.6~928.0 MHz；
- **澳大利亚（ACMA）**：915~928 MHz。
