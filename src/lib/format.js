export const abbrNum = (n) => {
  if (n < 1e4) return n;
  if (n >= 1e4 && n < 1e6) return +(n / 1e3).toFixed(1) + 'k';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'm';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'b';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 't';
};

export const fixedDecimal = (n, f) => {
  return Number.parseFloat(n).toFixed(f);
};

export const shortName = (name) => {
  return name.length > 20 ? name.slice(0, 10) + '...' + name.slice(-5) : name;
};
