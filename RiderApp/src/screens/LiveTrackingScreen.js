import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDriverLocation,
  updateRideStatus,
  getRideDetails,
} from '../redux/rideSlice';
import {
  connectWebSocket,
  subscribeToDriverLocation,
  subscribeToRideStatus,
  disconnectWebSocket,
} from '../services/websocketService';

const LiveTrackingScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const [driverLocation, setDriverLocation] = useState({
    latitude: 13.0827,
    longitude: 77.5033,
  });
  const [riderLocation, setRiderLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const [eta, setEta] = useState(5);
  const [distance, setDistance] = useState(2.3);
  const dispatch = useDispatch();
  const { currentRide } = useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getRideDetails(rideId));
    setupWebSocket();

    // Simulate driver movement
    simulateDriverMovement();

    return () => {
      disconnectWebSocket();
    };
  }, [rideId]);

  const setupWebSocket = async () => {
    try {
      await connectWebSocket(rideId);
      const locationSubscription = subscribeToDriverLocation(rideId, (locationData) => {
        setDriverLocation({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
      });

      const statusSubscription = subscribeToRideStatus(rideId, (statusData) => {
        dispatch(updateRideStatus(statusData.status));
        if (statusData.status === 'STARTED') {
          navigation.replace('RideInProgress', { rideId });
        }
      });
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  };

  const simulateDriverMovement = () => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
      }));

      setEta((prev) => Math.max(1, prev - 0.1));
      setDistance((prev) => Math.max(0.1, prev - 0.05));
    }, 3000);

    return () => clearInterval(interval);
  };

  const handleArrived = () => {
    // Simulate driver arrived
    dispatch(updateRideStatus('ARRIVED'));
    navigation.replace('RideStarted', { rideId });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: (driverLocation.latitude + riderLocation.latitude) / 2,
          longitude: (driverLocation.longitude + riderLocation.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={riderLocation}
          title="You are here"
          pinColor="blue"
        />
        <Marker
          coordinate={driverLocation}
          title="Driver"
          pinColor="red"
        />
        <Polyline
          coordinates={[driverLocation, riderLocation]}
          strokeColor="#000"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.topCard}>
        <Text style={styles.driverName}>Driver is on the way</Text>
        <View style={styles.etaContainer}>
          <View style={styles.etaItem}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>{Math.ceil(eta)} mins</Text>
          </View>
          <View style={styles.etaItem}>
            <Text style={styles.etaLabel}>Distance</Text>
            <Text style={styles.etaValue}>{distance.toFixed(1)} km</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.status}>Ride Status: {currentRide?.status}</Text>
        
        <View style={styles.locationsContainer}>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>From</Text>
            <Text style={styles.locationText}>{currentRide?.pickupAddress}</Text>
          </View>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>To</Text>
            <Text style={styles.locationText}>{currentRide?.dropAddress}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.arrivedButton}
          onPress={handleArrived}
        >
          <Text style={styles.arrivedButtonText}>Mark as Arrived</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Call Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 0.6,
  },
  topCard: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  etaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  etaItem: {
    alignItems: 'center',
  },
  etaLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  etaValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomCard: {
    flex: 0.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  locationsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  locationItem: {
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600',
  },
  locationText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  arrivedButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  arrivedButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  callButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  callButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LiveTrackingScreen;
