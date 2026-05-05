package com.example.taxi_ride.service;

import com.example.taxi_ride.model.Driver;
import com.example.taxi_ride.model.Location;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DriverMatchingService {

    // Mock database - In real app, fetch from database
    private final List<Driver> availableDrivers = new ArrayList<>();

    public DriverMatchingService() {
        // Mock drivers for testing
        initializeMockDrivers();
    }

    private void initializeMockDrivers() {
        // You can add mock drivers here
        Driver driver1 = new Driver();
        driver1.setId("DRIVER001");
        driver1.setName("Rajesh Kumar");
        driver1.setVehicleType("Sedan");
        driver1.setVehicleColor("Silver");
        driver1.setVehicleNumber("KA-01-AB-1234");
        driver1.setRating(4.8);
        driver1.setCurrentLocation(new Location(12.9716, 77.5946)); // Bangalore
        driver1.setOnline(true);
        driver1.setAvailable(true);
        availableDrivers.add(driver1);

        Driver driver2 = new Driver();
        driver2.setId("DRIVER002");
        driver2.setName("Priya Singh");
        driver2.setVehicleType("SUV");
        driver2.setVehicleColor("Black");
        driver2.setVehicleNumber("KA-01-CD-5678");
        driver2.setRating(4.9);
        driver2.setCurrentLocation(new Location(12.9352, 77.6245));
        driver2.setOnline(true);
        driver2.setAvailable(true);
        availableDrivers.add(driver2);

        Driver driver3 = new Driver();
        driver3.setId("DRIVER003");
        driver3.setName("Amit Patel");
        driver3.setVehicleType("Sedan");
        driver3.setVehicleColor("White");
        driver3.setVehicleNumber("KA-01-EF-9012");
        driver3.setRating(4.7);
        driver3.setCurrentLocation(new Location(12.9689, 77.6099));
        driver3.setOnline(true);
        driver3.setAvailable(true);
        availableDrivers.add(driver3);
    }

    public Driver findNearestDriver(Location pickupLocation) {
        return availableDrivers.stream()
                .filter(Driver::isAvailable)
                .filter(Driver::isOnline)
                .min(Comparator.comparingDouble(driver -> 
                    calculateDistance(driver.getCurrentLocation().getLat(), 
                                    driver.getCurrentLocation().getLng(),
                                    pickupLocation.getLat(), 
                                    pickupLocation.getLng())))
                .orElse(null);
    }

    public List<Driver> findNearestDrivers(Location pickupLocation, int limit) {
        return availableDrivers.stream()
                .filter(Driver::isAvailable)
                .filter(Driver::isOnline)
                .sorted(Comparator.comparingDouble(driver -> 
                    calculateDistance(driver.getCurrentLocation().getLat(), 
                                    driver.getCurrentLocation().getLng(),
                                    pickupLocation.getLat(), 
                                    pickupLocation.getLng())))
                .limit(limit)
                .toList();
    }

    public void markDriverAsUnavailable(String driverId) {
        availableDrivers.stream()
                .filter(d -> d.getId().equals(driverId))
                .findFirst()
                .ifPresent(driver -> driver.setAvailable(false));
    }

    public void markDriverAsAvailable(String driverId) {
        availableDrivers.stream()
                .filter(d -> d.getId().equals(driverId))
                .findFirst()
                .ifPresent(driver -> driver.setAvailable(true));
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
