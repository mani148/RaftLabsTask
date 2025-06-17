import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Property, RootStackParamList } from '../types/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PropertyCard from '../components/common/PropertyCard';
import { usePropertyStore } from '../store/usePropertyStore';
import { getProperties } from '../api/Service';
import { debounce } from 'lodash';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
    const [properties, setPropertiesState] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [searchText, setSearchText] = useState('');
    const { setProperties } = usePropertyStore();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await getProperties();
            setPropertiesState(response);
            setFilteredProperties(response);
        } catch (e) {
            console.error('Error fetching properties:', e);
        }
    };

    useEffect(() => {
        setProperties(properties);
    }, [properties, setProperties]);

    // Debounced filter function
    const debouncedFilter = useCallback(
        debounce((text: string, list: Property[]) => {
            const lower = text.toLowerCase();
            const filtered = list.filter((property) =>
                property.title?.toLowerCase().includes(lower)
            );
            setFilteredProperties(filtered);
        }, 300),
        []
    );

    // Run debounced filter when searchText or properties change
    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredProperties(properties);
        } else {
            debouncedFilter(searchText, properties);
        }
    }, [searchText, properties, debouncedFilter]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search properties..."
                value={searchText}
                onChangeText={setSearchText}
            />

            <FlatList
                data={filteredProperties}
                renderItem={({ item }) => (
                    <PropertyCard item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: '100%' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#fff',
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
});
