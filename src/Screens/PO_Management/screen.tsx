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

interface POData {
  documentId?: string;
  id?: number;
  company_name?: string;
  email?: string;
  contact_person_name?: string;
  phone_number?: string;
  po_name?: string;
  contact_name?: string;
  address?: string;
  location?: string;
  note?: string;
}

const PO_Management = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setRowData, rowData } = useModalStore();

  // Data fetching
  const { data, refetch } = useGetPO();
  useRefreshOnFocus(refetch);
  const { mutate: deletePO } = useDeletePO();

  // Navigation handlers
  const handleNavigateToDetails = (documentId: string) => {
    router.push(`/(app)/po-management/po-details?id=${documentId}`);
  };

  const handleNavigateToAdd = () => {
    router.push(`/(app)/po-management/po-add`);
  };

  // Action handlers

  const handleDelete = (documentId: string) => {
    deletePO({ data: { documentId } });
  };
  const onPressEdit = ({
    po_name,
    company_name,
    contact_name,
    email,
    phone_number,
    address,
    location,
    po_notes,
    documentId,
  }: any) => {
    const data = {
      po_name,
      company_name,
      contact_name,
      email,
      phone_number,
      address,
      location,
      po_notes,
      documentId,
      isEdit: true,
    };
    setRowData(data);
    handleNavigateToAdd();
  };
  const shouldShowButton =
    (user?.role?.name === ROLE.EMPLOYEE &&
      user.department.name === DEPARTMENT.SALES) ||
    user?.role?.name === ROLE.ADMIN;

  return (
    <View style={Styles.container}>
      <ScreenHeader
        create={true}
        filter={true}
        title="Purchasing Orders"
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
        onPressDelete={handleDelete}
        onClickEye={({ documentId }) =>
          documentId && handleNavigateToDetails(documentId)
        }
      />

      <CreateModal
        create={true}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </View>
  );
};

export default PO_Management;
