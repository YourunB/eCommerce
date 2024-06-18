export function filterPerennial(url: URL): URL {
  url.searchParams.append('filter', 'variants.attributes.annual-plant:"false"');
  return url;
}
