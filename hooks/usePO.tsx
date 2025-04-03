import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { toastError, toastSuccess } from "../services/toast-messages";

const handleGetAllPO = async (filters: any) => {
  // const res = await api.get(
  //   `/purchase-orders?populate[0]=invoices&populate[1]=po_notes&populate[2]=po_notes.user&populate[3]=po_items&populate[4]=location&populate[5]=po_documents&pagination[page]=${filters.page}&pagination[pageSize]=${filters.pageSize}`
  // );

  const res = await api.get(`/purchase-orders?populate[7]=po_created_by`);
  return res.data;
};

const handleCreatePO = async (data: any) => {
  const res = await api.post("/purchase-orders", data);
  return res.data;
};

const handleDeletePO = async (data: any) => {
  const res = await api.delete(`/purchase-orders/${data.data.documentId}`);
  return res.data;
};

const handleUpdatePO = async (data: any, id: string) => {
  const res = await api.put(`/purchase-orders/${id}`, data);
  return res.data;
};

const handleGetOnePO = async (documentId: string) => {
  const res = await api.get(
    `/purchase-orders/${documentId}?populate[0]=invoices&populate[1]=po_notes&populate[2]=po_notes.user&populate[3]=po_items&populate[4]=location&populate[5]=po_documents`
  );
  return res.data;
};

export const useGetPO = () => {
  const { filters } = useModalStore();
  return useQuery({
    queryKey: ["po"],
    queryFn: () => handleGetAllPO(filters),
  });
};

export const useCreatePO = (setFormData: any) => {
  const { setRowData } = useModalStore();
  const queryPO = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ["createpo"],
    mutationFn: (data: any) => handleCreatePO(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Your PO is create successfully");
      router.back();

      queryPO.invalidateQueries({
        queryKey: ["po"],
      });
    },
    onError: (error) => {
      toastError("Oops!", error.message);
    },
  });
};

export const useGetOnePO = (document_id: string) => {
  return useQuery({
    queryKey: ["getonePO", document_id],
    queryFn: () => handleGetOnePO(document_id),
  });
};

export const useUpdatePO = () => {
  const { setRowData } = useModalStore();
  const queryPO = useQueryClient();

  return useMutation({
    mutationKey: ["updatePO"],
    mutationFn: ({ data, id }: any) => handleUpdatePO(data, id),
    onSuccess: (data) => {
      setRowData(null);
      queryPO.invalidateQueries({
        queryKey: ["po"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useDeletePO = () => {
  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["deletePO"],
    mutationFn: (data: any) => handleDeletePO(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Your PO has beem Deleted successfully");

      queryPO.invalidateQueries({
        queryKey: ["po"],
      });
    },
    onError: (error) => {
      toastError("Oops!", error.message);
    },
  });
};
