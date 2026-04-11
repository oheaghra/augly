// app/ClientNewsWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
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

  const allArticles = [...originalArticles, ...rssArticles];

  const visibleArticles = allArticles.filter(article => 
    !hiddenArticles.includes(article.link)
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Search */}
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

      {/* Main Grid - All columns same width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleArticles.map(article => (
          <NewsCard 
            key={article.link} 
            article={article} 
            onHide={hideArticle}
            featured={article.source === "Augly Original" && 
                     visibleArticles.indexOf(article) === 0}
          />
        ))}
      </div>

      {visibleArticles.length === 0 && (
        <p className="text-center text-xl text-gray-500 py-20">
          No articles available
        </p>
      )}
    </div>
  );
}