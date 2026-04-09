// app/page.tsx
import { fetchAugustaNews } from '../lib/rss';
import ClientNewsWrapper from './ClientNewsWrapper';
import { Article } from '../types';

export const revalidate = 1800;

export default async function Home() {
  let articles: Article[] = [];

  try {
    articles = await fetchAugustaNews();
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
          </div>
        </div>
      </header>

      <ClientNewsWrapper initialArticles={articles} />
    </main>
  );
}