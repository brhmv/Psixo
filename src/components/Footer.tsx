import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, PhoneCall, Mail, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      
      {/* Platform Highlight Strip */}
      <div className="bg-[#CADFFD]/30 border-b border-[#CADFFD]/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold text-[#251D4B]">
                Peşəkar Psixoloji Dəstəyə İndi Başlayın
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Onlayn və ya Bakıdakı kabinetlərdə ixtisaslı mütəxəssislərlə məxfi görüş təyin edin.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/psixoloqlar"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors shadow-xs"
              >
                Psixoloq Tap
              </Link>
              <Link
                to="/vebinarlar"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#251D4B] bg-white border border-[#251D4B] hover:bg-[#CADFFD]/20 transition-colors"
              >
                Vebinarlara Bax
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#251D4B] flex items-center justify-center text-white">
                <HeartHandshake className="w-5 h-5 text-[#CADFFD]" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-[#251D4B]">DAYAQ</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  Psixologiya & Təlim
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Azərbaycanın sübuta əsaslanan psixologiya xidmətləri, akkreditasiyalı mütəxəssislərlə fərdi seanslar, canlı vebinarlar və sertifikatlaşdırılmış video təlim platforması.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#251D4B] bg-[#CADFFD]/30 p-2.5 rounded-xl border border-[#CADFFD]/50">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% Məxfilik və Etik Standart Zəmanəti</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <div className="font-bold uppercase tracking-wider text-[#251D4B]">Əsas Bölmələr</div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/psixoloqlar" className="hover:text-[#251D4B] transition-colors">
                  Psixoloqlar
                </Link>
              </li>
              <li>
                <Link to="/vebinarlar" className="hover:text-[#251D4B] transition-colors">
                  Vebinarlar
                </Link>
              </li>
              <li>
                <Link to="/telimler" className="hover:text-[#251D4B] transition-colors">
                  Təlimlər & Kurslar
                </Link>
              </li>
              <li>
                <Link to="/meqaleler" className="hover:text-[#251D4B] transition-colors">
                  Məqalələr & Bələdçi
                </Link>
              </li>
              <li>
                <Link to="/axtaris" className="hover:text-[#251D4B] transition-colors">
                  Qlobal Axtarış
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-bold uppercase tracking-wider text-[#251D4B]">Platforma</div>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/haqqimizda" className="hover:text-[#251D4B] transition-colors">
                  Haqqımızda
                </Link>
              </li>
              <li>
                <Link to="/nece-isleyir" className="hover:text-[#251D4B] transition-colors">
                  Necə İşləyir?
                </Link>
              </li>
              <li>
                <Link to="/psixoloqlar-ucun" className="hover:text-[#251D4B] transition-colors">
                  Psixoloqlar üçün Əməkdaşlıq
                </Link>
              </li>
              <li>
                <Link to="/qiymetler" className="hover:text-[#251D4B] transition-colors font-bold text-[#251D4B]">
                  Qiymətlər & Komissiya
                </Link>
              </li>
              <li>
                <Link to="/tez-tez-verilen-suallar" className="hover:text-[#251D4B] transition-colors">
                  Tez-Tez Verilən Suallar (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/elaqe" className="hover:text-[#251D4B] transition-colors">
                  Bizimlə Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Crisis */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-bold uppercase tracking-wider text-[#251D4B]">Əlaqə & Dəstək</div>
            <div className="space-y-2 text-slate-600">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#251D4B]" />
                <span>+994 (12) 404-18-20</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#251D4B]" />
                <span>destek@dayaq.az</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#251D4B]" />
                <span>Nizami küç. 142, Bakı şəhəri</span>
              </div>
            </div>

            {/* Emergency Hotline Banner */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
              <div className="font-bold text-[#251D4B] mb-0.5">Təcili Krizis Dəstəyi:</div>
              Kəskin psixoloji krizis və ya həyati təhlükə anında dərhal <strong>112</strong> xidmətinə müraciət edin.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 DAYAQ. Bütün hüquqlar qorunur.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/tez-tez-verilen-suallar" className="hover:text-slate-600">Məxfilik Siyasəti</Link>
            <span>·</span>
            <Link to="/tez-tez-verilen-suallar" className="hover:text-slate-600">İstifadə Qaydaları</Link>
            <span>·</span>
            <Link to="/haqqimizda" className="hover:text-slate-600">Etik Kodeks</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
