import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../services/toast-messages";

const handleGetAllUser = async (filters: any) => {
  const res = await api.get(
    `/user-management/get?populate[1]=role&populate[0]=department&pagination[page]=${filters.page}&pagination[pageSize]=${filters.pageSize}`
  );
  return res.data;
};

const handleCreateUser = async (data: any) => {
  const res = await api.post("/users", data);
  return res.data;
};

const handleDeleteUser = async (data: any) => {
  const res = await api.delete(`/users/${data.data.documentId}`);
  return res.data;
};

const handleUpdateUser = async (data: any, id: any) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const useGetUser = () => {
  const { filters } = useModalStore();
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => handleGetAllUser(filters),
  });
};

export const useCreateUser = () => {
  const { setIsUserModalOpen } = useModalStore();
  const queryUser = useQueryClient();

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (data: any) => handleCreateUser(data),
    onSuccess: async (data) => {
      toastSuccess("Success!", "User is created successfully");

      setIsUserModalOpen(false);
      queryUser.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toastError("Oops!", error.message);
    },
  });
};

export const useUpdateUser = () => {
  const { setIsUserModalOpen } = useModalStore();
  const queryUser = useQueryClient();

  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async ({ data, id }: any) => handleUpdateUser(data, id),
    onSuccess: (data) => {
      setIsUserModalOpen(false);

      toastSuccess("Success!", "User is updated successfully");

      queryUser.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};

export const useDeleteUser = () => {
  const queryUser = useQueryClient();
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (data: any) => handleDeleteUser(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "User is deletd successfully");

      queryUser.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};
