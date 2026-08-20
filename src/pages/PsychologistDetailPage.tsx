import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PSYCHOLOGISTS_DATA, WEBINARS_DATA, COURSES_DATA } from '../data/mockData';
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Clock,
  Video,
  Languages,
  Award,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const PsychologistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const psychologist = PSYCHOLOGISTS_DATA.find((p) => p.id === id) || PSYCHOLOGISTS_DATA[0];

  const associatedWebinars = WEBINARS_DATA.filter((w) =>
    psychologist.associatedWebinarIds?.includes(w.id)
  );

  const associatedCourses = COURSES_DATA.filter((c) =>
    psychologist.associatedCourseIds?.includes(c.id)
  );

  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Top Breadcrumb header */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Psixoloqlar', path: '/psixoloqlar' },
              { label: psychologist.name }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Profile Hero Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={psychologist.photo}
                alt={psychologist.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-2 border-slate-100 shadow-sm"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
                    {psychologist.name}
                  </h1>
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" title="Verifikasiya olunmuş psixoloq" />
                </div>

                <div className="text-sm sm:text-base font-medium text-slate-600">
                  {psychologist.title}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{psychologist.rating} ({psychologist.reviewCount} rəy)</span>
                  </span>
                  <span><strong>{psychologist.experienceYears} il</strong> klinik təcrübə</span>
                  <span>Dillər: <strong>{psychologist.languages.join(', ')}</strong></span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <MapPin className="w-4 h-4 text-[#251D4B] shrink-0" />
                  <span>{psychologist.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Booking Box on Desktop */}
            <div className="w-full md:w-auto p-5 rounded-2xl bg-[#CADFFD]/35 border border-[#CADFFD] text-left space-y-3 shrink-0">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-600">Seans qiyməti:</span>
                <span className="text-xl font-black text-[#251D4B]">{psychologist.pricePerSession} AZN</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Növbəti boş saat: <strong className="text-[#251D4B]">{psychologist.nextAvailableSlot}</strong>
              </div>
              <Link
                to={`/seans/rezervasiya?psychologistId=${psychologist.id}`}
                className="w-full py-3 px-6 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Seans rezerv et</span>
                <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
              </Link>
            </div>

          </div>
        </div>

        {/* Main Content Layout (Left Columns + Right Sticky Sidebar) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About & Philosophy */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#251D4B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#251D4B]" />
                <span>Mütəxəssis Haqqında & Terapiya Yanaşması</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {psychologist.bio}
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs italic text-slate-600 leading-relaxed">
                "{psychologist.aboutTherapy}"
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#251D4B]">
                İxtisas Sahələri və Problemlər
              </h2>
              <div className="flex flex-wrap gap-2">
                {psychologist.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-[#CADFFD]/40 border border-[#CADFFD] text-xs font-bold text-[#251D4B]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Services & Pricing Options */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#251D4B]">
                Təqdim Olunan Xidmətlər və Qiymətlər
              </h2>
              <div className="space-y-3">
                {psychologist.services.map((srv, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedServiceIndex(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      selectedServiceIndex === idx
                        ? 'border-[#251D4B] bg-[#CADFFD]/20 ring-1 ring-[#251D4B]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-[#251D4B]">{srv.title}</div>
                      <div className="text-xs text-slate-600">{srv.description}</div>
                      <div className="text-[11px] text-slate-400">Müddət: {srv.duration}</div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-base font-extrabold text-[#251D4B]">{srv.price} AZN</div>
                      <Link
                        to={`/seans/rezervasiya?psychologistId=${psychologist.id}&service=${encodeURIComponent(srv.title)}`}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#191333]"
                      >
                        Seç
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#251D4B] flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-[#251D4B]" />
                  <span>Ali Təhsil</span>
                </h2>
                <ul className="space-y-2">
                  {psychologist.education.map((edu, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-[#251D4B] flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-[#251D4B]" />
                  <span>Beynəlxalq İxtisas və Lisenziyalar</span>
                </h2>
                <ul className="space-y-2">
                  {psychologist.certifications.map((cert, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#251D4B] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#251D4B]" />
                  <span>Pasiyent Rəyləri ({psychologist.reviewCount})</span>
                </h2>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{psychologist.rating} / 5.0</span>
                </div>
              </div>

              <div className="space-y-3">
                {psychologist.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#251D4B]">{rev.author}</span>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Webinars & Trainings if any */}
            {(associatedWebinars.length > 0 || associatedCourses.length > 0) && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <h2 className="text-lg font-bold text-[#251D4B]">
                  Mütəxəssisin Təlimləri və Vebinarları
                </h2>

                {associatedWebinars.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Vebinarlar:</div>
                    {associatedWebinars.map((web) => (
                      <div key={web.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs text-[#251D4B]">{web.title}</div>
                          <div className="text-[11px] text-slate-500">{web.date} · {web.time}</div>
                        </div>
                        <Link
                          to={`/vebinarlar/${web.id}`}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#CADFFD] text-[#251D4B] shrink-0"
                        >
                          Bax
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                {associatedCourses.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Video Kurslar:</div>
                    {associatedCourses.map((crs) => (
                      <div key={crs.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-xs text-[#251D4B]">{crs.title}</div>
                          <div className="text-[11px] text-slate-500">{crs.durationHours} saat · {crs.lessonsCount} dərs</div>
                        </div>
                        <Link
                          to={`/telimler/${crs.id}`}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white shrink-0"
                        >
                          Kursa Get
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Sticky Availability Calendar & Action Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-[#251D4B]">
                  Qəbul Təqvimi və Boş Saatlar
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Görüş formatını və uyğun vaxtı seçərək seansı təsdiqləyin
                </p>
              </div>

              {/* Working days */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#251D4B]">Qəbul Günləri:</div>
                <div className="flex flex-wrap gap-1.5">
                  {psychologist.availableDays.map((day, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Available hours */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#251D4B]">Nümunə Seans Saatları:</div>
                <div className="grid grid-cols-3 gap-2">
                  {psychologist.timeSlots.map((slot, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs font-bold text-[#251D4B]">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#CADFFD]/35 border border-[#CADFFD] text-xs text-[#251D4B] space-y-1">
                <div className="font-bold">Məxfilik Zəmanəti:</div>
                <div className="text-[11px] text-slate-600">
                  Bütün onlayn və kabinet görüşləri 100% konfidensial həyata keçirilir.
                </div>
              </div>

              <Link
                to={`/seans/rezervasiya?psychologistId=${psychologist.id}`}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Seans rezerv et</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
