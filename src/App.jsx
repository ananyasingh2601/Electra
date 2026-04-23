// src/App.jsx
import { useState, useCallback } from 'react';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';
import ElectionTimeline from './components/timeline/ElectionTimeline';
import ChatWidget from './components/chat/ChatWidget';
import EligibilityChecker from './components/eligibility/EligibilityChecker';
import BoothLocator from './components/maps/BoothLocator';
import CalendarSync from './components/calendar/CalendarSync';
import NewsFeed from './components/news/NewsFeed';
import useElectionStore from './store/useElectionStore';

const mobileNavItems = [
  { id: 'hero', icon: '◈', label: 'Home' },
  { id: 'timeline', icon: '◉', label: 'Timeline' },
  { id: 'eligibility', icon: '◎', label: 'Eligible' },
  { id: 'news', icon: '◆', label: 'News' },
  { id: 'chat', icon: '💬', label: 'Ask' },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrefill, setChatPrefill] = useState('');
  const { activeSection, setActiveSection } = useElectionStore();

  const handleAskAboutStage = useCallback((stage) => {
    setChatPrefill(`Tell me more about the ${stage.label} phase`);
    setChatOpen(true);
  }, []);

  const scrollTo = useCallback((section) => {
    if (section === 'chat') {
      setChatOpen(true);
      return;
    }
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [setActiveSection]);

  return (
    <div className="app-layout">
      {/* Left sidebar — desktop */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="app-main">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between mb-4 py-2">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-[var(--radius-sm)] hover:bg-[rgba(255,255,255,0.05)]">
            <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-base">🗳️</span>
            <span className="font-display text-base font-bold text-[var(--color-text-primary)]">ELECTRA</span>
          </div>
          <button onClick={() => setChatOpen(true)} className="p-2 rounded-[var(--radius-sm)] hover:bg-[rgba(255,255,255,0.05)]">
            <span className="text-base">💬</span>
          </button>
        </div>

        <Hero
          onExploreTimeline={() => scrollTo('timeline')}
          onAskQuestion={() => setChatOpen(true)}
        />
        <ElectionTimeline onAskAboutStage={handleAskAboutStage} />
        <EligibilityChecker />
        <BoothLocator />
        <CalendarSync />
        <NewsFeed />
        <Footer />
      </main>

      {/* Right chat panel — desktop persistent, mobile overlay */}
      <ChatWidget
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        prefillMessage={chatPrefill}
      />

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              activeSection === item.id
                ? 'text-[var(--color-accent-gold)]'
                : 'text-[var(--color-text-muted)]'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-[9px] font-body font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
