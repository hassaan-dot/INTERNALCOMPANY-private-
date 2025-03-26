import api from "@/services/axios";
import { useModalStore } from "@/store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
const handleGetAllRequest = async () => {
  const res = await api.get("/requests");
  return res.data;
};

const handleGetOneRequest = async (documentId: any) => {
  console.log("Configure", documentId);
  const res = await api.get(`/requests/${documentId}`);
  return res.data;
};

const handleCreateRequest = async (data: any) => {
  console.log("Configure", data);
  const res = await api.post("/requests", data);
  return res.data;
};

const handleDeleteRequest = async (data: any) => {
  console.log("data is ", data.data.documentId);
  const res = await api.delete(`/requests/${data.data.documentId}`);
  return res.data;
};

const handleUpdateRequest = async (data: any, id: any) => {
  const res = await api.put(`/clients/${id}`, data);
  return res.data;
};

export const useGetRequest = () => {
  return useQuery({
    queryKey: ["Requests"],
    queryFn: () => handleGetAllRequest(),
  });
};

export const useCreateRequest = () => {
  const { setIsRequestModalOpen } = useModalStore();
  const queryRequest = useQueryClient();

  return useMutation({
    mutationKey: ["createRequest"],
    mutationFn: (data: any) => handleCreateRequest(data),
    onSuccess: async (data) => {
      setIsRequestModalOpen(false);
      queryRequest.invalidateQueries({
        queryKey: ["Requests"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
export const useGetOneRequest = () => {
  const queryRequest = useQueryClient();
  const { rowData, setRowData } = useModalStore();
  const router = useRouter();
  return useMutation({
    mutationKey: ["getOneRequest"],
    mutationFn: ({ data, documentId }: any) => handleGetOneRequest(documentId),
    onSuccess: (data) => {
      // setIsRequestModalOpen(false);

      console.log("response is", data);
      router.push(
        `/(app)/request/request-details?username=${rowData.contact_person_name}&id=${rowData.documentId}`
      );
      setRowData(null);
      queryRequest.invalidateQueries({
        queryKey: ["Requests"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useUpdateRequest = () => {
  const queryRequest = useQueryClient();
  const { setIsRequestModalOpen } = useModalStore();

  return useMutation({
    mutationKey: ["updateRequest"],
    mutationFn: ({ data, id }: any) => handleUpdateRequest(data, id),
    onSuccess: (data) => {
      console.log("update informatiom", data);
      setIsRequestModalOpen(false);
      queryRequest.invalidateQueries({
        queryKey: ["Requests"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};

export const useDeleteRequest = () => {
  const queryRequest = useQueryClient();
  return useMutation({
    mutationKey: ["deleteRequest"],
    mutationFn: (data: any) => handleDeleteRequest(data),
    onSuccess: (data) => {
      console.log("update informatiom", data);
      queryRequest.invalidateQueries({
        queryKey: ["Requests"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
};
