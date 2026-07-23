---
title: CAN
description: "DriverKit — CAN (under Communication): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: CAN,communication,bus,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,CAN,CAN bus,CAN transceiver,TJA1050
category: Communication
field: Bus
module: CAN
---
# CAN Bus


## 1. Module Overview

CAN (Controller Area Network) is a serial communication protocol developed by Bosch in 1986. Originally for automotive use, it is now widely used in industry, medical, rail, and many other fields.

Features:
- Multi-master bus (arbitration based on message ID);
- High reliability (CRC, ACK, error detection);
- Real-time (priority-based arbitration);
- Speed: 125 kbps~1 Mbps (CAN); CAN FD 5 Mbps;
- Distance: < 1 km (low speed);
- Number of nodes: theoretically unlimited (practically a few dozen);
- Applications: automotive ECUs, industrial control, medical equipment, robotics.


## 2. Working Principle and Use Cases

### 2.1 Physical Layer

- **CAN_H / CAN_L**: differential signals;
- Dominant: CAN_H = 3.5V, CAN_L = 1.5V (2V differential) = logic 0;
- Recessive: CAN_H = CAN_L = 2.5V (0V differential) = logic 1;
- Termination resistor: 120Ω (both ends of the bus);
- Common ground: required.

### 2.2 Protocol Layer (CAN 2.0)

- **Frame types**: data frame, remote frame, error frame, overload frame;
- **Frame format**:
  - SOF (Start of Frame);
  - Arbitration field (11-bit ID or 29-bit ID);
  - Control field (DLC);
  - Data field (0~8 bytes);
  - CRC field;
  - ACK field;
  - EOF (End of Frame).

### 2.3 CAN 2.0A vs 2.0B

- **CAN 2.0A**: 11-bit ID (standard frame);
- **CAN 2.0B**: 29-bit ID (extended frame);
- 2.0B is compatible with 2.0A.

### 2.4 CAN FD

- **CAN with Flexible Data rate**;
- Higher data-phase bit rate (up to 5 Mbps);
- Data field up to 64 bytes;
- Backward compatible with classic CAN.

### 2.5 Arbitration

- When multiple masters transmit simultaneously, arbitration is by ID (smaller ID wins);
- ID priority: the smaller the value, the higher the priority;
- The arbitration loser switches to receive.


## 3. Common Part Numbers and Prices

> Prices are for reference only.

### 3.1 CAN Transceivers

| Part Number | Type | Speed | Features | Reference Price |
|---|---|---|---|---:|
| TJA1050 | High speed | 1 Mbps | NXP classic | $1~3 |
| TJA1051 | High speed | 5 Mbps | NXP new | $2~5 |
| TJA1057 | High speed | 5 Mbps | NXP low power | $2~5 |
| TJA1042 | High speed | 5 Mbps | NXP | $2~5 |
| TJA1044 | High speed | 5 Mbps | NXP | $2~5 |
| TJA1053 | Fault tolerant | 125 kbps | Fault-tolerant low speed | $2~5 |
| TJA1054 | Fault tolerant | 125 kbps | Fault-tolerant low speed | $2~5 |
| SN65HVD230 | High speed | 1 Mbps | TI classic | $2~5 |
| SN65HVD231 | High speed | 1 Mbps | TI | $2~5 |
| SN65HVD232 | High speed | 1 Mbps | TI | $2~5 |
| SN65HVD234 | High speed | 1 Mbps | TI | $2~5 |
| SN65HVD251 | High speed | 1 Mbps | TI industrial | $3~6 |
| SN65HVD1050 | High speed | 1 Mbps | TI | $2~5 |
| MAX3051 | High speed | 1 Mbps | Maxim | $2~5 |
| MCP2551 | High speed | 1 Mbps | Microchip | $2~5 |
| MCP2562 | High speed | 1 Mbps | Microchip | $2~5 |
| ISO1050 | Isolated | 1 Mbps | TI isolated | $7~15 |
| ADM3053 | Isolated | 1 Mbps | ADI isolated | $7~15 |
| ADM3054 | Isolated | 1 Mbps | ADI isolated | $7~15 |

