// src/components/layout/Footer.jsx

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[var(--color-border)] py-8 px-6 mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="gold-rule mb-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-base">🗳️</span>
            <div>
              <span className="font-display text-sm font-bold text-[var(--color-text-primary)]">ELECTRA</span>
              <span className="text-[var(--color-text-muted)] text-xs ml-2">v1.0</span>
            </div>
          </div>

          <div className="text-center">
            <p className="font-body text-xs text-[var(--color-text-muted)] mb-2">
              <em>"From Ballot to Victory — Understand Every Step"</em>
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="px-2 py-1 rounded-[var(--radius-sm)] bg-[rgba(66,133,244,0.08)] border border-[rgba(66,133,244,0.15)] text-[10px] font-body font-medium text-[#8ab4f8]">
                ✦ Made with Gemini AI
              </span>
              <span className="px-2 py-1 rounded-[var(--radius-sm)] bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.15)] text-[10px] font-body font-medium text-[var(--color-accent-emerald)]">
                📊 Data sourced from ECI
              </span>
            </div>
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

        <p className="text-center text-[10px] font-body text-[var(--color-text-muted)] mt-6 opacity-60">
          ELECTRA is an educational tool. Always verify information with official Election Commission sources.
        </p>
      </div>
    </footer>
  );
}
