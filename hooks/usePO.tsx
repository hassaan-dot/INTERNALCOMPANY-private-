import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { createIconSetFromFontello } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const handleGetAllPO = async () => {
  const res = await api.get(
    "/purchase-orders?populate[0]=invoices&populate[1]=po_notes&populate[2]=po_notes.user&populate[3]=po_items&populate[4]=location&populate[5]=po_documents"
  );
  return res.data;
};

const handleCreatePO = async (data: any) => {
  try {
    const res = await api.post("/purchase-orders", data);

    return res.data;
  } catch (error) {
    console.log("method errro", error);
  }
};

const handleDeletePO = async (data: any) => {
  console.log("data is ", data.data.documentId);
  const res = await api.delete(`/purchase-orders/${data.data.documentId}`);
  return res.data;
};

const handleUpdatePO = async (data: any, id: string) => {
  const res = await api.put(`/purchase-orders/${id}`, data);
  return res.data;
};
// sko38f7f6mv0gi1havb75f7f
const handleGetOnePO = async (documentId: string) => {
  console.log("document id", documentId);
  const res = await api.get(
    `/purchase-orders/${documentId}?populate[0]=invoices&populate[1]=po_notes&populate[2]=po_notes.user&populate[3]=po_items&populate[4]=location&populate[5]=po_documents`
  );
  return res.data;
};

export const useGetPO = () => {
  return useQuery({
    queryKey: ["po"],
    queryFn: () => handleGetAllPO(),
  });
};

export const useCreatePO = (setFormData: any) => {
  // const { setIsPOModalOpen, setRowData } = useModalStore();
  const queryPO = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ["createpo"],
    mutationFn: (data: any) => handleCreatePO(data),
    onSuccess: (data) => {
      router.back();
      setFormData(null);
      queryPO.invalidateQueries({
        queryKey: ["po"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useGetOnePO = (document_id: string) => {
  return useQuery({
    queryKey: ["getoneRequest", document_id],
    queryFn: () => handleGetOnePO(document_id),
  });
};

export const useUpdatePO = () => {
  const { setIsPOModalOpen, setRowData } = useModalStore();
  const queryPO = useQueryPO();

  return useMutation({
    mutationKey: ["updatePO"],
    mutationFn: ({ data, id }: any) => handleUpdatePO(data, id),
    onSuccess: (data) => {
      console.log("update informatiom", data);
      setIsPOModalOpen(false);
      setRowData(null);
      queryPO.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useDeletePO = () => {
  const queryPO = useQueryPO();
  return useMutation({
    mutationKey: ["deletePO"],
    mutationFn: (data: any) => handleDeletePO(data),
    onSuccess: (data) => {
      console.log("update informatiom", data);
      queryPO.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
