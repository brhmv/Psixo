export type ConsultationFormat = 'online' | 'in_person' | 'both';

export interface Psychologist {
  id: string;
  name: string;
  title: string;
  photo: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  specializations: string[];
  consultationTypes: ConsultationFormat;
  pricePerSession: number;
  languages: string[];
  education: string[];
  certifications: string[];
  bio: string;
  aboutTherapy: string;
  location: string;
  verified: boolean;
  nextAvailableSlot: string;
  availableDays: string[];
  timeSlots: string[];
  services: {
    title: string;
    description: string;
    duration: string;
    price: number;
  }[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  associatedWebinarIds?: string[];
  associatedCourseIds?: string[];
}

export interface Webinar {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  speaker: {
    id?: string;
    name: string;
    title: string;
    photo: string;
    bio: string;
  };
  category: string;
  type: 'upcoming' | 'live' | 'recorded' | 'free';
  date: string;
  time: string;
  durationMinutes: number;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  registeredCount: number;
  about: string;
  whatYouWillLearn: string[];
  agenda: {
    timeRange: string;
    topic: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  videoUrl?: string;
}

export interface TrainingLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'practice' | 'quiz' | 'reading';
  freePreview?: boolean;
  videoUrl?: string;
  description?: string;
  resources?: { name: string; url: string; size: string }[];
}

export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  lessons: TrainingLesson[];
}

export interface TrainingCourse {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  instructor: {
    id?: string;
    name: string;
    title: string;
    photo: string;
    bio: string;
  };
  category: string;
  level: 'Başlanğıc' | 'Orta' | 'Peşəkar' | 'Bütün səviyyələr';
  durationHours: number;
  modulesCount: number;
  lessonsCount: number;
  price: number;
  originalPrice?: number;
  rating: number;
  enrolledStudents: number;
  badge?: string;
  description: string;
  learningOutcomes: string[];
  whatYouWillLearn?: string[];
  syllabus: TrainingModule[];
  modules?: TrainingModule[];
  certificateIncluded: boolean;
  format: 'Onlayn Video Dərslər' | 'Canlı Vebinar' | 'Hibrid Proqram';
  language: string;
  faq: { question: string; answer: string }[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface Article {
  id: string;
  title: string;
  coverImage: string;
  category: string;
  readTimeMinutes: number;
  publishDate: string;
  author: {
    name: string;
    title: string;
    photo: string;
    bio?: string;
  };
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  tags: string[];
  relatedArticleIds?: string[];
}

export interface BookedAppointment {
  id: string;
  psychologistId: string;
  psychologistName: string;
  psychologistTitle: string;
  psychologistPhoto: string;
  date: string;
  timeSlot: string;
  format: 'online' | 'in_person';
  location: string;
  price: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  status: 'təsdiqləndi' | 'gözləmədə' | 'tamamlandı' | 'ləğv_edildi';
  meetingLink?: string;
  createdAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  courseTitle?: string;
  recipientName?: string;
  issueDate: string;
  credentialId?: string;
  certificateNumber?: string;
  instructorName: string;
  category?: string;
  score?: number;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  time?: string;
  timestamp?: string;
  read: boolean;
  type: 'appointment' | 'webinar' | 'course' | 'system';
  link?: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  paymentMethod?: string;
  status: 'uğurlu' | 'gözləmədə' | 'qaytarıldı' | 'tamamlandı';
  type: 'seans' | 'telim' | 'vebinar' | 'session' | 'course' | 'webinar';
}

export interface ScoreInterpretation {
  range: [number, number];
  severity?: string;
  level?: string;
  color?: string;
  badgeColor?: string;
  summary?: string;
  description?: string;
  recommendation?: string;
  recommendations?: string[];
  recommendedSpecialty?: string;
}

export interface SelfAssessment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  durationMinutes: number;
  questionsCount: number;
  badge?: string;
  questions: {
    id: number;
    text: string;
    options: {
      label: string;
      score: number;
    }[];
  }[];
  scoringRanges: ScoreInterpretation[];
}

export interface CourseEnrollment {
  id?: string;
  courseId: string;
  courseTitle: string;
  instructorName?: string;
  price?: number;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  clientName?: string;
  clientEmail?: string;
  enrolledAt: string;
}
