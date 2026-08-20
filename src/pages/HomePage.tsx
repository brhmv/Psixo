import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Video,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { PSYCHOLOGISTS_DATA, WEBINARS_DATA, COURSES_DATA, ARTICLES_DATA } from '../data/mockData';

export const HomePage: React.FC = () => {
  const featuredPsychologists = PSYCHOLOGISTS_DATA.slice(0, 3);
  const featuredWebinars = WEBINARS_DATA.slice(0, 3);
  const featuredCourses = COURSES_DATA.slice(0, 3);
  const latestArticles = ARTICLES_DATA.slice(0, 3);

  return (
    <div className="bg-white">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Azərbaycanın Peşəkar Psixologiya Platforması</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#251D4B] tracking-tight leading-[1.1]">
                Psixoloji dəstək, bilik və inkişaf — bir platformada.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Sertifikatlı klinik psixoloqlarla fərdi onlayn və əyani seanslar təyin edin, interaktiv canlı vebinarlara qatılın və rəsmi sertifikatlı təlimlərlə psixoloji rifahınızı gücləndirin.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/psixoloqlar"
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-all shadow-sm flex items-center gap-2"
                >
                  <span>Psixoloq tap</span>
                  <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
                </Link>

                <Link
                  to="/telimler"
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-[#251D4B] bg-[#CADFFD] hover:bg-[#b0ceff] transition-all"
                >
                  Təlimləri kəşf et
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#251D4B]">100%</div>
                  <div className="text-xs text-slate-500 font-semibold">Təsdiqlənmiş Diplom</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#251D4B]">24/7</div>
                  <div className="text-xs text-slate-500 font-semibold">Təhlükəsiz & Məxfi</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#251D4B]">4.9 / 5</div>
                  <div className="text-xs text-slate-500 font-semibold">Müştəri Məmnuniyyəti</div>
                </div>
              </div>

            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 shadow-[0_8px_30px_rgba(37,29,75,0.06)] space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#251D4B] text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5 text-[#CADFFD]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#251D4B]">Akkreditasiyalı Mütəxəssislər</div>
                      <div className="text-[11px] text-slate-500">Etik kodeks & Elmi əsaslı metodlar</div>
                    </div>
                  </div>
                </div>

                {/* Psychologist Preview Item */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                    alt="Dr. Leyla Məmmədova"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-[#251D4B]">Dr. Leyla Məmmədova</div>
                    <div className="text-[11px] text-slate-500 truncate">Klinik Psixoloq, PhD · CBT</div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>4.98 (142 rəy)</span>
                    </div>
                  </div>
                  <Link
                    to="/psixoloqlar/dr-leyla-mammadova"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#CADFFD] text-[#251D4B] hover:bg-[#b3d1ff] transition-colors"
                  >
                    Profil
                  </Link>
                </div>

                {/* Webinar Highlight Item */}
                <div className="p-4 rounded-2xl bg-[#CADFFD]/35 border border-[#CADFFD] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#251D4B] text-white text-[10px] font-bold">
                      Canlı Vebinar
                    </span>
                    <div className="font-bold text-xs text-[#251D4B]">Stress və Narahatlıqla Mübarizə</div>
                    <div className="text-[11px] text-slate-600">25 Avqust · 20:00</div>
                  </div>
                  <Link
                    to="/vebinarlar/web-1"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#251D4B] text-white hover:bg-[#191333]"
                  >
                    Qoşul
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Platform Categories (3 Main Preview Cards with CTAs) */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#251D4B] bg-[#CADFFD] px-3 py-1 rounded-full">
              Platforma İmkanları
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#251D4B] mt-3">
              Sizin Ehtiyacınıza Uyğun Həll Yolu
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Dayaq ekosistemi psixoloji rifahınızı addım-addım inkişaf etdirmək üçün 3 əsas istiqamətdə xidmət göstərir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Psixoloji Dəstək */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-[0_4px_20px_rgba(37,29,75,0.04)] flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(37,29,75,0.08)] transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center">
                  <HeartHandshake className="w-7 h-7 text-[#CADFFD]" />
                </div>
                <h3 className="text-2xl font-bold text-[#251D4B]">Psixoloji Dəstək</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Təşviş, depressiya, ailə münasibətləri və ya tükənmişliklə bağlı təsdiqlənmiş klinik psixoloqlarla 1-on-1 onlayn və ya ofisdə görüşlər.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Məxfi video və ya kabinet seansı</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Rahat təqvimdən vaxt seçimi</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/psixoloqlar"
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Psixoloq tap</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
                </Link>
              </div>
            </div>

            {/* Card 2: Vebinarlar */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-[0_4px_20px_rgba(37,29,75,0.04)] flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(37,29,75,0.08)] transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center">
                  <Video className="w-7 h-7 text-[#251D4B]" />
                </div>
                <h3 className="text-2xl font-bold text-[#251D4B]">Vebinarlar</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Aktual psixoloji mövzularda aparıcı mütəxəssislərin canlı seminarlarına qatılın, suallarınızı birbaşa ünvanlayın və video yazı əldə edin.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>İnteraktiv canlı Sual-Cavab (Q&A)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ödənişsiz və premium vebinarlar</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/vebinarlar"
                  className="w-full py-3 rounded-xl text-xs font-bold text-[#251D4B] bg-[#CADFFD] hover:bg-[#b0ceff] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Vebinarlara bax</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Təlimlər */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-[0_4px_20px_rgba(37,29,75,0.04)] flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(37,29,75,0.08)] transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-[#CADFFD]" />
                </div>
                <h3 className="text-2xl font-bold text-[#251D4B]">Təlimlər</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Öz tempinizdə izləyə biləcəyiniz modul-modul video kurslar, praktik çalışma vərəqləri və rəsmi QR-kodlu bitirmə sertifikatı.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ömürlük video çıxış və materiallar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Rəsmi rəqəmsal sertifikat</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/telimler"
                  className="w-full py-3 rounded-xl text-xs font-bold text-[#251D4B] bg-white border border-[#251D4B] hover:bg-[#CADFFD]/20 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Təlimləri kəşf et</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Featured Psychologists Preview (3-6 Cards + CTA to /psixoloqlar) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#251D4B] bg-[#CADFFD] px-3 py-1 rounded-full">
                Mütəxəssislər
              </span>
              <h2 className="text-3xl font-black text-[#251D4B] mt-2">
                Seçilmiş Psixoloqlarımız
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Yüksək reytinqli, təsdiqlənmiş təhsilli və geniş klinik təcrübəyə malik terapevtlər.
              </p>
            </div>

            <Link
              to="/psixoloqlar"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#251D4B] hover:underline"
            >
              <span>Bütün psixoloqlara bax</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPsychologists.map((psy) => (
              <div
                key={psy.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={psy.photo}
                      alt={psy.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-[#251D4B]">{psy.name}</h3>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{psy.title}</div>
                      <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{psy.rating}</span>
                        <span className="text-slate-400 font-normal">({psy.reviewCount} rəy)</span>
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {psy.specializations.slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#CADFFD]/40 text-[#251D4B] font-semibold">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                    <span>Növbəti boş vaxt:</span>
                    <strong className="text-[#251D4B]">{psy.nextAvailableSlot}</strong>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400">Seans haqqı:</span>
                    <div className="font-extrabold text-sm text-[#251D4B]">{psy.pricePerSession} AZN</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/psixoloqlar/${psy.id}`}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-[#251D4B] bg-white border border-[#251D4B] hover:bg-[#CADFFD]/20"
                    >
                      Profil
                    </Link>
                    <Link
                      to={`/seans/rezervasiya?psychologistId=${psy.id}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333]"
                    >
                      Rezerv et
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/psixoloqlar"
              className="inline-block w-full py-3 rounded-xl text-xs font-bold text-[#251D4B] border border-[#251D4B]"
            >
              Bütün psixoloqlara bax
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Upcoming Webinars Preview (Cards + CTA to /vebinarlar) */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#251D4B] bg-[#CADFFD] px-3 py-1 rounded-full">
                Canlı Görüşlər
              </span>
              <h2 className="text-3xl font-black text-[#251D4B] mt-2">
                Qarşıdakı Vebinarlar
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Ekspertlərlə canlı interaktiv görüşlər və təcrübə mübadiləsi.
              </p>
            </div>

            <Link
              to="/vebinarlar"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#251D4B] hover:underline"
            >
              <span>Bütün vebinarlara bax</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredWebinars.map((web) => (
              <div
                key={web.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video">
                    <img
                      src={web.coverImage}
                      alt={web.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        web.isFree ? 'bg-emerald-600 text-white' : 'bg-[#251D4B] text-white'
                      }`}>
                        {web.isFree ? 'Ödənişsiz' : `${web.price} AZN`}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-[#251D4B]">
                        <Calendar className="w-3.5 h-3.5" />
                        {web.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {web.time}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#251D4B] line-clamp-2 leading-snug">
                      {web.title}
                    </h3>

                    <div className="flex items-center gap-2.5 pt-1">
                      <img
                        src={web.speaker.photo}
                        alt={web.speaker.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-[#251D4B]">{web.speaker.name}</div>
                        <div className="text-slate-400 text-[11px]">{web.speaker.title}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/vebinarlar/${web.id}`}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-[#251D4B] bg-[#CADFFD] hover:bg-[#b0ceff] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Vebinara Bax & Qeydiyyat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Popular Trainings Preview (Cards + CTA to /telimler) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#251D4B] bg-[#CADFFD] px-3 py-1 rounded-full">
                Video Kurslar
              </span>
              <h2 className="text-3xl font-black text-[#251D4B] mt-2">
                Populyar Təlimlər
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                İstənilən vaxt və yerdə izləyə biləcəyiniz sertifikatlaşdırılmış dərslər.
              </p>
            </div>

            <Link
              to="/telimler"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#251D4B] hover:underline"
            >
              <span>Bütün təlimlərə bax</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {course.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#251D4B] text-white">
                          {course.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-[#251D4B] bg-[#CADFFD]/50 px-2 py-0.5 rounded-md">
                        {course.category}
                      </span>
                      <span>{course.durationHours} saat · {course.lessonsCount} dərs</span>
                    </div>

                    <h3 className="font-bold text-base text-[#251D4B] line-clamp-2 leading-snug">
                      {course.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal">({course.enrolledStudents} tələbə)</span>
                      </div>
                      <div className="font-extrabold text-sm text-[#251D4B]">
                        {course.price} AZN
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/telimler/${course.id}`}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Təlimə Bax</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Latest Articles Preview (3-4 Cards + CTA to /meqaleler) */}
      <section className="py-16 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#251D4B] bg-[#CADFFD] px-3 py-1 rounded-full">
                Maarifləndirmə
              </span>
              <h2 className="text-3xl font-black text-[#251D4B] mt-2">
                Son Məqalələr & Bələdçilər
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Gündəlik psixoloji rifahınız üçün ekspert yazıları və tövsiyələr.
              </p>
            </div>

            <Link
              to="/meqaleler"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#251D4B] hover:underline"
            >
              <span>Bütün məqalələrə bax</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-[#251D4B] bg-[#CADFFD]/60 px-2 py-0.5 rounded-md">
                      {art.category}
                    </span>
                    <span>{art.readTimeMinutes} dəq oxu</span>
                  </div>

                  <h3 className="font-bold text-base text-[#251D4B] leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <div className="font-bold text-[#251D4B]">{art.author.name}</div>
                    <div className="text-slate-400 text-[11px]">{art.publishDate}</div>
                  </div>
                  <Link
                    to={`/meqaleler/${art.id}`}
                    className="p-2 rounded-xl text-xs font-bold text-[#251D4B] hover:bg-[#CADFFD]/40 transition-colors flex items-center gap-1"
                  >
                    <span>Oxu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#251D4B] text-white p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
            
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Emosional Sağlamlığınıza Bu Gün Dayaq Olun
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Təcrübəli psixoloqlarımızla məxfi görüş təyin edin və ya onlayn təlimlərlə özünüzü kəşf etməyə başlayın.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/psixoloqlar"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#251D4B] bg-white hover:bg-slate-100 transition-colors"
              >
                Psixoloq Seçin
              </Link>
              <Link
                to="/qeydiyyat"
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/20 hover:bg-white/30 transition-colors border border-white/30"
              >
                Qeydiyyatdan Keçin
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
