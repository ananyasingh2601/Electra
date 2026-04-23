// src/components/maps/BoothLocator.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BoothLocator() {
  const [address, setAddress] = useState('');
  const [searched, setSearched] = useState(false);
  const hasApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY && import.meta.env.VITE_GOOGLE_MAPS_API_KEY !== 'your_maps_api_key';

  const handleSearch = () => {
    if (address.trim()) setSearched(true);
  };

  return (
    <section id="booth" className="py-12 md:py-16">
      <div className="mb-8">
        <div className="section-label mb-3">Locate</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Find Your Polling Booth</h2>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">Enter your address to find the nearest polling station.</p>
        <div className="gold-rule-left mt-4" />
      </div>

      <div className="glass-surface-elevated p-6">
        <div className="flex gap-3 mb-6">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter your address or area…"
            className="flex-1 px-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] font-body text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent-gold)] transition-colors"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-3 rounded-[var(--radius-md)] font-body font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-bg)] hover:bg-[var(--color-accent-gold-light)] transition-colors"
          >
            Search
          </button>
        </div>

        {/* Map area */}
        <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]" style={{ height: '300px' }}>
          {!hasApiKey ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <span className="text-3xl mb-3">🗺️</span>
              <p className="font-body text-sm text-[var(--color-text-secondary)] mb-2">Google Maps requires an API key</p>
              <p className="font-body text-xs text-[var(--color-text-muted)] max-w-sm">Add your <code className="text-[var(--color-accent-gold)]">VITE_GOOGLE_MAPS_API_KEY</code> to <code>.env.local</code> to enable the interactive map.</p>
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 rounded-[var(--radius-sm)] text-xs font-body font-medium text-[var(--color-accent-gold)] border border-[rgba(212,168,83,0.2)] hover:bg-[rgba(212,168,83,0.08)] transition-colors">
                Find your booth on ECI Portal →
              </a>
            </div>
          ) : searched ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <span className="text-2xl">📍</span>
                <p className="font-body text-sm text-[var(--color-text-secondary)] mt-2">Searching for polling booths near "{address}"…</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <span className="text-2xl">📍</span>
                <p className="font-body text-sm text-[var(--color-text-muted)] mt-2">Enter your address to find nearby polling stations</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="editorial-badge hover:bg-[rgba(212,168,83,0.15)] transition-colors">📎 ECI Voter Portal</a>
          <a href="https://nvsp.in" target="_blank" rel="noopener noreferrer" className="editorial-badge hover:bg-[rgba(212,168,83,0.15)] transition-colors">📎 NVSP Portal</a>
        </div>
      </div>
    </section>
  );
}
