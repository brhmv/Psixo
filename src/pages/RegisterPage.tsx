import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  HeartHandshake,
  UserPlus,
  User,
  Mail,
  Phone,
  Lock,
  Briefcase,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<'user' | 'psychologist'>('user');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (accountType === 'psychologist') {
        navigate('/psixoloq/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      <div className="max-w-lg mx-auto px-4 pt-10">
        <Breadcrumbs items={[{ label: 'Qeydiyyat' }]} />

        <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center mx-auto">
              <HeartHandshake className="w-7 h-7 text-[#CADFFD]" />
            </div>
            <h1 className="text-2xl font-black text-[#251D4B]">
              Yeni Hesab Yaradın
            </h1>
            <p className="text-xs text-slate-500">
              Dayaq ailəsinə qoşularaq fərdi psixoloji inkişafınıza başlayın
            </p>
          </div>

          {/* Account Type Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setAccountType('user')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'user' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Pasiyent / İstifadəçi</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType('psychologist')}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'psychologist' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Psixoloq Müraciəti</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1">
                Ad və Soyad *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Məs: Leyla Quliyeva"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#251D4B] mb-1">
                  E-poçt Ünvanı *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="ad@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#251D4B] mb-1">
                  Mobil Nömrə *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+994 50 000 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {accountType === 'psychologist' && (
              <div>
                <label className="block text-xs font-bold text-[#251D4B] mb-1">
                  Əsas İxtisas İstiqamətiniz *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Məs: Klinik Psixoloq, CBT, Ailə Terapisti"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1">
                Şifrə *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Ən az 8 simvol"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 pt-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 rounded text-[#251D4B] focus:ring-[#251D4B]"
              />
              <span>
                Dayaq platformasının <Link to="/tez-tez-verilen-suallar" className="text-[#251D4B] underline font-bold">İstifadəçi Müqaviləsi</Link> və <Link to="/tez-tez-verilen-suallar" className="text-[#251D4B] underline font-bold">Məxfilik Qaydaları</Link> ilə razıyam.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agree}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4 text-[#CADFFD]" />
              <span>{loading ? 'Hesab yaradılır...' : 'Qeydiyyatı Tamamla'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Artıq hesabınız var?{' '}
            <Link to="/daxil-ol" className="font-bold text-[#251D4B] hover:underline">
              Daxil olun
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};
