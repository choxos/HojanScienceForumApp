import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Linking,
  Platform,
  AppState,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState, LanguageCode } from '../../types';
import { 
  setTheme, 
  setLanguage, 
  setNotificationsEnabled,
  setPushNotifications,
  setEmailNotifications,
  setSoundEnabled,
  ThemePreference 
} from '../../store/slices/settingsSlice';
import i18next from 'i18next';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color="#1976D2" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightElement}
        {showArrow && onPress && !rightElement && (
          <Icon name="chevron-right" size={24} color="#999" />
        )}
      </View>
    </TouchableOpacity>
  );
};

interface SectionHeaderProps {
  title: string;
  icon?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  return (
    <View style={styles.sectionHeader}>
      {icon && <Icon name={icon} size={20} color="#1B4332" style={styles.sectionIcon} />}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const settings = useSelector((state: RootState) => state.settings);
  const [appVersion] = useState('1.0.0');
  const [buildNumber] = useState('1');

  const themes: { key: ThemePreference; label: string; icon: string }[] = [
    { key: 'system', label: t('settings.system'), icon: 'settings-brightness' },
    { key: 'light', label: t('settings.light'), icon: 'wb-sunny' },
    { key: 'dark', label: t('settings.dark'), icon: 'nightlight-round' },
  ];

  const languages: { key: LanguageCode; label: string; flag: string }[] = [
    { key: 'en', label: t('settings.english'), flag: '🇺🇸' },
    { key: 'fr', label: t('settings.french'), flag: '🇫🇷' },
    { key: 'ku-sorani', label: t('settings.kurdishSorani'), flag: '🏴' },
    { key: 'ku-kurmanji', label: t('settings.kurdishKurmanji'), flag: '🏴' },
  ];

  const handleThemeChange = (theme: ThemePreference) => {
    dispatch(setTheme(theme));
  };

  const handleLanguageChange = (languageCode: LanguageCode) => {
    dispatch(setLanguage(languageCode));
    i18next.changeLanguage(languageCode);
  };

  const handleNotificationToggle = (value: boolean) => {
    dispatch(setNotificationsEnabled(value));
    if (!value) {
      // If notifications are disabled, disable all notification types
      dispatch(setPushNotifications(false));
      dispatch(setEmailNotifications(false));
    }
  };

  const handlePushNotificationToggle = (value: boolean) => {
    if (value && !settings.notificationsEnabled) {
      // Enable general notifications if push notifications are enabled
      dispatch(setNotificationsEnabled(true));
    }
    dispatch(setPushNotifications(value));
  };

  const handleEmailNotificationToggle = (value: boolean) => {
    if (value && !settings.notificationsEnabled) {
      // Enable general notifications if email notifications are enabled
      dispatch(setNotificationsEnabled(true));
    }
    dispatch(setEmailNotifications(value));
  };

  const handleSoundToggle = (value: boolean) => {
    dispatch(setSoundEnabled(value));
  };

  const showThemeSelector = () => {
    Alert.alert(
      t('settings.theme'),
      t('settings.chooseTheme'),
      [
        ...themes.map(theme => ({
          text: theme.label,
          onPress: () => handleThemeChange(theme.key),
          style: settings.theme === theme.key ? 'destructive' : 'default' as any,
        })),
        { text: t('common.cancel'), style: 'cancel' as any }
      ]
    );
  };

  const showLanguageSelector = () => {
    Alert.alert(
      t('settings.language'),
      t('settings.chooseLanguage'),
      [
        ...languages.map(lang => ({
          text: `${lang.flag} ${lang.label}`,
          onPress: () => handleLanguageChange(lang.key),
          style: settings.language === lang.key ? 'destructive' : 'default' as any,
        })),
        { text: t('common.cancel'), style: 'cancel' as any }
      ]
    );
  };

  const openWebsite = () => {
    Linking.openURL('https://hojan.org').catch(() => {
      Alert.alert('Error', 'Could not open website');
    });
  };

  const openSupport = () => {
    Linking.openURL('mailto:support@hojan.org').catch(() => {
      Alert.alert('Error', 'Could not open email app');
    });
  };

  const reportIssue = () => {
    const subject = encodeURIComponent('Hojan Science Forum App - Issue Report');
    const body = encodeURIComponent(`
App Version: ${appVersion}
Build: ${buildNumber}
Platform: ${Platform.OS}
OS Version: ${Platform.Version}

Issue Description:
[Please describe the issue you're experiencing]
    `);
    
    Linking.openURL(`mailto:support@hojan.org?subject=${subject}&body=${body}`).catch(() => {
      Alert.alert('Error', 'Could not open email app');
    });
  };

  const getCurrentThemeLabel = () => {
    return themes.find(theme => theme.key === settings.theme)?.label || t('settings.system');
  };

  const getCurrentLanguageLabel = () => {
    const lang = languages.find(lang => lang.key === settings.language);
    return lang ? `${lang.flag} ${lang.label}` : '🇺🇸 English';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <SectionHeader title={t('settings.appearance')} icon="palette" />
        <View style={styles.section}>
          <SettingItem
            icon="brightness-6"
            title={t('settings.theme')}
            subtitle={getCurrentThemeLabel()}
            onPress={showThemeSelector}
          />
        </View>

        {/* Language Section */}
        <SectionHeader title={t('settings.languageSettings')} icon="language" />
        <View style={styles.section}>
          <SettingItem
            icon="translate"
            title={t('settings.language')}
            subtitle={getCurrentLanguageLabel()}
            onPress={showLanguageSelector}
          />
        </View>

        {/* Notifications Section */}
        <SectionHeader title={t('settings.notificationSettings')} icon="notifications" />
        <View style={styles.section}>
          <SettingItem
            icon="notifications-active"
            title={t('settings.enableNotifications')}
            subtitle={settings.notificationsEnabled ? t('common.enabled') : t('common.disabled')}
            rightElement={
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: '#E0E0E0', true: '#1976D2' }}
                thumbColor={settings.notificationsEnabled ? '#FFFFFF' : '#F4F3F4'}
              />
            }
            showArrow={false}
          />
          