### 3.2 CAN Controllers (Stand-alone Chips)

| Part Number | Interface | Features | Reference Price |
|---|---|---|---|
| MCP2515 | SPI | Microchip classic | $3~6 |
| MCP2517 | SPI | Microchip CAN FD | $7~18 |
| MCP2518 | SPI | Microchip CAN FD | $7~18 |
| TJA1043 | SPI | NXP | $7~15 |
| STM32 built-in bxCAN | - | STM32 integrated | $0 (built-in) |
| ESP32 built-in TWAI | - | ESP32 integrated | $0 (built-in) |

### 3.3 CAN Tools

| Device | Features | Reference Price |
|---|---|---:|
| USB-CAN analyzer | Debugging tool | $25~100 |
| CANable | Open-source USB-CAN | $40~100 |
| PEAK PCAN-USB | Industrial grade | $500~1500 |
| Kvaser Leaf | Industrial grade | $750~2500 |
| CANalyzer / CANoe | Vector tools | $2500+ |
| Zhou Ligong CAN analyzer | Domestic industrial | $150~500 |


## 4. Key Parameters and Selection

| Parameter | Description |
|---|---|
| Protocol | CAN 2.0A / 2.0B / CAN FD |
| Speed | bps (125k-1M) |
| Distance | < 1 km (low speed) / 40 m (1 Mbps) |
| Termination resistor | 120Ω |
| Number of transceivers | Theoretically unlimited |
| Operating voltage | 3.3V / 5V |
| Isolation | Resists ground loops |

**Selection guide**:
- Entry-level: TJA1050 + MCP2515 + STM32;
- Integrated solution: STM32 bxCAN + TJA1050;
- ESP32: built-in TWAI + TJA1050;
- CAN FD: MCP2517 / MCP2518 + TJA1051;
- Industrial: isolated transceivers (ISO1050).


## 5. Hardware Connection

### 5.1 Wiring

- Twisted pair for CAN_H / CAN_L;
- 120Ω termination resistors at both ends of the bus;
- Common ground (required);
- No star topology;
- Bus capacitance limits the number of nodes.

### 5.2 Termination Resistor

- One 120Ω resistor at each end of the bus (matched to cable characteristic impedance);
- Can be omitted on short buses or low speeds;
- Repeaters: also add 120Ω at the repeater point.

### 5.3 Protection

- TVS diodes (against surges);
- ESD protection (some transceivers have built-in ±8 kV / ±15 kV);
- Isolation: long distance or strong-interference environments;
- Common-mode choke.

### 5.4 Routing

- Matched length (differential pair);
- Impedance matching (100Ω differential);
- Keep away from interference sources;
- Shielded cable.


## 6. Communication Method

- Multi-master bus (ID-based arbitration);
- Message IDs identify priorities;
- Message filtering (filter on the receiver);
- Remote frame (request data);
- Time-triggered (CAN TTCAN).


## 7. Initialization Flow

1. Configure GPIO (CAN TX / RX);
2. Configure the CAN controller (baud rate, timing, filters);
3. Enable the transceiver;
4. Configure interrupts (RX, TX complete, error);
5. Start CAN;
6. Test (loopback);
7. Start communication.


## 8. Driver Interface

