export function filterСentAmount(url: URL, СentAmountMinMax: string): URL {
  // expected string "minimumPrice-maximumPrice"
  const [min, max] = СentAmountMinMax.split('-');
  url.searchParams.append('filter', `variants.price.centAmount: range (${min} to ${max})`);
  return url;
}
