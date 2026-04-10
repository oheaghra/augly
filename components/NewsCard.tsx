// components/NewsCard.tsx
import { Calendar, ExternalLink, X } from 'lucide-react';
import { format } from 'date-fns';
import { Article } from '../types';

const categoryColors: Record<string, string> = {
  Original: 'bg-amber-500 text-black font-bold',
  Crime: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  Politics: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  Business: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Sports: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  General: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function NewsCard({ 
  article, 
  onHide,
  featured = false,
  compact = false
}: { 
  article: Article; 
  onHide: (link: string) => void;
  featured?: boolean;
  compact?: boolean;
}) {
  const isOriginal = article.source === "Augly Original";

  if (compact) {
    return (
      <a 
        href={article.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl p-4 transition-all group"
      >
        <div className="flex gap-3">
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            {isOriginal && (
              <span className="text-amber-500 text-xs font-bold">AUGLY ORIGINAL</span>
            )}
            <h3 className="font-semibold text-base leading-tight line-clamp-3 mt-1 group-hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              {format(new Date(article.pubDate), 'MMM d')}
            </p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden border group transition-all
      ${featured 
        ? 'border-amber-500 ring-1 ring-amber-500/30 bg-gradient-to-br from-gray-900 to-black' 
        : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}>

      {/* Hide Button */}
      <button
        onClick={(e) => { e.preventDefault(); onHide(article.link); }}
        className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
      >
        <X className="w-4 h-4" />
      </button>

      <a href={article.link} target="_blank" rel="noopener noreferrer">
        {article.image && (
          <div className={`overflow-hidden ${featured ? 'h-80' : 'h-52'}`}>
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className={`p-6 ${featured ? 'pt-8' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-4 py-1.5 rounded-full font-medium ${categoryColors[article.category || 'General']}`}>
              {article.category}
            </span>
            {isOriginal && !featured && (
              <span className="text-amber-500 text-xs font-bold">ORIGINAL</span>
            )}
          </div>

          <h3 className={`font-bold leading-tight mb-4 line-clamp-4
            ${featured ? 'text-3xl' : 'text-xl'}`}>
            {article.title}
          </h3>

          {article.description && (
            <p className={`text-gray-400 line-clamp-4 ${featured ? 'text-base' : 'text-sm'}`}>
              {article.description}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="text-gray-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(article.pubDate), 'MMMM d, yyyy')}
            </div>
            <div className="text-blue-500 flex items-center gap-1 font-medium">
              Read full story <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}