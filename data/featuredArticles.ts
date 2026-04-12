// data/featuredArticles.ts

export const featuredLinks = new Set<string>([
  // Articles here will be moved to the top full-size section
]);

export function isFeatured(link: string): boolean {
  return featuredLinks.has(link);
}

export function promoteToTop(link: string) {
  featuredLinks.add(link);
}

export function removeFromTop(link: string) {
  featuredLinks.delete(link);
}