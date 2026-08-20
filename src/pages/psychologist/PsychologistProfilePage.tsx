import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  Award,
  Clock,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  Upload,
  Globe,
  DollarSign,
  FileText,
  Eye,
  Save,
  Star,
  CheckCircle2
} from 'lucide-react';
import { PSYCHOLOGIST_PROFILE_MOCK, PsychologistProfileData } from '../../data/psychologistMockData';

export const PsychologistProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<PsychologistProfileData>(PSYCHOLOGIST_PROFILE_MOCK);
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'education' | 'certificates' | 'services' | 'preview'>('personal');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New item form states
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newEdu, setNewEdu] = useState({ university: '', degree: '', startYear: '', endYear: '' });
  const [newCert, setNewCert] = useState({ title: '', organization: '', year: '' });
  const [newService, setNewService] = useState({ title: '', description: '', durationMinutes: 50, price: 60 });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addSpecialty = () => {
    if (!newSpecialty.trim()) return;
    setProfile({
      ...profile,
      specialtyTopics: [...profile.specialtyTopics, newSpecialty.trim()]
    });
    setNewSpecialty('');
  };

  const removeSpecialty = (index: number) => {
    setProfile({
      ...profile,
      specialtyTopics: profile.specialtyTopics.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    if (!newEdu.university.trim() || !newEdu.degree.trim()) return;
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        {
          id: `edu-${Date.now()}`,
          university: newEdu.university,
          degree: newEdu.degree,
          startYear: newEdu.startYear,
          endYear: newEdu.endYear
        }
      ]
    });
    setNewEdu({ university: '', degree: '', startYear: '', endYear: '' });
  };

  const removeEducation = (id: string) => {
    setProfile({
      ...profile,
      education: profile.education.filter((e) => e.id !== id)
    });
  };

  const addCertificate = () => {
    if (!newCert.title.trim() || !newCert.organization.trim()) return;
    setProfile({
      ...profile,
      certificates: [
        ...profile.certificates,
        {
          id: `cert-${Date.now()}`,
          title: newCert.title,
          organization: newCert.organization,
          year: newCert.year
        }
      ]
    });
    setNewCert({ title: '', organization: '', year: '' });
  };

  const removeCertificate = (id: string) => {
    setProfile({
      ...profile,
      certificates: profile.certificates.filter((c) => c.id !== id)
    });
  };

  const addService = () => {
    if (!newService.title.trim() || !newService.price) return;
    setProfile({
      ...profile,
      services: [
        ...profile.services,
        {
          id: `srv-${Date.now()}`,
          title: newService.title,
          description: newService.description,
          durationMinutes: Number(newService.durationMinutes),
          price: Number(newService.price),
          isActive: true
        }
      ]
    });
    setNewService({ title: '', description: '', durationMinutes: 50, price: 60 });
  };

  const removeService = (id: string) => {
    setProfile({
      ...profile,
      services: profile.services.filter((s) => s.id !== id)
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Profilim</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Müştərilərin gördüyü peşəkar məlumatlarınızı, ixtisaslarınızı və xidmət qiymətlərinizi tənzimləyin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/psixoloqlar"
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#251D4B] flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Profilə bax</span>
          </Link>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-[#CADFFD]" />
            <span>Yadda saxla</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Bütün məlumatlar uğurla yeniləndi və ictimai profilinizə tətbiq edildi.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'personal', label: 'Şəxsi məlumatlar', icon: User },
          { id: 'professional', label: 'Peşəkar məlumatlar', icon: FileText },
          { id: 'education', label: 'Təhsil', icon: GraduationCap },
          { id: 'certificates', label: 'Sertifikatlar', icon: Award },
          { id: 'services', label: 'Xidmətlər və Qiymətlər', icon: DollarSign },
          { id: 'preview', label: 'Profil Görünüşü', icon: Eye }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#251D4B] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#CADFFD]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        {/* Tab 1: Şəxsi məlumatlar */}
        {activeTab === 'personal' && (
          <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
              <img
                src={profile.photo}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-3xl object-cover border-2 border-[#CADFFD] shadow-sm"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-sm font-bold text-[#251D4B]">Profil Şəkli</div>
                <p className="text-xs text-slate-500">Müştərilərə inam verən aydın, peşəkar portret şəkli yükləyin.</p>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#251D4B] inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Şəkli dəyişdir</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ad</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Soyad</label>
                <input
                  type="text"
                  value={profile.surname}
                  onChange={(e) => setProfile({ ...profile, surname: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Telefon nömrəsi</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">E-poçt ünvanı</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Doğum tarixi</label>
                <input
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Yadda saxla
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Peşəkar məlumatlar */}
        {activeTab === 'professional' && (
          <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Peşəkar titul</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  placeholder="məs: Klinik Psixoloq, PhD"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Təcrübə (il)</label>
                <input
                  type="number"
                  value={profile.experienceYears}
                  onChange={(e) => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Əsas İxtisas İstiqaməti</label>
              <input
                type="text"
                value={profile.specialization}
                onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Haqqında (Bioqrafiya və Terapiya Fəlsəfəsi)</label>
              <textarea
                rows={5}
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white leading-relaxed"
              />
            </div>

            {/* İşlədiyi mövzular */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700">İşlədiyiniz Mövzular (Teqlər)</label>
              <div className="flex flex-wrap gap-2">
                {profile.specialtyTopics.map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#CADFFD]/30 border border-[#CADFFD] text-xs font-bold text-[#251D4B]"
                  >
                    <span>{topic}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecialty(i)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 max-w-md pt-1">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Yeni mövzu əlavə et (məs: Obsessiv-Kompulsiv Pozuntu)"
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#b8d4fc]"
                >
                  Əlavə et
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
              >
                Yadda saxla
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Təhsil */}
        {activeTab === 'education' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-[#251D4B]">Akademik Təhsil Məlumatları</h2>
            </div>

            <div className="space-y-3">
              {profile.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-xs text-[#251D4B]">{edu.university}</div>
                    <div className="text-xs text-slate-600">{edu.degree}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{edu.startYear} — {edu.endYear}</div>
                  </div>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Education Form */}
            <div className="p-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/30 space-y-4">
              <div className="text-xs font-bold text-[#251D4B]">Yeni Təhsil Müəssisəsi Əlavə Et</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newEdu.university}
                  onChange={(e) => setNewEdu({ ...newEdu, university: e.target.value })}
                  placeholder="Universitet / İnstitut adı"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="text"
                  value={newEdu.degree}
                  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                  placeholder="İxtisas və Dərəcə (Bakalavr, Magistr, PhD)"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="text"
                  value={newEdu.startYear}
                  onChange={(e) => setNewEdu({ ...newEdu, startYear: e.target.value })}
                  placeholder="Başlama ili (məs: 2012)"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="text"
                  value={newEdu.endYear}
                  onChange={(e) => setNewEdu({ ...newEdu, endYear: e.target.value })}
                  placeholder="Bitirmə ili (məs: 2016)"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>
              <button
                type="button"
                onClick={addEducation}
                className="px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Təhsil əlavə et</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Sertifikatlar */}
        {activeTab === 'certificates' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-[#251D4B]">Peşəkar Sertifikatlar və İcazələr</h2>
            </div>

            <div className="space-y-3">
              {profile.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-xs text-[#251D4B]">{cert.title}</div>
                    <div className="text-xs text-slate-600">{cert.organization}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{cert.year}</div>
                  </div>
                  <button
                    onClick={() => removeCertificate(cert.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Certificate Form */}
            <div className="p-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/30 space-y-4">
              <div className="text-xs font-bold text-[#251D4B]">Yeni Sertifikat Əlavə Et</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  placeholder="Sertifikatın adı"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="text"
                  value={newCert.organization}
                  onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })}
                  placeholder="Verən təşkilat / Assosiasiya"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="text"
                  value={newCert.year}
                  onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
                  placeholder="İl (məs: 2022)"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>
              <button
                type="button"
                onClick={addCertificate}
                className="px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Sertifikatı yüklə</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Xidmətlər və Qiymətlər */}
        {activeTab === 'services' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-[#251D4B]">Təqdim Etdiyiniz Seans Formatları və Qiymətlər</h2>
                <p className="text-xs text-slate-500">Müştərilər bu xidmətlər üzrə sizinlə birbaşa seans bron edə bilər.</p>
              </div>
            </div>

            <div className="space-y-3">
              {profile.services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#251D4B]">{srv.title}</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Aktiv
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">{srv.description}</div>
                    <div className="text-[11px] text-slate-500 font-semibold pt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {srv.durationMinutes} dəqiqə
                      </span>
                      <span>•</span>
                      <span className="text-[#251D4B] font-bold">₼{srv.price} / seans</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeService(srv.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 self-end sm:self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Service */}
            <div className="p-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50/30 space-y-4">
              <div className="text-xs font-bold text-[#251D4B]">Yeni Xidmət Formatı Əlavə Et</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="Xidmətin adı (məs: Fərdi Seans)"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                  placeholder="Qiymət (AZN)"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="number"
                  value={newService.durationMinutes}
                  onChange={(e) => setNewService({ ...newService, durationMinutes: Number(e.target.value) })}
                  placeholder="Müddət (dəqiqə)"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
                <input
                  type="text"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Xidmət haqqında qısa izahat"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B]"
                />
              </div>
              <button
                type="button"
                onClick={addService}
                className="px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Xidməti əlavə et</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 6: Profil Görünüşü (Live Preview) */}
        {activeTab === 'preview' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-[#251D4B]">İctimai Profilinizin Önizləməsi</h2>
                <p className="text-xs text-slate-500">Müştərilər profilinizə daxil olduqda bu məlumatları görürlər.</p>
              </div>
              <Link
                to="/psixoloqlar"
                className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#b8d4fc] flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Profilə bax</span>
              </Link>
            </div>

            {/* Realistic Preview Card */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-slate-50/50 space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-md"
                />
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-xl font-black text-[#251D4B]">
                      Dr. {profile.name} {profile.surname}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Təsdiqlənmiş Mütəxəssis
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600">{profile.title}</div>
                  <div className="text-xs text-slate-500 font-medium">{profile.specialization}</div>

                  <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-bold pt-1 text-slate-700">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{profile.rating}</span>
                      <span className="text-slate-400 font-normal">({profile.reviewCount} rəy)</span>
                    </div>
                    <span>•</span>
                    <div>{profile.experienceYears} il təcrübə</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Haqqında</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{profile.about}</p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">İxtisas Mövzuları</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.specialtyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
