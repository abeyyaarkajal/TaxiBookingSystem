import React, { useState, useEffect } from 'react';
import { rideAPI } from '../services/rideAPI';

function SearchingDriverScreen({ onNavigate, rideData }) {
  const [searchProgress, setSearchProgress] = useState(0);
  const [rideId, setRideId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestRide = async () => {
      try {
        // Create a dummy rider ID for demo (in production, this would be the logged-in user)
        const riderId = Math.floor(Math.random() * 1000) + 1;

        const response = await rideAPI.requestRide(
          riderId,
          rideData.pickupLatitude,
          rideData.pickupLongitude,
          rideData.dropoffLatitude,
          rideData.dropoffLongitude,
          rideData.estimatedFare
        );

        setRideId(response.id);

        // Simulate searching for driver
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            // Auto-navigate to driver assigned after 2 seconds
            setTimeout(() => {
              onNavigate('assigned', {
                rideId: response.id,
                driver: response.driver || {
                  id: Math.floor(Math.random() * 1000),
                  name: 'Raj Kumar',
                  rating: 4.8,
                  vehicle: 'Swift - DL01AB1234',
                  phone: '+91-98765-43210',
                  latitude: rideData.pickupLatitude + Math.random() * 0.02,
                  longitude: rideData.pickupLongitude + Math.random() * 0.02,
                },
              });
            }, 2000);
          }
          setSearchProgress(Math.floor(progress));
        }, 500);

        return () => clearInterval(interval);
      } catch (err) {
        console.error('Error requesting ride:', err);
        setError('Failed to request ride. Please try again.');
      }
    };

    requestRide();
  }, [rideData, onNavigate]);

  return (
    <div className="screen">
      <div className="header">Finding a Driver</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>

        <h3 style={{ marginBottom: '20px' }}>Searching for drivers...</h3>

        <div style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#eee',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#667eea',
            width: `${searchProgress}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>

        <p style={{ color: '#999', marginBottom: '20px' }}>
          {searchProgress}% - Finding nearest drivers
        </p>

        <div className="card" style={{ width: '100%' }}>
          <h4>Ride Details</h4>
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            <p>From: {rideData?.pickupLocation}</p>
            <p>To: {rideData?.dropoffLocation}</p>
            <p>Fare: ₹{rideData?.estimatedFare || 125}</p>
          </div>
        </div>

        {error && <div className="error" style={{ width: '100%' }}>{error}</div>}

        <button
          className="button secondary"
          onClick={() => onNavigate('home')}
          style={{ width: '100%', marginTop: '20px' }}
        >
          ✕ Cancel Ride
        </button>
      </div>
    </div>
  );
}

export default SearchingDriverScreen;
