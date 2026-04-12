// components/NewsCard.tsx
import { Calendar, ExternalLink, X, Star } from 'lucide-react';
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
  headlineOnly = false,
  isAdmin = false,
  onPromote
}: { 
  article: Article; 
  onHide: (link: string) => void;
  featured?: boolean;
  headlineOnly?: boolean;
  isAdmin?: boolean;
  onPromote?: (link: string) => void;
}) {
  const isOriginal = article.source === "Augly Original";

  if (headlineOnly) {
    return (
      <a 
        href={article.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block py-5 border-b border-gray-800 hover:bg-gray-900 px-2 -mx-2 rounded-xl group transition-colors"
      >
        <div className="flex justify-between items-start gap-4">
          <h4 className="font-medium text-[17px] leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors flex-1">
            {article.title}
          </h4>
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={(e) => { 
                  e.preventDefault(); 
                  navigator.clipboard.writeText(article.link);
                  alert("✅ Link copied!\n\nPaste into featuredArticles.ts to promote to top");
                }}
                className="text-amber-500 hover:text-amber-400 text-xs opacity-0 group-hover:opacity-100"
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { 
                  e.preventDefault(); 
                  navigator.clipboard.writeText(article.link);
                  alert("✅ Link copied!\n\nPaste into hiddenArticles.ts to hide globally");
                }}
                className="text-red-500 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100"
              >
                Hide
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {article.source} • {format(new Date(article.pubDate), 'MMM d, yyyy')}
        </p>
      </a>
    );
  }

  // Normal / Featured Card
  return (
    <div className={`relative rounded-2xl overflow-hidden border group transition-all
      ${featured 
        ? 'border-amber-500 ring-1 ring-amber-500/30 bg-gradient-to-br from-gray-900 to-black' 
        : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}>

      {isAdmin && (
        <div className="absolute top-4 right-4 z-30 flex gap-2">
          <button
            onClick={(e) => { 
              e.preventDefault(); 
              navigator.clipboard.writeText(article.link);
              alert("✅ Link copied!\n\nPaste into featuredArticles.ts to promote to top");
            }}
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all"
          >
            <Star className="w-3 h-3" /> Promote
          </button>
          <button
            onClick={(e) => { 
              e.preventDefault(); 
              navigator.clipboard.writeText(article.link);
              alert("✅ Link copied!\n\nPaste into hiddenArticles.ts to hide globally");
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full transition-all"
          >
            Hide
          </button>
        </div>
      )}

      <a href={article.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {article.image && (
          <div className={`overflow-hidden ${featured ? 'h-80' : 'h-52'}`}>
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className={`p-6 ${featured ? 'pt-8' : 'pt-6'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-4 py-1.5 rounded-full font-medium ${categoryColors[article.category || 'General']}`}>
              {article.category}
            </span>
            
            {isOriginal && (
              <span className="text-amber-500 text-xs font-bold tracking-wider">AUGLY ORIGINAL</span>
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
              Read full <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}