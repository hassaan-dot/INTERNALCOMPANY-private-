import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const handleGetAllDepartments = async () => {
  const res = await api.get("/departments");
  return res.data;
};

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: () => handleGetAllDepartments(),
  });
};
