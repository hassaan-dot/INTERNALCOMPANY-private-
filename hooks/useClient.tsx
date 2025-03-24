import api from "@/services/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const handleGetAllClient = async () => {
  const res = await api.get("/clients");
  return res.data;
};

const handleCreateClient = async (data: any) => {
  const res = await api.post("/clients", data);
  return res.data;
};

export const useGetClient = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => handleGetAllClient(),
  });
};

export const useCreateClient = () => {};
