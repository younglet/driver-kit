---
title: LoRa
description: "DriverKit — LoRa module docs (under Communication): working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: LoRa,communication,wireless,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,LoRa,SX1278,SX1262,spread spectrum
category: Communication
field: Wireless
module: LoRa
---
# LoRa

## 1. Module Overview

LoRa (Long Range) is a low-power wide-area network (LPWAN) technology based on spread-spectrum modulation, patented by Semtech. It is commonly used in:
- Remote metering (water, electricity, gas meters)
- Agricultural monitoring (soil, weather)
- Asset tracking
- Smart city (street lighting, parking)
- Industrial IoT (equipment monitoring)
- Outdoor environmental monitoring
- Emergency communications
- Long-range control (irrigation, valves)

Key features:
- Very long range (several km to tens of km line of sight)
- Low power (battery-powered nodes can last years)
- Strong interference immunity
- Low data rate (0.3 ~ 50 kbps)
- Multiple spreading factor / bandwidth combinations
- Operates in Sub-GHz bands (433 / 868 / 915 MHz)

## 2. Working Principle and Use Cases

### 2.1 Modulation

- **CSS (Chirp Spread Spectrum)**: linear frequency-modulated chirp
- Each data symbol occupies the full bandwidth for a long duration
- Strong noise immunity
- Simple demodulation (low power)

### 2.2 Key Parameters

- **SF (Spreading Factor)**: 5 ~ 12
  - Higher SF means better sensitivity and longer range, but lower data rate
  - SF7 ~ SF12 are commonly used
- **BW (Bandwidth)**: 7.8 ~ 500 kHz
  - Wider bandwidth gives higher throughput but lower sensitivity
  - 125 kHz is a common choice
- **CR (Coding Rate)**: 4/5, 4/6, 4/7, 4/8
  - Forward Error Correction (FEC) redundancy
  - Higher values are more robust but reduce throughput
- **Frequency**: 433 / 868 / 915 MHz (region-dependent)
- **TX Power**: +5 ~ +20 dBm
- **Sensitivity**: -110 ~ -148 dBm
- **Time on Air**: depends on SF, BW, packet length

### 2.3 Link Budget

```text
Link budget (dB) = TX power + TX antenna gain
                 + RX antenna gain - free-space path loss
                 - miscellaneous losses (cable, obstruction, rain fade)
```

### 2.4 Protocol Stack

- LoRa only defines the physical layer (PHY)
- Protocol layers above PHY:
  - **LoRaWAN** (LoRa Alliance): MAC + application
  - **Proprietary protocols**: custom stacks built on top of the LoRa chip
- LoRaWAN architecture:
  - **End Device**: sensor node
  - **Gateway**: relay (8 channels)
  - **Network Server**: routing, deduplication, security
  - **Application Server**: data processing

## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 LoRa Chips

| Part Number | Frequency | SF | Features | Chip Price |
|---|---|---|---|---:|
| Semtech SX1276 | 137 ~ 1020 MHz | 6 ~ 12 | Classic | $7~18 |
| Semtech SX1278 | 137 ~ 525 MHz | 6 ~ 12 | Classic | $7~18 |
| Semtech SX1262 | 150 ~ 960 MHz | 5 ~ 12 | New gen | $7~18 |
| Semtech SX1268 | 150 ~ 960 MHz | 5 ~ 12 | China band | $7~18 |
| Semtech SX1280 | 2.4 GHz | 5 ~ 12 | 2.4G LoRa | $10~22 |
| Semtech SX1302 | Multi-channel | 8 / 16 | Gateway | $40~90 |
| Semtech SX1303 | Multi-channel | 8 / 16 | New gateway | $50~125 |
| HopeRF RFM95 | 868 / 915 MHz | 6 ~ 12 | Compatible | $7~18 |
| HopeRF RFM96 | 433 MHz | 6 ~ 12 | Compatible | $7~18 |
| HopeRF RF6500 | Multi-band | 6 ~ 12 | Compatible | $7~18 |

### 3.2 LoRa Modules

