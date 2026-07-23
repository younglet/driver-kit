# LED


## 1. 模块概览

LED（Light Emitting Diode，发光二极管）是一种电致发光的半导体器件。常见于：
- 指示灯；
- 装饰灯；
- 显示屏；
- LED 灯带；
- 路灯/照明；
- 汽车灯；
- 植物照明；
- 紫外消毒、UV 固化；
- 红外通信/红外遥控。

类型：
- **指示 LED**：单色、低功率（5mm）；
- **功率 LED**：高亮度（1W、3W、5W）；
- **RGB LED**：红绿蓝独立控制；
- **RGBW LED**：RGB + 白光；
- **可寻址 LED**：内置驱动 IC（WS2812、SK6812、APA102）；
- **LED 灯带**：5050/2835 LED 串联；
- **COB LED**：高密度集成；
- **点阵屏**：8x8 / 16x32 等；
- **UV LED**：365nm / 395nm；
- **IR LED**：850nm / 940nm。


## 2. 工作原理与适用场景

半导体 PN 结正向偏置时，电子与空穴复合释放光子。光的波长取决于半导体材料（带隙）。

基本特性：
- 单向导通；
- 阈值电压（Vf）：1.8V~3.5V（与颜色和材料相关）；
- 正向电流（If）：典型 5~20 mA（指示）或 100~700 mA（功率）；
- 亮度与 If 成正比（在允许范围内）。

颜色与波长：
- 红外（IR）：850 nm、940 nm；
- 红光：620~630 nm；
- 黄光：580~590 nm；
- 绿光：520~530 nm；
- 蓝光：460~470 nm；
- 白光（蓝光+黄荧光粉）：5000K~6500K；
- UV：365 nm、395 nm。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 指示 LED（5mm / 3mm）

| 类型 | 颜色 | 数量 | 参考价 |
|---|---|---|---:|
| 5mm LED | 红/绿/黄/蓝/白 | 100 个 | ¥5~15 |
| 3mm LED | 多种 | 100 个 | ¥3~10 |
| 闪烁 LED | 多色 | 50 个 | ¥8~20 |
| 慢闪 LED | 多色 | 50 个 | ¥10~25 |
| 多色 LED（红绿蓝三色） | 三色 | 50 个 | ¥15~30 |

### 3.2 功率 LED

| 型号 | 功率 | 颜色 | 参考价 |
|---|---|---|---:|
| 1W LED（仿流明） | 1W | 白/暖白 | ¥0.5~2 |
| 3W LED（高功率） | 3W | 白/暖白 | ¥2~5 |
| 5W LED | 5W | 白/暖白 | ¥3~8 |
| 10W LED | 10W | 白/暖白 | ¥5~15 |
| 20W LED | 20W | 白/暖白 | ¥10~25 |
| 50W LED | 50W | 白/暖白 | ¥25~60 |
| 100W LED | 100W | 白/暖白 | ¥40~100 |
| COB LED 10W | 10W | 白/暖白 | ¥5~15 |
| COB LED 50W | 50W | 白/暖白 | ¥15~40 |
| COB LED 100W | 100W | 白/暖白 | ¥30~80 |

### 3.3 RGB / RGBW LED

| 型号 | 类型 | 接口 | 参考价 |
|---|---|---|---:|
| 共阳 RGB LED | 5mm | 4 引脚 | ¥0.3~1 |
| 共阴 RGB LED | 5mm | 4 引脚 | ¥0.3~1 |
| RGB 5050 LED | 贴片 | 4 引脚 | ¥0.3~1 |
| RGBW 5050 LED | 贴片 | 5 引脚 | ¥0.5~1.5 |
| WS2812B | 可寻址 | 单线 | ¥0.5~1.5 |
| WS2812B 灯带 | 灯带 | 单线 | ¥3~10 / 米 |
| WS2812B 环形 | 12/16/24 颗 | 单线 | ¥5~20 |
| SK6812 | 可寻址 RGBW | 单线 | ¥0.5~1.5 |
| SK6812 灯带 | 灯带 | 单线 | ¥5~15 / 米 |
| APA102 | 可寻址 SPI | 双线 | ¥0.8~2 |
| APA102 灯带 | 灯带 | SPI | ¥5~15 / 米 |
| WS2801 | 可寻址 SPI | 双线 | ¥1~3 |
| LPD8806 | 可寻址 SPI | 双线 | ¥1~3 |
| TLC59401 | 可寻址 PWM | 多线 | ¥2~5 |
| HD107S | 可寻址 | 单线 | ¥0.8~2 |

