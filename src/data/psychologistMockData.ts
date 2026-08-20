export interface PsychologistProfileData {
  id: string;
  name: string;
  surname: string;
  title: string;
  specialization: string;
  photo: string;
  phone: string;
  email: string;
  birthDate: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  about: string;
  specialtyTopics: string[];
  languages: string[];
  education: {
    id: string;
    university: string;
    degree: string;
    startYear: string;
    endYear: string;
  }[];
  certificates: {
    id: string;
    title: string;
    organization: string;
    year: string;
    fileUrl?: string;
  }[];
  services: {
    id: string;
    title: string;
    description: string;
    durationMinutes: number;
    price: number;
    isActive: boolean;
  }[];
  verificationStatus: 'verified' | 'pending' | 'changes_requested' | 'rejected';
  verificationFeedback?: string;
  profileCompletionPercent: number;
  missingItems: string[];
}

export interface PsychologistSessionItem {
  id: string;
  clientName: string;
  clientPhoto: string;
  clientEmail: string;
  clientPhone: string;
  sessionType: string;
  format: 'online' | 'in_person';
  date: string;
  timeSlot: string;
  durationMinutes: number;
  price: number;
  status: 'confirmed' | 'today' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  meetingLink?: string;
  location?: string;
  previousSessionsCount: number;
  clientNotes?: string;
  createdAt: string;
}

export interface PsychologistClientItem {
  id: string;
  name: string;
  photo: string;
  email: string;
  phone: string;
  totalSessions: number;
  lastSessionDate: string;
  nextSessionDate?: string;
  status: 'active' | 'past';
  primaryIssue: string;
  notesHistory: {
    date: string;
    note: string;
  }[];
}

export interface PsychologistWebinarItem {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  date: string;
  time: string;
  durationMinutes: number;
  price: number;
  isFree: boolean;
  registeredParticipants: number;
  maxParticipants: number;
  status: 'active' | 'upcoming' | 'completed' | 'draft' | 'under_review';
  revenue: number;
  about: string;
  whatYouWillLearn: string[];
  agenda: { timeRange: string; topic: string; description: string }[];
  participantsList: {
    id: string;
    name: string;
    email: string;
    registeredAt: string;
    paymentStatus: 'paid' | 'free';
    attendanceStatus: 'attended' | 'registered' | 'absent';
  }[];
}

export interface PsychologistCourseItem {
  id: string;
  title: string;
  category: string;
  level: string;
  coverImage: string;
  enrolledStudentsCount: number;
  rating: number;
  lessonsCount: number;
  modulesCount: number;
  durationHours: number;
  price: number;
  revenue: number;
  status: 'published' | 'draft' | 'under_review' | 'rejected';
  rejectionReason?: string;
  description: string;
  modules: {
    id: string;
    title: string;
    duration: string;
    lessons: {
      id: string;
      title: string;
      type: 'video' | 'text' | 'file' | 'quiz';
      duration: string;
    }[];
  }[];
  studentsList: {
    id: string;
    name: string;
    email: string;
    enrolledAt: string;
    progressPercent: number;
    completed: boolean;
    certificateIssued: boolean;
  }[];
}

export interface PsychologistReviewItem {
  id: string;
  clientName: string;
  clientPhoto: string;
  rating: number;
  date: string;
  comment: string;
  sessionType: string;
  psychologistReply?: {
    date: string;
    text: string;
  };
}

export interface PsychologistTransactionItem {
  id: string;
  date: string;
  type: 'seans' | 'vebinar' | 'telim';
  title: string;
  clientOrStudent: string;
  grossAmount: number;
  platformFee: number;
  netIncome: number;
  status: 'completed' | 'pending' | 'refunded';
}

