import api from "@/services/axios";
import { toastError, toastSuccess } from "@/services/toast-messages";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleCreatePOItems = async (data: any) => {
  const res = await api.post("/po-items", data);

  return res.data;
};

const handleUpdatePOItems = async (data: any, id: string) => {
  const res = await api.put(`/po-items/${id}`, data);
  return res.data;
};

const handleDeletePOItems = async (id: string) => {
  const res = await api.delete(`/po-items/${id}`);
  return res.data;
};

export const useCreateItems = () => {
  const { setIsPoItemsModalOpen, setRowData } = useModalStore();

  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["create-items"],
    mutationFn: (data: any) => handleCreatePOItems(data),
    onSuccess: (data) => {
      toastSuccess("Success!", "Item has been Added successfully");
      setIsPoItemsModalOpen(false);
      setRowData(null);
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

export const useUpdateItems = () => {
  const { setIsPoItemsModalOpen, setRowData } = useModalStore();

  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["update-items"],
    mutationFn: ({ data, documentId }: any) =>
      handleUpdatePOItems(data, documentId),
    onSuccess: (data) => {
      toastSuccess("Success!", "Item Update successfully");
      setIsPoItemsModalOpen(false);
      setRowData(null);
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

export const useDeleteItem = () => {
  const queryPO = useQueryClient();

  return useMutation({
    mutationKey: ["delete-items"],
    mutationFn: (id: any) => handleDeletePOItems(id),
    onSuccess: (data) => {
      toastSuccess("Success!", "Invoice has been Deleted successfully");

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
