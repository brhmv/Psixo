import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Calendar,
  DollarSign,
  Star,
  ShieldAlert,
  ChevronRight,
  Trash2,
  Check,
  Video,
  BookOpen
} from 'lucide-react';
import { PSYCHOLOGIST_NOTIFICATIONS_MOCK, PsychologistNotificationItem } from '../../data/psychologistMockData';

export const PsychologistNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<PsychologistNotificationItem[]>(PSYCHOLOGIST_NOTIFICATIONS_MOCK);
  const [activeTab, setActiveTab] = useState<'all' | 'sessions' | 'webinars' | 'trainings' | 'system'>('all');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.category === activeTab;
  });

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleMarkSingleRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#251D4B]">Bildirişlər</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Rezervasiyalar, vebinarlar, təlimlər və sistem xəbərdarlıqları.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Hamısını oxunmuş kimi qeyd et</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: 'Hamısı' },
          { id: 'sessions', label: 'Seanslar' },
          { id: 'webinars', label: 'Vebinarlar' },
          { id: 'trainings', label: 'Təlimlər' },
          { id: 'system', label: 'Sistem' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#251D4B] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => handleMarkSingleRead(item.id)}
              className={`p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 ${
                item.read
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#CADFFD]/15 border-[#CADFFD] shadow-xs'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    item.category === 'sessions'
                      ? 'bg-blue-100 text-blue-700'
                      : item.category === 'webinars'
                      ? 'bg-purple-100 text-purple-700'
                      : item.category === 'trainings'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.category === 'sessions' && <Calendar className="w-5 h-5" />}
                  {item.category === 'webinars' && <Video className="w-5 h-5" />}
                  {item.category === 'trainings' && <BookOpen className="w-5 h-5" />}
                  {item.category === 'system' && <Bell className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-[#251D4B]">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#251D4B]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                  <span className="text-[10px] text-slate-400 font-medium block pt-1">{item.time}</span>
                </div>
              </div>

              {item.actionUrl && (
                <Link
                  to={item.actionUrl}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-[#CADFFD]/30 text-xs font-bold text-[#251D4B] shrink-0 self-center"
                >
                  Bax
                </Link>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
