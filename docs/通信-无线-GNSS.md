# GNSS（全球导航卫星系统）


## 1. 模块概览

GNSS（Global Navigation Satellite System，全球导航卫星系统）是基于卫星的定位技术总称，包括 GPS（美国）、北斗（中国）、Glonass（俄罗斯）、Galileo（欧盟）、QZSS（日本）、NavIC（印度）。

应用：
- 车载导航；
- 户外设备（手表、对讲机）；
- 无人机定位；
- 共享单车/外卖配送；
- 物流追踪；
- 船舶导航；
- 测量测绘（RTK）；
- 农业机械（精准农业）；
- 资产追踪（防盗）；
- 时间同步。


## 2. 工作原理与适用场景

### 2.1 定位原理

- 卫星持续广播包含时间戳的导航信号；
- 接收机同时接收 4 颗以上卫星信号；
- 通过信号传播时间（TOA）计算距离；
- 4 颗以上卫星 → 3D 位置 + 时间（经度、纬度、海拔、时间）。

### 2.2 多普勒效应

- 卫星高速运动（~3.87 km/s）产生多普勒频移；
- 利用频移提高定位精度；
- 高动态环境（飞机、导弹）需要专门处理。

### 2.3 多系统融合

- 单 GPS：通常 24 颗卫星；
- 多系统融合：GPS + 北斗 + Glonass + Galileo = 100+ 颗可见卫星；
- 优点：可见卫星多，定位快，精度高，城市峡谷效果好；
- 多系统需要接收机支持（多数现代芯片支持）。

### 2.4 增强系统

- **SBAS**（Satellite-Based Augmentation System）：星基增强；
  - WAAS（美国）；
  - EGNOS（欧洲）；
  - MSAS（日本）；
  - GAGAN（印度）；
  - SDCM（俄罗斯）。
  - 精度提升到 1~2 m。
- **GBAS**（Ground-Based）：地基增强（机场着陆）；
- **RTK**（Real-Time Kinematic）：实时差分定位；
  - 基准站 + 移动站；
  - 精度 cm 级；
  - 需 UHF 电台 / NTRIP 网络。
- **PPP**（Precise Point Positioning）：精密单点定位；
  - 全球范围 cm~dm 级；
  - 收敛时间 10~30 分钟。


## 3. 常见型号与价格

> 价格仅作预算参考。

### 3.1 GNSS 接收机芯片

| 型号 | 系统 | 频段 | 特点 | 芯片参考价 |
|---|---|---|---|---:|
| u-blox NEO-M8N | GPS/北斗/Glonass/Galileo | L1 | 经典 | ¥20~50 |
| u-blox NEO-M9N | GPS/北斗/Glonass/Galileo | L1 | 升级 | ¥30~70 |
| u-blox MAX-M10S | GPS/北斗/Glonass/Galileo/QZSS | L1 | 最新 | ¥40~100 |
| u-blox ZED-F9P | GPS/北斗/Glonass/Galileo/QZSS | L1/L2 | RTK | ¥150~350 |
| u-blox ZED-F9R | GPS/北斗/Glonass/Galileo | L1/L2 | 死区补偿 | ¥200~500 |
| u-blox LEA-M8S | GPS/北斗/Glonass/QZSS | L1 | 工业 | ¥30~70 |
| 中科微 AT6558R | GPS/北斗 | L1 | 国产 | ¥10~25 |
| 中科微 AT6668 | GPS/北斗/Glonass | L1 | 多系统 | ¥15~35 |
| 中科微 AT9880 | GPS/北斗/Glonass | L1 | 最新 | ¥20~50 |
| 北斗星通 HD8020 | 北斗 | 多频 | 北斗 | ¥30~70 |
| 司南 K803 | 北斗+GPS | L1+L2 | RTK | ¥150~300 |
| 华大电子 HD8121 | 北斗+GPS | L1 | 国产 | ¥15~35 |
| 泰斗 TD1030 | GPS/北斗 | L1 | 国产 | ¥15~35 |
| MediaTek MT3333 | GPS/北斗/QZSS | L1 | 经典 | ¥15~35 |
| MediaTek MT3339 | GPS/北斗/Glonass | L1 | 多系统 | ¥20~50 |
| MediaTek AG3335M | GPS/北斗/Glonass/Galileo/QZSS | L1+L5 | 多频 | ¥30~70 |
| 展讯 SR2712 | GPS/北斗 | L1 | 入门 | ¥10~25 |
| Quectel LC76G | GPS/北斗/Glonass/Galileo/QZSS | L1 | 多系统 | ¥25~60 |
| Quectel LG290P | GPS/北斗/Glonass/Galileo/QZSS/IRNSS | L1+L2+L5 | 多频 | ¥80~180 |
| Quectel LG580P | GPS/北斗/Glonass/Galileo/QZSS/IRNSS | L1+L2+L5 | RTK | ¥150~350 |
| Ai-Thinker AI-8231 | GPS/北斗 | L1 | 国产 | ¥10~25 |
| Ai-Thinker AI-AT6668 | GPS/北斗/Glonass | L1 | 多系统 | ¥15~35 |

