package com.terrabyte.backend.measurement;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface MeasurementStore {

    void write(TelemetrySample sample);

    Optional<TelemetrySample> findLatest(long potId);

    List<TelemetrySample> findSamples(long potId, Instant start);

    List<MeasurementPoint> findPoints(
            long potId,
            MeasurementMetric metric,
            Instant start);
}
