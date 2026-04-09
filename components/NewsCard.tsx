// components/NewsCard.tsx
import { Calendar, ExternalLink, X } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '../types';

const categoryColors: Record<string, string> = {
  Crime: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Politics: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  Business: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Education: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Sports: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  Health: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  Weather: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300',
  General: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function NewsCard({ 
  article, 
  onHide 
}: { 
  article: Article; 
  onHide: (link: string) => void;
}) {
  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800 overflow-hidden group">
      <button onClick={(e) => { e.preventDefault(); onHide(article.link); }}
        className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 text-gray-500 hover:text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all">
        <X className="w-4 h-4" />
      </button>

      <a href={article.link} target="_blank" rel="noopener noreferrer">
        {article.image && (
          <div className="h-48 overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[article.category || 'General']}`}>
              {article.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{article.source}</span>
          </div>

          <h3 className="font-semibold text-lg leading-tight mb-3 text-gray-900 dark:text-white line-clamp-3">
            {article.title}
          </h3>

          {article.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
              {article.description}
            </p>
          )}

          <div className="text-blue-600 dark:text-blue-500 text-sm flex items-center gap-1">
            Read full story <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    </div>
  );
}