### 3.2 GNSS 模组

| 型号 | 类型 | 接口 | 参考价 |
|---|---|---|---|
| u-blox NEO-M8N 模块 | 通用 | UART | ¥30~80 |
| u-blox MAX-M10S 模块 | 最新 | UART/I2C/SPI | ¥60~150 |
| u-blox ZED-F9P 模块 | RTK | UART/USB/I2C | ¥300~800 |
| AT6558R 模块 | 国产 | UART | ¥15~40 |
| AT6668 模块 | 国产 | UART | ¥20~50 |
| 北斗双模模块 | 入门 | UART | ¥15~35 |
| 多系统模块 | 通用 | UART | ¥30~80 |

### 3.3 天线

| 类型 | 频段 | 特点 | 参考价 |
|---|---|---|---|
| 有源陶瓷天线 | L1 | 通用 | ¥5~30 |
| 高增益天线 | L1 | RTK | ¥30~150 |
| IPEX 外置天线 | L1 | 模块配套 | ¥10~50 |
| L1+L2 多频天线 | L1/L2 | RTK | ¥100~500 |
| 测量级天线 | 多频 | 测绘 | ¥500~5000 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 系统 | GPS / 北斗 / Glonass / Galileo / QZSS / NavIC |
| 频段 | L1 / L2 / L5 |
| 精度 | 2.5 m CEP（普通）/ 1 m（SBAS）/ 0.1 m（RTK） |
| 冷启动 | 30~120 s |
| 热启动 | 1~5 s |
| 数据更新率 | 1 Hz / 5 Hz / 10 Hz / 20 Hz / 25 Hz |
| 工作电压 | 1.8V / 3.3V |
| 功耗 | mA 级（接收）、< 10 µA（休眠） |
| 灵敏度 | 跟踪 -160 dBm，捕获 -148 dBm |
| 接口 | UART / I2C / SPI / USB |
| 协议 | NMEA 0183 / UBX（二进制） |

**选型建议**：
- 入门：AT6558R、北斗双模；
- 通用：u-blox NEO-M8N、AT6668；
- 多系统：MAX-M10S、AG3335M；
- 高精度 RTK：ZED-F9P + LG580P + 测量天线；
- 车载：AG3335M、MAX-M10S；
- 低功耗：u-blox LEA-M8S。


## 5. 硬件连接

- 电源：3.3V，去耦电容（100 nF + 10 µF）；
- 天线：50Ω 阻抗匹配；
  - 有源天线需供电（3.3V，电流 < 50 mA）；
  - 陶瓷天线焊接位置紧贴芯片；
- 射频走线：50Ω，阻抗匹配；
- 抗干扰：远离 WiFi / 蓝牙 / DC-DC；
- 卫星可见性：户外/车窗/玻璃下；
- 防雷（户外）：TVS；
- 接口：UART 3.3V TTL；
- PPS 输出：授时应用。


## 6. 通信方式

- **NMEA 0183**：ASCII 文本协议；
  - GGA：位置、时间、卫星数；
  - RMC：最小推荐数据（位置、速度、时间）；
  - GSA：卫星精度（PDOP、HDOP）；
  - GSV：可见卫星详情；
  - VTG：航向/速度；
  - GLL：地理经纬度；
  - TXT：文本信息；
- **UBX**（u-blox 私有）：二进制协议；
- **RTCM 3.x**：差分数据（RTK）；
- UART 默认 9600~115200 bps。


## 7. 初始化流程

1. 配置 UART；
2. 复位模块；
3. 配置更新率（如 10 Hz）；
4. 配置输出语句（GGA + RMC + GSA）；
5. 配置 GNSS 系统（GPS + 北斗 + Glonass）；
6. 配置动态模型（汽车 / 行人 / 海洋）；
7. 配置 SBAS（如使用）；
8. 等待首次定位（冷启动 30+ s）。


## 8. 驱动接口

```python
class GNSS:
    def __init__(self, uart):
        self.uart = uart

    def begin(self, baud=9600):
        pass

    def read_sentence(self):
        """读一条 NMEA 句子（以 \\r\\n 结束）。"""
        pass

    def parse_gga(self, sentence):
        """解析 GGA 句子。"""
        parts = sentence.split(',')
        return {
            'time': parts[1],         # hhmmss.ss
            'lat': float(parts[2]),    # ddmm.mmmm
            'lat_dir': parts[3],       # N/S
            'lon': float(parts[4]),    # dddmm.mmmm
            'lon_dir': parts[5],       # E/W
            'fix': int(parts[6]),      # 0/1/2
            'sats': int(parts[7]),     # 卫星数
            'hdop': float(parts[8]),
            'alt': float(parts[9]),    # 海拔
        }

    def position(self):
        """返回 (lat, lon, alt) 或 None。"""
        pass

    def time(self):
        """返回 UTC 时间。"""
        pass

    def fix_status(self):
        """返回 0/1/2 (无定位/2D/3D)。"""
        pass

    def satellites(self):
        """返回可见卫星数和 CN0 信息。"""
        pass


class RTKReceiver:
    def __init__(self, gnss, rtcm_source=None):
        self.gnss = gnss
        self.rtcm = rtcm_source

    def begin(self):
        pass

    def update(self):
        """处理 RTCM 数据并更新定位。"""
        pass

    def fix_type(self):
        """返回 Single / DGPS / RTK Fixed / RTK Float。"""
        pass
```



