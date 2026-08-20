import React from 'react';
import { Star, ShieldCheck, Video, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Psychologist } from '../types';

interface PsychologistCardProps {
  psychologist: Psychologist;
  onBook: (psychologist: Psychologist) => void;
  onViewProfile: (psychologist: Psychologist) => void;
}

export const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
  onBook,
  onViewProfile
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-[0_4px_20px_rgba(37,29,75,0.03)] hover:shadow-[0_8px_30px_rgba(37,29,75,0.08)] hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Header: Image, Name, Title, Verified */}
        <div className="flex gap-4 items-start">
          <div className="relative shrink-0">
            <img
              src={psychologist.photo}
              alt={psychologist.name}
              referrerPolicy="no-referrer"
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
            />
            {psychologist.verified && (
              <div
                className="absolute -bottom-1 -right-1 bg-[#251D4B] text-white p-1 rounded-full shadow-sm"
                title="Lisenziyası Təsdiqlənmiş Mütəxəssis"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#CADFFD]" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-[#251D4B] truncate group-hover:text-[#181333] transition-colors">
                {psychologist.name}
              </h3>
            </div>
            
            <p className="text-xs font-semibold text-slate-500 line-clamp-1 mt-0.5">
              {psychologist.title}
            </p>

            {/* Rating and Experience */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1 font-bold text-[#251D4B]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{psychologist.rating}</span>
                <span className="text-slate-400 font-normal">({psychologist.reviewCount} rəy)</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="text-slate-600 font-medium">
                <strong>{psychologist.experienceYears} il</strong> təcrübə
              </div>
            </div>
          </div>
        </div>

        {/* Next Available Slot Pill - uses Secondary #CADFFD */}
        <div className="mt-4 py-1.5 px-3 rounded-lg bg-[#CADFFD]/60 text-[#251D4B] text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#251D4B]" />
            <span>Ən yaxın vaxt: <strong>{psychologist.nextAvailableSlot}</strong></span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#251D4B]/80">
            Aktiv
          </span>
        </div>

        {/* Specialization Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {psychologist.specializations.map((spec, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40 transition-colors"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Format and Languages */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            {psychologist.consultationTypes === 'online' && (
              <span className="flex items-center gap-1 text-[#251D4B] font-semibold">
                <Video className="w-3.5 h-3.5 text-blue-600" /> Onlayn seans
              </span>
            )}
            {psychologist.consultationTypes === 'in_person' && (
              <span className="flex items-center gap-1 text-[#251D4B] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Əyani (Bakı)
              </span>
            )}
            {psychologist.consultationTypes === 'both' && (
              <span className="flex items-center gap-1 text-[#251D4B] font-semibold">
                <Video className="w-3.5 h-3.5" /> Onlayn & Əyani
              </span>
            )}
          </div>
          <div className="text-slate-400 font-medium">
            {psychologist.languages.join(', ')}
          </div>
        </div>
      </div>

      {/* Footer: Price & Buttons */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-400 font-medium">Seans qiyməti (50 dəq)</div>
          <div className="text-xl font-extrabold text-[#251D4B]">
            {psychologist.pricePerSession} <span className="text-sm font-semibold">AZN</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Outline Button: Profilə bax */}
          <button
            onClick={() => onViewProfile(psychologist)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-[#251D4B] text-[#251D4B] hover:bg-[#CADFFD]/30 transition-colors"
          >
            Profil
          </button>

          {/* Primary Button: Randevu al */}
          <button
            onClick={() => onBook(psychologist)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435] shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
            <span>Randevu al</span>
          </button>
        </div>
      </div>
    </div>
  );
};
