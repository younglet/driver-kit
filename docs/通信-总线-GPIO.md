---
title: GPIO
description: DriverKit · 通信分类下的 GPIO 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。
keywords: GPIO,通信,总线,DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试,GPIO,上下拉,中断,推挽输出
category: 通信
field: 总线
module: GPIO
---
# GPIO


## 1. 模块概览

GPIO（General Purpose Input/Output，通用输入输出）是 MCU 与外界交互的最基本接口。所有数字接口（I2C、SPI、UART 等）的基础。

应用：
- 控制 LED、蜂鸣器、继电器；
- 读取按键、电平信号；
- 模拟接口（I2C、SPI、UART、PWM）；
- 中断触发（外部中断）；
- 唤醒（低功耗休眠）；
- ADC、DAC 输入输出；
- 触摸检测（部分 MCU）；
- 片上系统互连。


## 2. 工作原理与适用场景

每个 GPIO 引脚内部结构包含：
- 输入缓冲器（TTL/CMOS 兼容，施密特触发器）；
- 输出驱动器（推挽 / 开漏 / 开集）；
- 上拉/下拉电阻（可配置）；
- 控制逻辑（方向、数据寄存器）；
- 多路复用器（连接到外设功能 AF）。

输出模式：
- **推挽**：高低电平均主动驱动，电流能力强；
- **开漏**：低电平主动驱动，高电平需要外部上拉；
- **开集**：与开漏类似（针对双极型晶体管）；
- **仅输入**：用作 ADC 等模拟输入。

输入模式：
- **浮空**：高阻态；
- **上拉**：内部连接到 VDD；
- **下拉**：内部连接到 GND。


## 3. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 数量 | 每个 MCU 不同 |
| 工作电压 | 1.8V / 3.3V / 5V |
| 输出电流 | mA（推挽典型 4~25 mA） |
| 拉电阻 | kΩ（50~100kΩ 内部上拉下拉） |
| 翻转速度 | MHz（快慢 IO 不同） |
| 中断能力 | 上升沿 / 下降沿 / 双边沿 / 电平 |
| 唤醒能力 | 部分 GPIO 支持深度休眠唤醒 |
| 复用功能 | UART、SPI、I2C、ADC、PWM、CAN 等 |
| 5V 兼容 | 部分 MCU（Arduino、ESP32 部分） |
| 保护 | ESD、续流 |

**选型建议**：
- 入门：Arduino UNO、ESP32、STM32F1；
- 高性能：STM32F4、ESP32-S3、Raspberry Pi；
- 超低功耗：STM32L、ESP32-C3；
- AI 推理：Raspberry Pi、Jetson Nano；
- GPIO 扩展：MCP23017（I2C）、74HC595（SPI）。


## 4. 硬件连接

### 5.1 输入

- **施密特触发器**：抗抖动；
- **上下拉**：浮空输入易受干扰，按键需上拉或下拉；
- **保护**：TVS 防静电；
- **限流**：大电流输入需串联电阻；
- **电平匹配**：3.3V MCU 接 5V 信号用电阻分压或电平转换。

### 5.2 输出

- **推挽**：可同时输出高低；
- **开漏**：低主动、高靠外部上拉（I2C、线与）；
- **电流限制**：超规格会损坏 GPIO；
- **感性负载**：续流二极管；
- **总电流限制**：MCU 通常有总电流限制（如 200 mA）。

### 5.3 多路复用

- AF0~AF15：每个引脚有多种功能；
- 配置前查数据手册；
- 不能同时启用两种功能。

### 5.4 中断和唤醒

- **外部中断**：触发后进入 ISR；
- **唤醒**：从深度休眠唤醒 MCU；
- **去抖**：硬件 RC 或软件延时。


## 5. 通信方式

- 单线：GPIO 模拟（UART、WS2812 等）；
- 总线：作为外设功能的引脚（I2C、SPI、UART、PWM、CAN 等）；
- 并行：8/16/32 位数据总线（高速传输）；
- 中断：事件触发。


## 6. 初始化流程

1. 配置 RCC（时钟）；
2. 配置 GPIO 寄存器（模式、速度、上拉下拉、复用功能）；
3. 配置中断（NVIC、EXTI）；
4. 设置初始电平；
5. 启动。


## 7. 驱动接口

