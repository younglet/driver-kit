---
title: 9-Axis IMU
description: "DriverKit — 9-Axis IMU (under Sensors): working principles, common part numbers & prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: 9-Axis IMU,Sensors,Attitude,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging
category: Sensors
field: Attitude
module: 9-Axis IMU
---
# 9-Axis IMU


## 1. Module Overview

A 9-axis IMU integrates a 3-axis accelerometer, a 3-axis gyroscope, and a 3-axis magnetometer. It can output absolute attitude (roll / pitch / yaw), i.e. it provides heading information, not just relative rotation.

It is suitable for drones, robots, AR/VR, camera gimbals, motion capture, and positioning where absolute orientation or long-term stable heading is required.


## 2. Working Principle and Use Cases

- Accelerometer: measures specific force and provides pitch/roll reference
- Gyroscope: measures angular velocity and gives short-term attitude change
- Magnetometer: measures the Earth's magnetic field and provides absolute heading reference
- Fusion algorithm: Mahony / Madgwick / EKF / UKF combine the three data streams into attitude

Typical applications:
- Drone flight controller (pitch / roll / yaw control)
- Robot localization
- AR/VR head tracking
- Electronic compass
- Camera / gimbal stabilization


## 3. Common Part Numbers and Reference Prices

> Prices are for budgeting only.

| Model | Interface | Key Features | Bare-chip Price | Module Price |
|---|---|---|---:|---:|
| MPU-9150 | I2C | Early 9-axis, EOL | $10~25 | $15~40 |
| MPU-9250 | I2C/SPI | Classic, abundant docs | $10~30 | $15~50 |
| MPU-9255 | I2C/SPI | Successor to MPU-9250 | $13~35 | $18~55 |
| ICM-20948 | I2C/SPI | High-end 9-axis | $20~60 | $40~100 |
| ICM-42688-P + AK09918 | I2C/SPI | High-performance combo | $25~75 | $50~125 |
| LSM9DS1 | I2C/SPI | ST classic 9-axis | $13~35 | $20~60 |
| ISM330DHCX + IIS2MDC | I2C/SPI | Industrial-grade combo | $25~70 | $50~120 |
| BMI160 + BMM150 | I2C/SPI | Bosch 9-axis | $15~45 | $30~80 |
| BMI270 + BMM150 | I2C/SPI | Newer low-power | $20~55 | $40~90 |
| BNO055 | I2C/UART/SPI | Built-in fusion algorithm | $20~60 | $35~100 |
| BNO085 | I2C/UART/SPI | New-generation built-in fusion | $25~75 | $40~125 |
| BHI260AP | I2C/SPI | Built-in sensor fusion + AI | $30~90 | $60~150 |
| BMM150 | I2C | Magnetometer standalone | $5~12 | $8~20 |
| QMC5883L + MPU-6050 module | I2C | 9-axis module | - | $8~25 |


## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Gyro range | ±125 ~ ±2000 dps |
| Accel range | ±2 ~ ±16 g |
| Magnetometer range | ±1300 µT (Gauss) ~ ±4900 µT |
| Magnetometer resolution | 13 ~ 16 bit |
| Gyro noise density | °/s/√Hz |
| Data rate | 1 Hz to tens of kHz |
| FIFO | 1KB~4KB |
| Interrupts | Data-ready, motion, magnetic overflow, wake-up, SMD |
| Interface | I2C / SPI / some include UART |
| Supply voltage | 1.71V~3.6V |

**Selection suggestions**:
- Beginner / teaching: MPU-9250, LSM9DS1
- High-end drones: ICM-20948, ICM-42688-P + AK09918
- Simplified integration: BNO055 / BNO085 (built-in fusion, output quaternion / Euler)
- AI / low-power: BHI260AP (built-in sensor fusion + AI co-processor)
- Industrial grade: ISM330DHCX + IIS2MDC


## 5. Hardware Connection

- Power: 1.8V or 3.3V; VDD and VDDIO supplied separately
- I2C pull-ups: 4.7kΩ
- AD0/SA0: sets the I2C LSB address
- INT: interrupt output
- Magnetometer placement: keep away from motors, batteries, magnetic materials; avoid running traces near high-current lines
- Module selection: some modules place the magnetometer on a sub-board (e.g. BMM150) to reduce interference on the main PCB


## 6. Communication Method

