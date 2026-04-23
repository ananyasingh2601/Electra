// src/components/chat/ChatWidget.jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeminiChat } from '../../hooks/useGeminiChat';
import useElectionStore from '../../store/useElectionStore';

const STORAGE_KEY = 'electra_chat_history';
const QUICK_STARTERS = [
  'How do I register to vote?',
  'What is MCC?',
  'When is the next election?',
  'What is NOTA?',
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)]" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
      <span className="text-[11px] font-body text-[var(--color-text-muted)] ml-2">ELECTRA is thinking…</span>
    </div>
  );
}

function formatMessageText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc ml-4 space-y-1">$1</ul>')
    .replace(/\n/g, '<br/>');
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[85%] ${isUser ? 'order-1' : 'order-1'}`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-[rgba(212,168,83,0.15)] border border-[rgba(212,168,83,0.3)] flex items-center justify-center">
              <span className="text-[9px] font-display font-bold text-[var(--color-accent-gold)]">E</span>
            </div>
            <span className="text-[10px] font-body text-[var(--color-text-muted)]">ELECTRA</span>
          </div>
        )}
        <div className={`px-4 py-3 rounded-[var(--radius-md)] font-body text-sm leading-relaxed ${
          isUser
            ? 'bg-[rgba(212,168,83,0.12)] text-[var(--color-text-primary)] border border-[rgba(212,168,83,0.15)] rounded-br-sm'
            : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-l-2 border-l-[rgba(212,168,83,0.3)] border border-[var(--color-border)] border-l-[rgba(212,168,83,0.3)] rounded-bl-sm'
        }`}>
          <div dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }} />
        </div>
        {message.text?.includes('eci.gov.in') && (
          <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-body text-[var(--color-text-muted)] hover:text-[var(--color-accent-gold)] transition-colors">
            📎 Official Source
          </a>
        )}
      </div>
    </motion.div>
  );
}

function SuggestionChips({ suggestions, onSelect }) {
  if (!suggestions?.length) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-1.5 mb-3 pl-7">
      {suggestions.map((s, i) => (
        <button key={i} onClick={() => onSelect(s)} className="px-3 py-1.5 rounded-full text-[11px] font-body font-medium text-[var(--color-accent-gold)] bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.15)] hover:bg-[rgba(212,168,83,0.12)] transition-colors">
          {s}
        </button>
      ))}
    </motion.div>
  );
}

export default function ChatWidget({ isOpen, onClose, prefillMessage }) {
  const { chatMessages, isTyping, isDemoMode } = useElectionStore();
  const { sendMessage, isLoading } = useGeminiChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [localMessages, setLocalMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });

  const allMessages = isDemoMode ? chatMessages : (chatMessages.length > 0 ? chatMessages : localMessages);

  useEffect(() => {
    if (chatMessages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
      setLocalMessages(chatMessages);
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isDemoMode) return;
    if (chatMessages.length === 0) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage errors in restricted environments.
      }
      setLocalMessages([]);
    }
  }, [isDemoMode, chatMessages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages, isTyping]);

  useEffect(() => {
    if (prefillMessage) {
      setInput(prefillMessage);
      inputRef.current?.focus();
    }
  }, [prefillMessage]);

  const handleSend = useCallback(() => {
    const msg = input.trim();
    if (!msg || isLoading) return;
    setInput('');
    sendMessage(msg);
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const hasApiKey = import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_api_key_here';

  return (
    <div className={`app-chat-panel ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="font-display text-base font-bold text-[var(--color-text-primary)]">Ask ELECTRA</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-emerald)]" />
            <span className="text-[10px] font-body text-[var(--color-text-muted)]">Powered by Gemini</span>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 rounded-[var(--radius-sm)] hover:bg-[rgba(255,255,255,0.05)] text-[var(--color-text-muted)]">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {allMessages.length === 0 ? (
          <div className="flex flex-col items-center text-center pt-8">
            <div className="w-12 h-12 rounded-full bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.25)] flex items-center justify-center mb-4">
              <span className="font-display text-lg font-bold text-[var(--color-accent-gold)]">E</span>
            </div>
            <p className="font-body text-sm text-[var(--color-text-secondary)] mb-1">Hello! I'm <strong className="text-[var(--color-text-primary)]">ELECTRA</strong>.</p>
            <p className="font-body text-xs text-[var(--color-text-muted)] mb-5 max-w-[240px]">Ask me anything about elections — eligibility, timelines, voting rights, or how the process works.</p>
            {!hasApiKey && (
              <div className="mb-4 px-3 py-2 rounded-[var(--radius-sm)] bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.1)] text-[11px] font-body text-[var(--color-text-muted)]">
                ℹ️ Running in demo mode. Add your <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-[var(--color-accent-gold)]">Gemini API key</a> to .env.local for live AI.
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-1.5">
              {QUICK_STARTERS.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} className="px-3 py-1.5 rounded-full text-[11px] font-body font-medium text-[var(--color-accent-gold)] bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.15)] hover:bg-[rgba(212,168,83,0.12)] transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {allMessages.map((msg) => (
              <div key={msg.id}>
                <ChatMessage message={msg} />
                {msg.role === 'assistant' && msg.suggestions && (
                  <SuggestionChips suggestions={msg.suggestions} onSelect={sendMessage} />
                )}
              </div>
            ))}
          </>
        )}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[var(--color-border)] flex-shrink-0">
        <div className="flex items-center gap-2 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about elections…"
            className="flex-1 bg-transparent text-sm font-body text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-accent-gold)] hover:bg-[rgba(212,168,83,0.1)] disabled:opacity-30 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
