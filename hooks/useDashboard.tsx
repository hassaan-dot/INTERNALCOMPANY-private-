import api from "@/services/axios";
import { toastError, toastSuccess } from "@/services/toast-messages";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

const handleCreateNews = async (data: any) => {
  const res = await api.post("/news-alerts", data);
  return res.data;
};

const handleDeleteNews = async (id: string) => {
  const res = await api.delete(`/news-alerts/${id}`);
  return res.data;
};

const handleGetNews = async () => {
  const res = await api.get("/news-alerts?populate=*");
  return res.data;
};

const handleGetDashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};

export const useGetDashboardStats = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["dashboard-stats", user?.documentId],
    queryFn: () => handleGetDashboardStats(),
  });
};

export const useGetNews = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["news-alerts", user?.documentId],
    queryFn: () => handleGetNews(),
  });
};

export const useCreateNews = () => {
  const { setIsNewsModalOpen } = useModalStore();
  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["createNews"],
    mutationFn: (data: any) => handleCreateNews(data),
    onSuccess: (data) => {
      setIsNewsModalOpen(false);
      queryPO.invalidateQueries({
        queryKey: ["news-alerts"],
        type: "active",
      });
      toastSuccess("Success!", "News added successfully");
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};

export const useDeleteNews = () => {
  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["deleteNews"],
    mutationFn: (id: any) => handleDeleteNews(id),
    onSuccess: (data) => {
      queryPO.invalidateQueries({
        queryKey: ["news-alerts"],
        type: "active",
      });
      toastSuccess("Success!", "News deleted successfully");
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};
