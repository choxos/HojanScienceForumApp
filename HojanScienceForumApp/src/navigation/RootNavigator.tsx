import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/auth/AuthScreen';
import SplashScreen from '../screens/splash/SplashScreen';

import { RootStackParamList } from '../types';
import { RootState } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds to allow users to see the logo
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showSplash ? (
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
          />
        ) : isAuthenticated ? (
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
