// src/components/news/NewsFeed.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NewsService } from '../../services/newsService';
import useElectionStore from '../../store/useElectionStore';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'official', label: 'ECI Official' },
  { id: 'voting', label: 'Voting' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'schedule', label: 'Schedule' },
];

const MAJOR_NEWS_ORGS = ['ndtv.com', 'thehindu.com', 'timesofindia.indiatimes.com', 'indianexpress.com', 'livemint.com', 'bbc.com', 'reuters.com'];

function hashColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 30%, 18%)`;
}

function getSourceBadge(source) {
  if (!source) return { label: '🌐 Web', cls: '' };
  const s = source.toLowerCase();
  if (s.includes('eci.gov.in')) return { label: '✓ Official', cls: '!text-[var(--color-accent-emerald)] !border-[rgba(22,163,74,0.2)] !bg-[rgba(22,163,74,0.08)]' };
  if (MAJOR_NEWS_ORGS.some(org => s.includes(org))) return { label: '📰 News', cls: '' };
  return { label: '🌐 Web', cls: '' };
}

function extractTags(title) {
  const tagMap = {
    'ECI': /\bECI\b|Election Commission/i, 'Voting': /\bvot(e|ing|er)\b/i, 'MCC': /\bMCC\b|Model Code/i,
    'BJP': /\bBJP\b/i, 'Congress': /\bCongress\b|INC\b/i, 'Results': /\bresult/i,
    'Schedule': /\bschedul|date|phase\b/i, 'Registration': /\bregist/i,
  };
  return Object.entries(tagMap).filter(([, re]) => re.test(title)).map(([k]) => k).slice(0, 3);
}

function SkeletonCard({ large }) {
  return (
    <div className={`glass-surface p-5 animate-pulse ${large ? 'md:col-span-2' : ''}`}>
      <div className="h-3 bg-[var(--color-surface-elevated)] rounded w-1/4 mb-3" />
      <div className="h-5 bg-[var(--color-surface-elevated)] rounded w-3/4 mb-2" />
      <div className="h-3 bg-[var(--color-surface-elevated)] rounded w-full mb-1" />
      <div className="h-3 bg-[var(--color-surface-elevated)] rounded w-2/3" />
    </div>
  );
}

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [refreshing, setRefreshing] = useState(false);
  const { isDemoMode, demoNews } = useElectionStore();

  const fetchNews = async () => {
    setLoading(true);
    if (isDemoMode) {
      setArticles(demoNews);
      setVisibleCount(6);
      setLoading(false);
      return;
    }
    const apiKey = import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY;
    const engineId = import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
    const service = new NewsService(apiKey, engineId);
    const news = await service.getElectionNews();
    setArticles(news);
    setLoading(false);
  };

  useEffect(() => {
    if (isDemoMode) {
      setArticles(demoNews);
      setLoading(false);
      setVisibleCount(6);
      setFilter('all');
      return;
    }
    fetchNews();
  }, [isDemoMode, demoNews]);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (isDemoMode) {
      setArticles(demoNews);
      setVisibleCount(6);
      setFilter('all');
      setRefreshing(false);
      return;
    }
    await fetchNews();
    setRefreshing(false);
  };

  const filtered = filter === 'all' ? articles
    : filter === 'official' ? articles.filter(a => a.source?.includes('eci.gov.in'))
    : articles.filter(a => a.title?.toLowerCase().includes(filter) || a.snippet?.toLowerCase().includes(filter));

  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="news" className="py-12 md:py-16">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="section-label mb-3">Latest</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Election News & Updates</h2>
          <p className="font-body text-sm text-[var(--color-text-secondary)]">Stay informed with the latest election-related developments.</p>
          <div className="gold-rule-left mt-4" />
        </div>
        <button onClick={handleRefresh} aria-label="Refresh news" className={`p-2 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-accent-gold)] hover:bg-[rgba(212,168,83,0.08)] transition-all ${refreshing ? 'animate-spin' : ''}`}>
          ↻
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-body font-semibold tracking-wide transition-all ${filter === f.id ? 'bg-[var(--color-accent-gold)] text-[var(--color-bg)]' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)]'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">{[1,2,3,4,5,6].map(i => <SkeletonCard key={i} large={i <= 2} />)}</div>
      ) : visible.length === 0 ? (
        <div className="glass-surface p-8 text-center">
          <span className="text-2xl mb-2 block">📭</span>
          <p className="font-body text-sm text-[var(--color-text-muted)]">No election news found for your region.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {visible.map((article, i) => {
              const badge = getSourceBadge(article.source);
              const tags = extractTags(article.title);
              const isLarge = i < 2;
              return (
                <motion.a key={i} href={article.link} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className={`block rounded-[var(--radius-md)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-border-hover)] hover:shadow-editorial-lg hover:-translate-y-0.5 transition-all group ${isLarge ? 'md:col-span-1' : ''}`}>
                  {/* Geometric header bar */}
                  <div className="h-2" style={{ background: `linear-gradient(135deg, ${hashColor(article.title)}, ${hashColor(article.title + 'x')})` }} />
                  <div className="p-5 bg-[rgba(28,34,51,0.4)]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`editorial-badge text-[9px] ${badge.cls}`}>{badge.label}</span>
                      <span className="text-[10px] font-body text-[var(--color-text-muted)]">{article.date}</span>
                    </div>
                    <h4 className="font-display text-sm md:text-base font-bold text-[var(--color-text-primary)] mb-2 leading-snug group-hover:text-[var(--color-accent-gold)] group-hover:underline decoration-[var(--color-accent-gold)]/30 underline-offset-2 transition-colors">
                      {article.title}
                    </h4>
                    <p className="font-body text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-3">{article.snippet}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {tags.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded text-[9px] font-body font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)]">{t}</span>
                        ))}
                      </div>
                      <span className="text-[10px] font-body text-[var(--color-text-muted)]">{article.source}</span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
          {visibleCount < filtered.length && (
            <button onClick={() => setVisibleCount(c => c + 4)} className="mt-6 mx-auto block px-6 py-2.5 rounded-[var(--radius-md)] font-body text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)] transition-all">
              Load more
            </button>
          )}
          <p className="text-[10px] font-body text-[var(--color-text-muted)] text-center mt-4 italic">News sourced via Google Search. Verify with official sources.</p>
        </>
      )}
    </section>
  );
}
