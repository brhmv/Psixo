import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  MessageSquare,
  Award,
  Sparkles,
  Volume2,
  Maximize2,
  RotateCcw,
  Check,
  X,
  Share2
} from 'lucide-react';
import { COURSES_DATA } from '../../data/mockData';

export const DashboardCoursePlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const course = COURSES_DATA.find((c) => c.id === id) || COURSES_DATA[1] || COURSES_DATA[0];

  // Flatten all lessons from syllabus
  const allLessons = course.syllabus.flatMap((m, moduleIdx) =>
    m.lessons.map((l, lessonIdx) => ({
      ...l,
      moduleTitle: m.title,
      moduleIndex: moduleIdx,
      lessonIndex: lessonIdx
    }))
  );

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([
    allLessons[0]?.id || 'les-1'
  ]);
  const [personalNotes, setPersonalNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const progressPercent = Math.round((completedLessonIds.length / allLessons.length) * 100);

  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id);

  const toggleCompleteCurrent = () => {
    if (isCurrentCompleted) {
      setCompletedLessonIds(completedLessonIds.filter((id) => id !== currentLesson.id));
    } else {
      const newCompleted = [...completedLessonIds, currentLesson.id];
      setCompletedLessonIds(newCompleted);

      if (newCompleted.length === allLessons.length) {
        setShowCompletionModal(true);
      }
    }
  };

  const handleNextLesson = () => {
    if (!isCurrentCompleted) {
      const newCompleted = [...completedLessonIds, currentLesson.id];
      setCompletedLessonIds(newCompleted);
      if (newCompleted.length === allLessons.length) {
        setShowCompletionModal(true);
        return;
      }
    }

    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleSaveNotes = () => {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-7xl mx-auto pb-16">
      
      {/* Learning Header Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/telimler"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Təlimlərimə qayıt"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {course.category}
            </span>
            <h1 className="text-base sm:text-lg font-black text-[#251D4B] truncate max-w-xl">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="w-full md:w-64 space-y-1.5 self-stretch md:self-auto">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-500">Ümumi irəliləyiş</span>
            <span className="text-[#251D4B]">{progressPercent}% tamamlandı</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#251D4B] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Learning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left & Center: Player & Notes (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Focused Video / Content Player */}
          <div className="bg-[#191333] rounded-3xl overflow-hidden shadow-lg border border-slate-800">
            <div className="relative aspect-video flex flex-col items-center justify-center p-6 sm:p-12 text-center text-white bg-radial from-[#251D4B] to-[#120D24]">
              <div className="w-20 h-20 rounded-full bg-[#CADFFD]/20 border-2 border-[#CADFFD] text-[#CADFFD] flex items-center justify-center mb-4 shadow-xl hover:scale-105 transition-transform cursor-pointer">
                <PlayCircle className="w-12 h-12" />
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-2">
                Dərs {currentLessonIndex + 1} / {allLessons.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white max-w-lg">
                {currentLesson.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Müddət: {currentLesson.duration} • Təlimçi: {course.instructor.name}
              </p>

              {/* Player Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 cursor-pointer hover:text-[#CADFFD]" />
                  <Volume2 className="w-4 h-4 cursor-pointer hover:text-[#CADFFD]" />
                  <span className="text-[11px] text-slate-300">1080p HD</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">1.0x Sürət</span>
                  <Maximize2 className="w-4 h-4 cursor-pointer hover:text-[#CADFFD]" />
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Navigation & Completion Action */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handlePrevLesson}
                disabled={currentLessonIndex === 0}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Əvvəlki dərs</span>
              </button>

              <button
                onClick={handleNextLesson}
                disabled={currentLessonIndex === allLessons.length - 1}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Növbəti dərs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={toggleCompleteCurrent}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                isCurrentCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-[#251D4B] text-white hover:bg-[#1a1435]'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isCurrentCompleted ? 'Dərs tamamlandı ✓' : 'Dərsi tamamlandı kimi qeyd et'}</span>
            </button>
          </div>

          {/* Lesson Details, Materials & Notes Tabs */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-[#251D4B]">{currentLesson.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentLesson.description || 'Bu dərsdə mövzu üzrə əsas klinik yanaşmalar və tətbiqi tapşırıqlar izah olunur.'}
              </p>
            </div>

            {/* Materials Download */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#251D4B]">Dərsə aid praktik iş vərəqi (PDF)</h4>
                  <p className="text-[11px] text-slate-400">Özünüqiymətləndirmə testi və çalışma qeydləri</p>
                </div>
              </div>

              <button
                onClick={() => alert('Dərs materialı PDF formatında yükləndi.')}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-[#251D4B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#251D4B]" />
                <span>PDF Yüklə</span>
              </button>
            </div>

            {/* Personal Notes Box */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#251D4B] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                  <span>Şəxsi qeydlərim</span>
                </label>
                {notesSaved && (
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Qeyd yadda saxlanıldı
                  </span>
                )}
              </div>
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Bu dərsdən çıxardığınız əsas nəticələri və fikirlərinizi bura yazın..."
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#251D4B] transition-all"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#251D4B] hover:text-white text-slate-700 text-xs font-bold transition-colors"
              >
                Qeydi yadda saxla
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Course Curriculum (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-black text-sm text-[#251D4B] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#251D4B]" />
                <span>Kurs Proqramı</span>
              </h2>
              <span className="text-xs font-bold text-slate-400">
                {completedLessonIds.length}/{allLessons.length}
              </span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {course.syllabus.map((module, modIdx) => (
                <div key={module.id} className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    {module.title}
                  </h4>
                  <div className="space-y-1.5">
                    {module.lessons.map((lesson) => {
                      const globalIdx = allLessons.findIndex((l) => l.id === lesson.id);
                      const isCurrent = globalIdx === currentLessonIndex;
                      const isDone = completedLessonIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLessonIndex(globalIdx)}
                          className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-start gap-3 ${
                            isCurrent
                              ? 'bg-[#251D4B] text-white shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="pt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2
                                className={`w-4 h-4 ${
                                  isCurrent ? 'text-emerald-400' : 'text-emerald-600'
                                }`}
                              />
                            ) : (
                              <Circle
                                className={`w-4 h-4 ${
                                  isCurrent ? 'text-white/40' : 'text-slate-300'
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-bold truncate ${isCurrent ? 'text-white' : 'text-[#251D4B]'}`}>
                              {lesson.title}
                            </div>
                            <div className={`text-[10px] mt-0.5 ${isCurrent ? 'text-slate-300' : 'text-slate-400'}`}>
                              {lesson.duration}
                            </div>
                          </div>
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

      {/* 21. TRAINING COMPLETION MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center space-y-6 border border-slate-200 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setShowCompletionModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#251D4B]">Təbrik edirik! 🎉</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Siz bu təlimi uğurla tamamladınız.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700 text-left">
              <div>Kurs: <strong>{course.title}</strong></div>
              <div>Təlimçi: <strong>{course.instructor.name}</strong></div>
              <div>Tamamlanma tarixi: <strong>19 Avqust 2026</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/dashboard/sertifikatlar"
                className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-black transition-all shadow-md text-center"
              >
                Sertifikata bax
              </Link>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
