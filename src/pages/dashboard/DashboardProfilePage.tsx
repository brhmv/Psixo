import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CheckCircle2,
  Camera,
  Shield,
  Heart,
  AlertTriangle,
  Save
} from 'lucide-react';
import { MOCK_USER } from '../../data/mockData';

export const DashboardProfilePage: React.FC = () => {
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [phone, setPhone] = useState(MOCK_USER.phone);
  const [birthDate, setBirthDate] = useState('1994-05-14');
  const [gender, setGender] = useState('Kişi');
  const [city, setCity] = useState('Bakı');
  const [goals, setGoals] = useState(
    'Emosional gərginliyi azaltmaq, iş və şəxsi həyat balansını qurmaq, şəxsi sərhədləri qorumaq.'
  );
  const [emergencyContactName, setEmergencyContactName] = useState('Nigar İbrahimova (Həyat yoldaşı)');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('+994 50 987 65 43');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Şəxsi Profilim</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Fərdi məlumatlarınızı, psixoloji məqsədlərinizi və təcili əlaqə nömrənizi idarə edin.
          </p>
        </div>

        {saved && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Dəyişikliklər yadda saxlanıldı!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Profile Card & Avatar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
            Əsas Fərdi Məlumatlar
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
              />
              <button
                type="button"
                onClick={() => alert('Profil şəkli seçmə dialoqu')}
                className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors shadow-md"
                title="Şəkli dəyiş"
              >
                <Camera className="w-4 h-4 text-[#CADFFD]" />
              </button>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-black text-lg text-[#251D4B]">{name}</h3>
              <p className="text-xs text-slate-500 font-medium">Müştəri ID: DAYAQ-USR-8942</p>
              <div className="pt-1 flex items-center gap-2 justify-center sm:justify-start">
                <span className="px-2.5 py-0.5 rounded-full bg-[#CADFFD]/40 text-[#251D4B] text-[11px] font-bold">
                  Aktiv Üzv
                </span>
                <span className="text-xs text-slate-400">Üzvlük: Yanvar 2026-dan</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Ad və Soyad</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">E-poçt Ünvanı</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Telefon Nömrəsi</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Doğum Tarixi</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Cins</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              >
                <option value="Kişi">Kişi</option>
                <option value="Qadın">Qadın</option>
                <option value="Qeyd etmək istəmirəm">Qeyd etmək istəmirəm</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Şəhər / Ölkə</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>
          </div>
        </div>

        {/* Psychological Goals & Therapy Bio */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Heart className="w-5 h-5 text-rose-500" />
            <h2 className="text-base font-black text-[#251D4B]">
              Psixoloji Məqsədlərim və Gözləntilərim
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Bu qeydlər yalnız seans təyin etdiyiniz mütəxəssislər tərəfindən sizə daha fərdi yanaşma təmin etmək üçün görülə bilər.
          </p>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B] leading-relaxed"
          />
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-black text-[#251D4B]">Təcili Əlaqə Şəxsi</h2>
          </div>
          <p className="text-xs text-slate-500">
            Təcili vəziyyətlərdə müraciət edilə biləcək yaxın şəxsin əlaqə məlumatları.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Yaxın şəxsin Adı və Qohumluq dərəcəsi</label>
              <input
                type="text"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Təcili Əlaqə Nömrəsi</label>
              <input
                type="tel"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-[#251D4B] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#CADFFD]" />
            <span>Dəyişiklikləri Yadda Saxla</span>
          </button>
        </div>

      </form>

    </div>
  );
};
