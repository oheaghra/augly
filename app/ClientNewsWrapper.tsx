// app/ClientNewsWrapper.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import NewsCard from '../components/NewsCard';
import { Article } from '../types';
import { Search } from 'lucide-react';

export default function ClientNewsWrapper({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [hiddenArticles, setHiddenArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load hidden articles
  useEffect(() => {
    const saved = localStorage.getItem('hiddenArticles');
    if (saved) {
      setHiddenArticles(JSON.parse(saved));
    }
  }, []);

  const visibleArticles = useMemo(() => {
    return articles
      .filter(article => !hiddenArticles.includes(article.link))
      .filter(article => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
          article.title.toLowerCase().includes(term) ||
          (article.description && article.description.toLowerCase().includes(term)) ||
          article.source.toLowerCase().includes(term)
        );
      });
  }, [articles, hiddenArticles, searchTerm]);

  const hideArticle = (link: string) => {
    const newHidden = [...hiddenArticles, link];
    setHiddenArticles(newHidden);
    localStorage.setItem('hiddenArticles', JSON.stringify(newHidden));
  };

  const clearHidden = () => {
    setHiddenArticles([]);
    localStorage.removeItem('hiddenArticles');
  };

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search headlines, sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 text-lg placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Hidden counter */}
      {hiddenArticles.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-6 flex justify-end">
          <button
            onClick={clearHidden}
            className="text-sm text-gray-400 hover:text-red-500 underline"
          >
            Show hidden articles ({hiddenArticles.length})
          </button>
        </div>
      )}

      {/* News Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleArticles.length > 0 ? (
            visibleArticles.map((article) => (
              <NewsCard 
                key={article.link} 
                article={article} 
                onHide={hideArticle}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400">
              {searchTerm ? "No matching articles found" : "No articles left"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}