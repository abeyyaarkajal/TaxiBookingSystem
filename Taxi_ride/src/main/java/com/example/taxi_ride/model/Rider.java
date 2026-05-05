package com.example.taxi_ride.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rider {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private double rating;
    private int totalRides;
    private LocalDateTime createdAt;
    private String profileImageUrl;
    private boolean isActive;
}
