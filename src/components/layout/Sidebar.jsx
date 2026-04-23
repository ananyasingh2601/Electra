// src/components/layout/Sidebar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import useElectionStore from '../../store/useElectionStore';

const navItems = [
  { id: 'hero', label: 'Home', icon: '◈', section: 'hero' },
  { id: 'timeline', label: 'Timeline', icon: '◉', section: 'timeline' },
  { id: 'eligibility', label: 'Eligibility', icon: '◎', section: 'eligibility' },
  { id: 'booth', label: 'Find Booth', icon: '◇', section: 'booth' },
  { id: 'news', label: 'News & Updates', icon: '◆', section: 'news' },
  { id: 'calendar', label: 'Calendar', icon: '◐', section: 'calendar' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { activeSection, setActiveSection } = useElectionStore();

  const handleNavClick = (section) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (window.innerWidth < 1024) onClose?.();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo area */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.2)] flex items-center justify-center text-base">
              🗳️
            </div>
            <div>
              <div className="font-display text-base font-bold text-[var(--color-text-primary)] tracking-tight">
                ELECTRA
              </div>
              <div className="text-[10px] font-body text-[var(--color-text-muted)] tracking-wider uppercase">
                Election Intelligence
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="section-label px-3 mb-3">Navigate</div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] font-body text-sm transition-all duration-150 ${
                    activeSection === item.section
                      ? 'bg-[rgba(212,168,83,0.1)] text-[var(--color-accent-gold)] border border-[rgba(212,168,83,0.15)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  <span className="text-xs opacity-60">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="px-3 py-2 text-[11px] font-body text-[var(--color-text-muted)] leading-relaxed">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-emerald)]" />
              <span className="text-[var(--color-accent-emerald)]">AI Online</span>
            </div>
            Powered by Google Gemini
          </div>
        </div>
      </aside>
    </>
  );
}
