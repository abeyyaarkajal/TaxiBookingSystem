
package com.example.taxi_ride.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class RideModels {
    private String id;
    private String riderName;
    private Location pickup;
    private Location drop;
    private double fare;
    private String status; 
    private String driverId;
}