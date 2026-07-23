---
title: WiFi
description: "DriverKit — Wi-Fi module docs (under Communication): working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: WiFi,communication,wireless,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging
category: Communication
field: Wireless
module: WiFi
---
# Wi-Fi

## 1. Module Overview

Wi-Fi is the IEEE 802.11 family of wireless LAN standards, operating in the 2.4 / 5 / 6 GHz ISM bands. It is commonly found in:
- IoT devices (smart home, sensors)
- Industrial gateways
- Video streaming (security cameras, drones)
- Smartphones, tablets
- Laptops, TVs
- Smart speakers
- POS terminals
- Wearables

Key features:
- High speed (hundreds of Mbps to several Gbps)
- Wide coverage (home, office, outdoor)
- Infrastructure mode (STA + AP)
- Strong security (WPA2 / WPA3)
- Higher power than BLE

## 2. Working Principle and Use Cases

### 2.1 IEEE 802.11 Standards

- **802.11b**: 1999, 2.4 GHz, up to 11 Mbps
- **802.11a**: 1999, 5 GHz, up to 54 Mbps
- **802.11g**: 2003, 2.4 GHz, up to 54 Mbps
- **802.11n** (Wi-Fi 4): 2009, 2.4 / 5 GHz, MIMO, up to 600 Mbps
- **802.11ac** (Wi-Fi 5): 2014, 5 GHz, MU-MIMO, up to 6.93 Gbps
- **802.11ax** (Wi-Fi 6): 2019, 2.4 / 5 GHz, OFDMA, up to 9.6 Gbps
- **802.11ax** (Wi-Fi 6E): 2020+, 6 GHz
- **802.11be** (Wi-Fi 7): 2024+, 320 MHz, MLO, up to 30 Gbps

### 2.2 Topology

- **STA (Station)**: client connecting to an AP
- **AP (Access Point)**: base station
- **Ad-Hoc**: peer-to-peer
- **Wi-Fi Direct**: P2P direct connection
- **Mesh**: multi-hop (EasyMesh, etc.)
- **WDS**: Wireless Distribution System (bridging)

### 2.3 Encryption

- **Open**: no encryption (insecure)
- **WEP**: legacy (broken, deprecated)
- **WPA**: 2003, TKIP (obsolete)
- **WPA2**: 2004, CCMP/AES-128 (mainstream)
  - WPA2-Personal (PSK): home use
  - WPA2-Enterprise (802.1X EAP): enterprise
- **WPA3**: 2018, AES-128/256 (more secure)
  - SAE (Simultaneous Authentication of Equals)
  - Enhanced Open (OWE)
  - Enterprise 192-bit

### 2.4 Modulation

- DSSS / CCK (802.11b)
- OFDM (802.11a/g/n/ac)
- OFDMA (802.11ax)
- 1024-QAM (802.11ax)
- 4096-QAM (802.11be)

## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 Wi-Fi Chips / Modules

