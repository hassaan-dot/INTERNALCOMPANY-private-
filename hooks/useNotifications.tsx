import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const fetchNotifications = async () => {
    const res = await api.get("/notifications");
    return res.data;
};

export const useNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
    });
}; 