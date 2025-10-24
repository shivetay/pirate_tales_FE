import { StoreType } from "@/types";
import { create } from "zustand";

export const useStore = create<StoreType>((set) => ({
  user: null,
  setUser: () => {
    set({ user: "test" });
  },
}));
