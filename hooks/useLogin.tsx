import api from "@/services/axios";
import LocalStorage from "@/services/local-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const handleLogin = async (data: any) => {
  const res = await api.post("/auth/local", data);
  return res.data;
};

export const useLogin = () => {
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: any) => handleLogin(data),
    onSuccess: async (data) => {
      setToken(data.jwt);
      setUser(data.user);
      await LocalStorage.save("token", data.jwt);
      await LocalStorage.save("user", data.user);
      router.replace("/(app)/dashboard");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
