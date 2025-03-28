import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const handleGetAllItems = async () => {
  const res = await api.get("/po-items?populate=*");
  return res.data;
};

const handleCreatePOItems = async (data: any) => {
  try {
    const res = await api.post("/purchase-orders", data);

    return res.data;
  } catch (error) {
    console.log("method errro", error);
  }
};

const handleDeletePOItems = async (data: any) => {
  console.log("data is ", data.data.documentId);
  const res = await api.delete(`/purchase-orders/${data.data.documentId}`);
  return res.data;
};

const handleUpdatePOItems = async (data: any, id: string) => {
  const res = await api.put(`/purchase-orders/${id}`, data);
  return res.data;
};
// sko38f7f6mv0gi1havb75f7f
const handleGetOnePOItems = async (documentId: string) => {
  console.log("document id", documentId);
  const res = await api.get(`/purchase-orders/${documentId}?populate=*`);
  return res.data;
};

export const useGetItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: () => handleGetAllItems(),
  });
};
