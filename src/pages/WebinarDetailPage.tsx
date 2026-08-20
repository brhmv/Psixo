import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WEBINARS_DATA } from '../data/mockData';
import {
  Calendar,
  Clock,
  Video,
  Users,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Radio,
  FileText,
  Share2
} from 'lucide-react';

export const WebinarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const webinar = WEBINARS_DATA.find((w) => w.id === id) || WEBINARS_DATA[0];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Top Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Vebinarlar', path: '/vebinarlar' },
              { label: webinar.title }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
                  {webinar.category}
                </span>
                {webinar.type === 'live' && (
                  <span className="px-3 py-1 rounded-md bg-rose-600 text-white text-xs font-bold flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>Canlı Yayım İndi Aktivdir</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#251D4B] tracking-tight leading-tight">
                {webinar.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {webinar.subtitle}
              </p>

              {/* Speaker snippet */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={webinar.speaker.photo}
                  alt={webinar.speaker.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-[#251D4B]">{webinar.speaker.name}</div>
                  <div className="text-xs text-slate-500">{webinar.speaker.title}</div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 aspect-video shadow-xs relative">
              <img
                src={webinar.coverImage}
                alt={webinar.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* About the Webinar */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Vebinar Haqqında
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {webinar.about}
              </p>
            </div>

            {/* What you will learn */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Bu Vebinarda Nələri Öyrənəcəksiniz?
              </h2>
              <div className="space-y-2.5">
                {webinar.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agenda / Proqram */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Vebinarın Gündəliyi və Proqramı
              </h2>
              <div className="space-y-3">
                {webinar.agenda.map((ag, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#251D4B]">{ag.topic}</span>
                      <span className="font-semibold text-slate-500">{ag.timeRange}</span>
                    </div>
                    <p className="text-xs text-slate-600">{ag.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Speaker Full Profile Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Spiker Haqqında
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={webinar.speaker.photo}
                  alt={webinar.speaker.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div className="space-y-1">
                  <div className="font-bold text-base text-[#251D4B]">{webinar.speaker.name}</div>
                  <div className="text-xs font-semibold text-slate-600">{webinar.speaker.title}</div>
                  <p className="text-xs text-slate-600">{webinar.speaker.bio}</p>
                  {webinar.speaker.id && (
                    <Link
                      to={`/psixoloqlar/${webinar.speaker.id}`}
                      className="inline-block text-xs font-bold text-[#251D4B] hover:underline pt-1"
                    >
                      Mütəxəssisin tam profili və seans saatları →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#251D4B]">
                Tez-Tez Verilən Suallar
              </h2>
              <div className="space-y-3">
                {webinar.faq.map((f, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#251D4B]">{f.question}</h4>
                    <p className="text-xs text-slate-600">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Registration Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">İştirak haqqı</div>
                  <div className="text-2xl font-black text-[#251D4B]">
                    {webinar.isFree ? 'Pulsuz' : `${webinar.price} AZN`}
                  </div>
                </div>

                {webinar.originalPrice && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">
                      {webinar.originalPrice} AZN
                    </span>
                    <div className="text-[11px] font-bold text-emerald-700">50% Endirim</div>
                  </div>
                )}
              </div>

              {/* Event Details list */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#251D4B]" />
                  <span>Tarix: <strong>{webinar.date}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#251D4B]" />
                  <span>Saat: <strong>{webinar.time}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-[#251D4B]" />
                  <span>Format: <strong>Canlı İnteraktiv Otaq + Q&A</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#251D4B]" />
                  <span>Hazırkı Qeydiyyat: <strong>{webinar.registeredCount} nəfər</strong></span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#CADFFD]/35 border border-[#CADFFD] text-xs text-[#251D4B] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Video Yazı Zəmanəti</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Vebinara canlı qatıla bilməsəniz belə, video yazı profilinizdə saxlanılacaq.
                </p>
              </div>

              {/* Primary CTA */}
              <Link
                to={`/vebinarlar/${webinar.id}/canli`}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Qeydiyyatdan keç & Otağa Daxil Ol</span>
                <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
