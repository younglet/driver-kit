---
title: I2C
description: "DriverKit — I2C (under Communication): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: I2C,communication,bus,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,I2C,SDA,SCL,TWI,pull-up resistor,400kHz
category: Communication
field: Bus
module: I2C
---
# I2C (IIC)


## 1. Module Overview

I2C (Inter-Integrated Circuit) is a synchronous serial communication bus developed by Philips (now NXP) in 1982 for short-distance inter-chip communication.

Features:
- Only 2 signal lines (SDA, SCL);
- Multi-master / multi-slave architecture;
- 7-bit or 10-bit addressing;
- Speed grades: Standard 100 kHz, Fast 400 kHz, Fast+ 1 MHz, High-speed 3.4 MHz;
- Applications: sensors, EEPROMs, RTCs, I/O expanders, displays, audio codecs, etc.


## 2. Working Principle and Use Cases

### 2.1 Physical Layer

- **SDA**: data line (bidirectional);
- **SCL**: clock line (driven by master);
- **Open-drain + pull-up**: every device can only pull low; the bus high level is held by pull-up resistors;
- **Pull-up resistor**: 4.7 kΩ (100 kHz standard) / 2.2 kΩ (400 kHz) / 1 kΩ (1 MHz+);
- **Maximum capacitance**: 400 pF (limits the number of devices and the wire length).

### 2.2 Protocol Layer

- **START bit**: SDA goes from high to low while SCL is high;
- **STOP bit**: SDA goes from low to high while SCL is high;
- **Data bit**: SDA is sampled while SCL is high;
- **ACK / NACK**: on the 9th SCL cycle the slave pulls SDA low = ACK, otherwise NACK;
- **Repeated START**: a START without a preceding STOP;
- **Byte format**: MSB first, 8 bits per byte + 1 ACK.

### 2.3 Frame Format

```text
[S] [Address + R/W] [ACK] [Data1] [ACK] ... [DataN] [ACK/NACK] [P]
```

- 7-bit address: 1 byte address (7-bit address + 1-bit R/W);
- 10-bit address: prefix 11110xx + 8-bit address = 2-byte address.


## 3. Common Part Numbers and Prices

### 3.1 I2C Devices (Typical Applications)

| Device | Address | Features | Reference Price |
|---|---|---|---:|
| AT24Cxx series EEPROM | 0x50~0x57 | Storage | $1~3 |
| DS1307 / DS3231 RTC | 0x68 | Clock | $2~5 |
| LM75 temperature sensor | 0x48~0x4F | Temperature | $1~3 |
| TMP102 / TMP117 | 0x48~0x4F | High-precision temperature | $2~5 |
| SSD1306 OLED | 0x3C / 0x3D | Display | $4~10 |
| SSD1351 OLED | 0x3C / 0x3D | Display | $7~15 |
| PCF8574 / MCP23017 | 0x20~0x27 | I/O expander | $1~3 |
| ADS1115 / ADS1015 | 0x48~0x4F | ADC | $3~8 |
| PCA9685 | 0x70 | PWM expander | $2~5 |
| INA219 | 0x40 / 0x41 | Current / power | $3~8 |
| BH1750 | 0x23 / 0x5C | Light | $2~5 |
| VL53L0X / VL53L1X | 0x29 | ToF | $5~12 |
| TCS34725 | 0x29 | Color | $5~12 |
| APDS-9960 | 0x39 | RGB + gesture | $5~12 |
| AHT20 / AHT10 | 0x38 | Temp & humidity | $3~8 |
| BME280 | 0x76 / 0x77 | Temp / humidity / pressure | $5~12 |
| MPU-6050 | 0x68 | IMU | $3~8 |
| QMC5883L | 0x0D | Magnetometer | $2~5 |
| FT6336 touch IC | 0x38 | Touch | $3~8 |
| MAX17048 | 0x36 | Fuel gauge | $3~8 |
| DS3231 RTC | 0x68 | Clock | $3~8 |

### 3.2 I2C Bus Extenders

| Part Number | Type | Speed | Features | Reference Price |
|---|---|---|---|---:|
| LTC4311 / LTC4313 | Level shifter | - | Different voltage domains | $3~8 |
| PCA9306 | Level shifter | - | Dual supply | $1~3 |
| TXS0102 / TXS0108 | Level shifter | - | General purpose | $1~3 |
| LTC4316 | Bus isolator | - | Fault isolation | $5~12 |
| P82B715 | Bus extender | - | Long distance | $3~8 |
| P82B96 | Bus extender | - | Long distance | $3~8 |
| INA219 | Monitor | - | Bus health | $3~8 |
| LTC2945 | Monitor | - | Voltage monitoring | $5~12 |

### 3.3 Software Tools

- i2cdetect (Linux scanning);
- Wire library (Arduino);
- I2C HAL (STM32);
- esp-idf i2c driver;
- i2c-tools (Linux).


## 4. Key Parameters and Selection

| Parameter | Description |
|---|---|
| Speed grades | 100 / 400 / 1000 / 3400 kHz |
| Pull-up resistor | kΩ |
| Bus capacitance | < 400 pF |
| Addressing | 7-bit / 10-bit |
| Operating voltage | 1.8V~5V |
| Cable length | < 1 m (typical) |
| Device count | 100+ (with address expansion) |

**Selection guide**:
- 100 kHz: general sensors, low-speed EEPROMs;
- 400 kHz: common speed, supported by most sensors;
- 1 MHz: fast sensors, OLED displays;
- 3.4 MHz: rarely used; the master needs special support.


