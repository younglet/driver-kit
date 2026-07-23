# 六轴 IMU


## 1. 模块概览

六轴 IMU 集成三轴加速度计 + 三轴陀螺仪，可输出运动加速度和角速度，常用于姿态估计、运动控制、机器人、无人机、AR/VR、可穿戴设备等。

相比单独使用陀螺仪或加速度计，IMU 通过硬件同步采样让数据融合更简单。多数现代 IMU 还支持 FIFO、中断、DMA、I2C/SPI 接口。


## 2. 工作原理与适用场景

加速度计输出比力（含重力），陀螺仪输出角速度。通过融合算法（互补滤波、Mahony、Madgwick、EKF）可获得姿态（横滚/俯仰/偏航）欧拉角或四元数。

适用场景：
- 无人机/平衡车姿态控制；
- 机器人 IMU；
- 相机云台稳定；
- AR/VR 头显；
- 运动手环、姿态检测；
- 工业 IMU 模块。


## 3. 常见型号与价格

> 价格仅为估算，仅用于预算参考。

| 型号 | 接口 | 主要特点 | 裸芯片参考价 | 模块参考价 |
|---|---|---|---:|---:|
| MPU-6050 | I2C | 经典，资料极多 | ¥8~25 | ¥10~35 |
| MPU-6500 | I2C/SPI | 较新、低噪声 | ¥15~45 | ¥25~80 |
| MPU-6555 | I2C/SPI | MPU-6500 升级版 | ¥15~50 | ¥25~90 |
| ICM-20600 | I2C/SPI | 低功耗 | ¥15~40 | ¥30~80 |
| ICM-20602 | SPI/I2C | 高速、低噪声 | ¥20~60 | ¥35~100 |
| ICM-42605 | SPI/I2C | 新一代低功耗 | ¥25~80 | ¥45~150 |
| ICM-42688-P | SPI/I2C | 高端低噪声 | ¥35~100 | ¥60~180 |
| ICM-42607-P | SPI/I2C | 工业级 | ¥40~120 | ¥80~200 |
| BMI160 | I2C/SPI | 超低功耗、硬件步进 | ¥15~50 | ¥30~100 |
| BMI270 | I2C/SPI | 最新低功耗 | ¥20~70 | ¥40~140 |
| BMI323 | I2C/SPI | 高性能工业 | ¥30~90 | ¥60~160 |
| LSM6DS3 | I2C/SPI | FIFO + 中断丰富 | ¥15~50 | ¥30~100 |
| LSM6DS3H | I2C/SPI | 高精度 | ¥20~60 | ¥40~120 |
| LSM6DSL | I2C/SPI | 低功耗可穿戴 | ¥15~50 | ¥30~100 |
| LSM6DSO | I2C/SPI | 增强型 | ¥20~70 | ¥40~140 |
| LSM6DSOX | I2C/SPI | 带机器学习内核 | ¥20~80 | ¥40~160 |
| LSM6DSV | I2C/SPI | 高性能旗舰 | ¥30~100 | ¥60~180 |
| LIS2MDL + LSM6DS3 组合 | I2C | 9 轴组合模块 | - | ¥40~120 |
| MPU-6886 | I2C | 常见开发板 | - | ¥15~80 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 陀螺量程 | ±125/±250/±500/±1000/±2000 dps |
| 加速度量程 | ±2/±4/±8/±16 g |
| 陀螺噪声密度 | °/s/√Hz，越低越好 |
| 加速度噪声密度 | µg/√Hz |
| 输出数据率 | 1 Hz ~ 几十 kHz |
| FIFO | 1KB~4KB，部分支持压缩 |
| 中断 | 数据就绪、运动、唤醒、敲击、自由落体、计步、SMD |
| 接口 | I2C（≤3.4 MHz）/ SPI（≤10 MHz）/ 辅助 I2C 主 |
| 工作电压 | 1.71V~3.6V 居多 |
| IO 电平 | 1.8V / 3.3V |
| 温度范围 | -40°C ~ +85°C（消费级）/ +105°C（工业级） |
| 封装 | LGA-14/16/20 |

**选型建议**：
- 入门/教学：MPU-6050、MPU-6500；
- 可穿戴低功耗：BMI270、LSM6DSO；
- 高速运动/无人机：ICM-42688-P、ICM-42607-P；
- 工业应用：ICM-42688-P、LSM6DSV、BMI323。


## 5. 硬件连接

- 供电：1.8V 或 3.3V，旁路电容 100nF 紧靠 VDD；
- I2C 上拉：4.7kΩ（400kHz）或 2.2kΩ（1MHz）；
- AD0/SA0 引脚：决定 I2C 地址 LSB（MPU6050 默认 0x68）；
- INT：中断输出，可配置推挽/开漏；
- FSYNC：帧同步输入，部分芯片支持；
- AUX I2C：可外挂磁力计（MPU-6500 系列特有）；
- 模块版本：常见 GY-521（MPU-6050）、GY-6500（MPU-6500），注意板载 LDO 和电平转换。


