import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  HeartHandshake,
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  User,
  Briefcase,
  Shield
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'user' | 'psychologist' | 'admin'>('user');
  const [email, setEmail] = useState('demo@dayaq.az');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'psychologist') {
        navigate('/psixoloq/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      <div className="max-w-md mx-auto px-4 pt-10">
        <Breadcrumbs items={[{ label: 'Daxil ol' }]} />

        <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#251D4B] text-white flex items-center justify-center mx-auto">
              <HeartHandshake className="w-7 h-7 text-[#CADFFD]" />
            </div>
            <h1 className="text-2xl font-black text-[#251D4B]">
              Hesaba Daxil Olun
            </h1>
            <p className="text-xs text-slate-500">
              Dayaq platformasındakı fərdi kabinetinizə keçid edin
            </p>
          </div>

          {/* Role selector tab */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                role === 'user' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Müştəri</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('psychologist')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                role === 'psychologist' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Psixoloq</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                role === 'admin' ? 'bg-white text-[#251D4B] shadow-xs' : 'text-slate-600'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#251D4B] mb-1">
                E-poçt və ya Telefon
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#251D4B]">
                  Şifrə
                </label>
                <Link to="/tez-tez-verilen-suallar" className="text-[11px] text-[#251D4B] hover:underline font-semibold">
                  Şifrəni unutmusunuz?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <LogIn className="w-4 h-4 text-[#CADFFD]" />
              <span>{loading ? 'Daxil olunur...' : 'Daxil ol'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Hesabınız yoxdur?{' '}
            <Link to="/qeydiyyat" className="font-bold text-[#251D4B] hover:underline">
              Qeydiyyatdan keçin
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};
