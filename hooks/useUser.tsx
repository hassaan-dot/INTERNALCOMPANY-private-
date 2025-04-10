import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../services/toast-messages";

const handleGetAllUser = async (filters: any) => {
  const res = await api.get(
    `/user-management/get?populate[1]=role&populate[0]=department&pagination[page]=${filters.page}&pagination[pageSize]=${filters.pageSize}&sort=createdAt:desc`
  );
  return res.data;
};

const handleGetOneUser = async (documentId: string) => {
  const res = await api.get(
    `users/${documentId}?populate=role&populate=department`
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

const handleGetUserAttendence = async (id: any) => {
  const res = await api.get(`/user-attendance/${id}`);
  return res.data;
};
const handlClockInUserAttendence = async (id: any) => {
  console.log("id", id);
  const res = await api.get(`/attendance-clockin/${id}`);
  return res.data;
};
const handlClockOutUserAttendence = async (documentId: any) => {
  const res = await api.get(`/attendance-clockout/${documentId}`);
  return res.data;
};

export const useGetUser = () => {
  const { filters } = useModalStore();
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => handleGetAllUser(filters),
  });
};

export const useGetUserAttendence = (id: any) => {
  return useQuery({
    queryKey: ["attendence"],
    queryFn: () => handleGetUserAttendence(id),
  });
};

export const useClockIntUserAttendence = () => {
  return useMutation({
    mutationKey: ["checkIn"],
    mutationFn: (id) => handlClockInUserAttendence(id),
    onSuccess: async (data) => {
      toastSuccess("Success!", "User is created successfully");
    },
    onError: (error) => {
      toastError("Oops!", error.message);
    },
  });
};

export const useClockOutUserAttendence = (id: any) => {
  return useQuery({
    queryKey: ["checkOut", id],
    queryFn: () => handlClockOutUserAttendence(id),
    enabled: !!id, // prevents running the hook if id is null or undefined
  });
};

export const useGetOneUser = (documentId: string) => {
  return useQuery({
    queryKey: ["one-user", documentId],
    queryFn: () => handleGetOneUser(documentId),
  });
};

export const useCreateUser = () => {
  const { setIsUserModalOpen, setRowData } = useModalStore();
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
  const { setIsUserModalOpen, setRowData } = useModalStore();
  const queryUser = useQueryClient();
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async ({ data, id }: any) => handleUpdateUser(data, id),
    onSuccess: (data) => {
      setIsUserModalOpen(false);

      toastSuccess("Success!", "User is updated successfully");
      setRowData(null);

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
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};
