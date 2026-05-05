import React from 'react';

function HomeScreen({ onNavigate }) {
  return (
    <div className="screen">
      <div className="header">Taxi Booking System</div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="map-container">
          📍 Current Location Map
        </div>
        
        <h2 style={{ marginTop: '20px', color: '#333' }}>Welcome Rider</h2>
        <p style={{ color: '#999', marginBottom: '20px', textAlign: 'center' }}>
          Quick, reliable, and affordable rides at your fingertips
        </p>
        
        <button 
          className="button"
          onClick={() => onNavigate('location')}
          style={{ width: '100%' }}
        >
          📍 Book a Ride
        </button>
        
        <button 
          className="button secondary"
          onClick={() => onNavigate('driver')}
          style={{ width: '100%' }}
        >
          👤 Driver Mode
        </button>
        
        <button 
          className="button secondary"
          onClick={() => {}}
          style={{ width: '100%' }}
        >
          🎟️ Ride History
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
