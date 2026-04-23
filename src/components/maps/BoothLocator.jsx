// src/components/maps/BoothLocator.jsx
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function BoothLocator() {
  const [address, setAddress] = useState('');
  const [searched, setSearched] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [demoBooths] = useState([
    { name: 'Govt. Senior Secondary School', address: 'Sector 14, Gurugram', distance: '0.8 km', booth: '#142' },
    { name: 'Community Centre Hall', address: 'Sector 21, Gurugram', distance: '1.2 km', booth: '#87' },
    { name: 'Municipal Primary School', address: 'Sector 9, Gurugram', distance: '2.1 km', booth: '#203' },
  ]);

  const handleSearch = () => { if (address.trim()) { setSearched(true); setLocationError(''); } };

  const useCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) { setLocationError('Geolocation is not supported by your browser.'); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setAddress(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`); setSearched(true); setLocationError(''); },
      () => { setLocationError('Location permission denied. Please enter your address manually.'); }
    );
  }, []);

  return (
    <section id="booth" className="py-12 md:py-16">
      <div className="mb-8">
        <div className="section-label mb-3">Locate</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Find Your Polling Booth</h2>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">Enter your address to find the nearest polling station.</p>
        <div className="gold-rule-left mt-4" />
      </div>

      <div className="glass-surface-elevated p-6">
        {/* Search bar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">📍</span>
            <input value={address} onChange={(e) => setAddress(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter your address or area…"
              className="w-full pl-9 pr-4 py-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] font-body text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent-gold)] transition-colors" />
          </div>
          <button onClick={handleSearch} className="px-5 py-3 rounded-[var(--radius-md)] font-body font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-bg)] hover:bg-[var(--color-accent-gold-light)] transition-colors">Search</button>
        </div>

        <button onClick={useCurrentLocation} className="mb-4 flex items-center gap-2 text-xs font-body text-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold-light)] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Use my current location
        </button>

        {locationError && <div className="mb-4 px-3 py-2 rounded-[var(--radius-sm)] bg-[rgba(192,57,43,0.1)] border border-[rgba(192,57,43,0.2)] text-xs font-body text-[var(--color-accent-crimson)]">{locationError}</div>}

        {/* Map placeholder */}
        <div className="rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]" style={{ height: '280px' }}>
          <div className="flex flex-col items-center justify-center h-full text-center p-6" style={{ background: 'radial-gradient(ellipse at center, #1a1f30 0%, #0B0F1A 100%)' }}>
            <span className="text-3xl mb-3">🗺️</span>
            {!searched ? (
              <p className="font-body text-sm text-[var(--color-text-muted)]">Enter your address to find nearby polling stations</p>
            ) : (
              <div>
                <p className="font-body text-sm text-[var(--color-text-secondary)] mb-2">Showing booths near "{address}"</p>
                <p className="font-body text-[10px] text-[var(--color-text-muted)] italic">In production, this integrates with the ECI Booth Locator API.<br/>Showing nearby public buildings as example booths.</p>
              </div>
            )}
            <p className="font-body text-[10px] text-[var(--color-text-muted)] mt-3">Add <code className="text-[var(--color-accent-gold)]">VITE_GOOGLE_MAPS_API_KEY</code> for interactive map.</p>
          </div>
        </div>

        {/* Demo results */}
        {searched && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
            <div className="section-label">Nearest Polling Stations</div>
            {demoBooths.map((booth, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-surface p-4 flex items-center justify-between gap-4 hover:border-[var(--color-border-hover)] transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(192,57,43,0.12)] border border-[rgba(192,57,43,0.2)] flex items-center justify-center text-sm flex-shrink-0">🗳️</div>
                  <div>
                    <div className="font-body text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-gold)] transition-colors">{booth.name}</div>
                    <div className="font-body text-xs text-[var(--color-text-muted)]">{booth.address}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="editorial-badge text-[9px]">Booth {booth.booth}</span>
                      <span className="text-[10px] font-body text-[var(--color-text-muted)]">{booth.distance}</span>
                    </div>
                  </div>
                </div>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(booth.name + ' ' + booth.address)}`} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-[var(--radius-sm)] text-[11px] font-body font-medium text-[var(--color-accent-gold)] border border-[rgba(212,168,83,0.2)] hover:bg-[rgba(212,168,83,0.08)] transition-colors flex-shrink-0">
                  Directions →
                </a>
              </motion.div>
            ))}
            <p className="text-[10px] font-body text-[var(--color-text-muted)] italic mt-2">📎 For official booth data, visit <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer">voters.eci.gov.in</a></p>
          </motion.div>
        )}

        {/* Quick links */}
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="editorial-badge hover:bg-[rgba(212,168,83,0.15)] transition-colors">📎 ECI Voter Portal</a>
          <a href="https://nvsp.in" target="_blank" rel="noopener noreferrer" className="editorial-badge hover:bg-[rgba(212,168,83,0.15)] transition-colors">📎 NVSP Portal</a>
        </div>
      </div>
    </section>
  );
}
