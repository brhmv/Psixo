import React, { useState } from 'react';
import { Article } from '../types';
import { BookOpen, Clock, Tag, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface KnowledgeHubProps {
  articles: Article[];
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = ['all', 'Təşviş', 'Panik Atak', 'Sərhədlər', 'Münasibət', 'Valideynlik', 'CBT'];

  const filteredArticles = articles.filter((art) => {
    if (selectedTag === 'all') return true;
    return art.tags.includes(selectedTag);
  });

  return (
    <section id="articles-section" className="py-12 lg:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CADFFD] text-[#251D4B] text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Elmi Məqalələr & Bələdçilər</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#251D4B] tracking-tight">
              Psixoloji Maarifləndirmə Mərkəzi
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Gündəlik həyatda qarşılaşdığınız emosional çətinliklər, münasibət dinamikaları və zehni sağlamlıq haqqında mütəxəssis yazıları.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedTag === t
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-[#CADFFD]/40'
              }`}
            >
              {t === 'all' ? 'Bütün Mövzular' : `#${t}`}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_20px_rgba(37,29,75,0.03)] hover:shadow-[0_8px_30px_rgba(37,29,75,0.07)] hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold text-[#251D4B] bg-[#CADFFD]/60 px-2 py-0.5 rounded-md">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTimeMinutes} dəq oxu
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedArticle(art)}
                  className="text-lg font-bold text-[#251D4B] leading-snug hover:text-slate-700 cursor-pointer transition-colors"
                >
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={art.author.photo}
                    alt={art.author.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-[11px]">
                    <div className="font-bold text-[#251D4B]">{art.author.name}</div>
                    <div className="text-slate-400">{art.publishDate}</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArticle(art)}
                  className="p-2 rounded-xl text-xs font-bold text-[#251D4B] hover:bg-[#CADFFD]/40 transition-colors flex items-center gap-1"
                >
                  <span>Oxu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 bg-[#251D4B] text-white relative">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#CADFFD] text-[#251D4B] text-xs font-bold">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl font-bold text-white leading-snug">
                  {selectedArticle.title}
                </h3>
                <div className="text-xs text-slate-300 flex items-center gap-3 pt-1">
                  <span>Müəllif: {selectedArticle.author.name} ({selectedArticle.author.title})</span>
                  <span>·</span>
                  <span>{selectedArticle.publishDate}</span>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Excerpt */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm italic text-slate-700">
                "{selectedArticle.excerpt}"
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="p-5 rounded-2xl bg-[#CADFFD]/35 border border-[#CADFFD] space-y-2.5">
                <div className="text-xs font-bold text-[#251D4B] uppercase tracking-wider">
                  Əsas Nəticələr və Məsləhətlər:
                </div>
                <div className="space-y-2">
                  {selectedArticle.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedArticle.tags.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#251D4B] text-white hover:bg-[#1a1435]"
              >
                Məqaləni Bağla
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