export interface PsychologistNotificationItem {
  id: string;
  category: 'all' | 'sessions' | 'webinars' | 'trainings' | 'system';
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

export interface PsychologistConversationItem {
  id: string;
  clientId: string;
  clientName: string;
  clientPhoto: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  clientPrimaryGoal: string;
  messages: {
    id: string;
    sender: 'psychologist' | 'client';
    text: string;
    time: string;
  }[];
}

// ---------------- MOCK DATA INSTANCES ---------------- //

export const PSYCHOLOGIST_PROFILE_MOCK: PsychologistProfileData = {
  id: 'dr-aysel-mammadova',
  name: 'Aysel',
  surname: 'Məmmədova',
  title: 'Klinik Psixoloq, PhD',
  specialization: 'Koqnitiv Davranış Terapiyası (CBT) & Emosional Tənzimləmə',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  phone: '+994 (50) 456-78-90',
  email: 'dr.aysel@dayaq.az',
  birthDate: '1988-05-14',
  experienceYears: 12,
  rating: 4.9,
  reviewCount: 127,
  about: 'Bakı Dövlət Universiteti və Hacettepe Universitetində klinik psixologiya üzrə magistratura və doktorantura təhsili almışam. 12 ildən artıqdır ki, təşviş pozuntuları, panik ataklar, depressiv vəziyyətlər və münasibət böhranları üzrə fərdi konsultasiyalar və qrup təlimləri keçirəm.',
  specialtyTopics: [
    'Təşviş və Həyəcan Pozuntusu',
    'Panik Ataklar',
    'Depressiya və Əhval Pozğunluqları',
    'Şəxsi Sərhədlər və Özgüvən',
    'İşdə Tükənmişlik (Burnout)',
    'Travma Sonrası Stress (PTSD)'
  ],
  languages: ['Azərbaycan dili', 'Türkcə', 'İngiliscə', 'Rusca'],
  education: [
    {
      id: 'edu-1',
      university: 'Hacettepe Universiteti (Türkiyə)',
      degree: 'Klinik Psixologiya üzrə Doktorantura (PhD)',
      startYear: '2014',
      endYear: '2018'
    },
    {
      id: 'edu-2',
      university: 'Bakı Dövlət Universiteti',
      degree: 'Psixologiya üzrə Magistratura (Fərqlənmə)',
      startYear: '2010',
      endYear: '2012'
    },
    {
      id: 'edu-3',
      university: 'Bakı Dövlət Universiteti',
      degree: 'Psixologiya üzrə Bakalavr',
      startYear: '2006',
      endYear: '2010'
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'Beck Institute Certified CBT Clinician',
      organization: 'Beck Institute for Cognitive Behavior Therapy (USA)',
      year: '2019'
    },
    {
      id: 'cert-2',
      title: 'EMDR Terapiyası I və II Səviyyə Sertifikatı',
      organization: 'EMDR Avropa Assosiasiyası',
      year: '2021'
    },
    {
      id: 'cert-3',
      title: 'Mindfulness Əsaslı Stressin Azaldılması (MBSR)',
      organization: 'Oksford Mindfulness Mərkəzi',
      year: '2022'
    }
  ],
  services: [
    {
      id: 'srv-1',
      title: 'Fərdi Onlayn Psixoloji Seans',
      description: 'Qorunan video bağlantı vasitəsilə 50 dəqiqəlik fərdi koqnitiv-davranış konsultasiyası.',
      durationMinutes: 50,
      price: 60,
      isActive: true
    },
    {
      id: 'srv-2',
      title: 'Fərdi Əyani (Ofis) Seansı',
      description: 'Bakı şəhəri 28 May filialında fərdi təhlükəsiz kabinetdə konsultasiya.',
      durationMinutes: 50,
      price: 75,
      isActive: true
    },
    {
      id: 'srv-3',
      title: 'Cütlük və Münasibət Konsultasiyası',
      description: 'Partnyorlar arasında sağlam dialoq və sərhədlərin bərpası üçün 80 dəqiqəlik görüş.',
      durationMinutes: 80,
      price: 100,
      isActive: true
    }
  ],
  verificationStatus: 'verified',
  profileCompletionPercent: 85,
  missingItems: [
    'Bioqrafiya videosu (1 dəqiqəlik təqdimat)',
    'Sonuncu elmi məqalə və ya nəşrin əlavə olunması',
    'Bank hesab rekvizitlərinin tam təsdiqi'
  ]
};

export const PSYCHOLOGIST_SESSIONS_MOCK: PsychologistSessionItem[] = [
  {
    id: 'ses-101',
    clientName: 'Nigar Əliyeva',
    clientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'nigar.aliyeva@gmail.com',
    clientPhone: '+994 (50) 334-12-88',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    format: 'online',
    date: 'Bu gün, 20 Avqust 2026',
    timeSlot: '10:00 — 10:50',
    durationMinutes: 50,
    price: 60,
    status: 'today',
    paymentStatus: 'paid',
    meetingLink: 'https://meet.dayaq.az/room/dr-aysel-nigar-101',
    previousSessionsCount: 4,
    clientNotes: 'Sosial təşviş və iclaslarda danışmaq qorxusu üzərində işləyirik. Düşüncə qeydiyyatı cədvəlini analiz edəcəyik.',
    createdAt: '2026-08-16T14:20:00Z'
  },
  {
    id: 'ses-102',
    clientName: 'Elvin Qasımov',
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'elvin.gasimov@yahoo.com',
    clientPhone: '+994 (55) 712-44-01',
    sessionType: 'Fərdi Əyani Seans (Ofis)',
    format: 'in_person',
    date: 'Bu gün, 20 Avqust 2026',
    timeSlot: '12:00 — 12:50',
    durationMinutes: 50,
    price: 75,
    status: 'today',
    paymentStatus: 'paid',
    location: '28 May filialı, Otaq 3B',
    previousSessionsCount: 2,
    clientNotes: 'İşdə tükənmişlik və yuxu rejiminin pozulması. Enerji bərpası planı tərtib olunur.',
    createdAt: '2026-08-17T09:10:00Z'
  },
  {
    id: 'ses-103',
    clientName: 'Leyla Hüseynova',
    clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'leyla.huseynova@mail.ru',
    clientPhone: '+994 (70) 901-23-45',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    format: 'online',
    date: 'Bu gün, 20 Avqust 2026',
    timeSlot: '15:00 — 15:50',
    durationMinutes: 50,
    price: 60,
    status: 'today',
    paymentStatus: 'paid',
    meetingLink: 'https://meet.dayaq.az/room/dr-aysel-leyla-103',
    previousSessionsCount: 6,
    clientNotes: 'Panik atak idarəsi. 5-4-3-2-1 torpaqlanma metodunun praktiki tətbiqi.',
    createdAt: '2026-08-15T18:00:00Z'
  },
  {
    id: 'ses-104',
    clientName: 'Kamran Rəsulov',
    clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'kamran.rasulov@gmail.com',
    clientPhone: '+994 (51) 670-88-99',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    format: 'online',
    date: 'Bu gün, 20 Avqust 2026',
    timeSlot: '17:00 — 17:50',
    durationMinutes: 50,
    price: 60,
    status: 'today',
    paymentStatus: 'paid',
    meetingLink: 'https://meet.dayaq.az/room/dr-aysel-kamran-104',
    previousSessionsCount: 1,
    clientNotes: 'İlkin diaqnostik qiymətləndirmə və hədəflərin müəyyənləşdirilməsi.',
    createdAt: '2026-08-18T11:45:00Z'
  },
  {
    id: 'ses-105',
    clientName: 'Günay İsmayılova',
    clientPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'gunay.ismayilova@gmail.com',
    clientPhone: '+994 (50) 888-11-22',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    format: 'online',
    date: 'Sabah, 21 Avqust 2026',
    timeSlot: '11:00 — 11:50',
    durationMinutes: 50,
    price: 60,
    status: 'confirmed',
    paymentStatus: 'paid',
    meetingLink: 'https://meet.dayaq.az/room/dr-aysel-gunay-105',
    previousSessionsCount: 5,
    clientNotes: 'Münasibətlərdə sağlam sərhəd qoymaq və mühakiməsiz yox demək vərdişi.',
    createdAt: '2026-08-17T16:30:00Z'
  },
  {
    id: 'ses-106',
    clientName: 'Tural Məlikov',
    clientPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'tural.malikov@gmail.com',
    clientPhone: '+994 (55) 303-99-00',
    sessionType: 'Fərdi Əyani Seans (Ofis)',
    format: 'in_person',
    date: '22 Avqust 2026',
    timeSlot: '14:00 — 14:50',
    durationMinutes: 50,
    price: 75,
    status: 'confirmed',
    paymentStatus: 'paid',
    location: '28 May filialı, Otaq 3B',
    previousSessionsCount: 3,
    clientNotes: 'Fərdi motivasiya və gələcək planlaması.',
    createdAt: '2026-08-18T13:10:00Z'
  },
  {
    id: 'ses-107',
    clientName: 'Aytən Nəcəfova',
    clientPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'ayten.nacafova@yahoo.com',
    clientPhone: '+994 (50) 654-32-10',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    format: 'online',
    date: '18 Avqust 2026',
    timeSlot: '16:00 — 16:50',
    durationMinutes: 50,
    price: 60,
    status: 'completed',
    paymentStatus: 'paid',
    previousSessionsCount: 8,
    clientNotes: 'Seans uğurla tamamlandı. Həyəcan dərəcəsi 8-dən 3-ə endi.',
    createdAt: '2026-08-12T10:00:00Z'
  },
  {
    id: 'ses-108',
    clientName: 'Samir Vəliyev',
    clientPhoto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    clientEmail: 'samir.valiyev@inbox.ru',
    clientPhone: '+994 (77) 412-90-88',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    format: 'online',
    date: '16 Avqust 2026',
    timeSlot: '11:00 — 11:50',
    durationMinutes: 50,
    price: 60,
    status: 'cancelled',
    paymentStatus: 'refunded',
    previousSessionsCount: 1,
    clientNotes: 'Müştəri tərəfindən 24 saat öncədən ləğv edildi.',
    createdAt: '2026-08-14T09:00:00Z'
  }
];

export const PSYCHOLOGIST_CLIENTS_MOCK: PsychologistClientItem[] = [
  {
    id: 'cli-1',
    name: 'Nigar Əliyeva',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    email: 'nigar.aliyeva@gmail.com',
    phone: '+994 (50) 334-12-88',
    totalSessions: 5,
    lastSessionDate: '20 Avqust 2026 (Bu gün)',
    nextSessionDate: '27 Avqust 2026, 10:00',
    status: 'active',
    primaryIssue: 'Sosial təşviş və ictimai çıxış həyəcanı',
    notesHistory: [
      { date: '20 Avqust 2026', note: 'Katastrofik düşüncə bloklarının analizi və davranış eksperimenti təyini.' },
      { date: '13 Avqust 2026', note: 'Diafraqmal nəfəs və relaksasiya texnikaları mənimsənildi.' },
      { date: '06 Avqust 2026', note: 'İlkin CBT şkalası üzrə təşviş səviyyəsi yüksək (72/100) qiymətləndirildi.' }
    ]
  },
  {
    id: 'cli-2',
    name: 'Elvin Qasımov',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    email: 'elvin.gasimov@yahoo.com',
    phone: '+994 (55) 712-44-01',
    totalSessions: 3,
    lastSessionDate: '20 Avqust 2026 (Bu gün)',
    nextSessionDate: '28 Avqust 2026, 12:00',
    status: 'active',
    primaryIssue: 'İşdə tükənmişlik və xroniki yorğunluq',
    notesHistory: [
      { date: '20 Avqust 2026', note: 'İş və şəxsi həyat sərhədlərinin qorunması strategiyası.' },
      { date: '10 Avqust 2026', note: 'Yuxu gigiyenası və ekran vaxtının azaldılması müzakirə olundu.' }
    ]
  },
  {
    id: 'cli-3',
    name: 'Leyla Hüseynova',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    email: 'leyla.huseynova@mail.ru',
    phone: '+994 (70) 901-23-45',
    totalSessions: 7,
    lastSessionDate: '20 Avqust 2026 (Bu gün)',
    nextSessionDate: '27 Avqust 2026, 15:00',
    status: 'active',
    primaryIssue: 'Panik atak tutmaları və aqorafobiya',
    notesHistory: [
      { date: '20 Avqust 2026', note: 'Kütləvi nəqliyyatda tətbiq üçün torpaqlanma kartı hazırlandı.' },
      { date: '11 Avqust 2026', note: 'Panik atakların tezliyi həftədə 4-dən 1-ə endirildi.' }
    ]
  },
  {
    id: 'cli-4',
    name: 'Aytən Nəcəfova',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    email: 'ayten.nacafova@yahoo.com',
    phone: '+994 (50) 654-32-10',
    totalSessions: 8,
    lastSessionDate: '18 Avqust 2026',
    nextSessionDate: 'Müalicə kursu tamamlandı',
    status: 'past',
    primaryIssue: 'Perfeksionizm və özünü mühakimə',
    notesHistory: [
      { date: '18 Avqust 2026', note: 'Yekun qiymətləndirmə aparıldı. Hədəflər tam əldə olundu.' }
    ]
  },
  {
    id: 'cli-5',
    name: 'Kamran Rəsulov',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    email: 'kamran.rasulov@gmail.com',
    phone: '+994 (51) 670-88-99',
    totalSessions: 1,
    lastSessionDate: '20 Avqust 2026 (Bu gün)',
    nextSessionDate: '26 Avqust 2026, 17:00',
    status: 'active',
    primaryIssue: 'Ailə münasibətlərində konfliktlər və ünsiyyət',
    notesHistory: [
      { date: '20 Avqust 2026', note: 'İlkin tanışlıq və terapiya müqaviləsinin tərtibi.' }
    ]
  }
];

export const PSYCHOLOGIST_WEBINARS_MOCK: PsychologistWebinarItem[] = [
  {
    id: 'psy-web-1',
    title: 'Stress və Narahatlıqla Mübarizə: CBT və Nəfəs Texnikaları',
    category: 'Təşviş və Stres',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    date: '25 Avqust 2026',
    time: '20:00 — 21:30',
    durationMinutes: 90,
    price: 15,
    isFree: false,
    registeredParticipants: 184,
    maxParticipants: 250,
    status: 'upcoming',
    revenue: 2760,
    about: 'Gündəlik təşvişi minimuma endirmək və panik hücumları anında dayandırmaq üçün elmi əsaslı praktiki seminar.',
    whatYouWillLearn: [
      'Panik atak anında bədəndə baş verənləri anlamaq',
      'Diafraqmal tənəffüs və mütərəqqi relaksasiya texnikası',
      'Katastrofik neqativ düşüncələri dəyişmək'
    ],
    agenda: [
      { timeRange: '20:00 - 20:25', topic: 'Giriş və Amigdalanın iş prinsipi', description: 'Bioloji stress mexanizmi' },
      { timeRange: '20:25 - 21:00', topic: 'Praktik CBT məşqləri', description: 'Canlı tənəffüs və torpaqlanma' },
      { timeRange: '21:00 - 21:30', topic: 'Sual-Cavab sessiyası', description: 'Fərdi sualların cavablandırılması' }
    ],
    participantsList: [
      { id: 'p-1', name: 'Nigar Əliyeva', email: 'nigar@gmail.com', registeredAt: '18 Avqust 2026', paymentStatus: 'paid', attendanceStatus: 'registered' },
      { id: 'p-2', name: 'Rəşad Quliyev', email: 'rashad@inbox.ru', registeredAt: '19 Avqust 2026', paymentStatus: 'paid', attendanceStatus: 'registered' },
      { id: 'p-3', name: 'Zemfira Babayeva', email: 'zemfira@mail.ru', registeredAt: '19 Avqust 2026', paymentStatus: 'paid', attendanceStatus: 'registered' }
    ]
  },
  {
    id: 'psy-web-2',
    title: 'Özünü Mühakimə Etməyi Dayandır: Şəfqətli Şüur Məşqləri',
    category: 'Şəxsi İnkişaf',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    date: '02 Sentyabr 2026',
    time: '19:30 — 20:45',
    durationMinutes: 75,
    price: 0,
    isFree: true,
    registeredParticipants: 320,
    maxParticipants: 500,
    status: 'upcoming',
    revenue: 0,
    about: 'Daxili tənqidçini sakitləşdirmək və özünüzlə mehriban dialoq qurmaq üçün açıq maarifləndirici seminar.',
    whatYouWillLearn: [
      'Daxili tənqidçinin mənşəyini tapmaq',
      'Özünə şəfqət (Self-Compassion) 3 əsas komponenti',
      'Günahkarlıq hissini sağlam məsuliyyətlə əvəzləmək'
    ],
    agenda: [
      { timeRange: '19:30 - 20:00', topic: 'Özünütənqidin psixologiyası', description: 'Niyə özümüzə qarşı qəddarıq?' },
      { timeRange: '20:00 - 20:45', topic: 'Mindfulness məşqi və Q&A', description: 'Şəfqətli meditasiya' }
    ],
    participantsList: [
      { id: 'p-4', name: 'Aynur Səmədova', email: 'aynur@gmail.com', registeredAt: '15 Avqust 2026', paymentStatus: 'free', attendanceStatus: 'registered' }
    ]
  },
  {
    id: 'psy-web-3',
    title: 'Panik Atakla Necə Yaşamamalı? 5 Dəqiqəlik Təcili Yardım',
    category: 'Emosional Sağlamlıq',
    coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    date: '10 Avqust 2026',
    time: '20:00 — 21:15',
    durationMinutes: 75,
    price: 10,
    isFree: false,
    registeredParticipants: 140,
    maxParticipants: 150,
    status: 'completed',
    revenue: 1400,
    about: 'Panik tutmaları anında bədəni sabitləyən təcili yardım metodları.',
    whatYouWillLearn: ['Amigdalanı sakitləşdirmək', 'Nəfəs qaydası'],
    agenda: [],
    participantsList: []
  },
  {
    id: 'psy-web-4',
    title: 'Münasibətlərdə Sağlam Sərhəd Quruculuğu',
    category: 'Münasibətlər',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    date: '15 Sentyabr 2026',
    time: '20:00 — 21:30',
    durationMinutes: 90,
    price: 20,
    isFree: false,
    registeredParticipants: 0,
    maxParticipants: 200,
    status: 'under_review',
    revenue: 0,
    about: 'Partnyor və ailə ilə münasibətlərdə günahkarlıq hissi olmadan yox demək bacarığı.',
    whatYouWillLearn: ['Assertiv ünsiyyət', 'Manipulyasiyalardan qorunma'],
    agenda: [],
    participantsList: []
  }
];

export const PSYCHOLOGIST_COURSES_MOCK: PsychologistCourseItem[] = [
  {
    id: 'psy-crs-1',
    title: 'Təşviş və Panik Tutmaların CBT ilə İdarə Edilməsi',
    category: 'Emosional Sağlamlıq',
    level: 'Bütün səviyyələr',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    enrolledStudentsCount: 620,
    rating: 4.97,
    lessonsCount: 18,
    modulesCount: 4,
    durationHours: 8.5,
    price: 49,
    revenue: 30380,
    status: 'published',
    description: 'Elmi əsaslı Koqnitiv Davranış Terapiyası texnikaları ilə həyəcanı minimuma endirmək və panik atakları tam nəzarətə almaq üçün masterkurs.',
    modules: [
      {
        id: 'mod-1',
        title: 'Modul 1: Təşvişin Anatomiyası və Beynin Qoruma Mexanizmi',
        duration: '1 saat 45 dəq',
        lessons: [
          { id: 'l-1', title: 'Təşviş nədir və nə vaxt problemə çevrilir?', type: 'video', duration: '18 dəq' },
          { id: 'l-2', title: 'Panik atak zamanı bədəndə nələr baş verir?', type: 'video', duration: '22 dəq' },
          { id: 'l-3', title: 'Təşviş şkalası üzrə fərdi test', type: 'quiz', duration: '15 dəq' }
        ]
      },
      {
        id: 'mod-2',
        title: 'Modul 2: Koqnitiv Yenidənqurma (CBT Metodları)',
        duration: '2 saat 30 dəq',
        lessons: [
          { id: 'l-4', title: 'Düşüncə Qeydiyyatı Cədvəli ilə İş', type: 'video', duration: '30 dəq' },
          { id: 'l-5', title: 'Sokratik Sorğulama Metodu', type: 'video', duration: '28 dəq' }
        ]
      }
    ],
    studentsList: [
      { id: 'st-1', name: 'Səmra Qasımova', email: 'samra@gmail.com', enrolledAt: '12 Avqust 2026', progressPercent: 100, completed: true, certificateIssued: true },
      { id: 'st-2', name: 'Orxan Məmmədov', email: 'orxan@mail.ru', enrolledAt: '14 Avqust 2026', progressPercent: 65, completed: false, certificateIssued: false },
      { id: 'st-3', name: 'Leyla Əliyeva', email: 'leyla.a@gmail.com', enrolledAt: '17 Avqust 2026', progressPercent: 30, completed: false, certificateIssued: false }
    ]
  },
  {
    id: 'psy-crs-2',
    title: 'Gündəlik Həyatda Mindfulness və Emosional Tənzimləmə',
    category: 'Şəxsi İnkişaf',
    level: 'Başlanğıc',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    enrolledStudentsCount: 148,
    rating: 4.91,
    lessonsCount: 12,
    modulesCount: 3,
    durationHours: 5.0,
    price: 39,
    revenue: 5772,
    status: 'published',
    description: 'Gündə 10 dəqiqə ayırmaqla diqqəti toplamaq, kortizolu azaltmaq və zehni sakitlik qazanmaq üçün təlim.',
    modules: [],
    studentsList: []
  },
  {
    id: 'psy-crs-3',
    title: 'Klinik CBT Tətbiqləri: Psixoloqlar və Tələbələr üçün Bələdçi',
    category: 'Peşəkar Təhsil',
    level: 'Peşəkar',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    enrolledStudentsCount: 0,
    rating: 0,
    lessonsCount: 24,
    modulesCount: 6,
    durationHours: 14.0,
    price: 120,
    revenue: 0,
    status: 'under_review',
    description: 'Psixologiya sahəsində çalışan mütəxəssislər üçün CBT seans protokolunun tərtibi və tətbiqi.',
    modules: [],
    studentsList: []
  },
  {
    id: 'psy-crs-4',
    title: 'Travma Sonrası İnkişaf və Emosional Dayanıqlıq (Resilience)',
    category: 'Klinik Psixologiya',
    level: 'Orta',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    enrolledStudentsCount: 0,
    rating: 0,
    lessonsCount: 8,
    modulesCount: 2,
    durationHours: 4.0,
    price: 45,
    revenue: 0,
    status: 'draft',
    description: 'Qaralama mərhələsində olan proqram.',
    modules: [],
    studentsList: []
  }
];

export const PSYCHOLOGIST_REVIEWS_MOCK: PsychologistReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Səbinə M.',
    clientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    date: '16 Avqust 2026',
    comment: 'Dr. Aysel xanımla keçdiyimiz 6 seansdan sonra artıq 4 aydır əziyyət çəkdiyim panik ataklar tamamilə aradan qalxdı. Hər seans son dərəcə sistemli və nəticəyönümlüdür.',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    psychologistReply: {
      date: '17 Avqust 2026',
      text: 'Səbinə xanım, göstərdiyiniz əzm və tapşırıqları vaxtında yerinə yetirdiyiniz üçün təşəkkür edirəm! Sizin daxili dayanıqlığınız uğurunuzun əsas səbəbidir.'
    }
  },
  {
    id: 'rev-2',
    clientName: 'Fuad Əhmədov',
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    date: '12 Avqust 2026',
    comment: 'İşdəki güclü tükənmişlik və həyəcan səbəbilə müraciət etmişdim. İlk seansdan etibarən dinlənildiyimi və anlaşıldığımı hiss etdim. Hər kəsə tərəddüdsüz tövsiyə edirəm.',
    sessionType: 'Fərdi Əyani Seans'
  },
  {
    id: 'rev-3',
    clientName: 'Nərmin Quliyeva',
    clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    date: '08 Avqust 2026',
    comment: 'Onun "Təşviş və Panik Tutmaların CBT ilə İdarə Edilməsi" kursunu da aldım, seanslarına da qatıldım. Həyat keyfiyyətim inanılmaz dərəcədə yüksəldi.',
    sessionType: 'Təlim & Fərdi Seans'
  },
  {
    id: 'rev-4',
    clientName: 'Teymur S.',
    clientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 4,
    date: '02 Avqust 2026',
    comment: 'Çox peşəkar yanaşmadır. Yalnız sıx qrafik səbəbilə axşam saatlarına yer tapmaq bir qədər çətin oldu, amma görüşlər olduqca faydalı keçdi.',
    sessionType: 'Fərdi Onlayn CBT Seansı',
    psychologistReply: {
      date: '03 Avqust 2026',
      text: 'Teymur bəy, rəyiniz üçün təşəkkürlər. Axşam saatları üçün növbəti aydan əlavə vaxt intervalları açırıq.'
    }
  }
];