```python
class CANMessage:
    def __init__(self, id, data, ext=False, rtr=False):
        self.id = id
        self.data = data
        self.ext = ext
        self.rtr = rtr
        self.dlc = len(data)


class CAN:
    def __init__(self, can_id=0, baud=500000):
        self.baud = baud
        self.filters = []

    def begin(self):
        pass

    def set_filter(self, id, mask):
        """Set filter (only receive matching IDs)."""
        pass

    def send(self, msg):
        """Send a message."""
        pass

    def recv(self, timeout_ms=0):
        """Receive a message, return CANMessage or None."""
        pass

    def available(self):
        """Whether a message is available."""
        pass


class CANopen:
    """CANopen application-layer protocol."""
    def __init__(self, can, node_id):
        self.can = can
        self.node_id = node_id
        self.od = {}  # Object Dictionary

    def begin(self):
        pass

    def send_pdo(self, pdo_id, data):
        """Send Process Data Object."""
        pass

    def read_sdo(self, index, sub_index):
        """Read Service Data Object."""
        pass

    def write_sdo(self, index, sub_index, value):
        pass
```



- **CANopen**: Object Dictionary, PDO, SDO;
- **J1939**: Trucks and construction machinery;
- **DeviceNet**: Industrial (North America);
- **NMEA 2000**: Marine;
- **CAN Kingdom**: Industrial;
- **CCP / XCP**: Calibration protocol;
- **OSEK / VDX**: Automotive RTOS network management.


## 9. Data Format and Units

- **CAN 2.0A standard frame**: 11-bit ID + 0~8 bytes of data;
- **CAN 2.0B extended frame**: 29-bit ID + 0~8 bytes of data;
- **CAN FD**: 11 / 29-bit ID + 0~64 bytes of data;
- **CANopen**: Predefined connection set + Object Dictionary (OD);
- **J1939**: 29-bit ID + application-layer protocol (trucks, construction machinery).



The CAN bit time consists of the following segments:
- Sync segment: 1 Tq;
- Propagation segment (Prop): 1~8 Tq;
- Phase buffer segment 1 (PS1): 1~8 Tq;
- Phase buffer segment 2 (PS2): 1~8 Tq;
- Total bit time = 1 + Prop + PS1 + PS2 (typically 8~25 Tq);
- Sample point: between 60% and 87.5%.

Example: 1 Mbps with CAN clock 8 MHz → 1 Tq = 125 ns → bit time 8 Tq = 1 µs.


## 10. Low Power

- CAN controller standby (< 1 mA);
- Transceiver standby (< 0.1 mA);
- Turn off the CAN module when the whole system sleeps;
- CAN hardware wake-up (some chips).


## 11. Debugging Methods

1. Measure CAN_H / CAN_L waveforms (oscilloscope differential probe);
2. Capture packets with a USB-CAN tool;
3. Check termination resistors (120Ω);
4. Loopback test;
5. Check baud-rate error;
6. Check filter configuration.


## 12. Frequently Asked Questions

- **Cannot send**: CAN controller not started, bus-off, termination resistor wrong;
- **Cannot receive**: filter blocked, baud rate wrong, termination resistor wrong;
- **Frequent error frames**: baud rate wrong, cable problem, termination resistor wrong;
- **Bus Off**: too many errors; MCU needs to recover;
- **Node loss**: address conflict, filter wrong.


## 13. References

- Termination resistors must be correct;
- Long distances require isolation;
- With many nodes you must carefully plan the IDs;
- Message priority is determined by ID (smaller ID = higher priority);
- Error handling must be reliable.



- ISO 11898 CAN standard
- Bosch CAN specification 2.0
- CiA 301 CANopen protocol
- SAE J1939 application layer
- TJA1050 / MCP2515 datasheets
- STM32 bxCAN reference manual


## 14. Filtering

- The receiver can configure filters to accept only specific IDs;
- Mask mode: id & mask == filter & mask;
- List mode: exact match;
- Saves MCU processing time.


## 15. Error Detection and Handling

The CAN controller automatically detects:
- Bit error;
- Stuff error;
- CRC error;
- Form error;
- ACK error;

Error states:
- Error Active;
- Error Passive;
- Bus Off.

Error counters TEC / REC increment / decrement automatically. MCU must recover from Bus Off.