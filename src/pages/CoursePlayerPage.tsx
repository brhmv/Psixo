import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES_DATA } from '../data/mockData';
import {
  PlayCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Award,
  BookOpen,
  HelpCircle,
  FileText,
  Clock,
  ArrowLeft
} from 'lucide-react';

export const CoursePlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES_DATA.find((c) => c.id === id) || COURSES_DATA[0];

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
    'les-1': true
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'certificate'>('overview');

  const modulesList = course.syllabus || [];
  const currentModule = modulesList[activeModuleIndex] || modulesList[0];
  const currentLesson = currentModule?.lessons?.[activeLessonIndex] || currentModule?.lessons?.[0];

  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  const totalLessons = modulesList.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 1;
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col">
      
      {/* Top Learning Header */}
      <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={`/telimler/${course.id}`}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md">
              {course.title}
            </h1>
            <div className="text-[11px] text-slate-400">
              {currentModule?.title} · {currentLesson?.title}
            </div>
          </div>
        </div>

        {/* Progress bar in header */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:block text-right">
            <span className="text-slate-400 font-semibold">Tərəqqi: </span>
            <strong className="text-emerald-400">{progressPercent}%</strong>
          </div>
          <div className="hidden sm:block w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main LMS View: Video on left, Syllabus on right */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Main Video & Content Area (8 cols) */}
        <div className="lg:col-span-8 bg-black flex flex-col justify-between overflow-y-auto">
          
          {/* Video Player */}
          <div className="w-full aspect-video bg-slate-950 flex flex-col items-center justify-center relative border-b border-slate-800">
            <img
              src={course.coverImage}
              alt={currentLesson?.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative z-10 text-center space-y-3 p-6">
              <div className="w-16 h-16 rounded-full bg-[#CADFFD] text-[#251D4B] flex items-center justify-center mx-auto shadow-2xl">
                <PlayCircle className="w-10 h-10 fill-current text-[#251D4B]" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {currentLesson?.title}
                </h2>
                <div className="text-xs text-slate-400 mt-1">
                  Müddət: {currentLesson?.duration} · {course.instructor.name}
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar & Tabs */}
          <div className="p-6 bg-slate-950 flex-1 space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-lg text-white">{currentLesson?.title}</h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Təlimçi: {course.instructor.name} ({course.instructor.title})
                </div>
              </div>

              <button
                onClick={() => currentLesson && handleToggleComplete(currentLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  currentLesson && completedLessons[currentLesson.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {currentLesson && completedLessons[currentLesson.id]
                    ? 'Dərs Tamamlandı'
                    : 'Dərsi Tamamla'}
                </span>
              </button>
            </div>

            {/* Bottom Tabs */}
            <div className="flex items-center gap-4 text-xs font-bold border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'overview' ? 'border-[#CADFFD] text-[#CADFFD]' : 'border-transparent text-slate-400'
                }`}
              >
                Dərs Haqqında
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'resources' ? 'border-[#CADFFD] text-[#CADFFD]' : 'border-transparent text-slate-400'
                }`}
              >
                Yükləmələr və Resurslar
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'certificate' ? 'border-[#CADFFD] text-[#CADFFD]' : 'border-transparent text-slate-400'
                }`}
              >
                Sertifikat ({progressPercent}%)
              </button>
            </div>

            {/* Tab Panes */}
            {activeTab === 'overview' && (
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                <p>
                  Bu dərsdə psixoloji mexanizmlərin əsas anlayışları və gündəlik həyatda tətbiq edilə biləcək sübuta əsaslanan texnikalar izah olunur.
                </p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  <strong className="text-white block mb-1">Praktik Tapşırıq:</strong>
                  Günün sonunda dərslikdə qeyd olunan 3 əsas düşüncə xətasını öz qeyd dəftərçənizdə analiz edin.
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-white">
                    <FileText className="w-4 h-4 text-[#CADFFD]" />
                    <span>Dərs Materialı və Qeydlər (PDF)</span>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#CADFFD] text-[#251D4B] text-xs font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Yüklə</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'certificate' && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <Award className="w-10 h-10 text-amber-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Rəsmi Bitirmə Sertifikatı</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Bütün dərsləri tamamladıqdan sonra rəsmi QR-kodlu sertifikatınız avtomatik aktivləşəcək və profilinizdə görünəcəkdir.
                </p>
                <Link
                  to="/dashboard/sertifikatlar"
                  className="inline-block px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold"
                >
                  Sertifikatlarımı İdarə Et
                </Link>
              </div>
            )}

          </div>

        </div>

        {/* Right Syllabus Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 border-l border-slate-800 flex flex-col h-full max-h-[calc(100vh-4rem)]">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Tədris Proqramı
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {modulesList.map((mod, mIdx) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-xs font-bold text-slate-300">
                  Modul {mIdx + 1}: {mod.title}
                </div>
                <div className="space-y-1.5">
                  {mod.lessons.map((les, lIdx) => {
                    const isCurrent = activeModuleIndex === mIdx && activeLessonIndex === lIdx;
                    const isDone = completedLessons[les.id];

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveModuleIndex(mIdx);
                          setActiveLessonIndex(lIdx);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 text-xs transition-colors ${
                          isCurrent
                            ? 'bg-[#CADFFD] text-[#251D4B] font-bold'
                            : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-[#251D4B]' : 'text-emerald-400'}`} />
                          ) : (
                            <PlayCircle className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                          )}
                          <span className="truncate">{mIdx + 1}.{lIdx + 1} {les.title}</span>
                        </div>
                        <span className="text-[10px] opacity-70 shrink-0">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
