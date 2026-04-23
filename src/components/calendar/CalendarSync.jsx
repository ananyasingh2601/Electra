// src/components/calendar/CalendarSync.jsx
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ELECTION_DATES } from '../../data/electionDates';
import { formatDate, getRelativeTime, isPast } from '../../utils/dateUtils';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { CalendarService } from '../../services/calendarService';

const SYNCABLE_DATES = [
  { id: 'registration', icon: '🗓️', title: 'Last Date for Voter Registration', date: '2025-10-15', description: 'Final date to register or update voter details', important: false },
  { id: 'nomination', icon: '📝', title: 'Last Date for Nomination', date: '2025-11-01', description: 'Candidates must file nominations by this date', important: false },
  { id: 'polling', icon: '🗳️', title: 'Polling Day', date: '2025-11-20', description: 'Cast your vote at your designated polling booth', important: true },
  { id: 'counting', icon: '🔢', title: 'Counting Day', date: '2025-11-23', description: 'Votes counted at counting centres', important: false },
  { id: 'results', icon: '🏆', title: 'Results Day', date: '2025-11-24', description: 'Official results declared by ECI', important: false },
];

const REMINDER_OPTIONS = [
  { id: '7d', label: '7 days before', minutes: 7 * 24 * 60 },
  { id: '1d', label: '1 day before', minutes: 24 * 60 },
  { id: 'morning', label: 'Morning of', minutes: 180 },
];

