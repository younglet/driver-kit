---
title: GNSS
description: "DriverKit — GNSS module docs (under Communication): working principles, common part numbers and reference prices, hardware wiring, driver code, debugging methods and FAQ."
keywords: GNSS,communication,wireless,DriverKit,Driver-Pie,embedded,hardware driver,selection,wiring,principle,code example,debugging,GPS,BeiDou,u-blox,NMEA
category: Communication
field: Wireless
module: GNSS
---
# GNSS (Global Navigation Satellite System)

## 1. Module Overview

GNSS (Global Navigation Satellite System) is the umbrella term for satellite-based positioning technologies, including GPS (US), BeiDou (China), GLONASS (Russia), Galileo (EU), QZSS (Japan) and NavIC (India).

Applications:
- Vehicle navigation
- Outdoor devices (smart watches, two-way radios)
- Drone positioning
- Shared bicycles / food delivery
- Logistics tracking
- Marine navigation
- Surveying and mapping (RTK)
- Agricultural machinery (precision agriculture)
- Asset tracking (anti-theft)
- Time synchronization

## 2. Working Principle and Use Cases

### 2.1 Positioning Principle

- Satellites continuously broadcast navigation signals with timestamps
- A receiver tracks signals from at least 4 satellites at once
- Distance is computed from the signal Time-of-Arrival (TOA)
- With 4+ satellites: 3D position + time (longitude, latitude, altitude, time)

### 2.2 Doppler Effect

- Satellites move at ~3.87 km/s, producing significant Doppler shift
- Frequency shift is leveraged to improve accuracy
- High-dynamic scenarios (aircraft, missiles) require special handling

### 2.3 Multi-Constellation Fusion

- GPS alone: ~24 satellites
- GPS + BeiDou + GLONASS + Galileo: 100+ visible satellites
- Advantages: more visible satellites, faster fix, better accuracy, improved urban-canyon performance
- Multi-constellation requires receiver support (most modern chips support it)

### 2.4 Augmentation Systems

- **SBAS** (Satellite-Based Augmentation System)
  - WAAS (US)
  - EGNOS (Europe)
  - MSAS (Japan)
  - GAGAN (India)
  - SDCM (Russia)
  - Accuracy improves to 1 ~ 2 m
- **GBAS** (Ground-Based Augmentation System): airport landing
- **RTK** (Real-Time Kinematic): differential positioning
  - Base station + rover
  - Centimeter-level accuracy
  - Requires UHF radio / NTRIP network
- **PPP** (Precise Point Positioning)
  - Centimeter to decimeter accuracy globally
  - Convergence time: 10 ~ 30 minutes

## 3. Common Part Numbers and Reference Prices

> Prices are for reference only.

### 3.1 GNSS Receiver Chips

| Part Number | Constellation | Band | Features | Chip Price |
|---|---|---|---|---:|
| u-blox NEO-M8N | GPS / BeiDou / GLONASS / Galileo | L1 | Classic | $10~25 |
| u-blox NEO-M9N | GPS / BeiDou / GLONASS / Galileo | L1 | Upgrade | $15~35 |
| u-blox MAX-M10S | GPS / BeiDou / GLONASS / Galileo / QZSS | L1 | Latest | $20~50 |
| u-blox ZED-F9P | GPS / BeiDou / GLONASS / Galileo / QZSS | L1 / L2 | RTK | $75~175 |
| u-blox ZED-F9R | GPS / BeiDou / GLONASS / Galileo | L1 / L2 | Dead-reckoning | $100~250 |
| u-blox LEA-M8S | GPS / BeiDou / GLONASS / QZSS | L1 | Industrial | $15~35 |
| ZhongKeWei AT6558R | GPS / BeiDou | L1 | China-made | $5~12 |
| ZhongKeWei AT6668 | GPS / BeiDou / GLONASS | L1 | Multi-constellation | $7~18 |
| ZhongKeWei AT9880 | GPS / BeiDou / GLONASS | L1 | Latest | $10~25 |
| BDStar HD8020 | BeiDou | Multi-band | BeiDou | $15~35 |
| ComNav K803 | BeiDou + GPS | L1 + L2 | RTK | $75~150 |
| HED HD8121 | BeiDou + GPS | L1 | China-made | $7~18 |
| Taituo TD1030 | GPS / BeiDou | L1 | China-made | $7~18 |
| MediaTek MT3333 | GPS / BeiDou / QZSS | L1 | Classic | $7~18 |
| MediaTek MT3339 | GPS / BeiDou / GLONASS | L1 | Multi-system | $10~25 |
| MediaTek AG3335M | GPS / BeiDou / GLONASS / Galileo / QZSS | L1 + L5 | Multi-band | $15~35 |
| Spreadtrum SR2712 | GPS / BeiDou | L1 | Entry-level | $5~12 |
| Quectel LC76G | GPS / BeiDou / GLONASS / Galileo / QZSS | L1 | Multi-system | $12~30 |
| Quectel LG290P | GPS / BeiDou / GLONASS / Galileo / QZSS / IRNSS | L1 + L2 + L5 | Multi-band | $40~90 |
| Quectel LG580P | GPS / BeiDou / GLONASS / Galileo / QZSS / IRNSS | L1 + L2 + L5 | RTK | $75~175 |
| Ai-Thinker AI-8231 | GPS / BeiDou | L1 | China-made | $5~12 |
| Ai-Thinker AI-AT6668 | GPS / BeiDou / GLONASS | L1 | Multi-system | $7~18 |

