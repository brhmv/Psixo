import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Phone,
  Mail,
  HelpCircle,
  RefreshCw,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { USER_MOCK_APPOINTMENTS, PSYCHOLOGISTS_DATA } from '../../data/mockData';

export const DashboardSessionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const appointment =
    USER_MOCK_APPOINTMENTS.find((a) => a.id === id) || USER_MOCK_APPOINTMENTS[0];
  const psychologist =
    PSYCHOLOGISTS_DATA.find((p) => p.id === appointment.psychologistId) ||
    PSYCHOLOGISTS_DATA[0];

  const [status, setStatus] = useState(appointment.status);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancel = () => {
    setStatus('ləğv_edildi');
    showToast('Seans ləğv edildi və ödəniş kartınıza geri qaytarılacaq.');
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto pb-12">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#251D4B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Link */}
      <Link
        to="/dashboard/seanslar"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#251D4B] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Bütün seanslara qayıt</span>
      </Link>

      {/* Main Detail Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={psychologist.photo}
              alt={psychologist.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#251D4B]">{psychologist.name}</h1>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    status === 'təsdiqləndi'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : status === 'tamamlandı'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {status === 'təsdiqləndi' ? 'Təsdiqlənmiş seans' : status === 'tamamlandı' ? 'Tamamlandı' : 'Ləğv edildi'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{psychologist.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/dashboard/mesajlar?recipient=${psychologist.id}`}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#251D4B] text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Mesaj yaz</span>
            </Link>
          </div>
        </div>

        {/* Key Session Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Tarix
            </span>
            <div className="font-bold text-xs text-[#251D4B]">{appointment.date}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Saat & Müddət
            </span>
            <div className="font-bold text-xs text-[#251D4B]">{appointment.timeSlot} (50 dəqiqə)</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
              <Video className="w-3.5 h-3.5" /> Seans Formatı
            </span>
            <div className="font-bold text-xs text-emerald-700">
              {appointment.format === 'online' ? 'Onlayn Qorunan Otaq' : 'Əyani Görüş'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> Ödəniş Statusu
            </span>
            <div className="font-bold text-xs text-emerald-700">₼{appointment.price} (Ödənilib)</div>
          </div>
        </div>

        {/* Meeting Information Section */}
        {status === 'təsdiqləndi' && (
          <div className="p-6 rounded-2xl bg-[#CADFFD]/20 border border-[#CADFFD] space-y-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-[#251D4B]" />
              <h2 className="font-black text-sm text-[#251D4B]">Görüş Məlumatları və Video Keçid</h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Görüşünüz təyin olunmuş vaxtda Dayaq Təhlükəsiz Video Otağında aktivləşəcək. Seansa kompüter, planşet və ya telefondan qoşula bilərsiniz. Kameranızın və mikrofonunuzun saz vəziyyətdə olduğunu öncədən yoxlamağınız tövsiyə olunur.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={appointment.meetingLink || 'https://meet.dayaq.az'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#251D4B] hover:bg-[#1a1435] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4 text-[#CADFFD]" />
                <span>Seansa qoşul</span>
              </a>

              <Link
                to="/dashboard/seanslar"
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold text-center transition-colors"
              >
                Vaxtı dəyiş
              </Link>

              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl hover:bg-rose-50 text-rose-600 text-xs font-bold text-center transition-colors"
              >
                Seansı ləğv et
              </button>
            </div>
          </div>
        )}

        {/* Privacy & Cancellation Policy */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-xs text-[#251D4B]">Ləğvetmə və Məxfilik Siyasəti</h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
            <li>Görüşə ən azı 12 saat qalmış seansı ləğv etdikdə ödənilən vəsait tam həcmdə geri qaytarılır.</li>
            <li>Görüş zamanı müzakirə olunan bütün məlumatlar həkim-psixoloq etikası və platforma tərəfindən tam şifrələnərək qorunur.</li>
            <li>Əlavə sualınız yarandıqda texniki dəstək komandamızla əlaqə saxlaya bilərsiniz.</li>
          </ul>
        </div>

      </div>

    </div>
  );
};
