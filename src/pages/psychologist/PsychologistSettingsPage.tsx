import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  CreditCard,
  Lock,
  CheckCircle2,
  Save,
  Building2,
  Smartphone,
  Mail,
  KeyRound
} from 'lucide-react';

export const PsychologistSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'billing' | 'booking'>('security');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security Form
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Notifications State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNewBooking: true,
    emailCancellations: true,
    emailMessages: true,
    emailMarketing: false,
    smsReminders: true
  });

  // Billing / Bank State
  const [bankDetails, setBankDetails] = useState({
    bankName: 'Azərbaycan Beynəlxalq Bankı (ABB)',
    accountHolder: 'Dr. Aysel Məmmədova',
    iban: 'AZ34NABZ01350100000000123456',
    voen: '1234567891'
  });

  // Booking Policies
  const [bookingPolicies, setBookingPolicies] = useState({
    autoAccept: true,
    cancellationBufferHours: 24,
    preSessionNoteRequired: true
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      alert('Yeni şifrələr uyğun gəlmir');
      return;
    }
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast('Təhlükəsizlik və şifrə parametrləri uğurla yeniləndi.');
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Bank rekvizitləri və VÖEN məlumatları yadda saxlanıldı.');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Tənzimləmələr</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Təhlükəsizlik, bildirişlər, bank rekvizitləri və seans qaydalarını idarə edin.
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'security', label: 'Təhlükəsizlik & Şifrə', icon: Lock },
          { id: 'notifications', label: 'Bildirişlər', icon: Bell },
          { id: 'billing', label: 'Bank Rekvizitləri & VÖEN', icon: CreditCard },
          { id: 'booking', label: 'Rezervasiya Qaydaları', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Security */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
            Şifrə Dəyişikliyi
          </h2>

          <form onSubmit={handleSaveSecurity} className="space-y-4 max-w-md">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Cari Şifrə</label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Yeni Şifrə</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Yeni Şifrənin Təkrarı</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                required
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
            >
              Şifrəni Yenilə
            </button>
          </form>

          {/* 2FA */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-bold text-xs text-[#251D4B]">İki Mərhələli Doğrulama (2FA)</div>
              <div className="text-[11px] text-slate-500">Hesaba daxil olarkən SMS və ya Authenticator kodu tələb olunsun</div>
            </div>
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => {
                setTwoFactorEnabled(e.target.checked);
                showToast(e.target.checked ? '2FA aktivləşdirildi.' : '2FA deaktiv edildi.');
              }}
              className="w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
            E-poçt və SMS Bildirişləri
          </h2>

          <div className="space-y-4 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="font-bold text-xs text-[#251D4B]">Yeni Rezervasiya Bildirişi</div>
                <div className="text-[11px] text-slate-500">Müştəri yeni seans bron etdikdə dərhal e-poçt göndərilsin</div>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.emailNewBooking}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNewBooking: e.target.checked })}
                className="w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="font-bold text-xs text-[#251D4B]">Ləğv və Dəyişiklik Xəbərdarlığı</div>
                <div className="text-[11px] text-slate-500">Seans vaxtı dəyişdirildikdə və ya ləğv olunduqda</div>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.emailCancellations}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, emailCancellations: e.target.checked })}
                className="w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="font-bold text-xs text-[#251D4B]">SMS Xatırlatmalar</div>
                <div className="text-[11px] text-slate-500">Seansdan 1 saat əvvəl telefon nömrənizə SMS bildiriş göndərilsin</div>
              </div>
              <input
                type="checkbox"
                checked={notificationSettings.smsReminders}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, smsReminders: e.target.checked })}
                className="w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => showToast('Bildiriş parametrləri saxlanıldı.')}
              className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
            >
              Parametrləri saxla
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Billing & Bank */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
            Bank Rekvizitləri və Vergi Məlumatları
          </h2>

          <form onSubmit={handleSaveBank} className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Bankın Adı</label>
              <input
                type="text"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Hesab Sahibi (Ad, Soyad)</label>
              <input
                type="text"
                value={bankDetails.accountHolder}
                onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">IBAN Hesab Nömrəsi</label>
              <input
                type="text"
                value={bankDetails.iban}
                onChange={(e) => setBankDetails({ ...bankDetails, iban: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#251D4B]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">VÖEN (Vergi Ödəyicisinin Eyniləşdirmə Nömrəsi)</label>
              <input
                type="text"
                value={bankDetails.voen}
                onChange={(e) => setBankDetails({ ...bankDetails, voen: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Rekvizitləri Saxla
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Booking Policies */}
      {activeTab === 'booking' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
            Rezervasiya və Ləğvetmə Şərtləri
          </h2>

          <div className="space-y-4 max-w-lg">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="font-bold text-xs text-[#251D4B]">Avtomatik Seans Təsdiqi</div>
                <div className="text-[11px] text-slate-500">Müştəri ödəniş etdikdə seans avtomatik təsdiqlənsin</div>
              </div>
              <input
                type="checkbox"
                checked={bookingPolicies.autoAccept}
                onChange={(e) => setBookingPolicies({ ...bookingPolicies, autoAccept: e.target.checked })}
                className="w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Müştəri üçün Pulsuz Ləğvetmə Müddəti (saat öncə)</label>
              <select
                value={bookingPolicies.cancellationBufferHours}
                onChange={(e) => setBookingPolicies({ ...bookingPolicies, cancellationBufferHours: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
              >
                <option value={12}>12 saat öncə</option>
                <option value={24}>24 saat öncə (Tövsiyə olunan)</option>
                <option value={48}>48 saat öncə</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                onClick={() => showToast('Rezervasiya qaydaları yeniləndi.')}
                className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Qaydaları Saxla
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
