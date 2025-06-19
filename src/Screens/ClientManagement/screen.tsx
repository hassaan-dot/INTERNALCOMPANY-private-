import {
  useCreateClient,
  useDeleteClient,
  useGetClient,
  useUpdateClient,
} from "@/hooks/useClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  CompanyTable,
  CreatePaymentReminderClient,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useModalStore } from "@/store/useModalStore";
import CreateClientModal from "../../Components/Modals/createModal/component";
import ConfirmModal from "@/src/Components/ConfirmationModal/ConfirmModal";
import { useTranslation } from "react-i18next";
import { useSchemas } from "@/hooks/useSchemas";

const ClientManagement: React.FC = () => {
  const { t } = useTranslation();
  const { columns_schema } = useSchemas();

  const {
    isClientModalOpen,
    setIsClientModalOpen,
    setRowData,
    rowData,
    isClientPaymentReminderModalOpen,
    setisClientPaymentReminderModalOpen,
  } = useModalStore();

  const router = useRouter();
  const { data, refetch } = useGetClient();
  useRefreshOnFocus(refetch);

  const { mutate: handleAdd, isPending: isAdding } = useCreateClient();
  const { mutate: handleUpdate, isPending: isUpdating } = useUpdateClient();
  const { mutate: handleDelete } = useDeleteClient();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const onPressUpdatefunction = (formData: any) => {
    if (!formData?.documentId) return;
    const data = {
      company_name: formData.company_name,
      email: formData.email,
      contact_person_name: formData.contact_person_name,
      phone_number: formData.phone_number,
      address: formData.address,
      location: {
        connect: [formData.location]
      }
    };
    handleUpdate({ data, id: formData.documentId });
  };

  const onPressAddfunction = (formData: any) => {
    const data = {
      company_name: formData.company_name,
      email: formData.email,
      contact_person_name: formData.contact_person_name,
      phone_number: formData.phone_number,
      address: formData.address,
      location: {
        connect: [formData.location]
      }
    };
    handleAdd(data);
  };

  const handleSubmit = (formData: any) => {
    if (rowData?.isEdit) onPressUpdatefunction(formData);
    else onPressAddfunction(formData);
  };

  const onPressEdit = (item: any) => {
    const data = {
      ...item,
      location: item?.location?.documentId,
      location_name: item?.location?.location_name,
      isEdit: true,
    };
    setRowData(data);
    setIsClientModalOpen(true);
  };

  const onPressDelete = (documentId: string) => {
    setSelectedClientId(documentId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedClientId) {
      const data = { data: { documentId: selectedClientId } };
      handleDelete(data);
      setShowConfirmModal(false);
      setSelectedClientId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedClientId(null);
  };

  const onOpenModal = () => setIsClientModalOpen(true);
  const onCloseModal = () => {
    setIsClientModalOpen(false);
    setRowData(null);
  };

  const onClickEye = ({ documentId }: any) => {
    router.push(`/(app)/client-management/client-details?id=${documentId}`);
  };

  const onClickDocfunction = (item: any) => {
    setRowData(item);
    setisClientPaymentReminderModalOpen(true);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ScreenHeader
          create={true}
          title={t("client_management.title")}
          onPress={onOpenModal}
          filter={true}
        />
        <CompanyTable
          onPressDelete={onPressDelete}
          onPressUpdate={onPressEdit}
          onClickDoc={onClickDocfunction}
          columns_schema={columns_schema}
          checkbox
          showActions
          showEye
          onClickEye={onClickEye}
          pagination
          DATA={data}
          showEdit
          showDel
          showDocument
        />
      </ScrollView>

      {isClientPaymentReminderModalOpen && (
        <CreatePaymentReminderClient
          onClose={() => {
            setRowData(null);
            setisClientPaymentReminderModalOpen(false);
          }}
          onSubmit={handleSubmit}
          desc
          desctext={t("client_management.payment_reminder_desc")}
          create
          visible={isClientPaymentReminderModalOpen}
          title={t("client_management.send_payment_reminder")}
        />
      )}

      {isClientModalOpen && (
        <CreateClientModal
          onClose={onCloseModal}
          onSubmit={handleSubmit}
          First={t("client_management.contact_person")}
          Second={t("client_management.email")}
          Third={t("client_management.phone")}
          Fourth={t("client_management.company_name")}
          desc
          desctext={t("client_management.create_client_desc")}
          create
          visible={isClientModalOpen}
          title={t("client_management.create_client")}
          isPending={isAdding || isUpdating}
        />
      )}

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title={t("confirmation.title")}
        message={t("confirmation.delete_client")}
        confirmText={t("confirmation.confirm")}
        cancelText={t("confirmation.cancel")}
      />
    </>
  );
};

export default ClientManagement;
