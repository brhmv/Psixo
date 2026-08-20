import React, { useState } from 'react';
import {
  Lock,
  Bell,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Save,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';

export const DashboardSettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications
  const [emailSessions, setEmailSessions] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [webinarUpdates, setWebinarUpdates] = useState(true);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [reminderMinutes, setReminderMinutes] = useState('30');

  // Language
  const [language, setLanguage] = useState('az');

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Yeni şifrələr bir-birinə uyğun gəlmir!');
      return;
    }
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Tənzimləmələr</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Hesab təhlükəsizliyi, bildirişlər və fərdi platforma seçimlərinizi idarə edin.
          </p>
        </div>

        {saved && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tənzimləmələr yadda saxlanıldı!</span>
          </div>
        )}
      </div>

      {/* 1. Security / Password Change */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <KeyRound className="w-5 h-5 text-[#251D4B]" />
          <h2 className="text-base font-black text-[#251D4B]">Şifrə və Giriş Təhlükəsizliyi</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Cari Şifrə</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Yeni Şifrə</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Yeni Şifrənin Təkrarı</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-slate-500 hover:text-slate-700 font-semibold flex items-center gap-1.5"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showPassword ? 'Şifrələri gizlət' : 'Şifrələri göstər'}</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] transition-colors"
          >
            Şifrəni Yenilə
          </button>
        </div>
      </form>

      {/* 2. Notification Preferences */}
      <form onSubmit={handleSavePreferences} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Bell className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-black text-[#251D4B]">Bildiriş Seçimləri</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <div>
              <div className="font-bold text-xs text-[#251D4B]">Seans xatırlatmaları (E-poçt & SMS)</div>
              <div className="text-[11px] text-slate-400">Görüşünüzdən öncə xatırlatma bildirişi göndərilir</div>
            </div>
            <input
              type="checkbox"
              checked={smsReminders}
              onChange={(e) => setSmsReminders(e.target.checked)}
              className="w-4 h-4 accent-[#251D4B] rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <div>
              <div className="font-bold text-xs text-[#251D4B]">Canlı vebinar xatırlatmaları</div>
              <div className="text-[11px] text-slate-400">Qeydiyyatdan keçdiyiniz canlı yayım başlamazdan əvvəl link göndərilir</div>
            </div>
            <input
              type="checkbox"
              checked={webinarUpdates}
              onChange={(e) => setWebinarUpdates(e.target.checked)}
              className="w-4 h-4 accent-[#251D4B] rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <div>
              <div className="font-bold text-xs text-[#251D4B]">Yeni təlimlər və məqalələr bülleteni</div>
              <div className="text-[11px] text-slate-400">Həftəlik psixoloji tövsiyələr və xüsusi endirimlər</div>
            </div>
            <input
              type="checkbox"
              checked={marketingEmail}
              onChange={(e) => setMarketingEmail(e.target.checked)}
              className="w-4 h-4 accent-[#251D4B] rounded"
            />
          </label>
        </div>

        <div className="pt-2">
          <label className="block text-xs font-bold text-[#251D4B] mb-1.5">Seansdan nə qədər əvvəl xatırladılsın?</label>
          <select
            value={reminderMinutes}
            onChange={(e) => setReminderMinutes(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
          >
            <option value="15">15 dəqiqə əvvəl</option>
            <option value="30">30 dəqiqə əvvəl (Tövsiyə olunur)</option>
            <option value="60">1 saat əvvəl</option>
            <option value="120">2 saat əvvəl</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] transition-colors"
          >
            Bildirişləri Yadda Saxla
          </button>
        </div>
      </form>

      {/* 3. Language & Regional */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-black text-[#251D4B]">İnterfeys Dili</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setLanguage('az')}
            className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
              language === 'az'
                ? 'border-[#251D4B] bg-[#251D4B] text-white'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            🇦🇿 Azərbaycan dili (Əsas)
          </button>

          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
              language === 'en'
                ? 'border-[#251D4B] bg-[#251D4B] text-white'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            🇬🇧 English
          </button>

          <button
            type="button"
            onClick={() => setLanguage('ru')}
            className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
              language === 'ru'
                ? 'border-[#251D4B] bg-[#251D4B] text-white'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            🇷🇺 Русский
          </button>
        </div>
      </div>

      {/* 4. Danger Zone */}
      <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200 space-y-4">
        <div className="flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-rose-600" />
          <h2 className="text-base font-black text-rose-800">Hesabın Silinməsi və ya Dondurulması</h2>
        </div>
        <p className="text-xs text-rose-700 leading-relaxed">
          Hesabınızı sildikdə bütün seans tarixçəniz, sertifikatlarınız və şəxsi qeydləriniz bərpa olunmayacaq şəkildə silinəcəkdir.
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm('Hesabınızı silmək üçün müraciət göndərmək istədiyinizə əminsiniz?')) {
              alert('Müraciətiniz qeydə alındı. Dəstək komandamız 24 saat ərzində sizinlə əlaqə saxlayacaq.');
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
        >
          Hesabımı silmək üçün müraciət et
        </button>
      </div>

    </div>
  );
};
