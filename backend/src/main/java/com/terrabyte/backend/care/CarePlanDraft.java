package com.terrabyte.backend.care;

import java.util.List;

record CarePlanDraft(
        List<Priority> managementPriorities,
        List<Factor> factorDiagnostics,
        List<Task> todayTasks,
        List<Criterion> cultivationCriteria,
        List<Improvement> improvementActions,
        List<Schedule> weeklySchedule,
        Outcome expectedOutcome,
        List<Product> recommendedProducts) {

    record Task(String priority, String title, String body, String time) {
    }

    record Priority(String factorKey, String title) {
    }

    record Factor(String factorKey, String finding, String recommendation) {
    }

    record Criterion(String label, String title, String body) {
    }

    record Improvement(String tag, String title, String body, String effect) {
    }

    record Schedule(String day, String title, String body) {
    }

    record Outcome(String title, String body, Double expectedScore) {
    }

    record Product(String productId, String reason) {
    }
}
