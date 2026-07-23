---
title: Modbus
description: "DriverKit — Modbus (under Communication): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: Modbus,communication,protocol,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,Modbus RTU,Modbus TCP,function code
category: Communication
field: Protocol
module: Modbus
---
# Modbus


## 1. Module Overview

Modbus is an industrial communication protocol published by Modicon (now Schneider Electric) in 1979 and is now the de-facto standard in industrial automation. Features:
- Simple and open;
- Master / slave architecture (Modbus RTU / ASCII);
- Client / server (Modbus TCP);
- Multiple physical layers (RS232, RS485, TCP, UDP);
- Multiple register types;
- Applications: PLCs, frequency inverters, servo drives, electricity meters, sensors, instruments.


## 2. Working Principle and Use Cases

### 2.1 Protocol Layer (PDU)

The PDU (Protocol Data Unit) is independent of the physical layer:

```text
[Function code (1 byte)] [Data (0~252 bytes)]
```

### 2.2 Physical Layer

- **Modbus RTU** (binary): RS485 / RS232;
- **Modbus ASCII** (human-readable characters): RS232 / 485;
- **Modbus TCP** (Ethernet): TCP / IP;
- **Modbus UDP** (UDP / IP);
- **Modbus Plus** (token bus, dedicated chip, now rarely used).

### 2.3 Data Model

Four register types (65536 each):

| Type | Access | Common Use |
|---|---|---|
| Coil | Read / Write | DO (digital output) |
| Discrete Input | Read only | DI (digital input) |
| Holding Register | Read / Write | AO (analog output) / parameters |
| Input Register | Read only | AI (analog input) |

Address numbering:
- Modbus addresses start at 1 (for humans);
- Protocol addresses start at 0 (in the PDU);
- Conversion: protocol address = Modbus address - 1.

### 2.4 Generic Frame Format (Modbus RTU)

```text
[Slave address (1 byte)] [PDU (function code + data)] [CRC16 (2 bytes)]
```

Frame gap: 3.5 character times with no data = end of frame.

### 2.5 Generic Frame Format (Modbus TCP)

```text
[MBAP header (7 bytes)] [PDU]
```

MBAP:
- Transaction ID (2 bytes): transaction identifier;
- Protocol ID (2 bytes): 0x0000 (Modbus);
- Length (2 bytes): number of following bytes;
- Unit ID (1 byte): slave address (may be omitted over TCP).


## 3. Common Part Numbers and Prices

> Prices are for reference only.

### 3.1 Modbus Masters (MCU / PLC)

| Device | Features | Reference Price |
|---|---|---|
| Siemens S7-200 SMART | Modbus RTU / TCP | $500~1500 |
| Siemens S7-1200 / 1500 | Modbus RTU / TCP | $1500~10000 |
| Mitsubishi FX5U | Modbus RTU | $750~2500 |
| Inovance H5U / AM600 | Modbus | $500~2500 |
| Arduino + MAX485 | Modbus RTU | $15~40 |
| ESP32 + MAX485 | Modbus RTU / TCP | $15~40 |
| Raspberry Pi | Modbus TCP | $150~300 |
| Industrial gateway | Multi-protocol conversion | $250~1500 |

### 3.2 Modbus Slaves (Sensors / Instruments)

| Device | Type | Reference Price |
|---|---|---|
| Industrial electricity meter | Modbus RTU | $50~250 |
| Industrial water / gas / heat meter | Modbus RTU | $100~500 |
| Frequency inverter (Inovance / INVT / Siemens) | Modbus RTU | $250~1500 |
| Temperature transmitter | Modbus RTU | $50~250 |
| Pressure transmitter | Modbus RTU | $100~400 |
| Flow meter | Modbus RTU | $250~1500 |
| Power monitor | Modbus RTU | $50~250 |
| IO module (digital / analog) | Modbus RTU | $50~250 |
| Protocol converter (Modbus RTU-TCP) | Gateway | $100~500 |

### 3.3 Modbus Libraries and Tools

| Name | Type | Features |
|---|---|---|
| libmodbus | C library | Cross-platform, open source |
| pymodbus | Python | Master / slave |
| modbus-tk | Python | Simplified |
| ModbusTools | Windows tool | Debugging |
| Modbus Poll | Windows debugging | Master |
| Modbus Slave | Windows debugging | Slave |
| QModMaster | Open-source tool | Cross-platform |
| mbpoll | Linux command line | Debugging |


## 4. Key Parameters and Selection

| Parameter | Description |
|---|---|
| Physical layer | RTU / ASCII / TCP / UDP |
| Baud rate | 1200 ~ 115200 bps (RTU) |
| Data bits | 8 (RTU / TCP) |
| Stop bits | 1 / 2 |
| Parity | None / Even / Odd |
| Frame gap | 3.5 characters |
| Number of nodes | 1~247 (RTU) |
| Speed | 10 Mbps (TCP) |

**Selection guide**:
- Simple sensors: Modbus RTU over RS485;
- Industrial sites: Modbus RTU with 4-wire RS485;
- Long distance: Modbus RTU + RS485 repeaters;
- Multi-device networking: Modbus TCP (Ethernet);
- Remote monitoring: Modbus TCP + 4G / IoT gateway.


## 5. Hardware Connection

### 5.1 RTU / ASCII Physical Layer

- RS485 (recommended): A and B twisted pair;
- RS232: point-to-point;
- 120Ω termination resistors (both ends);
- Common ground (required);
- Shielding (strong interference environment);
- Isolated transceivers (long distance).

### 5.2 TCP Physical Layer

