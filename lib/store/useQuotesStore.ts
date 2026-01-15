import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const useQuotesStore = create<QuotesState>()(
  persist(
    (set, get) => ({
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
        const quote = fetchQuote(category, 'random', current?.id);

        set({
          previous: current,
          current: quote,
        });
      },
    }),
    {
      name: 'quotes-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        category: state.category,
        mode: state.mode,
      }),
    },
  ),
);
