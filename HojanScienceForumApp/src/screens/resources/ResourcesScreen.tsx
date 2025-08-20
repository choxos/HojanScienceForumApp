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

const ResourcesScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Icon name="download" size={24} color="#212121" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScrollView}>
            <TouchableOpacity style={[styles.categoryChip, styles.categoryChipActive]}>
              <Text style={[styles.categoryChipText, styles.categoryChipTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>Presentations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>Papers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>Videos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryChip}>
              <Text style={styles.categoryChipText}>Tools</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Featured Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Resources</Text>
          
          <View style={styles.resourceCard}>
            <View style={styles.resourceIcon}>
              <Icon name="slideshow" size={24} color="#1976D2" />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>AI in Kurdish Language Processing</Text>
              <Text style={styles.resourceSubtitle}>Dr. Hawkar Ahmed • Keynote Slides</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceSize}>2.4 MB</Text>
                <Text style={styles.resourceType}>PDF</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.downloadIconButton}>
              <Icon name="file-download" size={20} color="#757575" />
            </TouchableOpacity>
          </View>

          <View style={styles.resourceCard}>
            <View style={styles.resourceIcon}>
              <Icon name="video-library" size={24} color="#FF9800" />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Biotechnology Research Methods</Text>
              <Text style={styles.resourceSubtitle}>Dr. Saman Mahmood • Workshop Recording</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceSize}>45 min</Text>
                <Text style={styles.resourceType}>Video</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.downloadIconButton}>
              <Icon name="play-arrow" size={20} color="#757575" />
            </TouchableOpacity>
          </View>

          <View style={styles.resourceCard}>
            <View style={styles.resourceIcon}>
              <Icon name="article" size={24} color="#4CAF50" />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>Climate Change Research Paper</Text>
              <Text style={styles.resourceSubtitle}>Dr. Zhyan Kareem • Research Publication</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceSize}>1.8 MB</Text>
                <Text style={styles.resourceType}>PDF</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.downloadIconButton}>
              <Icon name="file-download" size={20} color="#757575" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Kurdish Language Tech */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kurdish Language Technology</Text>
          
          <TouchableOpacity style={styles.toolCard}>
            <View style={styles.toolHeader}>
              <View style={styles.toolIcon}>
                <Icon name="code" size={20} color="#673AB7" />
              </View>
              <Text style={styles.toolTitle}>Kurdish NLP Toolkit</Text>
            </View>
            <Text style={styles.toolDescription}>
              Open-source natural language processing tools for Kurdish language analysis and processing.
            </Text>
            <View style={styles.toolFooter}>
              <View style={styles.toolTags}>
                <Text style={styles.toolTag}>Python</Text>
                <Text style={styles.toolTag}>NLP</Text>
              </View>
              <Icon name="open-in-new" size={16} color="#1976D2" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolCard}>
            <View style={styles.toolHeader}>
              <View style={styles.toolIcon}>
                <Icon name="translate" size={20} color="#E91E63" />
              </View>
              <Text style={styles.toolTitle}>Kurdish Dictionary API</Text>
            </View>
            <Text style={styles.toolDescription}>
              RESTful API for Kurdish-English translations and language resources.
            </Text>
            <View style={styles.toolFooter}>
              <View style={styles.toolTags}>
                <Text style={styles.toolTag}>API</Text>
                <Text style={styles.toolTag}>Translation</Text>
              </View>
              <Icon name="open-in-new" size={16} color="#1976D2" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Career Development */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Development</Text>
          
          <View style={styles.careerCard}>
            <View style={styles.careerContent}>
              <Text style={styles.careerTitle}>Young Researcher Guide</Text>
              <Text style={styles.careerSubtitle}>Essential resources for early-career Kurdish scientists</Text>
            </View>
            <Icon name="school" size={24} color="#1976D2" />
          </View>

          <View style={styles.careerCard}>
            <View style={styles.careerContent}>
              <Text style={styles.careerTitle}>Funding Opportunities</Text>
              <Text style={styles.careerSubtitle}>Scholarships and grants for Kurdish researchers</Text>
            </View>
            <Icon name="attach-money" size={24} color="#4CAF50" />
          </View>

          <View style={styles.careerCard}>
            <View style={styles.careerContent}>
              <Text style={styles.careerTitle}>Academic Pathway Guide</Text>
              <Text style={styles.careerSubtitle}>Navigate your academic and research career</Text>
            </View>
            <Icon name="trending-up" size={24} color="#FF9800" />
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
  downloadButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  categoriesSection: {
    paddingVertical: 16,
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#1976D2',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceContent: {
    flex: 1,
    marginLeft: 16,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  resourceSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  resourceMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  resourceSize: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  resourceType: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  downloadIconButton: {
    padding: 8,
  },
  toolCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  toolDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 16,
  },
  toolFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolTags: {
    flexDirection: 'row',
    gap: 8,
  },
  toolTag: {
    fontSize: 10,
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
  careerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  careerContent: {
    flex: 1,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  careerSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
});

export default ResourcesScreen;
