import React from 'react';
import { Psychologist } from '../types';
import { X, Star, ShieldCheck, GraduationCap, Award, Calendar, Video, MapPin, CheckCircle2, Clock } from 'lucide-react';

interface PsychologistProfileModalProps {
  psychologist: Psychologist | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (psychologist: Psychologist) => void;
}

export const PsychologistProfileModal: React.FC<PsychologistProfileModalProps> = ({
  psychologist,
  isOpen,
  onClose,
  onBookNow
}) => {
  if (!isOpen || !psychologist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with image, details and close */}
        <div className="p-6 bg-[#251D4B] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <img
              src={psychologist.photo}
              alt={psychologist.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-white/30 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{psychologist.name}</h2>
                {psychologist.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Lisenziyalı
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-200 font-medium">{psychologist.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1 text-white font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{psychologist.rating}</span>
                  <span className="text-slate-300 font-normal">({psychologist.reviewCount} rəy)</span>
                </div>
                <span>·</span>
                <div>{psychologist.experienceYears} il klinik təcrübə</div>
                <span>·</span>
                <div>Dillər: {psychologist.languages.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Action Callout Bar */}
          <div className="p-4 rounded-xl bg-[#CADFFD]/50 border border-[#CADFFD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#251D4B] uppercase tracking-wide">
                Fərdi Terapiya Seansı (50 dəqiqə)
              </div>
              <div className="text-xl font-black text-[#251D4B] mt-0.5">
                {psychologist.pricePerSession} AZN
                <span className="text-xs font-normal text-slate-600 ml-2">
                  (Ən yaxın vaxt: {psychologist.nextAvailableSlot})
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookNow(psychologist);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#191333] shadow-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#CADFFD]" />
              <span>İndi Randevu Al</span>
            </button>
          </div>

          {/* Bio & Philosophy */}
          <div>
            <h3 className="text-base font-bold text-[#251D4B] mb-2">Haqqında</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {psychologist.bio}
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#251D4B] mb-2">Terapiya Yanaşması və İş Prinsipi</h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
              {psychologist.aboutTherapy}
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-base font-bold text-[#251D4B] mb-2.5">İxtisas Sahələri</h3>
            <div className="flex flex-wrap gap-2">
              {psychologist.specializations.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-[#251D4B] font-semibold text-xs border border-slate-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#251D4B]">
                <GraduationCap className="w-4 h-4 text-[#251D4B]" />
                <span>Ali Təhsil</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {psychologist.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#251D4B]">
                <Award className="w-4 h-4 text-[#251D4B]" />
                <span>Beynəlxalq Sertifikatlar</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {psychologist.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Consultation Location & Modality */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="font-bold text-[#251D4B]">Görüş Məkanı və Qrafik:</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{psychologist.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Qəbul günləri: {psychologist.availableDays.join(', ')}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Bağla
          </button>

          <button
            onClick={() => {
              onClose();
              onBookNow(psychologist);
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#181333] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
            <span>Randevu Təyin Et</span>
          </button>
        </div>

      </div>
    </div>
  );
};
