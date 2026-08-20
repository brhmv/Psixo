import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Calendar,
  MessageSquare,
  ChevronRight,
  Shield,
  FileText,
  X,
  Phone,
  Mail,
  Lock,
  PlusCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { PSYCHOLOGIST_CLIENTS_MOCK, PsychologistClientItem } from '../../data/psychologistMockData';

export const PsychologistClientsPage: React.FC = () => {
  const [clients, setClients] = useState<PsychologistClientItem[]>(PSYCHOLOGIST_CLIENTS_MOCK);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'past'>('all');
  const [selectedClient, setSelectedClient] = useState<PsychologistClientItem | null>(null);
  const [newNote, setNewNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.primaryIssue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !newNote.trim()) return;

    const updatedClients = clients.map((c) => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          notesHistory: [
            { date: 'Bu gün, 20 Avqust 2026', note: newNote.trim() },
            ...c.notesHistory
          ]
        };
      }
      return c;
    });

    setClients(updatedClients);
    setSelectedClient({
      ...selectedClient,
      notesHistory: [
        { date: 'Bu gün, 20 Avqust 2026', note: newNote.trim() },
        ...selectedClient.notesHistory
      ]
    });
    setNewNote('');
    showToast('Məxfi seans qeydi təhlükəsiz yaddaşa əlavə olundu.');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Müştərilər</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Müştəri siyahısını, terapiya dinamikasını və məxfi klinik qeydləri nəzərdən keçirin.
          </p>
        </div>

        {/* Privacy badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#251D4B]">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Şifrələnmiş Məxfilik</span>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Müştəri axtar..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#251D4B] focus:bg-white"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Hamısı ({clients.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'active'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Aktiv ({clients.filter((c) => c.status === 'active').length})
          </button>
          <button
            onClick={() => setStatusFilter('past')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'past'
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Keçmiş ({clients.filter((c) => c.status === 'past').length})
          </button>
        </div>

      </div>

      {/* Clients Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-4 px-6">Müştəri</th>
                <th className="py-4 px-6">Əsas Mövzu</th>
                <th className="py-4 px-6">Seans Sayı</th>
                <th className="py-4 px-6">Son Seans</th>
                <th className="py-4 px-6">Növbəti Seans</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={client.photo}
                        alt={client.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-[#251D4B] text-xs">{client.name}</div>
                        <div className="text-[11px] text-slate-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-700 max-w-xs truncate">
                    {client.primaryIssue}
                  </td>
                  <td className="py-4 px-6 font-bold text-[#251D4B]">
                    {client.totalSessions} seans
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {client.lastSessionDate}
                  </td>
                  <td className="py-4 px-6 text-[#251D4B] font-semibold">
                    {client.nextSessionDate || 'Planlaşdırılmayıb'}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        client.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {client.status === 'active' ? 'Aktiv Müalicə' : 'Tamamlanıb'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to="/psixoloq/mesajlar"
                        className="p-2 rounded-xl border border-slate-200 hover:bg-[#CADFFD]/20 text-[#251D4B]"
                        title="Mesaj yaz"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-3 py-1.5 rounded-xl bg-[#CADFFD] text-[#251D4B] hover:bg-[#b8d4fc] text-xs font-bold"
                      >
                        Detallar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedClient.photo}
                  alt={selectedClient.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#CADFFD]"
                />
                <div>
                  <h2 className="text-base font-black text-[#251D4B]">{selectedClient.name}</h2>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{selectedClient.email}</span>
                    <span>•</span>
                    <span>{selectedClient.phone}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Toplam Seans</div>
                <div className="text-base font-black text-[#251D4B]">{selectedClient.totalSessions}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Son Görüş</div>
                <div className="font-bold text-[#251D4B] text-xs">{selectedClient.lastSessionDate}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Növbəti Görüş</div>
                <div className="font-bold text-emerald-700 text-xs">{selectedClient.nextSessionDate || 'Təyin edilməyib'}</div>
              </div>
            </div>

            {/* Primary Therapy Issue */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-700">Müraciət Mövzusu & İlkin Şikayət</div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                {selectedClient.primaryIssue}
              </div>
            </div>

            {/* Clinical Notes History */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Məxfi Terapiya Qeydləri
                </span>
                <span className="text-[10px] text-slate-400">Yalnız sizin üçün görünəndir</span>
              </div>

              <div className="space-y-2.5 max-h-52 overflow-y-auto">
                {selectedClient.notesHistory.map((nh, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#CADFFD]/20 border border-[#CADFFD]/60 text-xs space-y-1">
                    <div className="font-bold text-[#251D4B] text-[11px]">{nh.date}</div>
                    <div className="text-slate-700 leading-relaxed">{nh.note}</div>
                  </div>
                ))}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2 pt-2">
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Seans barədə yeni qeyd əlavə edin (məs: tapşırıqlar, irəliləyiş)..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#251D4B] focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#251D4B] text-white text-xs font-bold hover:bg-[#1a1435]"
                >
                  Qeydi saxla
                </button>
              </form>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/psixoloq/mesajlar"
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 rounded-xl bg-[#CADFFD] text-[#251D4B] text-xs font-bold hover:bg-[#b8d4fc] flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Müştəriyə mesaj yaz</span>
              </Link>

              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
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
