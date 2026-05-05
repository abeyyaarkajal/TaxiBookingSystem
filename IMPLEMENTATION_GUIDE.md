# Taxi Booking System - Rider Module

A complete implementation of the Rider (Passenger) module for a Taxi/Ride Booking System similar to Uber/Ola Lite.

## Project Structure

```
TaxiBookingSystem/
├── Taxi_ride/                    # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/example/taxi_ride/
│   │       ├── model/            # Data models
│   │       │   ├── Rider.java
│   │       │   ├── Driver.java
│   │       │   ├── Ride.java
│   │       │   ├── Location.java
│   │       │   ├── RideStatus.java
│   │       │   ├── FareEstimate.java
│   │       │   └── LocationMessage.java
│   │       ├── service/          # Business logic
│   │       │   ├── FareCalculatorService.java
│   │       │   ├── DriverMatchingService.java
│   │       │   └── RideService.java
│   │       ├── controller/       # REST APIs & WebSocket
│   │       │   ├── RideController.java
│   │       │   ├── RideWebSocketController.java
│   │       │   ├── FareEstimateRequest.java
│   │       │   ├── RideRequest.java
│   │       │   ├── RatingRequest.java
│   │       │   └── RideStatusMessage.java
│   │       ├── config/           # Configuration
│   │       │   └── WebSocketConfig.java
│   │       └── TaxiRideApplication.java
│   └── pom.xml                   # Maven dependencies
│
└── RiderApp/                      # React Native Frontend
    ├── src/
    │   ├── screens/              # UI Screens
    │   │   ├── HomeScreen.js
    │   │   ├── LocationSelectionScreen.js
    │   │   ├── FareEstimateScreen.js
    │   │   ├── SearchingDriverScreen.js
    │   │   ├── DriverAssignedScreen.js
    │   │   ├── LiveTrackingScreen.js
    │   │   └── TripSummaryScreen.js
    │   ├── components/           # Reusable components
    │   ├── redux/                # State management
    │   │   ├── store.js
    │   │   └── rideSlice.js
    │   ├── services/             # API & WebSocket services
    │   │   ├── rideAPI.js
    │   │   └── websocketService.js
    │   └── utils/                # Utility functions
    ├── App.js                    # Main app component with navigation
    ├── package.json
    └── app.json
```

## Backend Setup (Spring Boot)

### Prerequisites
- Java 17+
- Maven 3.6+
- Spring Boot 4.0.6

### Installation & Running

1. **Navigate to the Taxi_ride directory:**
   ```bash
   cd Taxi_ride
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

   OR

   ```bash
   mvn spring-boot:run
   ```

The server will start on `http://localhost:8080`

### API Endpoints

#### Fare Estimation
- **POST** `/api/v1/rides/estimate-fare`
  ```json
  {
    "pickupLat": 12.9716,
    "pickupLng": 77.5946,
    "dropLat": 13.0827,
    "dropLng": 77.5033
  }
  ```
  **Response:**
  ```json
  {
    "baseFare": 50.0,
    "distance": 12.45,
    "distanceFare": 186.75,
    "estimatedTime": 18.67,
    "timeFare": 37.34,
    "totalFare": 274.09
  }
  ```

#### Request a Ride
- **POST** `/api/v1/rides/request`
  ```json
  {
    "riderId": "RIDER_001",
    "pickupLat": 12.9716,
    "pickupLng": 77.5946,
    "dropLat": 13.0827,
    "dropLng": 77.5033,
    "pickupAddress": "Bangalore Airport",
    "dropAddress": "MG Road"
  }
  ```
  **Response:**
  ```json
  {
    "id": "RIDE_1234567890",
    "riderId": "RIDER_001",
    "pickupLocation": {"lat": 12.9716, "lng": 77.5946},
    "dropLocation": {"lat": 13.0827, "lng": 77.5033},
    "status": "REQUESTED",
    "totalFare": 274.09,
    "requestedAt": "2024-05-05T10:30:00"
  }
  ```

#### Get Ride Details
- **GET** `/api/v1/rides/{rideId}`

#### Update Ride Status
- **PUT** `/api/v1/rides/{rideId}/status?status=ACCEPTED`

Supported statuses: `REQUESTED`, `ACCEPTED`, `ARRIVING`, `STARTED`, `COMPLETED`, `CANCELLED`

#### Submit Rating
- **POST** `/api/v1/rides/{rideId}/rate`
  ```json
  {
    "rating": 4.5,
    "feedback": "Great driver, smooth ride!"
  }
  ```

### WebSocket Configuration

- **Endpoint:** `ws://localhost:8080/ws-ride`
- **Subscribe to driver location:** `/topic/ride/{rideId}/location`
- **Subscribe to ride status:** `/topic/ride/{rideId}/status`
- **Send location update:** `/app/ride/{rideId}/location`
- **Send status update:** `/app/ride/{rideId}/status`

## Frontend Setup (React Native)

