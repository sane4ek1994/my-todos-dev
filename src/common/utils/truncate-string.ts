export const truncateString = (s: string, w: number) =>
  s.length > w ? `${s.substring(0, w).trim()}...` : s;
