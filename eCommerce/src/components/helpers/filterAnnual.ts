export function filterAnnual(url: URL): URL {
  url.searchParams.append('filter', 'variants.attributes.annual-plant:"true"');
  return url;
}
