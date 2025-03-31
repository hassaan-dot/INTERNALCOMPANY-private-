import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../services/toast-messages";

const handleGetAllInvoices = async () => {
  const res = await api.get("/invoices?populate=*");
  return res.data;
};

const handleCreatePOInvoice = async (data: any) => {
  console.log("data2", data);
  const res = await api.post("/invoices", data);

  return res.data;
};

const handleDeletePOInvoice = async (data: any) => {
  const res = await api.delete(`/invoices/${data.data.documentId}`);
  return res.data;
};

const handleUpdatePOInvoice = async (data: any, id: string) => {
  const res = await api.put(`/invoices/${id}`, data);
  return res.data;
};
// sko38f7f6mv0gi1havb75f7f
const handleGetOnePOInvoice = async (documentId: string) => {
  const res = await api.get(`/invoices/${documentId}?populate=*`);
  return res.data;
};

export const useGetInvoice = () => {
  return useQuery({
    queryKey: ["invoice"],
    queryFn: () => handleGetAllInvoices(),
  });
};

export const useCreateInvoice = () => {
  const { setisInvoicePoModalOpen } = useModalStore();

  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["createinvoice"],
    mutationFn: (data: any) => handleCreatePOInvoice(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Invoice has been Added successfully");
      setisInvoicePoModalOpen(false);
      queryPO.invalidateQueries({
        queryKey: ["getonePO"],
        type: "active",
      });
      queryPO.invalidateQueries({
        queryKey: ["invoice"],
        type: "active",
      });
    },
    onError: (error) => {
      toastError("Failed!", error.message);
    },
  });
};
export const useDeleteInvoice = () => {
  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["deleteInvoice"],
    mutationFn: (data: any) => handleDeletePOInvoice(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Invoice has been Deleted successfully");

      queryPO.invalidateQueries({
        queryKey: ["getonePO"],
        type: "active",
      });
      queryPO.invalidateQueries({
        queryKey: ["invoice"],
        type: "active",
      });
    },
    onError: (error) => {
      toastError("Failed!", error.message);
    },
  });
};
