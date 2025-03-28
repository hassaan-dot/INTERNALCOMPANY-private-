import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const handleGetAllInvoices = async () => {
  const res = await api.get("/invoices?populate=*");
  return res.data;
};

const handleCreatePOInvoice = async (data: any) => {
  const res = await api.post("/invoices", data);

  return res.data;
};

const handleDeletePOInvoice = async (data: any) => {
  console.log("data is ", data.data.documentId);
  const res = await api.delete(`/purchase-orders/${data.data.documentId}`);
  return res.data;
};

const handleUpdatePOInvoice = async (data: any, id: string) => {
  const res = await api.put(`/purchase-orders/${id}`, data);
  return res.data;
};
// sko38f7f6mv0gi1havb75f7f
const handleGetOnePOInvoice = async (documentId: string) => {
  console.log("document id", documentId);
  const res = await api.get(`/purchase-orders/${documentId}?populate=*`);
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
      setisInvoicePoModalOpen(false);
      queryPO.invalidateQueries({
        queryKey: ["invoice"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

// export const useAddPOInvoice = (setFormData: any) => {
//   // const { setIsPOModalOpen, setRowData } = useModalStore();
//   const queryPO = useQueryClient();
//   const router = useRouter();
//   return useMutation({
//     mutationKey: ["createpoInvoice"],
//     mutationFn: (data: any) => handleCreatePOInvoice(data),
//     onSuccess: (data) => {
//       queryPO.invalidateQueries({
//         queryKey: ["po"],
//       });
//     },
//     onError: (error) => {
//       console.log("error", error);
//     },
//   });
// };
