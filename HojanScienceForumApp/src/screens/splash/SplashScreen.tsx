import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenNavigationProp = StackNavigationProp<any>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { width, height } = Dimensions.get('window');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Logo in the center */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/hojan-logo.png')}
            style={styles.logo}
            resizeMode="contain"
            onError={(error) => {
              console.log('Logo loading error:', error);
            }}
          />
        </View>
        
        {/* Text at the bottom */}
        <View style={styles.bottomContainer}>
          <Text style={styles.mainTitle}>Hojan Science Forum 2025</Text>
          <Text style={styles.university}>University of Ottawa</Text>
          <Text style={styles.location}>Ottawa, Ontario, Canada</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '60%',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  bottomContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1B4332',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
    }),
  },
  university: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2D5A87',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.3,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
    }),
  },
  location: {
    fontSize: 17,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    letterSpacing: 0.2,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
    }),
  },
});

export default SplashScreen;
