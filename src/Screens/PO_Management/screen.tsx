import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useDeletePO, useGetPO } from "@/hooks/usePO";
import { ROLE } from "@/constants/role";
import { DEPARTMENT } from "@/constants/department";
import { CompanyTable, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { Po_Schema } from "../ClientManagement/_schema";
import Styles from "./styles";
import ConfirmModal from "@/src/Components/ConfirmationModal/ConfirmModal";
import { useTranslation } from "react-i18next";

const PO_Management = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPOId, setSelectedPOId] = useState<string | null>(null);
  const { setRowData, rowData } = useModalStore();

  const { data, refetch } = useGetPO();
  useRefreshOnFocus(refetch);

  const { mutate: deletePO } = useDeletePO();

  const handleNavigateToDetails = (documentId: string) => {
    router.push(`/(app)/po-management/po-details?id=${documentId}`);
  };

  const handleNavigateToAdd = () => {
    router.push(`/(app)/po-management/po-add`);
  };

  const handleDelete = (documentId: string) => {
    setSelectedPOId(documentId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedPOId) {
      deletePO({ data: { documentId: selectedPOId } });
      setShowConfirmModal(false);
      setSelectedPOId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedPOId(null);
  };

  const onPressEdit = ({ po_name, client, po_notes, documentId }: any) => {
    const data = {
      po_name,
      client,
      po_notes,
      documentId,
      isEdit: true,
    };
    setRowData(data);
    handleNavigateToAdd();
  };

  const shouldShowButton =
    (user?.role?.name === ROLE.EMPLOYEE && user.department.name === DEPARTMENT.SALES) ||
    user?.role?.name === ROLE.ADMIN;

  return (
    <View style={Styles.container}>
      <ScreenHeader
        create={true}
        filter={true}
        title={t("po.title")}
        onPress={handleNavigateToAdd}
        showButton={shouldShowButton}
      />

      <CompanyTable
        columns_schema={Po_Schema}
        checkbox={true}
        showActions={true}
        showEye={true}
        showDel={true}
        showEdit={true}
        isPO={true}
        showStatus={true}
        DATA={data}
        pagination={true}
        onPressUpdate={onPressEdit}
        onPressDelete={(docId: string) => handleDelete(docId)}
        onClickEye={({ documentId }) =>
          documentId && handleNavigateToDetails(documentId)
        }
      />

      <CreateModal
        create={true}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmModal
        visible={showConfirmModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title={t("confirmation.title")}
        message={t("confirmation.po")}
        confirmText={t("confirmation.confirm")}
        cancelText={t("confirmation.cancel")}
      />
    </View>
  );
};

export default PO_Management;
