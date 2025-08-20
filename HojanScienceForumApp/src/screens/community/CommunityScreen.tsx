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

const CommunityScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Connection Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>247</Text>
            <Text style={styles.statLabel}>Attendees</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Connected</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>34</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.primaryAction}>
            <Icon name="person-add" size={24} color="#FFFFFF" />
            <Text style={styles.primaryActionText}>Find New Connections</Text>
          </TouchableOpacity>
          
          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.secondaryAction}>
              <Icon name="group" size={20} color="#1976D2" />
              <Text style={styles.secondaryActionText}>Interest Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryAction}>
              <Icon name="chat" size={20} color="#1976D2" />
              <Text style={styles.secondaryActionText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Connections */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Connections</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.connectionCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SM</Text>
            </View>
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionName}>Dr. Saman Mahmood</Text>
              <Text style={styles.connectionTitle}>Research Scientist • MIT</Text>
              <Text style={styles.connectionStatus}>Connected 2 hours ago</Text>
            </View>
            <TouchableOpacity style={styles.messageButton}>
              <Icon name="chat" size={18} color="#1976D2" />
            </TouchableOpacity>
          </View>

          <View style={styles.connectionCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>ZK</Text>
            </View>
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionName}>Dr. Zhyan Kareem</Text>
              <Text style={styles.connectionTitle}>Environmental Engineer</Text>
              <Text style={styles.connectionStatus}>Connected yesterday</Text>
            </View>
            <TouchableOpacity style={styles.messageButton}>
              <Icon name="chat" size={18} color="#1976D2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Interest Groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interest Groups</Text>
          
          <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupIcon}>
              <Icon name="computer" size={24} color="#1976D2" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>AI & Machine Learning</Text>
              <Text style={styles.groupMembers}>34 members • 12 active now</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupIcon}>
              <Icon name="science" size={24} color="#4CAF50" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>Biotechnology Research</Text>
              <Text style={styles.groupMembers}>28 members • 8 active now</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupIcon}>
              <Icon name="language" size={24} color="#FF9800" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>Kurdish Language Tech</Text>
              <Text style={styles.groupMembers}>19 members • 5 active now</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Mentorship */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mentorship Program</Text>
          <View style={styles.mentorshipCard}>
            <View style={styles.mentorshipContent}>
              <Text style={styles.mentorshipTitle}>Find a Mentor</Text>
              <Text style={styles.mentorshipText}>
                Connect with experienced Kurdish scientists for guidance and career development.
              </Text>
              <TouchableOpacity style={styles.mentorshipButton}>
                <Text style={styles.mentorshipButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212121',
  },
  searchButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
  },
  actionsSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  primaryAction: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryAction: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  secondaryActionText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  seeAllText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
  },
  connectionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  connectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  connectionTitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  connectionStatus: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  messageButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInfo: {
    flex: 1,
    marginLeft: 16,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 12,
    color: '#757575',
  },
  mentorshipCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 20,
  },
  mentorshipContent: {
    alignItems: 'center',
  },
  mentorshipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  mentorshipText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  mentorshipButton: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  mentorshipButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CommunityScreen;
