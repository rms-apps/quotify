export const toTitleCase = (value: string) => {
  return value[0].toLocaleUpperCase() + value.slice(1);
};

export const pluralize = (count: number, unit: string, pluralUnit?: string) => {
  if (count === 1) return `${count} ${unit}`;
  return `${count} ${pluralUnit ?? `${unit}s`}`;
};

export const getDayOfYear = (date = new Date()) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;

  return Math.floor(diff / (1000 * 60 * 60 * 24)) - 1;
};
