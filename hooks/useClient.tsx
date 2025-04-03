import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../services/toast-messages";

const handleGetAllClient = async (filters: any) => {
  const res = await api.get(
    `/clients?pagination[page]=${filters.page}&pagination[pageSize]=${filters.pageSize}`
  );
  return res.data;
};

const handleCreateClient = async (data: any) => {
  const res = await api.post("/clients/?populate=*", data);
  return res.data;
};

const handleDeleteClient = async (data: any) => {
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
  const { filters } = useModalStore();
  return useQuery({
    queryKey: ["clients", filters],
    queryFn: () => handleGetAllClient(filters),
  });
};

export const useCreateClient = () => {
  const { setIsClientModalOpen, setRowData } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createClient"],
    mutationFn: (data: any) => handleCreateClient(data),
    onSuccess: async (data) => {
      toastSuccess("Success!", "Client Created successfully");
      setIsClientModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};

export const useGetOneClient = (document_id: string) => {
  return useQuery({
    queryKey: ["getoneClient", document_id],
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
      toastSuccess("Success!", "Client Updated successfully");

      setIsClientModalOpen(false);
      setRowData(null);
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: (data: any) => handleDeleteClient(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Client deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};
