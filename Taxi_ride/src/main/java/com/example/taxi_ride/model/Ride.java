package com.example.taxi_ride.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ride {
    private String id;
    private String riderId;
    private String driverId;
    private Location pickupLocation;
    private Location dropLocation;
    private String pickupAddress;
    private String dropAddress;
    private double distance;
    private double estimatedTime;
    private double baseFare;
    private double distanceFare;
    private double timeFare;
    private double totalFare;
    private RideStatus status;
    private LocalDateTime requestedAt;
    private LocalDateTime acceptedAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private double riderRating;
    private String riderFeedback;
    private double driverRating;
    private String driverFeedback;
    private String paymentMethod; // CASH, CARD, WALLET
    private boolean isPaid;
}