- 设置支持的 GNSS 系统：GPS + BDS + Glonass + Galileo + QZSS；
- 多系统提高可见卫星数（30+）；
- 城市峡谷效果明显改善；
- 首次定位时间（TTFF）缩短。


## 9. 数据格式与单位

### 9.1 NMEA GGA 示例

```text
$GNGGA,123519.000,3958.1234,N,11623.4567,E,1,12,1.0,52.5,M,-7.5,M,,*65
```

- `$`：起始符；
- `GNGGA`：GNSS + GGA（多系统为 GN/GPS = GP）；
- `123519.000`：UTC 时间 12:35:19；
- `3958.1234,N`：纬度 39°58.1234' N；
- `11623.4567,E`：经度 116°23.4567' E；
- `1`：定位状态（0=无, 1=2D, 2=3D, 4=RTK 固定, 5=RTK 浮动）；
- `12`：使用卫星数；
- `1.0`：HDOP；
- `52.5,M`：海拔 52.5 m；
- `*65`：校验和。

### 9.2 经纬度转换

NMEA 输出 `ddmm.mmmm`（度分），转十进制度：

```python
def nmea_to_decimal(nmea, direction):
    """ddmm.mmmm → 十进制度。"""
    deg = int(nmea // 100)
    minutes = nmea - deg * 100
    decimal = deg + minutes / 60
    if direction in ('S', 'W'):
        decimal = -decimal
    return decimal
```


## 10. 校准与滤波

- 远离金属遮挡；
- 有源天线滤波；
- 抗多径算法；
- 多径抑制（部分芯片内置）；
- 屏蔽金属外壳开窗。


## 11. 低功耗

- 持续接收：~25 mA；
- 间歇接收（按需）：< 1 mA 平均；
- 休眠（停止接收）：< 10 µA；
- AGPS（辅助 GPS）：通过网络下载星历数据，加快冷启动。


## 12. 调试方法

1. 在户外测试（视野开阔）；
2. 用 u-center（u-blox）或 AT 指令调试；
3. 查看卫星数（GSV 句）；
4. 测首次定位时间（TTFF）；
5. RTK：查看 NMEA 中 fix 类型；
6. 测试不同天气、遮挡环境。


## 13. 常见问题

- **无定位**：户外空旷；首次定位需要时间；
- **精度差**：天线差、多径、卫星数少；
- **首次定位慢**：A-GPS 未启用、AGPS 数据过期；
- **RTK 不收敛**：共视卫星不够、距离基准站远、遮挡；
- **模块发热**：长时间工作正常现象；
- **数据中断**：天线松动、供电不足；
- **NMEA 乱码**：波特率错。


## 14. 参考资料

- 不同国家频段不同（GNSS 频段全球通用，但增强系统区域性）；
- 高精度应用需 RTK；
- 室内基本无法定位（除非有 GNSS 中继）；
- 城市峡谷：注意多径、信号遮挡；
- 高速运动：动态模型选 Automotive / HighDynamic。



- u-blox ZED-F9P / MAX-M10S 数据手册
- 中科微 AT6558R / AT6668 数据手册
- NMEA 0183 标准（NMEA.com）
- RTCM 3.x 标准
- Quectel LC76G / LG580P 数据手册
- 北斗 / GPS / Galileo / Glonass 官方规范
- RTKLib（开源 RTK 软件）


## 15. RTK（实时动态差分定位）

### 10.1 原理

- 基准站（已知精确位置）接收卫星信号；
- 计算伪距误差并发送 RTCM 数据；
- 移动站接收 RTCM 数据并修正；
- 实现 cm 级定位。

### 10.2 配置

- 基准站：固定位置 + 高精度天线 + 电台；
- 移动站：ZED-F9P + 移动天线 + 接收电台；
- 电台：LoRa / 4G / NTRIP；
- 协议：RTCM 3.x（MSM4/MSM5/MSM7）。

### 10.3 状态

- 单点定位：m 级；
- SBAS：1~2 m；
- DGPS：1 m；
- RTK Float：dm 级；
- RTK Fixed：cm 级（需要 ≥ 4 颗共视卫星）。


## 16. 安全和隐私

- GNSS 设备涉及位置隐私；
- 欧盟 GDPR、北加州 CCPA 等要求保护位置数据；
- 注意：在某些国家/地区，车辆/个人位置追踪有法规限制；
- 加密：重要数据传输需加密；
- 身份验证：设备认证。
