
package com.example.taxi_ride.model; // Updated package name

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
class Location {
    private double lat;
    private double lng;
}

@Data @AllArgsConstructor @NoArgsConstructor
public class RideModels { // Changed class name to match file
    private String id;
    private String riderName;
    private Location pickup;
    private Location drop;
    private double fare;
    private String status; 
    private String driverId;
}