### Prerequisites
- Node.js 16+
- npm or yarn
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)

### Installation & Running

1. **Navigate to RiderApp directory:**
   ```bash
   cd RiderApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API URL:**
   Edit `src/services/rideAPI.js` and `src/services/websocketService.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_BACKEND_IP:8080/api/v1';
   const websocketURL = 'ws://YOUR_BACKEND_IP:8080/ws-ride';
   ```

4. **Run on Android:**
   ```bash
   npm run android
   ```

5. **Run on iOS:**
   ```bash
   npm run ios
   ```

## Features Implemented

### ✅ Rider Functionality

1. **Location Selection**
   - Auto-detect current location using GPS
   - Search for locations
   - Select pickup and drop-off points on map

2. **Fare Estimation**
   - Real-time fare calculation
   - Distance and duration estimates
   - Fare breakdown (base + distance + time)

3. **Ride Booking**
   - Request ride with selected locations
   - Auto-assign nearest driver
   - Show "Searching for driver" state

4. **Real-Time Tracking**
   - WebSocket integration for live updates
   - Display driver's current location on map
   - Show ETA and distance to pickup

5. **Ride Lifecycle States**
   - REQUESTED → ACCEPTED → ARRIVING → STARTED → COMPLETED
   - UI updates based on status changes

6. **Post-Trip**
   - Display fare summary
   - Rate driver (1-5 stars)
   - Add feedback/comments
   - Ride history

## State Management (Redux)

### Ride Slice Actions

- `estimateFare` - Calculate fare for route
- `requestRide` - Request a new ride
- `getRideDetails` - Fetch ride information
- `submitRating` - Submit driver rating
- `updateDriverLocation` - Update driver's location
- `updateRideStatus` - Update ride status
- `clearCurrentRide` - Clear ride data

## Technical Implementation Details

### Fare Calculation Formula
```
Total Fare = Base Fare + (Distance × Per-km Rate) + (Time × Per-min Rate)

Base Fare: ₹50
Per-km Rate: ₹15
Per-min Rate: ₹2
```

### Driver Matching Algorithm
- Uses Haversine formula to calculate distance
- Finds nearest available driver within service area
- Marks driver as unavailable after assignment

### WebSocket Features
- Real-time location streaming
- Instant status updates
- Automatic reconnection handling

## Testing the System

### Manual Testing Steps

1. **Start Backend:**
   ```bash
   cd Taxi_ride
   ./mvnw spring-boot:run
   ```

2. **Start Frontend:**
   ```bash
   cd RiderApp
   npm run android  # or npm run ios
   ```

3. **Test Flow:**
   - Open app → Home screen
   - Select pickup location
   - Select drop location
   - View fare estimate
   - Book ride
   - See driver assignment
   - Track driver in real-time
   - Complete ride
   - Rate driver

## Mock Data

The system includes mock drivers for testing:
- **Driver 1:** Rajesh Kumar, Sedan, Rating: 4.8
- **Driver 2:** Priya Singh, SUV, Rating: 4.9
- **Driver 3:** Amit Patel, Sedan, Rating: 4.7

## Performance Optimization

1. **Frontend:**
   - Redux for efficient state management
   - Memoized components to prevent unnecessary re-renders
   - Async API calls with thunks

2. **Backend:**
   - Service layer for business logic separation
   - Concurrent hash maps for thread-safe operations
   - Efficient geolocation calculations using Haversine formula

## Security Considerations

1. **API Security:**
   - Add JWT authentication
   - Implement role-based access control
   - Input validation

2. **Data:**
   - Use HTTPS in production
   - Encrypt sensitive data
   - Validate user permissions

## Future Enhancements

1. **Database Integration:**
   - PostgreSQL with PostGIS for geospatial queries
   - Persistent ride history
   - User profiles and preferences

2. **Advanced Features:**
   - Shared rides/carpooling
   - Scheduled rides
   - Emergency contacts
   - Multiple payment methods
   - Loyalty program

3. **Driver Module:**
   - Driver app (complementary)
   - Route optimization
   - Document verification

4. **Analytics:**
   - Ride statistics
   - User analytics
   - Driver performance metrics

## Environment Variables

Create `.env` file in RiderApp:
```
REACT_APP_API_URL=http://YOUR_IP:8080/api/v1
REACT_APP_WS_URL=ws://YOUR_IP:8080/ws-ride
```

## Troubleshooting

### Connection Issues
- Ensure backend is running: `curl http://localhost:8080`
- Check IP address in API config matches your backend server
- Firewall may block connections: add exceptions if needed

### WebSocket Connection Failed
- Verify WebSocket endpoint is correct
- Check network connectivity
- Ensure backend supports STOMP over WebSocket

### Build Errors
- Clear node modules: `rm -rf node_modules && npm install`
- Clear Maven cache: `mvn clean`
- Ensure Java 17+ is installed

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Last Updated:** May 5, 2024
**Version:** 1.0.0
