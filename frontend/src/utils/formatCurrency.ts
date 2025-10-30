export const formatCurrency = (value: number | string, fractionDigits: number = 2): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) return '';

  return num.toLocaleString('en-CA', {
    // uncomment below if need prefix $
    // style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
};
