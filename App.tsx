import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './src/navigation/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
import { RootStackParamList } from './src/types/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={Tabs} options={{ headerShown: true }} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