## 6. 通信方式

- I2C：标准 / 快速 / 快速+ 三档；
- SPI：四线制，模式 0 / 3；
- 辅助 I2C：MPU-6500 等可外挂磁力计，主机只读 6 轴 IMU 数据，磁力计数据由 IMU 自动读并放入寄存器；
- 中断：多种事件源，路由到 INT1/INT2。


## 7. 初始化流程

1. 配置 I2C/SPI 总线；
2. 读取 `WHO_AM_I`（MPU6050 = 0x68）；
3. 软复位；
4. 选择时钟源（内部 / 外部）；
5. 配置陀螺量程、加速度量程；
6. 设置 ODR（采样率分频）；
7. 配置 DLPF / 加速度滤波器；
8. 配置 FIFO 模式；
9. 配置中断映射；
10. 使能传感器。


## 8. 驱动接口

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



### 10.1 互补滤波（简单）

```text
angle = α · (angle + gyro * dt) + (1 - α) · accel_angle
α ≈ 0.98（陀螺权重）
```

### 10.2 Madgwick / Mahony

开源算法，仅靠 6 轴 IMU 即可输出姿态（无磁力计时航向会漂移）。

### 10.3 EKF / UKF

高精度场景（如无人机飞控、工业 IMU），常用扩展卡尔曼滤波融合陀螺 + 加速度 +（磁力计或 GPS）。


## 9. 数据格式与单位

- 陀螺单位：`°/s`（dps），按量程对应的灵敏度换算；
- 加速度单位：`g` 或 `m/s²`；
- 字节序：MSB 在前；
- 温度传感器：12-bit 内部温度，用于补偿；
- 数据更新：FIFO 水印中断或轮询；
- 同步采样：加速度和陀螺在硬件上同步采样，融合时无需时间对齐。


## 10. 校准与滤波

- 陀螺零偏：静止采集 N 个样本取均值；
- 加速度 6 面校准：构造 3×3 校正矩阵 + 3 轴偏移；
- 软铁/硬铁校准（用磁力计时）：旋转采集 3D 椭球，拟合中心和形状；
- 温补：不同温度下记录零偏曲线，运行时插值；
- 校准数据保存到 Flash，含版本号和 CRC32。


## 11. 中断与 DMA

- 中断源：数据就绪、FIFO 水印、FIFO 溢出、计步、敲击、自由落体、运动、唤醒、SMD；
- FIFO：缓存 N 帧数据，主机批量读取，降低系统抖动；
- DMA：SPI 模式下推荐用 DMA 读取 FIFO，减少 CPU 占用。


## 12. 错误处理

- WHO_AM_I 错：芯片虚焊、地址错、芯片为假货；
- 总线卡死：SDA/SCL 短路、上拉过大；
- 数据长时间不变：FIFO 未读或设备掉电；
- 角速度漂移：温漂、机械应力；
- 恢复：重试 → 软复位 → 重新初始化 → 上报故障。


## 13. 低功耗

- 多种睡眠模式：Off / Suspend / Low-Power / Standby；
- 唤醒源：运动、计步、敲击、SMD；
- 唤醒延迟：~10ms；
- 唤醒后寄存器可能需要重新配置。


## 14. 示例代码

```python
class IMU6:
    def __init__(self, bus, address=0x68):
        self.bus = bus
        self.address = address

    def begin(self):
        pass

    def read_accel(self):
        """ax, ay, az 单位 m/s²。"""
        pass

    def read_gyro(self):
        """gx, gy, gz 单位 °/s。"""
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


## 15. 调试方法

1. 静止读取：陀螺 ≈ 0，加速度 Z ≈ 9.8 m/s²；
2. 翻转模块：观察各轴变化是否符合右手定则；
3. 慢速旋转：陀螺读数应跟随，停止后回 0；
4. 快速旋转：检查量程是否饱和；
5. 静止数小时：观察陀螺零偏是否漂移；
6. 温度变化：在 -10°C 到 +60°C 监测输出。


## 16. 常见问题

- **MPU-6050 I2C 不通**：CS 引脚未拉高（MPU6050 默认 SPI，需 CS 高 = I2C），或上拉未接；
- **姿态角发散**：仅靠加速度的融合权重过高，或陀螺零偏未校准；
- **航向角漂移**：仅 6 轴无法提供绝对航向，需磁力计；
- **数据跳变**：SPI 时序错、CS 未及时拉高、时钟模式错；
- **发热**：电源反接或短路。


## 17. 参考资料

- InvenSense MPU-6000/MPU-6050 Register Map
- TDK ICM-42688-P 数据手册
- ST AN5040 LSM6DS 应用笔记
- Sebastian Madgwick 论文 "An efficient orientation filter for inertial sensors"
- Mahony 论文 "Complementary filter design"