### 3.2 GNSS Modules

| Part Number | Type | Interface | Price |
|---|---|---|---|
| u-blox NEO-M8N module | General | UART | $15~40 |
| u-blox MAX-M10S module | Latest | UART / I2C / SPI | $30~75 |
| u-blox ZED-F9P module | RTK | UART / USB / I2C | $150~400 |
| AT6558R module | China-made | UART | $8~20 |
| AT6668 module | China-made | UART | $10~25 |
| BeiDou dual-mode module | Entry-level | UART | $7~18 |
| Multi-system module | General | UART | $15~40 |

### 3.3 Antennas

| Type | Band | Features | Price |
|---|---|---|---|
| Active ceramic antenna | L1 | General | $3~15 |
| High-gain antenna | L1 | RTK | $15~75 |
| IPEX external antenna | L1 | Module accessory | $5~25 |
| L1 + L2 multi-band antenna | L1 / L2 | RTK | $50~250 |
| Survey-grade antenna | Multi-band | Surveying | $250~2500 |

## 4. Key Parameters and Selection Guide

| Parameter | Description |
|---|---|
| Constellation | GPS / BeiDou / GLONASS / Galileo / QZSS / NavIC |
| Bands | L1 / L2 / L5 |
| Accuracy | 2.5 m CEP (standard) / 1 m (SBAS) / 0.1 m (RTK) |
| Cold Start | 30 ~ 120 s |
| Hot Start | 1 ~ 5 s |
| Update Rate | 1 Hz / 5 Hz / 10 Hz / 20 Hz / 25 Hz |
| Supply Voltage | 1.8 V / 3.3 V |
| Power | mA range (RX), < 10 µA (sleep) |
| Sensitivity | tracking -160 dBm, acquisition -148 dBm |
| Interface | UART / I2C / SPI / USB |
| Protocol | NMEA 0183 / UBX (binary) |

**Selection Guide**:
- Entry-level: AT6558R, BeiDou dual-mode
- General: u-blox NEO-M8N, AT6668
- Multi-system: MAX-M10S, AG3335M
- High-precision RTK: ZED-F9P + LG580P + surveying antenna
- Vehicle: AG3335M, MAX-M10S
- Low power: u-blox LEA-M8S

## 5. Hardware Connection and Electrical Notes

- Power supply: 3.3 V, decoupling capacitors (100 nF + 10 µF)
- Antenna: 50 Ω impedance match
  - Active antenna needs power (3.3 V, current < 50 mA)
  - Ceramic antenna placed as close as possible to the chip
- RF traces: 50 Ω controlled impedance
- Keep away from WiFi / Bluetooth / DC-DC noise
- Satellite visibility: outdoor / car window / under glass
- Lightning protection (outdoor): TVS
- Interface: 3.3 V TTL UART
- PPS output for time applications

## 6. Communication Method or Control Signal

- **NMEA 0183**: ASCII text protocol
  - GGA: position, time, satellites used
  - RMC: recommended minimum (position, speed, time)
  - GSA: satellite accuracy (PDOP, HDOP)
  - GSV: detailed satellite view
  - VTG: track and speed over ground
  - GLL: geographic lat / lon
  - TXT: text information
- **UBX** (u-blox proprietary): binary protocol
- **RTCM 3.x**: differential data (RTK)
- Default UART: 9600 ~ 115200 bps

## 7. Initialization Flow

1. Configure UART
2. Reset the module
3. Configure update rate (e.g. 10 Hz)
4. Configure output sentences (GGA + RMC + GSA)
5. Configure constellations (GPS + BeiDou + GLONASS)
6. Configure dynamic model (Automotive / Pedestrian / Marine)
7. Configure SBAS if used
8. Wait for first fix (cold start 30+ s)

## 8. Common Driver Interfaces

