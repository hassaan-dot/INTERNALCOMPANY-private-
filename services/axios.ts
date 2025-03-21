import axios from "axios";
import LocalStorage from "./local-storage";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL!,
});

api.interceptors.request.use(
  async (config) => {
    const token = await LocalStorage.get("token");

    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
