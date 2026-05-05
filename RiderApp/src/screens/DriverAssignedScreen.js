import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getRideDetails } from '../redux/rideSlice';

const DriverAssignedScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const dispatch = useDispatch();
  const { currentRide } = useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getRideDetails(rideId));
  }, [rideId, dispatch]);

  const handleStartTracking = () => {
    navigation.navigate('LiveTracking', { rideId });
  };

  // Mock driver data (in real app, get from backend)
  const mockDriver = {
    id: 'DRIVER001',
    name: 'Rajesh Kumar',
    rating: 4.8,
    vehicleNumber: 'KA-01-AB-1234',
    vehicleType: 'Sedan',
    vehicleColor: 'Silver',
    eta: 5,
    distance: 2.3,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Driver Assigned!</Text>
        <Text style={styles.subheader}>Your driver is on the way</Text>
      </View>

      <View style={styles.driverCard}>
        <View style={styles.driverHeader}>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{mockDriver.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {mockDriver.rating}</Text>
              <Text style={styles.totalRides}> • 250+ rides</Text>
            </View>
          </View>
          <View style={styles.driverImage}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/60/000000/FFFFFF/?text=Driver',
              }}
              style={styles.profileImage}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleLabel}>Vehicle</Text>
          <Text style={styles.vehicleDetails}>
            {mockDriver.vehicleType} • {mockDriver.vehicleColor}
          </Text>
          <Text style={styles.vehicleNumber}>{mockDriver.vehicleNumber}</Text>
        </View>

        <View style={styles.etaContainer}>
          <View style={styles.etaItem}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>{mockDriver.eta} mins</Text>
          </View>
          <View style={styles.etaItem}>
            <Text style={styles.etaLabel}>Distance</Text>
            <Text style={styles.etaValue}>{mockDriver.distance} km</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Ride Details</Text>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pickup</Text>
          <Text style={styles.detailValue}>
            {currentRide?.pickupAddress}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Drop</Text>
          <Text style={styles.detailValue}>
            {currentRide?.dropAddress}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fare</Text>
          <Text style={styles.detailValue}>
            ₹{currentRide?.totalFare.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.trackButton}
        onPress={handleStartTracking}
      >
        <Text style={styles.trackButtonText}>Start Tracking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>Call Driver</Text>
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
    marginBottom: 5,
  },
  subheader: {
    fontSize: 14,
    color: '#666',
  },
  driverCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 13,
    color: '#ff9800',
    fontWeight: '600',
  },
  totalRides: {
    fontSize: 13,
    color: '#666',
  },
  driverImage: {
    marginLeft: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  vehicleInfo: {
    marginBottom: 12,
  },
  vehicleLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 5,
  },
  vehicleDetails: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    marginBottom: 4,
  },
  vehicleNumber: {
    fontSize: 13,
    color: '#666',
  },
  etaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  etaItem: {
    alignItems: 'center',
  },
  etaLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  etaValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  detailsSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  detailItem: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  trackButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  callButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  callButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DriverAssignedScreen;
