# TaxiBookingSystem
Taxi / Ride Booking System (Basic Ola/Uber Lite)
1. Background
Urban commuters often struggle with finding reliable transportation, negotiating prices, and estimating arrival times. Traditional taxi services lack transparency, while drivers often roam empty streets looking for passengers. A digital platform is needed to bridge this gap efficiently.
2. Challenge
Develop a real-time ride-hailing platform that connects riders with nearby drivers. The system must handle geolocation updates, fair pricing estimation, and live trip tracking to ensure a safe and transparent travel experience for both parties.
3. User Roles & Flow
Rider (Passenger)
•       Location Setup: Selects pickup and drop-off locations on a map.
•       Fare Estimate: Views estimated price and time before confirming the booking.
•       Booking: Requests a ride and waits for driver acceptance.
•       Live Tracking: Tracks the driver's location in real-time as they approach.
•       Payment & Rating: Pays via digital wallet/cash and rates the driver after the trip.
Driver
•       Availability Toggle: Goes Online to receive ride requests.
•       Ride Request: Receives a popup with pickup distance and estimated fare.
•       Accept/Reject: Has a limited time (e.g., 15 seconds) to accept the ride.
•       Trip Management: Marks trip as Started and Completed.
4. Core Requirements
Functional
•       Geolocation Service: Precise handling of latitude/longitude for tracking.
•       Matching Algorithm: Find the nearest available driver within a specific radius.
•       Real-Time Updates: Instant status changes without page reloads.
•       Fare Calculator: Logic to calculate cost based on distance and duration.
•       Ride History: A log of past trips for both users.
5. Technical Hints
•       Frontend: React Native or Flutter (Mobile Apps are essential here).
•       Backend: Java (Spring Boot) — Recommended. Use Spring WebSocket (STOMP over WebSocket) for real-time driver location updates, Spring Data JPA with PostGIS (PostgreSQL extension) for efficient geo-queries to find nearest drivers, Spring Security for JWT auth.
•       Database: PostgreSQL with PostGIS for location queries, or MongoDB with GeoJSON support.
•       Maps API: Google Maps API, Mapbox, or OpenStreetMap (Leaflet) for rendering maps and calculating routes.
6. Hackathon Deliverables
•       Matching Flow: Rider requests → Nearest Driver gets alert → Driver accepts.
•       Tracking Flow: Simulation of driver moving on the map towards the rider.
•       Completion Flow: Trip end → Fare calculation → Summary screen.
•       Algorithm Explanation: How the system queries the database to find the nearest driver efficiently.
7. Judging Criteria
Category
Weight
Real-Time Performance (Smoothness of tracking)
25%
Matching Logic (Efficiency of finding drivers)
25%
User Experience/UI (Map interaction & ease of use)
20%
Map Integration (Accuracy of routes/distance)
15%
Feature Completeness (End-to-end flow)
15%

 
8. Outcome
A reliable and transparent transportation network that reduces wait times for passengers and increases earning potential for drivers through efficient, location-based matchmaking.