## 5. Hardware Connection

### 5.1 Wiring

- Two signal lines (SDA and SCL) + common GND;
- Pull-up resistors: one on SDA and one on SCL pulled up to VCC;
- Power and ground: each device powered separately (some share);
- On-board I2C: pull up to MCU VDD (3.3V);
- Multiple voltages: use level shifters (e.g. PCA9306).

### 5.2 Pull-up Resistor Selection

```text
R_min = (Vcc - V_OL_max) / I_OL_min
     = (3.3V - 0.4V) / 3mA ≈ 1 kΩ
R_max = t_r / (0.8473 × C_b)
t_r = rise time (ns, standard 1000 ns)
C_b = bus capacitance (pF)
Example: C_b = 100 pF → R_max ≈ 11.8 kΩ
```

So the common value **4.7 kΩ** is a good compromise for most scenarios.

### 5.3 Routing

- Short and straight (< 30 cm is best);
- Keep away from noise sources (DC-DC, motors);
- Shielded cable (long distance or strong interference);
- Do not run parallel to power lines.

### 5.4 Pull-up Power Rail

- On-board pull-up: 3.3V (same as MCU);
- Multi-voltage system: each voltage domain has its own pull-up + level shifter;
- Bus monitoring: add ESD protection (e.g. USBLC6).


## 6. Communication Method

- Master initiated (SCL is driven by the master);
- Multi-master arbitration (wired-AND logic);
- Clock synchronization (multi-master);
- Clock stretching (slave holds SCL low to wait for readiness).


## 7. Initialization Flow

1. Configure GPIO (SDA/SCL as open-drain);
2. Enable pull-ups (internal or external);
3. Configure the I2C controller (address, speed);
4. Test the bus (scan addresses);
5. Start communication.


## 8. Driver Interface

```python
class I2C:
    def __init__(self, sda, scl, freq=100000):
        self.sda = sda
        self.scl = scl
        self.freq = freq

    def begin(self):
        pass

    def scan(self):
        """Scan bus addresses 0x00~0x7F, return list of detected addresses."""
        found = []
        for addr in range(0x80):
            if self.is_present(addr):
                found.append(addr)
        return found

    def is_present(self, addr):
        """Check whether a device is present at addr."""
        pass

    def write(self, addr, data):
        """Write data (bytes / bytearray) to addr."""
        pass

    def read(self, addr, n):
        """Read n bytes from addr."""
        pass

    def write_then_read(self, addr, write_data, read_n):
        """Write then read (e.g. register access)."""
        pass
```


## 9. Data Format and Units

- Data: byte stream (MSB first);
- Frame: `[START] [ADDR+R/W] [ACK] [DATA] [ACK] [DATA] [ACK/NACK] [STOP]`;
- Register read/write: write the register address first (MSB first or LSB first, depending on the device);
- Multi-byte: high byte first (most devices).


## 10. Calibration and Filtering

- Clock stretching: the slave holds SCL low to wait for readiness;
- The master must support clock stretching;
- Bus timeout protection: avoid infinite stretching by a slave.


## 11. Interrupts and DMA

- Most I2C devices do not support hardware interrupts (GPIO interrupts required);
- Some MCUs have I2C FIFOs that support continuous transfers.


## 12. Error Handling

- **NACK**: slave does not respond; check address and pull-up;
- **Bus stuck**: SDA / SCL held low by a slave; send 9 SCL pulses to reset;
- **Arbitration lost**: multi-master collision;
- **Timeout**: bus timeout detection;
- **CRC8 (I2C V1.1)**: new CRC check (supported by some devices);
- **SMBus Alert**: slave actively notifies the master.

### 12.1 Bus Recovery

```python
def recover_bus(sda, scl):
    """Send 9 SCL pulses to reset the slave."""
    for _ in range(9):
        scl.high()
        scl.low()
    sda.high()
```


## 13. Low Power

- Turn off unused I2C peripherals;
- Standby current < 1 µA (most I2C devices);
- Master stops the bus during sleep;
- Some devices support hardware address wake-up.


## 14. Example Code

```python
i2c = I2C(sda_pin, scl_pin, freq=400000)
i2c.begin()
print("Scan bus:", i2c.scan())

# Read register
i2c.write_then_read(0x68, b'\x6B', 1)  # Read MPU6050 PWR_MGMT_1
# Write register
i2c.write_then_read(0x68, b'\x6B', b'\x00')  # Wake up
```


## 15. Debugging Methods

1. Measure SDA / SCL voltages (is the pull-up OK?);
2. Measure SCL waveform (oscilloscope);
3. Scan bus addresses (i2cdetect);
4. Use a logic analyzer to capture waveforms;
5. Check whether ACK is correct;
6. Check for clock stretching (SCL held low).


## 16. Frequently Asked Questions

- **No response**: wrong address, pull-up missing, device not powered;
- **Bus stuck**: slave keeps SDA low; reset the bus;
- **Data errors**: speed too high, cable too long, EMI;
- **Address conflict between devices**: change the ADDR pin;
- **I2C timing error**: timing inaccurate at high speed (high-speed mode).


## 17. References

- Multi-voltage systems must use level shifters;
- Long distances (> 1 m) require bus extenders;
- Strong interference environments need shielding;
- Reset the bus actively on errors.



- NXP UM10204 I2C-bus specification
- I2C-bus specification V1.0~V1.1
- Each MCU's I2C HAL documentation
- Bus extender P82B715 / P82B96 datasheets
- SMBus specification (System Management Bus)