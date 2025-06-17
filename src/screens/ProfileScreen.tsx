import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { usePropertyStore } from '../store/usePropertyStore';

const profile = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  bookings: ['1'], 
};

const ProfileScreen = () => {

  const {bookingIds } = usePropertyStore();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      {/* Booking Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Bookings</Text>

        {profile.bookings.length === 0 ? (
          <Text style={styles.noBookingText}>You have no bookings yet.</Text>
        ) : (
          <FlatList
              data={bookingIds}
            keyExtractor={(id) => id}
            renderItem={({ item }) => (
              <View style={styles.bookingItem}>
                <Text>Booking ID: {item}</Text>
              </View>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  profileCard: {
    backgroundColor: '#f1f5f9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
  },
  email: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  noBookingText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  bookingItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
});

export default ProfileScreen;
