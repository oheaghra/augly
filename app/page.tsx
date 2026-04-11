// app/page.tsx
import { fetchAugustaNews } from '../lib/rss';
import ClientNewsWrapper from './ClientNewsWrapper';
import { Article } from '../types';
import { originalArticles } from '../data/originalArticles';

export const revalidate = 1800;

async function getCurrentTemp() {
  try {
    const res = await fetch('https://wttr.in/Augusta,GA?format=%t', { 
      next: { revalidate: 1800 } // cache for 30 minutes
    });
    const temp = await res.text();
    return temp.trim(); // e.g. "72°F"
  } catch (error) {
    return "—";
  }
}

export default async function Home() {
  const currentTemp = await getCurrentTemp();
  
  let rssArticles: Article[] = [];

  try {
    rssArticles = await fetchAugustaNews();
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight">Augly</h1>
              <p className="text-gray-400">Augusta, GA Local News</p>
            </div>

            {/* Temperature in top right */}
            <div className="text-right">
              <div className="text-4xl font-light text-white">
                {currentTemp}
              </div>
              <p className="text-sm text-gray-500 -mt-1">Augusta, GA</p>
            </div>
          </div>
        </div>
      </header>

      <ClientNewsWrapper 
        originalArticles={originalArticles}
        rssArticles={rssArticles}
      />
    </main>
  );
}