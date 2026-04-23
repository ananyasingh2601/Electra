// src/components/news/NewsFeed.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NewsService } from '../../services/newsService';

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_API_KEY;
      const engineId = import.meta.env.VITE_GOOGLE_CUSTOM_SEARCH_ENGINE_ID;
      const service = new NewsService(apiKey, engineId);
      const news = await service.getElectionNews();
      setArticles(news);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <section id="news" className="py-12 md:py-16">
      <div className="mb-8">
        <div className="section-label mb-3">Latest</div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Election News & Updates</h2>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">Stay informed with the latest election-related developments.</p>
        <div className="gold-rule-left mt-4" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-surface p-5 animate-pulse">
              <div className="h-3 bg-[var(--color-surface-elevated)] rounded w-1/4 mb-3" />
              <div className="h-4 bg-[var(--color-surface-elevated)] rounded w-3/4 mb-2" />
              <div className="h-3 bg-[var(--color-surface-elevated)] rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-surface p-5 block hover:border-[var(--color-border-hover)] transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`editorial-badge text-[10px] ${article.isOfficial ? '!text-[var(--color-accent-emerald)] !border-[rgba(22,163,74,0.2)] !bg-[rgba(22,163,74,0.08)]' : ''}`}>
                  {article.isOfficial ? '✓ ECI Official' : '📰 News'}
                </span>
                <span className="text-[10px] font-body text-[var(--color-text-muted)]">{article.date}</span>
              </div>
              <h4 className="font-display text-sm font-bold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-accent-gold)] transition-colors leading-snug">{article.title}</h4>
              <p className="font-body text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">{article.snippet}</p>
              <div className="mt-3 text-[10px] font-body text-[var(--color-text-muted)]">{article.source}</div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