```python
class GPIO:
    """基础 GPIO。"""
    def __init__(self, pin, mode):
        self.pin = pin
        self.mode = mode  # INPUT/OUTPUT

    def begin(self):
        pass

    def high(self):
        pass

    def low(self):
        pass

    def value(self):
        pass

    def toggle(self):
        pass


class ExtInt:
    """外部中断。"""
    def __init__(self, pin, trigger):
        self.pin = pin
        self.trigger = trigger  # RISING/FALLING/BOTH/LOW/HIGH

    def begin(self, callback):
        """callback: 中断回调函数。"""
        pass

    def disable(self):
        pass

    def enable(self):
        pass


class ExpanderGPIO:
    """MCP23017 GPIO 扩展。"""
    def __init__(self, bus, address=0x20):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def pin_mode(self, pin, mode):
        pass

    def digital_write(self, pin, value):
        pass

    def digital_read(self, pin):
        pass

    def digital_write_word(self, value):
        """16-bit 写入。"""
        pass
```


## 8. 数据格式与单位

- 单个 GPIO：布尔（0/1）；
- 端口：多位（如 8/16/32 bit）；
- 模拟扩展（CD4051）：通道号（0~15）；
- 中断事件：回调函数。


## 9. 校准与滤波

### 10.1 硬件去抖

```text
按键 → 10nF 电容 → GND
按键 → 100Ω → MCU GPIO
```

### 10.2 软件去抖

```python
def debounce(pin, last_state, last_time, stable_time_ms=20):
    current = pin.value()
    if current != last_state:
        last_time = time.ticks_ms()
        last_state = current
    elif time.ticks_diff(time.ticks_ms(), last_time) > stable_time_ms:
        return current, last_state, last_time
    return None, last_state, last_time
```


## 10. 中断与 DMA

- 触发方式：上升沿、下降沿、双边沿、低电平、高电平；
- 优先级：NVIC 配置；
- 中断嵌套：高优先级可中断低优先级；
- ISR：保持简短，避免阻塞；
- 去抖：硬件 RC 或软件延时。


## 11. 错误处理

- **电平错**：引脚配置错、电平不匹配；
- **GPIO 烧毁**：超电流或静电；
- **中断风暴**：电平触发 + 抖动 → 软件限频；
- **总线冲突**：多个设备共享 GPIO；
- **浮空输入**：上下拉未配置。


## 12. 低功耗

- 深度休眠后只能由特殊 GPIO 唤醒；
- ESP32：RTC_GPIO 可唤醒深度休眠；
- STM32：WKUP 引脚唤醒 Standby；
- 中断触发后执行唤醒回调。



- 未使用的 GPIO 配置为模拟输入（最低功耗）；
- 不用的外设关闭时钟；
- 唤醒源用 RTC GPIO；
- 深度休眠时除唤醒引脚外其他关闭。


## 13. 示例代码

```python
led = GPIO(pin, OUTPUT)
button = GPIO(pin, INPUT_PULLUP)
btn_int = ExtInt(button_pin, FALLING)

def on_press():
    led.toggle()

btn_int.begin(on_press)
while True:
    time.sleep_ms(100)
```


## 14. 调试方法

1. 测引脚电压（万用表）；
2. 测波形（示波器、逻辑分析仪）；
3. 翻转 LED 测试输出；
4. 按键输入测试读取；
5. 检查寄存器配置；
6. 长时间运行测电流。


## 15. 常见问题

- **不响应**：引脚配置错、电平不匹配；
- **GPIO 烧毁**：超电流、静电；
- **中断不触发**：触发方式错、未使能中断；
- **中断风暴**：抖动未消除；
- **电平跳动**：长线干扰，需屏蔽/上拉/驱动能力。


## 16. 参考资料

- 各 MCU 数据手册（ST、Espressif、NXP、Raspberry Pi）
- STM32 标准外设库 / HAL 库
- ESP-IDF GPIO 驱动文档
- Arduino GPIO 参考
- 74HC595 / MCP23017 数据手册

## 17. 常见平台和参考价格

> 价格仅作预算参考。

### 3.1 MCU 内置 GPIO

