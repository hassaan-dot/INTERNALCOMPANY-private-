import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, login2FA } from "../Auth/auth";


export const useAuthStore = create((set) => ({
    userToken: null,
    loading: false,


  signIn: async (email, password) => {
    // console.log('usertokken,',token = await login(email, password))
    console.log(email,password)

    set({ loading: true });
    try {
      const token = await login(email, password);
      await AsyncStorage.setItem("userToken", token);
      set({ userToken: token });
    } catch (error) {
      console.error("Login failed from api:", error.message);
    }
    set({ loading: false });
  },

  signOut: async () => {
    await AsyncStorage.removeItem("userToken");
    set({ userToken: null });
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem("userToken");
    set({ userToken: token });
  },
}));
