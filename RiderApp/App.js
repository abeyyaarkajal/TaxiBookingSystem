import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LocationSelectionScreen from './src/screens/LocationSelectionScreen';
import FareEstimateScreen from './src/screens/FareEstimateScreen';
import SearchingDriverScreen from './src/screens/SearchingDriverScreen';
import DriverAssignedScreen from './src/screens/DriverAssignedScreen';
import LiveTrackingScreen from './src/screens/LiveTrackingScreen';
import TripSummaryScreen from './src/screens/TripSummaryScreen';

const Stack = createNativeStackNavigator();

const RiderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LocationSelection"
        component={LocationSelectionScreen}
        options={{
          title: 'Select Location',
        }}
      />
      <Stack.Screen
        name="FareEstimate"
        component={FareEstimateScreen}
        options={{
          title: 'Fare Estimate',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="SearchingDriver"
        component={SearchingDriverScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="DriverAssigned"
        component={DriverAssignedScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="LiveTracking"
        component={LiveTrackingScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="TripSummary"
        component={TripSummaryScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RiderNavigator />
      </NavigationContainer>
    </Provider>
  );
}
