import { create } from 'zustand';
import type { StoreType } from '@/types';

export const useStore = create<StoreType>((set) => ({
  user: null,
  setUser: () => {
    set({ user: 'test' });
  },
}));