          <SettingItem
            icon="campaign"
            title={t('settings.pushNotifications')}
            subtitle={settings.pushNotifications ? t('common.enabled') : t('common.disabled')}
            rightElement={
              <Switch
                value={settings.pushNotifications}
                onValueChange={handlePushNotificationToggle}
                trackColor={{ false: '#E0E0E0', true: '#1976D2' }}
                thumbColor={settings.pushNotifications ? '#FFFFFF' : '#F4F3F4'}
                disabled={!settings.notificationsEnabled}
              />
            }
            showArrow={false}
          />
          
          <SettingItem
            icon="email"
            title={t('settings.emailNotifications')}
            subtitle={settings.emailNotifications ? t('common.enabled') : t('common.disabled')}
            rightElement={
              <Switch
                value={settings.emailNotifications}
                onValueChange={handleEmailNotificationToggle}
                trackColor={{ false: '#E0E0E0', true: '#1976D2' }}
                thumbColor={settings.emailNotifications ? '#FFFFFF' : '#F4F3F4'}
                disabled={!settings.notificationsEnabled}
              />
            }
            showArrow={false}
          />
        </View>

        {/* Sound Section */}
        <SectionHeader title={t('settings.sound')} icon="volume-up" />
        <View style={styles.section}>
          <SettingItem
            icon="volume-up"
            title={t('settings.enableSound')}
            subtitle={settings.soundEnabled ? t('common.enabled') : t('common.disabled')}
            rightElement={
              <Switch
                value={settings.soundEnabled}
                onValueChange={handleSoundToggle}
                trackColor={{ false: '#E0E0E0', true: '#1976D2' }}
                thumbColor={settings.soundEnabled ? '#FFFFFF' : '#F4F3F4'}
              />
            }
            showArrow={false}
          />
        </View>

        {/* Support Section */}
        <SectionHeader title={t('settings.support')} icon="help" />
        <View style={styles.section}>
          <SettingItem
            icon="support-agent"
            title={t('settings.contactSupport')}
            subtitle="support@hojan.org"
            onPress={openSupport}
          />
          
          <SettingItem
            icon="bug-report"
            title={t('settings.reportIssue')}
            subtitle="Report bugs or issues"
            onPress={reportIssue}
          />
          
          <SettingItem
            icon="web"
            title={t('settings.website')}
            subtitle="hojan.org"
            onPress={openWebsite}
          />
        </View>

        {/* App Info Section */}
        <SectionHeader title={t('settings.appInfo')} icon="info" />
        <View style={styles.section}>
          <SettingItem
            icon="info"
            title={t('settings.version')}
            subtitle={appVersion}
            showArrow={false}
          />
          
          <SettingItem
            icon="build"
            title={t('settings.buildNumber')}
            subtitle={buildNumber}
            showArrow={false}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Hojan Science Forum
          </Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for Kurdish Scientists
          </Text>
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
  content: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B4332',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B4332',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#BBB',
    fontStyle: 'italic',
  },
});

export default SettingsScreen;