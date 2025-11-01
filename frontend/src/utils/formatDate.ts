export const formatDate = (
  isoDate: string,
  options?: { shortMonth?: boolean; monthOnly?: boolean; noYear?: boolean, stringMonth?: boolean },
): string => {
  if (!isoDate) return '';

  const normalized = isoDate.length === 7 ? `${isoDate}-01` : isoDate;
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return '';

  // If wants Oct 11, 2025
  if (options?.stringMonth) {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // if wants Oct
  if (options?.shortMonth) {
    return date.toLocaleString('en-US', { month: 'short' });
  }

  // if wats October
  if (options?.monthOnly) {
    return date.toLocaleString('en-US', { month: 'long' });
  }

  const baseOptions: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    ...(options?.noYear ? {} : { year: 'numeric' }),
  };

  return date.toLocaleDateString('en-US', baseOptions);
};
