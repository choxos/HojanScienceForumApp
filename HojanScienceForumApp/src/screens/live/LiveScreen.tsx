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

const LiveScreen: React.FC = () => {
  const isGuest = useSelector((state: RootState) => state.auth.isGuest);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live Stream Section */}
        <View style={styles.liveStreamCard}>
          <View style={styles.videoPlaceholder}>
            <Icon name="play-circle-filled" size={80} color="#FFFFFF" />
            <Text style={styles.videoText}>Live Stream</Text>
          </View>
          <View style={styles.liveControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="fullscreen" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <Icon name="volume-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveLabel}>LIVE • 1.2K viewers</Text>
          </View>
        </View>

        {/* Session Info */}
        <View style={styles.sessionCard}>
          <Text style={styles.sessionTitle}>Keynote: The Future of Kurdish Science</Text>
          <Text style={styles.sessionSpeaker}>Dr. Hawkar Ahmed</Text>
          <Text style={styles.sessionTime}>Started 15 minutes ago • Ends at 11:15 AM</Text>
          
          <View style={styles.actionButtons}>
            {isGuest ? (
              <View style={styles.guestMessage}>
                <Text style={styles.guestMessageText}>
                  Sign in to join chat and ask questions during live sessions
                </Text>
              </View>
            ) : (
              <>
                <TouchableOpacity style={styles.primaryButton}>
                  <Icon name="chat" size={18} color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}>Join Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Icon name="help" size={18} color="#1976D2" />
                  <Text style={styles.secondaryButtonText}>Ask Question</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Live Chat */}
        {!isGuest && (
          <View style={styles.chatCard}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>Live Chat</Text>
              <Text style={styles.chatCount}>127 participants</Text>
            </View>
            
            <View style={styles.chatMessages}>
              <View style={styles.chatMessage}>
                <Text style={styles.chatUser}>Sarah K.</Text>
                <Text style={styles.chatText}>Great insights on AI research!</Text>
              </View>
              <View style={styles.chatMessage}>
                <Text style={styles.chatUser}>Ahmed M.</Text>
                <Text style={styles.chatText}>When will the slides be available?</Text>
              </View>
              <View style={styles.chatMessage}>
                <Text style={styles.chatUser}>Dr. Zhyan</Text>
                <Text style={styles.chatText}>Fascinating work on language processing</Text>
              </View>
            </View>

            <View style={styles.chatInput}>
              <TouchableOpacity style={styles.chatSendButton}>
                <Icon name="send" size={20} color="#1976D2" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Upcoming Sessions */}
        <View style={styles.upcomingCard}>
          <Text style={styles.upcomingTitle}>Coming Up Next</Text>
          <View style={styles.upcomingSession}>
            <View style={styles.upcomingTime}>
              <Text style={styles.upcomingTimeText}>11:30</Text>
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingSessionTitle}>Panel: Women in Kurdish Science</Text>
              <Text style={styles.upcomingLocation}>Room 205</Text>
            </View>
            <TouchableOpacity style={styles.notifyButton}>
              <Icon name="notifications" size={16} color="#757575" />
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
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
  },
  liveStreamCard: {
    backgroundColor: '#000000',
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
  liveControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  liveIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4444',
    marginRight: 6,
  },
  liveLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    padding: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  sessionSpeaker: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '500',
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    flex: 1,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    flex: 1,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  chatCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  chatCount: {
    fontSize: 12,
    color: '#757575',
  },
  chatMessages: {
    padding: 20,
    maxHeight: 200,
  },
  chatMessage: {
    marginBottom: 12,
  },
  chatUser: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
    marginBottom: 2,
  },
  chatText: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  chatSendButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    padding: 8,
    marginLeft: 'auto',
  },
  upcomingCard: {
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
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  upcomingSession: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingTime: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  upcomingTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  upcomingInfo: {
    flex: 1,
    marginLeft: 16,
  },
  upcomingSessionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  upcomingLocation: {
    fontSize: 12,
    color: '#757575',
  },
  notifyButton: {
    padding: 8,
  },
  guestMessage: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  guestMessageText: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LiveScreen;
