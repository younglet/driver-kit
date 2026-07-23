---
title: Bluetooth BLE
description: "DriverKit — Bluetooth BLE module docs (under Communication): working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: Bluetooth BLE,communication,wireless,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging
category: Communication
field: Wireless
module: Bluetooth BLE
---
# Bluetooth BLE

## 1. Module Overview

Bluetooth is a short-range wireless communication protocol operating in the 2.4 GHz ISM band. BLE (Bluetooth Low Energy), introduced in 4.0, is the low-power version commonly used in:
- Wearable devices (fitness bands, smart watches)
- Smart home (lights, locks, sensors)
- Medical devices (blood pressure monitors, glucose meters)
- Beacons (iBeacon, Eddystone)
- Indoor positioning
- Mobile phone peripherals
- IoT devices

Key features:
- Low power (a few mA down to µA)
- Short range (< 100 m)
- 2.4 GHz ISM band (2400 ~ 2483.5 MHz)
- Master / slave + broadcasting modes
- Throughput: 1 ~ 2 Mbps (BLE 5.0)

## 2. Working Principle and Use Cases

### 2.1 Frequency Band

- 2.4 GHz ISM
- BLE 4.0 / 4.1 / 4.2: 40 channels (0 ~ 39), among which 37 / 38 / 39 are advertising channels
- BLE 5.0+: adds LE 2M PHY and LE Coded PHY (long range)
- Adaptive frequency hopping
- GFSK modulation

### 2.2 Roles

- **Broadcaster**: advertising only (iBeacon)
- **Observer**: scanning
- **Peripheral**: slave (accepts connections)
- **Central**: master (initiates connections)
- A device plays one role at a given time.

### 2.3 Protocol Stack

- **PHY**: 2M / 1M / Coded
- **LL (Link Layer)**: advertising, scanning, connection management
- **HCI**: Host-Controller Interface
- **L2CAP**: Logical Link Control
- **ATT / GATT**: Attribute Protocol / Generic Attribute Profile
- **GAP**: Generic Access Profile (roles, pairing, advertising)
- **SMP**: Security Manager (pairing, bonding, encryption)
- **Application Profile**: Service / Characteristic

### 2.4 GATT Data Model

- **Service**: a collection of related data (e.g. Battery Service, Environmental Sensing Service)
- **Characteristic**: a data point containing value + descriptors
- **UUID**: 128-bit unique identifier (some are 16-bit standard)
- **Descriptor**: metadata (e.g. CCCD for notify/indicate)
- Clients read and write data on the server.

### 2.5 Advertising

- **ADV_IND**: general connectable advertising
- **ADV_SCAN**: scannable advertising
- **ADV_NONCONN**: non-connectable advertising (iBeacon)
- **ADV_DIRECT**: directed advertising
- Advertising payload: 31 bytes (4.0 / 4.1 / 4.2) / 254 bytes (5.0 extended advertising)
- Scan response: scan request/response to fetch more data

## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 BLE Chips / Modules

| Part Number | Version | Interface | Features | Chip Price | Module Price |
|---|---|---|---|---:|---:|
| Nordic nRF51822 | BLE 4.0 | - | ARM Cortex-M0 | $5~12 | $10~25 |
| Nordic nRF52832 | BLE 5.0 | - | ARM Cortex-M4 | $7~18 | $15~35 |
| Nordic nRF52840 | BLE 5.0 | USB | ARM Cortex-M4 | $12~30 | $25~60 |
| Nordic nRF5340 | BLE 5.2 | - | Dual-core | $15~40 | $40~90 |
| Nordic nRF52811 | BLE 5.1 | - | Cortex-M4 | $7~18 | $15~35 |
| TI CC2540 | BLE 4.0 | - | 8051 | $4~10 | $7~18 |
| TI CC2541 | BLE 4.0 | - | 8051 | $4~10 | $7~18 |
| TI CC2640 | BLE 5.0 | - | Cortex-M3 | $7~18 | $15~35 |
| TI CC2642 | BLE 5.1 | - | Cortex-M4F | $10~22 | $20~45 |
| TI CC2652 | BLE 5.1 | - | Cortex-M4F | $13~25 | $25~50 |
| Dialog DA14580 | BLE 4.2 | - | Cortex-M0 | $3~8 | $5~12 |
| Dialog DA14585 | BLE 5.0 | - | Cortex-M0 | $5~12 | $10~22 |
| Dialog DA14681 | BLE 5.0 | - | Cortex-M0 | $7~18 | $15~35 |
| Telink TLSR8258 | BLE 5.0 | - | RISC-V | $3~8 | $5~12 |
| Broadcom BCM20734 | BLE 4.0 | - | ARM | $5~12 | $10~22 |
| Espressif ESP32 | BLE 4.2 | - | Integrated | $0 (built-in) | - |
| ESP32-S3 | BLE 5.0 | - | Integrated | $0 (built-in) | - |
| ESP32-C3 | BLE 5.0 | - | RISC-V | $0 (built-in) | - |
| ESP32-H2 | BLE 5.0 + 802.15.4 | - | RISC-V | $0 (built-in) | - |
| Actions ATS2831 | BLE 5.0 | - | - | $5~12 | $10~22 |
| ZhongKeLanXun AB5654 | BLE 5.2 | - | - | $4~10 | $7~18 |
| Realtek RTL8762 | BLE 5.0 | - | Cortex-M0 | $3~8 | $5~12 |
| Bollen BL702 | BLE 5.0 | - | RISC-V | $2~5 | $4~10 |

### 3.2 BLE USB Adapters

| Part Number | Features | Reference Price |
|---|---|---|
| nRF52840 USB Dongle | Development | $25~75 |
| CC2540 USB Dongle | Classic | $10~25 |
| BLED112 | Bluegiga | $50~100 |

## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Protocol Version | 4.0 / 4.2 / 5.0 / 5.1 / 5.2 / 5.3 |
| TX Power | -20 ~ +10 dBm |
| RX Sensitivity | -95 ~ -100 dBm |
| Range | 10 ~ 100 m (line of sight) |
| Throughput | 1 Mbps (LE 1M) / 2 Mbps (LE 2M) / 125 kbps (LE Coded) |
| Power Consumption | mA level (TX) / µA level (sleep) |
| Channels | 40 (4.0+) |
| Encryption | AES-128 |

**Selection Guide**:
- Entry-level / low-volume: CC2540, DA14580
- Modern development: nRF52832, nRF52840
- Integrated solution: ESP32, ESP32-S3, ESP32-C3
- Long range: nRF52840 with LE Coded PHY
- Low-cost Chinese ICs: TLSR8258, RTL8762
- High-end BLE 5.3: nRF5340

## 5. Hardware Connection and Electrical Notes

- Power supply: 1.7 V ~ 3.6 V (typical), add decoupling capacitors (100 nF)
- Antenna: PCB antenna (simple) / IPEX connector for external antenna (better)
- Shielding: metal enclosure (acting as antenna extension)
- Matching network: 50 Ω antenna match
- DC-DC ripple: affects RF performance
- Crystals: 32 kHz (sleep timer) + 32 MHz (main clock)
- ESD: TVS protection
- 2.4 GHz interference: keep away from WiFi and other Bluetooth devices

## 6. Communication Method or Control Signal

- Advertising (one-way, connectionless)
- Scanning (receiving advertisements)
- Initiating connections
- Accepting connections
- Connection parameters: interval, latency, timeout
- Notification and Indication
- MTU (Maximum Transmission Unit): default 23 bytes, negotiable up to 247+

## 7. Initialization Flow

1. Configure GPIO
2. Configure clocks (32 kHz + 32 MHz)
3. Initialize BLE protocol stack
4. Set GAP role (Peripheral / Central / Broadcaster)
5. Set advertising data (ADV packet)
6. Register GATT services and characteristics
7. Register application callbacks (connect, disconnect, read, write)
8. Start advertising / scanning

## 8. Common Driver Interfaces

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
        """properties: READ, WRITE, NOTIFY."""
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
        """Scan and return nearby devices."""
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
        """Subscribe to notifications / indications."""
        pass
```

## 9. Data Format, Units, and Timing

- GATT: Characteristic data (bytes)
- Notification / Indication: server-initiated push
- Read / Write: client-initiated access
- UUID: 128-bit identifier

## 10. Interrupts, DMA, FIFO, and Buffers

- Interrupts: connection events, scan complete, GATT events
- Sleep modes: System OFF (< 1 µA) / System ON (RAM retained)
- Wake-up: GPIO / timer / observer for advertisements
- Current: TX ~5 ~ 10 mA, RX ~5 mA, sleep < 1 µA

## 11. Debugging Methods

1. Scan with nRF Connect / LightBlue
2. Inspect advertising data (UUID, Major, Minor)
3. Verify connection parameters (interval, latency)
4. Verify MTU negotiation
5. Verify pairing and bonding
6. Measure current consumption with an ammeter

## 12. Frequently Asked Questions

- **Cannot advertise**: stack not started, advertising data malformed
- **Cannot connect**: advertising interval too short/long, filtering
- **Frequent disconnects**: inappropriate connection parameters, weak signal
- **Pairing failure**: authentication modes mismatched
- **Read/write failure**: MTU negotiation error, wrong characteristic properties
- **High power consumption**: bad connection parameters, sleep not used
- **Short range**: poor antenna match, low TX power, interference

### 12.1 iBeacon (Apple)

- Advertising format: `02 01 06 1A FF 4C 00 02 15 [UUID 16B] [Major 2B] [Minor 2B] [TX 1B]`
- UUID identifies the organization
- Major / Minor: hierarchical positioning
- TX Power: RSSI at 1 m for distance estimation

### 12.2 Eddystone (Google)

- Frame types: UID (identifier), URL (web link), TLM (telemetry)
- Scanned via Chrome apps

- Bluetooth SIG standard (BLE 5.0)
- Mesh networking (multi-hop)
- Node types: Friend, Low Power, Relay, Proxy
- Applications: smart lighting, smart buildings
- Supported by nRF52 / ESP32 series

## 13. Profile Configuration

- Standard Profiles:
  - Battery Service (BAS)
  - Heart Rate Service (HRS)
  - Environmental Sensing Service (ESS)
  - Device Information Service (DIS)
  - HID (keyboard / mouse)
  - Generic audio (GATT-based)
- Custom Profiles: private Service / Characteristic

## 14. References

- BLE 5.0 LE 2M PHY for higher throughput
- LE Coded PHY for long range (125 kbps, ~4× range)
- Apple ecosystem requires MFi certification (iOS 13+ partly exempt)
- Advertising payload size limit (31 bytes on 4.0 / 4.1 / 4.2, up to 254 bytes on 5.0 extended)

- Bluetooth Core Specification V5.3
- Bluetooth GATT Specification
- Assigned Numbers (UUID list)
- Nordic nRF52 SDK documentation
- Espressif ESP-IDF BLE documentation
- nRF Connect debugging tool

### Pairing & Bonding

- **Just Works**: no encryption / authentication (insecure, common in IoT)
- **Passkey**: 6-digit PIN entered on both sides
- **OOB** (Out of Band): key exchange via NFC or other side-channel
- **LE Secure Connections**: ECDH P-256 based encryption (BLE 4.2+)
- Bonding: store keys and encrypt automatically on subsequent connections
