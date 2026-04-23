// src/components/eligibility/EligibilityChecker.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const electionOptions = [
  { id: 'lok-sabha', label: 'Lok Sabha', sub: 'General Election', icon: '🏛️' },
  { id: 'vidhan-sabha', label: 'State Assembly', sub: 'Vidhan Sabha', icon: '🏢' },
  { id: 'municipal', label: 'Municipal / Local', sub: 'Local Body Election', icon: '🏘️' },
  { id: 'presidential', label: 'Presidential', sub: 'Indirect Election', icon: '⭐' },
];

const slideLeft = { initial: { x: 60, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -60, opacity: 0 }, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } };
const slideRight = { initial: { x: -60, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 60, opacity: 0 }, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } };

function CheckmarkAnimation() {
  return (
    <motion.svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-4">
      <motion.circle cx="32" cy="32" r="30" fill="none" stroke="var(--color-accent-emerald)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
      <motion.path d="M20 32 L28 40 L44 24" fill="none" stroke="var(--color-accent-emerald)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
    </motion.svg>
  );
}

export default function EligibilityChecker() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('forward');
  const [election, setElection] = useState('');
  const [age, setAge] = useState(18);
  const [citizen, setCitizen] = useState(null);
  const [registered, setRegistered] = useState(null);

  const goForward = () => { setDirection('forward'); setStep(s => s + 1); };
  const goBack = () => { setDirection('back'); setStep(s => s - 1); };

  const getResult = () => {
    if (age < 18) return 'underage';
    if (citizen === false) return 'not-citizen';
    if (registered === false) return 'not-registered';
    if (registered === null) return 'unsure';
    return 'eligible';
  };

  const anim = direction === 'forward' ? slideLeft : slideRight;

  return (
    <section id="eligibility" className="py-12 md:py-16">
      <div className="mb-8">
        <div className="section-label mb-3">Verify</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Eligibility Checker</h2>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">Find out if you're eligible to vote in the next election.</p>
        <div className="gold-rule-left mt-4" />
      </div>

      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-semibold transition-all ${s <= step ? 'bg-[var(--color-accent-gold)] text-[var(--color-bg)]' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-0.5 transition-colors ${s < step ? 'bg-[var(--color-accent-gold)]' : 'bg-[var(--color-border)]'}`} />}
            </div>
          ))}
        </div>

        <div className="glass-surface-elevated p-6 md:p-8 min-h-[360px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...anim}>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🗳️</div>
                  <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">Let's check your eligibility</h3>
                  <p className="font-body text-sm text-[var(--color-text-muted)]">Which election are you checking for?</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {electionOptions.map((opt) => (
                    <button key={opt.id} onClick={() => { setElection(opt.id); goForward(); }}
                      className={`p-4 rounded-[var(--radius-md)] border text-left transition-all hover:border-[var(--color-accent-gold)] hover:bg-[rgba(212,168,83,0.05)] ${election === opt.id ? 'border-[var(--color-accent-gold)] bg-[rgba(212,168,83,0.08)]' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}>
                      <span className="text-2xl mb-2 block">{opt.icon}</span>
                      <div className="font-display text-sm font-bold text-[var(--color-text-primary)]">{opt.label}</div>
                      <div className="text-[11px] font-body text-[var(--color-text-muted)]">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...anim}>
                <button onClick={goBack} className="flex items-center gap-1 text-xs font-body text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-6 transition-colors">← Back</button>
                <div className="space-y-6">
                  {/* Age */}
                  <div>
                    <label className="section-label block mb-3">How old are you?</label>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setAge(Math.max(1, age - 1))} className="w-10 h-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-gold)] transition-colors text-lg">−</button>
                      <motion.span key={age} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-4xl font-bold text-[var(--color-text-primary)] w-16 text-center">{age}</motion.span>
                      <button onClick={() => setAge(Math.min(120, age + 1))} className="w-10 h-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-gold)] transition-colors text-lg">+</button>
                    </div>
                  </div>
                  {/* Citizenship */}
                  <div>
                    <label className="section-label block mb-3">Indian Citizen?</label>
                    <div className="flex gap-3">
                      {[{ v: true, l: '🇮🇳 Yes' }, { v: false, l: 'No' }].map(({ v, l }) => (
                        <button key={String(v)} onClick={() => setCitizen(v)} className={`flex-1 py-3 rounded-[var(--radius-md)] font-body text-sm font-medium border transition-all ${citizen === v ? 'border-[var(--color-accent-gold)] bg-[rgba(212,168,83,0.08)] text-[var(--color-accent-gold)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                  {/* Registered */}
                  <div>
                    <label className="section-label block mb-3">Registered on Electoral Roll?</label>
                    <div className="flex gap-2">
                      {[{ v: true, l: 'Yes' }, { v: false, l: 'No' }, { v: null, l: 'Not Sure' }].map(({ v, l }) => (
                        <button key={String(v)} onClick={() => setRegistered(v)} className={`flex-1 py-2.5 rounded-[var(--radius-md)] font-body text-xs font-medium border transition-all ${registered === v ? 'border-[var(--color-accent-gold)] bg-[rgba(212,168,83,0.08)] text-[var(--color-accent-gold)]' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'}`}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={goForward} disabled={citizen === null} className="w-full py-3 rounded-[var(--radius-md)] font-body font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-bg)] hover:bg-[var(--color-accent-gold-light)] disabled:opacity-40 transition-all">Check Eligibility →</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" {...anim}>
                <button onClick={goBack} className="flex items-center gap-1 text-xs font-body text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] mb-4 transition-colors">← Back</button>
                {getResult() === 'eligible' && (
                  <div className="text-center py-4">
                    <CheckmarkAnimation />
                    <h3 className="font-display text-xl font-bold text-[var(--color-accent-emerald)] mb-2">You are eligible to vote!</h3>
                    <p className="font-body text-sm text-[var(--color-text-secondary)] mb-6">Here's what to do next:</p>
                    <ol className="text-left space-y-3 mb-6">
                      {['Register at voters.eci.gov.in', 'Get your Voter ID (EPIC)', 'Find your polling booth'].map((s, i) => (
                        <li key={i} className="flex items-start gap-3 font-body text-sm text-[var(--color-text-secondary)]">
                          <span className="w-6 h-6 rounded-full bg-[rgba(22,163,74,0.15)] text-[var(--color-accent-emerald)] text-xs flex items-center justify-center flex-shrink-0 font-semibold">{i + 1}</span>{s}
                        </li>
                      ))}
                    </ol>
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 rounded-[var(--radius-md)] font-body text-xs font-semibold bg-[var(--color-accent-gold)] text-[var(--color-bg)]">📅 Add Voting Day</button>
                      <button className="flex-1 py-2.5 rounded-[var(--radius-md)] font-body text-xs font-semibold border border-[var(--color-border)] text-[var(--color-text-secondary)]">📍 Find Booth</button>
                    </div>
                  </div>
                )}
                {getResult() === 'underage' && (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">📅</div>
                    <h3 className="font-display text-xl font-bold text-[var(--color-accent-gold)] mb-2">Not yet — but soon!</h3>
                    <p className="font-body text-sm text-[var(--color-text-secondary)]">You'll be eligible when you turn 18. That's in <strong className="text-[var(--color-text-primary)]">{18 - age} year{18 - age > 1 ? 's' : ''}</strong>.</p>
                  </div>
                )}
                {getResult() === 'not-citizen' && (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">🌍</div>
                    <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">Indian citizenship required</h3>
                    <p className="font-body text-sm text-[var(--color-text-secondary)]">Only Indian citizens are eligible to vote in Indian elections.</p>
                  </div>
                )}
                {getResult() === 'not-registered' && (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">📝</div>
                    <h3 className="font-display text-xl font-bold text-[var(--color-accent-gold)] mb-2">Eligible but not registered</h3>
                    <p className="font-body text-sm text-[var(--color-text-secondary)] mb-4">You're eligible! Register now to make your vote count.</p>
                    <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-[var(--radius-md)] font-body font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-bg)] hover:bg-[var(--color-accent-gold-light)] transition-colors">Register at voterportal.eci.gov.in →</a>
                  </div>
                )}
                {getResult() === 'unsure' && (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">🔍</div>
                    <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)] mb-2">Let's find out</h3>
                    <p className="font-body text-sm text-[var(--color-text-secondary)] mb-4">Check your registration status on the official portal.</p>
                    <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-[var(--radius-md)] font-body font-semibold text-sm bg-[var(--color-accent-gold)] text-[var(--color-bg)]">Check at voters.eci.gov.in →</a>
                  </div>
                )}
                <button onClick={() => { setStep(1); setElection(''); setAge(18); setCitizen(null); setRegistered(null); }} className="w-full mt-4 py-2 text-xs font-body text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors">Start Over</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
