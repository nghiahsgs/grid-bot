const usdFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export const numberToUSD = (value: number): string =>
  usdFormatter.format(value);
