import React from 'react';
import { Search, ShieldCheck, Sparkles, UserCheck, Video, MapPin, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onFindPsychologist: () => void;
  onExploreCourses: () => void;
  onTakeTest: () => void;
  searchSpecialty: string;
  setSearchSpecialty: (val: string) => void;
  filterFormat: 'all' | 'online' | 'in_person';
  setFilterFormat: (val: 'all' | 'online' | 'in_person') => void;
  onQuickSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFindPsychologist,
  onExploreCourses,
  onTakeTest,
  searchSpecialty,
  setSearchSpecialty,
  filterFormat,
  setFilterFormat,
  onQuickSearch
}) => {
  return (
    <section className="relative bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100 overflow-hidden">
      {/* Background Soft Geometric Accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#CADFFD]/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#CADFFD]/20 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-7">
            {/* Soft Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CADFFD] text-[#251D4B] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#251D4B]" />
              <span>Sübuta Əsaslanan Psixoloji Dəstək və Təlimlər</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#251D4B] leading-[1.15] tracking-tight">
              Daxili rahatlığınızı və emosional rifahınızı peşəkarlara etibar edin.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              Azərbaycanın aparıcı sertifikatlı psixoloqları ilə onlayn və əyani fərdi seanslar,
              elmi əsaslı ixtisaslaşmış psixologiya kursları və konfidensial özünüqiymətləndirmə alətləri.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary Button */}
              <button
                id="hero-primary-btn"
                onClick={onFindPsychologist}
                className="px-6 py-3.5 rounded-xl font-bold text-base bg-[#251D4B] text-white hover:bg-[#1b1537] shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <span>Psixoloq tap</span>
                <ArrowRight className="w-4 h-4 text-[#CADFFD]" />
              </button>

              {/* Secondary Button */}
              <button
                id="hero-secondary-btn"
                onClick={onExploreCourses}
                className="px-6 py-3.5 rounded-xl font-bold text-base bg-[#CADFFD] text-[#251D4B] hover:bg-[#bad4fc] transition-colors"
              >
                Təlimləri kəşf et
              </button>

              {/* Outline Button */}
              <button
                id="hero-test-btn"
                onClick={onTakeTest}
                className="px-5 py-3.5 rounded-xl font-bold text-sm bg-white border-2 border-[#251D4B] text-[#251D4B] hover:bg-[#CADFFD]/20 transition-colors"
              >
                Pulsuz Testdən Keç
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#CADFFD]/60 flex items-center justify-center text-[#251D4B]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#251D4B]">100% Məxfi</div>
                  <div className="text-[11px] text-slate-500">Tam qorunan seanslar</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#CADFFD]/60 flex items-center justify-center text-[#251D4B]">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#251D4B]">Lisenziyalı</div>
                  <div className="text-[11px] text-slate-500">Diplomlu mütəxəssislər</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#CADFFD]/60 flex items-center justify-center text-[#251D4B]">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#251D4B]">Onlayn & Əyani</div>
                  <div className="text-[11px] text-slate-500">Sizə uyğun formatda</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quick Search Box & Featured Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_8px_30px_rgba(37,29,75,0.06)] relative">
              
              {/* Header inside search box */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#251D4B]">
                  Sizə ən uyğun mütəxəssisi seçin
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Müraciət səbəbini və sizə rahat olan formatı seçin
                </p>
              </div>

              {/* Form Controls */}
              <div className="space-y-4">
                {/* Topic / Specialty selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#251D4B] mb-1.5">
                    Müraciət Mövzusu / İxtisas
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="hero-search-input"
                      placeholder="Məsələn: Təşviş, Depressiya, Ailə, CBT..."
                      value={searchSpecialty}
                      onChange={(e) => setSearchSpecialty(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && onQuickSearch()}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#251D4B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#251D4B] focus:bg-white transition-all"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                {/* Format selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#251D4B] mb-1.5">
                    Görüş Formatı
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFilterFormat('all')}
                      className={`py-2.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        filterFormat === 'all'
                          ? 'bg-[#251D4B] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/50'
                      }`}
                    >
                      Hamısı
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterFormat('online')}
                      className={`py-2.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        filterFormat === 'online'
                          ? 'bg-[#251D4B] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/50'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Onlayn</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterFormat('in_person')}
                      className={`py-2.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        filterFormat === 'in_person'
                          ? 'bg-[#251D4B] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/50'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Əyani</span>
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  id="hero-quick-search-submit"
                  onClick={onQuickSearch}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#251D4B] text-white hover:bg-[#1a1435] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-4 h-4 text-[#CADFFD]" />
                  <span>Mütəxəssisləri Göstər</span>
                </button>
              </div>

              {/* Soft Info Block */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#CADFFD]/60 border border-[#CADFFD] flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#251D4B] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ?
                </div>
                <div className="text-xs text-[#251D4B] font-medium leading-tight">
                  Seçim etməkdə çətinlik çəkirsiniz? <button onClick={onTakeTest} className="underline font-bold hover:text-black">3 dəqiqəlik testlə</button> sizə uyğun sahəni müəyyənləşdirin.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
