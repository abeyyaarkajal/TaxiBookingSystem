import { Client } from '@stomp/stompjs';

let stompClient = null;
let locationListeners = [];
let rideListeners = [];

// NOTE: Using native WebSocket (no SockJS) to avoid browser-only package issues.
// The Spring SockJS endpoint usually exposes a websocket transport at /ws-ride/websocket
const WS_URL = 'ws://localhost:8090/ws-ride/websocket';

export const websocketService = {
  connect: () => {
    return new Promise((resolve, reject) => {
      try {
        if (stompClient && stompClient.connected) {
          resolve();
          return;
        }

        stompClient = new Client({
          brokerURL: WS_URL,
          connectHeaders: {},
          debug: (msg) => {
            // console.debug(msg);
          },
          onConnect: () => {
            console.log('STOMP connected (native WebSocket)');

            stompClient.subscribe('/topic/ride-location', (message) => {
              try {
                const data = JSON.parse(message.body);
                locationListeners.forEach((cb) => cb && cb(data));
              } catch (e) {
                console.error('Error parsing location message:', e);
              }
            });

            stompClient.subscribe('/topic/ride-status', (message) => {
              try {
                const data = JSON.parse(message.body);
                rideListeners.forEach((cb) => cb && cb(data));
              } catch (e) {
                console.error('Error parsing ride status message:', e);
              }
            });

            resolve();
          },
          onStompError: (frame) => {
            console.error('STOMP error:', frame);
            reject(new Error('STOMP error'));
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });

        stompClient.activate();
      } catch (err) {
        reject(err);
      }
    });
  },

  disconnect: () => {
    if (stompClient) {
      try {
        stompClient.deactivate();
      } catch (e) {
        // ignore
      }
      stompClient = null;
    }
  },

  addLocationListener: (cb) => {
    if (typeof cb === 'function') {
      locationListeners.push(cb);
    }
    return () => {
      locationListeners = locationListeners.filter((f) => f !== cb);
    };
  },

  addRideListener: (cb) => {
    if (typeof cb === 'function') {
      rideListeners.push(cb);
    }
    return () => {
      rideListeners = rideListeners.filter((f) => f !== cb);
    };
  },

  sendLocationUpdate: (rideId, latitude, longitude) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/app/location',
        body: JSON.stringify({ rideId, driverId: null, latitude, longitude, timestamp: Date.now() }),
      });
    }
  },

  sendRideUpdate: (rideId, status, message) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/app/ride-status',
        body: JSON.stringify({ rideId, status, message, timestamp: Date.now() }),
      });
    }
  },

  isConnected: () => !!(stompClient && stompClient.connected),
};

export default websocketService;
