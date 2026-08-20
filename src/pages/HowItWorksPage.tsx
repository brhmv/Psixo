import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Video,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Mütəxəssis və ya Mövzunu Seçin',
      desc: 'İxtisas, problem (təşviş, depressiya, ailə), format (onlayn və ya kabinetdə) və qiymət filtrlərinə əsasən sizə ən uyğun psixoloqu tapın.'
    },
    {
      step: '02',
      icon: Calendar,
      title: 'Rahat Vaxtı və Tarixi Təyin Edin',
      desc: 'Psixoloqun canlı qəbul təqvimindən sizə uyğun olan gün və saatı seçərək 1 dəqiqə ərzində rezervasiya edin.'
    },
    {
      step: '03',
      icon: Video,
      title: 'Məxfi Seansa Qoşulun',
      desc: 'Təyin olunmuş vaxtda kompüter və ya telefonunuzdan birbaşa təhlükəsiz şifrələnmiş video otağa daxil olun və ya mütəxəssisin ofisinə yaxınlaşın.'
    },
    {
      step: '04',
      icon: Award,
      title: 'Tərəqqinizi İzləyin & Təlimlərə Qatılın',
      desc: 'Şəxsi kabinetinizdə görüş qeydlərinə baxın, ev tapşırıqlarını yerinə yetirin və video kurslarla psixoloji biliklərinizi artırın.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      <div className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Necə İşləyir?' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B]">
              Dayaq Platforması Necə İşləyir?
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Psixoloji dəstək almaq heç vaxt bu qədər sadə, anlaşılan və təhlükəsiz olmamışdı.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#CADFFD] text-[#251D4B] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#251D4B]" />
                    </div>
                    <span className="text-xl font-black text-slate-300">{s.step}</span>
                  </div>

                  <h3 className="font-bold text-base text-[#251D4B] mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="p-8 rounded-3xl bg-[#CADFFD]/30 border border-[#CADFFD] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-lg text-[#251D4B]">Hələ də sualınız var?</h3>
            <p className="text-xs text-slate-600">
              Tez-tez verilən suallar bölməsində texniki tələblər, ödəniş və məxfilik haqqında bütün detallarla tanış olun.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/tez-tez-verilen-suallar"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#251D4B] bg-white border border-[#251D4B]"
            >
              FAQ Bölməsinə Bax
            </Link>
            <Link
              to="/psixoloqlar"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333]"
            >
              Psixoloq Seç
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
