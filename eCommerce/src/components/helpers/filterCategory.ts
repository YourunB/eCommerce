export function filterCategory(url: URL, idCategory: string): URL {
  url.searchParams.append('filter', `categories.id:"${idCategory}"`);
  return url;
}
