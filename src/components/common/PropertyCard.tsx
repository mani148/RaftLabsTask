import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Property } from "../../types/types";
import Carousel from "react-native-reanimated-carousel";
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigationState } from "@react-navigation/native";
import { usePropertyStore } from "../../store/usePropertyStore";
import MapScreen from "../../screens/MapScreen";

type Props = {
  item: Property;
  navigation?: any;
  isDetails?:boolean
  isBooking? : boolean
};

export default function PropertyCard({ item, navigation, isDetails = false, isBooking= false }: Props) {
  const { width, height } = Dimensions.get("window");
  const { setSelectedProperty } = usePropertyStore();
  const [mapVisible, setMapVisible] = useState(false);
  const selectedTab = useNavigationState((state) => {
      const route = state.routes[state.index];
      return route.name; // e.g., "Home", "Bookings", "Profile"
    });
    
    
  const handlePress = () => {
      if (navigation){
        setSelectedProperty(item);
        navigation.navigate("Details", { item, isFromBooking: selectedTab === 'Bookings' });
  }
  };

  const moveToMap = () => {
    if(isDetails){
    setMapVisible(true);}else{
    
      handlePress();
    }
  };
    const KeyFeatureIcon = ({ name }: { name: string}) => {
        let icon = ""
        if (name.toLowerCase().includes('bedroom')) {
            icon = "bed";
        } else if (name.toLowerCase().includes('bathroom')) {
            icon = "bath";
        } else if (name.toLowerCase().includes('parking')) {
            icon = "parking";
        } else if (name.toLowerCase().includes('pool')) {
            icon = "swimming-pool";
      } else  {
          icon = "check";
      }
        return <KeyComponent key = {name} text={name} icon={icon} />;
    }

    const KeyComponent = ({ text, icon }: { text: string, icon: string }) => {
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginTop: 7,
            }}>
                <View style={{ width: 24 }}>
                    <FontAwesome name={icon} size={24} color='black' />
                </View>
                <Text style={{ marginLeft: 25, fontSize: 18 }}>{text}</Text>
            </View>
        );
    }

  const BookingInfo = ({ text, icon, value }: { text: string, icon: string, value: string }) => {
    return (
      <View style={{
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, marginTop: 7,
      }}>
        <View style={{ width: 30 }}>
          <FontAwesome name={icon} size={20} color='black' />
        </View>
        <Text style={{ marginLeft: 25, fontSize: 18 }}>{text}</Text>
        <Text style={{ marginLeft: 25, fontSize: 18 }}>{value}</Text>
      </View>
    );
  }


  return (
    <View style={styles.card}>
      <Carousel
        width={width - 24}
        height={200}
        pagingEnabled
        style={styles.carousel}
        data={item.images}
        autoPlay = {isDetails}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity style={styles.addressContainer} onPress={moveToMap}>
          <FontAwesome name={"map-marker-alt"} size={24} color='black' />
          <View>
          
            <Text style={styles.fontSize20}>{item.location.address}</Text>
            <Text style={styles.fontSize20}>
              {item.location.city}, {item.location.state}
            </Text>
          </View>
          <Text style={styles.price}>${item.price}/Month</Text>
        </TouchableOpacity>
       { isDetails && <>
        <Text style={styles.keyFeatures}>Key Features</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 12, }}>
                  {item.features.map((name, index) => (
                      <KeyFeatureIcon key={index} name={name} />
                  ))}
              </View>
              </>}
        {isDetails && item.checkIn && <>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginVertical: 12, }}>
            <BookingInfo text={'Check-In:'} icon={"calendar-alt"} value={item.checkIn} />
            <BookingInfo text={'Check-Out:'} icon={"calendar-alt"} value={item.checkOut} />
            <BookingInfo text={'Status:'} icon={"hotel"} value={item.status} />
          </View>
        </>}
        
        <Modal
          visible={mapVisible}
          animationType="slide"
          onRequestClose={() => setMapVisible(false)}
        ><MapScreen setMapVisible={setMapVisible}/></Modal>
      </TouchableOpacity>

     
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 7,
  },
  carousel: { width: "100%", alignSelf: "center" },
  image: { width: "100%", height: 200, borderRadius: 12 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    paddingHorizontal: 12,
  },
  addressContainer: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  fontSize20: { fontSize: 20 },
  price: { fontSize: 20, marginTop: 7 },
  keyFeatures: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 24,
    paddingLeft: 12,
  },
});