export const PSYCHOLOGIST_TRANSACTIONS_MOCK: PsychologistTransactionItem[] = [
  {
    id: 'trx-901',
    date: '20 Avqust 2026',
    type: 'seans',
    title: 'Fərdi Onlayn CBT Seansı',
    clientOrStudent: 'Nigar Əliyeva',
    grossAmount: 60,
    platformFee: 6,
    netIncome: 54,
    status: 'completed'
  },
  {
    id: 'trx-902',
    date: '20 Avqust 2026',
    type: 'seans',
    title: 'Fərdi Əyani Seans',
    clientOrStudent: 'Elvin Qasımov',
    grossAmount: 75,
    platformFee: 7.5,
    netIncome: 67.5,
    status: 'completed'
  },
  {
    id: 'trx-903',
    date: '19 Avqust 2026',
    type: 'vebinar',
    title: 'Stress və Narahatlıqla Mübarizə Vebinarı (Bilet x5)',
    clientOrStudent: 'Qrup Qeydiyyatı',
    grossAmount: 75,
    platformFee: 7.5,
    netIncome: 67.5,
    status: 'completed'
  },
  {
    id: 'trx-904',
    date: '18 Avqust 2026',
    type: 'telim',
    title: 'Təşviş və Panik Tutmaların CBT ilə İdarəsi Kursu',
    clientOrStudent: 'Rəna Əkbərova',
    grossAmount: 49,
    platformFee: 4.9,
    netIncome: 44.1,
    status: 'completed'
  },
  {
    id: 'trx-905',
    date: '16 Avqust 2026',
    type: 'seans',
    title: 'Fərdi Onlayn CBT Seansı (Ləğv / Qaytarılma)',
    clientOrStudent: 'Samir Vəliyev',
    grossAmount: -60,
    platformFee: 0,
    netIncome: -60,
    status: 'refunded'
  }
];

