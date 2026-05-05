package com.example.taxi_ride.controller;

import com.example.taxi_ride.model.LocationMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RideWebSocketController {

    // Handle driver location updates
    @MessageMapping("/ride/{rideId}/location")
    @SendTo("/topic/ride/{rideId}/location")
    public LocationMessage updateDriverLocation(
            LocationMessage locationMessage,
            @DestinationVariable String rideId) {
        locationMessage.setRideId(rideId);
        locationMessage.setTimestamp(System.currentTimeMillis());
        return locationMessage;
    }

    // Handle ride status updates
    @MessageMapping("/ride/{rideId}/status")
    @SendTo("/topic/ride/{rideId}/status")
    public RideStatusMessage updateRideStatus(
            RideStatusMessage statusMessage,
            @DestinationVariable String rideId) {
        statusMessage.setRideId(rideId);
        statusMessage.setTimestamp(System.currentTimeMillis());
        return statusMessage;
    }
}
