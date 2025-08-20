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

const ScheduleScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conference Program</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={24} color="#1B4332" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.daySection}>
          <Text style={styles.dayTitle}>Day 1 - August 25, 2025</Text>
          
          <View style={styles.sessionCard}>
            <View style={styles.timeSection}>
              <Text style={styles.timeText}>09:00</Text>
              <Text style={styles.durationText}>30 min</Text>
            </View>
            <View style={styles.sessionDetails}>
              <Text style={styles.sessionType}>Opening Ceremony</Text>
              <Text style={styles.sessionTitle}>Welcome to Hojan Science Forum</Text>
              <Text style={styles.sessionLocation}>📍 Main Auditorium</Text>
              <View style={styles.sessionTags}>
                <Text style={styles.tag}>Opening</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="favorite-border" size={20} color="#D4AF37" />
            </TouchableOpacity>
          </View>

          <View style={styles.sessionCard}>
            <View style={styles.timeSection}>
              <Text style={styles.timeText}>10:30</Text>
              <Text style={styles.durationText}>45 min</Text>
            </View>
            <View style={styles.sessionDetails}>
              <Text style={styles.sessionType}>Keynote</Text>
              <Text style={styles.sessionTitle}>The Future of Kurdish Science</Text>
              <Text style={styles.sessionLocation}>📍 Main Auditorium</Text>
              <Text style={styles.speakerName}>Dr. Hawkar Ahmed</Text>
              <View style={styles.sessionTags}>
                <Text style={styles.tag}>Research</Text>
                <Text style={styles.tag}>Future</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="favorite" size={20} color="#D4AF37" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.daySection}>
          <Text style={styles.dayTitle}>Day 2 - August 26, 2025</Text>
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>More sessions coming soon...</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B4332',
  },
  filterButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  daySection: {
    margin: 16,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeSection: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sessionDetails: {
    flex: 1,
    marginLeft: 16,
  },
  sessionType: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginBottom: 4,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
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
    fontStyle: 'italic',
    marginBottom: 8,
  },
  sessionTags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    fontSize: 10,
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  favoriteButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  comingSoon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    opacity: 0.6,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ScheduleScreen;
