import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { clearUser } from '../../store/slices/authSlice';

const SettingsScreen: React.FC = () => {
  const { isGuest, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleSignOut = () => {
    const title = isGuest ? 'Exit Guest Mode?' : 'Sign Out?';
    const message = isGuest 
      ? 'You will return to the welcome screen.'
      : 'Are you sure you want to sign out?';

    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: isGuest ? 'Exit' : 'Sign Out', 
        style: 'destructive',
        onPress: () => dispatch(clearUser())
      },
    ]);
  };

  const handleLanguageSelect = () => {
    Alert.alert(
      'Language Settings',
      'Language selection will be available in the next update!'
    );
  };

  const handleAbout = () => {
    Alert.alert(
      '1st Hojan Science Forum',
      'Version 1.0.0\n\nBuilt for the Kurdish scientific community to connect, learn, and collaborate.\n\n© 2024 Hojan Science Forum'
    );
  };

  const SettingItem: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightContent?: React.ReactNode;
    showArrow?: boolean;
  }> = ({ icon, title, subtitle, onPress, rightContent, showArrow = true }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color="#1976D2" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightContent}
        {showArrow && onPress && (
          <Icon name="chevron-right" size={24} color="#BDBDBD" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={48} color="#FFFFFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.name || 'Guest User'}
          </Text>
          <Text style={styles.profileEmail}>
            {isGuest ? 'Limited Access' : user?.email || 'No email'}
          </Text>
        </View>
        {!isGuest && (
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={16} color="#1976D2" />
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <SettingItem
          icon="notifications"
          title="Push Notifications"
          subtitle="Get notified about important updates"
          showArrow={false}
          rightContent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E0E0E0', true: '#81C784' }}
              thumbColor={notifications ? '#4CAF50' : '#FFFFFF'}
            />
          }
        />
        
        <SettingItem
          icon="schedule"
          title="Session Reminders" 
          subtitle="15 minutes before your bookmarked sessions"
          showArrow={false}
          rightContent={
            <Switch
              value={sessionReminders}
              onValueChange={setSessionReminders}
              trackColor={{ false: '#E0E0E0', true: '#81C784' }}
              thumbColor={sessionReminders ? '#4CAF50' : '#FFFFFF'}
              disabled={isGuest}
            />
          }
        />
        
        <SettingItem
          icon="email"
          title="Email Updates"
          subtitle="Conference updates and announcements"
          showArrow={false}
          rightContent={
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{ false: '#E0E0E0', true: '#81C784' }}
              thumbColor={emailUpdates ? '#4CAF50' : '#FFFFFF'}
              disabled={isGuest}
            />
          }
        />
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <SettingItem
          icon="language"
          title="Language"
          subtitle={`${user?.preferredLanguage === 'en' ? 'English' : 
                     user?.preferredLanguage === 'ku-sorani' ? 'کوردیی سۆرانی' : 
                     'Kurmancî'} (Current)`}
          onPress={handleLanguageSelect}
        />
        
        <SettingItem
          icon="storage"
          title="Clear Cache"
          subtitle="Free up storage space"
          onPress={() => Alert.alert('Feature Coming Soon', 'Cache clearing will be available soon!')}
        />
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <SettingItem
          icon="help"
          title="Help & FAQ"
          onPress={() => Alert.alert('Feature Coming Soon', 'Help section will be available soon!')}
        />
        
        <SettingItem
          icon="feedback"
          title="Send Feedback"
          onPress={() => Alert.alert('Feature Coming Soon', 'Feedback form will be available soon!')}
        />
        
        <SettingItem
          icon="info"
          title="About"
          onPress={handleAbout}
        />
      </View>

      {/* Sign Out */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Icon name="exit-to-app" size={24} color="#E53E3E" />
          <Text style={styles.signOutText}>
            {isGuest ? 'Exit Guest Mode' : 'Sign Out'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Hojan Science Forum App v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  signOutText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
  },
});

export default SettingsScreen;