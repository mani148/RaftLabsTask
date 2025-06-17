import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import Tabs from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import MapScreen from '../screens/MapScreen';
import { navigationRef } from './navigationRef';



export default function AppNavigation() {

    const RootStack = createNativeStackNavigator<RootStackParamList>();

        return (
            <NavigationContainer ref={navigationRef}>
                <RootStack.Navigator>
                    <RootStack.Screen name="HomeTab" component={Tabs} options={{ headerShown: false }} />
                    <RootStack.Screen name="Details" component={DetailsScreen} />
                    <RootStack.Screen name="MapScreen" component={MapScreen} />
                </RootStack.Navigator>
            </NavigationContainer>
        );
}