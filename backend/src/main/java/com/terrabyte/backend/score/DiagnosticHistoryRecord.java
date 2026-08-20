package com.terrabyte.backend.score;

import java.time.Instant;

public record DiagnosticHistoryRecord(
        Instant observedAt,
        double score,
        String summary,
        String issues) {
}
