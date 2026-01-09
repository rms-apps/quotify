import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Quote {
  text: string;
  author?: string;
  category: string;
}

interface FavoritesState {
  favorites: Quote[];
  hasHydrated: boolean;

  addFavorite: (quote: Quote) => void;
  removeFavorite: (quoteText: string) => void;
  isFavorite: (quoteText: string) => boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      hasHydrated: false,

      addFavorite: (quote) =>
        set((state) => ({
          favorites: state.favorites.some((q) => q.text === quote.text)
            ? state.favorites
            : [...state.favorites, quote],
        })),

      removeFavorite: (quoteText) =>
        set((state) => ({
          favorites: state.favorites.filter((q) => q.text !== quoteText),
        })),

      isFavorite: (quoteText) =>
        get().favorites.some((q) => q.text === quoteText),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
