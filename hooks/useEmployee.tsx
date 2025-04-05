import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const handleGetAllEmployees = async () => {
  const res = await api.get(
    `/user-management/employees?populate[1]=role&populate[0]=department&pagination[page]=1&pagination[pageSize]=100000`
  );
  return res.data;
};

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["Allemployees"],
    queryFn: () => handleGetAllEmployees(),
  });
};
