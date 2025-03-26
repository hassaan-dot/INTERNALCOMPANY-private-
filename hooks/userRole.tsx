import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const handleGetAllRoles = async () => {
  const res = await api.get("/users-permissions/roles");
  return res.data;
};

export const useGetuserRole = () => {
  return useQuery({
    queryKey: ["Roles"],
    queryFn: () => handleGetAllRoles(),
  });
};
