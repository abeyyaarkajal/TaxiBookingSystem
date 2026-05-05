import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { submitRating, clearCurrentRide } from '../redux/rideSlice';

const TripSummaryScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { currentRide, loading } = useSelector((state) => state.ride);

  const handleSubmitRating = async () => {
    if (rating > 0) {
      await dispatch(submitRating({ rideId, rating, feedback }));
      setSubmitted(true);
    }
  };

  const handleDone = () => {
    dispatch(clearCurrentRide());
    navigation.replace('Home');
  };

  const RatingStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, rating >= star && styles.starFilled]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Trip Completed!</Text>
        <Text style={styles.subheader}>Thanks for riding with us</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{currentRide?.distance.toFixed(1)} km</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>
            {Math.round(currentRide?.estimatedTime)} mins
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Fare</Text>
          <Text style={styles.fareValue}>
            ₹{currentRide?.totalFare.toFixed(2)}
          </Text>
        </View>
      </View>

      {!submitted ? (
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>How was your ride?</Text>
          <Text style={styles.ratingSubtitle}>
            Rate your experience and help us improve
          </Text>

          <RatingStars />

          <TextInput
            style={styles.feedbackInput}
            placeholder="Add your feedback (optional)"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitRating}
            disabled={rating === 0 || loading}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Rating</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.thankYouSection}>
          <Text style={styles.thankYouTitle}>Thank you!</Text>
          <Text style={styles.thankYouMessage}>
            Your rating has been submitted. Your feedback helps drivers improve their service.
          </Text>

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.detailsSection}>
        <Text style={styles.detailsTitle}>Ride Details</Text>

        <View style={styles.detailsItem}>
          <Text style={styles.detailsLabel}>Pickup</Text>
          <Text style={styles.detailsValue}>{currentRide?.pickupAddress}</Text>
        </View>

        <View style={styles.detailsItem}>
          <Text style={styles.detailsLabel}>Drop</Text>
          <Text style={styles.detailsValue}>{currentRide?.dropAddress}</Text>
        </View>

        <View style={styles.detailsItem}>
          <Text style={styles.detailsLabel}>Payment Method</Text>
          <Text style={styles.detailsValue}>Cash/Card</Text>
        </View>
      </View>
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
  summaryCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  fareValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  ratingSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    fontSize: 40,
    color: '#e0e0e0',
    marginHorizontal: 8,
  },
  starFilled: {
    color: '#ffc107',
  },
  feedbackInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thankYouSection: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  thankYouTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  thankYouMessage: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  doneButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  detailsItem: {
    marginBottom: 12,
  },
  detailsLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600',
  },
  detailsValue: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
});

export default TripSummaryScreen;