### 3.4 LED 矩阵和灯条

| 类型 | 型号 | 参考价 |
|---|---|---:|
| 8x8 LED 矩阵 | 1588BS | ¥5~15 |
| 8x32 RGB 矩阵 | HUB75 | ¥30~80 |
| 16x32 RGB 矩阵 | HUB75 | ¥50~150 |
| 32x64 RGB 矩阵 | HUB75 | ¥200~600 |
| 16x16 RGB 矩阵 | HUB75 | ¥30~80 |
| WS2812 矩阵 | 8x8 / 16x16 | ¥30~150 |
| WS2812 圆形灯板 | 1/8/12/16/24 颗 | ¥5~30 |
| WS2812 柔性灯带 | 30/60/144 颗/米 | ¥3~15 / 米 |

### 3.5 UV 和 IR LED

| 型号 | 波长 | 功率 | 参考价 |
|---|---|---|---:|
| UV LED 365nm | 365nm | 3W | ¥10~30 |
| UV LED 395nm | 395nm | 3W | ¥5~15 |
| UV LED 405nm | 405nm | 3W | ¥5~15 |
| UV 灯管 | 254nm | 8-30W | ¥30~150 |
| IR LED 850nm | 850nm | 3W | ¥5~15 |
| IR LED 940nm | 940nm | 3W | ¥5~15 |
| IR LED 阵列 | 850nm | 10W+ | ¥20~80 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 颜色/波长 | nm（决定颜色和用途） |
| 正向电压 Vf | V |
| 正向电流 If | mA |
| 亮度 | mcd、lumens |
| 视角 | 度 |
| 功率 | W（功率 LED） |
| 色温 K | 暖白/正白/冷白 |
| 显色指数 CRI | Ra（高显色 90+） |
| 工作温度 | -40 ~ 80°C |
| 寿命 | 25,000~50,000 小时 |

**选型建议**：
- 指示灯：5mm LED（红绿黄蓝）+ 限流电阻；
- 装饰：WS2812B 灯带；
- 显示：HUB75 矩阵 + 千兆网口驱动；
- 照明：COB LED + 恒流驱动；
- 植物照明：紫光（660nm + 450nm）；
- UV 固化：365nm UV LED；
- 红外遥控：940nm IR LED。


## 5. 硬件连接

### 5.1 限流电阻

```text
R = (Vcc - Vf) / If
例：Vcc=5V, Vf=2.0V, If=10mA
R = (5 - 2.0) / 0.01 = 300 Ω
```

### 5.2 功率 LED

需要恒流驱动（CC 驱动器）：
- 1W LED：350 mA；
- 3W LED：700 mA；
- 5W LED：1000 mA；
- 10W LED：1200 mA；
- 注意散热（铝基板、风冷）。

### 5.3 WS2812B

- 单线通信（NZR/归零码）；
- 800 kbps；
- 数据电平 5V（部分支持 3.3V）；
- 多个串联时需保证 5V 电源容量（每颗 60 mA 全亮）；
- 长距离传输需加信号放大器。

### 5.4 APA102

- SPI 双线（数据 + 时钟）；
- 高频更新；
- 比 WS2812 更稳定，长距离更可靠。

### 5.5 LED 矩阵（HUB75）

- 常用驱动：HX1230、FM6126、ICN2038；
- 数据口：R1/G1/B1/R2/G2/B2 + A/B/C/D（行选）+ CLK + LAT + OE；
- 扫描 1/4、1/8、1/16 等；
- 高密度需要千兆网口或 FPGA 驱动。


## 6. 通信方式

- **GPIO + 限流电阻**：单色 LED；
- **PWM**：亮度调节（频率 > 200 Hz 避免闪烁）；
- **单线 NZR（WS2812B）**：单线可寻址；
- **SPI（APA102、WS2801）**：双线可寻址；
- **HUB75**：RGB 矩阵协议；
- **DMX512**：舞台灯；
- **I2C**：LP8860 等 LED 驱动芯片。


## 7. 初始化流程

1. 接线（VCC/GND + 信号）；
2. 配置 GPIO / PWM / SPI；
3. 上电初始化；
4. 启动控制。


## 8. 驱动接口

