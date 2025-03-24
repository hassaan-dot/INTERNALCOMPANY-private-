import api from "@/services/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const handleGetAllClient = async (data: any) => {
  const res = await api.post("/auth/local", data);
  return res.data;
};

const handleCreateClient = async (data: any) => {
  const res = await api.post("/auth/local", data);
  return res.data;
};

const handleUpdateClient = async (data: any) => {
  const res = await api.post("/auth/local", data);
  return res.data;
};

const handleDeleteClient = async (data: any) => {
  const res = await api.post("/auth/local", data);
  return res.data;
};

export const useClient = () => {
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: any) => handleLogin(data),
    onSuccess: (data) => {
      setToken(data.jwt);
      setUser(data.user);
    },
    onError: (error) => {},
  });
};
