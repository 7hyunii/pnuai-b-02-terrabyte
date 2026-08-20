import { StyleSheet, Text, View } from 'react-native';

import { font } from '../appTheme/glass';
import { palette } from '../appTheme/palette';
import { scaleTypography } from '../appTheme/scaleTypography';
import { typeScale } from '../appTheme/typography';
import type { Sensor } from '../data';
import type { DeviceSensorStatus } from '../sensor/sensorApi';

type SensorSummaryProps = {
  sensors: Array<Sensor | DeviceSensorStatus>;
  statusLabel: string;
};

function isDeviceSensorStatus(sensor: Sensor | DeviceSensorStatus): sensor is DeviceSensorStatus {
  return 'status' in sensor;
}

const statusLabelByValue: Record<DeviceSensorStatus['status'], string> = {
  ONLINE: '정상',
  OFFLINE: '오프라인',
  UNAVAILABLE: '사용 불가',
  UNKNOWN: '상태 미확인',
};

export function SensorSummary({ sensors, statusLabel }: SensorSummaryProps) {
  const total = sensors.length;
  const onlineCount = sensors.filter((sensor) => !isDeviceSensorStatus(sensor) || sensor.status === 'ONLINE').length;

  return (
    <View style={styles.root}>
      <View style={styles.overview}>
        <View>
          <Text style={styles.overviewValue}>{total}</Text>
          <Text style={styles.overviewLabel}>연결 센서</Text>
        </View>
        <View>
          <Text style={styles.overviewValue}>{onlineCount}</Text>
          <Text style={styles.overviewLabel}>정상 작동</Text>
        </View>
      </View>
      <View style={styles.list}>
        {sensors.map((sensor, index) => {
          const dynamicSensor = isDeviceSensorStatus(sensor);
          const currentStatus = dynamicSensor ? sensor.status : 'ONLINE';
          const detail = dynamicSensor
            ? `${sensor.potLabel} · ${sensor.metric} · ${statusLabelByValue[sensor.status]}`
            : `${sensor.model} · #${String(index + 1).padStart(2, '0')} · ${statusLabel}`;
          return (
            <View key={dynamicSensor ? sensor.id : sensor.label} style={styles.item}>
              <View style={[styles.statusDot, currentStatus !== 'ONLINE' && styles.statusDotInactive]} />
              <View style={styles.copy}>
                <Text style={styles.name}>{sensor.label}</Text>
                <Text style={styles.meta}>{detail}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create(
  scaleTypography({
    root: { gap: 26 },
    overview: { flexDirection: 'row', gap: 34 },
    overviewValue: { ...typeScale.metric, color: palette.text, fontFamily: font },
    overviewLabel: { ...typeScale.label, color: palette.muted, fontFamily: font },
    list: { gap: 10 },
    item: {
      alignItems: 'center',
      backgroundColor: palette.panelMuted,
      borderColor: palette.lineStrong,
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 13,
      minHeight: 82,
      padding: 17,
    },
    statusDot: { backgroundColor: '#3aad70', borderRadius: 999, height: 7, width: 7 },
    statusDotInactive: { backgroundColor: palette.muted },
    copy: { flex: 1, gap: 4 },
    name: { ...typeScale.cardTitle, color: palette.text, fontFamily: font, fontSize: 18, fontWeight: '600', lineHeight: 25 },
    meta: { ...typeScale.caption, color: palette.muted, fontFamily: font, fontSize: 12, lineHeight: 18 },
  }),
);
