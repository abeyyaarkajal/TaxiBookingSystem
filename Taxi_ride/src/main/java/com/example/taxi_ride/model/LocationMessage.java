package com.example.taxi_ride.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationMessage {
    private String driverId;
    private String rideId;
    private double latitude;
    private double longitude;
    private long timestamp;
}
