export function filterLimit(url: URL, limit: string): URL {
  url.searchParams.append('limit', limit);
  return url;
}
