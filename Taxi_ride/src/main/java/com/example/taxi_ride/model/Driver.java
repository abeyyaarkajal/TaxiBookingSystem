package com.example.taxi_ride.model;

import javax.persistence.*;

@Entity
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phoneNumber;
    private String licenseNumber;
    private boolean available;
    private Double earnings = 0.0;

    // Getters, setters, constructors
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Driver {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private double rating;
    private int totalRides;
    private String vehicleNumber;
    private String vehicleType; // Sedan, SUV, etc.
    private String vehicleColor;
    private Location currentLocation;
    private boolean isOnline;
    private boolean isAvailable;
    private LocalDateTime createdAt;
    private String profileImageUrl;
}
