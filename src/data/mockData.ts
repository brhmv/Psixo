import { Psychologist, Webinar, TrainingCourse, Article, Certificate, UserNotification, Transaction, BookedAppointment } from '../types';

export const PSYCHOLOGISTS_DATA: Psychologist[] = [
  {
    id: 'dr-leyla-mammadova',
    name: 'Dr. Leyla Məmmədova',
    title: 'Klinik Psixoloq, PhD & CBT Terapevt',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    experienceYears: 12,
    rating: 4.98,
    reviewCount: 142,
    specializations: ['Təşviş və Panik Atak', 'Depressiya', 'Koqnitiv Davranış Terapiyası', 'Özünəinam', 'Obsessiv Pozuntu (OKP)'],
    consultationTypes: 'both',
    pricePerSession: 70,
    languages: ['Azərbaycan', 'İngilis', 'Rus'],
    education: [
      'Bakı Dövlət Universiteti - Psixologiya Fakültəsi (Bakalavr & Magistr)',
      'Hacettepe Universiteti - Klinik Psixologiya (Doktorantura, PhD, 2014-2018)'
    ],
    certifications: [
      'Beck Institute for Cognitive Behavior Therapy - Certified CBT Therapist',
      'Avropa Psixoterapiya Assosiasiyası (EAP) Həqiqi Üzvü',
      'EMDR Beynəlxalq Assosiasiyası (EMDRIA) - 1 və 2-ci Səviyyə Terapevt'
    ],
    bio: 'Dr. Leyla Məmmədova 12 ildən artıq klinik təcrübəyə malikdir. Müasir sübuta əsaslanan koqnitiv-davranış terapiyası (CBT) və EMDR metodları ilə təşviş pozuntuları, panik tutmalar, sosial fobiya və depressiyadan əziyyət çəkən pasiyentlərlə işləyir.',
    aboutTherapy: 'Mənim iş prinsipim hər bir fərdin unikal daxili resurslarını aşkar etmək və ona sübuta əsaslanan elmi texnikalarla daimi özünənəzarət bacarığı qazandırmaqdır. Seanslarımız tamamilə məxfi, mühakiməsiz və təhlükəsiz mühitdə həyata keçirilir.',
    location: 'Nizami küç. 142, Bakı & Onlayn Zoom / Dayaq Otağı',
    verified: true,
    nextAvailableSlot: 'Sabah, 14:00',
    availableDays: ['Bazar ertəsi', 'Çərşənbə axşamı', 'Cümə axşamı', 'Şənbə'],
    timeSlots: ['10:00', '11:30', '14:00', '16:00', '18:30'],
    services: [
      {
        title: 'Fərdi CBT Psixoterapiyası',
        description: 'Təşviş, qorxu, panik tutmalar və neqativ düşüncə tələləri üzərində fərdi dərin iş.',
        duration: '50 dəqiqə',
        price: 70
      },
      {
        title: 'EMDR Travma Terapiyası',
        description: 'Keçmiş ağır xatirələrin və travmatik hadisələrin emosional yükünün azaldılması.',
        duration: '60 dəqiqə',
        price: 85
      },
      {
        title: 'Onlayn Təcili Qiymətləndirmə Konsultasiyası',
        description: 'Kəskin stres və qərarvermə çətinliyi zamanı ilkin diaqnostik istiqamətləndirmə.',
        duration: '30 dəqiqə',
        price: 45
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Nigar K.',
        rating: 5,
        date: '14 Avqust 2026',
        comment: 'Leyla xanımla cəmi 4 seansdan sonra 2 ildir əziyyət çəkdiyim panik atakları idarə etməyi öyrəndim. Həyat keyfiyyətim tamamilə dəyişdi.'
      },
      {
        id: 'rev-2',
        author: 'Kamran Ə.',
        rating: 5,
        date: '2 Avqust 2026',
        comment: 'Çox peşəkar, həssas və dəqiq yanaşma. Hər seansdan sonra əldə etdiyim praktik texnikalar dərhal kömək edir.'
      }
    ],
    associatedWebinarIds: ['web-1', 'web-4'],
    associatedCourseIds: ['course-1']
  },
  {
    id: 'rashad-aliyev',
    name: 'Rəşad Əliyev',
    title: 'Ailə və Cütlük Psixoterapevti',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    experienceYears: 9,
    rating: 4.92,
    reviewCount: 98,
    specializations: ['Ailə Münasibətləri', 'Boşanma və Ayrılıq', 'Ünsiyyət Böhranı', 'Evlilik Terapiyası', 'Xəyanət Sonrası Bərpa'],
    consultationTypes: 'both',
    pricePerSession: 60,
    languages: ['Azərbaycan', 'Türk', 'Rus'],
    education: [
      'Azərbaycan Dillər Universiteti - Psixologiya',
      'İstanbul Universiteti - Ailə Məsləhətçiliyi və Terapiyası Magistraturası'
    ],
    certifications: [
      'The Gottman Institute - Level 2 Clinical Training in Gottman Method Couples Therapy',
      'Sistemik Ailə Terapiyası Beynəlxalq İxtisas Sertifikatı'
    ],
    bio: 'Rəşad Əliyev cütlüklər arasındakı ünsiyyət blokadaları, emosional uzaqlaşma, qısqanclıq və münasibət böhranlarının aradan qaldırılmasında ixtisaslaşıb. Gottman metodologiyasına əsaslanan terapiya tətbiq edir.',
    aboutTherapy: 'Məqsədim tərəfləri bir-birini mühakimə etmədən dinləməyə, gizli emosional ehtiyacları dərk etməyə və münasibətdə etibar bağını yenidən qurmağa yönəltməkdir.',
    location: '28 May filialı, Dilarə Əliyeva 220 & Onlayn',
    verified: true,
    nextAvailableSlot: 'Bu gün, 18:00',
    availableDays: ['Çərşənbə axşamı', 'Cümə', 'Şənbə'],
    timeSlots: ['11:00', '13:30', '16:30', '18:00', '19:30'],
    services: [
      {
        title: 'Cütlük və Evlilik Terapiyası',
        description: 'Tərəflərin birgə iştirakı ilə münasibətdəki böhranın həlli və ünsiyyətin bərpası.',
        duration: '75 dəqiqə',
        price: 80
      },
      {
        title: 'Fərdi Münasibət Məsləhəti',
        description: 'Ayrılıq, tərəf seçimində təkrarlanan səhvlər və emosional asılılıq üzrə fərdi seans.',
        duration: '50 dəqiqə',
        price: 60
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Elnur və Səbinə',
        rating: 5,
        date: '28 İyul 2026',
        comment: 'Evliliyimizin ən kritik anında Rəşad müəllimin yanına getdik. Dinləməyi və ortaq həll tapmağı öyrəndik.'
      }
    ],
    associatedWebinarIds: ['web-2'],
    associatedCourseIds: ['course-2']
  },
  {
    id: 'nargiz-qasimova',
    name: 'Nərgiz Qasımova',
    title: 'Uşaq və Yeniyetmə Psixoloqu, Neyropsixoloq',
    photo: 'https://images.unsplash.com/photo-1594824813589-322197e416a9?auto=format&fit=crop&q=80&w=600',
    experienceYears: 10,
    rating: 4.96,
    reviewCount: 115,
    specializations: ['Uşaq və Yeniyetmə', 'Hiperaktivlik və Diqqət Əskikliyi (ADHD)', 'Öyrənmə Çətinlikləri', 'Qorxular və Kaprizlər', 'Yeniyetməlik Böhranı'],
    consultationTypes: 'in_person',
    pricePerSession: 65,
    languages: ['Azərbaycan', 'İngilis'],
    education: [
      'Xəzər Universiteti - Psixologiya Departamenti',
      'Ankara Universiteti - İnkişaf Psixologiyası və Neyrokoqnitiv Elmlər'
    ],
    certifications: [
      'WISC-IV Zəka Testi Tətbiqçisi Rəsmi Lisenziyası',
      'Oyun Terapiyası Assosiasiyası (APT) Sertifikatlı Mütəxəssis',
      'CAS (Cognitive Assessment System) Sertifikatı'
    ],
    bio: 'Uşaqların psixoloji inkişafı, məktəbə adaptasiya, aqressiya və davranış pozuntuları, hiperaktivlik və yeniyetməlik böhranı üzrə ixtisaslaşıb. Oyun terapiyası və neyrokoqnitiv inkişaf metodlarından istifadə edir.',
    aboutTherapy: 'Uşağın daxili aləmini oyun və yaradıcı ifadə vasitəsilə anlayır, valideynlərlə birgə ahəngdar dəstək sistemi qururuq.',
    location: 'Elmlər Akademiyası filialı, Zahid Xəlilov 33',
    verified: true,
    nextAvailableSlot: 'Cümə axşamı, 11:00',
    availableDays: ['Bazar ertəsi', 'Çərşənbə', 'Cümə axşamı'],
    timeSlots: ['10:00', '11:00', '15:00', '16:30'],
    services: [
      {
        title: 'Uşaq Oyun Terapiyası Seansı',
        description: 'Oyun vasitəsilə emosional blokadaların, qorxuların və aqressiyanın korreksiyası.',
        duration: '45 dəqiqə',
        price: 65
      },
      {
        title: 'Valideyn Məsləhətləşməsi və Tərbiyə Strategiyası',
        description: 'Uşağın inkişaf xüsusiyyətlərinə uyğun fərdi tərbiyə planı və bələdçilik.',
        duration: '50 dəqiqə',
        price: 60
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Aysel M.',
        rating: 5,
        date: '10 Avqust 2026',
        comment: 'Oğlumun məktəbdəki qapanma problemini Nərgiz xanım çox qısa müddətdə oyun terapiyası ilə həll etdi.'
      }
    ],
    associatedWebinarIds: ['web-3'],
    associatedCourseIds: ['course-3']
  },
  {
    id: 'tural-huseynov',
    name: 'Tural Hüseynov',
    title: 'Koqnitiv Terapevt & Korporativ Mental Kouç',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    experienceYears: 8,
    rating: 4.90,
    reviewCount: 84,
    specializations: ['Tükənmişlik (Burnout)', 'İş Stresi', 'Qərarvermə və Liderlik', 'Emosional Zəka', 'İmposter Sindromu'],
    consultationTypes: 'online',
    pricePerSession: 55,
    languages: ['Azərbaycan', 'İngilis', 'Rus'],
    education: [
      'London School of Economics - Organizational Psychology Certificate',
      'Bakı Dövlət Universiteti - Sosial Psixologiya'
    ],
    certifications: [
      'International Coaching Federation (ICF) - Professional Certified Coach (PCC)',
      'Mindfulness-Based Stress Reduction (MBSR) Təlimçisi'
    ],
    bio: 'Müasir iş mühitində yüksək stres, peşəkar tükənmişlik, motivasiya itkisi və zaman idarəetməsi problemləri ilə işləyən ekspert. Rəhbər şəxslər, IT mütəxəssisləri və sahibkarlar üçün fərdi seanslar keçir.',
    aboutTherapy: 'Hədəf yönümlü, aydın metodlar və zehni aydınlığı bərpa edən fərdi texnikalarla çalışırıq.',
    location: 'Yalnız Onlayn (Zoom / Google Meet)',
    verified: true,
    nextAvailableSlot: 'Sabah, 17:00',
    availableDays: ['Bazar ertəsi', 'Çərşənbə axşamı', 'Cümə axşamı', 'Şənbə', 'Bazar'],
    timeSlots: ['12:00', '15:00', '17:00', '19:00', '20:30'],
    services: [
      {
        title: 'Peşəkar Burnout və Stres Bərpası',
        description: 'İşdən bezmə, tükənmə və xroniki yorğunluğu aradan qaldırmaq üçün 1-on-1 kouçinq.',
        duration: '50 dəqiqə',
        price: 55
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Rauf İ.',
        rating: 5,
        date: '5 Avqust 2026',
        comment: 'İşdəki inanılmaz təzyiq və tükənmə dövründə Tural bəylə seanslar məni yenidən ayağa qaldırdı.'
      }
    ],
    associatedWebinarIds: ['web-1'],
    associatedCourseIds: ['course-4']
  },
  {
    id: 'aysel-ismayilova',
    name: 'Aysel İsmayılova',
    title: 'Geştalt Terapevt & Travma Mütəxəssisi',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    experienceYears: 11,
    rating: 4.95,
    reviewCount: 130,
    specializations: ['Keçmiş Travmalar', 'Kədər və Yas Prosesi', 'Bədən Yönümlü Terapiya', 'Özünəhörmət', 'Daxili Tənqidçi'],
    consultationTypes: 'both',
    pricePerSession: 65,
    languages: ['Azərbaycan', 'Rus'],
    education: [
      'Moskva Geştalt İnstitutu (MGI) - Sertifikatlı Geştalt Terapevt',
      'Azərbaycan Dövlət Pedaqoji Universiteti - Psixologiya'
    ],
    certifications: [
      'Avropa Geştalt Terapiyası Assosiasiyası (EAGT) Üzvü',
      'Somatic Experiencing (Bədən Yönümlü Travma Terapiyası)'
    ],
    bio: 'Pasiyentlərə keçmiş travmaların bədəndə və şüurda yaratdığı yükdən azad olmağa, daxili resurslarını kəşf etməyə və indiki zamanda dolğun yaşamağa dəstək olur.',
    aboutTherapy: 'Hər bir emosiya dəyərlidir. Birlikdə hisslərinizi anlamaq və qəbul etmək üçün təhlükəsiz zəmin yaradırıq.',
    location: 'Nərimanov filialı, Təbriz küç. 88 & Onlayn',
    verified: true,
    nextAvailableSlot: 'Bazar ertəsi, 15:30',
    availableDays: ['Bazar ertəsi', 'Çərşənbə', 'Cümə'],
    timeSlots: ['11:00', '13:00', '15:30', '17:30'],
    services: [
      {
        title: 'Geştalt Psixoterapiyası',
        description: 'Öz hisslərini bədən səviyyəsində anlamaq və bitməmiş keçmiş işləri tamamlamaq.',
        duration: '50 dəqiqə',
        price: 65
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Lalə V.',
        rating: 5,
        date: '1 Avqust 2026',
        comment: 'Aysel xanımın sakitliyi və dərin biliyi insana dərhal rahatlıq və güvən verir.'
      }
    ],
    associatedWebinarIds: ['web-2'],
    associatedCourseIds: []
  },
  {
    id: 'farid-hasanov',
    name: 'Fərid Həsənov',
    title: 'Asılılıqlar və Davranış Pozuntuları Terapevti',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    experienceYears: 14,
    rating: 4.89,
    reviewCount: 77,
    specializations: ['Rəqəmsal Asılılıq', 'Qidalanma Davranışı Pozuntuları', 'Qumar və Oyun Asılılığı', 'İmpulsivlik'],
    consultationTypes: 'both',
    pricePerSession: 75,
    languages: ['Azərbaycan', 'Türk', 'İngilis'],
    education: [
      'Ege Universiteti - Tibbi Psixologiya Magistraturası',
      'Bakı Dövlət Universiteti'
    ],
    certifications: [
      'Motivasion Müsahibə (Motivational Interviewing) Təlimçisi',
      'Qidalanma Pozuntuları üzrə CBT-E Sertifikatı'
    ],
    bio: 'Fərid Həsənov vərdişlərin formalaşması, emosional yemə, rəqəmsal asılılıqlar və impuls nəzarəti mövzusunda ölkənin qabaqcıl mütəxəssislərindəndir.',
    aboutTherapy: 'Asılılıq iradə zəifliyi deyil, emosional ehtiyacın reaksiyasıdır. Biz kök səbəbləri araşdırır və davamlı həll yolları qururuq.',
    location: 'Gənclik filialı, Fətəli Xan Xoyski 110 & Onlayn',
    verified: true,
    nextAvailableSlot: 'Sabah, 12:00',
    availableDays: ['Çərşənbə', 'Cümə axşamı', 'Şənbə'],
    timeSlots: ['10:00', '12:00', '14:30', '17:00'],
    services: [
      {
        title: 'Asılılıq Korreksiyası və Vərdiş İdarəetməsi',
        description: 'Zərərli vərdişlərdən azad olmaq üçün fərdi psixoterapiya proqramı.',
        duration: '55 dəqiqə',
        price: 75
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Murad S.',
        rating: 5,
        date: '18 İyul 2026',
        comment: 'Dəqiq və konkret hərəkət planı ilə işləyən nadir mütəxəssislərdən biridir.'
      }
    ],
    associatedWebinarIds: ['web-4'],
    associatedCourseIds: []
  }
];