| Part Number | Type | Frequency | Power | Interface | Price |
|---|---|---|---|---|---:|
| RA-01 / RA-02 | Module | 433 / 868 | +17 dBm | SPI | $5~12 |
| RA-08 | Module | 470 ~ 510 | +20 dBm | SPI / UART | $7~18 |
| E22-400T22S | Module | 433 | +22 dBm | UART | $7~18 |
| E22-900T22S | Module | 868 / 915 | +22 dBm | UART | $7~18 |
| E32-433T20S | Module | 433 | +20 dBm | UART | $5~15 |
| E32-868T20S | Module | 868 | +20 dBm | UART | $5~15 |
| E220-900T22S | Module | 868 / 915 | +22 dBm | UART | $7~18 |
| E22-400M30S | Module | 433 | +30 dBm | UART | $15~35 |
| ATK-LORA-01 | Module | 433 | +20 dBm | UART | $7~15 |
| ATK-LORA-02 | Module | 868 | +20 dBm | UART | $7~15 |
| ZLG ZLAN6804 | Serial LoRa | 433 | +20 dBm | UART | $15~40 |
| Lora1268 | Module | 470 ~ 510 | +20 dBm | SPI | $7~18 |

### 3.3 LoRa Gateways

| Type | Features | Price |
|---|---|---|
| Single-channel gateway | Entry, DIY | $50~150 |
| 8-channel gateway (SX1302) | Standard LoRaWAN | $250~1000 |
| Industrial 16-channel gateway | RAK / MultiTech | $750~2500 |
| Outdoor 8-channel gateway | Weatherproof | $750~2500 |
| Indoor gateway | Home use | $150~500 |
| Full-duplex gateway | Simultaneous TX/RX | $1500~5000 |

### 3.4 LoRa Development Boards

- TTGO LoRa series (ESP32 + LoRa): $25~75
- Heltec LoRa series (ESP32 + OLED + LoRa): $40~100
- RAK Wireless WisBlock (modular): $50~200
- Pycom LoPy (ESP32 + LoRa + Sigfox): $100~250
- Murata ABZ LoRa module: $15~40

## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Frequency | 433 / 470 ~ 510 / 868 / 915 MHz |
| Range | several km (urban) / 10+ km (line of sight) |
| Data Rate | 0.3 ~ 50 kbps |
| Sensitivity | -110 ~ -148 dBm |
| TX Power | +5 ~ +22 dBm |
| Modulation | CSS (LoRa) / FSK / OOK |
| Spreading Factor | SF5 ~ SF12 |
| Bandwidth | 7.8 ~ 500 kHz |
| Encryption | AES-128 (LoRaWAN) |
| Supply Voltage | 1.8 V ~ 3.6 V |
| Power | RX ~10 mA, TX ~100 mA @ +17 dBm |

**Selection Guide**:
- 433 MHz: Mainland China ISM
- 868 MHz: Mainstream in Europe
- 915 MHz: US / Australia
- 470 ~ 510 MHz: China LoRaWAN recommended band
- End devices: SX1262 / SX1278
- Gateways: SX1302 / SX1303 + Raspberry Pi / industrial host
- Off-the-shelf modules: RA-01, ATK-LORA, E22 series

## 5. Hardware Connection and Electrical Notes

- Power supply: 3.3 V (typical), decoupling capacitors
- Antenna:
  - SMA / IPEX external antenna
  - Spring antenna (PCB mounted)
  - 433 MHz: ~17 cm quarter-wave
  - 868 / 915 MHz: ~8 ~ 9 cm
- Impedance matching: 50 Ω
- DC-DC ripple: affects RF performance
- Shielding: metal enclosure (in coordination with antenna)
- ESD: TVS protection
- Interference: avoid same-band devices
- Regulations: respect local wireless rules (duty cycle, TX power limits)

## 6. Communication Method or Control Signal

### 6.1 Proprietary Protocol

- Transparent transport (UART over LoRa)
- Simple point-to-point
- User-defined protocol

### 6.2 LoRaWAN Protocol

- Class A: lowest power
- Class B: synchronized windows
- Class C: nearly-always receive
- Activation:
  - **OTAA** (Over-The-Air Activation): dynamic keys
  - **ABP** (Activation By Personalization): static keys