- I2C: standard / fast / fast+
- SPI: 4-wire, mode 0 / 3
- Some chips support auxiliary I2C (e.g. MPU-9250's internal magnetometer over auxiliary I2C)
- BNO055 / BNO085 support UART for a simplified interface


## 7. Initialization Flow

1. Verify all sub-sensor IDs
2. Soft-reset
3. Configure accel / gyro range and ODR
4. Configure magnetometer range and ODR
5. Configure FIFO and interrupts
6. Start measurement


## 8. Driver Interfaces

```python
class IMU9:
    def begin(self): ...
    def reset(self): ...
    def read_accel(self): ...
    def read_gyro(self): ...
    def read_mag(self): ...        # mx, my, mz in µT
    def read_quaternion(self): ...
    def read_euler(self): ...
    def set_gyro_range(self, dps): ...
    def set_accel_range(self, g): ...
    def set_mag_range(self): ...
    def set_sample_rate(self, hz): ...
    def calibrate_mag(self): ...   # hard/soft-iron calibration
    def data_ready(self): ...
    def sleep(self): ...
    def wake(self): ...
```


### 11.1 Madgwick 9-axis variant

Fuses gyro + accel + magnetometer to produce absolute attitude.

### 11.2 EKF 15-state

Common in engineering-grade flight controllers; estimates gyro bias as part of the state.

### 11.3 BNO055 / BNO085 built-in fusion

No need to implement algorithms yourself — just read quaternions, offloading work from the host.


## 9. Data Format and Units

- Acceleration: `g` or `m/s²`
- Gyro: `°/s`
- Magnetometer: `µT` (Tesla) or mGauss (milli-Gauss)
- Quaternion: q = (w, x, y, z), unit quaternion
- Euler: roll / pitch / yaw, in degrees
- Note: magnetic north is not true north — apply declination


## 10. Calibration and Filtering

The magnetic field is a vector in space. Ferromagnetic materials around the module cause:
- **Hard-iron distortion**: constant offset
- **Soft-iron distortion**: ellipsoidal deformation

Calibration steps:
1. Slowly rotate the module around all three axes (figure-8 or full-sphere motion) and collect N samples
2. Fit the ellipsoid center (hard-iron offset)
3. Fit the ellipsoid shape to derive the correction matrix (soft-iron compensation)
4. Save the correction parameters to flash

Reference simple implementations such as Mahony's `MagCal` ellipsoid-fitting algorithm.


## 11. Interrupts and DMA

- Interrupt sources: accel / gyro / mag data-ready, FIFO watermark, motion, magnetic anomaly
- FIFO: multi-sensor data packed into frames; the host reads frame-by-frame
- BNO085 supports a sensor hub to attach external sensors and unify the output


## 12. Error Handling

- Magnetometer overflow: field too strong (e.g. near a magnet); check the magnetic-anomaly interrupt
- Attitude jumps: magnetic interference — trigger anomaly detection and reduce magnetometer weight
- Gyro drift: long-term use requires the EKF to estimate bias
- I2C / SPI errors: bus recovery, retry, reset


## 13. Low Power

- Tiered sleep: shut down only some sensors
- Wake sources: accelerometer motion interrupt
- BHI260AP can keep sensor fusion running while staying low-power


## 14. Example Code

```python
class IMU9:
    def __init__(self, bus, address=0x68):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def read_accel(self):   pass  # ax, ay, az
    def read_gyro(self):    pass  # gx, gy, gz
    def read_mag(self):     pass  # mx, my, mz
    def read_quaternion(self): pass  # w, x, y, z


imu = IMU9(i2c, address=0x68)
imu.begin()

while True:
    ax, ay, az = imu.read_accel()
    gx, gy, gz = imu.read_gyro()
    mx, my, mz = imu.read_mag()
    print("a=(%.2f,%.2f,%.2f) g=(%.1f,%.1f,%.1f) m=(%.1f,%.1f,%.1f)" %
          (ax, ay, az, gx, gy, gz, mx, my, mz))
```


## 15. Debugging Methods

1. Stationary gyro reads ≈ 0
2. Stationary accel: Z ≈ 9.8 m/s², X/Y ≈ 0
3. Stationary magnetometer: horizontal Earth field component ~ 20~50 µT at your location
4. Rotate the module and confirm the gyro tracks
5. Slowly rotate around the Z axis and observe yaw changes
6. Move away from computers, batteries, and iron fixtures to test magnetic stability


## 16. Frequently Asked Questions

- **Magnetometer readings jump**: nearby speaker, motor, magnet, or battery
- **Wrong heading**: declination not compensated, or module too close to an interference source
- **Attitude drifts**: gyro bias not calibrated
- **I2C error**: MPU-9250 default 0x68; some modules ship with wrong address soldered
- **Magnetometer saturates**: too close to a strong magnetic field; calibration fails


## 17. References

- InvenSense MPU-9250 Register Map
- TDK ICM-20948 datasheet
- Bosch BNO055 datasheet
- Mahony, Madgwick papers
- Hillcrest Labs / FIBA BNO algorithm documentation