import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const SpeakersScreen: React.FC = () => {
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Speakers</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#1B4332" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.speakerCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>HA</Text>
          </View>
          <View style={styles.speakerInfo}>
            <Text style={styles.speakerName}>Dr. Hawkar Ahmed</Text>
            <Text style={styles.speakerTitle}>Professor of Computer Science</Text>
            <Text style={styles.affiliation}>University of Kurdistan</Text>
            <View style={styles.expertiseContainer}>
              <Text style={styles.expertiseTag}>AI</Text>
              <Text style={styles.expertiseTag}>Machine Learning</Text>
            </View>
          </View>
          {!isGuest ? (
            <TouchableOpacity style={styles.connectButton}>
              <Icon name="person-add" size={20} color="#1B4332" />
            </TouchableOpacity>
          ) : (
            <View style={styles.guestIndicator}>
              <Icon name="visibility" size={20} color="#757575" />
            </View>
          )}
        </View>

        <View style={styles.speakerCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
          <View style={styles.speakerInfo}>
            <Text style={styles.speakerName}>Dr. Saman Mahmood</Text>
            <Text style={styles.speakerTitle}>Research Scientist</Text>
            <Text style={styles.affiliation}>MIT</Text>
            <View style={styles.expertiseContainer}>
              <Text style={styles.expertiseTag}>Biotechnology</Text>
              <Text style={styles.expertiseTag}>Genetics</Text>
            </View>
          </View>
          {!isGuest ? (
            <TouchableOpacity style={styles.connectButton}>
              <Icon name="person-add" size={20} color="#1B4332" />
            </TouchableOpacity>
          ) : (
            <View style={styles.guestIndicator}>
              <Icon name="visibility" size={20} color="#757575" />
            </View>
          )}
        </View>

        <View style={styles.speakerCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>ZK</Text>
          </View>
          <View style={styles.speakerInfo}>
            <Text style={styles.speakerName}>Dr. Zhyan Kareem</Text>
            <Text style={styles.speakerTitle}>Environmental Engineer</Text>
            <Text style={styles.affiliation}>University of Toronto</Text>
            <View style={styles.expertiseContainer}>
              <Text style={styles.expertiseTag}>Climate Change</Text>
              <Text style={styles.expertiseTag}>Sustainability</Text>
            </View>
          </View>
          {!isGuest ? (
            <TouchableOpacity style={styles.connectButton}>
              <Icon name="person-add-outlined" size={20} color="#D4AF37" />
            </TouchableOpacity>
          ) : (
            <View style={styles.guestIndicator}>
              <Icon name="visibility" size={20} color="#757575" />
            </View>
          )}
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Browse by Field</Text>
          <View style={styles.categoryGrid}>
            <TouchableOpacity style={styles.categoryItem}>
              <Icon name="computer" size={32} color="#1B4332" />
              <Text style={styles.categoryText}>Computer Science</Text>
              <Text style={styles.categoryCount}>12 speakers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Icon name="science" size={32} color="#1B4332" />
              <Text style={styles.categoryText}>Biotechnology</Text>
              <Text style={styles.categoryCount}>8 speakers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Icon name="eco" size={32} color="#1B4332" />
              <Text style={styles.categoryText}>Environment</Text>
              <Text style={styles.categoryCount}>6 speakers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem}>
              <Icon name="healing" size={32} color="#1B4332" />
              <Text style={styles.categoryText}>Medicine</Text>
              <Text style={styles.categoryCount}>10 speakers</Text>
            </TouchableOpacity>
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
  searchButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  speakerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
  },
  speakerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  speakerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 4,
  },
  speakerTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  affiliation: {
    fontSize: 14,
    color: '#1B4332',
    fontWeight: '500',
    marginBottom: 8,
  },
  expertiseContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  expertiseTag: {
    fontSize: 10,
    backgroundColor: '#E8F5E8',
    color: '#2E7D32',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  connectButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  categorySection: {
    marginTop: 24,
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    color: '#1B4332',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  guestIndicator: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
});

export default SpeakersScreen;
