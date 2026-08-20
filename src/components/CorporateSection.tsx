import React, { useState } from 'react';
import { Building2, Users, HeartPulse, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

export const CorporateSection: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [employeeCount, setEmployeeCount] = useState('10-50 nəfər');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="corporate-section" className="py-12 lg:py-16 bg-slate-50/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Korporativ Mental Sağlamlıq Həlləri</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#251D4B] tracking-tight leading-tight">
              Komandanızın rifahı, şirkətinizin uğurunun təməlidir.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dayaq Korporativ Proqramı ilə əməkdaşlarınıza məxfi fərdi psixoloji dəstək,
              stres idarəetməsi vebinarları və liderlik kouçinqi təqdim edərək işdə tükənmişliyi (burnout) minimuma endirin.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-bold text-xs shrink-0">
                  01
                </div>
                <div>
                  <div className="text-xs font-bold text-[#251D4B]">Əməkdaşlar üçün Məxfi 1-on-1 Seanslar</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Şirkətin xərcləri qarşıladığı tam anonim psixoloji konsultasiyalar.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-bold text-xs shrink-0">
                  02
                </div>
                <div>
                  <div className="text-xs font-bold text-[#251D4B]">Stres Menecmenti & Emosional Zəka Təlimləri</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">İnteraktiv praktiki vebinarlar və komanda daxili sağlam ünsiyyət.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#CADFFD] text-[#251D4B] flex items-center justify-center font-bold text-xs shrink-0">
                  03
                </div>
                <div>
                  <div className="text-xs font-bold text-[#251D4B]">Anonim Komanda Rifahı Hesabatları</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Rəhbərlik üçün ümumi stres indeksi və təşkilati inkişaf tövsiyələri.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-[0_8px_30px_rgba(37,29,75,0.06)]">
              
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#251D4B]">Müraciətiniz Qəbul Edildi!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Təşəkkür edirik. Dayaq korporativ konsultantımız 24 saat ərzində sizinlə əlaqə saxlayaraq fərdi təklif paketi təqdim edəcək.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#CADFFD] text-[#251D4B]"
                  >
                    Yeni müraciət göndər
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xl font-bold text-[#251D4B]">
                      Korporativ Təklif Əldə Edin
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Şirkətinizə uyğun fərdi psixoloji dəstək proqramı hazırlayaq
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1">
                      Şirkətin Adı *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Məs: SOCAR, PASHA Bank, Bravo..."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#251D4B] mb-1">
                        Əməkdaş Sayı
                      </label>
                      <select
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      >
                        <option value="1-10 nəfər">1 - 10 nəfər</option>
                        <option value="10-50 nəfər">10 - 50 nəfər</option>
                        <option value="50-200 nəfər">50 - 200 nəfər</option>
                        <option value="200+ nəfər">200+ nəfər</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#251D4B] mb-1">
                        Məsul Şəxs (Ad, Soyad)
                      </label>
                      <input
                        type="text"
                        placeholder="HR Menecer / Rəhbər"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#251D4B] mb-1">
                        Korporativ E-poçt *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="hr@company.az"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#251D4B] mb-1">
                        Əlaqə Nömrəsi
                      </label>
                      <input
                        type="tel"
                        placeholder="+994 (50) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#CADFFD]/35 border border-[#CADFFD] flex items-center gap-2 text-xs text-[#251D4B]">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Şirkət məlumatları konfidensiallıq müqaviləsi (NDA) ilə qorunur.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Fərdi Korporativ Təklif İstə</span>
                    <Send className="w-3.5 h-3.5 text-[#CADFFD]" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
