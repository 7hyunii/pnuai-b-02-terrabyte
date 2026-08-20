import { StyleSheet, Text, View } from 'react-native';

import { font } from '../../appTheme/glass';
import { palette } from '../../appTheme/palette';
import { scaleTypography } from '../../appTheme/scaleTypography';
import { typeScale } from '../../appTheme/typography';
import { LineChart } from '../../components/LineChart';
import { Surface } from '../../components/Surface';
import { liveMetricDefinitions } from '../../data';
import {
  useDeviceEnvironment,
  useMeasurementSeries,
} from '../../shared/device-environment/DeviceEnvironmentProvider';

export function LiveScreen({ compact }: { compact: boolean }) {
  const { measurements: measurement } = useDeviceEnvironment();
  const airTemperatureSeries = useMeasurementSeries('air_temperature_c', '1h');
  const airHumiditySeries = useMeasurementSeries('air_humidity_pct', '1h');
  const plantLightSeries = useMeasurementSeries('plant_light_ppfd_umol_m2_s', '1h');
  const soilMoistureSeries = useMeasurementSeries('soil_moisture_pct', '1h');
  const soilTemperatureSeries = useMeasurementSeries('soil_temperature_c', '1h');

  const values = measurement?.measurements;
  const currentValues = {
    air_temperature_c: values?.airTemperatureC,
    air_humidity_pct: values?.airHumidityPct,
    plant_light_ppfd_umol_m2_s: values?.plantLightPpfdUmolM2S,
    soil_moisture_pct: values?.soilMoisturePct,
    soil_temperature_c: values?.soilTemperatureC,
  };
  const measurementSeriesByMetric = {
    air_temperature_c: airTemperatureSeries,
    air_humidity_pct: airHumiditySeries,
    plant_light_ppfd_umol_m2_s: plantLightSeries,
    soil_moisture_pct: soilMoistureSeries,
    soil_temperature_c: soilTemperatureSeries,
  };
  const liveMetrics = liveMetricDefinitions.map((metric) => {
    const current = currentValues[metric.key];
    const series = measurementSeriesByMetric[metric.key];
    const seriesValues = series.points.map((point) => point.value);
    return {
      ...metric,
      current,
      series,
      seriesValues,
      value: current == null ? '--' : `${current.toLocaleString('ko-KR')}${metric.unit}`,
    };
  });

  return (
    <View style={styles.pageBody}>
      <Text style={styles.liveRefresh}>3초마다 자동 갱신{measurement ? ` · 업데이트 #${measurement.sequence}` : ''}</Text>
      <View style={[styles.liveGrid, compact && styles.stack]}>
        {liveMetrics.map((metric) => (
          <Surface flat key={metric.label} style={styles.liveCard}>
            <View style={styles.liveCardHeader}>
              <Text style={styles.liveLabel}>{metric.label}</Text>
              <Text style={styles.liveRange}>{metric.rangeLabel}</Text>
            </View>
            <Text style={styles.liveValue}>{metric.value}</Text>
            <Text style={styles.liveCaption}>{metric.current == null && metric.key === 'soil_temperature_c' ? '프로브 미연결' : '현재 측정값'}</Text>
          {metric.seriesValues.length >= 2 ? (
            <>
              <LineChart
                gridLines={1}
                height={72}
                series={[{ color: metric.color, values: metric.seriesValues }]}
                showLegend={false}
              />
              <View style={styles.liveFooter}>
                <Text style={styles.liveFooterText}>최저 {Math.min(...metric.seriesValues).toLocaleString('ko-KR')}{metric.unit}</Text>
                <Text style={styles.liveFooterText}>최고 {Math.max(...metric.seriesValues).toLocaleString('ko-KR')}{metric.unit}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.liveCaption}>
              {metric.series.loading
                ? '최근 1시간 추이를 불러오는 중'
                : metric.series.error
                  ? '최근 1시간 추이를 불러오지 못했습니다'
                  : '표시할 추이 데이터가 아직 없습니다'}
            </Text>
          )}
        </Surface>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create(scaleTypography({
  pageBody: { gap: 30, maxWidth: 1320, width: '100%' },
  liveRefresh: { ...typeScale.caption, alignSelf: 'flex-end', color: palette.muted, fontFamily: font },
  liveGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  stack: { flexDirection: 'column' },
  liveCard: { flexBasis: '47%', flexGrow: 1, gap: 14, minWidth: 280, padding: 34 },
  liveCardHeader: { alignItems: 'flex-start', flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  liveLabel: { ...typeScale.cardTitle, color: palette.text, fontFamily: font, fontWeight: '700' },
  liveRange: { ...typeScale.caption, color: palette.muted, fontFamily: font, textAlign: 'right' },
  liveValue: { ...typeScale.metric, color: palette.text, fontFamily: font },
  liveCaption: { ...typeScale.body, color: palette.muted, fontFamily: font },
  liveFooter: { borderTopColor: palette.line, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 },
  liveFooterText: { ...typeScale.caption, color: palette.muted, fontFamily: font },
}));
