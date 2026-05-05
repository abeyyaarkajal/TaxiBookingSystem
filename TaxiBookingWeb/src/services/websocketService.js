import * as StompJs from '@stomp/stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.locationListeners = [];
    this.rideListeners = [];
    this.isConnected = false;
  }

  connect() {
    if (this.isConnected || this.stompClient) {
      return;
    }

    this.stompClient = new StompJs.Client({
      brokerURL: 'ws://localhost:8090/ws-ride',
      onConnect: this.onConnected.bind(this),
      onStompError: this.onError.bind(this),
      reconnectDelay: 5000,
    });

    this.stompClient.activate();
  }

  onConnected() {
    this.isConnected = true;
    console.log('WebSocket connected');

    this.stompClient.subscribe('/topic/ride-updates', (message) => {
      const data = JSON.parse(message.body);
      this.rideListeners.forEach(callback => callback(data));
    });

    this.stompClient.subscribe('/topic/location-updates', (message) => {
      const data = JSON.parse(message.body);
      this.locationListeners.forEach(callback => callback(data));
    });
  }

  onError(error) {
    console.error('WebSocket error:', error);
    this.isConnected = false;
  }

  send(destination, data) {
    if (this.stompClient && this.isConnected) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(data),
      });
    } else {
      console.warn('WebSocket not connected. Unable to send message.');
    }
  }

  addRideListener(callback) {
    this.rideListeners.push(callback);
  }

  removeRideListener(callback) {
    this.rideListeners = this.rideListeners.filter(cb => cb !== callback);
  }

  addLocationListener(callback) {
    this.locationListeners.push(callback);
  }

  removeLocationListener(callback) {
    this.locationListeners = this.locationListeners.filter(cb => cb !== callback);
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.isConnected = false;
    }
  }
}

export const websocketService = new WebSocketService();
