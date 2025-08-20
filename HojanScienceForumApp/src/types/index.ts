// User and Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  researchInterests: string[];
  biography: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    orcid?: string;
  };
  profileImage?: string;
  userType: 'attendee' | 'speaker' | 'organizer' | 'guest';
  preferredLanguage: 'en' | 'fr' | 'ku-sorani' | 'ku-kurmanji';
  isGuest?: boolean;
}

// Session and Event Types
export interface Session {
  id: string;
  title: {
    en: string;
    'ku-sorani': string;
    'ku-kurmanji': string;
  };
  description: {
    en: string;
    'ku-sorani': string;
    'ku-kurmanji': string;
  };
  startTime: Date;
  endTime: Date;
  type: 'keynote' | 'ted-talk' | 'panel' | 'workshop' | 'poster' | 'networking';
  location: string;
  speakers: Speaker[];
  tags: string[];
  isLive: boolean;
  recordingUrl?: string;
  materials: Resource[];
}

// Speaker Types
export interface Speaker {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  biography: {
    en: string;
    'ku-sorani': string;
    'ku-kurmanji': string;
  };
  expertise: string[];
  profileImage: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    orcid?: string;
  };
  sessions: string[];
}

// Presentation Types
export interface Presentation {
  id: string;
  title: string;
  abstract: string;
  presenterId: string;
  sessionId: string;
  slides?: string;
  video?: string;
  resources: Resource[];
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'image';
  url: string;
  downloadUrl?: string;
  size?: number;
  tags: string[];
}

// Social Features Types
export interface Comment {
  id: string;
  userId: string;
  sessionId: string;
  content: string;
  timestamp: Date;
  likes: string[];
  replies: Comment[];
  language: string;
}

export interface NetworkingRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: Date;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Program: undefined;
  MySchedule: undefined;
  Settings: undefined;
};

export type ProgramStackParamList = {
  ProgramList: undefined;
  SessionDetail: { 
    sessionId: string;
    dayDate: string;
  };
};

// Socket.io Event Types
export const SocketEvents = {
  JOIN_SESSION: 'join_session',
  LEAVE_SESSION: 'leave_session',
  NEW_COMMENT: 'new_comment',
  LIVE_POLL: 'live_poll',
  Q_A_QUESTION: 'qa_question',
  NOTIFICATION: 'notification',
  NETWORKING_REQUEST: 'networking_request',
} as const;

export type SocketEventType = typeof SocketEvents[keyof typeof SocketEvents];

// Language Types
export type LanguageCode = 'en' | 'fr' | 'ku-sorani' | 'ku-kurmanji';

export interface TranslatedText {
  en: string;
  fr: string;
  'ku-sorani': string;
  'ku-kurmanji': string;
}

// Redux State Types
export interface RootState {
  auth: AuthState;
  sessions: SessionsState;
  speakers: SpeakersState;
  user: UserState;
  notifications: NotificationState;
  settings: SettingsState;
}

export interface SettingsState {
  theme: 'system' | 'light' | 'dark';
  language: LanguageCode;
  notificationsEnabled: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  loading: boolean;
  error: string | null;
}

export interface SessionsState {
  sessions: Session[];
  currentSession: Session | null;
  userAgenda: string[];
  loading: boolean;
  error: string | null;
}

export interface SpeakersState {
  speakers: Speaker[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  profile: UserProfile | null;
  connections: string[];
  networkingRequests: NetworkingRequest[];
  loading: boolean;
  error: string | null;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'session_reminder' | 'networking' | 'announcement' | 'live_session';
  timestamp: Date;
  read: boolean;
  data?: any;
}
