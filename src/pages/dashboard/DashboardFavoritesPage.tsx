import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Star,
  Calendar,
  Clock,
  BookOpen,
  Video,
  FileText,
  Trash2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  PSYCHOLOGISTS_DATA,
  WEBINARS_DATA,
  COURSES_DATA,
  ARTICLES_DATA,
  USER_MOCK_FAVORITES
} from '../../data/mockData';

export const DashboardFavoritesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'psychologists' | 'webinars' | 'trainings' | 'articles'>('psychologists');
  const [favPsychologistIds, setFavPsychologistIds] = useState<string[]>(USER_MOCK_FAVORITES.psychologistIds);
  const [favWebinarIds, setFavWebinarIds] = useState<string[]>(USER_MOCK_FAVORITES.webinarIds);
  const [favCourseIds, setFavCourseIds] = useState<string[]>(USER_MOCK_FAVORITES.courseIds);
  const [favArticleIds, setFavArticleIds] = useState<string[]>(USER_MOCK_FAVORITES.articleIds);

  const removeFavorite = (type: string, id: string) => {
    if (type === 'psychologists') setFavPsychologistIds(favPsychologistIds.filter((x) => x !== id));
    if (type === 'webinars') setFavWebinarIds(favWebinarIds.filter((x) => x !== id));
    if (type === 'trainings') setFavCourseIds(favCourseIds.filter((x) => x !== id));
    if (type === 'articles') setFavArticleIds(favArticleIds.filter((x) => x !== id));
  };

  const favoritePsychologists = PSYCHOLOGISTS_DATA.filter((p) => favPsychologistIds.includes(p.id));
  const favoriteWebinars = WEBINARS_DATA.filter((w) => favWebinarIds.includes(w.id));
  const favoriteCourses = COURSES_DATA.filter((c) => favCourseIds.includes(c.id));
  const favoriteArticles = ARTICLES_DATA.filter((a) => favArticleIds.includes(a.id));

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Seçilmişlər</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Bəyəndiyiniz və daha sonra müraciət etmək üçün yadda saxladığınız bütün məzmunlar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>
              {favPsychologistIds.length + favWebinarIds.length + favCourseIds.length + favArticleIds.length} element saxlanılıb
            </span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('psychologists')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'psychologists'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Psixoloqlar ({favoritePsychologists.length})
        </button>

        <button
          onClick={() => setActiveTab('webinars')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'webinars'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Vebinarlar ({favoriteWebinars.length})
        </button>

        <button
          onClick={() => setActiveTab('trainings')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'trainings'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Təlimlər ({favoriteCourses.length})
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'articles'
              ? 'bg-[#251D4B] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Məqalələr ({favoriteArticles.length})
        </button>
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === 'psychologists' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoritePsychologists.length > 0 ? (
            favoritePsychologists.map((psychologist) => (
              <div
                key={psychologist.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#CADFFD] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={psychologist.photo}
                    alt={psychologist.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shrink-0"
                  />
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-sm text-[#251D4B] truncate">{psychologist.name}</h3>
                      <button
                        onClick={() => removeFavorite('psychologists', psychologist.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                        title="Seçilmişlərdən sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">{psychologist.title}</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {psychologist.rating}
                      </span>
                      <span>•</span>
                      <span>₼{psychologist.pricePerSession} / seans</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <Link
                    to={`/psixoloqlar/${psychologist.id}`}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#251D4B] text-center"
                  >
                    Profilə bax
                  </Link>
                  <Link
                    to={`/seans/rezervasiya?psychologist=${psychologist.id}`}
                    className="py-2.5 px-3 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#CADFFD]" />
                    <span>Seans təyin et</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
              <Heart className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-[#251D4B]">Seçilmiş psixoloq yoxdur</h3>
            </div>
          )}
        </div>
      )}

      {activeTab === 'webinars' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteWebinars.length > 0 ? (
            favoriteWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div className="relative aspect-video">
                  <img
                    src={webinar.coverImage}
                    alt={webinar.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFavorite('webinars', webinar.id)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 text-rose-500 hover:bg-white transition-colors shadow-xs"
                    title="Seçilmişlərdən sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-black text-sm text-[#251D4B] line-clamp-2">{webinar.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{webinar.date}</span>
                    <span>•</span>
                    <span>{webinar.speaker.name}</span>
                  </div>
                  <Link
                    to={`/vebinarlar/${webinar.id}`}
                    className="w-full py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold text-center block mt-2"
                  >
                    Vebinara bax
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
              <Video className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-[#251D4B]">Seçilmiş vebinar yoxdur</h3>
            </div>
          )}
        </div>
      )}

      {activeTab === 'trainings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteCourses.length > 0 ? (
            favoriteCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div className="relative aspect-video">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFavorite('trainings', course.id)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 text-rose-500 hover:bg-white transition-colors shadow-xs"
                    title="Seçilmişlərdən sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-black text-sm text-[#251D4B] line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{course.durationHours} saat • {course.lessonsCount} dərs</span>
                  </div>
                  <Link
                    to={`/telimler/${course.id}`}
                    className="w-full py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold text-center block mt-2"
                  >
                    Təlimə bax
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-[#251D4B]">Seçilmiş təlim yoxdur</h3>
            </div>
          )}
        </div>
      )}

      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteArticles.length > 0 ? (
            favoriteArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#CADFFD] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg">
                      {article.category}
                    </span>
                    <button
                      onClick={() => removeFavorite('articles', article.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                      title="Seçilmişlərdən sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-black text-sm text-[#251D4B] line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{article.excerpt}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400">{article.readTimeMinutes} dəq oxu</span>
                  <Link
                    to={`/meqaleler/${article.id}`}
                    className="text-[#251D4B] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Məqaləni oxu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
              <FileText className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-[#251D4B]">Seçilmiş məqalə yoxdur</h3>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
