package com.example.taxi_ride.service;

import com.example.taxi_ride.model.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RideService {

    private final FareCalculatorService fareCalculatorService;
    private final DriverMatchingService driverMatchingService;
    private final Map<String, Ride> rideDatabase = new ConcurrentHashMap<>();

    public RideService(FareCalculatorService fareCalculatorService, 
                     DriverMatchingService driverMatchingService) {
        this.fareCalculatorService = fareCalculatorService;
        this.driverMatchingService = driverMatchingService;
    }

    public FareEstimate estimateFare(Location pickup, Location drop) {
        return fareCalculatorService.calculateFare(pickup, drop);
    }

    public Ride requestRide(String riderId, Location pickup, Location drop, 
                           String pickupAddress, String dropAddress) {
        // Calculate fare
        FareEstimate fareEstimate = fareCalculatorService.calculateFare(pickup, drop);
        
        // Find nearest driver
        Driver driver = driverMatchingService.findNearestDriver(pickup);
        
        // Create ride object
        Ride ride = new Ride();
        ride.setId("RIDE_" + System.currentTimeMillis());
        ride.setRiderId(riderId);
        ride.setPickupLocation(pickup);
        ride.setDropLocation(drop);
        ride.setPickupAddress(pickupAddress);
        ride.setDropAddress(dropAddress);
        ride.setDistance(fareEstimate.getDistance());
        ride.setEstimatedTime(fareEstimate.getEstimatedTime());
        ride.setBaseFare(fareEstimate.getBaseFare());
        ride.setDistanceFare(fareEstimate.getDistanceFare());
        ride.setTimeFare(fareEstimate.getTimeFare());
        ride.setTotalFare(fareEstimate.getTotalFare());
        ride.setStatus(RideStatus.REQUESTED);
        ride.setRequestedAt(LocalDateTime.now());
        
        if (driver != null) {
            ride.setDriverId(driver.getId());
            driverMatchingService.markDriverAsUnavailable(driver.getId());
            // Auto-accept for demo (in real app, driver would accept)
            acceptRide(ride.getId());
        }
        
        rideDatabase.put(ride.getId(), ride);
        return ride;
    }

    public Ride getRideDetails(String rideId) {
        return rideDatabase.get(rideId);
    }

    public Ride acceptRide(String rideId) {
        Ride ride = rideDatabase.get(rideId);
        if (ride != null) {
            ride.setStatus(RideStatus.ACCEPTED);
            ride.setAcceptedAt(LocalDateTime.now());
        }
        return ride;
    }

    public Ride updateRideStatus(String rideId, RideStatus status) {
        Ride ride = rideDatabase.get(rideId);
        if (ride != null) {
            ride.setStatus(status);
            switch (status) {
                case ARRIVING:
                    // Driver arriving at pickup
                    break;
                case STARTED:
                    ride.setStartedAt(LocalDateTime.now());
                    break;
                case COMPLETED:
                    ride.setCompletedAt(LocalDateTime.now());
                    // Mark driver as available again
                    if (ride.getDriverId() != null) {
                        driverMatchingService.markDriverAsAvailable(ride.getDriverId());
                    }
                    break;
                case CANCELLED:
                    if (ride.getDriverId() != null) {
                        driverMatchingService.markDriverAsAvailable(ride.getDriverId());
                    }
                    break;
            }
        }
        return ride;
    }

    public Ride submitRating(String rideId, double riderRating, String riderFeedback) {
        Ride ride = rideDatabase.get(rideId);
        if (ride != null) {
            ride.setRiderRating(riderRating);
            ride.setRiderFeedback(riderFeedback);
        }
        return ride;
    }

    public Map<String, Ride> getAllRidesByRider(String riderId) {
        Map<String, Ride> rides = new ConcurrentHashMap<>();
        rideDatabase.forEach((rideId, ride) -> {
            if (ride.getRiderId().equals(riderId)) {
                rides.put(rideId, ride);
            }
        });
        return rides;
    }
}
