import { View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Property, PropertyBooking, RootStackParamList } from '../types/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PropertyCard from '../components/common/PropertyCard';
import { usePropertyStore } from '../store/usePropertyStore';
import { getBookings } from '../api/Service';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

export default function Booking({ navigation }: Props) {
  const [bookings, setBookings] = useState<PropertyBooking[]>([]);
  const [bookedProperties, setBookedProperties] = useState<Property[]>([]);
  const [filteredBookedProperties, setFilteredBookedProperties] = useState<Property[]>([]);
  const [searchText, setSearchText] = useState('');
  const { properties, bookingIds } = usePropertyStore();

  useEffect(() => {
    fetchBookings();
  }, [bookingIds]);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  useEffect(() => {
    filterBookings();
  }, [bookings]);

  const filterBookings = () => {
    const filteredProperties = properties
      .map((property) => {
        const booking = bookings.find((b) => b.propertyId === property.id);

        if (!booking) return null;

        return {
          ...property,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          status: booking.status,
          bookingId: booking.id,
          userId: booking.userId,
        };
      })
      .filter(Boolean) as Property[];

    setBookedProperties(filteredProperties);
    setFilteredBookedProperties(filteredProperties);
  };

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredBookedProperties(bookedProperties);
    } else {
      const lower = searchText.toLowerCase();
      const filtered = bookedProperties.filter(
        (property) =>
          property.title?.toLowerCase().includes(lower) ||
          property.location?.address.toLowerCase().includes(lower)
      );
      setFilteredBookedProperties(filtered);
    }
  }, [searchText, bookedProperties]);

  return (
    <View style={styles.container}>
      {filteredBookedProperties.length > 0 ? (
        <FlatList
          data={filteredBookedProperties}
          renderItem={({ item }) => <PropertyCard item={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          style={{ width: '100%' }}
        />
      ) : (
        <Text style={styles.noBooking}>No bookings found.</Text>
      )}
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
    flexDirection:'column'
  },
  searchInput: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  noBooking: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 24,
  },
});