```python
class LED:
    def __init__(self, pin):
        self.pin = pin

    def on(self):
        self.pin.high()

    def off(self):
        self.pin.low()

    def toggle(self):
        self.pin.toggle()


class PWMLED:
    def __init__(self, pwm):
        self.pwm = pwm

    def set_brightness(self, percent):
        """0~100。"""
        self.pwm.duty(percent)


class RGBLED:
    def __init__(self, r_pwm, g_pwm, b_pwm):
        self.r = r_pwm
        self.g = g_pwm
        self.b = b_pwm

    def set_color(self, r, g, b):
        self.r.duty(r)
        self.g.duty(g)
        self.b.duty(b)


class WS2812:
    def __init__(self, pin, n_leds):
        self.pin = pin
        self.n = n_leds
        self.buf = bytearray(n_leds * 3)

    def begin(self):
        pass

    def set_pixel(self, i, r, g, b):
        idx = i * 3
        # WS2812B GRB 顺序
        self.buf[idx] = g
        self.buf[idx+1] = r
        self.buf[idx+2] = b

    def set_all(self, r, g, b):
        for i in range(self.n):
            self.set_pixel(i, r, g, b)

    def show(self):
        """发送数据（由具体驱动实现）。"""
        pass
```



- 频率 > 200 Hz 避免人眼可见闪烁；
- 100 Hz 适合电影/游戏（避免与摄像机同步闪烁）；
- 呼吸效果：缓慢正弦波；
- 模拟调光：DC 电流调节（精度更高）；


## 9. 数据格式与单位

- 单色：布尔或 PWM 占空比；
- RGB：3 个 8-bit 值（0~255）；
- RGBW：4 个 8-bit 值；
- WS2812：24-bit GRB；
- APA102：32-bit（5-bit 整体 + 3×8-bit RGB + 5-bit 整体）；
- HUB75：扫描式，行选 + R/G/B 数据。


## 10. 错误处理

- **不亮**：电源反接、限流电阻过大、信号未输出；
- **烧毁**：限流电阻过小、电流过大、散热不足；
- **颜色错**：RGB 接错、共阴/共阳错；
- **WS2812 颜色错**：数据顺序（GRB vs RGB）；
- **WS2812 信号失真**：电压不足、长距离传输、时序不准；
- **闪烁**：PWM 频率过低、电源电流不够。



- 强光 LED 不可直视（视网膜伤害）；
- UV LED 不可照射皮肤或眼睛；
- 大功率 LED 注意散热（防火）。


## 11. 低功耗

- 暗态耗电（部分 LED 有微亮）；
- 关闭电源降低静态；
- PWM 调光节能。


## 12. 示例代码

```python
# RGB LED
led = RGBLED(r_pwm, g_pwm, b_pwm)
led.set_color(255, 0, 0)  # 红色
time.sleep_ms(1000)
led.set_color(0, 255, 0)  # 绿色
time.sleep_ms(1000)

# WS2812 灯带
strip = WS2812(led_pin, n=60)
strip.begin()
strip.set_all(0, 0, 255)  # 全蓝
strip.show()
```


## 13. 调试方法

1. 单灯测试亮度/颜色；
2. 测限流电阻两端电压；
3. PWM 信号波形（示波器）；
4. WS2812：逻辑分析仪抓单线信号；
5. 长时间运行测温（功率 LED）；
6. 检查电源电流（满载 vs 静态）。


## 14. 常见问题

- **不亮**：限流电阻过大、电源未接；
- **烧毁**：电阻过小或未加、散热不足；
- **亮度不均**：电源线压降（长灯带）；用更粗电源线 + 多次供电；
- **WS2812 偏色**：电压降（> 5m 加电源注入）；
- **WS2812 不响应**：时序不准（频率偏移）；
- **矩阵闪烁**：扫描频率过低（> 200 Hz）；
- **频闪可见**：PWM 频率过低（> 200 Hz）。


## 15. 参考资料

- WS2812B / SK6812 / APA102 数据手册
- HUB75 LED 矩阵协议
- Cree / Nichia / OSRAM 功率 LED 规格书
- 欧司朗 园艺 LED 应用笔记
- TLC59401 16 路 PWM LED 驱动数据手册

## 16. 色彩空间

```python
def hsv_to_rgb(h, s, v):
    """h: 0~360, s: 0~1, v: 0~1。"""
    i = int(h / 60) % 6
    f = h / 60 - int(h / 60)
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    if i == 0: return int(v*255), int(t*255), int(p*255)
    if i == 1: return int(q*255), int(v*255), int(p*255)
    if i == 2: return int(p*255), int(v*255), int(t*255)
    if i == 3: return int(p*255), int(q*255), int(v*255)
    if i == 4: return int(t*255), int(p*255), int(v*255)
    if i == 5: return int(v*255), int(p*255), int(q*255)
```
