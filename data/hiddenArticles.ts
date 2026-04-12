// data/hiddenArticles.ts

export const globallyHiddenLinks = new Set<string>([
  https://theaugustapress.com/the-retro-store-consignment-shop-for-sneakerheads-hosts-grand-opening-of-augusta-location/
]);

export function isGloballyHidden(link: string): boolean {
  return globallyHiddenLinks.has(link);
}

export function addToHidden(link: string) {
  globallyHiddenLinks.add(link);
}

export function removeFromHidden(link: string) {
  globallyHiddenLinks.delete(link);
}