```python
class GNSS:
    def __init__(self, uart):
        self.uart = uart

    def begin(self, baud=9600):
        pass

    def read_sentence(self):
        """Read one NMEA sentence (terminated by \\r\\n)."""
        pass

    def parse_gga(self, sentence):
        """Parse a GGA sentence."""
        parts = sentence.split(',')
        return {
            'time': parts[1],         # hhmmss.ss
            'lat': float(parts[2]),    # ddmm.mmmm
            'lat_dir': parts[3],       # N/S
            'lon': float(parts[4]),    # dddmm.mmmm
            'lon_dir': parts[5],       # E/W
            'fix': int(parts[6]),      # 0/1/2
            'sats': int(parts[7]),     # satellites used
            'hdop': float(parts[8]),
            'alt': float(parts[9]),    # altitude
        }

    def position(self):
        """Return (lat, lon, alt) or None."""
        pass

    def time(self):
        """Return UTC time."""
        pass

    def fix_status(self):
        """Return 0/1/2 (none / 2D / 3D)."""
        pass

    def satellites(self):
        """Return visible-satellite count and CN0 info."""
        pass


class RTKReceiver:
    def __init__(self, gnss, rtcm_source=None):
        self.gnss = gnss
        self.rtcm = rtcm_source

    def begin(self):
        pass

    def update(self):
        """Process RTCM data and update the fix."""
        pass

    def fix_type(self):
        """Return Single / DGPS / RTK Fixed / RTK Float."""
        pass
```

## 9. Data Format, Units, and Timing

### 9.1 NMEA GGA Example

```text
$GNGGA,123519.000,3958.1234,N,11623.4567,E,1,12,1.0,52.5,M,-7.5,M,,*65
```

- `$`: start of sentence
- `GNGGA`: multi-constellation + GGA (GP for GPS only)
- `123519.000`: UTC time 12:35:19.000
- `3958.1234,N`: latitude 39°58.1234' N
- `11623.4567,E`: longitude 116°23.4567' E
- `1`: fix quality (0 = none, 1 = 2D, 2 = 3D, 4 = RTK fixed, 5 = RTK float)
- `12`: satellites used
- `1.0`: HDOP
- `52.5,M`: altitude 52.5 m
- `*65`: checksum

### 9.2 Latitude / Longitude Conversion

NMEA output is `ddmm.mmmm` (degrees + minutes). Convert to decimal degrees:

```python
def nmea_to_decimal(nmea, direction):
    """Convert ddmm.mmmm to decimal degrees."""
    deg = int(nmea // 100)
    minutes = nmea - deg * 100
    decimal = deg + minutes / 60
    if direction in ('S', 'W'):
        decimal = -decimal
    return decimal
```

## 10. Calibration, Compensation, and Filtering

- Avoid metal obstructions
- Active antenna filtering
- Multipath mitigation algorithms
- Built-in multipath suppression (some chips)
- Cut a window in any metal enclosure

## 11. Low Power

- Continuous reception: ~25 mA
- Intermittent (on-demand) reception: < 1 mA average
- Sleep (receiver off): < 10 µA
- AGPS (Assisted GPS): download ephemeris data over a network to speed cold start

## 12. Debugging Methods

1. Test outdoors (open sky)
2. Use u-center (u-blox) or vendor AT commands
3. Inspect satellite count (GSV sentences)
4. Measure Time-To-First-Fix (TTFF)
5. For RTK, watch the fix type in NMEA
6. Test under different weather and obstruction conditions

## 13. Frequently Asked Questions

- **No fix**: must be outdoors with open sky; first fix takes time
- **Poor accuracy**: bad antenna, multipath, few satellites
- **Slow first fix**: A-GPS not enabled, AGPS data stale
- **RTK will not converge**: insufficient common satellites, far from the base station, obstructions
- **Module gets warm**: normal during prolonged operation
- **Data interruptions**: loose antenna, insufficient power
- **NMEA garbled**: wrong baud rate

## 14. References

- Bands differ by country (GNSS bands are global, but augmentation is regional)
- High-precision use cases require RTK
- Indoor positioning is generally not possible (unless relayed)
- Urban canyons: watch out for multipath and obstruction
- High-speed motion: choose Automotive / HighDynamic dynamic model

- u-blox ZED-F9P / MAX-M10S datasheets
- ZhongKeWei AT6558R / AT6668 datasheets
- NMEA 0183 standard (NMEA.com)
- RTCM 3.x standard
- Quectel LC76G / LG580P datasheets
- BeiDou / GPS / Galileo / GLONASS official specifications
- RTKLib (open-source RTK software)

## 15. RTK (Real-Time Kinematic)

### 15.1 Principle

- A base station (with a precisely known position) receives satellite signals
- It computes pseudo-range errors and broadcasts RTCM corrections
- The rover receives RTCM data and applies the corrections
- Centimeter-level positioning is achieved

### 15.2 Configuration

- Base station: fixed known point + high-precision antenna + radio link
- Rover: ZED-F9P + mobile antenna + receiver radio
- Radio: LoRa / 4G / NTRIP
- Protocol: RTCM 3.x (MSM4 / MSM5 / MSM7)

### 15.3 Fix States

- Single point: meter-level
- SBAS: 1 ~ 2 m
- DGPS: 1 m
- RTK Float: decimeter-level
- RTK Fixed: centimeter-level (requires ≥ 4 common satellites)

## 16. Security and Privacy

- GNSS devices expose location data
- EU GDPR, California CCPA and similar laws mandate protection of location data
- Note: vehicle / personal tracking may be regulated in some jurisdictions
- Encryption: required for important data transmission
- Authentication: device authentication
