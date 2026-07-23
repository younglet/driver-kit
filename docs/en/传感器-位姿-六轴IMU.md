---
title: 6-Axis IMU
description: "DriverKit — 6-Axis IMU (under Sensors): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: 6-Axis IMU,Sensors,Attitude,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging
category: Sensors
field: Attitude
module: 6-Axis IMU
---
# 6-Axis IMU


## 1. Module Overview

A 6-axis IMU integrates a 3-axis accelerometer and a 3-axis gyroscope, outputting motion acceleration and angular velocity. It is widely used for attitude estimation, motion control, robotics, drones, AR/VR, and wearables.

Compared with using a standalone gyroscope or accelerometer, the IMU enables hardware-synchronized sampling that greatly simplifies sensor fusion. Most modern IMUs also support FIFO, interrupts, DMA, and I2C/SPI.


## 2. Working Principle and Use Cases

The accelerometer outputs specific force (including gravity); the gyroscope outputs angular velocity. Fusion algorithms (complementary filter, Mahony, Madgwick, EKF) derive the attitude (roll / pitch / yaw) as Euler angles or quaternions.

Use cases:
- Drone / self-balancing vehicle attitude control
- Robot IMU
- Camera gimbal stabilization
- AR/VR headsets
- Fitness bands, posture detection
- Industrial IMU modules


## 3. Common Part Numbers and Reference Prices

> Prices are estimates for budgeting only.

| Model | Interface | Key Features | Bare-chip Price | Module Price |
|---|---|---|---:|---:|
| MPU-6050 | I2C | Classic, abundant docs | $4~13 | $5~18 |
| MPU-6500 | I2C/SPI | Newer, low noise | $8~23 | $13~40 |
| MPU-6555 | I2C/SPI | Successor to MPU-6500 | $8~25 | $13~45 |
| ICM-20600 | I2C/SPI | Low power | $8~20 | $15~40 |
| ICM-20602 | SPI/I2C | High speed, low noise | $10~30 | $18~50 |
| ICM-42605 | SPI/I2C | New-generation low-power | $13~40 | $23~75 |
| ICM-42688-P | SPI/I2C | High-end low noise | $18~50 | $30~90 |
| ICM-42607-P | SPI/I2C | Industrial grade | $20~60 | $40~100 |
| BMI160 | I2C/SPI | Ultra-low power, hardware step | $8~25 | $15~50 |
| BMI270 | I2C/SPI | Latest low-power | $10~35 | $20~70 |
| BMI323 | I2C/SPI | High-performance industrial | $15~45 | $30~80 |
| LSM6DS3 | I2C/SPI | Rich FIFO + interrupts | $8~25 | $15~50 |
| LSM6DS3H | I2C/SPI | High precision | $10~30 | $20~60 |
| LSM6DSL | I2C/SPI | Low-power wearable | $8~25 | $15~50 |
| LSM6DSO | I2C/SPI | Enhanced | $10~35 | $20~70 |
| LSM6DSOX | I2C/SPI | With machine-learning core | $10~40 | $20~80 |
| LSM6DSV | I2C/SPI | High-performance flagship | $15~50 | $30~90 |
| LIS2MDL + LSM6DS3 combo | I2C | 9-axis combo module | - | $20~60 |
| MPU-6886 | I2C | Common on dev boards | - | $8~40 |


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Gyro range | ±125 / ±250 / ±500 / ±1000 / ±2000 dps |
| Accel range | ±2 / ±4 / ±8 / ±16 g |
| Gyro noise density | °/s/√Hz, lower is better |
| Accel noise density | µg/√Hz |
| Output data rate | 1 Hz to tens of kHz |
| FIFO | 1KB~4KB, some support compression |
| Interrupts | Data-ready, motion, wake-up, tap, free-fall, step, SMD |
| Interface | I2C (≤3.4 MHz) / SPI (≤10 MHz) / auxiliary I2C master |
| Supply voltage | Mostly 1.71V~3.6V |
| IO level | 1.8V / 3.3V |
| Temperature range | -40°C ~ +85°C (consumer) / +105°C (industrial) |
| Package | LGA-14/16/20 |

**Selection suggestions**:
- Beginner / teaching: MPU-6050, MPU-6500
- Low-power wearables: BMI270, LSM6DSO
- High-speed motion / drones: ICM-42688-P, ICM-42607-P
- Industrial applications: ICM-42688-P, LSM6DSV, BMI323


## 5. Hardware Connection

- Power: 1.8V or 3.3V; 100nF decoupling capacitor close to VDD
- I2C pull-ups: 4.7kΩ (400 kHz) or 2.2kΩ (1 MHz)
- AD0/SA0 pin: sets the I2C LSB address (MPU6050 default 0x68)
- INT: interrupt output, configurable push-pull / open-drain
- FSYNC: frame-sync input, supported on some chips
- AUX I2C: external magnetometer (MPU-6500 family only); the host reads only the 6-axis IMU while the IMU auto-reads the magnetometer
- Module versions: common GY-521 (MPU-6050), GY-6500 (MPU-6500); check the on-board LDO and level shifter


## 6. Communication Method

- I2C: standard / fast / fast+ three tiers
- SPI: 4-wire, mode 0 / 3
- Auxiliary I2C: MPU-6500 etc. can attach an external magnetometer; the host reads only the 6-axis data while the IMU fetches magnetometer data automatically into its registers
- Interrupts: multiple event sources routed to INT1/INT2


## 7. Initialization Flow

