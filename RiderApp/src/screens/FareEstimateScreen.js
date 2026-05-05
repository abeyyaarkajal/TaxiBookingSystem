import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { requestRide } from '../redux/rideSlice';

const FareEstimateScreen = ({ route, navigation }) => {
  const { pickupLocation, dropLocation } = route.params;
  const [riderId] = useState('RIDER_001');
  const dispatch = useDispatch();
  const { fareEstimate, loading, currentRide } = useSelector((state) => state.ride);

  const handleBookRide = () => {
    if (pickupLocation && dropLocation && fareEstimate) {
      dispatch(
        requestRide({
          riderId,
          pickupLat: pickupLocation.lat,
          pickupLng: pickupLocation.lng,
          dropLat: dropLocation.lat,
          dropLng: dropLocation.lng,
          pickupAddress: pickupLocation.name,
          dropAddress: dropLocation.name,
        })
      ).then((result) => {
        if (result.type === 'ride/requestRide/fulfilled') {
          navigation.navigate('SearchingDriver', { rideId: result.payload.id });
        }
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Fare Estimate</Text>
      </View>

      <View style={styles.locationSection}>
        <View style={styles.locationItem}>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.locationText}>{pickupLocation?.name}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.locationItem}>
          <Text style={styles.label}>Drop</Text>
          <Text style={styles.locationText}>{dropLocation?.name}</Text>
        </View>
      </View>

      {fareEstimate && (
        <View style={styles.fareSection}>
          <Text style={styles.fareTitle}>Fare Breakdown</Text>

          <View style={styles.fareItem}>
            <Text style={styles.fareLabel}>Distance</Text>
            <Text style={styles.fareValue}>{fareEstimate.distance} km</Text>
          </View>

          <View style={styles.fareItem}>
            <Text style={styles.fareLabel}>Estimated Time</Text>
            <Text style={styles.fareValue}>
              {Math.round(fareEstimate.estimatedTime)} mins
            </Text>
          </View>

          <View style={styles.fareBreakdown}>
            <Text style={styles.breakdownLabel}>Base Fare</Text>
            <Text style={styles.breakdownValue}>
              ₹{fareEstimate.baseFare.toFixed(2)}
            </Text>
          </View>

          <View style={styles.fareBreakdown}>
            <Text style={styles.breakdownLabel}>
              Distance ({fareEstimate.distance} km × ₹{fareEstimate.perKmRate}/km)
            </Text>
            <Text style={styles.breakdownValue}>
              ₹{fareEstimate.distanceFare.toFixed(2)}
            </Text>
          </View>

          <View style={styles.fareBreakdown}>
            <Text style={styles.breakdownLabel}>
              Time ({Math.round(fareEstimate.estimatedTime)} mins × ₹
              {fareEstimate.perMinRate}/min)
            </Text>
            <Text style={styles.breakdownValue}>
              ₹{fareEstimate.timeFare.toFixed(2)}
            </Text>
          </View>

          <View style={styles.totalFare}>
            <Text style={styles.totalLabel}>Total Fare</Text>
            <Text style={styles.totalValue}>
              ₹{fareEstimate.totalFare.toFixed(2)}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBookRide}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.bookButtonText}>Book Ride</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerSection: {
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  locationSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  locationItem: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
    fontWeight: '600',
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  fareSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  fareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  fareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fareLabel: {
    fontSize: 14,
    color: '#666',
  },
  fareValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  fareBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  breakdownLabel: {
    fontSize: 13,
    color: '#666',
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  totalFare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: '#000',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FareEstimateScreen;
