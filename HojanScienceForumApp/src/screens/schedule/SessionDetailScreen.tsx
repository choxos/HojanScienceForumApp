import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState, ProgramStackParamList } from '../../types';
import { addToAgenda, removeFromAgenda } from '../../store/slices/sessionsSlice';
import notifee, { TimestampTrigger, TriggerType } from '../../services/notifee';
import i18n from 'i18next';
import programData from '../../data/programData.json';

type SessionDetailRouteProp = RouteProp<ProgramStackParamList, 'SessionDetail'>;
type SessionDetailNavigationProp = StackNavigationProp<ProgramStackParamList, 'SessionDetail'>;

type JsonSession = {
  id: string;
  time: string;
  title: Record<string, string> | string;
  theme?: Record<string, string> | string;
  type: string;
  color?: string;
  speaker?: string;
  speakers?: Array<{
    code: string;
    name: string;
    title: string;
    style: string;
  }>;
  posters?: Array<{
    code: string;
    name: string;
    title: string;
  }>;
  description?: Record<string, string> | string;
};

type JsonDay = {
  day: number;
  date: string;
  sessions: JsonSession[];
};

const SessionDetailScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SessionDetailNavigationProp>();
  const route = useRoute<SessionDetailRouteProp>();
  const userAgenda = useSelector((s: RootState) => s.sessions.userAgenda);
  const notificationsEnabled = useSelector((s: RootState) => s.settings.notificationsEnabled);
  
  const { sessionId, dayDate } = route.params;
  const lang = i18n.language || 'en';

  const sessionData = useMemo(() => {
    const days = (programData.conference.days as JsonDay[]) || [];
    for (const day of days) {
      const session = day.sessions.find(s => s.id === sessionId);
      if (session) {
        return { day, session };
      }
    }
    return null;
  }, [sessionId]);

  const translate = (val?: Record<string, string> | string): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return (
      (val as any)[lang] || (val as any)['en'] || Object.values(val)[0] || ''
    );
  };

  const parseStartEnd = (dateStr: string, timeRange: string): { start: Date; end?: Date } => {
    // Ottawa EDT (UTC-4) in August
    const [startStrRaw, endStrRaw] = timeRange.split('-').map(s => s.trim());
    const [monthName, dayWithComma, year] = dateStr.replace(/\s+/g, ' ').trim().split(' ');
    const day = parseInt(dayWithComma.replace(',', ''), 10);
    const monthIndex = [
      'January','February','March','April','May','June','July','August','September','October','November','December',
    ].indexOf(monthName);
    const pad = (n: number) => String(n).padStart(2, '0');
    const isoDate = `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
    const start = new Date(`${isoDate}T${startStrRaw}:00-04:00`);
    const end = endStrRaw ? new Date(`${isoDate}T${endStrRaw}:00-04:00`) : undefined;
    return { start, end };
  };

  const onToggleAgenda = async () => {
    if (!sessionData) return;
    
    const { day, session } = sessionData;
    const inAgenda = userAgenda.includes(session.id);
    
    if (inAgenda) {
      dispatch(removeFromAgenda(session.id));
      if (notificationsEnabled) {
        await notifee.cancelNotification(session.id).catch(() => {});
        await notifee.cancelNotification(`${session.id}-pre`).catch(() => {});
      }
      return;
    }

    dispatch(addToAgenda(session.id));

    const { start } = parseStartEnd(day.date, session.time);
    const now = Date.now();
    
    if (notificationsEnabled && start.getTime() > now) {
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: start.getTime(),
      };
      await notifee.createTriggerNotification(
        {
          id: session.id,
          title: translate({ en: 'Session Starting', fr: 'Session Commençante', 'ku-sorani': 'دانیشتن دەستپێدەکات', 'ku-kurmanji': 'Danûstendin Dest Pê Dike' }),
          body: `${translate(session.title)} • ${session.time}`,
        },
        trigger
      );

      const fifteenMin = start.getTime() - 15 * 60 * 1000;
      if (fifteenMin > now) {
        const preTrigger: TimestampTrigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: fifteenMin,
        };
        await notifee.createTriggerNotification(
          {
            id: `${session.id}-pre`,
            title: translate({ en: 'Reminder', fr: 'Rappel', 'ku-sorani': 'بیرخستنەوە', 'ku-kurmanji': 'Bîrxistin' }),
            body: `${translate(session.title)} • ${translate({ en: 'starts in 15 minutes', fr: 'commence dans 15 minutes', 'ku-sorani': 'لە ١٥ خولەکدا دەستپێدەکات', 'ku-kurmanji': 'di 15 deqeyan de dest pê dike' })}`,
          },
          preTrigger
        );
      }
    }
  };

  if (!sessionData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#1B4332" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Session Details</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Session not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { day, session } = sessionData;
  const inAgenda = userAgenda.includes(session.id);
  const sessionType = translate(programData.sessionTypes?.[session.type] as any) || session.type;
  const sessionColor = session.color || (programData.sessionTypes as any)?.[session.type]?.color || '#E3F2FD';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#1B4332" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {translate({ en: 'Session Details', fr: 'Détails de la Session', 'ku-sorani': 'وردەکارییەکانی دانیشتن', 'ku-kurmanji': 'Hûrguliyên Danûstendinê' })}
        </Text>
        <TouchableOpacity style={styles.favoriteButton} onPress={onToggleAgenda}>
          <Icon name={inAgenda ? 'bookmark' : 'bookmark-border'} size={24} color={inAgenda ? '#1976D2' : '#D4AF37'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Session Type and Time */}
        <View style={[styles.typeCard, { backgroundColor: sessionColor }]}>
          <Text style={styles.sessionType}>{sessionType}</Text>
          <Text style={styles.sessionTime}>{session.time}</Text>
          <Text style={styles.sessionDate}>{day.date}</Text>
        </View>

        {/* Session Title */}
        <View style={styles.card}>
          <Text style={styles.sessionTitle}>{translate(session.title)}</Text>
          {session.theme && (
            <View style={styles.themeContainer}>
              <Icon name="category" size={16} color="#D4AF37" />
              <Text style={styles.themeText}>{translate(session.theme)}</Text>
            </View>
          )}
        </View>

        {/* Single Speaker (for keynotes, etc.) */}
        {session.speaker && (
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="person" size={20} color="#1B4332" />
              <Text style={styles.sectionTitle}>
                {translate({ en: 'Speaker', fr: 'Conférencier', 'ku-sorani': 'قسەکەر', 'ku-kurmanji': 'Axêver' })}
              </Text>
            </View>
            <Text style={styles.speakerName}>{session.speaker}</Text>
          </View>
        )}

        {/* Multiple Speakers (for presentations) */}
        {session.speakers && session.speakers.length > 0 && (
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="group" size={20} color="#1B4332" />
              <Text style={styles.sectionTitle}>
                {translate({ 
                  en: session.speakers.length === 1 ? 'Speaker' : 'Speakers', 
                  fr: session.speakers.length === 1 ? 'Conférencier' : 'Conférenciers', 
                  'ku-sorani': session.speakers.length === 1 ? 'قسەکەر' : 'قسەکەرەکان', 
                  'ku-kurmanji': session.speakers.length === 1 ? 'Axêver' : 'Axêver' 
                })}
              </Text>
            </View>
            {session.speakers.map((speaker, index) => (
              <View key={speaker.code} style={styles.speakerCard}>
                <View style={styles.speakerHeader}>
                  <Text style={styles.speakerCode}>{speaker.code}</Text>
                  <Text style={styles.presentationStyle}>{speaker.style}</Text>
                </View>
                <Text style={styles.speakerName}>{speaker.name}</Text>
                <Text style={styles.presentationTitle}>{speaker.title}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Posters (for poster sessions) */}
        {session.posters && session.posters.length > 0 && (
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="campaign" size={20} color="#1B4332" />
              <Text style={styles.sectionTitle}>
                {translate({ en: 'Posters', fr: 'Affiches', 'ku-sorani': 'پۆستەرەکان', 'ku-kurmanji': 'Poster' })}
              </Text>
            </View>
            {session.posters.map((poster, index) => (
              <View key={poster.code} style={styles.posterCard}>
                <Text style={styles.posterCode}>{poster.code}</Text>
                <Text style={styles.posterAuthor}>{poster.name}</Text>
                <Text style={styles.posterTitle}>{poster.title}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Description */}
        {session.description && (
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Icon name="description" size={20} color="#1B4332" />
              <Text style={styles.sectionTitle}>
                {translate({ en: 'Description', fr: 'Description', 'ku-sorani': 'شرۆڤەکردن', 'ku-kurmanji': 'Şîrove' })}
              </Text>
            </View>
            <Text style={styles.descriptionText}>{translate(session.description)}</Text>
          </View>
        )}

        {/* Add to Schedule Button */}
        <TouchableOpacity 
          style={[styles.scheduleButton, inAgenda ? styles.scheduleButtonActive : styles.scheduleButtonInactive]} 
          onPress={onToggleAgenda}
        >
          <Icon 
            name={inAgenda ? 'bookmark' : 'bookmark-border'} 
            size={20} 
            color={inAgenda ? '#FFFFFF' : '#1976D2'} 
          />
          <Text style={[styles.scheduleButtonText, { color: inAgenda ? '#FFFFFF' : '#1976D2' }]}>
            {translate(inAgenda 
              ? { en: 'Remove from Schedule', fr: 'Retirer du Planning', 'ku-sorani': 'لابردن لە پرۆگرام', 'ku-kurmanji': 'Ji Bernameyê Rake' }
              : { en: 'Add to Schedule', fr: 'Ajouter au Planning', 'ku-sorani': 'زیادکردن بۆ پرۆگرام', 'ku-kurmanji': 'Li Bernameyê Zêde bike' }
            )}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
  },
  favoriteButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  typeCard: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  sessionType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B4332',
    marginBottom: 8,
  },
  sessionTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sessionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B4332',
    lineHeight: 28,
    marginBottom: 12,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  themeText: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B4332',
    marginLeft: 8,
  },
  speakerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B4332',
    marginBottom: 8,
  },
  speakerCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  speakerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  speakerCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D4AF37',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  presentationStyle: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  presentationTitle: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  posterCard: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  posterCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  posterAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B4332',
    marginBottom: 4,
  },
  posterTitle: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  scheduleButtonActive: {
    backgroundColor: '#1976D2',
  },
  scheduleButtonInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1976D2',
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 32,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SessionDetailScreen;
