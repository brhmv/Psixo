import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  PSYCHOLOGISTS_DATA,
  WEBINARS_DATA,
  COURSES_DATA,
  ARTICLES_DATA
} from '../data/mockData';
import {
  Search,
  HeartHandshake,
  Video,
  BookOpen,
  FileText,
  Star,
  Calendar,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const GlobalSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'psychologists' | 'webinars' | 'trainings' | 'articles'>('all');

  const handleSearchChange = (val: string) => {
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        psychologists: PSYCHOLOGISTS_DATA.slice(0, 2),
        webinars: WEBINARS_DATA.slice(0, 2),
        courses: COURSES_DATA.slice(0, 2),
        articles: ARTICLES_DATA.slice(0, 2)
      };
    }

    return {
      psychologists: PSYCHOLOGISTS_DATA.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.specializations.some((s) => s.toLowerCase().includes(q))
      ),
      webinars: WEBINARS_DATA.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.subtitle.toLowerCase().includes(q) ||
          w.speaker.name.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q)
      ),
      courses: COURSES_DATA.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      ),
      articles: ARTICLES_DATA.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    };
  }, [query]);

  const totalResultsCount =
    results.psychologists.length +
    results.webinars.length +
    results.courses.length +
    results.articles.length;

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Axtarış' }]} />

          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl font-black text-[#251D4B]">
              Platforma üzrə Qlobal Axtarış
            </h1>
            <p className="text-sm text-slate-600">
              Mütəxəssisləri, canlı vebinarları, video kursları və maarifləndirici məqalələri bir mərkəzdən tapın.
            </p>
          </div>

          {/* Search Input */}
          <div className="mt-6 relative max-w-3xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Axtarmaq istədiyiniz açar sözü yazın (məs: Stress, Leyla, CBT, Panik atak, Valideynlik)..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-base text-[#251D4B] shadow-sm focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-100 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
            }`}
          >
            Hamısı ({totalResultsCount})
          </button>

          <button
            onClick={() => setActiveTab('psychologists')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'psychologists'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
            }`}
          >
            Psixoloqlar ({results.psychologists.length})
          </button>

          <button
            onClick={() => setActiveTab('webinars')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'webinars'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
            }`}
          >
            Vebinarlar ({results.webinars.length})
          </button>

          <button
            onClick={() => setActiveTab('trainings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'trainings'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
            }`}
          >
            Təlimlər ({results.courses.length})
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'articles'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
            }`}
          >
            Məqalələr ({results.articles.length})
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-8 space-y-12">
          
          {/* Psychologists Section */}
          {(activeTab === 'all' || activeTab === 'psychologists') && results.psychologists.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#251D4B] flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-[#251D4B]" />
                  <span>Psixoloqlar ({results.psychologists.length})</span>
                </h2>
                <Link to="/psixoloqlar" className="text-xs font-bold text-[#251D4B] hover:underline">
                  Hamısına bax →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.psychologists.map((psy) => (
                  <div key={psy.id} className="p-5 rounded-3xl border border-slate-200 flex flex-col justify-between">
                    <div className="flex items-start gap-3.5">
                      <img src={psy.photo} alt={psy.name} className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <Link to={`/psixoloqlar/${psy.id}`} className="font-bold text-sm text-[#251D4B] hover:underline">
                          {psy.name}
                        </Link>
                        <div className="text-xs text-slate-500">{psy.title}</div>
                        <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-0.5">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{psy.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-xs text-[#251D4B]">{psy.pricePerSession} AZN</span>
                      <Link to={`/psixoloqlar/${psy.id}`} className="text-xs font-bold text-[#251D4B] hover:underline">
                        Profilə bax →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Webinars Section */}
          {(activeTab === 'all' || activeTab === 'webinars') && results.webinars.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#251D4B] flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#251D4B]" />
                  <span>Vebinarlar ({results.webinars.length})</span>
                </h2>
                <Link to="/vebinarlar" className="text-xs font-bold text-[#251D4B] hover:underline">
                  Hamısına bax →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.webinars.map((web) => (
                  <div key={web.id} className="p-5 rounded-3xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#251D4B] bg-[#CADFFD]/60 px-2 py-0.5 rounded-md">
                        {web.category}
                      </span>
                      <Link to={`/vebinarlar/${web.id}`} className="block mt-2 font-bold text-sm text-[#251D4B] hover:underline">
                        {web.title}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1">{web.date} · {web.time}</div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-xs text-[#251D4B]">
                        {web.isFree ? 'Ödənişsiz' : `${web.price} AZN`}
                      </span>
                      <Link to={`/vebinarlar/${web.id}`} className="text-xs font-bold text-[#251D4B] hover:underline">
                        Vebinara bax →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trainings Section */}
          {(activeTab === 'all' || activeTab === 'trainings') && results.courses.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#251D4B] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#251D4B]" />
                  <span>Təlimlər & Kurslar ({results.courses.length})</span>
                </h2>
                <Link to="/telimler" className="text-xs font-bold text-[#251D4B] hover:underline">
                  Hamısına bax →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.courses.map((crs) => (
                  <div key={crs.id} className="p-5 rounded-3xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#251D4B] bg-[#CADFFD]/60 px-2 py-0.5 rounded-md">
                        {crs.category}
                      </span>
                      <Link to={`/telimler/${crs.id}`} className="block mt-2 font-bold text-sm text-[#251D4B] hover:underline">
                        {crs.title}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1">{crs.durationHours} saat · {crs.lessonsCount} dərs</div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-xs text-[#251D4B]">{crs.price} AZN</span>
                      <Link to={`/telimler/${crs.id}`} className="text-xs font-bold text-[#251D4B] hover:underline">
                        Təlimə bax →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {(activeTab === 'all' || activeTab === 'articles') && results.articles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#251D4B] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#251D4B]" />
                  <span>Məqalələr ({results.articles.length})</span>
                </h2>
                <Link to="/meqaleler" className="text-xs font-bold text-[#251D4B] hover:underline">
                  Hamısına bax →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.articles.map((art) => (
                  <div key={art.id} className="p-5 rounded-3xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#251D4B] bg-[#CADFFD]/60 px-2 py-0.5 rounded-md">
                        {art.category}
                      </span>
                      <Link to={`/meqaleler/${art.id}`} className="block mt-2 font-bold text-sm text-[#251D4B] hover:underline">
                        {art.title}
                      </Link>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{art.excerpt}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">{art.readTimeMinutes} dəq oxu</span>
                      <Link to={`/meqaleler/${art.id}`} className="text-xs font-bold text-[#251D4B] hover:underline">
                        Məqaləni oxu →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalResultsCount === 0 && (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8">
              <h3 className="font-bold text-lg text-[#251D4B]">Heç bir nəticə tapılmadı</h3>
              <p className="text-xs text-slate-500 mt-1">"{query}" üzrə heç nə tapılmadı. Zəhmət olmasa başqa sözlə yoxlayın.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
