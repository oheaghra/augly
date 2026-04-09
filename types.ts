// types.ts
export type Article = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description?: string;
  image?: string;
  category?: string;        // ← New
};