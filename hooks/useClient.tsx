import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { createIconSetFromFontello } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const handleGetAllClient = async () => {
  const res = await api.get("/clients");
  return res.data;
};

const handleCreateClient = async (data: any) => {
  const res = await api.post("/clients/?populate=*", data);
  return res.data;
};

const handleDeleteClient = async (data: any) => {
  console.log("data is ", data.data.documentId);
  const res = await api.delete(`/clients/${data.data.documentId}`);
  return res.data;
};

const handleUpdateClient = async (data: any, id: string) => {
  const res = await api.put(`/clients/${id}`, data);
  return res.data;
};

const handleGetOneClient = async (documentId: string) => {
  const res = await api.get(`/clients/${documentId}`);
  return res.data;
};

export const useGetClient = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => handleGetAllClient(),
  });
};

export const useCreateClient = () => {
  const { setIsClientModalOpen, setRowData } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createClient"],
    mutationFn: (data: any) => handleCreateClient(data),
    onSuccess: async (data) => {
      setIsClientModalOpen(false);
      setRowData(null);
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useGetOneClient = (document_id: string) => {
  return useQuery({
    queryKey: ["getoneRequest", document_id],
    queryFn: () => handleGetOneClient(document_id),
  });
};

export const useUpdateClient = () => {
  const { setIsClientModalOpen, setRowData } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateClient"],
    mutationFn: ({ data, id }: any) => handleUpdateClient(data, id),
    onSuccess: (data) => {
      setIsClientModalOpen(false);
      setRowData(null);
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: (data: any) => handleDeleteClient(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
