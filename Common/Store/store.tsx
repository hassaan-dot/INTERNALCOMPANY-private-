// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   twoFactorRequired: false,
//   loading: false,
//   error: null,

//   login: async (email, password, token_2fa = null) => {
//     set({ loading: true, error: null });

//     try {
//       const response = await fetch("https://hcapi.abdullahkimrigh.sa/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, token_2fa }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       set({
//         user: data.user,
//         token: data.token,
//         twoFactorRequired: data.two_factor_required,
//         loading: false,
//       });

//       return { success: true, twoFactorRequired: data.two_factor_required };

//     } catch (error) {
//       set({ error: error.message, loading: false });
//       return { success: false, error: error.message };
//     }
//   },

//   logout: () => set({ user: null, token: null }),
// }));

// export default useAuthStore;
import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  twoFactorRequired: false,
  error: null,
  isLoading: false,

  login: async (email, password, token_2fa = null) => {
    console.log('1111111',email,password)
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("https://hcapi.abdullahkimrigh.sa/api/auth/login", {
        email,
        password,
        token_2fa,
      });
      console.log('check',response)
      set({
        user: response.data.user,
        token: response.data.token,
        twoFactorRequired: response.data.two_factor_required,
        isLoading: false,
      });
      
      return response.data;
    } catch (error) {
      set({ error: error.response?.data || "Login failed", isLoading: false });
      return null;
    }
  },

  logout: () => {
    set({ user: null, token: null, twoFactorRequired: false });
  },
}));

export default useAuthStore;
