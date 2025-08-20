import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

// Import screen components (we'll create these next)
import HomeScreen from '../screens/home/HomeScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import SpeakersScreen from '../screens/speakers/SpeakersScreen';
import LiveScreen from '../screens/live/LiveScreen';
import CommunityScreen from '../screens/community/CommunityScreen';
import ResourcesScreen from '../screens/resources/ResourcesScreen';
import MoreScreen from '../screens/more/MoreScreen';

import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Schedule':
              iconName = 'schedule';
              break;
            case 'Speakers':
              iconName = 'people';
              break;
            case 'Live':
              iconName = 'live-tv';
              break;
            case 'Community':
              iconName = 'group';
              break;
            case 'Resources':
              iconName = 'library-books';
              break;
            case 'More':
              iconName = 'more-horiz';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976D2', // Material Blue
        tabBarInactiveTintColor: '#757575',
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        headerTintColor: '#212121',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen}
        options={{ title: 'Program' }}
      />
      <Tab.Screen 
        name="Speakers" 
        component={SpeakersScreen}
        options={{ title: 'Speakers' }}
      />
      {!isGuest && (
        <Tab.Screen 
          name="Live" 
          component={LiveScreen}
          options={{ title: 'Live' }}
        />
      )}
      {!isGuest && (
        <Tab.Screen 
          name="Community" 
          component={CommunityScreen}
          options={{ title: 'Network' }}
        />
      )}
      <Tab.Screen 
        name="Resources" 
        component={ResourcesScreen}
        options={{ title: 'Resources' }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{ title: 'More' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