| MCU 系列 | GPIO 数量 | 特性 | 芯片参考价 |
|---|---|---|---:|
| STM32F0 | 14~51 | 主流 ARM Cortex-M0 | ¥3~15 |
| STM32F1 | 26~112 | 主流 ARM Cortex-M3 | ¥5~25 |
| STM32F4 | 50~176 | 高性能 Cortex-M4 | ¥10~50 |
| STM32H7 | 80~168 | 高性能 Cortex-M7 | ¥20~80 |
| STM32G0 | 14~44 | 低功耗 Cortex-M0+ | ¥3~15 |
| STM32L0 | 14~51 | 超低功耗 Cortex-M0+ | ¥5~20 |
| STM32L4 | 27~83 | 低功耗 Cortex-M4 | ¥10~40 |
| ESP8266 | 16 | WiFi + GPIO | ¥5~15 |
| ESP32 | 34 | WiFi + BLE + GPIO | ¥8~25 |
| ESP32-S3 | 45 | 升级版 | ¥10~25 |
| ESP32-C3 | 22 | RISC-V 单核 | ¥5~15 |
| ESP32-H2 | 22 | 802.15.4 | ¥5~15 |
| Raspberry Pi Pico RP2040 | 30 | 双核 Cortex-M0+ | ¥5~15 |
| Arduino UNO (ATmega328P) | 20 | 经典 8-bit | ¥10~25（板） |
| Arduino Mega (ATmega2560) | 54 | 8-bit 大板 | ¥30~60（板） |
| Arduino Nano / Pro Mini | 14~22 | 小型 8-bit | ¥10~30（板） |
| Raspberry Pi 4 GPIO | 40 | Linux SBC | ¥300~600（板） |
| Raspberry Pi Zero | 26 | 小型 SBC | ¥100~200（板） |
| NVIDIA Jetson 系列 | 40+ | AI SBC | ¥500~5000（板） |
| NXP i.MX RT | 多个 | 跨界 MCU | ¥10~50 |
| GD32 | 类似 STM32 | 国产替代 | ¥3~15 |
| CH32V | 多个 | RISC-V 国产 | ¥3~15 |
| BL702 / BL808 | 多个 | 博流智能 | ¥5~15 |

### 3.2 GPIO 扩展芯片

| 型号 | 类型 | 接口 | 特点 | 芯片参考价 | 模块参考价 |
|---|---|---|---|---:|---:|
| 74HC595 | 8 位串行入并行出 | SPI | 经典扩展 | ¥0.5~2 | ¥2~8 |
| 74HC164 | 8 位串行入并行出 | SPI | 移位寄存器 | ¥0.5~2 | ¥2~8 |
| 74HC165 | 8 位并行入串行出 | SPI | 输入扩展 | ¥1~3 | ¥3~10 |
| 74HC4067 | 16 选 1 模拟开关 | 数字 | 模拟扩展 | ¥2~5 | ¥3~10 |
| CD4051 | 8 选 1 模拟开关 | 数字 | 模拟扩展 | ¥1~3 | ¥3~10 |
| CD4052 | 双 4 选 1 模拟开关 | 数字 | 模拟扩展 | ¥1~3 | ¥3~10 |
| CD4067 | 16 选 1 模拟开关 | 数字 | 模拟扩展 | ¥2~5 | ¥3~10 |
| MCP23017 | 16 位 I/O 扩展 | I2C | 经典 | ¥3~8 | ¥5~15 |
| MCP23008 | 8 位 I/O 扩展 | I2C | 简化 | ¥2~5 | ¥3~10 |
| MCP23S17 | 16 位 I/O 扩展 | SPI | SPI 版本 | ¥3~8 | ¥5~15 |
| PCA9535 | 16 位 I/O 扩展 | I2C | TI | ¥3~8 | ¥5~15 |
| PCA9555 | 16 位 I/O 扩展 | I2C | TI | ¥3~8 | ¥5~15 |
| PCA9539 | 16 位 I/O 扩展 | I2C | TI | ¥3~8 | ¥5~15 |
| PCA9554 | 8 位 I/O 扩展 | I2C | TI | ¥2~5 | ¥3~10 |
| TCA9534 | 8 位 I/O 扩展 | I2C | TI | ¥2~5 | ¥3~10 |
| TCA6424 | 24 位 I/O 扩展 | I2C | 大扩展 | ¥5~12 | ¥10~20 |
| SX1509 | 16 位 I/O 扩展 + LED 驱动 | I2C | 多功能 | ¥5~12 | ¥10~25 |
| AW9523 | 16 位 I/O 扩展 + LED 驱动 | I2C | 多功能 | ¥3~8 | ¥5~15 |
| PCF8574 | 8 位 I/O 扩展 | I2C | TI 老款 | ¥2~5 | ¥3~10 |
| PCF8575 | 16 位 I/O 扩展 | I2C | TI 老款 | ¥3~8 | ¥5~15 |
