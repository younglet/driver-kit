---
title: USB
description: "DriverKit — USB (under Communication): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: USB,communication,bus,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,USB,USB CDC,USB HID,Type-C
category: Communication
field: Bus
module: USB
---
# USB


## 1. Module Overview

USB (Universal Serial Bus) is a wired serial communication interface introduced in 1995 by Intel and others. It is now ubiquitous across nearly all devices.

Applications:
- Charging (USB PD);
- Data transfer;
- Debugging (USB-CDC);
- Mouse and keyboard (HID);
- USB flash drive / portable hard drive (MSC);
- Audio (USB Audio);
- Video (UVC);
- Device firmware upgrade (DFU).


## 2. Working Principle and Use Cases

### 2.1 Topology

- Host-Device architecture;
- Host (PC, mobile phone OTG);
- Device (mouse, keyboard, USB drive);
- Hub: port expander;
- Up to 127 devices (one tier of Hubs);
- 7 tiers of cascaded Hubs.

### 2.2 Physical Layer

- **Differential signals**: D+ / D-;
- Speed grades:
  - Low Speed (LS): 1.5 Mbps;
  - Full Speed (FS): 12 Mbps;
  - High Speed (HS): 480 Mbps;
  - Super Speed (SS): 5 Gbps (USB 3.0);
  - Super Speed+ (SS+): 10 Gbps (USB 3.1);
  - USB4: 20~40 Gbps.
- **NRZI encoding** (FS / HS) + bit stuffing;
- **8b/10b encoding** (SS).

### 2.3 Protocol Layer

- **Packet**: token, data, handshake, special;
- **Transaction**: control / isochronous / interrupt / bulk;
- **Transfer**: multiple transactions form a complete transfer;
- **Endpoint**: data channel on a device;
  - EP0: control endpoint (bidirectional);
  - EP_IN / EP_OUT: data endpoints.


## 3. Common Part Numbers and Prices

> Prices are for reference only.

### 3.1 USB Controllers

| Part Number | Type | Speed | Features | Reference Price |
|---|---|---|---|---:|
| CH376 | SPI / parallel | FS | File management | $3~6 |
| CH376S | SPI / parallel | FS | File management | $3~6 |
| CH375 | Parallel | FS | File management | $2~5 |
| MAX3421 | SPI | FS | Maxim | $7~18 |
| TUSB2046 | 4-port Hub | FS | TI | $5~12 |
| TUSB2070 | 7-port Hub | FS | TI | $7~15 |
| TUSB4041 | 4-port Hub | HS | TI | $7~18 |
| TUSB8041 | 4-port Hub | SS | TI | $12~30 |
| USB3300 | ULPI | HS | SMSC / Microchip | $7~18 |
| USB5744 | 4-port Hub | HS / SS | Microchip | $12~30 |
| RP2040 built-in | - | FS / LS | Raspberry Pi | $3~8 |
| STM32 built-in USB FS | - | FS | STM32 | $0 (built-in) |
| STM32 built-in USB HS | - | HS | Some STM32 | $0 (built-in) |
| ESP32-S2 built-in | - | FS | Espressif | $4~10 |
| ESP32-S3 built-in | - | HS | Espressif | $5~12 |

### 3.2 USB Type-C PD Controllers

| Part Number | Role | Features | Reference Price |
|---|---|---|---:|
| FUSB302 | PD DRP | Programmable PD | $2~5 |
| CH224K | PD DRP | Sniffer / sink | $1~3 |
| HUSB238 | PD Sink | Sniffer / sink | $1~3 |
| FUSB251 | PD Source | Power supply | $3~8 |
| RT1715 | PD DRP | Richtek | $3~8 |
| IP2721 | PD Sink | Injoinic | $1~3 |

### 3.3 USB-UART Bridge Chips (see UART doc for details)

CH340, CP2102, FT232, PL2303, etc.

### 3.4 USB Tools

| Device | Features | Reference Price |
|---|---|---|
| USB protocol analyzer | Packet capture / analysis | $500~2500 |
| USB current meter | Charging test | $5~15 |
| USB tester | Voltage / current | $10~25 |
| USB isolator | Noise-resistant | $15~50 |
| Industrial USB Hub | Multi-port | $25~150 |
| USB-C breakout board | Test use | $3~10 |


## 4. Key Parameters and Selection

| Parameter | Description |
|---|---|
| Speed | LS / FS / HS / SS |
| Role | Host / Device / OTG / DRP |
| Class | HID / CDC / MSC / DFU / Audio / Vendor |
| Endpoint count | 1~15 (besides EP0) |
| Operating voltage | 5V (default) / 12V / 20V (PD) |
| Current | 500 mA (USB 2.0) / 900 mA (USB 3.0) / 5A (PD) |
| Connector | USB-A / USB-B / Mini / Micro / Type-C |

**Selection guide**:
- Serial debugging: CH340, CP2102;
- Data acquisition: STM32 + USB FS;
- USB drive read/write: CH376, CH375;
- High-speed transfer: USB HS (e.g. STM32F4);
- Type-C PD: FUSB302, CH224K, HUSB238;
- USB Host: MAX3421 (SPI) + MCU.


## 5. Hardware Connection

### 5.1 Physical Connectors

- **USB-A**: classic (host);
- **USB-B**: square (device);
- **Mini USB**: early phones;
- **Micro USB**: phones / charging;
- **Type-C**: modern devices (reversible).

### 5.2 Electrical

- VBUS: 5V (USB 2.0) / 5V / 12V / 20V (PD);
- D+ / D-: differential signals, 90Ω differential impedance;
- Shield: metal shell;
- ESD: ±15 kV (built into some chips).

