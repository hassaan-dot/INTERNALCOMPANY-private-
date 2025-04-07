import api from "@/services/axios";
import { toastError, toastSuccess } from "@/services/toast-messages";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleCreateNote = async (data: any) => {
  const res = await api.post("/po-notes", data);
  return res.data;
};

export const useCreateNote = () => {
  const { setIsNoteModalOpen } = useModalStore();
  const queryPO = useQueryClient();
  return useMutation({
    mutationKey: ["createnote"],
    mutationFn: (data: any) => handleCreateNote(data),
    onSuccess: (data) => {
      setIsNoteModalOpen(false);
      queryPO.invalidateQueries({
        queryKey: ["getonePO"],
        type: "active",
      });
      toastSuccess("Success!", "Note added successfully");
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });
};