- ADR (Adaptive Data Rate)
- Device classes:
  - Class A (bidirectional, lowest power)
  - Class B (synchronized reception)
  - Class C (continuous reception)

## 7. Initialization Flow

### 7.1 End Device (LoRaWAN)

1. Configure SPI
2. Reset the LoRa chip
3. Set frequency band (region)
4. Set SF, BW, CR
5. Set DevEUI, AppEUI, AppKey
6. Join the network (OTAA Join)
7. Uplink / downlink communication

### 7.2 Gateway

1. Install SX1302 / SX1303 module
2. Configure backhaul (Ethernet / 4G)
3. Install packet forwarder (udp_forwarder / lora_pkt_fwd)
4. Point at a network server (TTN / ChirpStack / self-hosted)
5. Start listening

## 8. Common Driver Interfaces

```python
class LoRa:
    def __init__(self, spi, cs, rst, busy=None):
        self.spi = spi

    def begin(self, freq=433):
        """Initialize and set the frequency band."""
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
        """Receive a packet."""
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
        """OTAA join."""
        pass

    def send(self, port, data, confirmed=False):
        pass

    def recv(self, timeout_ms=0):
        pass
```

## 9. Data Format, Units, and Timing

- Proprietary: custom byte stream
- LoRaWAN: MAC payload
- Common application layers: JSON / CBOR / CayenneLPP

## 10. Interrupts, DMA, FIFO, and Buffers

- RX interrupt: packet arrived
- CAD (Channel Activity Detection)
- Sleep: < 1 µA
- Intermittent reception: LoRaWAN Class A / B / C
- Battery powered: a CR2032 can power the node for years at low duty cycle

## 11. Error Handling and Exception Recovery

- **No response**: not joined, wrong frequency
- **CRC error**: increase SF or retransmit
- **Duty cycle exceeded**: respect the 1 % rule (868 MHz Europe)
- **Frequency violation**: use a chip matching your region
- **Collisions**: random backoff + retransmission

## 12. Debugging Methods

1. Measure TX power (spectrum analyzer)
2. Measure RX sensitivity (signal generator + spectrum analyzer)
3. Measure RSSI
4. Measure packet loss at varying distances and SF
5. Measure current consumption
6. Use a LoRaWAN network server (TTN, ChirpStack) for debugging

## 13. Frequently Asked Questions

- **Short range**: poor antenna, obstructions, SF too low
- **High packet loss**: channel collision, duty cycle breach, interference
- **Frequent collisions**: network capacity exceeded, ADR not enabled
- **Join failure**: wrong DevEUI / AppKey, wrong band, gateway down
- **Regulation violation**: TX power too high, duty cycle exceeded, wrong band

## 14. References

```text
Link budget = TX power (dBm) + TX antenna gain (dBi)
            + RX antenna gain (dBi) - path loss (dB)

Path loss (free space) = 32.45 + 20·log10(f_MHz) + 20·log10(d_km)
```

- Battery-powered applications: estimate the average current (duty cycle + TX/RX current)
- Large deployments: gateways have a finite channel capacity
- Real-time: LoRaWAN Class A has 1 ~ 2 s latency between uplink and downlink
- Best suited for low-rate, long-range applications
- Not suitable for high-throughput (video, audio)

- Semtech SX1276 / SX1262 datasheets
- LoRa Alliance LoRaWAN L1 ~ L4 specifications
- TTN (The Things Network) documentation
- ChirpStack open-source LoRaWAN network server
- RAK Wireless application notes
- Regional ISM regulations (FCC, ETSI, China)

## 15. Regulations

ISM bands and duty cycles differ by region:

- **Europe (ETSI EN 300 220)**: 433 MHz 10 % duty cycle / 868 MHz 1 % or LRWPAN bands (868.0 ~ 868.6, 869.4 ~ 869.65)
- **US (FCC)**: 902 ~ 928 MHz, FCC Part 15
- **China**: 433 MHz SRD, 470 ~ 510 MHz LoRaWAN recommended, 2.4 GHz SRD
- **Japan (ARIB)**: 920.6 ~ 928.0 MHz
- **Australia (ACMA)**: 915 ~ 928 MHz
