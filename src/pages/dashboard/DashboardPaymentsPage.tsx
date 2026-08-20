import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle2,
  Calendar,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { USER_MOCK_TRANSACTIONS } from '../../data/mockData';

export const DashboardPaymentsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const filteredTransactions = USER_MOCK_TRANSACTIONS.filter((tx) => {
    if (filterType === 'session') return tx.type === 'session' || tx.type === 'seans';
    if (filterType === 'course') return tx.type === 'course' || tx.type === 'telim';
    if (filterType === 'webinar') return tx.type === 'webinar' || tx.type === 'vebinar';
    return true;
  });

  const totalSpent = USER_MOCK_TRANSACTIONS.filter(
    (t) => t.status === 'tamamlandı' || t.status === 'uğurlu'
  ).reduce((acc, cur) => acc + cur.amount, 0);

  const handleDownload = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#251D4B]">Ödənişlərim</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Platformada həyata keçirdiyiniz bütün əməliyyatların, seansların və təlimlərin rəsmi maliyyə qaimələri.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>3D Secure Təhlükəsiz Ödənişlər</span>
          </span>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Ümumi xərclənən məbləğ</span>
            <div className="w-9 h-9 rounded-xl bg-[#CADFFD]/30 text-[#251D4B] flex items-center justify-center font-black">
              ₼
            </div>
          </div>
          <div className="text-2xl font-black text-[#251D4B]">₼{totalSpent.toFixed(2)}</div>
          <div className="text-[11px] text-slate-500 font-medium">Platforma üzrə bütün dövrlər</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Ödənilmiş Seanslar</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#251D4B]">
            {USER_MOCK_TRANSACTIONS.filter((t) => t.type === 'session' || t.type === 'seans').length} seans
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">Bütün qəbzlər generasiya edilib</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Saxlanılan Kart</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-base font-black text-[#251D4B]">Mastercard •••• 4821</div>
          <div className="text-[11px] text-slate-500 font-medium">Bitmə tarixi: 08/28</div>
        </div>
      </div>

      {/* Transactions Table Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Table Filter Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-black text-base text-[#251D4B]">Əməliyyat Tarixçəsi</h2>
          
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-[#251D4B] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Hamısı
            </button>
            <button
              onClick={() => setFilterType('session')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'session'
                  ? 'bg-[#251D4B] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Seanslar
            </button>
            <button
              onClick={() => setFilterType('course')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'course'
                  ? 'bg-[#251D4B] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Təlimlər
            </button>
            <button
              onClick={() => setFilterType('webinar')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'webinar'
                  ? 'bg-[#251D4B] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Vebinarlar
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-slate-100">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-bold text-sm text-[#251D4B]">{tx.description}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {tx.status === 'tamamlandı' ? 'Uğurlu' : tx.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-slate-400">№ {tx.id}</span>
                  <span>•</span>
                  <span>{tx.date}</span>
                  <span>•</span>
                  <span>{tx.paymentMethod}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
                <div className="font-black text-base text-[#251D4B]">₼{tx.amount.toFixed(2)}</div>
                
                <button
                  onClick={() => handleDownload(tx.id)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-xs flex items-center gap-1.5 font-bold transition-all shadow-2xs"
                >
                  {downloadedId === tx.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Yükləndi</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Qəbz (PDF)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
