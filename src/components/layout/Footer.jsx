// src/components/layout/Footer.jsx

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[var(--color-border)] py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="gold-rule mb-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-base">🗳️</span>
            <div>
              <span className="font-display text-sm font-bold text-[var(--color-text-primary)]">ELECTRA</span>
              <span className="text-[var(--color-text-muted)] text-xs ml-2">v1.0</span>
            </div>
          </div>

          <div className="text-center">
            <p className="font-body text-xs text-[var(--color-text-muted)]">
              From Ballot to Victory — Understand Every Step
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-body text-[var(--color-text-muted)]">
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-gold)] transition-colors">
              ECI Official
            </a>
            <span className="opacity-30">·</span>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-gold)] transition-colors">
              Voter Portal
            </a>
            <span className="opacity-30">·</span>
            <span>PromptWars 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
