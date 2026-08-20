import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ARTICLES_DATA } from '../data/mockData';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  User
} from 'lucide-react';

export const ArticlesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'Bütün Məqalələr' },
    { id: 'Təşviş & Stress', label: 'Təşviş & Stress' },
    { id: 'Münasibətlər', label: 'Münasibətlər' },
    { id: 'Şəxsi İnkişaf', label: 'Şəxsi İnkişaf' },
    { id: 'Depressiya', label: 'Depressiya' }
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.author.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || art.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* Header Container */}
      <div className="bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Məqalələr' }]} />
          
          <div className="mt-4 max-w-3xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#251D4B] tracking-tight">
              Məqalələr və Psixoloji Bələdçilər
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Psixi sağlamlıq, münasibətlər və emosional dayanıqlılıq üzrə mütəxəssislərimizin elmi əsaslı yazıları.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Məqalə mövzusu və ya müəllif axtarın (məs: Panik atak, Sərhədlər)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm text-[#251D4B] placeholder:text-slate-400 shadow-xs focus:ring-2 focus:ring-[#251D4B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-100 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#CADFFD] text-[#251D4B]">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {art.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTimeMinutes} dəq oxu
                    </span>
                  </div>

                  <Link to={`/meqaleler/${art.id}`} className="block group">
                    <h3 className="font-bold text-lg text-[#251D4B] group-hover:text-slate-700 transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Action */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={art.author.photo}
                    alt={art.author.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-[#251D4B]">{art.author.name}</div>
                    <div className="text-[10px] text-slate-400">{art.author.title}</div>
                  </div>
                </div>

                <Link
                  to={`/meqaleler/${art.id}`}
                  className="p-2 rounded-xl text-xs font-bold text-[#251D4B] hover:bg-[#CADFFD]/30 transition-colors flex items-center gap-1"
                >
                  <span>Oxu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 mt-6 p-8">
            <h3 className="font-bold text-lg text-[#251D4B]">Məqalə tapılmadı</h3>
            <p className="text-xs text-slate-500 mt-1">Axtarış sözünü dəyişməyi yoxlayın.</p>
          </div>
        )}

      </div>

    </div>
  );
};
