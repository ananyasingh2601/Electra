// src/components/ui/GlossaryTooltip.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GLOSSARY } from '../../data/glossary';

export default function GlossaryTooltip({ term, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const entry = GLOSSARY[term];

  useEffect(() => {
    if (!isVisible) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setIsVisible(false); setExpanded(false); } };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isVisible]);

  if (!entry) return children;

  return (
    <span ref={ref} className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => { setIsVisible(false); setExpanded(false); }}
      onClick={() => setIsVisible(v => !v)}>
      <span className="border-b border-dashed border-[var(--color-accent-gold)]/40 cursor-help text-[var(--color-accent-gold)]/80 hover:text-[var(--color-accent-gold)] transition-colors">{children}</span>
      <AnimatePresence>
        {isVisible && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-80">
            <div className="bg-[var(--color-surface-elevated)] backdrop-blur-xl border border-[var(--color-border)] border-l-2 border-l-[var(--color-accent-gold)] rounded-[var(--radius-md)] p-4 shadow-editorial-lg">
              <div className="text-[10px] font-body font-semibold text-[var(--color-accent-gold)] uppercase tracking-widest mb-1">{term}</div>
              <div className="font-display text-sm font-bold text-[var(--color-text-primary)] mb-1.5">{entry.term}</div>
              <div className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">{entry.shortDef}</div>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 pt-2 border-t border-[var(--color-border)]">
                  <p className="font-body text-xs text-[var(--color-text-muted)] leading-relaxed">{entry.fullDef}</p>
                  {entry.relatedTerms?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.relatedTerms.map(rt => <span key={rt} className="px-2 py-0.5 rounded text-[9px] font-body text-[var(--color-text-muted)] bg-[var(--color-surface)]">{rt}</span>)}
                    </div>
                  )}
                  {entry.officialLink && <a href={entry.officialLink} target="_blank" rel="noopener noreferrer" className="block mt-2 text-[10px] font-body text-[var(--color-accent-gold)]">📎 Official Source →</a>}
                </motion.div>
              )}
              {!expanded && <button onClick={(e) => { e.stopPropagation(); setExpanded(true); }} className="mt-1.5 text-[10px] font-body font-medium text-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold-light)]">Read more →</button>}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[var(--color-surface-elevated)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
