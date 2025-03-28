import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleCreateNote = async (data: any) => {
  try {
    const res = await api.post("/po-notes", data);

    return res.data;
  } catch (error) {
    console.log("method errro", error);
  }
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
        queryKey: ["getoneRequest"],
        type: "active",
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
