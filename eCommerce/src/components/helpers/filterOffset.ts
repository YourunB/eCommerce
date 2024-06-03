export function filterOffset(url: URL, offset: string): URL {
  url.searchParams.append('offset', offset);
  return url;
}
