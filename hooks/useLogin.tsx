import api from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const handleLogin = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: any) => handleLogin(data),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {},
  });
};