export const PSYCHOLOGIST_NOTIFICATIONS_MOCK: PsychologistNotificationItem[] = [
  {
    id: 'notif-101',
    category: 'sessions',
    title: 'Yeni Seans Rezervasiyası',
    message: 'Nigar Əliyeva 24 Avqust saat 18:00 üçün sizinlə fərdi seans rezerv etdi.',
    time: '25 dəqiqə əvvəl',
    date: '20 Avqust 2026',
    read: false,
    actionUrl: '/psixoloq/seanslar'
  },
  {
    id: 'notif-102',
    category: 'sessions',
    title: 'Seans Xatırlatması',
    message: 'Bugün saat 10:00-da Nigar Əliyeva ilə onlayn seansınız başlayır.',
    time: '1 saat əvvəl',
    date: '20 Avqust 2026',
    read: false,
    actionUrl: '/psixoloq/seanslar'
  },
  {
    id: 'notif-103',
    category: 'webinars',
    title: 'Vebinar Qeydiyyat Həddi',
    message: '"Stress və Narahatlıqla Mübarizə" vebinarınıza 184 iştirakçı qeydiyyatdan keçdi.',
    time: 'Dünən',
    date: '19 Avqust 2026',
    read: true,
    actionUrl: '/psixoloq/vebinarlar'
  },
  {
    id: 'notif-104',
    category: 'trainings',
    title: 'Yeni Tələbə Qeydiyyatı',
    message: 'Leyla Əliyeva "Təşviş və Panik Tutmaların CBT ilə İdarəsi" kursunuza qoşuldu.',
    time: '2 gün əvvəl',
    date: '18 Avqust 2026',
    read: true,
    actionUrl: '/psixoloq/telimler'
  },
  {
    id: 'notif-105',
    category: 'system',
    title: 'Aylıq Gəlir Köçürməsi',
    message: 'İyul ayı üzrə ₼2,180 məbləğində xalis gəliriniz bank hesabınıza köçürüldü.',
    time: '5 gün əvvəl',
    date: '15 Avqust 2026',
    read: true,
    actionUrl: '/psixoloq/gelirler'
  }
];

