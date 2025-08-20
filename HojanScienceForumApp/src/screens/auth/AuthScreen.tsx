import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setGuestUser } from '../../store/slices/authSlice';
import { LanguageCode } from '../../types';

const AuthScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');

  const handleGuestLogin = () => {
    dispatch(setGuestUser({ preferredLanguage: selectedLanguage }));
  };

  const handleLanguageSelect = (language: LanguageCode) => {
    setSelectedLanguage(language);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🔬</Text>
          <Text style={styles.title}>Hojan Science Forum</Text>
          <Text style={styles.subtitle}>1st Kurdish Science Conference</Text>
          <Text style={styles.date}>August 25-28, 2025 • University of Ottawa</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.languageContainer}>
          <Text style={styles.languageLabel}>Language:</Text>
          <View style={styles.languageButtons}>
            <TouchableOpacity 
              style={[
                styles.languageButton, 
                selectedLanguage === 'en' && styles.languageButtonSelected
              ]}
              onPress={() => handleLanguageSelect('en')}
            >
              <Text style={[
                styles.languageButtonText,
                selectedLanguage === 'en' && styles.languageButtonTextSelected
              ]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.languageButton, 
                selectedLanguage === 'fr' && styles.languageButtonSelected
              ]}
              onPress={() => handleLanguageSelect('fr')}
            >
              <Text style={[
                styles.languageButtonText,
                selectedLanguage === 'fr' && styles.languageButtonTextSelected
              ]}>Français</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.languageButton, 
                selectedLanguage === 'ku-sorani' && styles.languageButtonSelected
              ]}
              onPress={() => handleLanguageSelect('ku-sorani')}
            >
              <Text style={[
                styles.languageButtonText,
                selectedLanguage === 'ku-sorani' && styles.languageButtonTextSelected
              ]}>کوردی</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.languageButton, 
                selectedLanguage === 'ku-kurmanji' && styles.languageButtonSelected
              ]}
              onPress={() => handleLanguageSelect('ku-kurmanji')}
            >
              <Text style={[
                styles.languageButtonText,
                selectedLanguage === 'ku-kurmanji' && styles.languageButtonTextSelected
              ]}>Kurdî</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.guestInfo}>
          <Text style={styles.guestInfoText}>
            As a guest, you can view the conference program and speakers, but chat and networking features will be limited.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#E3F2FD',
    textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  guestButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  languageContainer: {
    alignItems: 'center',
  },
  languageLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  languageButtonSelected: {
    backgroundColor: '#FFFFFF',
  },
  languageButtonTextSelected: {
    color: '#1976D2',
    fontWeight: '600',
  },
  guestInfo: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  guestInfoText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

export default AuthScreen;
