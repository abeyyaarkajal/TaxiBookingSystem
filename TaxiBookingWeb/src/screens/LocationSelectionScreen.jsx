import React, { useState, useEffect } from 'react';

function LocationSelectionScreen({ onNavigate, rideData }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupLat, setPickupLat] = useState(28.6139);
  const [pickupLng, setPickupLng] = useState(77.2090);
  const [dropoffLat, setDropoffLat] = useState(28.5355);
  const [dropoffLng, setDropoffLng] = useState(77.3910);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPickupLat(position.coords.latitude);
          setPickupLng(position.coords.longitude);
          setPickupLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.log('Geolocation error:', error);
          setPickupLocation('Using default location (Delhi)');
        }
      );
    }
  }, []);

  const handleSelectLocation = async () => {
    if (!dropoffLocation) {
      setError('Please enter a destination');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo, we'll use some preset locations
      const presetLocations = {
        'airport': { lat: 28.5594, lng: 77.1250, name: 'Delhi Airport' },
        'station': { lat: 28.6431, lng: 77.2197, name: 'New Delhi Station' },
        'mall': { lat: 28.6355, lng: 77.2197, name: 'Delhi Mall' },
      };

      let finalDropoffLat = dropoffLat;
      let finalDropoffLng = dropoffLng;
      let finalDropoffName = dropoffLocation;

      for (const [key, location] of Object.entries(presetLocations)) {
        if (dropoffLocation.toLowerCase().includes(key)) {
          finalDropoffLat = location.lat;
          finalDropoffLng = location.lng;
          finalDropoffName = location.name;
          break;
        }
      }

      onNavigate('fare', {
        pickupLocation: pickupLocation || 'Current Location',
        dropoffLocation: finalDropoffName,
        pickupLatitude: pickupLat,
        pickupLongitude: pickupLng,
        dropoffLatitude: finalDropoffLat,
        dropoffLongitude: finalDropoffLng,
      });
    } catch (err) {
      setError('Error selecting location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="header">Select Destination</div>
      
      <div>
        <div className="map-container">
          📍 Map View
        </div>

        <div className="card">
          <h3>Pickup Location</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            {pickupLocation || 'Current Location (28.6139°N, 77.2090°E)'}
          </p>
        </div>

        <div className="input-group">
          <label>Where are you going?</label>
          <input
            type="text"
            placeholder="E.g., Airport, Station, Mall"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
          <small style={{ color: '#999', marginTop: '5px', display: 'block' }}>
            Tip: Try "airport", "station", or "mall"
          </small>
        </div>

        {error && (
          <div className="error">{error}</div>
        )}

        <button
          className="button"
          onClick={handleSelectLocation}
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? '⏳ Loading...' : '✓ Confirm Location'}
        </button>

        <button
          className="button secondary"
          onClick={() => onNavigate('home')}
          style={{ width: '100%' }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default LocationSelectionScreen;
