// data/hiddenArticles.ts

export const globallyHiddenLinks = new Set<string>([
  "https://theaugustapress.com/the-retro-store-consignment-shop-for-sneakerheads-hosts-grand-opening-of-augusta-location/",
  // Add more links below, one per line, with quotes
]);

export function isGloballyHidden(link: string): boolean {
  return globallyHiddenLinks.has(link);
}

export function addToHidden(link: string) {
  globallyHiddenLinks.add(link);
}