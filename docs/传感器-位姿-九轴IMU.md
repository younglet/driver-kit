---
title: 九轴IMU
description: DriverKit · 传感器分类下的 九轴IMU 模块文档：工作原理、常见型号与参考价格、硬件接线、驱动代码、调试方法与 FAQ。
keywords: 九轴IMU,传感器,位姿,DriverKit,驱动派,嵌入式,硬件驱动,选型,接线,原理,代码示例,调试
category: 传感器
field: 位姿
module: 九轴IMU
---
# 九轴 IMU


## 1. 模块概览

九轴 IMU 集成三轴加速度计 + 三轴陀螺仪 + 三轴磁力计，可输出绝对姿态（横滚/俯仰/偏航），即包含航向信息而不只是相对旋转。

适用于无人机、机器人、AR/VR、相机云台、动作捕捉、定位等需要绝对方向或长时间稳定航向的场景。


## 2. 工作原理与适用场景

- 加速度计：测量比力，提供俯仰/横滚参考；
- 陀螺仪：测量角速度，提供短期姿态变化；
- 磁力计：测量地磁场，提供绝对航向参考；
- 融合算法：Mahony / Madgwick / EKF / UKF 综合三路数据输出姿态。

典型应用：
- 无人机飞控（俯仰/横滚/偏航控制）；
- 机器人定位；
- AR/VR 头部追踪；
- 电子罗盘；
- 相机/云台方向稳定。


## 3. 常见型号与价格

> 价格仅作预算参考。

| 型号 | 接口 | 主要特点 | 裸芯片参考价 | 模块参考价 |
|---|---|---|---:|---:|
| MPU-9150 | I2C | 早期 9 轴，停产 | ¥20~50 | ¥30~80 |
| MPU-9250 | I2C/SPI | 经典，资料多 | ¥20~60 | ¥30~100 |
| MPU-9255 | I2C/SPI | MPU-9250 升级 | ¥25~70 | ¥35~110 |
| ICM-20948 | I2C/SPI | 高端 9 轴 | ¥40~120 | ¥80~200 |
| ICM-42688-P + AK09918 | I2C/SPI | 高性能组合 | ¥50~150 | ¥100~250 |
| LSM9DS1 | I2C/SPI | ST 经典 9 轴 | ¥25~70 | ¥40~120 |
| ISM330DHCX + IIS2MDC | I2C/SPI | 工业级组合 | ¥50~140 | ¥100~240 |
| BMI160 + BMM150 | I2C/SPI | Bosch 9 轴 | ¥30~90 | ¥60~160 |
| BMI270 + BMM150 | I2C/SPI | 较新低功耗 | ¥40~110 | ¥80~180 |
| BNO055 | I2C/UART/SPI | 内置融合算法 | ¥40~120 | ¥70~200 |
| BNO085 | I2C/UART/SPI | 新一代内置融合 | ¥50~150 | ¥80~250 |
| BHI260AP | I2C/SPI | 自带传感器融合 + AI | ¥60~180 | ¥120~300 |
| BMM150 | I2C | 磁力计独立芯片 | ¥10~25 | ¥15~40 |
| QMC5883L + MPU-6050 模块 | I2C | 9 轴模块 | - | ¥15~50 |


## 4. 关键参数与选型

| 参数 | 说明 |
|---|---|
| 陀螺量程 | ±125 ~ ±2000 dps |
| 加速度量程 | ±2 ~ ±16 g |
| 磁力计量程 | ±1300 µT（高斯）~ ±4900 µT |
| 磁力计分辨率 | 13~16 bit |
| 陀螺噪声密度 | °/s/√Hz |
| 数据更新率 | 1 Hz ~ 几十 kHz |
| FIFO | 1KB~4KB |
| 中断 | 数据就绪、运动、磁溢出、唤醒、SMD |
| 接口 | I2C / SPI / 部分含 UART |
| 工作电压 | 1.71V~3.6V |

**选型建议**：
- 入门/教学：MPU-9250、LSM9DS1；
- 高端无人机：ICM-20948、ICM-42688-P+AK09918；
- 简化集成：BNO055 / BNO085（内置融合算法输出四元数/欧拉角）；
- AI/低功耗：BHI260AP（内置 sensor fusion + AI 协处理器）；
- 工业级：ISM330DHCX + IIS2MDC。


## 5. 硬件连接

- 供电：1.8V 或 3.3V，VDD 与 VDDIO 独立供电；
- I2C 上拉：4.7kΩ；
- AD0/SA0：决定 I2C 地址 LSB；
- INT：中断输出；
- 磁力计注意：远离电机、电池、磁性材料；走线避免大电流线路；
- 模块选择：部分模块将磁力计放板外（如 BMM150 在子板），降低主 PCB 干扰。


