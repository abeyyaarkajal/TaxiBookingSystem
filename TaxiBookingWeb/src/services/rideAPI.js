import axios from 'axios';

// Configure the backend URL
const BACKEND_URL = 'http://localhost:8090/api/v1';

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Ride API endpoints
export const rideAPI = {
  // Estimate fare for a ride
  estimateFare: async (pickupLat, pickupLng, dropoffLat, dropoffLng) => {
    try {
      const response = await api.post('/rides/estimate-fare', {
        pickupLatitude: pickupLat,
        pickupLongitude: pickupLng,
        dropoffLatitude: dropoffLat,
        dropoffLongitude: dropoffLng,
      });
      return response.data;
    } catch (error) {
      console.error('Error estimating fare:', error);
      throw error;
    }
  },

  // Request a ride
  requestRide: async (riderId, pickupLat, pickupLng, dropoffLat, dropoffLng, fare) => {
    try {
      const response = await api.post('/rides/request', {
        riderId,
        pickupLatitude: pickupLat,
        pickupLongitude: pickupLng,
        dropoffLatitude: dropoffLat,
        dropoffLongitude: dropoffLng,
        estimatedFare: fare,
      });
      return response.data;
    } catch (error) {
      console.error('Error requesting ride:', error);
      throw error;
    }
  },

  // Get ride details
  getRideDetails: async (rideId) => {
    try {
      const response = await api.get(`/rides/${rideId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting ride details:', error);
      throw error;
    }
  },

  // Update ride status
  updateRideStatus: async (rideId, status) => {
    try {
      const response = await api.put(`/rides/${rideId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating ride status:', error);
      throw error;
    }
  },

  // Rate a ride
  rateRide: async (rideId, rating, comment) => {
    try {
      const response = await api.post(`/rides/${rideId}/rate`, {
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      console.error('Error rating ride:', error);
      throw error;
    }
  },
};

export default api;
