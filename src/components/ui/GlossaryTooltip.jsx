// src/components/ui/GlossaryTooltip.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GLOSSARY } from '../../data/glossary';

export default function GlossaryTooltip({ term, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const glossaryEntry = GLOSSARY[term];

  if (!glossaryEntry) return children;

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-electra-400/50 cursor-help text-electra-300 hover:text-electra-200 transition-colors">
        {children}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72"
          >
            <div className="bg-surface-800/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl shadow-black/50">
              <div className="text-xs font-semibold text-electra-400 uppercase tracking-wider mb-1">
                {term}
              </div>
              <div className="text-sm font-medium text-white mb-1.5">
                {glossaryEntry.term}
              </div>
              <div className="text-xs text-white/60 leading-relaxed">
                {glossaryEntry.definition}
              </div>
              {glossaryEntry.relatedStage && (
                <div className="mt-2 pt-2 border-t border-white/10 text-xs text-electra-400/70">
                  📍 Related stage: {glossaryEntry.relatedStage}
                </div>
              )}
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-surface-800/95" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
