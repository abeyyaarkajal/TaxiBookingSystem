package com.example.taxi_ride.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideRequest {
    private String riderId;
    private double pickupLat;
    private double pickupLng;
    private double dropLat;
    private double dropLng;
    private String pickupAddress;
    private String dropAddress;
}
