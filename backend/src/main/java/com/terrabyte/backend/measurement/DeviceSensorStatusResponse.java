package com.terrabyte.backend.measurement;

import java.util.List;

public record DeviceSensorStatusResponse(
        long deviceId,
        List<SensorStatus> sensors) {

    public record SensorStatus(
            String id,
            long potId,
            String potLabel,
            String label,
            String metric,
            Status status) {
    }

    public enum Status {
        ONLINE,
        OFFLINE,
        UNAVAILABLE,
        UNKNOWN
    }
}
