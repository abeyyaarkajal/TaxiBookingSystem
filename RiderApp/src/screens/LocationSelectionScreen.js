import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { estimateFare } from '../redux/rideSlice';

const LocationSelectionScreen = ({ route, navigation }) => {
  const { locationType, currentLocation } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [otherLocation, setOtherLocation] = useState(null);
  const dispatch = useDispatch();
  const { fareEstimate, loading } = useSelector((state) => state.ride);

  const mockLocations = [
    { id: 1, name: 'Bangalore Airport', lat: 13.1939, lng: 77.7064 },
    { id: 2, name: 'MG Road', lat: 12.9352, lng: 77.6245 },
    { id: 3, name: 'Indiranagar', lat: 12.9716, lng: 77.6412 },
    { id: 4, name: 'Whitefield', lat: 12.9698, lng: 77.7499 },
    { id: 5, name: 'Brigade Road', lat: 12.9352, lng: 77.5980 },
  ];

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = mockLocations.filter((loc) =>
        loc.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions(mockLocations);
    }
  }, [searchText]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    if (locationType === 'pickup') {
      setOtherLocation(location);
      navigation.navigate('FareEstimate', {
        pickupLocation: location,
        dropLocation: null,
      });
    } else {
      // Calculate fare for drop location
      if (otherLocation) {
        dispatch(
          estimateFare({
            pickupLat: otherLocation.lat,
            pickupLng: otherLocation.lng,
            dropLat: location.lat,
            dropLng: location.lng,
          })
        );
        navigation.navigate('FareEstimate', {
          pickupLocation: otherLocation,
          dropLocation: location,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            title={selectedLocation.name}
            pinColor="red"
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${locationType} location...`}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.suggestionsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectLocation(item)}
              >
                <Text style={styles.locationName}>{item.name}</Text>
                <Text style={styles.locationCoords}>
                  {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
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
    flex: 0.5,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  suggestionsContainer: {
    flex: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  locationCoords: {
    fontSize: 12,
    color: '#999',
  },
});

export default LocationSelectionScreen;
