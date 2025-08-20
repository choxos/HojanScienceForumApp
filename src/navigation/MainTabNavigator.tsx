import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

// Import screen components
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import { MainTabParamList } from '../types';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Simple inline MySchedule component to avoid import issues
const MyScheduleScreen: React.FC = () => {
  const { isGuest } = useSelector((state: RootState) => state.auth);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="bookmark" size={32} color="#1976D2" />
        <Text style={styles.headerTitle}>My Schedule</Text>
        <Text style={styles.headerSubtitle}>Notification preferences for selected sessions</Text>
      </View>
      
      {isGuest && (
        <View style={styles.guestNotice}>
          <Icon name="info" size={20} color="#F56500" />
          <Text style={styles.guestNoticeText}>
            Guest users can view the schedule but cannot select sessions for notifications
          </Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Icon name="bookmark-border" size={64} color="#BDBDBD" />
        <Text style={styles.emptyTitle}>No sessions selected yet</Text>
        <Text style={styles.emptySubtitle}>
          Browse the program and select sessions to receive notifications
        </Text>
        <TouchableOpacity style={styles.browseButton}>
          <Text style={styles.browseButtonText}>Browse Program</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const MainTabNavigator: React.FC = () => {
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Program':
              iconName = 'event';
              break;
            case 'MySchedule':
              iconName = 'bookmark';
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
        name="Program" 
        component={ScheduleScreen}
        options={{ title: 'Program' }}
      />
      <Tab.Screen 
        name="MySchedule" 
        component={MyScheduleScreen}
        options={{ title: 'My Schedule' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
    textAlign: 'center',
  },
  guestNotice: {
    backgroundColor: '#FFF3CD',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestNoticeText: {
    marginLeft: 8,
    color: '#856404',
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MainTabNavigator;
