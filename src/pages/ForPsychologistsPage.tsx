import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  ShieldCheck,
  Calendar,
  CreditCard,
  Video,
  Users,
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const ForPsychologistsPage: React.FC = () => {
  const benefits = [
    {
      title: 'Davamlı Pasiyent Axını',
      desc: 'Marketinq və reklam xərclərini düşünmədən birbaşa sizin ixtisasınıza ehtiyacı olan pasiyentlərlə əlaqə qurun.'
    },
    {
      title: 'Avtomatlaşdırılmış Qəbul Təqvimi',
      desc: 'İş günlərinizi və boş saatlarınızı təyin edin; pasiyentlər sizə uyğun vaxtda rezervasiya etsinlər.'
    },
    {
      title: 'Təhlükəsiz Video və Ödəniş Sistemi',
      desc: 'Məxfi video bağlantı və seans ödənişlərinin bank kartınıza avtomatik və vaxtında köçürülməsi təmin edilir.'
    },
    {
      title: 'Vebinar və Kurs Təşkili',
      desc: 'Müəllif kurslarınızı və canlı vebinarlarınızı platformada yerləşdirərək əlavə passiv və aktiv gəlir əldə edin.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      <div className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Psixoloqlar üçün' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B]">
              Psixoloqlar və Təlimçilər üçün Əməkdaşlıq
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Praktikanızı rəqəmsallaşdırın, pasiyent auditoriyanızı genişləndirin və peşəkar nüfuzunuzu artırın.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#251D4B]" />
              </div>
              <h3 className="font-bold text-lg text-[#251D4B]">{b.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Verification criteria */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-[#251D4B]">
            Müraciət Üçün Tələblər və Qəbul Şərtləri:
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Psixologiya və ya Klinik Psixologiya üzrə ali təhsil (Bakalavr / Magistr diplomu)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ən azı 2 il aktiv fərdi və ya qrup məsləhət təcrübəsi</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Etik kodeksə və müştəri məxfiliyinə 100% sadiqlik</span>
            </li>
          </ul>
        </div>

        {/* Transparent Commission Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#251D4B] to-[#1e173e] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-[#CADFFD] text-[11px] font-black uppercase tracking-wider">
              Mütəxəssis Pul Ödəmir · 0 ₼ Abunə
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Pulsuz Paylaşın, Yalnız Satışdan 10% Komissiya
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Seans, vebinar və təlimlərinizi ödənişsiz yerləşdirin. İstifadəçilər qoşulduqda anlıq ödəniş edir — 90% birbaşa sizin xalis qazancınız olur, 10% platformaya ayrılır.
            </p>
          </div>
          <Link
            to="/qiymetler"
            className="px-5 py-3 rounded-xl bg-white text-[#251D4B] hover:bg-[#CADFFD] text-xs font-black shrink-0 transition-colors shadow-xs"
          >
            Qazancı və Komissiyanı Hesabla
          </Link>
        </div>

        {/* Join CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#251D4B] text-white text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Dayaq Peşəkar Şəbəkəsinə Qoşulun</h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Diplom və təcrübə məlumatlarınızı təqdim edərək mütəxəssis profilinizi aktivləşdirin.
          </p>
          <div className="pt-2">
            <Link
              to="/qeydiyyat"
              className="inline-block px-6 py-3 rounded-xl text-xs font-bold text-[#251D4B] bg-white hover:bg-slate-100 shadow-xs"
            >
              Mütəxəssis Kimi Müraciət Et
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
