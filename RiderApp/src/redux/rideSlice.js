import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rideAPI } from '../services/rideAPI';

// Async thunks
export const estimateFare = createAsyncThunk(
  'ride/estimateFare',
  async ({ pickupLat, pickupLng, dropLat, dropLng }, { rejectWithValue }) => {
    try {
      const response = await rideAPI.estimateFare(pickupLat, pickupLng, dropLat, dropLng);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const requestRide = createAsyncThunk(
  'ride/requestRide',
  async ({
    riderId,
    pickupLat,
    pickupLng,
    dropLat,
    dropLng,
    pickupAddress,
    dropAddress,
  }, { rejectWithValue }) => {
    try {
      const response = await rideAPI.requestRide(
        riderId,
        pickupLat,
        pickupLng,
        dropLat,
        dropLng,
        pickupAddress,
        dropAddress
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRideDetails = createAsyncThunk(
  'ride/getRideDetails',
  async (rideId, { rejectWithValue }) => {
    try {
      const response = await rideAPI.getRideDetails(rideId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitRating = createAsyncThunk(
  'ride/submitRating',
  async ({ rideId, rating, feedback }, { rejectWithValue }) => {
    try {
      const response = await rideAPI.submitRating(rideId, rating, feedback);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  currentRide: null,
  fareEstimate: null,
  driverLocation: null,
  rideStatus: null,
  loading: false,
  error: null,
  rideHistory: [],
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setCurrentRide: (state, action) => {
      state.currentRide = action.payload;
    },
    updateDriverLocation: (state, action) => {
      state.driverLocation = action.payload;
    },
    updateRideStatus: (state, action) => {
      if (state.currentRide) {
        state.currentRide.status = action.payload;
      }
      state.rideStatus = action.payload;
    },
    clearCurrentRide: (state) => {
      state.currentRide = null;
      state.driverLocation = null;
      state.rideStatus = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(estimateFare.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(estimateFare.fulfilled, (state, action) => {
        state.loading = false;
        state.fareEstimate = action.payload;
      })
      .addCase(estimateFare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(requestRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestRide.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRide = action.payload;
      })
      .addCase(requestRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRideDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRideDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRide = action.payload;
      })
      .addCase(getRideDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRide = action.payload;
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentRide,
  updateDriverLocation,
  updateRideStatus,
  clearCurrentRide,
  clearError,
} = rideSlice.actions;

export default rideSlice.reducer;
