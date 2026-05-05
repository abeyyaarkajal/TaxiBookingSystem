import React, { useState, useEffect } from 'react';
import { rideAPI } from '../services/rideAPI';

function FareEstimateScreen({ onNavigate, rideData }) {
  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const estimateFare = async () => {
      try {
        setLoading(true);
        setError(null);

        const fareData = await rideAPI.estimateFare(
          rideData.pickupLatitude,
          rideData.pickupLongitude,
          rideData.dropoffLatitude,
          rideData.dropoffLongitude
        );

        setFare(fareData);
      } catch (err) {
        console.error('Error estimating fare:', err);
        // Use mock data if API fails
        setFare({
          baseFare: 50,
          distanceFare: Math.floor(Math.random() * 100) + 50,
          surgeFare: 0,
          totalFare: Math.floor(Math.random() * 150) + 100,
          distance: '15 km',
          estimatedDuration: '25 mins',
        });
        setError('Using estimated fare');
      } finally {
        setLoading(false);
      }
    };

    if (rideData) {
      estimateFare();
    }
  }, [rideData]);

  const handleBookRide = () => {
    onNavigate('searching', {
      estimatedFare: fare?.totalFare || 150,
    });
  };

  if (loading) {
    return (
      <div className="screen">
        <div className="header">Fare Estimate</div>
        <div className="loading">Loading fare estimate...</div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="header">Fare Estimate</div>

      <div className="card">
        <h3>Trip Details</h3>
        <div style={{ marginTop: '10px' }}>
          <p><strong>From:</strong> {rideData?.pickupLocation}</p>
          <p><strong>To:</strong> {rideData?.dropoffLocation}</p>
          <p><strong>Distance:</strong> {fare?.distance || '15 km'}</p>
          <p><strong>Est. Time:</strong> {fare?.estimatedDuration || '25 mins'}</p>
        </div>
      </div>

      <div className="card">
        <h3>Fare Breakdown</h3>
        <div style={{ marginTop: '10px' }}>
          <div className="flex-between mb-10">
            <span>Base Fare:</span>
            <span>₹{fare?.baseFare || 50}</span>
          </div>
          <div className="flex-between mb-10">
            <span>Distance Fare:</span>
            <span>₹{fare?.distanceFare || 75}</span>
          </div>
          <div className="flex-between mb-10">
            <span>Surge Pricing:</span>
            <span>₹{fare?.surgeFare || 0}</span>
          </div>
          <hr style={{ margin: '10px 0' }} />
          <div className="flex-between" style={{ fontSize: '18px', fontWeight: 'bold' }}>
            <span>Total Fare:</span>
            <span style={{ color: '#667eea' }}>₹{fare?.totalFare || 125}</span>
          </div>
        </div>
      </div>

      {error && <div className="info">ℹ️ {error}</div>}

      <button
        className="button"
        onClick={handleBookRide}
        style={{ width: '100%' }}
      >
        🚕 Book Ride - ₹{fare?.totalFare || 125}
      </button>

      <button
        className="button secondary"
        onClick={() => onNavigate('location')}
        style={{ width: '100%' }}
      >
        ← Back
      </button>
    </div>
  );
}

export default FareEstimateScreen;