## 6. 通信方式

- I2C：标准 / 快速 / 快速+；
- SPI：四线制，模式 0/3；
- 部分芯片支持辅助 I2C（如 MPU-9250 内置磁力计通过辅助 I2C 总线）；
- BNO055/BNO085 支持 UART 简化接口。


## 7. 初始化流程

1. 验证所有子传感器 ID；
2. 软复位；
3. 配置加速度/陀螺量程、ODR；
4. 配置磁力计量程、ODR；
5. 配置 FIFO、中断；
6. 启动测量。


## 8. 驱动接口

```python
class IMU9:
    def begin(self): ...
    def reset(self): ...
    def read_accel(self): ...
    def read_gyro(self): ...
    def read_mag(self): ...        # mx, my, mz, µT
    def read_quaternion(self): ...
    def read_euler(self): ...
    def set_gyro_range(self, dps): ...
    def set_accel_range(self, g): ...
    def set_mag_range(self): ...
    def set_sample_rate(self, hz): ...
    def calibrate_mag(self): ...   # 硬铁/软铁校准
    def data_ready(self): ...
    def sleep(self): ...
    def wake(self): ...
```



### 11.1 Madgwick 9 轴版本

可同时融合陀螺 + 加速度 + 磁力计输出绝对姿态。

### 11.2 EKF 15 维状态

工程级飞控常用，含陀螺零偏估计。

### 11.3 BNO055 / BNO085 内置融合

无需自己实现算法，读取四元数即可，降低主控负担。


## 9. 数据格式与单位

- 加速度：`g` 或 `m/s²`；
- 陀螺：`°/s`；
- 磁力计：`µT`（特斯拉）或 mGauss（毫高斯）；
- 四元数：q = (w, x, y, z)，单位四元数；
- 欧拉角：横滚 / 俯仰 / 偏航，单位 °；
- 注意磁北不是真北，存在磁偏角。


## 10. 校准与滤波

磁场在空间中是个矢量，模块周围的铁磁材料会产生：
- **硬铁干扰**：恒定偏移；
- **软铁干扰**：椭球畸变。

校准步骤：
1. 慢慢绕三轴旋转模块（"8" 字或全向旋转），采集 N 个样本；
2. 拟合椭球中心（硬铁偏移）；
3. 拟合椭球形状 → 校正矩阵（软铁补偿）；
4. 保存校正参数到 Flash。

简单代码可参考 `MagCal` 算法（如 Mahony 提供的椭球拟合）。


## 11. 中断与 DMA

- 中断源：加速度/陀螺/磁力数据就绪、FIFO 水印、运动、磁异常；
- FIFO：多传感器数据合并打包，主机按帧读取；
- BNO085 支持 sensor hub，可外接其他传感器并统一输出。


## 12. 错误处理

- 磁力计溢出：磁场过强（如靠近磁铁），检查磁异常中断；
- 姿态跳变：磁干扰 → 触发磁力计异常检测并降权；
- 陀螺漂移：长时间使用需要 EKF 估计零偏；
- I2C/SPI 错误：总线恢复、重试、复位。


## 13. 低功耗

- 分级睡眠：只关闭部分传感器；
- 唤醒源：加速度运动中断；
- BHI260AP 在低功耗下仍可运行 sensor fusion。


## 14. 示例代码

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


## 15. 调试方法

1. 静止读陀螺 ≈ 0；
2. 静止读加速度：Z ≈ 9.8 m/s²，X/Y ≈ 0；
3. 静止读磁力计：当地地磁场水平分量约 20~50 µT；
4. 旋转模块观察陀螺跟随；
5. 围绕 Z 轴慢转观察偏航角变化；
6. 远离电脑、电池、铁架测试磁场稳定性。


## 16. 常见问题

- **磁力计读数跳变**：附近有扬声器、电机、磁铁、电池；
- **航向角不对**：磁偏角未补偿，或模组离干扰源太近；
- **姿态漂移**：陀螺零偏未校准；
- **I2C 错误**：MPU-9250 默认 0x68，部分模块焊接时地址错；
- **磁力计饱和**：靠近强磁场，校准失败。


## 17. 参考资料

- InvenSense MPU-9250 Register Map
- TDK ICM-20948 数据手册
- Bosch BNO055 数据手册
- Mahony, Madgwick 论文
- FIBA / Hillcrest 实验室 BNO 算法文档