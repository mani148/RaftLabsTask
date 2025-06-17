import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type RootStackParamList = {
  HomeTab: undefined;
  Home: undefined;
  Booking: undefined;
  MapScreen: undefined;
  Details: { item: { item: Property, isFromBooking: boolean } };
  };

export type Property = {
    features: string[];
    id: string;
    images: string[];
    location: {
        address: string;
        city: string;
        coordinates: {
          latitude: number,
          longitude: number,
        },
        state: string;
    };
    price: string;
    title: string;

  checkIn?: string,
  checkOut?: string,
  status?: string,
  bookingId?: string,
  };

export type PropertyBooking = {
    id: string,
    propertyId: string,
    userId: string,
    checkIn:  string,
    checkOut: string,
    status: string,
    bookingId:string,
  }


