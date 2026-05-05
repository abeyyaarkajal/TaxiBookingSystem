import { useState } from 'react';
import './index.css';
import { websocketService } from './services/websocketService';
import HomeScreen from './screens/HomeScreen';
import LocationSelectionScreen from './screens/LocationSelectionScreen';
import FareEstimateScreen from './screens/FareEstimateScreen';
import SearchingDriverScreen from './screens/SearchingDriverScreen';
import DriverAssignedScreen from './screens/DriverAssignedScreen';
import LiveTrackingScreen from './screens/LiveTrackingScreen';
import TripSummaryScreen from './screens/TripSummaryScreen';
import DriverDashboard from './screens/DriverDashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [rideData, setRideData] = useState(null);

  websocketService.connect();

  const handleNavigate = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) {
      setRideData(data);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'location':
        return <LocationSelectionScreen onNavigate={handleNavigate} rideData={rideData} />;
      case 'fare':
        return <FareEstimateScreen onNavigate={handleNavigate} rideData={rideData} />;
      case 'searching':
        return <SearchingDriverScreen onNavigate={handleNavigate} rideData={rideData} />;
      case 'assigned':
        return <DriverAssignedScreen onNavigate={handleNavigate} rideData={rideData} />;
      case 'tracking':
        return <LiveTrackingScreen onNavigate={handleNavigate} rideData={rideData} />;
      case 'summary':
        return <TripSummaryScreen onNavigate={handleNavigate} rideData={rideData} />;
      case 'driver':
        return <DriverDashboard onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
}

export default App;
