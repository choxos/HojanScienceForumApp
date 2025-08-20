import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgramStackParamList } from '../types';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import SessionDetailScreen from '../screens/schedule/SessionDetailScreen';

const Stack = createNativeStackNavigator<ProgramStackParamList>();

const ProgramStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="ProgramList" 
        component={ScheduleScreen} 
      />
      <Stack.Screen 
        name="SessionDetail" 
        component={SessionDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default ProgramStackNavigator;
