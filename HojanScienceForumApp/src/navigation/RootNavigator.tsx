import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/auth/AuthScreen';

import { RootStackParamList } from '../types';
import { RootState } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  // We'll implement Redux store later, for now use a placeholder
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen 
            name="Main" 
            component={MainTabNavigator} 
          />
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
