package com.terrabyte.backend.measurement;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/devices")
public class DeviceSensorController {

    private final MeasurementService measurementService;

    public DeviceSensorController(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }

    @GetMapping("/{deviceId}/sensors")
    public DeviceSensorStatusResponse sensors(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable long deviceId) {
        return measurementService.sensorStatus(Long.parseLong(jwt.getSubject()), deviceId);
    }
}
