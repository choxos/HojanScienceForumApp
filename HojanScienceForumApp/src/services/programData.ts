import { Session, Speaker } from '../types';

export const conferenceProgram = {
  day1: {
    date: '2025-08-25',
    title: 'Day 1',
    sessions: [
      {
        id: 'day1-registration',
        title: {
          en: 'Registration',
          'ku-sorani': 'تۆمارکردن',
          'ku-kurmanji': 'Tomarkirin'
        },
        description: {
          en: 'Conference registration and welcome',
          'ku-sorani': 'تۆمارکردن و پێشوازی کۆنفرانس',
          'ku-kurmanji': 'Tomarkirina konferansê û pêşwazî'
        },
        startTime: new Date('2025-08-25T08:00:00'),
        endTime: new Date('2025-08-25T08:45:00'),
        type: 'networking' as const,
        location: 'Main Lobby',
        speakers: [],
        tags: ['registration'],
        isLive: false,
        materials: []
      },
      {
        id: 'day1-opening',
        title: {
          en: 'Opening & Introductory Remarks',
          'ku-sorani': 'کردنەوە و قسە پێشەکی',
          'ku-kurmanji': 'Vekirina û axaftinên destpêkê'
        },
        description: {
          en: 'Welcome ceremony and conference introduction',
          'ku-sorani': 'بەڕێوەبردنی پێشوازی و ناساندنی کۆنفرانس',
          'ku-kurmanji': 'Merasîma pêşwazîyê û nasandina konferansê'
        },
        startTime: new Date('2025-08-25T09:00:00'),
        endTime: new Date('2025-08-25T09:45:00'),
        type: 'keynote' as const,
        location: 'Main Auditorium',
        speakers: [],
        tags: ['opening', 'welcome'],
        isLive: false,
        materials: []
      },
      {
        id: 'day1-keynote1',
        title: {
          en: 'Keynote Speech I: Science Communication in Kurdish',
          'ku-sorani': 'وتاری سەرەکی یەکەم: پەیوەندی زانستی بە کوردی',
          'ku-kurmanji': 'Axaftina sereke ya yekem: Pêwendiya zanistî bi Kurdî'
        },
        description: {
          en: 'Prof. J. Sheyholislami discusses science communication in Kurdish language',
          'ku-sorani': 'پ. ج. شێخەلیسلامی دەربارەی پەیوەندی زانستی بە زمانی کوردی قسە دەکات',
          'ku-kurmanji': 'Prof. J. Sheyholislami derbarê pêwendiya zanistî bi zimanê Kurdî de diaxive'
        },
        startTime: new Date('2025-08-25T09:45:00'),
        endTime: new Date('2025-08-25T10:30:00'),
        type: 'keynote' as const,
        location: 'Main Auditorium',
        speakers: [
          {
            id: 'prof-sheyholislami',
            name: 'Prof. J. Sheyholislami',
            title: 'Professor',
            affiliation: 'University of Ottawa',
            biography: {
              en: 'Expert in Kurdish language and science communication',
              'ku-sorani': 'شارەزا لە زمانی کوردی و پەیوەندی زانستی',
              'ku-kurmanji': 'Pispor li zimanê Kurdî û pêwendiya zanistî'
            },
            expertise: ['Kurdish Language', 'Science Communication'],
            profileImage: '',
            socialLinks: {},
            sessions: ['day1-keynote1']
          }
        ],
        tags: ['keynote', 'language', 'communication'],
        isLive: false,
        materials: []
      },
      {
        id: 'day1-heritage',
        title: {
          en: 'Intersections of Science and Heritage',
          'ku-sorani': 'پەیوەندی زانست و میرات',
          'ku-kurmanji': 'Têkiliya zanist û mîratê'
        },
        description: {
          en: 'Exploring the connections between scientific research and Kurdish heritage',
          'ku-sorani': 'گەڕان بەدوای پەیوەندیەکانی نێوان لێکۆڵینەوەی زانستی و میراتی کوردی',
          'ku-kurmanji': 'Lêgerîna têkiliyên di navbera lêkolînên zanistî û mîrata Kurdî de'
        },
        startTime: new Date('2025-08-25T11:00:00'),
        endTime: new Date('2025-08-25T12:30:00'),
        type: 'panel' as const,
        location: 'Conference Hall A',
        speakers: [],
        tags: ['heritage', 'science', 'culture'],
        isLive: false,
        materials: []
      }
    ]
  },
  day2: {
    date: '2025-08-26',
    title: 'Day 2',
    sessions: [
      {
        id: 'day2-keynote2',
        title: {
          en: 'Keynote Speech II: Science and Society',
          'ku-sorani': 'وتاری سەرەکی دووەم: زانست و کۆمەڵگا',
          'ku-kurmanji': 'Axaftina sereke ya duyem: Zanist û civak'
        },
        description: {
          en: 'Prof. G. Leuchs explores the relationship between science and society',
          'ku-sorani': 'پ. گ. لۆخس پەیوەندی نێوان زانست و کۆمەڵگا دەخولێنێتەوە',
          'ku-kurmanji': 'Prof. G. Leuchs têkiliya di navbera zanist û civakê de vedikole'
        },
        startTime: new Date('2025-08-26T09:00:00'),
        endTime: new Date('2025-08-26T09:45:00'),
        type: 'keynote' as const,
        location: 'Main Auditorium',
        speakers: [],
        tags: ['keynote', 'society', 'science'],
        isLive: false,
        materials: []
      }
    ]
  },
  day3: {
    date: '2025-08-27',
    title: 'Day 3',
    sessions: [
      {
        id: 'day3-keynote3',
        title: {
          en: 'Keynote Speech III: Shaping a Career, Like Shaping Light',
          'ku-sorani': 'وتاری سەرەکی سێیەم: دروستکردنی کاریگەری، وەک دروستکردنی ڕووناکی',
          'ku-kurmanji': 'Axaftina sereke ya sêyem: Avakirina kariyerê, wek avakirina ronahiyê'
        },
        description: {
          en: 'Prof. E. Karimi discusses career development in science',
          'ku-sorani': 'پ. ئی. کەریمی دەربارەی گەشەپێدانی کارییەر لە زانستدا قسە دەکات',
          'ku-kurmanji': 'Prof. E. Karimi derbarê pêşkeftina kariyerê li zanistê de diaxive'
        },
        startTime: new Date('2025-08-27T09:00:00'),
        endTime: new Date('2025-08-27T09:45:00'),
        type: 'keynote' as const,
        location: 'Main Auditorium',
        speakers: [],
        tags: ['keynote', 'career', 'development'],
        isLive: false,
        materials: []
      }
    ]
  },
  day4: {
    date: '2025-08-28',
    title: 'Day 4',
    sessions: [
      {
        id: 'day4-keynote4',
        title: {
          en: 'Keynote Speech IV: The Power of Persistence - Women\'s Journey in Science',
          'ku-sorani': 'وتاری سەرەکی چوارەم: هێزی بەردەوامی - گەشتی ژنان لە زانستدا',
          'ku-kurmanji': 'Axaftina sereke ya çarem: Hêza domdariyê - Geştê jinan li zanistê'
        },
        description: {
          en: 'Prof. S. Abbasi Nejad Enger on women\'s persistence in scientific careers',
          'ku-sorani': 'پ. س. عەباسی نەژاد ئەنگەر دەربارەی بەردەوامی ژنان لە کاری زانستیدا',
          'ku-kurmanji': 'Prof. S. Abbasi Nejad Enger derbarê domdariya jinan li karê zanistî de'
        },
        startTime: new Date('2025-08-28T09:00:00'),
        endTime: new Date('2025-08-28T09:45:00'),
        type: 'keynote' as const,
        location: 'Main Auditorium',
        speakers: [],
        tags: ['keynote', 'women', 'persistence', 'career'],
        isLive: false,
        materials: []
      }
    ]
  }
};

