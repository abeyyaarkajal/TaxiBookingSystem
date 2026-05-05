import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationLoaded, setLocationLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location to find drivers',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
        setLocationLoaded(true);
      },
      (error) => {
        console.log(error.code, error.message);
        setLocationLoaded(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={currentLocation}
        onRegionChangeComplete={(region) => setCurrentLocation(region)}
      >
        {locationLoaded && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}
      </MapView>

      <View style={styles.bottomCard}>
        <Text style={styles.title}>Where are you going?</Text>
        
        <TouchableOpacity
          style={styles.pickupButton}
          onPress={() =>
            navigation.navigate('LocationSelection', {
              locationType: 'pickup',
              currentLocation,
            })
          }
        >
          <Text style={styles.buttonText}>Select Pickup Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dropButton}
          onPress={() =>
            navigation.navigate('LocationSelection', {
              locationType: 'drop',
              currentLocation,
            })
          }
        >
          <Text style={styles.buttonText}>Select Drop Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.historyButtonText}>Ride History</Text>
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
    flex: 1,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  pickupButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  dropButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  historyButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
