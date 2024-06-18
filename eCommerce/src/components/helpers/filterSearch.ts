export function filterSearch(url: URL, search: string): URL {
  url.searchParams.append('text.en-GB', `${search}`);
  url.searchParams.append('fuzzy', 'true');
  return url;
}
