import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { usePropertyStore } from '../store/usePropertyStore';

type Props= {
    setMapVisible: (mapVisible:boolean) => void
}

const MapScreen = ({ setMapVisible  }: Props) => {

       const { selectedProperty } = usePropertyStore();
    const { latitude, longitude } = selectedProperty?.location?.coordinates ?? {
        latitude: 0,
        longitude: 0,
      };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setMapVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude, 
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={selectedProperty?.title}
                    description={selectedProperty?.location.address}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
        backgroundColor: '#00000099',
        borderRadius: 20,
        padding: 10,
      },
    closeText: {
        color: 'white',
        fontSize: 18,
      },
});

export default MapScreen;
