import { GITA_QUOTES } from './data/gita';
import { LIFE_QUOTES } from './data/life';
import { WISDOM_QUOTES } from './data/wisdom';
import { SUCCESS_QUOTES } from './data/success';
import { getDayOfYear } from '@/lib/utils/common';
import { MOTIVATIONAL_QUOTES } from './data/motivational';

export type Quote = {
  id: number; // 0–365 (important)
  text: string;
  author?: string;
  category: QuoteCategory;
};

export type QuoteCategory =
  | 'Gita'
  | 'Motivational'
  | 'Wisdom'
  | 'Success'
  | 'Life';

export const QUOTE_MAP: Record<QuoteCategory, Quote[]> = {
  Gita: GITA_QUOTES,
  Motivational: MOTIVATIONAL_QUOTES,
  Wisdom: WISDOM_QUOTES,
  Success: SUCCESS_QUOTES,
  Life: LIFE_QUOTES,
};

export type QuoteMode = 'daily' | 'random';

export const fetchQuote = (
  category: QuoteCategory,
  mode: QuoteMode = 'daily',
): Quote => {
  const list = QUOTE_MAP[category];

  if (!list || list.length === 0) {
    throw new Error(`No quotes found for category: ${category}`);
  }

  if (mode === 'random') {
    return list[Math.floor(Math.random() * list.length)];
  }

  const dayIndex = getDayOfYear(); // 0–365
  return list[dayIndex % list.length];
};
