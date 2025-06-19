import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "../services/toast-messages";

const handleGetAllClient = async (filters: any) => {
  const res = await api.get(
    `/clients?populate=*&pagination[page]=${filters.page}&pagination[pageSize]=${filters.pageSize}&sort=${filters.sort}`
  );
  return res.data;
};

const handleGetClientList = async () => {
  const res = await api.get(
    `/clients?populate=*&pagination[page]=1&pagination[pageSize]=10000`
  );
  return res.data;
};

const handleSendReminder = async (data: any, id: string) => {
  const res = await api.post(`/send-payment-reminder/${id}`, data);
  return res.data;
};

const handleCreateClient = async (data: any) => {
  try {
    const res = await api.post("/clients", data);
    return res.data;
  } catch (error: any) {
    console.error('Client creation error:', error.response?.data);
    throw error;
  }
};

const handleDeleteClient = async (data: any) => {
  const res = await api.delete(`/clients/${data.data.documentId}`);
  return res.data;
};

const handleUpdateClient = async (data: any, id: string) => {
  const res = await api.put(`/clients/${id}`, data);
  return res.data;
};

const handleGetOneClient = async (documentId: string) => {
  const res = await api.get(
    `/clients/${documentId}?populate[0]=purchase_orders.client&populate[1]=purchase_orders.invoices`
  );
  return res.data;
};

export const useGetClient = () => {
  const { filters } = useModalStore();
  return useQuery({
    queryKey: ["clients", filters],
    queryFn: () => handleGetAllClient(filters),
  });
};

export const useGetAllClients = () => {
  return useQuery({
    queryKey: ["all-clients"],
    queryFn: () => handleGetClientList(),
    select: (data) => {
      return data?.data?.map((item: any) => ({
        key: item?.documentId,
        value: `${item?.contact_person_name} (${item?.company_name})`,
      }));
    },
  });
};

export const useSendReminder = (id: string) => {
  const { setisClientPaymentReminderModalOpen, setRowData } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["send-reminder"],
    mutationFn: (data: any) => handleSendReminder(data, id),
    onSuccess: async (data) => {
      toastSuccess("Success!", "Payment Reminder Sent");
      setRowData(null);
      setisClientPaymentReminderModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};

export const useCreateClient = () => {
  const { setIsClientModalOpen, setRowData } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createClient"],
    mutationFn: (data: any) => handleCreateClient(data),
    onSuccess: async (data) => {
      toastSuccess("Success!", "Client Created successfully");
      setIsClientModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};

export const useGetOneClient = (document_id: string) => {
  return useQuery({
    queryKey: ["getoneClient", document_id],
    queryFn: () => handleGetOneClient(document_id),
  });
};

export const useUpdateClient = () => {
  const { setIsClientModalOpen, setRowData } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateClient"],
    mutationFn: ({ data, id }: any) => handleUpdateClient(data, id),
    onSuccess: (data) => {
      toastSuccess("Success!", "Client Updated successfully");

      setIsClientModalOpen(false);
      setRowData(null);
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: (data: any) => handleDeleteClient(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Client deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};