export interface PsychologistChatThread {
  id: string;
  clientId: string;
  clientName: string;
  clientPhoto: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: {
    id: string;
    sender: 'psychologist' | 'client';
    text: string;
    timestamp: string;
  }[];
}

export interface PsychologistEarningsSummary {
  totalEarnings: number;
  thisMonthEarnings: number;
  pendingPayout: number;
  lastPayoutDate: string;
  nextPayoutDate: string;
  activeRatePerSession: number;
  completedSessionsCount: number;
  totalWithdrawn: number;
  transactions: PsychologistTransactionItem[];
  payoutHistory: {
    id: string;
    date: string;
    amount: number;
    bankIban: string;
    status: 'completed' | 'processing' | 'rejected';
  }[];
}

export const PSYCHOLOGIST_EARNINGS_MOCK: PsychologistEarningsSummary = {
  totalEarnings: 18450,
  thisMonthEarnings: 2450,
  pendingPayout: 1850,
  lastPayoutDate: '15 Avqust 2026',
  nextPayoutDate: '01 Sentyabr 2026',
  activeRatePerSession: 60,
  completedSessionsCount: 284,
  totalWithdrawn: 16600,
  transactions: [
    {
      id: 'trx-901',
      date: '20 Avqust 2026',
      type: 'seans',
      title: 'Fərdi Onlayn CBT Seansı',
      clientOrStudent: 'Nigar Əliyeva',
      grossAmount: 60,
      platformFee: 6,
      netIncome: 54,
      status: 'completed'
    },
    {
      id: 'trx-902',
      date: '20 Avqust 2026',
      type: 'seans',
      title: 'Fərdi Əyani Seans',
      clientOrStudent: 'Elvin Qasımov',
      grossAmount: 75,
      platformFee: 7.5,
      netIncome: 67.5,
      status: 'completed'
    },
    {
      id: 'trx-903',
      date: '19 Avqust 2026',
      type: 'vebinar',
      title: 'Stress və Narahatlıqla Mübarizə Vebinarı (Bilet x5)',
      clientOrStudent: 'Qrup Qeydiyyatı',
      grossAmount: 75,
      platformFee: 7.5,
      netIncome: 67.5,
      status: 'completed'
    },
    {
      id: 'trx-904',
      date: '18 Avqust 2026',
      type: 'telim',
      title: 'Təşviş və Panik Tutmaların CBT ilə İdarəsi Kursu',
      clientOrStudent: 'Rəna Əkbərova',
      grossAmount: 49,
      platformFee: 4.9,
      netIncome: 44.1,
      status: 'completed'
    },
    {
      id: 'trx-905',
      date: '16 Avqust 2026',
      type: 'seans',
      title: 'Fərdi Onlayn CBT Seansı (Ləğv / Qaytarılma)',
      clientOrStudent: 'Samir Vəliyev',
      grossAmount: -60,
      platformFee: 0,
      netIncome: -60,
      status: 'refunded'
    }
  ],
  payoutHistory: [
    {
      id: 'po-1',
      date: '15 Avqust 2026',
      amount: 2180,
      bankIban: 'AZ34NABZ01350100000000123456',
      status: 'completed'
    },
    {
      id: 'po-2',
      date: '01 Avqust 2026',
      amount: 1950,
      bankIban: 'AZ34NABZ01350100000000123456',
      status: 'completed'
    },
    {
      id: 'po-3',
      date: '15 İyul 2026',
      amount: 2300,
      bankIban: 'AZ34NABZ01350100000000123456',
      status: 'completed'
    }
  ]
};

