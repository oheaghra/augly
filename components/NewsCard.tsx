// components/NewsCard.tsx
import { Calendar, ExternalLink, X } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '../types';

const categoryColors: Record<string, string> = {
  Original: 'bg-amber-500 text-black font-bold',
  Crime: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Politics: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  // ... other categories
  General: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function NewsCard({ 
  article, 
  onHide 
}: { 
  article: Article; 
  onHide: (link: string) => void;
}) {
  const isOriginal = article.source === "Augly Original";

  return (
    <div className={`relative rounded-2xl shadow-sm hover:shadow-md transition-all border overflow-hidden group
      ${isOriginal 
        ? 'border-amber-500 bg-gradient-to-br from-gray-900 to-gray-950 ring-1 ring-amber-500/30' 
        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}>

      {isOriginal && (
        <div className="absolute top-3 left-3 z-20 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
          ORIGINAL
        </div>
      )}

      <button
        onClick={(e) => { e.preventDefault(); onHide(article.link); }}
        className="absolute top-3 right-3 z-20 bg-black/70 hover:bg-black text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      <a href={article.link} target="_blank" rel="noopener noreferrer">
        {article.image && (
          <div className="h-52 overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[article.category || 'General']}`}>
              {article.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{article.source}</span>
          </div>

          <h3 className={`font-semibold text-xl leading-tight mb-3 line-clamp-3
            ${isOriginal ? 'text-amber-300' : 'text-white'}`}>
            {article.title}
          </h3>

          {article.description && (
            <p className="text-gray-400 text-sm line-clamp-4 mb-4">
              {article.description}
            </p>
          )}

          <div className="text-blue-500 text-sm flex items-center gap-1 font-medium">
            Read full story <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    </div>
  );
}