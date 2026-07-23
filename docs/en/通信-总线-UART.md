---
title: UART
description: "DriverKit — UART (under Communication): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: UART,communication,bus,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,UART,serial port,TTL,RS232,baud rate
category: Communication
field: Bus
module: UART
---
# UART (Serial Port)


## 1. Module Overview

UART (Universal Asynchronous Receiver/Transmitter) is the most commonly used serial communication interface in embedded systems. It is used for:
- Debug logs (printf redirection);
- Module communication (GPS, Bluetooth, Wi-Fi);
- Industrial equipment (RS232 / RS485);
- Module firmware burning (Bootloader);
- Serial console;
- Communication with PC.

Features:
- Asynchronous (no clock line);
- Full-duplex (TX / RX two lines);
- Point-to-point (UART itself); multi-device needs RS485 bus;
- Simple and reliable;
- Speed: 1.2 kbps to several Mbps.


## 2. Working Principle and Use Cases

### 2.1 Physical Layer

- **TX**: transmit;
- **RX**: receive;
- **GND**: common ground;
- Levels: TTL (0~VCC) / RS232 (-12V~+12V) / RS485 (differential).

### 2.2 Data Format

```text
Idle line (high level)
Start bit (low, 1 bit)
Data bits (5/6/7/8/9 bits, LSB first)
Parity bit (None / Even / Odd / Mark / Space, 0/1 bit)
Stop bit (1/1.5/2 bits, high level)
```

### 2.3 Baud Rate

- Both sides must agree;
- Common: 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200, 230400, 460800, 921600, 1500000, 2000000;
- Error: < 2% (most UARTs tolerate 2~3%);
- High speed: MCU internal clock divider must be precise.


## 3. Common Part Numbers and Prices

### 3.1 USB-UART Bridge Chips

| Part Number | Speed | Interface | Features | Reference Price |
|---|---|---|---|---:|
| CH340 | 2 Mbps | USB-UART | Domestic classic | $1~3 |
| CH340G | 2 Mbps | USB-UART | Classic | $1~3 |
| CH340C | 2 Mbps | USB-UART | Integrated crystal | $1~3 |
| CH340E | 2 Mbps | USB-UART | Tiny package | $1~3 |
| CH342 | 3 Mbps | USB-UART | New version | $1~3 |
| CP2102 | 1 Mbps | USB-UART | Silicon Labs | $2~5 |
| CP2102N | 3 Mbps | USB-UART | Upgraded | $3~6 |
| CP2104 | 1 Mbps | USB-UART | Compact | $2~5 |
| FT232RL | 3 Mbps | USB-UART | FTDI classic | $5~12 |
| FT232H | 12 Mbps | USB-UART / SPI / I2C | Multi-function | $10~22 |
| FT230X | 3 Mbps | USB-UART | Compact FTDI | $2~5 |
| FT240X | 3 Mbps | USB-FIFO | FIFO mode | $3~8 |
| PL2303 | 1 Mbps | USB-UART | Legacy (many clones) | $1~3 |
| PL2303HXD | 12 Mbps | USB-UART | Upgraded | $2~5 |
| XR21V1410 | 12 Mbps | USB-UART | Exar | $5~12 |

### 3.2 UART Level Shifters

| Part Number | Type | Features | Reference Price |
|---|---|---|---:|
| MAX3232 | RS232 | Classic | $1~3 |
| SP3232 | RS232 | Sipex | $1~3 |
| MAX485 | RS485 | Transceiver | $1~3 |
| SP485 | RS485 | Sipex | $1~3 |
| MAX3485 | RS485 | 3.3V | $1~3 |
| ADM485 | RS485 | ADI | $1~3 |
| ISO1050 | Isolated RS485 | TI | $5~12 |
| MAX13487 | RS485 auto-direction | Auto TX / RX control | $2~5 |

### 3.3 Serial Debuggers

| Type | Model | Reference Price |
|---|---|---:|
| USB-TTL module (CH340) | Classic 6-pin | $2~5 |
| USB-TTL module (CP2102) | 6-pin | $3~6 |
| USB-TTL module (FT232) | 6-pin | $7~15 |
| USB-RS485 module | CH340 + MAX485 | $3~8 |
| USB-RS232 module | CH340 + MAX3232 | $5~12 |
| USB isolator | ADUM3160 | $15~40 |
| ESP32-C3 serial programmer | Integrated | $5~12 |


## 4. Key Parameters and Selection

| Parameter | Description |
|---|---|
| Baud rate | bps |
| Data bits | 5~9 |
| Stop bits | 1 / 1.5 / 2 |
| Parity | None / Even / Odd / Mark / Space |
| Flow control | None / XON-XOFF / RTS-CTS |
| FIFO | Byte buffer |
| Operating voltage | 1.8V / 3.3V / 5V |
| Drive current | mA |

**Selection guide**:
- Entry-level debugging: CH340 module (cheapest);
- Industrial reliability: FT232RL;
- High speed: CH342, CP2102N;
- Multi-protocol: FT232H;
- 3.3V compatible: MAX3485 / CP2102;
- Isolation: ADUM3160 / ISO1050.


## 5. Hardware Connection

### 5.1 TTL UART