1. Configure the I2C/SPI bus
2. Read `WHO_AM_I` (MPU6050 = 0x68)
3. Soft-reset
4. Select clock source (internal / external)
5. Configure gyro range and accel range
6. Set ODR (sample-rate divider)
7. Configure DLPF / accelerometer filter
8. Configure FIFO mode
9. Configure interrupt mapping
10. Enable the sensors


## 8. Driver Interfaces

```python
class IMU6:
    def begin(self): ...
    def reset(self): ...
    def who_am_i(self): ...
    def read_gyro(self): ...          # gx, gy, gz, dps
    def read_accel(self): ...        # ax, ay, az, m/s²
    def read_raw(self): ...
    def set_gyro_range(self, dps): ...
    def set_accel_range(self, g): ...
    def set_sample_rate(self, hz): ...
    def set_dlpf(self, hz): ...
    def enable_fifo(self, mode): ...
    def read_fifo(self): ...
    def data_ready(self): ...
    def self_test(self): ...
    def enable_interrupt(self, src): ...
    def sleep(self): ...
    def wake(self): ...
    def read_temperature(self): ...
```


### 10.1 Complementary Filter (simple)

```text
angle = α · (angle + gyro * dt) + (1 - α) · accel_angle
α ≈ 0.98 (gyro weight)
```

### 10.2 Madgwick / Mahony

Open-source algorithms that deliver attitude from a 6-axis IMU alone (heading will drift without a magnetometer).

### 10.3 EKF / UKF

High-precision scenarios (drone flight controllers, industrial IMUs); typically fuses gyro + accel + (magnetometer or GPS) with an extended Kalman filter.


## 9. Data Format and Units

- Gyro unit: `°/s` (dps), scaled by the configured range sensitivity
- Accel unit: `g` or `m/s²`
- Byte order: MSB first
- Temperature sensor: internal 12-bit, used for compensation
- Update mechanism: FIFO watermark interrupt or polling
- Synchronized sampling: accelerometer and gyroscope are hardware-synchronized; no time alignment is needed for fusion


## 10. Calibration and Filtering

- Gyro bias: average N samples taken while stationary
- 6-sided accelerometer calibration: build a 3×3 correction matrix plus 3-axis offset
- Soft/hard-iron calibration (when a magnetometer is used): rotate to sample a 3D ellipsoid, fit center and shape
- Temperature compensation: capture bias curves at multiple temperatures and interpolate at runtime
- Persist calibration data to flash with a version number and CRC32


## 11. Interrupts and DMA

- Interrupt sources: data-ready, FIFO watermark, FIFO overflow, step, tap, free-fall, motion, wake-up, SMD
- FIFO: buffers N frames; the host reads them in batches to reduce system jitter
- DMA: recommended with SPI FIFO reads to minimize CPU usage


## 12. Error Handling

- WHO_AM_I error: poor chip soldering, wrong address, counterfeit chip
- Bus stuck: SDA/SCL short, oversized pull-ups
- Data unchanged for a long time: FIFO not drained or device lost power
- Angular-rate drift: temperature drift, mechanical stress
- Recovery: retry → soft-reset → re-initialize → report fault


## 13. Low Power

- Multiple sleep modes: Off / Suspend / Low-Power / Standby
- Wake sources: motion, step, tap, SMD
- Wake-up latency: ~10 ms
- Registers may need to be reconfigured after wake-up


## 14. Example Code

```python
class IMU6:
    def __init__(self, bus, address=0x68):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def read_accel(self):
        """ax, ay, az in m/s²."""
        pass

    def read_gyro(self):
        """gx, gy, gz in °/s."""
        pass

    def set_gyro_range(self, dps):
        pass

    def set_accel_range(self, g):
        pass

    def set_sample_rate(self, hz):
        pass


imu = IMU6(i2c, address=0x68)
imu.begin()
imu.set_gyro_range(1000)   # ±1000 dps
imu.set_accel_range(8)     # ±8g
imu.set_sample_rate(200)   # 200 Hz

while True:
    ax, ay, az = imu.read_accel()
    gx, gy, gz = imu.read_gyro()
    print("a=(%.2f,%.2f,%.2f) g=(%.1f,%.1f,%.1f)" % (ax, ay, az, gx, gy, gz))
```


## 15. Debugging Methods

1. Stationary reading: gyro ≈ 0, accel Z ≈ 9.8 m/s²
2. Flip the module: check each axis matches the right-hand rule
3. Slow rotation: gyro should track, return to 0 when stopped
4. Fast rotation: check whether the range saturates
5. Stationary for several hours: observe whether the gyro bias drifts
6. Temperature change: monitor output from -10°C to +60°C


## 16. Frequently Asked Questions

- **MPU-6050 I2C unresponsive**: CS pin not pulled high (MPU6050 defaults to SPI; CS high = I2C), or pull-ups missing
- **Attitude diverges**: accelerometer weight too high in the fusion, or gyro bias not calibrated
- **Heading drifts**: a 6-axis IMU alone cannot provide absolute heading — add a magnetometer
- **Data spikes**: SPI timing error, CS not de-asserted in time, wrong clock mode
- **Hot module**: power reversed or short circuit


## 17. References

- InvenSense MPU-6000/MPU-6050 Register Map
- TDK ICM-42688-P datasheet
- ST AN5040 LSM6DS application note
- Sebastian Madgwick — "An efficient orientation filter for inertial sensors"
- Mahony — "Complementary filter design"