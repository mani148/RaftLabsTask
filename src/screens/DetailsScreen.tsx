import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigationState } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import PropertyCard from '../components/common/PropertyCard';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { bookProperty, cancelBooking } from '../api/Service';
import { usePropertyStore } from '../store/usePropertyStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;


export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({ route, navigation }: DetailsScreenProps) => {

    const { item} = route.params;
    const { selectedProperty,bookingIds, setBookingIds  } = usePropertyStore();

    const selectedTab = useNavigationState((state) => {
          const route = state.routes[state.index];
          return route.name; // e.g., "Home", "Bookings", "Profile"
        });
        

    const checkBooking = () => {
        let isBooked = false;
        if (selectedProperty?.id){
            isBooked=  bookingIds.includes(selectedProperty?.id)
        }
     return isBooked;
    }    
    const isBooked = checkBooking();
    console.log(isBooked)
    const handleOnPressed = ()=> {
        if(!isBooked){
            handleBookNow();
        }else{
            console.log(selectedProperty?.bookingId)
            if (selectedProperty?.bookingId){
            handleCancelBooking(selectedProperty?.bookingId , selectedProperty?.id);}
        }
        
    }

    const handleCancelBooking = async (bookingId: string, propertyId: string) => {
        console.log("handleCancelBooking called")
        try {
            const cancelled = await cancelBooking(bookingId);
            console.log("cancelled.status", cancelled.status)
            if (cancelled.status === 'cancelled') {
                console.log("cancelled.status inside")
                usePropertyStore.getState().removeBookingId(propertyId); 
            }
        } catch (err) {
            console.error('Failed to cancel booking:', err);
        }
      };
 
    const handleBookNow = async () => {
        try {
            const booking = await bookProperty({
                propertyId: selectedProperty?.id,
                userId: 'user1',
                checkIn: '2025-07-01',
                checkOut: '2025-07-10',
                status: "Confirmed"
            });
            if (selectedProperty?.id) {
                setBookingIds([selectedProperty.id]); 
              }
        } catch (err) {
        }
    };

    const status = item?.item?.status

    return (
        <View style={styles.container}>
        <ScrollView style={styles.container}>
            <PropertyCard item={item} isBooking={item.isFromBooking} isDetails navigation={navigation} />
        </ScrollView>
            {<TouchableOpacity style={styles.button} onPress={handleOnPressed}>
                <Text style={styles.buttonText}>{!isBooked ?  "Book" :   "Cancel Booking" }</Text>
            </TouchableOpacity>}
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        margin:'5%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      },
});
