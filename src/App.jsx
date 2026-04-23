// src/App.jsx
import { useState, useCallback, useEffect, lazy, Suspense, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';
import ElectionTimeline from './components/timeline/ElectionTimeline';
import ChatWidget from './components/chat/ChatWidget';
import EligibilityChecker from './components/eligibility/EligibilityChecker';
import useElectionStore from './store/useElectionStore';

// Lazy loaded heavy components
const BoothLocator = lazy(() => import('./components/maps/BoothLocator'));
const CalendarSync = lazy(() => import('./components/calendar/CalendarSync'));
const NewsFeed = lazy(() => import('./components/news/NewsFeed'));

// Error Boundary
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-surface p-8 text-center my-6">
          <span className="text-2xl mb-2 block">⚠️</span>
          <p className="font-display text-sm font-bold text-[var(--color-text-primary)] mb-1">Something went wrong</p>
          <p className="font-body text-xs text-[var(--color-text-muted)]">This section encountered an error. Other parts of ELECTRA still work.</p>
          <button onClick={() => this.setState({ hasError: false })} className="mt-3 px-4 py-1.5 rounded-[var(--radius-sm)] text-xs font-body text-[var(--color-accent-gold)] border border-[rgba(212,168,83,0.2)] hover:bg-[rgba(212,168,83,0.08)] transition-colors">Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Suspense fallback
function SectionLoader() {
  return (
    <div className="py-12 flex items-center justify-center">
      <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
        <span className="animate-pulse text-[var(--color-accent-gold)]">◉</span>
        <span className="font-body text-xs">Loading…</span>
      </div>
    </div>
  );
}

// App loader SVG animation
function AppLoader({ onComplete }) {
  useEffect(() => { const t = setTimeout(onComplete, 1400); return () => clearTimeout(t); }, [onComplete]);
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-[var(--color-bg)] flex flex-col items-center justify-center">
      <svg width="200" height="50" viewBox="0 0 200 50" className="mb-4">
        <motion.text x="100" y="38" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="36" fontWeight="900" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1"
          initial={{ strokeDasharray: 300, strokeDashoffset: 300 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.2, ease: 'easeInOut' }}>
          ELECTRA
        </motion.text>
      </svg>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="text-[10px] font-body text-[var(--color-text-muted)] tracking-[0.2em] uppercase">
        Election Intelligence
      </motion.div>
    </motion.div>
  );
}

const mobileNavItems = [
  { id: 'hero', icon: '◈', label: 'Home' },
  { id: 'timeline', icon: '◉', label: 'Timeline' },
  { id: 'eligibility', icon: '◎', label: 'Eligible' },
  { id: 'news', icon: '◆', label: 'News' },
  { id: 'chat', icon: '💬', label: 'Ask' },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatPrefill, setChatPrefill] = useState('');
  const { activeSection, setActiveSection } = useElectionStore();

  const handleAskAboutStage = useCallback((stage) => {
    setChatPrefill(`Tell me more about the ${stage.label} phase`);
    setChatOpen(true);
  }, []);

  const scrollTo = useCallback((section) => {
    if (section === 'chat') { setChatOpen(true); return; }
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }, [setActiveSection]);

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--color-accent-gold)] focus:text-[var(--color-bg)] focus:rounded-[var(--radius-sm)] font-body text-sm font-semibold">
        Skip to main content
      </a>

      {/* App loader */}
      <AnimatePresence>{loading && <AppLoader onComplete={() => setLoading(false)} />}</AnimatePresence>

      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="app-layout">
        {/* Left sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main id="main-content" className="app-main" role="main">
          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center justify-between mb-4 py-2">
            <button onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu"
              className="p-2 rounded-[var(--radius-sm)] hover:bg-[rgba(255,255,255,0.05)] min-w-[44px] min-h-[44px] flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-base">🗳️</span>
              <span className="font-display text-base font-bold text-[var(--color-text-primary)]">ELECTRA</span>
            </div>
            <button onClick={() => setChatOpen(true)} aria-label="Open chat"
              className="p-2 rounded-[var(--radius-sm)] hover:bg-[rgba(255,255,255,0.05)] min-w-[44px] min-h-[44px] flex items-center justify-center">
              <span className="text-base">💬</span>
            </button>
          </div>

          <ErrorBoundary>
            <Hero onExploreTimeline={() => scrollTo('timeline')} onAskQuestion={() => setChatOpen(true)} />
          </ErrorBoundary>

          <ErrorBoundary>
            <ElectionTimeline onAskAboutStage={handleAskAboutStage} />
          </ErrorBoundary>

          <ErrorBoundary>
            <EligibilityChecker />
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <BoothLocator />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <CalendarSync />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <NewsFeed />
            </Suspense>
          </ErrorBoundary>

          <Footer />
        </main>

        {/* Right chat panel */}
        <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} prefillMessage={chatPrefill} />

        {/* Mobile floating chat button */}
        <button onClick={() => setChatOpen(true)} aria-label="Ask ELECTRA"
          className="lg:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-[var(--color-accent-gold)] text-[var(--color-bg)] shadow-gold flex items-center justify-center text-xl hover:bg-[var(--color-accent-gold-light)] transition-all active:scale-95">
          🗳️
        </button>

        {/* Mobile bottom nav */}
        <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
          {mobileNavItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} aria-label={item.label}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors min-w-[44px] min-h-[44px] justify-center ${
                activeSection === item.id ? 'text-[var(--color-accent-gold)]' : 'text-[var(--color-text-muted)]'
              }`}>
              <span className="text-base">{item.icon}</span>
              <span className="text-[9px] font-body font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
