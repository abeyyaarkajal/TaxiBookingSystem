package com.example.taxi_ride.controller;

import com.example.taxi_ride.model.*;
import com.example.taxi_ride.service.RideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/rides")
@CrossOrigin(origins = "*")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    // Estimate fare for given locations
    @PostMapping("/estimate-fare")
    public ResponseEntity<FareEstimate> estimateFare(@RequestBody FareEstimateRequest request) {
        FareEstimate estimate = rideService.estimateFare(
                new Location(request.getPickupLat(), request.getPickupLng()),
                new Location(request.getDropLat(), request.getDropLng())
        );
        return ResponseEntity.ok(estimate);
    }

    // Request a new ride
    @PostMapping("/request")
    public ResponseEntity<Ride> requestRide(@RequestBody RideRequest request) {
        Ride ride = rideService.requestRide(
                request.getRiderId(),
                new Location(request.getPickupLat(), request.getPickupLng()),
                new Location(request.getDropLat(), request.getDropLng()),
                request.getPickupAddress(),
                request.getDropAddress()
        );
        return ResponseEntity.ok(ride);
    }

    // Get ride details
    @GetMapping("/{rideId}")
    public ResponseEntity<Ride> getRideDetails(@PathVariable String rideId) {
        Ride ride = rideService.getRideDetails(rideId);
        if (ride != null) {
            return ResponseEntity.ok(ride);
        }
        return ResponseEntity.notFound().build();
    }

    // Accept ride (driver action, but exposed here)
    @PostMapping("/{rideId}/accept")
    public ResponseEntity<Ride> acceptRide(@PathVariable String rideId) {
        Ride ride = rideService.acceptRide(rideId);
        if (ride != null) {
            return ResponseEntity.ok(ride);
        }
        return ResponseEntity.notFound().build();
    }

    // Update ride status
    @PutMapping("/{rideId}/status")
    public ResponseEntity<Ride> updateRideStatus(
            @PathVariable String rideId,
            @RequestParam RideStatus status) {
        Ride ride = rideService.updateRideStatus(rideId, status);
        if (ride != null) {
            return ResponseEntity.ok(ride);
        }
        return ResponseEntity.notFound().build();
    }

    // Submit rating and feedback
    @PostMapping("/{rideId}/rate")
    public ResponseEntity<Ride> submitRating(
            @PathVariable String rideId,
            @RequestBody RatingRequest request) {
        Ride ride = rideService.submitRating(rideId, request.getRating(), request.getFeedback());
        if (ride != null) {
            return ResponseEntity.ok(ride);
        }
        return ResponseEntity.notFound().build();
    }

    // Get all rides for a rider
    @GetMapping("/rider/{riderId}")
    public ResponseEntity<Map<String, Ride>> getRiderRides(@PathVariable String riderId) {
        Map<String, Ride> rides = rideService.getAllRidesByRider(riderId);
        return ResponseEntity.ok(rides);
    }
}

