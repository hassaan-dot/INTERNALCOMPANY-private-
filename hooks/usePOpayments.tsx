import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../services/toast-messages";

const handleGetAllInvoices = async (id_based_filter?: string) => {
  let url = "/invoices?populate=*&";

  if (id_based_filter) {
    url = url + id_based_filter;
  }
  const res = await api.get(url);
  return res.data;
};

const handleCreatePOInvoice = async (data: any) => {
  const res = await api.post("/invoices", data);

  return res.data;
};

const handleDeletePOInvoice = async (id: any) => {
  const res = await api.delete(`/invoices/${id}`);
  return res.data;
};

const handleUpdateInvoice = async (data: any, documentId: any) => {
  const res = await api.put(`/invoices/${documentId}`, data);
  return res.data;
};

const handleGetOneInvoice = async (documentId: string) => {
  const res = await api.get(`/invoices/${documentId}?populate=*`);
  return res.data;
};

export const useGetInvoice = (id?: string) => {
  const id_based_filter = id
    ? `filters[purchase_order][client][documentId][$eq]=${id}`
    : undefined;
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => handleGetAllInvoices(id_based_filter),
  });
};

export const useCreateInvoice = () => {
  const { setisInvoicePoModalOpen, setRowData } = useModalStore();

  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["createinvoice"],
    mutationFn: (data: any) => handleCreatePOInvoice(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Invoice has been Added successfully");
      setisInvoicePoModalOpen(false);
      setRowData(null);
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
export const useUpdateInvoice = () => {
  const { setisInvoicePoModalOpen, setRowData } = useModalStore();

  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["udpateInvoice"],
    mutationFn: ({ data, documentId }: any) =>
      handleUpdateInvoice(data, documentId),
    onSuccess: (data) => {
      toastSuccess("Success!", "Invoice Update successfully");
      setisInvoicePoModalOpen(false);
      setRowData(null);
      queryPO.invalidateQueries({
        queryKey: ["invoice"],
        type: "active",
      });
      queryPO.invalidateQueries({
        queryKey: ["getonePO"],
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
    mutationFn: (id: any) => handleDeletePOInvoice(id),
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
export const useGetOneInvoice = (documentId: any) => {
  return useQuery({
    queryKey: ["getonePo"],
    queryFn: () => handleGetOneInvoice(documentId),
  });
};