export const WEBINARS_DATA: Webinar[] = [
  {
    id: 'web-1',
    title: 'Stress və Narahatlıqla Mübarizə: CBT və Nəfəs Texnikaları',
    subtitle: 'Gündəlik təşvişi minimuma endirmək və panik hücumları anında dayandırmaq üçün praktiki seminar',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    speaker: {
      id: 'dr-leyla-mammadova',
      name: 'Dr. Leyla Məmmədova',
      title: 'Klinik Psixoloq, PhD',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      bio: 'Beck Institute sertifikatlı CBT terapevt, 12+ il klinik təcrübə.'
    },
    category: 'Təşviş və Stres',
    type: 'upcoming',
    date: '25 Avqust 2026',
    time: '20:00 - 21:30',
    durationMinutes: 90,
    price: 15,
    originalPrice: 30,
    isFree: false,
    registeredCount: 184,
    about: 'Bu canlı vebinarda Dr. Leyla Məmmədova təşvişin neyrobioloji mexanizmini və beyində yaranan həyəcan siqnalını dərhal sakitləşdirən 3 əsas CBT texnikasını nümayiş etdirəcək. Canlı Sual-Cavab sessiyası daxildir.',
    whatYouWillLearn: [
      'Panik atak və həyəcan anında bədəndə baş verənləri anlamaq',
      'Diafraqmal tənəffüs və mütərəqqi əzələ relaksasiyası ilə kortizolu azaltmaq',
      'Katastrofik neqativ düşüncələri rasional baxışla dəyişmək',
      'Təşvişin təkrar qayıtmasının qarşısını almaq üçün krizis planı'
    ],
    agenda: [
      {
        timeRange: '20:00 - 20:20',
        topic: 'Təşvişin Beyindəki Şifrəsi',
        description: 'Amigdalanın iş prinsipi və stress reaksiyası'
      },
      {
        timeRange: '20:20 - 20:50',
        topic: 'Praktik CBT Texnikaları və Tənəffüs',
        description: 'İştirakçılarla birgə canlı tətbiq və məşqlər'
      },
      {
        timeRange: '20:50 - 21:30',
        topic: 'İnteraktiv Sual-Cavab (Q&A)',
        description: 'İştirakçıların fərdi suallarının cavablandırılması'
      }
    ],
    faq: [
      {
        question: 'Vebinarın video yazısı təqdim ediləcəkmi?',
        answer: 'Bəli, qeydiyyatdan keçən bütün iştirakçılara vebinardan sonra video yazı və təqdimat materialları göndəriləcək.'
      },
      {
        question: 'Canlı sual vermək imkanı olacaqmı?',
        answer: 'Bəli, vebinar zamanı xüsusi Q&A çatından istifadə edərək spikerə birbaşa sual ünvanlaya biləcəksiniz.'
      }
    ]
  },
  {
    id: 'web-2',
    title: 'Münasibətlərdə Sağlam Sərhədlər və Ünsiyyət Böhranı',
    subtitle: 'Partnyorunuzu incitmədən "Yox" demək və emosional manipulyasiyaların qarşısını almaq',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    speaker: {
      id: 'rashad-aliyev',
      name: 'Rəşad Əliyev',
      title: 'Ailə və Cütlük Psixoloqu',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
      bio: 'Gottman metodologiyası üzrə sertifikatlı ailə məsləhətçisi.'
    },
    category: 'Münasibətlər',
    type: 'live',
    date: 'Bu gün',
    time: 'Canlı Yayım Davam Edir',
    durationMinutes: 75,
    price: 0,
    isFree: true,
    registeredCount: 340,
    about: 'Sağlam sərhəd qoymaq başqalarını itirmək qorxusu olmadan öz dəyərlərini qorumaqdır. Rəşad Əliyev bu vebinarda toksik ünsiyyət tələlərindən çıxış yollarını bölüşür.',
    whatYouWillLearn: [
      'İnsanları razı salmaq (People-pleasing) vərdişindən qurtulmaq',
      '"Mən" dili ilə konflikt yaratmadan narazılığı bildirmək',
      'Partnyorla emosional yaxınlığı qoruyaraq şəxsi məkanı saxlamaq'
    ],
    agenda: [
      {
        timeRange: 'Giriş',
        topic: 'Sərhəd anlayışı və qorxular',
        description: 'Niyə yox deyə bilmirik?'
      },
      {
        timeRange: 'Praktika',
        topic: 'Assertiv dialoq simulyasiyası',
        description: 'Nümunə situasiyaların təhlili'
      }
    ],
    faq: [
      {
        question: 'İştirak üçün ödəniş tələb olunurmu?',
        answer: 'Xeyr, bu xüsusi maarifləndirici vebinar ictimaiyyət üçün tamamilə ödənişsizdir.'
      }
    ]
  },
  {
    id: 'web-3',
    title: 'Uşaqlarda Qəzəb və Kaprizlər: Valideynlər üçün Bələdçi',
    subtitle: 'Qışqırmadan və cəzalandırmadan uşağın emosiyalarını necə tənzimləməli?',
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800',
    speaker: {
      id: 'nargiz-qasimova',
      name: 'Nərgiz Qasımova',
      title: 'Uşaq Psixoloqu',
      photo: 'https://images.unsplash.com/photo-1594824813589-322197e416a9?auto=format&fit=crop&q=80&w=300',
      bio: 'Oyun terapiyası və inkişaf psixologiyası mütəxəssisi.'
    },
    category: 'Uşaq Psixologiyası',
    type: 'recorded',
    date: '10 Avqust 2026',
    time: 'Video Yazı (60 dəq)',
    durationMinutes: 60,
    price: 10,
    originalPrice: 25,
    isFree: false,
    registeredCount: 220,
    about: 'Uşağın aqressiyası və qəzəbi onun daxili tələbatının kömək çağırışıdır. Bu vebinar yazısında valideynlərin ən çox etdiyi səhvlər və düzgün reaksiya addımları izah olunur.',
    whatYouWillLearn: [
      '2-7 yaş arası qəzəb tutmalarının (tantrum) idarəsi',
      'Valideynin öz daxili sakitliyini qoruması üçün texnikalar',
      'Məsuliyyət və intizamı sevgi ilə aşılamaq'
    ],
    agenda: [
      {
        timeRange: '0 - 20 dəq',
        topic: 'Uşaq beyninin emosional inkişafı',
        description: 'Niyə uşaqlar məntiqlə düşünə bilmir?'
      },
      {
        timeRange: '20 - 60 dəq',
        topic: 'Praktik böhran həlləri',
        description: 'Mağazada, evdə və qonaqlıqda kaprizlər'
      }
    ],
    faq: [
      {
        question: 'Video yazıya nə qədər müddət baxa bilərəm?',
        answer: 'Alışdan sonra videoya 1 il ərzində istənilən vaxt baxa bilərsiniz.'
      }
    ]
  },
  {
    id: 'web-4',
    title: 'Rəqəmsal Asılılıq və Dopamin Detoksu',
    subtitle: 'Telefon asılılığından qurtulmaq, diqqəti toplamaq və beyni yenidən formatlamaq',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    speaker: {
      id: 'farid-hasanov',
      name: 'Fərid Həsənov',
      title: 'Asılılıq Terapevti',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      bio: 'Ege Universiteti məzunu, davranış asılılıqları üzrə ekspert.'
    },
    category: 'Şəxsi İnkişaf',
    type: 'free',
    date: '28 Avqust 2026',
    time: '19:30 - 20:30',
    durationMinutes: 60,
    price: 0,
    isFree: true,
    registeredCount: 410,
    about: 'Sosial şəbəkələrin dopamin tələləri beynimizi necə yorur və daimi diqqət dağınıqlığı yaradır? Praktik 7 günlük dopamin bərpası planı.',
    whatYouWillLearn: [
      'Sosial şəbəkələrin asılılıq alqoritmlərini anlamaq',
      'Telefonsuz fokuslanma rejimləri qurmaq',
      'Dopamin reseptorlarının həssaslığını bərpa etmək'
    ],
    agenda: [
      {
        timeRange: '19:30 - 20:00',
        topic: 'Neyrobiologiya və Dopamin Dövrü',
        description: 'Niyə telefonu yerə qoya bilmirik?'
      },
      {
        timeRange: '20:00 - 20:30',
        topic: '7 Günlük Detoks Rejimi',
        description: 'Praktik addımlar və qaydalar'
      }
    ],
    faq: [
      {
        question: 'Vebinar kimlər üçündür?',
        answer: 'Daimi ekran qarşısında olan, konsentrasiya çətinliyi yaşayan tələbə və mütəxəssislər üçün.'
      }
    ]
  }
];