| Part Number | Standard | Interface | Features | Chip Price | Module Price |
|---|---|---|---|---:|---:|
| Espressif ESP8266 | 802.11 b/g/n | SPI/UART | Classic IoT | $3~8 | $5~12 |
| ESP32 | 802.11 b/g/n + BLE | - | Dual-core | $4~13 | $7~18 |
| ESP32-S2 | 802.11 b/g/n + USB | - | Single-core | $5~12 | $10~22 |
| ESP32-S3 | 802.11 b/g/n + BLE 5.0 + AI | - | Dual-core + AI | $5~15 | $13~28 |
| ESP32-C3 | 802.11 b/g/n + BLE 5.0 | - | RISC-V | $3~8 | $5~12 |
| ESP32-C6 | 802.11 ax + BLE 5 + 802.15.4 | - | RISC-V | $5~12 | $10~22 |
| ESP32-H2 | 802.15.4 + BLE 5 | - | RISC-V | $4~10 | $7~18 |
| Realtek RTL8710 | 802.11 b/g/n | SPI/UART | Low cost | $2~5 | $4~10 |
| Realtek RTL8720 | 802.11 b/g/n + BLE | SPI/UART | Upgrade | $3~8 | $5~12 |
| Realtek RTL8189 | 802.11 b/g/n | SDIO/USB | PC/TV | $2~5 | $3~8 |
| Realtek RTL8821 | 802.11 ac + BT | USB/SDIO | PC | $5~12 | $10~22 |
| Realtek RTL8852 | Wi-Fi 6 + BT 5.3 | USB/SDIO | PC | $7~18 | $15~35 |
| TI CC3200 | 802.11 b/g/n | - | ARM Cortex-M4 | $7~18 | $15~35 |
| TI CC3220 | 802.11 b/g/n | - | Upgrade | $10~25 | $20~50 |
| TI CC3235 | 802.11 b/g/n | - | Dual-band | $12~30 | $25~60 |
| TI CC3551 | Wi-Fi 6 | - | Latest | $15~35 | $30~75 |
| Microchip SAM W25 | 802.11 b/g/n | - | ARM | $7~18 | $15~35 |
| Microchip SAM W35 | 802.11 b/g/n | - | Upgrade | $10~22 | $20~45 |
| Nordic nRF7002 | Wi-Fi 6 (station) | SPI | Companion MCU | $7~18 | $15~35 |
| Nordic nRF52840 + nRF7002 | BLE + Wi-Fi | - | Combo | $20~50 | - |
| Broadcom BCM4343X | 802.11 b/g/n | SDIO | Embedded | $5~12 | $10~22 |
| Broadcom BCM43455 | 802.11 ac | SDIO | Embedded | $7~18 | $15~35 |
| Broadcom AP6256 | 802.11 ac + BT | SDIO | Module | - | $15~35 |
| MediaTek MT7697 | 802.11 b/g/n + BLE | - | IoT | $5~12 | $10~22 |
| MediaTek MT7699 | 802.11 b/g/n | - | Upgrade | $5~15 | $13~28 |
| MediaTek MT7687 | 802.11 b/g/n | - | Cortex-M4 | $5~12 | $10~22 |
| MediaTek MT7921 | Wi-Fi 6 + BT 5.2 | PCIE | PC | $7~18 | $15~35 |
| Qualcomm QCA4004 | 802.11 b/g/n | - | IoT | $5~12 | $10~22 |
| Qualcomm QCA4020 | 802.11 b/g/n + BLE + Zigbee | - | Tri-mode | $7~18 | $15~35 |
| Qualcomm QCA9377 | Wi-Fi 5 + BT | USB/SDIO | PC | $5~12 | $10~22 |

### 3.2 USB Wi-Fi Adapters

- Entry-level: based on RTL8188 / RTL8811, $8~20
- Mid-range: RTL8812 (5 GHz), $20~40
- High-end: RTL8852 (Wi-Fi 6), $40~100

## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Standard | b / g / n / ac / ax / be |
| Frequency Bands | 2.4 / 5 / 6 GHz |
| Bandwidth | 20 / 40 / 80 / 160 / 320 MHz |
| MIMO | 1x1 ~ 8x8 |
| Modulation | BPSK ~ 4096-QAM |
| TX Power | dBm (typically 15 ~ 20) |
| RX Sensitivity | dBm (typically -90 ~ -100) |
| Encryption | WPA2 / WPA3 |
| Throughput | Mbps ~ Gbps |
| Power | mA range |

**Selection Guide**:
- Entry IoT: ESP8266, ESP32-C3
- Modern IoT: ESP32-S3, ESP32-C6
- High-throughput: Wi-Fi 5 / 6 modules (ESP32-C5, BCM43455)
- Dual-band: ESP32-C6, CC3235, AP6256
- Low cost: RTL8710, TLSR8258
- Industrial: CC3200 / CC3220 / CC3235, QCA4020

## 5. Hardware Connection and Electrical Notes

- Power supply: 3.3 V (typical), add decoupling capacitors (100 nF + 10 µF)
- Antenna:
  - PCB antenna (simple, average performance)
  - Ceramic antenna (small footprint)
  - External antenna (IPEX / U.FL / MHF)
  - Antenna matching to 50 Ω
- RF traces: 50 Ω controlled impedance
- Shielding: metal enclosure affects antenna
- DC-DC ripple: degrades RF performance
- Crystal: 26 MHz / 40 MHz (varies by chip)
- ESD: TVS protection
- Keep away from interference: 2.4 GHz is congested

