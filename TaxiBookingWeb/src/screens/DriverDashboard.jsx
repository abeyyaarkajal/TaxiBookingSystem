import React, { useState, useEffect } from 'react';
import { websocketService } from '../services/websocketService';

function DriverDashboard({ onNavigate }) {
  const [online, setOnline] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {
    websocketService.connect();

    const handleRideRequest = (request) => {
      if (online) {
        setCurrentRequest(request);
        setTimeLeft(15);
      }
    };

    websocketService.addRideListener(handleRideRequest);

    return () => {
      websocketService.removeRideListener(handleRideRequest);
    };
  }, [online]);

  useEffect(() => {
    if (!currentRequest) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleRejectRequest();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRequest]);

  const handleAcceptRequest = () => {
    websocketService.send('/app/ride-accept', {
      rideId: currentRequest?.id || 1,
      driverId: 1,
      status: 'ACCEPTED',
    });
    setActiveRide(currentRequest);
    setCurrentRequest(null);
  };

  const handleRejectRequest = () => {
    websocketService.send('/app/ride-reject', {
      rideId: currentRequest?.id || 1,
      driverId: 1,
      status: 'REJECTED',
    });
    setCurrentRequest(null);
  };

  const handleStartTrip = () => {
    websocketService.send('/app/ride-start', {
      rideId: activeRide?.id || 1,
      driverId: 1,
      status: 'STARTED',
    });
  };

  const handleCompleteTrip = () => {
    websocketService.send('/app/ride-complete', {
      rideId: activeRide?.id || 1,
      driverId: 1,
      status: 'COMPLETED',
    });
    setActiveRide(null);
  };

  const handleSimulateRequest = () => {
    const simulatedRequest = {
      id: Math.floor(Math.random() * 1000),
      riderId: Math.floor(Math.random() * 1000),
      pickupLocation: 'Connaught Place',
      dropoffLocation: 'IGI Airport',
      fare: 450,
    };
    setCurrentRequest(simulatedRequest);
    setTimeLeft(15);
  };

  return (
    <div className="screen">
      <div className="header">Driver Dashboard</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Status Toggle */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Status</h3>
            <button
              className={online ? 'button' : 'button secondary'}
              onClick={() => setOnline(!online)}
              style={{ width: '100px' }}
            >
              {online ? '🟢 Online' : '⚫ Offline'}
            </button>
          </div>
        </div>

        {/* Incoming Request Popup */}
        {currentRequest && (
          <div className="card" style={{ backgroundColor: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
            <h3 style={{ color: '#ff6b6b', marginBottom: '10px' }}>
              ⏰ New Ride Request!
            </h3>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              From: <strong>{currentRequest.pickupLocation}</strong>
            </p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              To: <strong>{currentRequest.dropoffLocation}</strong>
            </p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              Fare: <strong>₹{currentRequest.fare}</strong>
            </p>
            <div style={{ fontSize: '24px', color: '#ff6b6b', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
              {timeLeft}s
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="button" onClick={handleAcceptRequest} style={{ flex: 1 }}>
                ✓ Accept
              </button>
              <button className="button secondary" onClick={handleRejectRequest} style={{ flex: 1 }}>
                ✕ Reject
              </button>
            </div>
          </div>
        )}

        {/* Active Ride Management */}
        {activeRide && (
          <div className="card" style={{ backgroundColor: '#e7f3ff', borderLeft: '4px solid #667eea' }}>
            <h3 style={{ marginBottom: '10px' }}>🚗 Active Ride</h3>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              Rider: <strong>ID {activeRide.riderId}</strong>
            </p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              From: <strong>{activeRide.pickupLocation}</strong>
            </p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              To: <strong>{activeRide.dropoffLocation}</strong>
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="button" onClick={handleStartTrip} style={{ flex: 1 }}>
                ▶ Start Trip
              </button>
              <button className="button" onClick={handleCompleteTrip} style={{ flex: 1, backgroundColor: '#27ae60' }}>
                ✓ Complete
              </button>
            </div>
          </div>
        )}

        {/* Testing Helper */}
        {!currentRequest && online && (
          <button
            className="button secondary"
            onClick={handleSimulateRequest}
            style={{ width: '100%', marginTop: 'auto' }}
          >
            🧪 Simulate Request
          </button>
        )}

        <button
          className="button secondary"
          onClick={() => onNavigate('home')}
          style={{ width: '100%', marginTop: '10px' }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default DriverDashboard;
