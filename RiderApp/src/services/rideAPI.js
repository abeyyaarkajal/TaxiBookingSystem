import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.100:8080/api/v1'; // Update with your backend IP

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rideAPI = {
  // Estimate fare
  estimateFare: (pickupLat, pickupLng, dropLat, dropLng) => {
    return apiClient.post('/rides/estimate-fare', {
      pickupLat,
      pickupLng,
      dropLat,
      dropLng,
    });
  },

  // Request a new ride
  requestRide: (riderId, pickupLat, pickupLng, dropLat, dropLng, pickupAddress, dropAddress) => {
    return apiClient.post('/rides/request', {
      riderId,
      pickupLat,
      pickupLng,
      dropLat,
      dropLng,
      pickupAddress,
      dropAddress,
    });
  },

  // Get ride details
  getRideDetails: (rideId) => {
    return apiClient.get(`/rides/${rideId}`);
  },

  // Accept ride
  acceptRide: (rideId) => {
    return apiClient.post(`/rides/${rideId}/accept`);
  },

  // Update ride status
  updateRideStatus: (rideId, status) => {
    return apiClient.put(`/rides/${rideId}/status`, null, {
      params: { status },
    });
  },

  // Submit rating
  submitRating: (rideId, rating, feedback) => {
    return apiClient.post(`/rides/${rideId}/rate`, {
      rating,
      feedback,
    });
  },

  // Get rider's ride history
  getRiderRides: (riderId) => {
    return apiClient.get(`/rides/rider/${riderId}`);
  },
};

export default apiClient;
