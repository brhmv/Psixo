import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  PlusCircle,
  Clock,
  PlayCircle,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Video,
  FileText
} from 'lucide-react';

interface Lesson {
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  description?: string;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

export const PsychologistCreateTrainingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Klinik Psixologiya',
    level: 'Başlanğıc və Orta',
    language: 'Azərbaycan dili',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    price: 60,
    hasCertificate: true,
    modules: [
      {
        title: 'Modul 1: CBT Nəzəriyyəsi və Əsasları',
        lessons: [
          { title: 'Düşüncə-Emosiya-Davranış Üçbucağı', durationMinutes: 25, videoUrl: 'https://vimeo.com/12345' },
          { title: 'Koqnitiv Təhriflərin İdentifikasiyası', durationMinutes: 30, videoUrl: 'https://vimeo.com/12346' }
        ]
      },
      {
        title: 'Modul 2: Praktik Texnikalar və Tətbiq',
        lessons: [
          { title: 'Avtomatik Düşüncə Gündəliyi Qurmaq', durationMinutes: 35, videoUrl: 'https://vimeo.com/12347' },
          { title: 'Ekspozisiya və Davranış Təcrübələri', durationMinutes: 40, videoUrl: 'https://vimeo.com/12348' }
        ]
      }
    ] as Module[],
    learningOutcomes: [
      'Koqnitiv davranış terapiyasının fundamental prinsiplərini dərk etmək',
      'Müştərilərdə neqativ avtomatik düşüncələri qeyd edib yenidən çərçivələmək',
      'Terapiyada ev tapşırıqları və davranış eksperimentlərini effektiv təyin etmək'
    ]
  });

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newOutcome, setNewOutcome] = useState('');

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    setFormData({
      ...formData,
      modules: [
        ...formData.modules,
        {
          title: newModuleTitle.trim(),
          lessons: []
        }
      ]
    });
    setNewModuleTitle('');
  };

  const handleRemoveModule = (mIdx: number) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter((_, i) => i !== mIdx)
    });
  };

  const handleAddLesson = (moduleIdx: number) => {
    const updated = [...formData.modules];
    updated[moduleIdx].lessons.push({
      title: 'Yeni Dərs Mövzusu',
      durationMinutes: 20,
      videoUrl: ''
    });
    setFormData({ ...formData, modules: updated });
  };

  const handleRemoveLesson = (mIdx: number, lIdx: number) => {
    const updated = [...formData.modules];
    updated[mIdx].lessons = updated[mIdx].lessons.filter((_, i) => i !== lIdx);
    setFormData({ ...formData, modules: updated });
  };

  const handleAddOutcome = () => {
    if (!newOutcome.trim()) return;
    setFormData({
      ...formData,
      learningOutcomes: [...formData.learningOutcomes, newOutcome.trim()]
    });
    setNewOutcome('');
  };

  const handleRemoveOutcome = (idx: number) => {
    setFormData({
      ...formData,
      learningOutcomes: formData.learningOutcomes.filter((_, i) => i !== idx)
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const steps = [
    { num: 1, label: 'Əsas məlumatlar' },
    { num: 2, label: 'Modullar və Dərslər' },
    { num: 3, label: 'Qiymət və Sertifikat' },
    { num: 4, label: 'Öyrənmə Nəticələri' },
    { num: 5, label: 'Önizləmə & Təsdiq' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Yeni Təlim / Kurs Yarat</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Strukturlaşdırılmış video dərslərdən ibarət kursunuzu qurun və tələbələrə təqdim edin.
          </p>
        </div>

        <Link
          to="/psixoloq/telimler"
          className="text-xs font-bold text-slate-500 hover:text-[#251D4B] flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Təlimlərə qayıt</span>
        </Link>
      </div>

      {/* Step Indicators */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[580px] relative">
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-slate-100 -z-0" />
          {steps.map((st) => {
            const isDone = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setCurrentStep(st.num)}
                className="flex items-center gap-2 bg-white px-3 py-1.5 z-10 rounded-2xl"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-[#251D4B] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                </div>
                <span
                  className={`text-xs font-bold ${
                    isCurrent ? 'text-[#251D4B]' : isDone ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Body */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        {/* Step 1: Əsas Məlumatlar */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 1 — Kursun Əsas Məlumatları
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Təlimin / Kursun Adı</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="məs: Koqnitiv Davranış Terapiyası: Praktik Əsaslar və Tətbiq"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Kurs Haqqında Ətraflı Məlumat</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Təlimin hədəf auditoriyası və proqramın məqsədləri..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kateqoriya</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  >
                    <option value="Klinik Psixologiya">Klinik Psixologiya</option>
                    <option value="CBT və Terapiya">CBT və Terapiya</option>
                    <option value="Valideynlik">Valideynlik</option>
                    <option value="Stres İdarəçiliyi">Stres İdarəçiliyi</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mürəkkəblik Səviyyəsi</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  >
                    <option value="Başlanğıc">Başlanğıc</option>
                    <option value="Başlanğıc və Orta">Başlanğıc və Orta</option>
                    <option value="Orta və İrəli">Orta və İrəli</option>
                    <option value="Peşəkar / İrəli">Peşəkar / İrəli</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tədris Dili</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  >
                    <option value="Azərbaycan dili">Azərbaycan dili</option>
                    <option value="Türkcə">Türkcə</option>
                    <option value="İngiliscə">İngiliscə</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-slate-700">Üz Qabığı Şəkli URL</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Modullar və Dərslər (Curriculum Builder) */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 2 — Tədris Planı (Curriculum Builder)
            </h2>

            <div className="space-y-4">
              {formData.modules.map((module, mIdx) => (
                <div
                  key={mIdx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#251D4B] text-white flex items-center justify-center text-xs font-black">
                        {mIdx + 1}
                      </span>
                      <h4 className="font-black text-sm text-[#251D4B]">{module.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveModule(mIdx)}
                      className="text-slate-400 hover:text-rose-600 text-xs font-semibold"
                    >
                      Modulu sil
                    </button>
                  </div>

                  {/* Lessons in module */}
                  <div className="space-y-2 pl-4 border-l-2 border-[#CADFFD]">
                    {module.lessons.map((lesson, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <PlayCircle className="w-4 h-4 text-[#251D4B] shrink-0" />
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => {
                              const updated = [...formData.modules];
                              updated[mIdx].lessons[lIdx].title = e.target.value;
                              setFormData({ ...formData, modules: updated });
                            }}
                            className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-slate-400">{lesson.durationMinutes} dəq</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLesson(mIdx, lIdx)}
                            className="text-slate-300 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleAddLesson(mIdx)}
                      className="text-xs font-bold text-[#251D4B] hover:underline flex items-center gap-1 pt-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Dərs əlavə et</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Module Box */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  placeholder="Yeni modul başlığı (məs: Modul 3: Vaka Analizi və Tətbiq)..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <button
                  type="button"
                  onClick={handleAddModule}
                  className="px-5 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
                >
                  Modul əlavə et
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Qiymət və Sertifikat */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 3 — Qiymət və Sertifikat
            </h2>

            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Kurs Qiyməti (AZN)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="font-bold text-xs text-[#251D4B]">Rəsmi Bitirmə Sertifikatı</div>
                    <div className="text-[10px] text-slate-500">Tələbələr bütün dərsləri bitirdikdə avtomatik təqdim olunsun</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.hasCertificate}
                  onChange={(e) => setFormData({ ...formData, hasCertificate: e.target.checked })}
                  className="w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Öyrənmə Nəticələri */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 4 — Kurs Nəticələri
            </h2>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Tələbələr Bu Kursu Bitirdikdə Nələri Biləcək?</label>
              <div className="space-y-2">
                {formData.learningOutcomes.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700"
                  >
                    <span>✓ {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOutcome(idx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newOutcome}
                  onChange={(e) => setNewOutcome(e.target.value)}
                  placeholder="Yeni öyrənmə nəticəsi əlavə et..."
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <button
                  type="button"
                  onClick={handleAddOutcome}
                  className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#b8d4fc]"
                >
                  Əlavə et
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Önizləmə & Təsdiq */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 5 — İctimai Önizləmə və Təsdiq
            </h2>

            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={formData.coverImage}
                  alt={formData.title}
                  className="w-full sm:w-60 h-36 rounded-2xl object-cover border border-slate-200"
                />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#251D4B] text-white text-[10px] font-bold">
                      {formData.category}
                    </span>
                    <span className="text-xs font-black text-[#251D4B]">₼{formData.price}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#251D4B]">
                    {formData.title || 'Kurs Başlığı'}
                  </h3>
                  <div className="text-xs text-slate-600 font-medium">
                    {formData.modules.length} modul • {formData.modules.reduce((acc, m) => acc + m.lessons.length, 0)} video dərs
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Modul Strukturu</div>
                <div className="space-y-2">
                  {formData.modules.map((m, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                      <div className="font-bold text-[#251D4B]">{m.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{m.lessons.length} dərs</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Təlim proqramınız Dayaq Ekspert Şurası tərəfindən metodiki baxışdan keçdikdən sonra 1 iş günü ərzində yayımlanacaq.
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Geri</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] flex items-center gap-1.5"
            >
              <span>Növbəti addım</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CADFFD]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitReview}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Yoxlamaya göndər</span>
            </button>
          )}
        </div>

      </div>

      {/* Submission Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-black text-lg text-[#251D4B]">Təlim Yoxlamaya Göndərildi!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kurs materiallarınız qeydə alındı. Ekspert komandası tərəfindən baxıldıqdan sonra status yenilənəcək.
              </p>
            </div>

            <button
              onClick={() => navigate('/psixoloq/telimler')}
              className="w-full py-3 rounded-2xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
            >
              Təlimlərimə qayıt
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
