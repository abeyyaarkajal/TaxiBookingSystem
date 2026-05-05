package com.example.taxi_ride.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FareEstimate {
    private double baseFare;
    private double distance;
    private double perKmRate;
    private double distanceFare;
    private double estimatedTime;
    private double perMinRate;
    private double timeFare;
    private double totalFare;
}
