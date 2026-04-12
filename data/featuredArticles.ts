// data/featuredArticles.ts

// Add full article URLs here to promote them to the top full-size section
export const featuredLinks = new Set<string>([
  // Example:
  "https://www.wjbf.com/news/crime-news/child-murder-suspect-apprehended-after-hours-long-standoff-rcso-says/",
  "https://theaugustapress.com/beating-death-of-hephzibah-girl-leads-to-midnight-pursuit-and-swat-standoff-in-augusta/",
  // ← Paste your promoted links here (with quotes)
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