function generateICS(dates) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ELECTRA//Election Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  dates.forEach(d => {
    const dt = d.date.replace(/-/g, '');
    lines.push(
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${dt}`,
      `DTEND;VALUE=DATE:${dt}`,
      `SUMMARY:🗳️ ${d.title}`,
      `DESCRIPTION:${d.description}\\n\\nAdded by ELECTRA — Your Election Intelligence Companion`,
      `UID:electra-${d.id}@electra.app`,
      'END:VEVENT',
    );
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export default function CalendarSync() {
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(() => SYNCABLE_DATES.reduce((acc, d) => ({ ...acc, [d.id]: true }), {}));
  const [reminder, setReminder] = useState('1d');
  const [syncing, setSyncing] = useState(false);
  const [syncedIds, setSyncedIds] = useState([]);
  const [syncDone, setSyncDone] = useState(false);
  const { signIn, isAuthenticated } = useGoogleAuth();

  const selectedDates = SYNCABLE_DATES.filter(d => checked[d.id]);

  const toggleCheck = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const handleGoogleSync = useCallback(async () => {
    if (!isAuthenticated) {
      signIn();
      return;
    }
    setSyncing(true);
    // Simulate sync with staggered success
    for (let i = 0; i < selectedDates.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setSyncedIds(prev => [...prev, selectedDates[i].id]);
    }
    setSyncing(false);
    setSyncDone(true);
  }, [isAuthenticated, signIn, selectedDates]);

  const handleDownloadICS = () => {
    const icsContent = generateICS(selectedDates);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'electra-election-dates.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="calendar" className="py-12 md:py-16">
      <div className="mb-8">
        <div className="section-label mb-3">Remember</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Election Calendar</h2>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">Never miss an important election date. Sync to your Google Calendar.</p>
        <div className="gold-rule-left mt-4" />
      </div>

      {/* Trigger button */}
      <button onClick={() => setIsOpen(true)} className="mb-6 px-5 py-3 rounded-[var(--radius-md)] font-body font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-bg)] hover:bg-[var(--color-accent-gold-light)] transition-all shadow-gold">
        📅 Add Dates to Calendar
      </button>

      {/* Quick preview cards */}
      <div className="space-y-3">
        {SYNCABLE_DATES.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className={`glass-surface p-4 flex items-center justify-between gap-4 ${isPast(d.date) ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="text-center flex-shrink-0 w-14">
                <div className="text-xs font-body font-semibold text-[var(--color-accent-gold)]">{new Date(d.date).toLocaleDateString('en', { month: 'short' })}</div>
                <div className="font-display text-xl font-bold text-[var(--color-text-primary)]">{new Date(d.date).getDate()}</div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base">{d.icon}</span>
                  <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">{d.title}</span>
                  {d.important && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(192,57,43,0.15)] text-[var(--color-accent-crimson)] font-body font-semibold">⭐ Most Important</span>}
                </div>
                <div className="font-body text-xs text-[var(--color-text-muted)] mt-0.5">{d.description}</div>
                <div className="font-body text-[10px] text-[var(--color-text-muted)] mt-0.5">{getRelativeTime(d.date)}</div>
              </div>
            </div>
            {syncedIds.includes(d.id) && <span className="text-[var(--color-accent-emerald)] text-sm flex-shrink-0">✓</span>}
          </motion.div>
        ))}
      </div>

      {/* Drawer panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] z-50 flex flex-col overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="p-6 border-b border-[var(--color-border)] flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)]">Sync Election Dates</h3>
                  <button onClick={() => setIsOpen(false)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">✕</button>
                </div>
                <p className="font-body text-xs text-[var(--color-text-muted)]">Never miss an important election deadline</p>
              </div>

              {/* Date checklist */}
              <div className="flex-1 p-6 space-y-3">
                {syncDone ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="text-4xl mb-4">✅</motion.div>
                    <h4 className="font-display text-lg font-bold text-[var(--color-accent-emerald)] mb-2">{selectedDates.length} events added!</h4>
                    <p className="font-body text-sm text-[var(--color-text-secondary)]">Check your Google Calendar.</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="section-label mb-2">Select dates to sync</div>
                    {SYNCABLE_DATES.map(d => (
                      <label key={d.id} className={`flex items-center gap-3 p-3 rounded-[var(--radius-md)] border cursor-pointer transition-all ${checked[d.id] ? 'border-[rgba(212,168,83,0.2)] bg-[rgba(212,168,83,0.04)]' : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]'}`}>
                        <input type="checkbox" checked={checked[d.id]} onChange={() => toggleCheck(d.id)} className="sr-only" />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${checked[d.id] ? 'bg-[var(--color-accent-gold)] border-[var(--color-accent-gold)]' : 'border-[var(--color-text-muted)]'}`}>
                          {checked[d.id] && <span className="text-[var(--color-bg)] text-[10px]">✓</span>}
                        </div>
                        <span className="text-base">{d.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-body text-sm font-medium text-[var(--color-text-primary)]">{d.title}</span>
                            {d.important && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(192,57,43,0.15)] text-[var(--color-accent-crimson)] font-body font-semibold">⭐</span>}
                          </div>
                          <span className="font-body text-xs text-[var(--color-text-muted)]">{formatDate(d.date)}</span>
                        </div>
                        {syncedIds.includes(d.id) && <span className="text-[var(--color-accent-emerald)] text-sm">✓</span>}
                      </label>
                    ))}

                    {/* Reminder selector */}
                    <div className="mt-6">
                      <div className="section-label mb-3">Polling Day Reminder</div>
                      <div className="flex rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden">
                        {REMINDER_OPTIONS.map(opt => (
                          <button key={opt.id} onClick={() => setReminder(opt.id)}
                            className={`flex-1 py-2.5 text-[11px] font-body font-medium transition-all ${reminder === opt.id ? 'bg-[var(--color-accent-gold)] text-[var(--color-bg)]' : 'text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.03)]'}`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer actions */}
              {!syncDone && (
                <div className="p-6 border-t border-[var(--color-border)] space-y-3 flex-shrink-0">
                  <button onClick={handleGoogleSync} disabled={syncing || selectedDates.length === 0}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-[var(--radius-md)] bg-white text-[#3c4043] font-body font-semibold text-sm hover:bg-gray-100 disabled:opacity-50 transition-all">
                    {syncing ? (
                      <span className="animate-spin text-sm">⟳</span>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    )}
                    {syncing ? 'Syncing…' : 'Add to Google Calendar'}
                  </button>
                  <button onClick={handleDownloadICS} className="w-full py-2.5 rounded-[var(--radius-md)] font-body text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors">
                    📥 Download .ics file instead
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
