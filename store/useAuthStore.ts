import LocalStorage from "@/services/local-storage";
import { create } from "zustand";

type useAuthStore = {
  token: string | null;
  user: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: string | null) => void;
  isLoadingData: boolean;
  loadData: () => void;
};

export const useAuthStore = create<useAuthStore>((set) => ({
  token: "123",
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  isLoadingData: true,
  loadData: async () => {
    // Load data from AsyncStorage
    const token = await LocalStorage.get("token");
    const user = await LocalStorage.get("user");

    set({ token, user, isLoadingData: false });
  },
}));
