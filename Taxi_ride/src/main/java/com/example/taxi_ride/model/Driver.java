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
}
