// src/components/ui/CountrySelector.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useElectionStore from '../../store/useElectionStore';
import { COUNTRIES } from '../../data/electionDates';

export default function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCountry, selectedState, setSelectedCountry, setSelectedState } = useElectionStore();
  
  const country = COUNTRIES.find(c => c.id === selectedCountry) || COUNTRIES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
      >
        <span className="text-lg">{country.flag}</span>
        <span className="text-white/80">{country.name}</span>
        {selectedState && (
          <span className="text-white/50">• {selectedState}</span>
        )}
        <svg className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-72 bg-surface-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {/* Country Selection */}
            <div className="p-2 border-b border-white/10">
              <div className="text-xs text-white/40 uppercase tracking-wider px-3 py-1">Country</div>
              {COUNTRIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCountry(c.id);
                    setSelectedState('');
                    if (c.states.length === 0) setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCountry === c.id ? 'bg-electra-500/20 text-electra-300' : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* State Selection (India) */}
            {country.states.length > 0 && (
              <div className="p-2 max-h-60 overflow-y-auto scrollbar-thin">
                <div className="text-xs text-white/40 uppercase tracking-wider px-3 py-1">State / UT</div>
                {country.states.map(state => (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedState(state);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedState === state ? 'bg-electra-500/20 text-electra-300' : 'hover:bg-white/5 text-white/60'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