export const COURSES_DATA: TrainingCourse[] = [
  {
    id: 'course-1',
    title: 'Təşviş və Panik Tutmaların CBT ilə İdarə Edilməsi',
    subtitle: 'Elmi əsaslı Koqnitiv Davranış Terapiyası texnikaları ilə həyəcanı minimuma endirmək',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    instructor: {
      id: 'dr-leyla-mammadova',
      name: 'Dr. Leyla Məmmədova',
      title: 'Klinik Psixoloq, PhD',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      bio: 'Beck Institute sertifikatlı CBT mütəxəssisi.'
    },
    category: 'Emosional Sağlamlıq',
    level: 'Bütün səviyyələr',
    durationHours: 8.5,
    modulesCount: 4,
    lessonsCount: 18,
    price: 49,
    originalPrice: 89,
    rating: 4.97,
    enrolledStudents: 620,
    badge: 'Ən Çox Seçilən',
    description: 'Bu kurs gündəlik həyatda həyəcan, səbəbsiz qorxular, panik atak tutmaları və gərginliklə mübarizə aparan hər kəs üçün praktik bələdçidir. Real nümunələr və gündəlik tətbiq üçün tapşırıqlar daxildir.',
    learningOutcomes: [
      'Panik atakın fizioloji mexanizmini və qorxusuz qarşılama üsullarını öyrənmək',
      'Avtomatik neqativ düşüncələri (ANF) aşkar edib yenidən çərçivələmək',
      'Diafraqmal tənəffüs və mütərəqqi əzələ relaksasiyası texnikalarını mənimsəmək',
      'Təşviş günlüyü apararaq daxili sakitliyi davamlı saxlamaq'
    ],
    syllabus: [
      {
        id: 'mod-1',
        title: 'Modul 1: Təşvişin Anatomiyası və Beynimizin Qoruma Mexanizmi',
        duration: '1 saat 45 dəq',
        lessons: [
          {
            id: 'les-1-1',
            title: 'Təşviş nədir və nə vaxt problemə çevrilir?',
            duration: '18 dəq',
            type: 'video',
            freePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Təşvişin bioloji mənşəyi və faydalı həyəcanla dağıdıcı təşviş arasındakı fərqlər.',
            resources: [{ name: 'Təşviş Şkalası PDF', url: '#', size: '1.2 MB' }]
          },
          {
            id: 'les-1-2',
            title: 'Panik atak zamanı bədəndə nələr baş verir?',
            duration: '22 dəq',
            type: 'video',
            freePreview: true,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Ürək döyüntüsü, boğulma hissi və başgicəllənmənin zərərsiz fizioloji izahı.'
          },
          {
            id: 'les-1-3',
            title: 'Təşviş və Qorxu Fərqi - Fərdi Qiymətləndirmə',
            duration: '15 dəq',
            type: 'quiz',
            description: 'Öz narahatlıq tetikləyicilərinizi təyin etmək üçün test.'
          },
          {
            id: 'les-1-4',
            title: 'Zərərli Düşüncə Tələləri: Katastrofizasiya',
            duration: '25 dəq',
            type: 'video',
            description: 'Ən pis ssenarini düşünmə vərdişini dayandırmaq.'
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Modul 2: Koqnitiv Yenidənqurma (CBT Metodları)',
        duration: '2 saat 30 dəq',
        lessons: [
          {
            id: 'les-2-1',
            title: 'Düşüncə Qeydiyyatı Cədvəli ilə İş',
            duration: '30 dəq',
            type: 'video',
            description: 'Neqativ fikirləri kağıza köçürüb sınaqdan keçirmək.'
          },
          {
            id: 'les-2-2',
            title: 'Sokratik Sorğulama ilə Düşüncəni Sınağa Çəkmək',
            duration: '28 dəq',
            type: 'video',
            description: 'Düşüncənin həqiqət yoxsa fərziyyə olduğunu yoxlamaq.'
          },
          {
            id: 'les-2-3',
            title: 'Praktik Çalışma: Düşüncə İmtahanı Vərəqi',
            duration: '20 dəq',
            type: 'practice',
            description: 'Gündəlik situasiyada tətbiq.'
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Modul 3: Bədən və Nəfəs İdarəetməsi',
        duration: '2 saat 15 dəq',
        lessons: [
          {
            id: 'les-3-1',
            title: '4-7-8 və Qutu Nəfəsi Texnikaları (Bələdçi ilə)',
            duration: '20 dəq',
            type: 'video',
            description: 'Canlı tənəffüs bələdçisi ilə sakitləşmə.'
          },
          {
            id: 'les-3-2',
            title: 'Ceykobson Mütərəqqi Əzələ Boşaltması',
            duration: '25 dəq',
            type: 'video',
            description: 'Bədəndə yığılan gərginliyi boşaltmaq.'
          }
        ]
      },
      {
        id: 'mod-4',
        title: 'Modul 4: İrəliyə Baxış və Təkrarın Qarşısının Alınması',
        duration: '2 saat',
        lessons: [
          {
            id: 'les-4-1',
            title: 'Ekspozisiya (Üzləşmə) Terapiyası addım-addım',
            duration: '35 dəq',
            type: 'video',
            description: 'Qorxulan situasiyalara təhlükəsiz adaptasiya.'
          },
          {
            id: 'les-4-2',
            title: 'Yekun İmtahan və Rəsmi Sertifikat',
            duration: '25 dəq',
            type: 'quiz',
            description: 'Kurs üzrə yekun qiymətləndirmə testi.'
          }
        ]
      }
    ],
    certificateIncluded: true,
    format: 'Onlayn Video Dərslər',
    language: 'Azərbaycan dili',
    faq: [
      {
        question: 'Dərslərə istənilən vaxt baxa bilərəmmi?',
        answer: 'Bəli, dərslər öncədən yazılmış yüksək keyfiyyətli video formatdadır və ömürlük çıxışınız olur.'
      },
      {
        question: 'Sertifikat necə əldə edilir?',
        answer: 'Bütün video dərsləri izlədikdən və yekun testi 70%+ nəticə ilə bitirdikdən sonra QR kodlu rəsmi sertifikatınız profilinizə əlavə olunur.'
      }
    ],
    reviews: [
      {
        id: 'cr-1',
        author: 'Səmra Q.',
        rating: 5,
        date: '12 Avqust 2026',
        comment: 'İnanılmaz dərəcədə aydın və praktik kursdur. Düşüncə qeydiyyatı cədvəli mənim xilaskarıma çevrildi.'
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Emosional Zəka və Sağlam Şəxsi Sərhədlər',
    subtitle: 'Öz hisslərini anlamaq, mühakiməsiz "Yox" demək və toksik münasibətlərdən qorunmaq',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    instructor: {
      id: 'rashad-aliyev',
      name: 'Rəşad Əliyev',
      title: 'Ailə və Cütlük Psixoloqu',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
      bio: 'İstanbul Universiteti magistri, münasibət mütəxəssisi.'
    },
    category: 'Münasibətlər & İnkişaf',
    level: 'Bütün səviyyələr',
    durationHours: 6.0,
    modulesCount: 3,
    lessonsCount: 14,
    price: 45,
    originalPrice: 75,
    rating: 4.93,
    enrolledStudents: 480,
    badge: 'Yeni',
    description: 'Sağlam sərhədlər eqoizm deyil, psixi sağlamlığın təməlidir. Bu təlimdə başqalarını incitmədən öz dəyərlərinizi qorumağı və emosional tükənmədən qurtulmağı öyrənəcəksiniz.',
    learningOutcomes: [
      'Emosional manipulyasiyaları dərhal tanımaq və cavab vermək',
      'Günahkarlıq hissi keçirmədən qətiyyətli "Yox" demək bacarığı',
      'Ailə, iş və partnyor münasibətlərində sağlam sərhəd xəritəsi qurmaq',
      'Öz ehtiyaclarını səmimi və aydın ifadə etmək (Assertiv ünsiyyət)'
    ],
    syllabus: [
      {
        id: 'mod-2-1',
        title: 'Modul 1: Şəxsi Sərhədlərin Tipləri',
        duration: '1 saat 30 dəq',
        lessons: [
          {
            id: 'les-2-1-1',
            title: 'Sərhəd nədir: Keçirici, Qatı və Sağlam Sərhədlər',
            duration: '20 dəq',
            type: 'video',
            freePreview: true,
            description: 'Üç əsas sərhəd tipinin təhlili.'
          },
          {
            id: 'les-2-1-2',
            title: 'Niyə "Yox" deyə bilmirik? İnsanları razı salmaq vərdişi',
            duration: '25 dəq',
            type: 'video',
            description: 'Uşaqlıq travmaları və təsdiq ehtiyacı.'
          }
        ]
      },
      {
        id: 'mod-2-2',
        title: 'Modul 2: Assertiv (Qətiyyətli) Ünsiyyət Modeli',
        duration: '2 saat',
        lessons: [
          {
            id: 'les-2-2-1',
            title: 'Qurban, Təqibçi və Xilaskar Üçbucağından Çıxış',
            duration: '30 dəq',
            type: 'video',
            description: 'Karpman dram üçbucağının analizi.'
          },
          {
            id: 'les-2-2-2',
            title: '"Mən" Dili ilə Danışmaq və Konfliktsiz İzah',
            duration: '25 dəq',
            type: 'video',
            description: 'Qarşı tərəfi müdafiəyə keçirmədən danışmaq.'
          }
        ]
      }
    ],
    certificateIncluded: true,
    format: 'Onlayn Video Dərslər',
    language: 'Azərbaycan dili',
    faq: [
      {
        question: 'Kurs materiallarına ömürlük çıxış varmı?',
        answer: 'Bəli, istədiyiniz vaxt təkrar izləyə bilərsiniz.'
      }
    ],
    reviews: [
      {
        id: 'cr-2',
        author: 'Fəridə M.',
        rating: 5,
        date: '8 Avqust 2026',
        comment: 'Artıq işdə hər xahişə "hə" deyib gecələr işləmirəm. Çox təşəkkürlər!'
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Valideynlər üçün Müasir Uşaq Psixologiyası Masterklassı',
    subtitle: 'Böhran dövrləri, kaprizlər, qorxular və ekran asılılığı ilə düzgün rəftar',
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800',
    instructor: {
      id: 'nargiz-qasimova',
      name: 'Nərgiz Qasımova',
      title: 'Uşaq Psixoloqu',
      photo: 'https://images.unsplash.com/photo-1594824813589-322197e416a9?auto=format&fit=crop&q=80&w=300',
      bio: 'Oyun terapiyası və uşaq inkişafı mütəxəssisi.'
    },
    category: 'Uşaq Psixologiyası',
    level: 'Bütün səviyyələr',
    durationHours: 10.0,
    modulesCount: 4,
    lessonsCount: 22,
    price: 59,
    originalPrice: 99,
    rating: 4.99,
    enrolledStudents: 740,
    badge: 'Populyar',
    description: '0-14 yaş arası uşaq böyüdən valideynlər, müəllimlər və tərbiyəçilər üçün hazırlanmış hərtərəfli elmi və praktik proqram.',
    learningOutcomes: [
      '2 və 3 yaş böhranı, inadkarlıq və qəzəb tutmalarını düzgün idarə etmək',
      'Cəza və qışqırmadan intizam formalaşdırmaq',
      'Uşaqda güclü özgüvən və emosional dayanıqlıq aşılamaq',
      'Qadcet və ekran istifadəsini sağlam normada saxlamaq'
    ],
    syllabus: [
      {
        id: 'mod-3-1',
        title: 'Modul 1: Uşaq Beyninin İnkişaf Mərhələləri',
        duration: '2 saat 15 dəq',
        lessons: [
          {
            id: 'les-3-1-1',
            title: 'Emosional Beyin və Məntiq Beyni Fərqi',
            duration: '25 dəq',
            type: 'video',
            freePreview: true,
            description: 'Uşaq niyə məntiqə qulaq asmır?'
          },
          {
            id: 'les-3-1-2',
            title: 'Tantrum və Qəzəb Anında Nə Etməli?',
            duration: '30 dəq',
            type: 'video',
            description: 'Qışqırmadan sakitləşdirmək.'
          }
        ]
      }
    ],
    certificateIncluded: true,
    format: 'Onlayn Video Dərslər',
    language: 'Azərbaycan dili',
    faq: [
      {
        question: 'Kurs hansı yaş qrupunu əhatə edir?',
        answer: '0-14 yaş arası uşaqların psixologiyasını əhatə edir.'
      }
    ],
    reviews: [
      {
        id: 'cr-3',
        author: 'Kəmalə T.',
        rating: 5,
        date: '2 Avqust 2026',
        comment: 'Hər bir valideynin mütləq izləməli olduğu şah əsərdir.'
      }
    ]
  },
  {
    id: 'course-4',
    title: 'İşdə Tükənmişlik (Burnout) və Stres İdarəetməsi',
    subtitle: 'Enerjini bərpa etmək, peşəkar tükənməni dayandırmaq və motivasiyanı yeniləmək',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    instructor: {
      id: 'tural-huseynov',
      name: 'Tural Hüseynov',
      title: 'Mental Kouç & Təşkilati Psixoloq',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      bio: 'ICF PCC Kouç, LSE məzunu.'
    },
    category: 'Peşəkar İnkişaf',
    level: 'Orta',
    durationHours: 5.0,
    modulesCount: 3,
    lessonsCount: 12,
    price: 39,
    originalPrice: 65,
    rating: 4.91,
    enrolledStudents: 310,
    badge: 'Praktik Təlim',
    description: 'Daim yorğunluq, işə getmək istəməmək, konsentrasiya çatışmazlığı və motivasiya itkisinin qarşısını almaq üçün sistemli təlim.',
    learningOutcomes: [
      'Xroniki stresin 3 mərhələsini tanımaq və ilkin siqnalları tutmaq',
      'Mikro-istirahət və enerjinin bərpası texnikalarını öyrənmək',
      'İş və şəxsi həyat balansını (Work-Life Balance) qurmaq',
      'Beyin dumanlığını (Brain fog) aradan qaldırmaq'
    ],
    syllabus: [
      {
        id: 'mod-4-1',
        title: 'Modul 1: Tükənmişliyin Diaqnostikası',
        duration: '1 saat 30 dəq',
        lessons: [
          {
            id: 'les-4-1-1',
            title: 'Yorğunluq yoxsa Burnout? Fərqi ayırd etmək',
            duration: '22 dəq',
            type: 'video',
            freePreview: true,
            description: 'Kortizol tükənməsi və emosional boşalma.'
          }
        ]
      }
    ],
    certificateIncluded: true,
    format: 'Onlayn Video Dərslər',
    language: 'Azərbaycan dili',
    faq: [],
    reviews: []
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'panik-atak-5-deqiqede-sakitleshdirme',
    title: 'Panik Atak Anında Bədəndə Nə Baş Verir və Onu 5 Dəqiqədə Necə Sakitləşdirmək Olar?',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    category: 'Təşviş və Panik',
    readTimeMinutes: 5,
    publishDate: '12 Avqust 2026',
    author: {
      name: 'Dr. Leyla Məmmədova',
      title: 'Klinik Psixoloq, PhD',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      bio: 'Beck Institute sertifikatlı CBT terapevt.'
    },
    excerpt: 'Panik atak ölümcül deyil, lakin bədənin yanlış yanğın siqnalizasiyası kimi işləyir. Bu bələdçidə dərhal tətbiq edə biləcəyiniz 5-4-3-2-1 torpaqlanma qaydası izah olunur.',
    content: [
      'Panik atak anında beyindəki "amigdala" mərkəzi faktiki təhlükə olmadığını bilsə də, bədənə qəfil adrenalin ifraz etməyi əmr edir. Ürək döyüntülərinin artması, boğulma hissi və başgicəllənmə məhz bu təbii qorunma refleksinin nəticəsidir.',
      'Əsas sirr bədənə "Mən təhlükəsizlikdəyəm" siqnalını çatdırmaqdır. Bunun ən sürətli yolu tənəffüsü tənzimləmək və diqqəti daxili hissiyatlardan xarici mühitə yönəltməkdir.',
      'Torpaqlanma (Grounding) 5-4-3-2-1 Texnikası:\n1. Otaqda gördüyünüz 5 əşyanı adlandırın\n2. Toxuna bildiyiniz 4 fərqli fakturanı (paltarınız, masa, telefon) hiss edin\n3. Ətrafda eşitdiyiniz 3 səsi dinləyin\n4. Qoxusunu ala bildiyiniz 2 şeyi təyin edin\n5. Ağzınızdakı 1 dadı hiss edin.',
      'Unutmayın: Panik atak adətən 10-15 dəqiqə ərzində öz pik həddinə çatır və tədricən zəifləyir. Heç bir panik atak bədənə fiziki zərər vurmur.'
    ],
    keyTakeaways: [
      'Panik atak ürək tutması və ya dəlilik deyil — fizioloji adrenalin dalğasıdır.',
      'Dərin nəfəs vermək parasimpatik sinir sistemini dərhal aktivləşdirir.',
      'Atak zamanı qaçmaq əvəzinə durub bədəni boşaltmaq beynə sakitlik mesajı verir.'
    ],
    tags: ['Panik Atak', 'Təşviş', 'Özünəkömək', 'CBT'],
    relatedArticleIds: ['sexsi-serhedler-yox-demek', 'usaqlarda-qezeb-tutmalari-tantrum']
  },
  {
    id: 'sexsi-serhedler-yox-demek',
    title: 'Şəxsi Sərhədlər: Niyə İnsanlara "Yox" Demək Sizi Eqoist Etmir?',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    category: 'Münasibətlər',
    readTimeMinutes: 6,
    publishDate: '8 Avqust 2026',
    author: {
      name: 'Rəşad Əliyev',
      title: 'Ailə Psixoloqu',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    excerpt: 'Hər kəsi razı salmağa çalışarkən öz ehtiyaclarınızı arxa plana atırsınızsa, daxilinizdə yığılan qəzəb münasibətləri zədələyir.',
    content: [
      'Uşaqlıqdan bəri bizə "yaxşı və yardımsevər" olmağın hər kəsin istəyini yerinə yetirməkdən keçdiyi aşılanır. Lakin sərhədsiz sevgi və fədakarlıq bir müddət sonra xroniki yorğunluq, tükənmişlik və daxili inciklik yaradır.',
      'Sərhəd qoymaq başqalarına qarşı divar hörmək deyil, qapıya qıfıl qoyaraq kimin daxil olacağını seçmək hüququdur. Sağlam insanlar sizin sərhədlərinizə hörmətlə yanaşır.',
      'Qətiyyətli "Yox" demək üçün sadə qəlib: "Mənə müraciət etdiyin üçün təşəkkür edirəm, lakin hazırkı qrafikim buna imkan vermir."'
    ],
    keyTakeaways: [
      'Başqasının istəyinə "Yox" demək, öz ruh sağlamlığınıza "Bəli" deməkdir.',
      'İlk dövrlərdə günahkarlıq hissi keçirmək təbiidir.',
      'Sərhədsiz münasibət davamlı ola bilməz.'
    ],
    tags: ['Sərhədlər', 'Münasibət', 'Özgüvən', 'Ünsiyyət'],
    relatedArticleIds: ['panik-atak-5-deqiqede-sakitleshdirme']
  },
  {
    id: 'usaqlarda-qezeb-tutmalari-tantrum',
    title: 'Uşaqlarda Qəzəb Tutmaları (Tantrum): Valideynlərin Ən Çox Etdiyi 3 Səhv',
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800',
    category: 'Uşaq Psixologiyası',
    readTimeMinutes: 7,
    publishDate: '2 Avqust 2026',
    author: {
      name: 'Nərgiz Qasımova',
      title: 'Uşaq Psixoloqu',
      photo: 'https://images.unsplash.com/photo-1594824813589-322197e416a9?auto=format&fit=crop&q=80&w=200'
    },
    excerpt: 'Uşaq yerə uzanıb qışqıranda qışqırmaq və ya dərhal istədiyini vermək problemi daha da dərinləşdirir. Effektiv emosional tənzimləmə addımları.',
    content: [
      '2-4 yaş arası uşaqlar güclü hisslər keçirirlər, lakin onların beyninin məntiq mərkəzi hələ tam inkişaf etməyib. Onlar özlərini pis hiss etdikləri üçün belə davranırlar.',
      'Valideynin ən böyük gücü uşağın qasırğasında sakit liman olmaqdır. Uşaq qışqıranda ona nəsihət vermək faydasızdır — qəbul və sakitlik lazımdır.'
    ],
    keyTakeaways: [
      'Qışqıraraq qışqırmağı dayandırmaq mümkün deyil.',
      'Qəzəb keçdikdən sonra qucaqlayıb hadisəni analiz edin.',
      'Sərhədləri qətiyyətlə, lakin şəfqətlə qoruyun.'
    ],
    tags: ['Valideynlik', 'Uşaq İnkişafı', 'Tantrum', 'Emosiyalar']
  },
  {
    id: 'isde-tukenmislik-burnout-elametleri',
    title: 'Peşəkar Tükənmişlik (Burnout) Sindromunu Göstərən 5 Gizli Əlamət',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    category: 'Karyera və Rifah',
    readTimeMinutes: 5,
    publishDate: '26 İyul 2026',
    author: {
      name: 'Tural Hüseynov',
      title: 'Mental Kouç',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    excerpt: 'Hətta istirahət günündən sonra belə yorğunluq keçmirsə, bu adi yorğunluq deyil, sinir sisteminin tükənməsidir.',
    content: [
      'Burnout sadəcə çox işləməkdən yaranmır; o, gördüyün işin mənasızlaşması, şəxsi nəzarətin itməsi və daimi stress nəticəsində formalaşır.',
      'Erkən əlamətlər: Həmkarlara qarşı soyuqluq və kinizm, yuxu pozuntuları, qərar verməkdə ləngimə və daimi günahkarlıq hissi.'
    ],
    keyTakeaways: [
      'Xroniki tükənməni istirahətsiz aradan qaldırmaq mümkün deyil.',
      'Mikro-fasilələr və sərhədlər bərpa prosesinin açarıdır.'
    ],
    tags: ['Burnout', 'Karyera', 'Stres', 'Rifah']
  }
];

export const USER_MOCK_APPOINTMENTS: BookedAppointment[] = [
  {
    id: 'apt-demo-1',
    psychologistId: 'dr-leyla-mammadova',
    psychologistName: 'Dr. Leyla Məmmədova',
    psychologistTitle: 'Klinik Psixoloq, PhD & CBT Terapevt',
    psychologistPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    date: '24 Avqust 2026',
    timeSlot: '14:00',
    format: 'online',
    location: 'Onlayn Qorunan Video Otaq',
    price: 70,
    clientName: 'Allahverdi İbrahimov',
    clientEmail: 'allahverdiibrahimov2004@gmail.com',
    clientPhone: '+994 (50) 123-45-67',
    status: 'təsdiqləndi',
    meetingLink: 'https://meet.dayaq.az/room/cbt-leyla-2026',
    createdAt: '2026-08-18T10:00:00Z'
  },
  {
    id: 'apt-demo-2',
    psychologistId: 'rashad-aliyev',
    psychologistName: 'Rəşad Əliyev',
    psychologistTitle: 'Ailə və Cütlük Psixoloqu',
    psychologistPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    date: '15 Avqust 2026',
    timeSlot: '18:00',
    format: 'in_person',
    location: '28 May filialı, Dilarə Əliyeva 220, Otaq 3B',
    price: 60,
    clientName: 'Allahverdi İbrahimov',
    clientEmail: 'allahverdiibrahimov2004@gmail.com',
    clientPhone: '+994 (50) 123-45-67',
    status: 'tamamlandı',
    createdAt: '2026-08-10T12:00:00Z'
  },
  {
    id: 'apt-demo-3',
    psychologistId: 'tural-huseynov',
    psychologistName: 'Tural Hüseynov',
    psychologistTitle: 'Mental Kouç & Təşkilati Psixoloq',
    psychologistPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    date: '02 Avqust 2026',
    timeSlot: '11:00',
    format: 'online',
    location: 'Onlayn Video Zəng',
    price: 55,
    clientName: 'Allahverdi İbrahimov',
    clientEmail: 'allahverdiibrahimov2004@gmail.com',
    clientPhone: '+994 (50) 123-45-67',
    status: 'ləğv_edildi',
    createdAt: '2026-07-28T09:00:00Z'
  }
];

export const USER_MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-ei-2026',
    title: 'Emosional İntellekt və Özünüidarəetmə',
    issueDate: '18 avqust 2026',
    credentialId: 'DYQ-EI-99201',
    instructorName: 'Rəşad Əliyev',
    category: 'Emosional Zəka',
    score: 98
  },
  {
    id: 'cert-1',
    title: 'Təşviş və Panik Tutmaların CBT ilə İdarə Edilməsi',
    issueDate: '10 Avqust 2026',
    credentialId: 'DYQ-CBT-88941',
    instructorName: 'Dr. Leyla Məmmədova',
    category: 'Emosional Sağlamlıq',
    score: 95
  }
];

export const USER_MOCK_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'Seansınız təsdiqləndi',
    message: 'Dr. Aysel Məmmədova ilə 24 avqust saat 18:00 üçün seansınız təsdiqləndi.',
    time: '30 dəq əvvəl',
    read: false,
    type: 'appointment',
    link: '/dashboard/seanslar'
  },
  {
    id: 'notif-2',
    title: 'Vebinarınız başlayır',
    message: 'Stress və narahatlıqla mübarizə vebinarı 1 saatdan sonra başlayır.',
    time: '2 saat əvvəl',
    read: false,
    type: 'webinar',
    link: '/dashboard/vebinarlar'
  },
  {
    id: 'notif-3',
    title: 'Təlim tamamlandı',
    message: 'Emosional İntellekt təlimini tamamladınız. Sertifikatınız hazırdır.',
    time: '18 Avqust 2026',
    read: true,
    type: 'course',
    link: '/dashboard/sertifikatlar'
  },
  {
    id: 'notif-4',
    title: 'Sistem təhlükəsizlik yenilənməsi',
    message: 'Hesabınızın təhlükəsizliyi üçün İki Mərhələli Doğrulama (2FA) tövsiyə olunur.',
    time: '14 Avqust 2026',
    read: true,
    type: 'system',
    link: '/dashboard/tenzimlemeler'
  }
];

export const USER_MOCK_FAVORITES = {
  psychologistIds: ['dr-leyla-mammadova', 'rashad-aliyev'],
  webinarIds: ['web-1', 'web-2'],
  courseIds: ['course-1', 'course-2'],
  articleIds: ['panik-atak-5-deqiqede-sakitleshdirme', 'sexsi-serhedler-yox-demek']
};

export const MOCK_APPOINTMENTS = USER_MOCK_APPOINTMENTS;
export const NOTIFICATIONS_DATA = USER_MOCK_NOTIFICATIONS.map(n => ({
  ...n,
  timestamp: n.time || '2 saat əvvəl'
}));

export const MOCK_USER = {
  id: 'usr-client-1',
  name: 'Allahverdi İbrahimov',
  title: 'İstifadəçi',
  email: 'allahverdiibrahimov2004@gmail.com',
  phone: '+994 50 123 45 67',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  bio: 'Şəxsi inkişaf, emosional rifah və zehni dayanıqlılıq mövzularına maraq göstərirəm.',
  preferredLanguage: 'Azərbaycan',
  preferredSessionFormat: 'Onlayn (Video zəng)',
  stats: {
    completedSessions: 5,
    upcomingSessions: 1,
    enrolledCourses: 3,
    registeredWebinars: 2,
    earnedCertificates: 1
  }
};


export const USER_MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-101',
    date: '18 Avqust 2026',
    description: 'Dr. Leyla Məmmədova - Fərdi CBT Seansı',
    amount: 70,
    status: 'uğurlu',
    type: 'seans'
  },
  {
    id: 'trx-102',
    date: '12 Avqust 2026',
    description: 'Təşviş və Panik Tutmaların CBT ilə İdarə Edilməsi Kursu',
    amount: 49,
    status: 'uğurlu',
    type: 'telim'
  }
];

export const FAQ_ITEMS = [
  {
    category: 'Konsultasiyalar',
    q: 'Onlayn psixoloji konsultasiya necə keçirilir?',
    a: 'Seanslar platformamızın təhlükəsiz video bağlantısı və ya təyin olunmuş Zoom linki vasitəsilə tam məxfi şəkildə həyata keçirilir. Sizə yalnız internet bağlantısı və sakit otaq lazımdır.'
  },
  {
    category: 'Konsultasiyalar',
    q: 'Özüm üçün düzgün psixoloqu necə seçə bilərəm?',
    a: 'Saytımızda ixtisas sahələri, təcrübə illəri, qiymət və rəylər üzrə filtrləmə apara bilərsiniz. Hər bir psixoloqun profil səhifəsində təhsili, metodologiyası və rəyləri şəffaf şəkildə təqdim olunur.'
  },
  {
    category: 'Təlimlər & Vebinarlar',
    q: 'Təlimləri bitirdikdən sonra sertifikat verilirmi?',
    a: 'Bəli, bütün video dərsləri və yekun qiymətləndirməni tamamlayan iştirakçılara QR kodlu rəsmi elektron sertifikat təqdim olunur.'
  },
  {
    category: 'Ödəniş və Ləğv',
    q: 'Görüş vaxtını dəyişmək və ya ləğv etmək mümkündürmü?',
    a: 'Görüş saatından ən azı 12 saat əvvəl "Dashboard → Seanslarım" bölməsindən seansı ödənişsiz olaraq başqa vaxta dəyişə və ya ləğv edə bilərsiniz.'
  },
  {
    category: 'Məxfilik',
    q: 'Mənim məlumatlarımın məxfiliyinə necə zəmanət verilir?',
    a: 'Dayaq platforması beynəlxalq tibbi və psixoloji etik kodeksləri rəhbər tutur. Seanslar zamanı deyilən heç bir məlumat üçüncü şəxslərə və ya iş yerinə ötürülmür.'
  }
];
