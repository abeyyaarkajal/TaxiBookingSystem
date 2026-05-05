package com.example.taxi_ride.service;

import com.example.taxi_ride.model.FareEstimate;
import com.example.taxi_ride.model.Location;
import org.springframework.stereotype.Service;

@Service
public class FareCalculatorService {

    private static final double BASE_FARE = 50.0; // Base fare in rupees/currency
    private static final double PER_KM_RATE = 15.0; // Per km rate
    private static final double PER_MIN_RATE = 2.0; // Per minute rate

    public FareEstimate calculateFare(Location pickup, Location drop) {
        double distance = calculateDistance(pickup.getLat(), pickup.getLng(), 
                                           drop.getLat(), drop.getLng());
        
        // Estimate time: approximate 40 km/hr average speed
        double estimatedTime = (distance / 40.0) * 60.0; // in minutes
        
        double distanceFare = distance * PER_KM_RATE;
        double timeFare = estimatedTime * PER_MIN_RATE;
        double totalFare = BASE_FARE + distanceFare + timeFare;

        FareEstimate estimate = new FareEstimate();
        estimate.setBaseFare(BASE_FARE);
        estimate.setDistance(Math.round(distance * 100.0) / 100.0);
        estimate.setPerKmRate(PER_KM_RATE);
        estimate.setDistanceFare(Math.round(distanceFare * 100.0) / 100.0);
        estimate.setEstimatedTime(Math.round(estimatedTime * 100.0) / 100.0);
        estimate.setPerMinRate(PER_MIN_RATE);
        estimate.setTimeFare(Math.round(timeFare * 100.0) / 100.0);
        estimate.setTotalFare(Math.round(totalFare * 100.0) / 100.0);

        return estimate;
    }

    // Haversine formula to calculate distance between two coordinates
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c; // distance in km

        return distance;
    }
}
