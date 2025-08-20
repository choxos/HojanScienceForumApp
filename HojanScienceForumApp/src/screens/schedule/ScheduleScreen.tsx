import React, { useMemo, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState, ProgramStackParamList } from '../../types';
import { addToAgenda, removeFromAgenda } from '../../store/slices/sessionsSlice';
import notifee, { TimestampTrigger, TriggerType } from '../../services/notifee';
import i18n from 'i18next';
// Local program data (already generated from CSV)
import programData from '../../data/programData.json';

type ScheduleScreenNavigationProp = StackNavigationProp<ProgramStackParamList, 'ProgramList'>;

type JsonSession = {
  id: string;
  time: string; // e.g., "09:00 - 09:45"
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
  date: string; // e.g., "August 25, 2024"
  sessions: JsonSession[];
};

// Day component for rendering each tab's content
const DaySchedule: React.FC<{
  day: JsonDay;
  isPast: boolean;
  navigation: ScheduleScreenNavigationProp;
  dispatch: any;
  userAgenda: string[];
  translate: (val?: Record<string, string> | string) => string;
  parseStartEnd: (dateStr: string, timeRange: string) => { start: Date; end?: Date };
  onNavigateToDetail: (day: JsonDay, session: JsonSession) => void;
  onToggleAgenda: (day: JsonDay, session: JsonSession) => void;
}> = ({ day, isPast, navigation, dispatch, userAgenda, translate, parseStartEnd, onNavigateToDetail, onToggleAgenda }) => {
  return (
    <ScrollView style={[styles.dayContent, isPast && styles.pastDayContent]} showsVerticalScrollIndicator={false}>
      <View style={styles.dayHeader}>
        <View style={[styles.dayHeaderContent, isPast && styles.pastDayHeader]}>
          <Text style={[styles.dayTitle, isPast && styles.pastDayTitle]}>
            {translate({ en: 'Day', fr: 'Jour', 'ku-sorani': 'ڕۆژ', 'ku-kurmanji': 'Roj' })} {day.day}
          </Text>
          <Text style={[styles.dayDate, isPast && styles.pastDayDate]}>{day.date}</Text>
          <Text style={[styles.timeZoneNote, isPast && styles.pastTimeZone]}>
            {translate({ 
              en: 'All times in EST (Ottawa time)', 
              fr: 'Toutes les heures en EST (heure d\'Ottawa)', 
              'ku-sorani': 'هەموو کاتەکان بە کاتی ئۆتاوا', 
              'ku-kurmanji': 'Hemû dem bi saeta Ottawa' 
            })}
          </Text>
          {isPast && (
            <View style={styles.pastBadge}>
              <Icon name="history" size={16} color="#999" />
              <Text style={styles.pastBadgeText}>
                {translate({ 
                  en: 'Past Event', 
                  fr: 'Événement Passé', 
                  'ku-sorani': 'ڕووداوی ڕابردوو', 
                  'ku-kurmanji': 'Bûyera Borî' 
                })}
              </Text>
            </View>
          )}
        </View>
      </View>

      {day.sessions.map(session => {
        const inAgenda = userAgenda.includes(session.id);
        const { start, end } = parseStartEnd(day.date, session.time);
        const startTimeFmt = isNaN(start.getTime()) ? session.time.split('-')[0].trim() : start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        const endTimeFmt = end && !isNaN(end.getTime()) ? end.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '';

        return (
          <TouchableOpacity 
            key={session.id} 
            style={[styles.sessionCard, isPast && styles.pastSessionCard]}
            onPress={() => onNavigateToDetail(day, session)}
            activeOpacity={0.7}
          >
            <View style={styles.timeSection}>
              <Text style={[styles.timeText, isPast && styles.pastTimeText]}>{startTimeFmt}</Text>
              {!!endTimeFmt && <Text style={[styles.durationText, isPast && styles.pastDurationText]}>– {endTimeFmt}</Text>}
            </View>
            <View style={styles.sessionDetails}>
              <Text style={[styles.sessionType, isPast && styles.pastSessionType]}>
                {translate((programData as any).sessionTypes?.[session.type]) || session.type}
              </Text>
              <Text style={[styles.sessionTitle, isPast && styles.pastSessionTitle]}>{translate(session.title)}</Text>
              {!!session.speaker && <Text style={[styles.speakerName, isPast && styles.pastSpeakerName]}>{session.speaker}</Text>}
              {!!session.theme && <Text style={[styles.sessionLocation, isPast && styles.pastSessionLocation]}>{translate(session.theme)}</Text>}
              {session.speakers && session.speakers.length > 0 && (
                <>
                  <Text style={[styles.speakersCount, isPast && styles.pastSpeakersCount]}>
                    {session.speakers.length} {translate({ 
                      en: session.speakers.length === 1 ? 'speaker' : 'speakers', 
                      fr: session.speakers.length === 1 ? 'conférencier' : 'conférenciers', 
                      'ku-sorani': session.speakers.length === 1 ? 'قسەکەر' : 'قسەکەر', 
                      'ku-kurmanji': 'axêver' 
                    })}
                  </Text>
                  <View style={styles.presentationList}>
                    {session.speakers.map((sp) => (
                      <View key={`${session.id}-${sp.code}`} style={styles.presentationItem}>
                        <Icon name="chevron-right" size={16} color={isPast ? '#999' : '#1976D2'} />
                        <Text style={[styles.presentationTitle, isPast && styles.pastPresentationTitle]}>
                          {sp.title}
                        </Text>
                        <TouchableOpacity
                          onPress={(e) => {
                            e.stopPropagation();
                            onToggleAgenda(day, session);
                          }}
                          style={styles.presentationBookmark}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Icon 
                            name={inAgenda ? 'bookmark' : 'bookmark-border'} 
                            size={18} 
                            color={isPast ? '#999' : (inAgenda ? '#1976D2' : '#D4AF37')} 
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </>
              )}
              {session.posters && session.posters.length > 0 && (
                <Text style={[styles.postersCount, isPast && styles.pastPostersCount]}>
                  {session.posters.length} {translate({ 
                    en: session.posters.length === 1 ? 'poster' : 'posters', 
                    fr: session.posters.length === 1 ? 'affiche' : 'affiches', 
                    'ku-sorani': session.posters.length === 1 ? 'پۆستەر' : 'پۆستەر', 
                    'ku-kurmanji': 'poster' 
                  })}
                </Text>
              )}
            </View>
            <TouchableOpacity 
              style={styles.favoriteButton} 
              onPress={(e) => {
                e.stopPropagation();
                onToggleAgenda(day, session);
              }}
            >
              <Icon 
                name={inAgenda ? 'bookmark' : 'bookmark-border'} 
                size={22} 
                color={isPast ? '#999' : (inAgenda ? '#1976D2' : '#D4AF37')} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const ScheduleScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ScheduleScreenNavigationProp>();
  const userAgenda = useSelector((s: RootState) => s.sessions.userAgenda);
  const notificationsEnabled = useSelector((s: RootState) => s.settings.notificationsEnabled);
  const language = useSelector((s: RootState) => s.settings.language);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  // Ask notification permission once
  useEffect(() => {
    if (notificationsEnabled) {
      (async () => {
        try {
          await notifee.requestPermission();
        } catch {}
      })();
    }
  }, [notificationsEnabled]);

  const lang = language || i18n.language || 'en';
  const days = (programData.conference.days as JsonDay[]) || [];

  // Check which days have passed (Ottawa time, August uses EDT UTC-4)
  const isPastDay = (dateStr: string): boolean => {
    try {
      // Parse the date string to get the conference date
      const [monthName, dayWithComma, year] = dateStr.replace(/\s+/g, ' ').trim().split(' ');
      const day = parseInt(dayWithComma.replace(',', ''), 10);
      const monthIndex = [
        'January','February','March','April','May','June','July','August','September','October','November','December',
      ].indexOf(monthName);
      
      // Create date object for the conference day at 11:59 PM EST
      const conferenceDate = new Date(parseInt(year), monthIndex, day, 23, 59, 59);
      
      // Get current time in EDT (UTC-4 in August)
      const now = new Date();
      const estOffset = -4; // EDT is UTC-4
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const nowEST = new Date(utc + (estOffset * 3600000));
      
      return nowEST > conferenceDate;
    } catch (error) {
      console.warn('Error parsing date:', dateStr, error);
      return false;
    }
  };

  const translate = (val?: Record<string, string> | string): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return (
      (val as any)[lang] || (val as any)['en'] || Object.values(val)[0] || ''
    );
  };

  const parseStartEnd = (dateStr: string, timeRange: string): { start: Date; end?: Date } => {
    // Ottawa in late August observes EDT (UTC-4). Use fixed offset so all devices align.
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

  const onNavigateToDetail = (day: JsonDay, session: JsonSession) => {
    navigation.navigate('SessionDetail', {
      sessionId: session.id,
      dayDate: day.date,
    });
  };

  const onToggleAgenda = async (day: JsonDay, session: JsonSession) => {
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
    // Start notification
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

      // 15 minutes before
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
    } else {
      Alert.alert('Invalid time');
    }
  };

  // Create routes for tabs
  const routes = days.map((day, index) => ({
    key: `day${day.day}`,
    title: `${translate({ en: 'Day', fr: 'Jour', 'ku-sorani': 'ڕۆژ', 'ku-kurmanji': 'Roj' })} ${day.day}`,
    isPast: isPastDay(day.date)
  }));

  // Create scene map
  const sceneMap = useMemo(() => {
    const scenes: Record<string, React.ComponentType<any>> = {};
    days.forEach((day) => {
      const isPast = isPastDay(day.date);
      scenes[`day${day.day}`] = () => (
        <DaySchedule
          day={day}
          isPast={isPast}
          navigation={navigation}
          dispatch={dispatch}
          userAgenda={userAgenda}
          translate={translate}
          parseStartEnd={parseStartEnd}
          onNavigateToDetail={onNavigateToDetail}
          onToggleAgenda={onToggleAgenda}
        />
      );
    });
    return SceneMap(scenes);
  }, [days, navigation, dispatch, userAgenda, translate, parseStartEnd, onNavigateToDetail, onToggleAgenda]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#1B4332"
      inactiveColor="#666"
      renderLabel={({ route, focused }: { route: any; focused: boolean }) => (
        <View style={styles.tabLabelContainer}>
          <Text style={[
            styles.tabLabel, 
            focused && styles.activeTabLabel,
            route.isPast && styles.pastTabLabel
          ]}>
            {route.title}
          </Text>
          {route.isPast && (
            <Icon name="history" size={12} color="#999" style={styles.pastIcon} />
          )}
        </View>
      )}
      tabStyle={styles.tab}
      scrollEnabled={true}
      contentContainerStyle={styles.tabBarContent}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {translate({ en: 'Conference Program', fr: 'Programme de la Conférence', 'ku-sorani': 'پرۆگرامی کۆنگرە', 'ku-kurmanji': 'Bernamea Kongreyê' })}
        </Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={sceneMap}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />
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
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarContent: {
    paddingHorizontal: 8,
  },
  tab: {
    paddingHorizontal: 12,
    minWidth: 'auto',
  },
  tabIndicator: {
    backgroundColor: '#1B4332',
    height: 3,
    borderRadius: 1.5,
  },
  tabLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#1B4332',
    fontWeight: '700',
  },
  pastTabLabel: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  pastIcon: {
    marginLeft: 4,
  },
  dayContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  pastDayContent: {
    backgroundColor: '#F5F5F5',
  },
  dayHeader: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  dayHeaderContent: {
    padding: 16,
  },
  pastDayHeader: {
    backgroundColor: '#F8F8F8',
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 4,
  },
  pastDayTitle: {
    color: '#999',
  },
  dayDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  pastDayDate: {
    color: '#999',
  },
  timeZoneNote: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  pastTimeZone: {
    color: '#bbb',
  },
  pastBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  pastBadgeText: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginLeft: 4,
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pastSessionCard: {
    backgroundColor: '#F8F8F8',
    opacity: 0.8,
  },
  timeSection: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  pastTimeText: {
    color: '#999',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  pastDurationText: {
    color: '#bbb',
  },
  sessionDetails: {
    flex: 1,
    marginLeft: 16,
  },
  sessionType: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginBottom: 4,
  },
  pastSessionType: {
    color: '#999',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B4332',
    marginBottom: 8,
  },
  pastSessionTitle: {
    color: '#999',
  },
  sessionLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pastSessionLocation: {
    color: '#bbb',
  },
  speakerName: {
    fontSize: 14,
    color: '#1B4332',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  pastSpeakerName: {
    color: '#999',
  },
  speakersCount: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
    marginBottom: 4,
  },
  pastSpeakersCount: {
    color: '#999',
  },
  postersCount: {
    fontSize: 12,
    color: '#9C27B0',
    fontWeight: '600',
    marginBottom: 4,
  },
  pastPostersCount: {
    color: '#999',
  },
  favoriteButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  presentationList: {
    marginTop: 4,
    gap: 6,
  },
  presentationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  presentationTitle: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  presentationBookmark: {
    paddingHorizontal: 4,
  },
  pastPresentationTitle: {
    color: '#999',
  },
  bottomSpacing: {
    height: 32,
  },
});

export default ScheduleScreen;