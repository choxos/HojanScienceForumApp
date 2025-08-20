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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { clearUser } from '../../store/slices/authSlice';

const MoreScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { isGuest, user } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(clearUser());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {isGuest ? 'G' : user?.name.substring(0, 2).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {isGuest ? 'Guest User' : user?.name || 'User'}
            </Text>
            <Text style={styles.profileEmail}>
              {isGuest ? 'Limited Access' : user?.email || 'No email'}
            </Text>
            <Text style={styles.profileAffiliation}>
              {isGuest ? 'Conference Program Viewer' : user?.affiliation || 'No affiliation'}
            </Text>
          </View>
          {!isGuest && (
            <TouchableOpacity style={styles.editButton}>
              <Icon name="edit" size={20} color="#1976D2" />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Stats */}
        {!isGuest ? (
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Sessions Attended</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Connections</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Resources Saved</Text>
            </View>
          </View>
        ) : (
          <View style={styles.guestNotice}>
            <Text style={styles.guestNoticeText}>
              Sign in to access networking features, save sessions, and connect with other attendees.
            </Text>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="favorite" size={24} color="#E91E63" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>My Agenda</Text>
              <Text style={styles.menuSubtitle}>Sessions you've bookmarked</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="people" size={24} color="#1976D2" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>My Connections</Text>
              <Text style={styles.menuSubtitle}>Network and messages</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="download" size={24} color="#4CAF50" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Downloads</Text>
              <Text style={styles.menuSubtitle}>Offline content and resources</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="notifications" size={24} color="#FF9800" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSubtitle}>Manage your notification preferences</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="language" size={24} color="#9C27B0" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Language</Text>
              <Text style={styles.menuSubtitle}>English</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="dark-mode" size={24} color="#424242" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Dark Mode</Text>
              <Text style={styles.menuSubtitle}>System default</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="security" size={24} color="#795548" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Privacy & Security</Text>
              <Text style={styles.menuSubtitle}>Manage your privacy settings</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Feedback & Support */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="feedback" size={24} color="#FF5722" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Send Feedback</Text>
              <Text style={styles.menuSubtitle}>Help us improve the app</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="help" size={24} color="#607D8B" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuSubtitle}>Get help and contact support</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="info" size={24} color="#00BCD4" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>About</Text>
              <Text style={styles.menuSubtitle}>App info and conference details</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Conference Info */}
        <View style={styles.conferenceSection}>
          <View style={styles.conferenceHeader}>
            <Text style={styles.conferenceTitle}>1st Hojan Science Forum</Text>
            <Text style={styles.conferenceDate}>August 25-28, 2025</Text>
            <Text style={styles.conferenceLocation}>University of Ottawa</Text>
          </View>
          
          <View style={styles.conferenceSocials}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="web" size={20} color="#1976D2" />
              <Text style={styles.socialText}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="mail" size={20} color="#1976D2" />
              <Text style={styles.socialText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="share" size={20} color="#1976D2" />
              <Text style={styles.socialText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signOutSection}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Icon name="logout" size={20} color="#F44336" />
            <Text style={styles.signOutText}>
              {isGuest ? 'Exit Guest Mode' : 'Sign Out'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  profileAffiliation: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  editButton: {
    padding: 8,
  },
  statsSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
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
    textAlign: 'center',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  conferenceSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  conferenceHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  conferenceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
    textAlign: 'center',
  },
  conferenceDate: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
    marginBottom: 4,
  },
  conferenceLocation: {
    fontSize: 14,
    color: '#757575',
  },
  conferenceSocials: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    alignItems: 'center',
    padding: 12,
  },
  socialText: {
    fontSize: 12,
    color: '#1976D2',
    marginTop: 4,
    fontWeight: '500',
  },
  signOutSection: {
    margin: 16,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  signOutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  versionText: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  guestNotice: {
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
    alignItems: 'center',
  },
  guestNoticeText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MoreScreen;
