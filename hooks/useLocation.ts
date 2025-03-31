import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const handleGetLocations = async () => {
  const res = await api.get("/locations?pagination[pageSize]=10000");
  return res.data;
};

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => handleGetLocations(),
  });
};
