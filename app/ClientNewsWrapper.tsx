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

  const visibleOriginals = originalArticles.filter(a => !hiddenArticles.includes(a.link));
  const visibleRSS = rssArticles.filter(a => !hiddenArticles.includes(a.link));

  const featured = visibleOriginals[0];
  const otherOriginals = visibleOriginals.slice(1);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN - Augly Originals */}
        <div className="lg:col-span-5 space-y-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-amber-500">★</span> Augly Originals
          </h2>

          {/* Big Featured Article */}
          {featured && (
            <NewsCard article={featured} onHide={hideArticle} featured />
          )}

          {/* Other Original Headlines - Vertical List */}
          {otherOriginals.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-5 text-amber-400">More Augly Originals</h3>
              <div className="space-y-6">
                {otherOriginals.map(article => (
                  <a 
                    key={article.link}
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h4 className="font-medium leading-tight text-lg group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">
                      {article.category} • {new Date(article.pubDate).toLocaleDateString()}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Latest News */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-bold mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleRSS.map(article => (
              <NewsCard 
                key={article.link} 
                article={article} 
                onHide={hideArticle} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}