import React, { useEffect, useState, useRef } from 'react';
import websocketService from '../services/websocketService';

function DriverDashboard({ onNavigate }) {
  const DRIVER_ID = 'DRIVER001';
  const [online, setOnline] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [activeRide, setActiveRide] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    let removeListener = null;
    const init = async () => {
      try {
        await websocketService.connect();
        removeListener = websocketService.addRideListener(handleRideUpdate);
      } catch (e) {
        console.error('WS connect failed in driver dashboard', e);
      }
    };

    init();

    return () => {
      if (removeListener) removeListener();
      clearInterval(timerRef.current);
    };
  }, []);

  const handleRideUpdate = (ride) => {
    // Expecting ride = { rideId, status, pickupDistance, estimatedFare, driverId }
    if (!online) return;
    if (!ride) return;
    if (ride.status === 'REQUESTED' && !currentRequest && !activeRide) {
      if (!ride.driverId || ride.driverId === DRIVER_ID) {
        setCurrentRequest({
          rideId: ride.rideId || ride.id || 'unknown',
          pickupDistance: ride.pickupDistance || ride.distance || 'N/A',
          estimatedFare: ride.estimatedFare || ride.fare || 'N/A',
          timeLeft: 15,
        });
        startRequestTimer();
      }
    }
  };

  const startRequestTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentRequest((prev) => {
        if (!prev) return null;
        if (prev.timeLeft <= 1) {
          clearInterval(timerRef.current);
          // auto reject
          websocketService.sendRideUpdate(prev.rideId, 'REJECTED', 'Auto-rejected');
          return null;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const acceptRide = () => {
    if (!currentRequest) return;
    websocketService.sendRideUpdate(currentRequest.rideId, 'ACCEPTED', `Driver ${DRIVER_ID} accepted`);
    setActiveRide({ ...currentRequest });
    clearInterval(timerRef.current);
    setCurrentRequest(null);
  };

  const rejectRide = () => {
    if (!currentRequest) return;
    websocketService.sendRideUpdate(currentRequest.rideId, 'REJECTED', `Driver ${DRIVER_ID} rejected`);
    clearInterval(timerRef.current);
    setCurrentRequest(null);
  };

  const startTrip = () => {
    if (!activeRide) return;
    websocketService.sendRideUpdate(activeRide.rideId, 'STARTED', `Driver started trip`);
  };

  const completeTrip = () => {
    if (!activeRide) return;
    websocketService.sendRideUpdate(activeRide.rideId, 'COMPLETED', `Driver completed trip`);
    setActiveRide(null);
  };

  return (
    <div className="screen">
      <div className="header">Driver Dashboard</div>

      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="checkbox"
            checked={online}
            onChange={(e) => setOnline(e.target.checked)}
          />
          <strong style={{ color: online ? '#16a34a' : '#666' }}>{online ? 'Online' : 'Offline'}</strong>
        </label>
        <div style={{ marginTop: '8px', color: '#666' }}>
          Toggle online to receive ride requests.
        </div>
      </div>

      {currentRequest && (
        <div className="card" style={{ border: '1px solid #f2c0c0', background: '#fff7f7' }}>
          <h3>Incoming Ride Request</h3>
          <p><strong>Ride:</strong> {currentRequest.rideId}</p>
          <p><strong>Pickup Distance:</strong> {currentRequest.pickupDistance} km</p>
          <p><strong>Estimated Fare:</strong> ₹{currentRequest.estimatedFare}</p>
          <p style={{ fontWeight: 'bold' }}>Time left: {currentRequest.timeLeft}s</p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button className="button" onClick={acceptRide}>Accept</button>
            <button className="button secondary" onClick={rejectRide}>Reject</button>
          </div>
        </div>
      )}

      {activeRide && (
        <div className="card">
          <h3>Active Ride</h3>
          <p><strong>Ride:</strong> {activeRide.rideId}</p>
          <p><strong>Pickup Distance:</strong> {activeRide.pickupDistance} km</p>
          <p><strong>Estimated Fare:</strong> ₹{activeRide.estimatedFare}</p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button className="button" onClick={startTrip}>Mark Started</button>
            <button className="button" onClick={completeTrip}>Mark Completed</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button className="button secondary" onClick={() => onNavigate('home')}>Back to Home</button>
        <button
          className="button"
          style={{ marginLeft: '10px' }}
          onClick={() => {
            // simulate an incoming ride request for manual testing
            handleRideUpdate({
              rideId: `SIM-${Date.now()}`,
              status: 'REQUESTED',
              pickupDistance: (Math.random() * 5).toFixed(1),
              estimatedFare: (50 + Math.random() * 200).toFixed(0),
              driverId: null,
            });
          }}
        >
          Simulate Request
        </button>
      </div>
    </div>
  );
}

export default DriverDashboard;
