import api from "@/services/axios";
import LocalStorage from "@/services/local-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {useModalStore} from "@/store/useModalStore"
 
const handleGetAllClient = async () => {
  const res = await api.get("/clients");
  return res.data;
};

const handleCreateClient = async (data: any) => {
  const res = await api.post("/clients", data);
  return res.data;
};
const handleUpdateClient = async (data: any) => {
  const res = await api.post("/clients", data);
  return res.data;
};

export const useGetClient = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => handleGetAllClient(),
  });
};


export const useCreateClient = () => {

  const {setIsClientModalOpen} = useModalStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["createClient"],
    mutationFn: (data: any) => handleCreateClient(data),
    onSuccess: async (data) => {
      setIsClientModalOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      })
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
export const useUpdateClient = () => {

  const {setIsClientModalOpen} = useModalStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["updateClient"],
    mutationFn: (data: any) => handleUpdateClient(data),
    onSuccess: async (data) => {
      console.log('update informatiom',data)
      setIsClientModalOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      })
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
