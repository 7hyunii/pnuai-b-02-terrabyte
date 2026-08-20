package com.terrabyte.backend.score;

public record CropRecommendationResponse(
        String cropCode,
        String cropName,
        double total,
        String reason,
        String caution) {
}
