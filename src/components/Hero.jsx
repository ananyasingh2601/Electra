// src/components/Hero.jsx
import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const headingWords = ['Understand', 'Every', 'Step', 'of', 'Democracy'];

const stats = [
  { icon: '◉', label: '10 Election Stages', sublabel: 'Complete lifecycle' },
  { icon: '◈', label: 'India + Global', sublabel: 'Multi-region support' },
  { icon: '◎', label: 'Calendar Sync', sublabel: 'Google Calendar' },
];

export default function Hero({ onExploreTimeline, onAskQuestion }) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(28,34,51,0.8) 0%, transparent 70%)',
        }}
      />
      {/* Subtle topographic pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23F5F0E8' stroke-width='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase font-body text-[var(--color-accent-gold)] bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.2)] shadow-[0_0_30px_rgba(212,168,83,0.08)]">
            🗳️ Election Intelligence
          </span>
        </motion.div>

        {/* Heading — word by word */}
        <div className="mb-6">
          <h1 className="font-display text-[40px] md:text-[56px] lg:text-[72px] font-black leading-[1.05] tracking-[-0.02em]">
            {headingWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordReveal}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.28em] ${
                  word === 'Democracy'
                    ? 'text-[var(--color-accent-gold)]'
                    : 'text-[var(--color-text-primary)]'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="font-body text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          From nomination to results — ELECTRA guides you through the complete
          election process with AI-powered explanations, timelines, and reminders.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreTimeline}
            className="group px-7 py-3.5 rounded-[var(--radius-md)] font-body font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-bg)] hover:bg-[var(--color-accent-gold-light)] transition-all duration-200 shadow-[var(--shadow-gold)]"
          >
            Explore Timeline
            <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={onAskQuestion}
            className="px-7 py-3.5 rounded-[var(--radius-md)] font-body font-semibold text-sm text-[var(--color-text-primary)] border border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
          >
            Ask a Question
          </button>
        </motion.div>

        {/* Stat badges */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-5 py-3 rounded-[var(--radius-md)] bg-[rgba(28,34,51,0.5)] border border-[var(--color-border)] backdrop-blur-sm"
            >
              <span className="text-[var(--color-accent-gold)] text-base">{stat.icon}</span>
              <div className="text-left">
                <div className="font-body text-sm font-medium text-[var(--color-text-primary)]">{stat.label}</div>
                <div className="font-body text-[11px] text-[var(--color-text-muted)]">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom editorial rule */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="gold-rule" />
      </div>
    </section>
  );
}
