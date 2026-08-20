import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      <div className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Əlaqə' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B]">
              Bizimlə Əlaqə
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Sualınız, təklifiniz və ya əməkdaşlıq müraciətiniz üçün komandamız 24/7 xidmətinizdədir.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-[#251D4B]">
              Əlaqə Məlumatları və Ünvan
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#251D4B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#251D4B]">Telefon Dəstəyi</div>
                  <div className="text-slate-600 mt-0.5">+994 (12) 404-18-20</div>
                  <div className="text-slate-400 text-xs">Həftəiçi: 09:00 - 20:00</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#251D4B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#251D4B]">E-poçt Ünvanı</div>
                  <div className="text-slate-600 mt-0.5">destek@dayaq.az</div>
                  <div className="text-slate-400 text-xs">24 saat ərzində cavablandırılır</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#251D4B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#251D4B]">Mərkəzi Baş Ofis</div>
                  <div className="text-slate-600 mt-0.5">Nizami küçəsi 142, Landmark Plaza, Bakı</div>
                </div>
              </div>
            </div>

            {/* Crisis hotline */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
              <strong className="block text-rose-900 font-bold">Krizis Xəbərdarlığı:</strong>
              Təcili həyati təhlükə anında dərhal 112 FHN və ya 103 Təcili Tibbi Yardım xidməti ilə əlaqə saxlayın.
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#251D4B]">Müraciətiniz Qəbul Edildi</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Təşəkkür edirik! Dəstək komandamız ən qısa müddətdə qeyd etdiyiniz e-poçt ünvanı ilə əlaqə saxlayacaq.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#CADFFD] text-[#251D4B]"
                >
                  Yeni Mesaj Göndər
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-[#251D4B] mb-2">
                  Bizə Mesaj Yazın
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1">
                      Adınız və Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Məs: Əli Məmmədov"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#251D4B] mb-1">
                      E-poçt Ünvanınız *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ad@example.com"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#251D4B] mb-1">
                    Mövzu *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Məs: Seans rezervasiyası haqqında sual"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#251D4B] mb-1">
                    Mesajınız *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Sualınızı ətraflı qeyd edin..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-[#251D4B] focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#251D4B] hover:bg-[#191333] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#CADFFD]" />
                  <span>Mesajı Göndər</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
