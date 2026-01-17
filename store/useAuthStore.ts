import LocalStorage from "@/services/local-storage";
import { create } from "zustand";

type useAuthStore = {
  token: string | null;
  user: any | null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  isLoadingData: boolean;
  loadData: () => void;
};

export const useAuthStore = create<useAuthStore>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  user: null,
  setUser: (user) => set({ user }),
  isLoadingData: true,
  loadData: async () => {
    const token = await LocalStorage.get("token") ||"1234";
    const user = await LocalStorage.get("user") ;
    set({ token, user, isLoadingData: false });
  },
}));
