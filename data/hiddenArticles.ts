// data/hiddenArticles.ts

export const globallyHiddenLinks = new Set<string>([
  // Add links here when you want to hide them from everyone
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