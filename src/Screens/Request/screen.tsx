// Request.tsx
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { CompanyTable, ScreenHeader } from "../../Components";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import {
  useCreateRequest,
  useDeleteRequest,
  useGetRequest,
  useUpdateRequest,
} from "@/hooks/useRequest";
import { formatDateForAPI } from "@/services/dateFormatter";
import CreateRequestModal from "@/src/Components/Modals/createRequestModal/component";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "expo-router";
import { Requests_columns_schema } from "../ClientManagement/_schema";
import { styles } from "./styles";
import { formatDate } from "@/src/utils";
import ConfirmModal from "@/src/Components/ConfirmationModal/ConfirmModal";

const Request = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, refetch } = useGetRequest();
  useRefreshOnFocus(refetch);

  const requestData = useMemo(() => {
    return {
      data: data?.data?.map((item: any) => ({
        ...item,
        perform_on: formatDate(item?.perform_on),
      })),
      meta: data?.meta,
    };
  }, [data]);

  const { mutate: handleAdd } = useCreateRequest();
  const { mutate: handleDelete } = useDeleteRequest();
  const { mutate: handleUpdate } = useUpdateRequest();

  const { setIsRequestModalOpen, isRequestModalOpen, setRowData, rowData } = useModalStore();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const onPressUpdatefunction = ({
    title,
    description,
    perform_on,
    standing,
    users,
    documentId,
    request_status,
  }: any) => {
    const data = {
      data: {
        title,
        description,
        perform_on: new Date(perform_on),
        standing,
        users,
        request_status,
      },
    };
    handleUpdate({ data, id: documentId });
  };

  const onPressAddfunction = ({
    title,
    description,
    perform_on,
    standing,
    users,
    request_status,
  }: any) => {
    const data = {
      data: {
        title,
        description,
        perform_on: formatDateForAPI(perform_on),
        standing,
        users,
        request_status,
      },
    };
    handleAdd(data);
  };

  const onPressEdit = ({
    title,
    description,
    perform_on,
    standing,
    users,
    documentId,
    request_status,
  }: any) => {
    const data = {
      title,
      description,
      perform_on,
      standing,
      users: users?.map((u: any) => u.documentId),
      userSelection: users?.map((u: any) => ({
        key: u.documentId,
        label: `${u.first_name}${u.last_name}`,
      })),
      documentId,
      request_status,
      isEdit: true,
    };
    setRowData(data);
    setIsRequestModalOpen(true);
  };

  const onPressDelete = (documentId: string) => {
    setSelectedRequestId(documentId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedRequestId) {
      const data = {
        data: {
          documentId: selectedRequestId,
        },
      };
      handleDelete(data);
      setShowConfirmModal(false);
      setSelectedRequestId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedRequestId(null);
  };

  const handleSubmit = (formData: any) => {
    if (rowData?.isEdit) onPressUpdatefunction(formData);
    else onPressAddfunction(formData);
  };

  const onOpenModal = () => {
    setIsRequestModalOpen(true);
    setRowData(null);
  };

  const onCloseModal = () => {
    setIsRequestModalOpen(false);
    setRowData(null);
  };

  const onClickEye = ({ documentId }: any) => {
    router.push(`/(app)/request/request-details?id=${documentId}`);
  };

  return (
    <>
      <View style={styles.container}>
        <ScreenHeader
          create={true}
          title={t("request.title")}
          onPress={onOpenModal}
          filter={true}
        />

        <CompanyTable
          columns_schema={Requests_columns_schema}
          checkbox={true}
          onPressUpdate={onPressEdit}
          onPressDelete={onPressDelete}
          DATA={requestData}
          showActions={true}
          pagination={true}
          showEye={true}
          showDel={true}
          showEdit={true}
          showStatus={true}
          showDocument={false}
          onClickEye={onClickEye}
        />
      </View>

      {isRequestModalOpen && (
        <CreateRequestModal
          onSubmit={handleSubmit}
          onClose={onCloseModal}
          desc={true}
          styleContainer={{ flexDirection: "row" }}
          create={true}
          visible={isRequestModalOpen}
          user={true}
        />
      )}

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title={t("confirmation.title")}
        message={t("confirmation.delete_request")}
        confirmText={t("confirmation.confirm")}
        cancelText={t("confirmation.cancel")}
      />
    </>
  );
};

export default Request;
