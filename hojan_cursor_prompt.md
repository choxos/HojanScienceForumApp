# Hojan Science Forum Mobile App Development Prompt

## Project Overview
Create cross-platform mobile applications (iOS and Android) for the **1st Hojan Science Forum** (August 25-28, 2025, University of Ottawa). This is a Kurdish science conference focused on diversity, equity, inclusion, and networking among Kurdish scientists worldwide.

## Technology Stack Requirements
- **Framework**: React Native with TypeScript for cross-platform development
- **Navigation**: React Navigation v6
- **State Management**: Redux Toolkit + RTK Query for API calls
- **UI Components**: React Native Elements or NativeBase
- **Real-time Features**: Socket.io for live chat and notifications
- **Offline Support**: Redux Persist + AsyncStorage
- **Push Notifications**: React Native Firebase
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Media**: React Native Video for presentations
- **Maps**: React Native Maps
- **Internationalization**: react-i18next

## Core Features to Implement

### 1. User Authentication & Profiles
```typescript
interface UserProfile {
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
  userType: 'attendee' | 'speaker' | 'organizer';
  preferredLanguage: 'en' | 'ku-sorani' | 'ku-kurmanji';
}
```

### 2. Multilingual Support (Critical Requirement)
- **Languages**: English, Kurdish Sorani (ckb), Kurdish Kurmanji (kmr)
- **Features**: RTL support for Kurdish text, language switching, localized content
- **Implementation**: Use react-i18next with proper Kurdish language codes

### 3. Event Schedule & Program Management
```typescript
interface Session {
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
```

### 4. Speaker & Presentation Management
```typescript
interface Speaker {
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

interface Presentation {
  id: string;
  title: string;
  abstract: string;
  presenterId: string;
  sessionId: string;
  slides?: string;
  video?: string;
  resources: Resource[];
}
```

### 5. Interactive Social Features
```typescript
interface Comment {
  id: string;
  userId: string;
  sessionId: string;
  content: string;
  timestamp: Date;
  likes: string[];
  replies: Comment[];
  language: string;
}

interface NetworkingRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: Date;
}
```

### 6. Screen Structure & Navigation

#### Main Tab Navigation:
1. **Home/Dashboard**
   - Today's schedule
   - Live sessions
   - Announcements
   - Quick actions

2. **Schedule**
   - Full 4-day program
   - Filter by type, speaker, topic
   - Personal agenda
   - Add to calendar integration

3. **Speakers**
   - Speaker directory
   - Search and filter
   - Speaker profiles with bios
   - Connect with speakers

4. **Live/Sessions**
   - Live streaming interface
   - Session recordings
   - Real-time Q&A
   - Live comments and reactions

5. **Community**
   - Networking hub
   - Attendee directory
   - Direct messaging
   - Interest-based groups
   - Mentorship matching

6. **Resources**
   - Presentation slides
   - Research papers
   - Career development materials
   - Kurdish language tech resources

7. **More**
   - Settings
   - Feedback forms
   - Surveys
   - About the forum

### 7. Specific Kurdish Science Features

#### Kurdish Language Technology Section:
- Workshop materials on AI and NLP for Kurdish
- Code repositories and tools
- Language resources and datasets

#### DEI (Diversity, Equity, Inclusion) Hub:
- Panel discussions on underrepresented communities
- Gender equality in science resources
- Mentorship program interface

#### Career Development Center:
- Young researcher resources
- Job board
- Funding opportunities
- Academic pathway guidance

### 8. Technical Implementation Requirements

#### Real-time Features:
```typescript
// Socket.io events for real-time features
const socketEvents = {
  JOIN_SESSION: 'join_session',
  LEAVE_SESSION: 'leave_session',
  NEW_COMMENT: 'new_comment',
  LIVE_POLL: 'live_poll',
  Q_A_QUESTION: 'qa_question',
  NOTIFICATION: 'notification',
  NETWORKING_REQUEST: 'networking_request'
};
```

#### Offline Support:
- Cache schedule data
- Download presentations for offline viewing
- Sync comments when back online
- Store user preferences locally

#### Push Notifications:
- Session reminders (15 mins before)
- Live session starting
- New comments on followed sessions
- Networking requests
- Important announcements

### 9. UI/UX Requirements

