// app/ClientNewsWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { Article } from '../types';
import { Search } from 'lucide-react';
import { isGloballyHidden, addToHidden } from '../data/hiddenArticles';
import { isFeatured, promoteToTop, removeFromTop } from '../data/featuredArticles';

export default function ClientNewsWrapper({
  originalArticles,
  rssArticles
}: {
  originalArticles: Article[];
  rssArticles: Article[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const allArticles = [...originalArticles, ...rssArticles];

  const visibleArticles = allArticles.filter(article => 
    !isGloballyHidden(article.link)
  );

  const sortedArticles = [...visibleArticles].sort((a, b) => {
    const aFeatured = isFeatured(a.link);
    const bFeatured = isFeatured(b.link);
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return 0;
  });

  const handlePromote = (link: string) => {
    if (isFeatured(link)) {
      if (confirm("Remove from Top Full-Size section?")) {
        removeFromTop(link);
        window.location.reload();
      }
    } else {
      if (confirm("Promote this article to Top Full-Size section?")) {
        promoteToTop(link);
        window.location.reload();
      }
    }
  };

  const handleHide = (link: string) => {
    if (confirm("Hide this article for ALL visitors? This cannot be easily undone.")) {
      addToHidden(link);
      window.location.reload();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedArticles.map((article, index) => (
          <NewsCard 
            key={article.link} 
            article={article} 
            featured={isFeatured(article.link) || (article.source === "Augly Original" && index === 0)}
            headlineOnly={index >= 9}
            isAdmin={isAdmin}
            onHide={handleHide}
            onPromote={handlePromote}
          />
        ))}
      </div>
    </div>
  );
}