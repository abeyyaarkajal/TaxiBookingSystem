import React, { useState, useEffect } from 'react';

function LiveTrackingScreen({ onNavigate, rideData }) {
  const [rideStatus, setRideStatus] = useState('SEARCHING');
  const [driverLocation, setDriverLocation] = useState({
    latitude: rideData?.driver?.latitude || 28.6155,
    longitude: rideData?.driver?.longitude || 77.2100,
  });

  useEffect(() => {
    // Simulate driver movement towards destination
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.002,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.002,
      }));

      // Simulate ride progress
      const randomStatus = Math.random();
      if (randomStatus < 0.3) {
        setRideStatus('ASSIGNED');
      } else if (randomStatus < 0.6) {
        setRideStatus('IN_PROGRESS');
      } else {
        setRideStatus('ARRIVED');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch (rideStatus) {
      case 'ASSIGNED':
        return 'Driver coming to pickup';
      case 'IN_PROGRESS':
        return 'On the way to destination';
      case 'ARRIVED':
        return 'Driver has arrived';
      default:
        return 'Searching for driver';
    }
  };

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'ASSIGNED':
        return '#ff9800';
      case 'IN_PROGRESS':
        return '#667eea';
      case 'ARRIVED':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  return (
    <div className="screen">
      <div className="header">Live Tracking</div>

      <div className="map-container" style={{ marginTop: '20px' }}>
        📍 Live Map
        <br />
        <small>Driver: {driverLocation.latitude.toFixed(4)}, {driverLocation.longitude.toFixed(4)}</small>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h4>Trip Status</h4>
        <div style={{
          backgroundColor: getStatusColor(),
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '10px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
        }}>
          {getStatusText()}
        </div>
      </div>

      <div className="card">
        <h4>Driver Information</h4>
        <div style={{ marginTop: '10px' }}>
          <p><strong>Name:</strong> {rideData?.driver?.name || 'Raj Kumar'}</p>
          <p><strong>Vehicle:</strong> {rideData?.driver?.vehicle || 'Swift - DL01AB1234'}</p>
          <p><strong>Rating:</strong> ⭐ {rideData?.driver?.rating || 4.8}</p>
          <p><strong>Contact:</strong> {rideData?.driver?.phone || '+91-98765-43210'}</p>
        </div>
      </div>

      <div className="card">
        <h4>Route</h4>
        <div style={{ marginTop: '10px' }}>
          <p>📍 From: {rideData?.pickupLocation}</p>
          <p>📍 To: {rideData?.dropoffLocation}</p>
        </div>
      </div>

      {rideStatus === 'ARRIVED' && (
        <button
          className="button"
          onClick={() => onNavigate('summary')}
          style={{ width: '100%' }}
        >
          ✓ Trip Complete - Go to Summary
        </button>
      )}

      <button
        className="button secondary"
        onClick={() => {}}
        style={{ width: '100%' }}
      >
        📞 Call Driver
      </button>
    </div>
  );
}

export default LiveTrackingScreen;
