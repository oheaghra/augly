// data/promotedArticles.ts

export const promotedLinks = new Set<string>([
  // Add links here when you want to promote articles
]);

export function isPromoted(link: string): boolean {
  return promotedLinks.has(link);
}