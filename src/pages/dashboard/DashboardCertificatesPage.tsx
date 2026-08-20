import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Download,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  ExternalLink,
  Share2,
  Eye,
  Check,
  Search
} from 'lucide-react';
import { MOCK_USER, USER_MOCK_CERTIFICATES } from '../../data/mockData';

export const DashboardCertificatesPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (code: string) => {
    navigator.clipboard?.writeText(`https://dayaq.az/verify/cert/${code}`);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Sertifikatlarım</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Tamamladığınız təlim proqramları üzrə rəsmi QR-kodlu beynəlxalq standartlı sertifikatlar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Rəsmi Doğrulanmış ({USER_MOCK_CERTIFICATES.length})</span>
          </span>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {USER_MOCK_CERTIFICATES.map((cert) => {
          const certNum = cert.certificateNumber || cert.credentialId || 'DYQ-CERT-2026-8891';
          const recipient = cert.recipientName || MOCK_USER.name;
          const courseName = cert.courseTitle || cert.title;

          return (
            <div
              key={cert.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#CADFFD] hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>QR Doğrulanıb</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {courseName}
                  </span>
                  <h3 className="font-black text-base sm:text-lg text-[#251D4B] leading-snug mt-0.5">
                    {cert.title}
                  </h3>
                </div>

                {/* Certificate Details Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sahibi:</span>
                    <strong className="text-slate-800">{recipient}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Təlimçi:</span>
                    <strong className="text-slate-800">{cert.instructorName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verilmə tarixi:</span>
                    <strong className="text-slate-800">{cert.issueDate}</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 font-mono text-[11px]">
                    <span className="text-slate-400 font-sans">Sertifikat ID:</span>
                    <span className="text-[#251D4B] font-bold">{certNum}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                <Link
                  to={`/dashboard/sertifikatlar/${cert.id}`}
                  className="py-2.5 px-3 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[#CADFFD]" />
                  <span>Bax</span>
                </Link>

                <button
                  onClick={() => alert(`Sertifikat (${certNum}) PDF formatında yüklənir...`)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={() => handleCopyLink(certNum)}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedId === certNum ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Paylaş</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/dashboard/sertifikatlar/${cert.id}`}
                  className="py-2.5 px-3 rounded-xl bg-[#CADFFD]/40 border border-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#CADFFD] transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#251D4B]" />
                  <span>Təsdiqlə</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
