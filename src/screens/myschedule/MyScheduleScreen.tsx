import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const MyScheduleScreen: React.FC = () => {
  const { isGuest } = useSelector((state: RootState) => state.auth);

  const handleBookmarkSession = () => {
    Alert.alert(
      'Feature Coming Soon',
      'Session bookmarking will be available soon!'
    );
  };

  const mockSelectedSessions = [
    {
      id: '1',
      title: 'Opening Keynote: Future of Science',
      time: '9:00 AM - 10:00 AM',
      date: 'Day 1',
      location: 'Main Hall',
      type: 'keynote',
    },
    {
      id: '2', 
      title: 'AI in Medical Research',
      time: '2:00 PM - 3:30 PM',
      date: 'Day 2',
      location: 'Room A',
      type: 'ted-talk',
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return '#E53E3E';
      case 'ted-talk': return '#3182CE';
      case 'panel': return '#38A169';
      case 'workshop': return '#D69E2E';
      default: return '#718096';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'keynote': return 'KEYNOTE';
      case 'ted-talk': return 'TED TALK';
      case 'panel': return 'PANEL';
      case 'workshop': return 'WORKSHOP';
      default: return 'SESSION';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="bookmark" size={32} color="#1976D2" />
        <Text style={styles.headerTitle}>My Schedule</Text>
        <Text style={styles.headerSubtitle}>
          {mockSelectedSessions.length} sessions selected
        </Text>
      </View>

      {/* Guest Notice */}
      {isGuest && (
        <View style={styles.guestNotice}>
          <Icon name="info" size={20} color="#F56500" />
          <Text style={styles.guestNoticeText}>
            Guest users can view the schedule but cannot bookmark sessions
          </Text>
        </View>
      )}

      {/* Selected Sessions */}
      <View style={styles.sessionsContainer}>
        {mockSelectedSessions.map((session) => (
          <View key={session.id} style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <View 
                style={[styles.typeChip, { backgroundColor: getTypeColor(session.type) }]}
              >
                <Text style={styles.typeText}>{getTypeLabel(session.type)}</Text>
              </View>
              <TouchableOpacity 
                onPress={handleBookmarkSession}
                disabled={isGuest}
              >
                <Icon 
                  name="bookmark" 
                  size={24} 
                  color={isGuest ? "#BDBDBD" : "#1976D2"} 
                />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.sessionTitle}>{session.title}</Text>
            
            <View style={styles.sessionDetails}>
              <View style={styles.detailRow}>
                <Icon name="access-time" size={16} color="#666" />
                <Text style={styles.detailText}>{session.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="event" size={16} color="#666" />
                <Text style={styles.detailText}>{session.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="location-on" size={16} color="#666" />
                <Text style={styles.detailText}>{session.location}</Text>
              </View>
            </View>

            <View style={styles.sessionActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="notifications" size={16} color="#1976D2" />
                <Text style={styles.actionText}>Remind Me</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="info" size={16} color="#1976D2" />
                <Text style={styles.actionText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Empty State */}
        {mockSelectedSessions.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="bookmark-border" size={64} color="#BDBDBD" />
            <Text style={styles.emptyTitle}>No sessions selected</Text>
            <Text style={styles.emptySubtitle}>
              Browse the program and bookmark sessions you want to attend
            </Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Program</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
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
  sessionsContainer: {
    padding: 16,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  sessionDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  sessionActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
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

export default MyScheduleScreen;