// Featured speakers from the program
export const featuredSpeakers: Speaker[] = [
  {
    id: 'prof-sheyholislami',
    name: 'Prof. J. Sheyholislami',
    title: 'Professor of Linguistics',
    affiliation: 'University of Ottawa',
    biography: {
      en: 'Leading expert in Kurdish language research and science communication',
      'ku-sorani': 'شارەزایەکی بەرچاو لە لێکۆڵینەوەی زمانی کوردی و پەیوەندی زانستیدا',
      'ku-kurmanji': 'Pispor li lêkolînên zimanê Kurdî û pêwendiya zanistî'
    },
    expertise: ['Kurdish Language', 'Linguistics', 'Science Communication'],
    profileImage: '',
    socialLinks: {
      orcid: '0000-0000-0000-0000'
    },
    sessions: ['day1-keynote1']
  },
  {
    id: 'prof-leuchs',
    name: 'Prof. G. Leuchs',
    title: 'Professor of Physics',
    affiliation: 'Max Planck Institute',
    biography: {
      en: 'Renowned physicist specializing in quantum optics and science-society relations',
      'ku-sorani': 'فیزیکزانێکی ناودار پسپۆڕ لە نووری کوانتەمی و پەیوەندی زانست-کۆمەڵگا',
      'ku-kurmanji': 'Fîzîkzan û pispor li ronahiya quantum û têkiliya zanist-civakê'
    },
    expertise: ['Quantum Physics', 'Optics', 'Science Policy'],
    profileImage: '',
    socialLinks: {},
    sessions: ['day2-keynote2']
  },
  {
    id: 'prof-karimi',
    name: 'Prof. E. Karimi',
    title: 'Professor of Physics',
    affiliation: 'University of Ottawa',
    biography: {
      en: 'Expert in photonics and quantum physics, advocate for career development in science',
      'ku-sorani': 'شارەزا لە فۆتۆنیکس و فیزیکی کوانتەم، پاڵپشتیکاری گەشەپێدانی کارییەر لە زانستدا',
      'ku-kurmanji': 'Pispor li fotonîk û fîzîka quantum, piştgirkar ji bo pêşkeftina kariyerê li zanistê'
    },
    expertise: ['Photonics', 'Quantum Physics', 'Career Development'],
    profileImage: '',
    socialLinks: {},
    sessions: ['day3-keynote3']
  },
  {
    id: 'prof-abbasi',
    name: 'Prof. S. Abbasi Nejad Enger',
    title: 'Professor',
    affiliation: 'Research Institute',
    biography: {
      en: 'Advocate for women in science and expert in persistence and resilience in academic careers',
      'ku-sorani': 'پاڵپشتیکاری ژنان لە زانستدا و شارەزا لە بەردەوامی و بەرگریی کاری ئەکادیمیدا',
      'ku-kurmanji': 'Piştgirkar ji jinan li zanistê û pispor li domdarî û berxwedanê di karên akademîk de'
    },
    expertise: ['Women in Science', 'Academic Career Development', 'Research Leadership'],
    profileImage: '',
    socialLinks: {},
    sessions: ['day4-keynote4']
  }
];

// Helper function to get all sessions
export const getAllSessions = (): Session[] => {
  return [
    ...conferenceProgram.day1.sessions,
    ...conferenceProgram.day2.sessions,
    ...conferenceProgram.day3.sessions,
    ...conferenceProgram.day4.sessions
  ];
};

// Helper function to get sessions by day
export const getSessionsByDay = (day: 1 | 2 | 3 | 4) => {
  switch (day) {
    case 1: return conferenceProgram.day1;
    case 2: return conferenceProgram.day2;
    case 3: return conferenceProgram.day3;
    case 4: return conferenceProgram.day4;
    default: return conferenceProgram.day1;
  }
};
