import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

// Import screen components
import ProgramStackNavigator from './ProgramStackNavigator';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SettingsScreen from '../screens/settings/SettingsScreen';

import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Inline MySchedule to avoid import resolution issues
const MyScheduleInline: React.FC = () => {
  const { isGuest } = useSelector((state: RootState) => state.auth);
  const agendaIds = useSelector((state: RootState) => state.sessions.userAgenda);
  const days: any[] = (require('../data/programData.json') as any).conference.days;

  const sessions = React.useMemo(() => {
    const map: Record<string, { day: any; session: any } | undefined> = {};
    for (const day of days) {
      for (const session of day.sessions) {
        map[session.id] = { day, session };
      }
    }
    return agendaIds.map(id => map[id]).filter(Boolean) as { day: any; session: any }[];
  }, [agendaIds]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="bookmark" size={32} color="#1976D2" />
        <Text style={styles.headerTitle}>My Schedule</Text>
        <Text style={styles.headerSubtitle}>Selected sessions (EST)</Text>
      </View>
      {isGuest && (
        <View style={styles.guestNotice}>
          <Icon name="info" size={20} color="#F56500" />
          <Text style={styles.guestNoticeText}>Guest users cannot select sessions</Text>
        </View>
      )}

      {sessions.length === 0 ? (
        <View style={styles.content}>
          <Icon name="bookmark-border" size={64} color="#BDBDBD" />
          <Text style={styles.emptyTitle}>No sessions selected</Text>
          <Text style={styles.emptySubtitle}>Browse the program and add sessions you like</Text>
        </View>
      ) : (
        sessions.map(({ day, session }) => (
          <TouchableOpacity 
            key={session.id} 
            style={styles.sessionCard}
            onPress={() => {
              // Navigate to session detail - for simplicity, we'll use the ProgramStack navigation
              // This would need proper navigation context to work fully
            }}
          >
            <Text style={styles.sessionTitle}>{(session.title.en) || ''}</Text>
            <Text style={styles.sessionLocation}>{day.date} • {session.time}</Text>
            {session.speaker ? <Text style={styles.speakerName}>{session.speaker}</Text> : null}
            {session.speakers && session.speakers.length > 0 && (
              <Text style={styles.speakersInfo}>
                {session.speakers.length} speakers
              </Text>
            )}
            {session.posters && session.posters.length > 0 && (
              <Text style={styles.postersInfo}>
                {session.posters.length} posters
              </Text>
            )}
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const MainTabNavigator: React.FC = () => {
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Program':
              iconName = 'event';
              break;
            case 'MySchedule':
              iconName = 'bookmark';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976D2',
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
        component={ProgramStackNavigator}
        options={{ title: 'Program' }}
      />
      <Tab.Screen
        name="MySchedule"
        component={MyScheduleInline}
        options={{ title: 'My Schedule' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings', tabBarIcon: ({ color, size }) => (<Icon name="settings" size={size} color={color} />) }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B4332',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  guestNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  guestNoticeText: {
    fontSize: 14,
    color: '#E65100',
    marginLeft: 8,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 8,
  },
  sessionLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  speakerName: {
    fontSize: 14,
    color: '#1B4332',
    fontWeight: '600',
    marginTop: 4,
  },
  speakersInfo: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
    marginTop: 4,
  },
  postersInfo: {
    fontSize: 12,
    color: '#9C27B0',
    fontWeight: '600',
    marginTop: 4,
  },
});

export default MainTabNavigator;
