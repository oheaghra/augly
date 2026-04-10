// app/ClientNewsWrapper.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import NewsCard from '../components/NewsCard';
import { Article } from '../types';
import { Search } from 'lucide-react';

export default function ClientNewsWrapper({
  originalArticles,
  rssArticles
}: {
  originalArticles: Article[];
  rssArticles: Article[];
}) {
  const [hiddenArticles, setHiddenArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('hiddenArticles');
    if (saved) setHiddenArticles(JSON.parse(saved));
  }, []);

  const hideArticle = (link: string) => {
    const newHidden = [...hiddenArticles, link];
    setHiddenArticles(newHidden);
    localStorage.setItem('hiddenArticles', JSON.stringify(newHidden));
  };

  const visibleOriginals = originalArticles.filter(a => !hiddenArticles.includes(a.link));
  const visibleRSS = rssArticles.filter(a => !hiddenArticles.includes(a.link));

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search headlines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* === AUGLY ORIGINALS SECTION === */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="text-amber-500">★</span> Augly Originals
        </h2>

        {/* Featured Original (Big card) */}
        {visibleOriginals.length > 0 && (
          <div className="mb-8">
            <NewsCard article={visibleOriginals[0]} onHide={hideArticle} featured />
          </div>
        )}

        {/* Compact Originals Grid */}
        {visibleOriginals.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {visibleOriginals.slice(1).map(article => (
              <NewsCard key={article.link} article={article} onHide={hideArticle} compact />
            ))}
          </div>
        )}
      </div>

      {/* === REGULAR NEWS FEED === */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleRSS.map(article => (
            <NewsCard key={article.link} article={article} onHide={hideArticle} />
          ))}
        </div>
      </div>
    </div>
  );
}