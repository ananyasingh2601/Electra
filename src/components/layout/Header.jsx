// src/components/layout/Header.jsx
import { motion } from 'framer-motion';
import CountrySelector from '../ui/CountrySelector';

export default function Header({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-[var(--radius-sm)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg">🗳️</span>
            <span className="font-display text-lg font-bold text-[var(--color-text-primary)] tracking-tight">
              ELECTRA
            </span>
            <span className="hidden sm:inline-block editorial-badge ml-2">v1.0</span>
          </div>
        </div>

        {/* Center: Navigation breadcrumb */}
        <div className="hidden md:flex items-center gap-1 text-[11px] font-body font-medium tracking-wider uppercase text-[var(--color-text-muted)]">
          <span className="text-[var(--color-accent-gold)]">Election Intelligence</span>
          <span className="mx-1">·</span>
          <span>Companion</span>
        </div>

        {/* Right: Country selector */}
        <div className="flex items-center gap-3">
          <CountrySelector />
        </div>
      </div>
    </header>
  );
}
