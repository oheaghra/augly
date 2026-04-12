// data/hiddenArticles.ts

export const globallyHiddenLinks = new Set<string>([
  "https://theaugustapress.com/the-retro-store-consignment-shop-for-sneakerheads-hosts-grand-opening-of-augusta-location/",
  "https://theaugustapress.com/taylors-trio-moving-day-has-a-lot-of-moving-parts-at-the-masters-tournament/",
]);

export function isGloballyHidden(link: string): boolean {
  return globallyHiddenLinks.has(link);
}

export function addToHidden(link: string) {
  globallyHiddenLinks.add(link);
}