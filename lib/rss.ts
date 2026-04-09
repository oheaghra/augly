// lib/rss.ts
import Parser from 'rss-parser';
import { Article } from '../types';

const parser = new Parser({
  customFields: { item: ['media:content', 'media:thumbnail', 'enclosure'] }
});

const feeds = [
  { url: 'https://theaugustapress.com/feed/', name: 'The Augusta Press' },
  { url: 'https://augustagoodnews.com/feed/', name: 'Augusta Good News' },
  { url: 'https://www.wjbf.com/feed/', name: 'WJBF NewsChannel 6' },
  { url: 'https://augustabusinessdaily.com/feed/', name: 'Augusta Business Daily' },
  { url: 'https://www.augustaga.gov/rss.aspx', name: 'City of Augusta' },
  { url: 'https://patch.com/georgia/augusta-ga/rss', name: 'Patch Augusta' },
];

const categorize = (title: string, description: string = ''): string => {
  const text = (title + ' ' + description).toLowerCase();
  if (text.includes('crime') || text.includes('police') || text.includes('arrest') || text.includes('shooting')) return 'Crime';
  if (text.includes('election') || text.includes('council') || text.includes('mayor')) return 'Politics';
  if (text.includes('business') || text.includes('company') || text.includes('economy')) return 'Business';
  if (text.includes('school') || text.includes('education')) return 'Education';
  if (text.includes('sport') || text.includes('football') || text.includes('basketball')) return 'Sports';
  if (text.includes('health') || text.includes('hospital')) return 'Health';
  if (text.includes('weather')) return 'Weather';
  return 'General';
};

export async function fetchAugustaNews(): Promise<Article[]> {
  const allArticles: Article[] = [];

  for (const feed of feeds) {
    try {
      const feedData = await parser.parseURL(feed.url);
      
      const articles = feedData.items.map((item: any) => ({   // ← 'any' to avoid strict typing issues
        title: item.title?.trim() || 'No Title',
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        source: feed.name,
        description: item.contentSnippet || item.description || '',
        image: item['media:content']?.['$']?.url || 
               item['media:thumbnail']?.['$']?.url || 
               item.enclosure?.url,
        category: categorize(
          item.title || '', 
          item.contentSnippet || item.description || ''
        ),
      }));

      allArticles.push(...articles);
    } catch (error) {
      console.error(`Failed ${feed.name}:`, error);
    }
  }

  allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const seen = new Set();
  return allArticles.filter(article => {
    const key = `${article.title}-${article.source}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 60);
}