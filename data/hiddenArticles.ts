// data/hiddenArticles.ts

export const globallyHiddenLinks = new Set<string>([
  // Add links here to hide them globally
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