import { create } from 'zustand';
import { fetchQuote, Quote, QuoteCategory, QuoteMode } from '@/lib/api/quotes';

type QuotesState = {
  category: QuoteCategory;
  mode: QuoteMode;

  current: Quote | null;
  previous: Quote | null;

  setCategory: (category: QuoteCategory) => void;
  setMode: (mode: QuoteMode) => void;

  loadQuote: () => void;
  nextQuote: () => void;
};

export const useQuotesStore = create<QuotesState>((set, get) => ({
  category: 'Motivational',
  mode: 'daily',

  current: null,
  previous: null,

  setCategory: (category) => {
    set({ category });
    get().loadQuote();
  },

  setMode: (mode) => {
    set({ mode });
    get().loadQuote();
  },

  loadQuote: () => {
    const { category, mode, current } = get();
    const quote = fetchQuote(category, mode);

    set({
      previous: current,
      current: quote,
    });
  },

  nextQuote: () => {
    const { category, current } = get();
    const quote = fetchQuote(category, 'random');

    set({
      previous: current,
      current: quote,
    });
  },
}));
