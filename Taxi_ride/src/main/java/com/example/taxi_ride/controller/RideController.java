package com.example.taxi_ride.controller; // Updated package name

import com.example.taxi_ride.model.*; // Updated import
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Controller
@CrossOrigin
public class RideController {

    private final SimpMessagingTemplate messagingTemplate;
    private Map<String, Object> activeRides = new ConcurrentHashMap<>();

    public RideController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/request-ride")
    @SendTo("/topic/ride-requests")
    public Object requestRide(Object request) {
        System.out.println("Ride Requested");
        return request;
    }

    @MessageMapping("/accept-ride")
    public void acceptRide(Map<String, Object> update) {
        messagingTemplate.convertAndSend("/topic/ride-status/latest", update);
    }
}