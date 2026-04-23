// src/components/timeline/ElectionTimeline.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ELECTION_STAGES, PHASE_COLORS } from '../../data/electionStages';

const phases = [
  { id: 'all', label: 'All Phases' },
  { id: 'pre', label: 'Pre-Election' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'voting', label: 'Voting' },
  { id: 'post', label: 'Post-Election' },
];

function StageCard({ stage, isActive, onClick, onAskAboutStage, dimmed }) {
  return (
    <div className={`relative transition-opacity duration-300 ${dimmed ? 'opacity-30' : 'opacity-100'}`}>
      <div className="flex gap-4 md:gap-6">
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-4 h-4 rounded-full border-2 cursor-pointer z-10"
            style={{
              backgroundColor: isActive ? stage.color : 'var(--color-bg)',
              borderColor: stage.color,
              boxShadow: isActive ? `0 0 16px ${stage.color}40` : 'none',
            }}
            onClick={onClick}
          />
          <div className="w-0.5 flex-1 bg-[var(--color-border)] min-h-[20px]" />
        </div>
        <div
          onClick={onClick}
          className={`flex-1 mb-4 rounded-[var(--radius-md)] border cursor-pointer transition-all duration-200 ${
            isActive
              ? 'bg-[var(--color-surface-elevated)] border-[rgba(255,255,255,0.12)] shadow-editorial-lg'
              : 'bg-[rgba(28,34,51,0.4)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
          }`}
        >
          <div className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stage.icon}</span>
                <div>
                  <h3 className="font-display text-base md:text-lg font-bold text-[var(--color-text-primary)]">{stage.label}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: stage.color, backgroundColor: `${stage.color}15`, border: `1px solid ${stage.color}25` }}>
                      {PHASE_COLORS[stage.phase]?.label}
                    </span>
                    <span className="text-xs font-body text-[var(--color-text-muted)]">{stage.duration}</span>
                  </div>
                </div>
              </div>
              <motion.span animate={{ rotate: isActive ? 180 : 0 }} className="text-[var(--color-text-muted)] text-sm mt-1">▾</motion.span>
            </div>
            <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed mt-2">{stage.description}</p>
            <AnimatePresence>
              {isActive && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
                    <div className="section-label mb-3">Key Facts</div>
                    <ul className="space-y-2 mb-4">
                      {stage.keyFacts.map((fact, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm font-body text-[var(--color-text-secondary)]">
                          <span className="text-[var(--color-accent-gold)] text-xs mt-0.5">▸</span>{fact}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {stage.calendarEvent && (
                        <button className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-body font-medium bg-[rgba(212,168,83,0.1)] text-[var(--color-accent-gold)] border border-[rgba(212,168,83,0.2)] hover:bg-[rgba(212,168,83,0.15)] transition-colors">📅 Add to Calendar</button>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); onAskAboutStage?.(stage); }} className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-body font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-accent-gold)] hover:border-[rgba(212,168,83,0.2)] transition-colors">
                        Ask ELECTRA about this →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ElectionTimeline({ onAskAboutStage }) {
  const [activeStage, setActiveStage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [lineDrawn, setLineDrawn] = useState(false);

  useEffect(() => { setTimeout(() => setLineDrawn(true), 300); }, []);

  return (
    <section id="timeline" className="py-12 md:py-16">
      <div className="mb-8">
        <div className="section-label mb-3">The Process</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Election Timeline</h2>
        <p className="font-body text-sm text-[var(--color-text-secondary)] max-w-lg">Every election follows a structured process. Click any stage to learn more.</p>
        <div className="gold-rule-left mt-4" />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {phases.map((phase) => (
          <button key={phase.id} onClick={() => setFilter(phase.id)} className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all ${filter === phase.id ? 'bg-[var(--color-accent-gold)] text-[var(--color-bg)] shadow-gold' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)]'}`}>
            {phase.label}
          </button>
        ))}
      </div>

      {/* Desktop vertical timeline */}
      <div className="hidden md:block relative">
        <div className="absolute left-[7px] top-0 bottom-0 w-0.5 overflow-hidden">
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: lineDrawn ? 1 : 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="w-full h-full origin-top" style={{ background: 'linear-gradient(to bottom, var(--color-accent-gold), rgba(212,168,83,0.2))' }} />
        </div>
        {ELECTION_STAGES.map((stage, index) => (
          <motion.div key={stage.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06, duration: 0.5 }}>
            <StageCard stage={stage} isActive={activeStage === stage.id} dimmed={filter !== 'all' && stage.phase !== filter} onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)} onAskAboutStage={onAskAboutStage} />
          </motion.div>
        ))}
      </div>

      {/* Mobile horizontal carousel */}
      <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3" style={{ width: 'max-content' }}>
          {ELECTION_STAGES.map((stage, index) => (
            <motion.div key={stage.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)} className={`flex-shrink-0 w-64 rounded-[var(--radius-md)] border p-4 cursor-pointer transition-all ${filter !== 'all' && stage.phase !== filter ? 'opacity-30' : ''} ${activeStage === stage.id ? 'bg-[var(--color-surface-elevated)] border-[rgba(255,255,255,0.12)]' : 'bg-[rgba(28,34,51,0.4)] border-[var(--color-border)]'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{stage.icon}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
              </div>
              <h4 className="font-display text-sm font-bold text-[var(--color-text-primary)] mb-1">{stage.label}</h4>
              <span className="text-[10px] font-body text-[var(--color-text-muted)]">{stage.duration}</span>
              <p className="font-body text-xs text-[var(--color-text-secondary)] mt-2 line-clamp-3">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