- 3.3V / 5V compatible (most);
- TX connects to RX (crossover);
- Common GND;
- Note: connecting a 3.3V MCU to 5V UART requires level shifting.

### 5.2 RS232

- -12V~+12V levels;
- MAX3232 / SP3232 conversion;
- Short distance (< 15 m);
- Rarely used today; replaced by USB.

### 5.3 RS485 (See RS485 doc for details)

- Differential (A / B);
- 120Ω termination resistor;
- Long distance (< 1200 m);
- Bus topology.

### 5.4 ESD Protection

- TVS diodes;
- Shielded cable (strong interference environment);
- Isolation (medical, industrial).


## 6. Communication Method

- Asynchronous serial;
- Full-duplex;
- Multi-device: RS485 bus (half-duplex) + addressing;
- Software flow control (XON / XOFF): ASCII control characters;
- Hardware flow control (RTS / CTS): hardware handshake signals.


## 7. Initialization Flow

1. Configure GPIO (TX as output, RX as input);
2. Configure the UART controller (baud rate, data bits, stop bits, parity, flow control);
3. Configure FIFO (depth);
4. Configure interrupts (RX complete, TX complete);
5. Enable UART;
6. Test.


## 8. Driver Interface

```python
class UART:
    def __init__(self, tx_pin, rx_pin, baud=115200):
        self.tx = tx_pin
        self.rx = rx_pin
        self.baud = baud

    def begin(self):
        pass

    def write(self, data):
        """Send bytes / bytearray / str."""
        pass

    def read(self, n=1):
        """Read n bytes."""
        pass

    def readline(self):
        """Read a line (until \n)."""
        pass

    def any(self):
        """Whether readable data is available."""
        pass

    def flush(self):
        """Wait until transmit complete."""
        pass


class UARTConsole:
    """Debug console."""
    def __init__(self, uart):
        self.uart = uart

    def print(self, *args):
        s = ' '.join(str(a) for a in args) + '\r\n'
        self.uart.write(s.encode())

    def printf(self, fmt, *args):
        s = fmt % args + '\r\n'
        self.uart.write(s.encode())
```



### 10.1 Software Flow Control (XON / XOFF)

- XON (0x11): resume sending;
- XOFF (0x13): pause sending;
- Occupies data bandwidth;
- Simple but adds latency.

### 10.2 Hardware Flow Control (RTS / CTS)

- RTS: master tells the slave "ready to receive";
- CTS: slave tells the master "you may send";
- Real-time;
- Uses 2 extra GPIOs.


## 9. Data Format and Units

- Byte stream (MSB first in most cases);
- Text (ASCII): debug logs;
- Binary: protocols;
- Frame: start bit + data + parity + stop bit;
- One frame is 10 bits (8N1, no parity).


## 10. Interrupts and DMA

- Interrupts: RX complete / TX complete / error;
- DMA: continuous RX / TX (e.g. GPS data stream);
- FIFO: hardware byte buffer (16~64 bytes on some MCUs);
- Ring buffer (software): receive data into a ring buffer.

### 11.1 Ring Buffer

```python
class RingBuffer:
    def __init__(self, size):
        self.buf = bytearray(size)
        self.head = 0
        self.tail = 0
        self.count = 0

    def write(self, data):
        for b in data:
            self.buf[self.head] = b
            self.head = (self.head + 1) % len(self.buf)
            self.count = min(self.count + 1, len(self.buf))

    def read(self, n):
        data = bytearray(n)
        for i in range(n):
            data[i] = self.buf[self.tail]
            self.tail = (self.tail + 1) % len(self.buf)
        return bytes(data)
```


## 11. Error Handling

- **Parity error**: check baud rate and cable;
- **Overrun error**: FIFO overflow; lower the speed or improve processing;
- **Framing error**: stop bit error; check levels;
- **Bus collision**: multiple masters transmitting simultaneously (UART does not support multi-master);
- **Disconnection**: detect lost TX.


## 12. Low Power

- Turn off unused UARTs;
- Flush before the master sleeps;
- Some devices support hardware wake-up (specific characters).


## 13. Example Code

```python
uart = UART(tx_pin, rx_pin, baud=115200)
uart.begin()

# Send
uart.write(b'AT\r\n')

# Receive
while uart.any():
    data = uart.read()
    print(data)

# Debug output
console = UARTConsole(uart)
console.print("Hello World")
```


## 14. Debugging Methods

1. Measure TX / RX levels;
2. Capture waveforms with a logic analyzer;
3. Connect to PC with a USB-TTL module (serial terminal);
4. Check baud rate and data bits;
5. Check common GND;
6. Short TX-RX for a loopback test.


## 15. Frequently Asked Questions

- **Garbled data**: wrong baud rate / data bits, level mismatch;
- **No response**: TX / RX swapped, common GND missing;
- **Data loss**: ring buffer too small, processing too slow;
- **Overload**: FIFO overflow;
- **PC does not recognize**: driver not installed (common with CH340);
- **Data lost after power cycle**: flow control not enabled.


## 16. References

- Each MCU's UART HAL documentation
- CH340 / CP2102 / FT232 datasheets
- MAX3232 / MAX485 datasheets
- RS232 / RS485 standards (EIA / TIA)