## 6. Communication Method or Control Signal

- TCP / IP (sockets)
- UDP
- HTTP / HTTPS (REST APIs)
- WebSocket
- MQTT (IoT messaging protocol)
- mDNS (LAN service discovery)
- SmartConfig / SoftAP provisioning
- OTA (over-the-air firmware update)

## 7. Initialization Flow

1. Configure GPIO
2. Initialize the Wi-Fi stack
3. Set mode (STA / AP / STA+AP)
4. Configure authentication and encryption (WPA2 / WPA3)
5. Configure static IP or DHCP
6. Connect to AP or start AP
7. Register event callbacks (connect, disconnect, IP assigned)
8. Validate (ping, TCP)

### 10.1 SmartConfig

- Embeds SSID / password in special Wi-Fi packets
- Device operates in promiscuous (sniffer) mode
- Examples: WeChat mini-program, TI SmartConfig

### 10.2 SoftAP Provisioning

- Device starts its own AP (e.g. ESP-XXXXXX)
- Phone connects to that AP and configures via HTTP / UDP
- Device joins target Wi-Fi and stops the AP

### 10.3 Bluetooth-assisted Provisioning

- BLE channel carries Wi-Fi credentials (e.g. ESP32 + BluFi)

### 10.4 Manual Input

- Screen + keypad for SSID / password
- Button toggles AP mode

## 8. Common Driver Interfaces

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
        """Return the connection status."""
        pass

    def local_ip(self):
        """Return the IP address."""
        pass

    def scan(self):
        """Scan nearby APs."""
        pass


class WiFiAP:
    def __init__(self):
        pass

    def begin(self, ssid, password):
        """Start AP mode."""
        pass


class HTTPClient:
    def __init__(self):
        pass

    def begin(self, url):
        pass

    def get(self):
        """Send a GET request."""
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

## 9. Data Format, Units, and Timing

- TCP: byte stream
- UDP: datagrams
- HTTP: text protocol (headers + body)
- MQTT: binary (MQTT 3.1.1 / 5.0)
- WebSocket: bidirectional
- Application-layer formats: JSON / Protobuf / CBOR, etc.

## 10. Error Handling and Exception Recovery

- Always use WPA2 / WPA3
- Avoid WEP (insecure)
- Use strong passwords (12+ characters)
- Do not run Open networks
- Update firmware regularly
- Isolate IoT devices on a separate network

## 11. Low Power

- **Modem Sleep**: turn off RF when idle (typical)
- **Light Sleep**: CPU paused, RAM retained
- **Deep Sleep**: fully off except RTC
  - Wake: timer / GPIO / ULP coprocessor
- **Power Save**: wake periodically to receive Beacon
- Typical current:
  - Active: 100 ~ 200 mA
  - RX: 80 mA
  - TX (+18 dBm): 200 mA
  - Modem Sleep: 3 mA
  - Deep Sleep: 10 µA

## 12. Debugging Methods

1. Scan APs (SSID list)
2. Measure RSSI (signal strength)
3. Measure throughput (iperf)
4. Measure current with an ammeter
5. Capture packets with Wireshark (monitor mode)
6. Validate connectivity with ping / curl

## 13. Frequently Asked Questions

- **Cannot connect**: wrong password, encryption mismatch, wrong channel
- **Frequent disconnects**: weak AP signal, interference, auth failures
- **Low throughput**: long distance, congested channel, interference
- **Cannot provision**: promiscuous mode not supported, encryption mismatch
- **High power**: Modem Sleep not enabled
- **OTA failure**: interrupted download, corrupted flash
- **IP conflict**: DHCP collision, duplicate static IP

## 14. References

- Regional regulations: allowed channels differ by country (FCC / ETSI / China)
- 2.4 GHz only channels 1 ~ 13 (some countries 11 / 14)
- 5 GHz has fewer available channels in China
- 6 GHz available for Wi-Fi 6E / 7 only in certain countries

- IEEE 802.11 standards
- Wi-Fi Alliance specifications (WPA3, etc.)
- Espressif ESP-IDF Wi-Fi documentation
- TI CC3200 / CC3220 documentation
- ESP8266 Non-OS SDK / RTOS SDK
- Individual Wi-Fi chip datasheets
