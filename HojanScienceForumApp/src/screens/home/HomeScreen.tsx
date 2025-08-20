import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const HomeScreen: React.FC = () => {
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.conferenceTitle}>1st Hojan Science Forum</Text>
          <Text style={styles.subtitle}>Connecting Kurdish Scientists Worldwide</Text>
        </View>

        {/* Guest Notice Banner */}
        {isGuest && (
          <View style={styles.guestBanner}>
            <Icon name="info" size={20} color="#1976D2" />
            <Text style={styles.guestBannerText}>
              You're in guest mode. Sign in to access chat and networking features.
            </Text>
          </View>
        )}

        {/* Live Session Banner */}
        <View style={styles.liveSection}>
          <View style={styles.liveHeader}>
            <Icon name="live-tv" size={24} color="#FF4444" />
            <Text style={styles.liveText}>LIVE NOW</Text>
          </View>
          <Text style={styles.liveTitle}>Keynote: The Future of Kurdish Science</Text>
          <Text style={styles.liveSubtitle}>Dr. Hawkar Ahmed • Main Auditorium</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Session</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <View style={styles.scheduleItem}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>09:00</Text>
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTitle}>Opening Ceremony</Text>
              <Text style={styles.sessionLocation}>Main Auditorium</Text>
            </View>
          </View>
          <View style={styles.scheduleItem}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>10:30</Text>
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTitle}>AI in Kurdish Language Processing</Text>
              <Text style={styles.sessionLocation}>Room 205</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View Full Schedule</Text>
            <Icon name="arrow-forward" size={16} color="#D4AF37" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="people" size={32} color="#1B4332" />
              <Text style={styles.actionText}>Browse Speakers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="group" size={32} color="#1B4332" />
              <Text style={styles.actionText}>Network</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="library-books" size={32} color="#1B4332" />
              <Text style={styles.actionText}>Resources</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <Icon name="feedback" size={32} color="#1B4332" />
              <Text style={styles.actionText}>Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <View style={styles.announcementItem}>
            <Text style={styles.announcementTitle}>Welcome Reception Tonight</Text>
            <Text style={styles.announcementText}>
              Join us at 7 PM in the University Center for networking and Kurdish cultural performances.
            </Text>
            <Text style={styles.announcementTime}>2 hours ago</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    backgroundColor: '#1976D2',
    padding: 24,
    alignItems: 'center',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  conferenceTitle: {
    color: '#E3F2FD',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#B0B0B0',
    fontSize: 14,
    textAlign: 'center',
  },
  liveSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  liveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveText: {
    color: '#FF4444',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  liveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 4,
  },
  liveSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
  },
  sessionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B4332',
    marginBottom: 4,
  },
  sessionLocation: {
    fontSize: 14,
    color: '#666',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  viewAllText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 12,
    color: '#1B4332',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  announcementItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B4332',
    marginBottom: 8,
  },
  announcementText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  announcementTime: {
    fontSize: 12,
    color: '#999',
  },
  guestBanner: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  guestBannerText: {
    flex: 1,
    fontSize: 14,
    color: '#1976D2',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default HomeScreen;
