---
layout: home
title: Embedded Hardware Driver Documentation
description: DriverKit · Driver-Pie — A practical embedded hardware driver documentation library. A quick-reference manual covering principles, selection, wiring, driver code, and debugging for 53 common modules (sensors, actuators, bus protocols, wireless, displays, power, etc.).
keywords: DriverKit,Driver-Pie,embedded,hardware,driver,sensor,actuator,I2C,SPI,UART,LoRa,IMU,gyroscope,accelerometer,OLED,robot,drone,IoT,STM32,Arduino,ESP32,selection,wiring,principle,code example,FAQ,datasheet

hero:
  name: DriverKit
  text: Embedded Hardware Driver Library
  tagline: A quick-reference manual for 53 common modules — Principles · Selection · Wiring · Drivers · Debugging
  image:
    src: /favicon.svg
    alt: DriverKit · Driver-Pie
  actions:
    - theme: brand
      text: Start Browsing
      link: /分类总览
    - theme: alt
      text: GitHub
      link: https://github.com/

features:
  - icon: 🧭
    title: Sensors
    details: 17 modules — Gyroscope, Accelerometer, IMU, Magnetometer, Encoder, Temp/Humidity, Pressure, Gas, Light, Ultrasonic, IR/Laser Distance, Obstacle, Touch, Camera, Color.
  - icon: ⚙️
    title: Actuators
    details: 11 modules — DC / Brushless / Stepper / Servo motors, motor drivers, relays, solenoid valves, pumps, LEDs, buzzers.
  - icon: 📡
    title: Communication
    details: 12 modules — GPIO, I2C, SPI, UART, RS485, CAN, USB, Modbus, BLE, Wi-Fi, LoRa, GNSS.
  - icon: 🖥️
    title: Display
    details: 3 modules — OLED, TFT LCD, E-Paper.
  - icon: 🎚️
    title: Input
    details: 3 modules — Button, rotary encoder, joystick.
  - icon: 💾
    title: Storage
    details: 3 modules — EEPROM, Flash, SD card.
  - icon: ⚡
    title: Power
    details: 3 modules — Voltage monitoring, current monitoring, Li-Ion charger.
  - icon: 🕐
    title: Clock
    details: 1 module — RTC real-time clock.
---

## ✨ Why DriverKit

- A **must-have hardware quick-reference** for robotics, drones and IoT development.
- **No more selection headaches** — each module has a parts table, reference prices, key parameters and use-case notes.
- **No more flipping datasheets for wiring** — electrical caveats, pull-ups, termination resistors and level shifting are all spelled out.
- **Driver code ready to use** — Python-style examples with a unified begin / read / write / calibrate API across platforms.
- **Debug with confidence** — common errors, debugging methods and FAQ included.

## 📖 How to use

- **By module**: the left sidebar lists all 53 modules grouped into 8 categories.
- **By scenario**: [Category Overview](./分类总览) provides a complete index table.
- **By keyword**: the search box supports Chinese and English fuzzy matching.
- **Offline reading**: `npm run docs:build` produces a fully static site, deployable locally or on an intranet.

## 📄 Content quality

- ✅ Every document follows the **standard 17-section structure**.
- ✅ Prices are tagged "for budgeting only"; key specs reference the original datasheet.
- ✅ All content is compiled from public chip manuals, application notes and community practice.
- ✅ Continuously maintained; contributions via Issue / PR are welcome.

---

**MIT License** · Updated continuously · See "Last updated" at the bottom of each page.