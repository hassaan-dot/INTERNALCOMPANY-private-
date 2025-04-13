import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../services/toast-messages";
import { groupHoursByLocalDay } from "@/src/utils";

const handleGetAllUser = async (filters: any) => {
  const res = await api.get(
    `/user-management/get?populate[1]=role&populate[0]=department&pagination[page]=${filters.page}&pagination[pageSize]=${filters.pageSize}&sort=${filters?.sort}`
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

const handleGetWorkingHours = async (id: any) => {
  const res = await api.get(`/daily-hours-worked/${id}`);
  return res.data;
};

const hanldeGetAssignedPOStats = async (id: any) => {
  const res = await api.get(`/assigned-po-stats/${id}`);
  return res.data;
};

const handlClockInUserAttendence = async (id: any) => {
  const res = await api.post(`/attendance-clockin/${id}`, {});
  return res.data;
};

const handlClockOutUserAttendence = async (id: any) => {
  const res = await api.post(`/attendance-clockout/${id}`, {});
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
    queryKey: ["attendence-user", id],
    queryFn: () => handleGetUserAttendence(id),
  });
};

export const useGetUserWorkingHours = (id: any) => {
  return useQuery({
    queryKey: ["user-working-hours", id],
    queryFn: () => handleGetWorkingHours(id),
    select: (data) => {
      const graph_data = groupHoursByLocalDay(data);
      return graph_data;
    },
  });
};

export const useGetAssignedPOStats = (id: any) => {
  return useQuery({
    queryKey: ["user-assigned-po-stats", id],
    queryFn: () => hanldeGetAssignedPOStats(id),
    select: (data) => {
      const colors = ["#4caf50", "#ffeb3b", "#f44336", "#d9d9d9"];
      const graph_data = data?.data?.map((item: any, index: number) => ({
        value: item?.value ?? 5,
        text: item?.label,
        color: colors[index],
        percentage: item?.percentage,
      }));
      return graph_data;
    },
  });
};

export const useClockIntUserAttendence = (id: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["checkIn", id],
    mutationFn: () => handlClockInUserAttendence(id),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: ["attendence-user", id],
        type: "active",
      });
      toastSuccess("Success!", "User Clocked In!");
    },
    onError: (error: any) => {
      toastError("Oops!", error.response?.data?.error?.message);
    },
  });
};

export const useClockOutUserAttendence = (id: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["checkOut", id],
    mutationFn: () => handlClockOutUserAttendence(id),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: ["attendence-user", id],
        type: "active",
      });
      toastSuccess("Success!", "User Clocked Out!");
    },
    onError: (error: any) => {
      toastError("Oops!", error.response?.data?.error?.message);
    },
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
    onError: (error: any) => {
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
