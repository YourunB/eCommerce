export function filterSort(url: URL, sort: string): URL {
  url.searchParams.append('sort', sort);
  return url;
}