#### Design Theme:
- Professional academic conference aesthetic
- Kurdish cultural elements (colors, patterns)
- Accessibility compliance (WCAG 2.1)
- Dark/light theme support

#### Key Screens to Design:

1. **Login/Registration Screen**
   - Firebase Auth integration
   - Social login options
   - Language selection

2. **Onboarding Flow**
   - Conference overview
   - Feature introduction
   - Permission requests

3. **Dashboard**
   - Personalized content
   - Quick access to live sessions
   - Upcoming personal agenda

4. **Session Detail Screen**
   - Session info and description
   - Speaker bios
   - Real-time comments
   - Q&A interface
   - Add to personal agenda

5. **Live Session Interface**
   - Video player (landscape mode)
   - Live chat
   - Reaction buttons
   - Q&A submission
   - Screen sharing support

6. **Speaker Profile Screen**
   - Biography and expertise
   - Session list
   - Connect/Follow button
   - Contact information

7. **Community/Networking Screen**
   - Attendee search and filters
   - Connection requests
   - Messaging interface
   - Interest groups

8. **Personal Profile Screen**
   - Edit profile information
   - My agenda
   - My connections
   - My comments and interactions

### 10. Backend API Requirements

#### Essential Endpoints:
```typescript
// User Management
POST /api/auth/login
POST /api/auth/register
GET /api/users/profile
PUT /api/users/profile

// Schedule & Sessions
GET /api/sessions
GET /api/sessions/:id
POST /api/sessions/:id/join
DELETE /api/sessions/:id/leave

// Comments & Interactions
POST /api/sessions/:id/comments
GET /api/sessions/:id/comments
POST /api/comments/:id/like
POST /api/comments/:id/reply

// Networking
POST /api/networking/connect
GET /api/networking/requests
PUT /api/networking/requests/:id

// Content
GET /api/speakers
GET /api/presentations
GET /api/resources
```

### 11. Special Features for Kurdish Context

#### Language Features:
- Kurdish keyboard integration
- Text direction handling (RTL support)
- Font support for Kurdish characters
- Translation between Kurdish dialects

#### Cultural Considerations:
- Prayer time notifications (optional)
- Cultural event integration
- Traditional Kurdish design elements
- Support for Kurdish academic institutions

### 12. Testing & Quality Assurance

#### Testing Requirements:
- Unit tests for all components
- Integration tests for API calls
- E2E testing for critical user flows
- Performance testing for video streaming
- Accessibility testing
- Multi-language testing

#### Performance Optimization:
- Image optimization and lazy loading
- Video streaming optimization
- Efficient state management
- Memory leak prevention
- Battery optimization for live features

### 13. Deployment & Distribution

#### App Store Requirements:
- iOS App Store compliance
- Google Play Store compliance
- Privacy policy implementation
- Terms of service
- GDPR compliance for EU users

#### Analytics Integration:
- Firebase Analytics
- User engagement tracking
- Feature usage statistics
- Crash reporting with Firebase Crashlytics

### 14. Post-Launch Features (Phase 2)

#### Advanced Features:
- AI-powered session recommendations
- Automatic session transcription
- Real-time language translation
- AR features for venue navigation
- Integration with academic databases
- Research collaboration matching

## Development Phases

### Phase 1 (MVP - 4 weeks):
- Basic authentication
- Schedule viewing
- Speaker profiles
- Basic commenting
- Core navigation

### Phase 2 (Full Features - 6 weeks):
- Live streaming
- Real-time chat
- Networking features
- Full multilingual support
- Push notifications

### Phase 3 (Enhancement - 2 weeks):
- Advanced search
- Offline capabilities
- Analytics integration
- Performance optimization
- App store preparation

## Success Metrics
- User engagement during the 4-day conference
- Session attendance tracking
- Networking connections made
- Comment and interaction volume
- App store ratings and reviews
- Retention rate post-conference

## Additional Notes
- Ensure the app works seamlessly in the University of Ottawa venue
- Support for both academic and general audiences
- Emphasis on fostering Kurdish scientific community
- Integration with conference logistics (registration, feedback)
- Preparation for future annual conferences

Generate a production-ready React Native application following these specifications, with clean, maintainable code, proper error handling, and comprehensive documentation.