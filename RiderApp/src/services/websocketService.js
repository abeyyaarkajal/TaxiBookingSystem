import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectWebSocket = (rideId) => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      brokerURL: 'ws://192.168.1.100:8080/ws-ride', // Update with your backend IP
      connectHeaders: {
        login: 'guest',
        passcode: 'guest',
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('WebSocket connected');
      stompClient = client;
      resolve(client);
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      reject(frame);
    };

    client.activate();
  });
};

export const subscribeToDriverLocation = (rideId, onLocationUpdate) => {
  if (!stompClient) {
    console.error('WebSocket not connected');
    return null;
  }

  return stompClient.subscribe(`/topic/ride/${rideId}/location`, (message) => {
    const locationData = JSON.parse(message.body);
    onLocationUpdate(locationData);
  });
};

export const subscribeToRideStatus = (rideId, onStatusUpdate) => {
  if (!stompClient) {
    console.error('WebSocket not connected');
    return null;
  }

  return stompClient.subscribe(`/topic/ride/${rideId}/status`, (message) => {
    const statusData = JSON.parse(message.body);
    onStatusUpdate(statusData);
  });
};

export const sendLocationUpdate = (rideId, latitude, longitude, driverId) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket not connected');
    return;
  }

  stompClient.publish({
    destination: `/app/ride/${rideId}/location`,
    body: JSON.stringify({
      driverId,
      rideId,
      latitude,
      longitude,
      timestamp: Date.now(),
    }),
  });
};

export const sendRideStatusUpdate = (rideId, status, driverId) => {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket not connected');
    return;
  }

  stompClient.publish({
    destination: `/app/ride/${rideId}/status`,
    body: JSON.stringify({
      rideId,
      status,
      driverId,
      timestamp: Date.now(),
    }),
  });
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};