export const PSYCHOLOGIST_MESSAGES_MOCK: PsychologistChatThread[] = [
  {
    id: 'th-1',
    clientId: 'cli-1',
    clientName: 'Nigar Əliyeva',
    clientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'Aysel xanım, bugünkü seans üçün Zoom linkini aldım, saat 10:00-da qoşulacam.',
    lastMessageTime: '09:15',
    unreadCount: 1,
    messages: [
      {
        id: 'm-1',
        sender: 'psychologist',
        text: 'Salam Nigar xanım, ötən həftə verdiyim düşüncə qeydiyyatı cədvəlini tamamlaya bildinizmi?',
        timestamp: 'Dünən 18:20'
      },
      {
        id: 'm-2',
        sender: 'client',
        text: 'Salam doktor, bəli, 3 fərqli situasiyada qeydlərimi apardım, bugünkü görüşdə bölüşmək istəyirəm.',
        timestamp: 'Dünən 19:05'
      },
      {
        id: 'm-3',
        sender: 'psychologist',
        text: 'Əla, çox yaxşı. Görüş linki sistemdə aktivdir: https://meet.dayaq.az/cbt-room',
        timestamp: '09:00'
      },
      {
        id: 'm-4',
        sender: 'client',
        text: 'Aysel xanım, bugünkü seans üçün Zoom linkini aldım, saat 10:00-da qoşulacam.',
        timestamp: '09:15'
      }
    ]
  },
  {
    id: 'th-2',
    clientId: 'cli-2',
    clientName: 'Elvin Qasımov',
    clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'Təşəkkürlər Aysel xanım, saat 12:00-da ofisdə görüşərik.',
    lastMessageTime: 'Dünən',
    unreadCount: 0,
    messages: [
      {
        id: 'm-201',
        sender: 'client',
        text: 'Salam doktor, ofis seansı üçün ünvanda dəyişiklik yoxdur ki?',
        timestamp: 'Dünən 16:40'
      },
      {
        id: 'm-202',
        sender: 'psychologist',
        text: 'Salam Elvin bəy, xeyr, 28 May filialı, Otaq 3B-də gözləyirəm.',
        timestamp: 'Dünən 16:45'
      },
      {
        id: 'm-203',
        sender: 'client',
        text: 'Təşəkkürlər Aysel xanım, saat 12:00-da ofisdə görüşərik.',
        timestamp: 'Dünən 16:50'
      }
    ]
  },
  {
    id: 'th-3',
    clientId: 'cli-3',
    clientName: 'Leyla Hüseynova',
    clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    lastMessage: 'Nəfəs texnikasını tətbiq etdim, təşviş anında çox kömək etdi!',
    lastMessageTime: '18 Avq',
    unreadCount: 0,
    messages: [
      {
        id: 'm-301',
        sender: 'client',
        text: 'Nəfəs texnikasını tətbiq etdim, təşviş anında çox kömək etdi!',
        timestamp: '18 Avqust 14:10'
      },
      {
        id: 'm-302',
        sender: 'psychologist',
        text: 'Çox sevindim Leyla xanım! Gündəlik 5 dəqiqəlik vərdiş kimi davam edin.',
        timestamp: '18 Avqust 15:30'
      }
    ]
  }
];

