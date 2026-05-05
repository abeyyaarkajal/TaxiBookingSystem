package com.example.taxi_ride.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideStatusMessage {
    private String rideId;
    private String status;
    private String driverId;
    private long timestamp;
}
