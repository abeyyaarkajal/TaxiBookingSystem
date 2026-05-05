import React, { useState, useEffect } from 'react';

function DriverAssignedScreen({ onNavigate, rideData }) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onNavigate('tracking');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onNavigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const driver = rideData?.driver || {
    name: 'Raj Kumar',
    rating: 4.8,
    vehicle: 'Swift - DL01AB1234',
    phone: '+91-98765-43210',
  };

  return (
    <div className="screen">
      <div className="header">Driver Assigned</div>

      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>👤</div>
          <h3>{driver.name}</h3>
          <div style={{ color: '#667eea', fontSize: '18px', fontWeight: 'bold' }}>
            ⭐ {driver.rating}
          </div>
        </div>
      </div>

      <div className="card">
        <h4>Vehicle Details</h4>
        <p style={{ marginTop: '10px' }}>🚕 {driver.vehicle}</p>
        <p>📱 {driver.phone}</p>
      </div>

      <div className="card">
        <h4>Driver Arriving in</h4>
        <div style={{
          textAlign: 'center',
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#667eea',
          marginTop: '10px',
        }}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="map-container">
        📍 Driver Location Map
      </div>

      <button
        className="button"
        onClick={() => onNavigate('tracking')}
        style={{ width: '100%' }}
      >
        📍 Track Driver
      </button>

      <button
        className="button secondary"
        onClick={() => {
          if (window.confirm('Are you sure you want to cancel this ride?')) {
            onNavigate('home');
          }
        }}
        style={{ width: '100%' }}
      >
        ✕ Cancel Ride
      </button>
    </div>
  );
}

export default DriverAssignedScreen;
