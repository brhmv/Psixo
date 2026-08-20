import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Video,
  BookOpen,
  Calendar,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  Star,
  Sparkles,
  ExternalLink,
  ChevronRight,
  PlayCircle,
  FileText,
  ShieldCheck,
  Heart
} from 'lucide-react';
import {
  MOCK_USER,
  USER_MOCK_APPOINTMENTS,
  PSYCHOLOGISTS_DATA,
  WEBINARS_DATA,
  COURSES_DATA,
  ARTICLES_DATA,
  USER_MOCK_CERTIFICATES
} from '../../data/mockData';

export const DashboardOverviewPage: React.FC = () => {
  const [recommendationTab, setRecommendationTab] = useState<'psychologists' | 'webinars' | 'trainings' | 'articles'>('psychologists');

  // Next upcoming session
  const nextSession = USER_MOCK_APPOINTMENTS.find((a) => a.status === 'təsdiqləndi');
  
  // Upcoming registered webinar
  const upcomingWebinar = WEBINARS_DATA.find((w) => w.type === 'live') || WEBINARS_DATA[0];

  // Active training progress
  const activeCourse = COURSES_DATA[1] || COURSES_DATA[0]; // Emosional Zeka
  const courseProgress = 64;

  // Recent certificate
  const latestCertificate = USER_MOCK_CERTIFICATES[0];

  // Previously booked psychologists
  const myPsychologists = [
    {
      psychologist: PSYCHOLOGISTS_DATA[0], // Dr. Leyla Məmmədova
      lastSession: '18 Avqust 2026',
      nextSession: '24 Avqust 2026, 14:00',
      totalSessions: 3
    },
    {
      psychologist: PSYCHOLOGISTS_DATA[1], // Rəşad Əliyev
      lastSession: '15 Avqust 2026',
      nextSession: 'Təyin edilməyib',
      totalSessions: 2
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
      
      {/* 4. Greeting & Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
              Xoş gəlmisiniz! 👋
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Psixoloji inkişafınız üçün növbəti addımınızı seçin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/psixoloqlar"
            className="px-4 py-2.5 rounded-2xl bg-[#251D4B] text-white hover:bg-[#1a1435] text-xs font-bold transition-all shadow-xs flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5 text-[#CADFFD]" />
            <span>Mütəxəssis tap</span>
          </Link>
        </div>
      </div>

      {/* 5. QUICK ACTIONS (3 Large Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Quick Action 1 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#CADFFD] hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#CADFFD]/40 text-[#251D4B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6 text-[#251D4B]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#251D4B]">Psixoloq tap</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Sizə uyğun mütəxəssisi tapın.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Link
              to="/dashboard/psixoloqlar"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#251D4B] text-[#251D4B] hover:text-white font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span>Psixoloq tap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Action 2 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#CADFFD] hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#251D4B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Video className="w-6 h-6 text-[#251D4B]" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#251D4B]">Vebinarları kəşf et</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Canlı psixoloji vebinarlara qoşulun.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Link
              to="/dashboard/vebinarlar"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#251D4B] text-[#251D4B] hover:text-white font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span>Vebinarlara bax</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Action 3 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#CADFFD] hover:shadow-md transition-all group flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#251D4B]">Təlimlərə bax</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                Yeni biliklər əldə edin.
              </p>
            </div>
          </div>
          <div className="pt-6">
            <Link
              to="/dashboard/telimler"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#251D4B] text-[#251D4B] hover:text-white font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span>Təlimləri kəşf et</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* 6. NEXT SESSION & 7. UPCOMING WEBINAR ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Next Session Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base font-black text-[#251D4B]">Qarşıdakı seansınız</h2>
            </div>
            <Link
              to="/dashboard/seanslar"
              className="text-xs font-bold text-[#251D4B] hover:underline"
            >
              Hamısına bax
            </Link>
          </div>

          {nextSession ? (
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <img
                  src={nextSession.psychologistPhoto}
                  alt={nextSession.psychologistName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#CADFFD]/50 shrink-0"
                />
                <div className="space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                    Təsdiqlənmiş seans
                  </div>
                  <h3 className="font-black text-sm text-[#251D4B]">{nextSession.psychologistName}</h3>
                  <p className="text-xs text-slate-500">{nextSession.psychologistTitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-medium text-[11px] block">Tarix</span>
                  <span className="font-bold text-[#251D4B]">{nextSession.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium text-[11px] block">Saat & Müddət</span>
                  <span className="font-bold text-[#251D4B]">{nextSession.timeSlot} (50 dəq)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium text-[11px] block">Format</span>
                  <span className="font-bold text-emerald-700">Onlayn Video</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={nextSession.meetingLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Video className="w-4 h-4 text-[#CADFFD]" />
                  <span>Seansa qoşul</span>
                </a>

                <Link
                  to={`/dashboard/seanslar/${nextSession.id}`}
                  className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold text-center transition-colors"
                >
                  Ətraflı bax
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Hazırda qarşıdakı seansınız yoxdur.</p>
              <Link
                to="/dashboard/psixoloqlar"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Psixoloq tap</span>
              </Link>
            </div>
          )}
        </div>

        {/* 7. Upcoming Webinar Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#251D4B]" />
              <h2 className="text-base font-black text-[#251D4B]">Qarşıdakı vebinarlarınız</h2>
            </div>
            <Link
              to="/dashboard/vebinarlar"
              className="text-xs font-bold text-[#251D4B] hover:underline"
            >
              Hamısına bax
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={upcomingWebinar.coverImage}
                alt={upcomingWebinar.title}
                referrerPolicy="no-referrer"
                className="w-full sm:w-36 h-28 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1.5 min-w-0 flex-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#CADFFD]/40 text-[#251D4B] text-[10px] font-bold">
                  {upcomingWebinar.category}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-[#251D4B] line-clamp-2">
                  {upcomingWebinar.title}
                </h3>
                <p className="text-xs text-slate-500">Spiker: <strong>{upcomingWebinar.speaker.name}</strong></p>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upcomingWebinar.date}, {upcomingWebinar.time}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={`/dashboard/vebinarlar/${upcomingWebinar.id}`}
                className="w-full py-3 px-5 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <PlayCircle className="w-4 h-4 text-[#CADFFD]" />
                <span>Vebinara qoşul</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* 8. CONTINUE LEARNING & 9. RECENT CERTIFICATE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Continue Learning (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#251D4B]" />
              <h2 className="text-base font-black text-[#251D4B]">Öyrənməyə davam et</h2>
            </div>
            <Link
              to="/dashboard/telimler"
              className="text-xs font-bold text-[#251D4B] hover:underline"
            >
              Bütün kurslar
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <img
              src={activeCourse.coverImage}
              alt={activeCourse.title}
              referrerPolicy="no-referrer"
              className="w-full sm:w-44 h-32 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
            <div className="space-y-3 flex-1 w-full">
              <div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                  Davam edir
                </span>
                <h3 className="font-black text-sm text-[#251D4B] mt-1">{activeCourse.title}</h3>
                <p className="text-xs text-slate-500">Təlimçi: {activeCourse.instructor.name}</p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Tərəqqi</span>
                  <span className="text-[#251D4B]">{courseProgress}% tamamlanıb</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#251D4B] transition-all duration-500"
                    style={{ width: `${courseProgress}%` }}
                  />
                </div>
              </div>

              <Link
                to={`/dashboard/telimler/${activeCourse.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#251D4B] text-white hover:bg-[#1a1435] text-xs font-bold transition-colors"
              >
                <span>Təlimə davam et</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 9. Recent Certificate (1 Column) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-black text-[#251D4B]">Son Sertifikatınız</h2>
            </div>
            <Link
              to="/dashboard/sertifikatlar"
              className="text-xs font-bold text-[#251D4B] hover:underline"
            >
              Hamısı
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                Rəsmi QR Sertifikat
              </span>
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-xs text-[#251D4B]">{latestCertificate.title}</h3>
            <div className="text-[11px] text-slate-500">
              Tamamlanma tarixi: <strong>{latestCertificate.issueDate}</strong>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              ID: {latestCertificate.credentialId}
            </div>
          </div>

          <Link
            to="/dashboard/sertifikatlar"
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#251D4B] text-xs font-bold text-center transition-colors block"
          >
            Sertifikata bax
          </Link>
        </div>

      </div>

      {/* 11. MY PSYCHOLOGISTS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-black text-[#251D4B]">Psixoloqlarım</h2>
            <p className="text-xs text-slate-500">Əvvəllər seans aldığınız mütəxəssislər</p>
          </div>
          <Link
            to="/dashboard/psixoloqlar"
            className="text-xs font-bold text-[#251D4B] hover:underline flex items-center gap-1"
          >
            <span>Yeni psixoloq tap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {myPsychologists.map(({ psychologist, lastSession, nextSession, totalSessions }) => (
            <div
              key={psychologist.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-[#CADFFD] hover:shadow-xs transition-all flex items-start gap-4"
            >
              <img
                src={psychologist.photo}
                alt={psychologist.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-[#251D4B] truncate">{psychologist.name}</h3>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{psychologist.rating}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{psychologist.specializations.slice(0, 2).join(', ')}</p>
                <div className="text-[10px] text-slate-400 pt-1 space-y-0.5">
                  <div>Son seans: <strong className="text-slate-600">{lastSession}</strong></div>
                  <div>Növbəti seans: <strong className="text-[#251D4B]">{nextSession}</strong></div>
                </div>
                <div className="pt-2">
                  <Link
                    to={`/psixoloqlar/${psychologist.id}`}
                    className="inline-block px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#251D4B] hover:text-white text-slate-700 text-[11px] font-bold transition-colors"
                  >
                    Profilə bax
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. RECOMMENDATIONS: "Sizin üçün seçdik" */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h2 className="text-base font-black text-[#251D4B]">Sizin üçün seçdik</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Maraqlarınıza uyğun tövsiyə olunan fərdi təkliflər</p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setRecommendationTab('psychologists')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                recommendationTab === 'psychologists' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              Psixoloqlar
            </button>
            <button
              onClick={() => setRecommendationTab('webinars')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                recommendationTab === 'webinars' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              Vebinarlar
            </button>
            <button
              onClick={() => setRecommendationTab('trainings')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                recommendationTab === 'trainings' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              Təlimlər
            </button>
            <button
              onClick={() => setRecommendationTab('articles')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                recommendationTab === 'articles' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              Məqalələr
            </button>
          </div>
        </div>

        {/* Tab 1: Recommended Psychologists */}
        {recommendationTab === 'psychologists' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PSYCHOLOGISTS_DATA.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-[#CADFFD] hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.photo}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#251D4B]">{p.name}</h4>
                    <p className="text-[11px] text-slate-500 truncate max-w-[150px]">{p.title}</p>
                    <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{p.rating} ({p.reviewCount} rəy)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="font-bold text-[#251D4B]">₼{p.pricePerSession} / seans</span>
                  <Link
                    to={`/psixoloqlar/${p.id}`}
                    className="px-3 py-1 rounded-lg bg-[#251D4B] text-white text-[11px] font-bold"
                  >
                    Profilə bax
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Recommended Webinars */}
        {recommendationTab === 'webinars' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {WEBINARS_DATA.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <img
                  src={w.coverImage}
                  alt={w.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-[#CADFFD]/50 text-[#251D4B] text-[10px] font-bold">
                    {w.category}
                  </span>
                  <h4 className="font-bold text-xs text-[#251D4B] line-clamp-2">{w.title}</h4>
                  <p className="text-[11px] text-slate-500">Spiker: {w.speaker.name}</p>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    to={`/dashboard/vebinarlar/${w.id}`}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-[#251D4B] hover:text-white text-[#251D4B] text-xs font-bold text-center block transition-colors"
                  >
                    Detallara bax
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Recommended Trainings */}
        {recommendationTab === 'trainings' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COURSES_DATA.slice(0, 2).map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl border border-slate-200 flex gap-4 hover:border-[#CADFFD] transition-all"
              >
                <img
                  src={c.coverImage}
                  alt={c.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-[#251D4B] line-clamp-2">{c.title}</h4>
                  <p className="text-[11px] text-slate-500">Təlimçi: {c.instructor.name}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-xs text-[#251D4B]">₼{c.price}</span>
                    <Link
                      to={`/dashboard/telimler/${c.id}`}
                      className="px-3 py-1 rounded-lg bg-[#251D4B] text-white text-xs font-bold"
                    >
                      Bax
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Recommended Articles */}
        {recommendationTab === 'articles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ARTICLES_DATA.slice(0, 2).map((a) => (
              <div
                key={a.id}
                className="p-5 rounded-2xl border border-slate-200 flex gap-4 hover:border-[#CADFFD] transition-all"
              >
                <img
                  src={a.coverImage}
                  alt={a.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-purple-700">{a.category}</span>
                  <h4 className="font-bold text-xs text-[#251D4B] line-clamp-2">{a.title}</h4>
                  <div className="text-[10px] text-slate-400">{a.readTimeMinutes} dəq oxu müddəti</div>
                  <Link
                    to={`/bloq/${a.id}`}
                    className="text-xs font-bold text-[#251D4B] hover:underline inline-flex items-center gap-1 pt-1"
                  >
                    <span>Məqaləni oxu</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