- Standard Ethernet (RJ45);
- Network switch (multiple devices);
- TCP port 502 (Modbus);
- Can run over LAN / Internet.


## 6. Communication Method

- Master-slave: master polls slaves;
- Broadcast (function code 0): master sends to all slaves (no response);
- TCP: client / server (C / S);
- Multi-master: requires custom protocol or coordination;
- Large data: Modbus TCP performs better.


## 7. Initialization Flow

### 7.1 Master

1. Configure serial port / network;
2. Set slave address (1~247);
3. Set function code;
4. Set register address;
5. Set data;
6. Send request;
7. Wait for response (with timeout detection);
8. Parse response (CRC check).

### 7.2 Slave

1. Configure serial port / network;
2. Set local address;
3. Configure register data (DO / DI / AO / AI);
4. Listen for requests;
5. Parse (address matching, function-code check, CRC);
6. Respond.


## 8. Driver Interface

```python
class ModbusClient:
    """Modbus RTU / TCP master."""
    def __init__(self, transport, slave=1):
        self.t = transport
        self.slave = slave

    def read_holding_registers(self, addr, qty):
        """Function code 0x03."""
        return self._send(0x03, addr, qty)

    def read_input_registers(self, addr, qty):
        """Function code 0x04."""
        return self._send(0x04, addr, qty)

    def write_register(self, addr, value):
        """Function code 0x06."""
        return self._send(0x06, addr, value)

    def write_registers(self, addr, values):
        """Function code 0x10."""
        return self._send(0x10, addr, values)

    def read_coils(self, addr, qty):
        """Function code 0x01."""
        return self._send(0x01, addr, qty)


class ModbusServer:
    """Modbus RTU / TCP slave."""
    def __init__(self, transport, slave=1):
        self.t = transport
        self.slave = slave
        self.coils = bytearray(65536 // 8)
        self.holding = [0] * 65536
        self.input = [0] * 65536

    def begin(self):
        pass

    def poll(self):
        """Poll for requests (in main loop or interrupt)."""
        pass

    def set_coil(self, idx, val):
        self.coils[idx // 8] |= (1 << (idx % 8)) if val else 0

    def get_holding(self, idx):
        return self.holding[idx]
```


## 9. Data Format and Units

Each device has a register map (address → physical quantity):

```text
Address 40001: temperature value (°C × 10, integer)
Address 40002: humidity value (%RH × 10)
Address 40003: pressure value (kPa × 100)
Address 40004: device status
Address 00001: relay 1
Address 00002: relay 2
...
```

The master interprets values according to the mapping.


## 10. Error Handling

- **No response**: wrong address, wrong baud rate, broken line;
- **CRC error**: EMI, baud-rate error;
- **Exception response**: check exception code;
- **Timeout**: response time too long;
- **Register error**: address out of range.


## 11. Example Code

```python
# Modbus RTU master (read temperature)
client = ModbusClient(rs485, slave=1)
client.begin()

# Read holding register (address 0 = temperature)
result = client.read_holding_registers(0, 1)
if result and not result.isError():
    temp = result.registers[0] / 10.0  # temperature ×10
    print("Temperature: %.1f°C" % temp)
```


## 12. Debugging Methods

1. Use Modbus Poll to test;
2. Connect to PC via USB-RS485 module;
3. Check baud rate, parity, address;
4. Observe A / B waveform with an oscilloscope;
5. Test each function code individually;
6. Verify CRC.


## 13. References

- Master / slave: slaves cannot initiate (except for a few exceptions);
- Multi-master: needs protocol arbitration;
- Long distance: must use RS485;
- High speed: Modbus TCP (Ethernet);
- Real-time: RTU 1ms~50ms polling cycle, TCP is shorter;
- Bus contention: master polling avoids conflicts.



- Modbus Application Protocol V1.1b3 (Modbus.org)
- Modbus Serial Line Protocol V1.02
- Modbus Messaging on TCP/IP V1.0b
- libmodbus open-source library
- Schneider Modbus primer


## 14. Common Function Codes

| Function Code | Name | Operation |
|---|---|---|
| 0x01 | Read Coils | Read multiple DO |
| 0x02 | Read Discrete Inputs | Read multiple DI |
| 0x03 | Read Holding Registers | Read multiple AO / parameters |
| 0x04 | Read Input Registers | Read multiple AI |
| 0x05 | Write Single Coil | Write 1 DO |
| 0x06 | Write Single Register | Write 1 AO |
| 0x0F | Write Multiple Coils | Write multiple DO |
| 0x10 | Write Multiple Registers | Write multiple AO |
| 0x14 | Read File Record | Advanced |
| 0x17 | Read / Write Multiple Registers | Atomic operation |

### 8.1 Exception Response

When the master request is wrong, the slave returns an exception code:

| Exception Code | Meaning |
|---|---|
| 0x01 | Illegal function code |
| 0x02 | Illegal data address |
| 0x03 | Illegal data value |
| 0x04 | Slave device failure |
| 0x05 | Acknowledge (processing) |
| 0x06 | Slave device busy |
| 0x08 | Memory parity error |
| 0x0A | Gateway path unavailable |
| 0x0B | Gateway target no response |


## 15. CRC16 Check (Modbus RTU)

CRC16 (polynomial 0xA001):

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

CRC16 byte order: low byte first (Modbus RTU).


## 16. Security Considerations

- Modbus itself has no authentication or encryption (RTU);
- Modbus TCP must be deployed on a trusted network;
- Industrial Internet: use VPN / TLS tunnels;
- Device authentication: implement yourself (Modbus Security);
- Critical devices: block external access.