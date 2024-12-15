export function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[\s-]+/g, '');
}

export function areStringsEqual(str1: string, str2: string): boolean {
  return normalizeString(str1) === normalizeString(str2);
} 