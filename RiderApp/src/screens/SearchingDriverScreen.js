import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getRideDetails } from '../redux/rideSlice';

const SearchingDriverScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const [searchTime, setSearchTime] = useState(0);
  const dispatch = useDispatch();
  const { currentRide, loading } = useSelector((state) => state.ride);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkRideStatus = setInterval(() => {
      dispatch(getRideDetails(rideId)).then((result) => {
        if (
          result.payload &&
          result.payload.status === 'ACCEPTED'
        ) {
          navigation.replace('DriverAssigned', { rideId });
          clearInterval(checkRideStatus);
        }
      });
    }, 2000);

    return () => clearInterval(checkRideStatus);
  }, [rideId, dispatch, navigation]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCancel = () => {
    // Implement cancel ride logic
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusSection}>
        <Text style={styles.title}>Finding a Driver...</Text>
        <Text style={styles.subtitle}>Please wait while we find the nearest driver</Text>
      </View>

      <View style={styles.loaderSection}>
        <ActivityIndicator size={80} color="#000" />
        <Text style={styles.searchTime}>Searching for {formatTime(searchTime)}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>What's happening?</Text>
        <Text style={styles.infoText}>
          • We are searching for available drivers near you{'\n'}
          • Sending your ride request to nearby drivers{'\n'}
          • Waiting for the nearest driver to accept
        </Text>
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  statusSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  loaderSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  searchTime: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginTop: 20,
  },
  infoSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  cancelButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchingDriverScreen;
