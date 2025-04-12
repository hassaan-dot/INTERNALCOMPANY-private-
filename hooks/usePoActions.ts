import api from "@/services/axios";
import { toastError, toastSuccess } from "@/services/toast-messages";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleAcceptPO = async (id: string) => {
  const res = await api.post(`/purchase-orders/${id}/accept`);
  return res.data;
};

const handleRejectPO = async (id: string) => {
  const res = await api.post(`/purchase-orders/${id}/reject`);
  return res.data;
};

const handleClosePO = async (id: string) => {
  const res = await api.post(`/purchase-orders/${id}/close`);
  return res.data;
};

const handleConfirmPO = async (data: any, id: string) => {
  const res = await api.post(`/purchase-orders/${id}/confirm-receiving`, data);
  return res.data;
};

const handleSendConfirmCode = async (id: string) => {
  const res = await api.post(`/purchase-orders/${id}/send-confirmation`);
  return res.data;
};

const handleAssignPO = async (users: any, id: string) => {
  console.log("users", users);
  const res = await api.post(`/purchase-orders/${id}/assign`, users);
  return res.data;
};

const handleChangePOStatus = async (data: any, id: string) => {
  const res = await api.post(`/purchase-orders/${id}/change-status`, data);
  return res.data;
};

export const usePOActions = (id: string) => {
  const queryPO = useQueryClient();
  const {
    setIsStatusModalOpen,
    setisAssignEmployeeModalOpen,
    setConfirmRecievingModalOpen,
  } = useModalStore();

  const { mutate: handleAccept, isPending: isAccepting } = useMutation({
    mutationKey: ["accept-po", id],
    mutationFn: () => handleAcceptPO(id),
    onSuccess: (data) => {
      toastSuccess("Success!", "PO Accepted Successfully");

      queryPO.invalidateQueries({
        queryKey: ["getonePO", id],
        type: "active",
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });

  const { mutate: handleReject, isPending: isRejecting } = useMutation({
    mutationKey: ["reject-po", id],
    mutationFn: () => handleRejectPO(id),
    onSuccess: (data) => {
      toastSuccess("Success!", "PO Rejected Successfully");
      queryPO.invalidateQueries({
        queryKey: ["getonePO", id],
        type: "active",
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });

  const { mutate: handlePOClose, isPending: isClosing } = useMutation({
    mutationKey: ["close-po", id],
    mutationFn: () => handleClosePO(id),
    onSuccess: (data) => {
      toastSuccess("Success!", "PO Closed Successfully");
      queryPO.invalidateQueries({
        queryKey: ["getonePO", id],
        type: "active",
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });

  const { mutate: handleConfirmRecieving, isPending: isConfirming } =
    useMutation({
      mutationKey: ["confirm-po", id],
      mutationFn: (data: any) => handleConfirmPO(data, id),
      onSuccess: (data) => {
        setConfirmRecievingModalOpen(false);
        toastSuccess("Success!", "PO Confirmed Successfully");
        queryPO.invalidateQueries({
          queryKey: ["getonePO", id],
          type: "active",
        });
      },
      onError: (error: any) => {
        toastError("Oops!", error?.response?.data?.error?.message);
      },
    });

  const { mutate: handleSendCode, isPending: isSendingCode } = useMutation({
    mutationKey: ["send-confirm-code", id],
    mutationFn: () => handleSendConfirmCode(id),
    onSuccess: (data) => {
      toastSuccess("Success!", "Code Sent To Client Successfully");
      // queryPO.invalidateQueries({
      //   queryKey: ["getonePO", id],
      //   type: "active",
      // });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });

  const { mutate: handlePOAssign, isPending: isAssigning } = useMutation({
    mutationKey: ["assign-po", id],
    mutationFn: ({ users }: any) => handleAssignPO(users, id),
    onSuccess: (data) => {
      toastSuccess("Success!", "PO Assigned Successfully");
      setisAssignEmployeeModalOpen(false);
      queryPO.invalidateQueries({
        queryKey: ["getonePO", id],
        type: "active",
      });
    },
    onError: (error: any) => {
      toastError("Oops!", error?.response?.data?.error?.message);
    },
  });

  const { mutate: handleChangeStatus, isPending: isChangingStatus } =
    useMutation({
      mutationKey: ["change-po-status", id],
      mutationFn: (data: any) => handleChangePOStatus(data, id),
      onSuccess: (data) => {
        toastSuccess("Success!", "PO Status Changed Successfully");
        setIsStatusModalOpen(false);
        queryPO.invalidateQueries({
          queryKey: ["getonePO", id],
          type: "active",
        });
      },
      onError: (error: any) => {
        toastError("Oops!", error?.response?.data?.error?.message);
      },
    });

  return {
    handleAccept,
    isAccepting,
    handleReject,
    isRejecting,
    handlePOClose,
    isClosing,
    handleConfirmRecieving,
    isConfirming,
    handleSendCode,
    isSendingCode,
    handlePOAssign,
    isAssigning,
    handleChangeStatus,
    isChangingStatus,
  };
};
