export function filterСentAmountMax(url: URL, СentAmountMax: string): URL {
  url.searchParams.append('filter', `variants.price.centAmount: range (* to ${СentAmountMax})`);
  return url;
}