### 5.3 Routing

- Differential pair (D+ / D-) matched length;
- 90Ω differential impedance;
- Short and straight (< 50 mm is best);
- Protection devices (TVS, common-mode choke).

### 5.4 Type-C Notes

- CC1 / CC2 pins detect plug orientation;
- PD communication is via the CC line;
- SBU1 / SBU2 (audio / DP aux);
- High-speed differential (SS).


## 6. Communication Method

- Control transfer: EP0, configuration / status;
- Interrupt transfer: small data, real-time (keyboard, mouse);
- Bulk transfer: large data, reliable (USB drive);
- Isochronous transfer: real-time data streams (audio, video);
- Test mode: electrical testing.


## 7. Initialization Flow

### 8.1 USB Device

1. Configure GPIO (DP / DM);
2. Configure USB clock (48 MHz);
3. Configure USB class (HID / CDC / MSC);
4. Configure endpoints;
5. Configure descriptors (device, configuration, interface, endpoint, string);
6. Start USB;
7. Wait for host enumeration.

### 8.2 USB Host

1. Configure GPIO (DP / DM);
2. Configure USB Host controller;
3. Detect device insertion;
4. Enumerate device (read descriptors);
5. Select driver (HID / CDC / MSC);
6. Communicate with the device.


## 8. Driver Interface

```python
class USBCDC:
    """USB virtual COM port."""
    def __init__(self):
        pass

    def begin(self):
        pass

    def write(self, data):
        pass

    def read(self, n=1):
        pass


class USBMSC:
    """USB Mass Storage."""
    def __init__(self):
        pass

    def begin(self):
        pass

    def read_file(self, path):
        pass

    def write_file(self, path, data):
        pass


class USBHID:
    """USB HID device (keyboard / mouse)."""
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


## 9. Interrupts and DMA

- Endpoint FIFO (built into the USB controller);
- Interrupts: transfer complete, error, reset, suspend / resume;
- DMA: high-speed transfer.


## 10. Error Handling

- **Cannot enumerate**: descriptor error, clock inaccuracy;
- **Not recognized**: driver not installed;
- **Disconnect**: physical link broken;
- **Over-current**: VBUS over-current protection;
- **Handshake error**: retry.


## 11. Low Power

- USB Suspend mode (< 2.5 mA);
- Remote wake-up (Resume);
- USB BC 1.2 charging spec;
- PD standby mode.


## 12. Example Code

```python
# USB CDC (virtual COM port)
usb = USBCDC()
usb.begin()
while True:
    if usb.any():
        data = usb.read()
        usb.write(b"Echo: " + data)
```


## 13. Debugging Methods

1. `lsusb` (Linux) to view devices;
2. Device Manager (Windows) to view;
3. Wireshark USB capture (requires USBPcap);
4. Protocol analyzers (USBlyzer, Ellisys);
5. Measure D+ / D- waveforms;
6. Check VBUS voltage and current.


## 14. Frequently Asked Questions

- **Not recognized**: driver not installed, descriptor wrong;
- **Cannot enumerate**: clock inaccuracy (48 MHz error > 0.25%);
- **Disconnect**: VBUS unstable, ESD damage;
- **Type-C not recognized**: CC wiring wrong, PD controller failure;
- **PD protocol fails**: Source / Sink mismatch, cable not supported;
- **Data loss**: FIFO overflow, insufficient bandwidth.


## 15. References

- USB 2.0 / USB 3.2 specifications
- USB Type-C specification
- USB PD 2.0 / 3.0 / 3.1 specifications
- USB class specifications (HID, CDC, MSC, Audio)
- Each MCU's USB HAL documentation
- FUSB302 / CH224 PD controller datasheets

## 16. Protocol Classes

- **HID**: Human Interface Device (keyboard, mouse);
- **CDC**: Communication Device Class (virtual COM);
- **MSC**: Mass Storage Class (USB drive);
- **DFU**: Device Firmware Upgrade;
- **Audio**: audio;
- **CDC-ACM**: Abstract Control Model (virtual COM);
- **RNDIS / ECM / NCM**: Ethernet;
- **UVC**: USB Video Class (camera);
- **UAC**: USB Audio Class;
- **Vendor**: vendor-specific.


## 17. Descriptors

USB devices report themselves to the host via descriptors:

- **Device descriptor**: VID / PID, version;
- **Configuration descriptor**: power, maximum current;
- **Interface descriptor**: class, subclass, protocol;
- **Endpoint descriptor**: address, attributes, max packet size;
- **String descriptor**: manufacturer, product name, serial number;
- **HID descriptor**: report descriptor, etc.

VID / PID:
- VID (Vendor ID): 16-bit, assigned by USB-IF (paid);
- PID (Product ID): 16-bit, vendor-defined;
- **Products cannot be released without a purchased VID** (open-source projects can use a test VID).


## 18. USB Type-C and Power Delivery

### 11.1 Type-C Connector

- 24 pins (USB 3.1);
- Reversible (CC1 / CC2 detection);
- High-speed data (SS differential pairs);
- USB PD (communication via CC lines).

### 11.2 USB PD

- PD 2.0: 5V / 9V / 15V / 20V, up to 100W;
- PD 3.0: PPS (Programmable Power Supply);
- PD 3.1: EPR (Extended Power Range), up to 240W;
- Protocol: BMC encoding (CC line).

### 11.3 PD Roles

- **Source**: power provider (charger);
- **Sink**: power consumer (device);
- **DRP**: Dual Role Port (switchable);
- **Cable**: E-mark cable (advertises capability).