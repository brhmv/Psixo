import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  FileText,
  Video,
  ExternalLink,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { PSYCHOLOGISTS_DATA, WEBINARS_DATA, COURSES_DATA } from '../../data/mockData';

export const AdminPanelPage: React.FC = () => {
  const [psychologists, setPsychologists] = useState(PSYCHOLOGISTS_DATA);
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'app-1',
      name: 'Nərgiz Rəhimova',
      degree: 'Klinik Psixologiya Magistri (BSU)',
      experience: '4 il',
      certificate: 'Sxema Terapiya Sertifikatı (ISST)',
      status: 'Gözləmədə'
    },
    {
      id: 'app-2',
      name: 'Samir İsmayılov',
      degree: 'Psixologiya Bakalavr (BDU)',
      experience: '2 il',
      certificate: 'Koqnitiv Davranış Terapiyası',
      status: 'Gözləmədə'
    }
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals(pendingApprovals.filter(p => p.id !== id));
    alert('Mütəxəssis müraciəti uğurla təsdiqləndi və platformada dərc olundu!');
  };

  const handleReject = (id: string) => {
    setPendingApprovals(pendingApprovals.filter(p => p.id !== id));
    alert('Müraciət imtina edildi.');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#251D4B] text-white p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-black text-white">DAYAQ</div>
              <div className="text-[10px] text-rose-300 uppercase font-bold tracking-widest">
                Baş İdarəetmə Paneli
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 font-bold px-1">Super Administrator</div>

          <nav className="space-y-1 text-xs font-bold">
            <div className="p-2.5 rounded-xl bg-white/10 text-white flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#CADFFD]" />
              <span>Mütəxəssis Təsdiqi</span>
            </div>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-2 text-xs">
          <Link
            to="/"
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-between"
          >
            <span>Əsas Sayta Bax</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#CADFFD]" />
          </Link>
          <Link
            to="/daxil-ol"
            className="block text-center w-full py-2 px-3 rounded-xl text-rose-300 hover:bg-rose-500/10"
          >
            Admin Çıxışı
          </Link>
        </div>
      </aside>

      {/* Admin Main Body */}
      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">
            Platforma Nəzarət və Moderator Paneli
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Psixoloqların diplom və lisenziyalarının yoxlanması, maliyyə və vebinar dövriyyəsi.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-bold">Qeydiyyatlı İstifadəçilər</span>
            <div className="text-2xl font-black text-[#251D4B] mt-1">1,480</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-bold">Aktiv Psixoloqlar</span>
            <div className="text-2xl font-black text-[#251D4B] mt-1">{psychologists.length} Mütəxəssis</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-bold">Aylıq Dövriyyə</span>
            <div className="text-2xl font-black text-[#251D4B] mt-1">24,500 AZN</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-bold">Keçirilən Seanslar</span>
            <div className="text-2xl font-black text-[#251D4B] mt-1">342 Seans</div>
          </div>
        </div>

        {/* Verification Queue */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-base text-[#251D4B] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#251D4B]" />
              <span>Psixoloq Akkreditasiya və Diplom Yoxlama Növbəsi</span>
            </h2>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              {pendingApprovals.length} Gözləyən Müraciət
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              Hal-hazırda gözləyən yeni akkreditasiya müraciəti yoxdur.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#251D4B]">{item.name}</div>
                    <div className="text-xs text-slate-600">Diplom: <strong>{item.degree}</strong></div>
                    <div className="text-xs text-slate-500">Sertifikat: {item.certificate} · Təcrübə: {item.experience}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Təsdiqlə</span>
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>İmtina</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

    </div>
  );
};
