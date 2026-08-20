import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HeartHandshake, ShieldCheck, Award, Users, CheckCircle2, Sparkles, Target, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      <div className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Haqqımızda' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B]">
              Dayaq Platforması Haqqında
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Azərbaycanda psixoloji yardımı hər kəs üçün əlçatan, elmi əsaslı, məxfi və təhlükəsiz edən aparıcı milli platforma.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center">
              <Target className="w-6 h-6 text-[#CADFFD]" />
            </div>
            <h2 className="text-2xl font-bold text-[#251D4B]">Missiyamız</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cəmiyyətdə psixi sağlamlıq şüurunu artırmaq, psixoloji kömək almağın stiqmasını aradan qaldırmaq və insanları akkreditasiyalı, yüksək ixtisaslı terapevtlərlə ən rahat və təhlükəsiz şəkildə qovuşdurmaqdır.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#CADFFD]/35 border border-[#CADFFD] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center">
              <Compass className="w-6 h-6 text-[#CADFFD]" />
            </div>
            <h2 className="text-2xl font-bold text-[#251D4B]">Vizyonumuz</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Azərbaycan və region üzrə psixologiya, rəqəmsal terapiya və davamlı psixoloji maarifləndirmə sahəsində 1 nömrəli etibarlı rəqəmsal ekosistem olmaq.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-[#251D4B] text-center">
            Əsas Prinsiplərimiz və Dəyərlərimiz
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-slate-200 space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <h3 className="font-bold text-base text-[#251D4B]">100% Məxfilik və Etika</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bütün seans qeydləri və fərdi məlumatlar beynəlxalq tibbi və psixoloji etik kodeksə tam uyğun olaraq gizli saxlanılır.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200 space-y-3">
              <Award className="w-8 h-8 text-[#251D4B]" />
              <h3 className="font-bold text-base text-[#251D4B]">Yoxlanılmış Mütəxəssislər</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Platformadakı hər bir psixoloqun ali təhsil diplomu, magistr və beynəlxalq sertifikatları ekspert komandamız tərəfindən tək-tək yoxlanılır.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200 space-y-3">
              <Sparkles className="w-8 h-8 text-[#251D4B]" />
              <h3 className="font-bold text-base text-[#251D4B]">Sübuta Əsaslanan Metodlar</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Koqnitiv Davranış Terapiyası (CBT), EMDR, Geştalt və Sxema Terapiyası kimi dünyada effektivliyi təsdiq olunmuş metodlar tətbiq olunur.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-[#251D4B] text-white p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Siz də Dayaq ilə ilk addımınızı atın</h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Sizin üçün ən uyğun mütəxəssisi seçərək elə bu gün onlayn və ya ofisdə görüş təyin edin.
          </p>
          <div className="pt-2">
            <Link
              to="/psixoloqlar"
              className="inline-block px-6 py-3 rounded-xl text-xs font-bold text-[#251D4B] bg-white hover:bg-slate-100"
            >
              Psixoloqları Kəşf Edin
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
