import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Video,
  Calendar,
  Clock,
  DollarSign,
  Users,
  FileText,
  Eye,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  ShieldCheck,
  Globe
} from 'lucide-react';

export const PsychologistCreateWebinarPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Təşviş və Stres',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    language: 'Azərbaycan dili',
    date: '2026-09-10',
    startTime: '20:00',
    durationMinutes: 90,
    timezone: 'Bakı (GMT+4)',
    isFree: false,
    price: 15,
    maxParticipants: 150,
    whatYouWillLearn: [
      'Stres və təşviş anında bədəndə baş verənləri anlamaq',
      'Nəfəs və əzələ relaksasiyası ilə kortizolu tənzimləmək',
      'Neqativ avtomatik düşüncələri rasional analiz etmək'
    ],
    agenda: [
      { timeRange: '20:00 — 20:25', topic: 'Giriş və Nəzəri Əsaslar', description: 'Təşvişin bioloji mexanizmləri' },
      { timeRange: '20:25 — 21:05', topic: 'Praktik CBT Məşqləri', description: 'Canlı relaksasiya texnikası' },
      { timeRange: '21:05 — 21:30', topic: 'Sual-Cavab & Müzakirə', description: 'İştirakçı suallarının cavablandırılması' }
    ]
  });

  const [newLearnItem, setNewLearnItem] = useState('');
  const [newAgendaItem, setNewAgendaItem] = useState({ timeRange: '', topic: '', description: '' });

  const handleAddLearnItem = () => {
    if (!newLearnItem.trim()) return;
    setFormData({
      ...formData,
      whatYouWillLearn: [...formData.whatYouWillLearn, newLearnItem.trim()]
    });
    setNewLearnItem('');
  };

  const handleRemoveLearnItem = (idx: number) => {
    setFormData({
      ...formData,
      whatYouWillLearn: formData.whatYouWillLearn.filter((_, i) => i !== idx)
    });
  };

  const handleAddAgenda = () => {
    if (!newAgendaItem.topic.trim()) return;
    setFormData({
      ...formData,
      agenda: [...formData.agenda, newAgendaItem]
    });
    setNewAgendaItem({ timeRange: '', topic: '', description: '' });
  };

  const handleRemoveAgenda = (idx: number) => {
    setFormData({
      ...formData,
      agenda: formData.agenda.filter((_, i) => i !== idx)
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const steps = [
    { num: 1, label: 'Əsas məlumatlar' },
    { num: 2, label: 'Tarix və vaxt' },
    { num: 3, label: 'Qiymət' },
    { num: 4, label: 'İştirakçılar' },
    { num: 5, label: 'Məzmun' },
    { num: 6, label: 'Önizləmə' }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Yeni Vebinar Yarat</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Addım-addım onlayn vebinar proqramınızı tərtib edin və moderator təsdiqinə göndərin.
          </p>
        </div>

        <Link
          to="/psixoloq/vebinarlar"
          className="text-xs font-bold text-slate-500 hover:text-[#251D4B] flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Vebinarlara qayıt</span>
        </Link>
      </div>

      {/* Steps Indicator Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[620px] relative">
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-slate-100 -z-0" />
          {steps.map((st) => {
            const isDone = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setCurrentStep(st.num)}
                className="flex items-center gap-2 bg-white px-3 py-1.5 z-10 rounded-2xl group"
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

      {/* Main Step Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        {/* Step 1: Əsas məlumatlar */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 1 — Əsas Məlumatlar
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Vebinarın Başlığı</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="məs: Təşviş və Həyəcanla Mübarizə: CBT və Nəfəs Texnikaları"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Qısa Təsvir / Haqqında</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Vebinarın məqsədi və kimlər üçün nəzərdə tutulduğunu qeyd edin..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Kateqoriya</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  >
                    <option value="Təşviş və Stres">Təşviş və Stres</option>
                    <option value="Şəxsi İnkişaf">Şəxsi İnkişaf</option>
                    <option value="Münasibətlər">Münasibətlər</option>
                    <option value="Klinik Psixologiya">Klinik Psixologiya</option>
                    <option value="Valideyn və Uşaq">Valideyn və Uşaq</option>
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
                    <option value="Rusca">Rusca</option>
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

        {/* Step 2: Tarix və vaxt */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 2 — Tarix və Vaxt
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Keçirilmə Tarixi</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Başlama Saatı</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Müddət (dəqiqə)</label>
                <input
                  type="number"
                  value={formData.durationMinutes}
                  onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Saat Qurşağı</label>
                <input
                  type="text"
                  readOnly
                  value={formData.timezone}
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Qiymət */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 3 — Bilet Qiyməti
            </h2>

            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="freeCheck"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="w-4 h-4 rounded text-[#251D4B] focus:ring-[#251D4B]"
                />
                <label htmlFor="freeCheck" className="text-xs font-bold text-[#251D4B] cursor-pointer">
                  Bu vebinar ödənişsizdir (Açıq maarifləndirmə)
                </label>
              </div>

              {!formData.isFree && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Bilet Qiyməti (AZN)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="15"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                  />
                  <p className="text-[10px] text-slate-400">Platforma komissiyası: 10%</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: İştirakçılar */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 4 — Maksimum İştirakçı Sayı
            </h2>

            <div className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Maksimum Qeydiyyat Limiti</label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <p className="text-[10px] text-slate-500">
                  Canlı yayımın keyfiyyətli keçməsi və Q&A idarəsi üçün maksimum 250 iştirakçı tövsiyə olunur.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Məzmun */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 5 — Vebinar Məzmunu və Qrafiki
            </h2>

            {/* What you will learn */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">İştirakçılar Nələr Öyrənəcək?</label>
              <div className="space-y-2">
                {formData.whatYouWillLearn.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700"
                  >
                    <span>• {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLearnItem(idx)}
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
                  value={newLearnItem}
                  onChange={(e) => setNewLearnItem(e.target.value)}
                  placeholder="Yeni öyrənmə bəndi əlavə et..."
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <button
                  type="button"
                  onClick={handleAddLearnItem}
                  className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#b8d4fc]"
                >
                  Əlavə et
                </button>
              </div>
            </div>

            {/* Agenda */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700">Vebinar Cədvəli (Agenda)</label>
              <div className="space-y-2">
                {formData.agenda.map((ag, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#251D4B]">{ag.timeRange}</span> —{' '}
                      <span className="font-semibold text-slate-800">{ag.topic}</span>
                      <div className="text-[11px] text-slate-500">{ag.description}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAgenda(idx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <input
                  type="text"
                  value={newAgendaItem.timeRange}
                  onChange={(e) => setNewAgendaItem({ ...newAgendaItem, timeRange: e.target.value })}
                  placeholder="Vaxt (məs: 20:00 - 20:30)"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <input
                  type="text"
                  value={newAgendaItem.topic}
                  onChange={(e) => setNewAgendaItem({ ...newAgendaItem, topic: e.target.value })}
                  placeholder="Mövzu başlığı"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <input
                  type="text"
                  value={newAgendaItem.description}
                  onChange={(e) => setNewAgendaItem({ ...newAgendaItem, description: e.target.value })}
                  placeholder="Qısa təsvir"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <button
                type="button"
                onClick={handleAddAgenda}
                className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#b8d4fc]"
              >
                + Cədvələ bənd əlavə et
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Önizləmə */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-base font-black text-[#251D4B] border-b border-slate-100 pb-3">
              Addım 6 — İctimai Önizləmə & Təsdiq
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
                    <span className="text-xs font-black text-[#251D4B]">
                      {formData.isFree ? 'Ödənişsiz' : `₼${formData.price}`}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#251D4B]">
                    {formData.title || 'Vebinar Başlığı'}
                  </h3>
                  <div className="text-xs text-slate-600 font-medium">
                    {formData.date} • {formData.startTime} ({formData.durationMinutes} dəqiqə)
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Haqqında</div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {formData.description || 'Məlumat daxil edilməyib.'}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Nələr Öyrənəcəksiniz</div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {formData.whatYouWillLearn.map((w, idx) => (
                    <li key={idx}>✓ {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Vebinar yoxlamaya göndərildikdən sonra Dayaq moderatorları tərəfindən 2-4 saat ərzində təsdiqlənəcək və ictimai cədvəldə yayımlanacaq.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
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

          {currentStep < 6 ? (
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

      {/* Submission Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-black text-lg text-[#251D4B]">Yoxlamaya Göndərildi!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vebinarınız uğurla qeydiyyata alındı və statusu <strong>"Yoxlamada"</strong> olaraq təyin edildi. Təsdiq edildikdə bildiriş alacaqsınız.
              </p>
            </div>

            <button
              onClick={() => navigate('/psixoloq/vebinarlar')}
              className="w-full py-3 rounded-2xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
            >
              Vebinarlarıma qayıt
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
