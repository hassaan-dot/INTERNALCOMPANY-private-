import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const handleGetAllUser = async () => {
  const res = await api.get("/users");
  return res.data;
};

const handleCreateUser = async (data: any) => {
  const res = await api.post("/users", data);
  return res.data;
};

const handleDeleteUser = async (data: any) => {
  console.log("data is ", data.data.documentId);
  const res = await api.delete(`/users/${data.data.documentId}`);
  return res.data;
};

const handleUpdateUser = async (data: any, id: any) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => handleGetAllUser(),
  });
};

export const useCreateUser = () => {
  const { setIsUserModalOpen } = useModalStore();
  const queryUser = useQueryClient();

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (data: any) => handleCreateUser(data),
    onSuccess: async (data) => {
      setIsUserModalOpen(false);
      queryUser.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
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
      console.log("update informatiom", data);
      setIsUserModalOpen(false);
      queryUser.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryUser = useQueryClient();
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (data: any) => handleDeleteUser(data),
    onSuccess: (data) => {
      console.log("update informatiom", data);
      queryUser.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
