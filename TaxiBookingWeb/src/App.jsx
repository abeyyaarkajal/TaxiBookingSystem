import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LocationSelectionScreen from './screens/LocationSelectionScreen';
import FareEstimateScreen from './screens/FareEstimateScreen';
import SearchingDriverScreen from './screens/SearchingDriverScreen';
import DriverAssignedScreen from './screens/DriverAssignedScreen';
import DriverDashboard from './screens/DriverDashboard';
import LiveTrackingScreen from './screens/LiveTrackingScreen';
import TripSummaryScreen from './screens/TripSummaryScreen';
import websocketService from './services/websocketService';

function App() {
  const [rideData, setRideData] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const initializeWebSocket = async () => {
      try {
        await websocketService.connect();
        // register listeners
        websocketService.addLocationListener((locationData) => {
          console.log('Location update:', locationData);
          if (rideData) {
            setRideData({
              ...rideData,
              driverLocation: locationData,
            });
          }
        });

        websocketService.addRideListener((rideUpdate) => {
          console.log('Ride update:', rideUpdate);
          if (rideData) {
            setRideData({
              ...rideData,
              status: rideUpdate.status,
            });
          }
        });
      } catch (error) {
        console.error('WebSocket connection failed:', error);
        setError('Real-time updates unavailable. You can still book rides.');
      }
    };

    initializeWebSocket();

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const navigateTo = (screen, data = null) => {
    if (data) {
      setRideData({ ...rideData, ...data });
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'location':
        return <LocationSelectionScreen onNavigate={navigateTo} rideData={rideData} />;
      case 'fare':
        return <FareEstimateScreen onNavigate={navigateTo} rideData={rideData} />;
      case 'searching':
        return <SearchingDriverScreen onNavigate={navigateTo} rideData={rideData} />;
      case 'assigned':
        return <DriverAssignedScreen onNavigate={navigateTo} rideData={rideData} />;
      case 'driver':
        return <DriverDashboard onNavigate={navigateTo} />;
      case 'tracking':
        return <LiveTrackingScreen onNavigate={navigateTo} rideData={rideData} />;
      case 'summary':
        return <TripSummaryScreen onNavigate={navigateTo} rideData={rideData} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="container">
      {error && (
        <div className="info" style={{ margin: '10px' }}>
          ⚠️ {error}
        </div>
      )}
      {renderScreen()}
    </div>
  );
}

export default App;
