import {
  useCreateClient,
  useDeleteClient,
  useGetClient,
  useUpdateClient,
} from "@/hooks/useClient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  CompanyTable,
  CreatePaymentReminderClient,
  ScreenHeader,
} from "../../Components";
import { columns_schema } from "./_schema";
import { styles } from "./styles";

import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useModalStore } from "@/store/useModalStore";
import CreateClientModal from "../../Components/Modals/createModal/component";

const ClientManagement: React.FC<{ route: any }> = ({ route }) => {
  const {
    isClientModalOpen,
    setIsClientModalOpen,
    setRowData,
    rowData,
    isClientPaymentReminderModalOpen,
    setisClientPaymentReminderModalOpen,
  } = useModalStore();

  const router = useRouter();

  const { data, isPending, error, refetch } = useGetClient();

  useRefreshOnFocus(refetch);

  const { mutate: handleAdd, isPending: isAdding } = useCreateClient();
  const { mutate: handleUpdate, isPending: isUpdating } = useUpdateClient();
  const { mutate: handleDelete } = useDeleteClient();

  const onPressUpdatefunction = ({
    company_name,
    email,
    contact_person_name,
    phone_number,
    documentId,
    address,
    location,
  }: any) => {
    if (!documentId) return;

    const data = {
      data: {
        company_name: company_name,
        email: email,
        contact_person_name: contact_person_name,
        phone_number: phone_number,
        address,
        location,
      },
    };
    handleUpdate({ data, id: documentId });
  };

  const onPressAddfunction = ({
    company_name,
    email,
    contact_person_name,
    phone_number,
    address,
    location,
  }: any) => {
    if (!company_name) return;
    if (!email) return;
    if (!contact_person_name) return;

    const data = {
      data: {
        company_name: company_name,
        email: email,
        contact_person_name: contact_person_name,
        phone_number: phone_number,
        address,
        location,
      },
    };
    console.log("Data is from client", data);
    handleAdd(data);
  };

  const handleSubmit = (formData: any) => {
    if (rowData?.isEdit) onPressUpdatefunction(formData);
    else onPressAddfunction(formData);
  };

  const onPressEdit = ({
    company_name,
    email,
    contact_person_name,
    phone_number,
    documentId,
    address,
    location,
  }: any) => {
    const data = {
      company_name,
      email,
      contact_person_name,
      phone_number,
      documentId,
      address,
      location: location?.documentId,
      location_name: location?.location_name,
      isEdit: true,
    };
    setRowData(data);
    setIsClientModalOpen(true);
  };
  const onPressDelete = (documentId: string) => {
    const data = {
      data: {
        documentId: documentId,
      },
    };
    handleDelete(data);
  };
  const onOpenModal = () => {
    setIsClientModalOpen(true);
  };

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
          title={"Client Management"}
          onPress={onOpenModal}
          filter={true}
        />

        <View>
          <CompanyTable
            onPressDelete={onPressDelete}
            onPressUpdate={onPressEdit}
            onClickDoc={onClickDocfunction}
            columns_schema={columns_schema}
            checkbox={true}
            showActions={true}
            showEye={true}
            onClickEye={onClickEye}
            pagination={true}
            DATA={data}
            showEdit={true}
            showDel={true}
            showDocument={true}
          />
        </View>
      </ScrollView>

      {isClientPaymentReminderModalOpen && (
        <CreatePaymentReminderClient
          onClose={() => {
            setRowData(null);
            setisClientPaymentReminderModalOpen(false);
          }}
          onSubmit={handleSubmit}
          desc={true}
          desctext="Add your new payment details"
          create={true}
          visible={isClientPaymentReminderModalOpen}
          title={"Send Payment Reminder"}
        />
      )}

      {isClientModalOpen && (
        <CreateClientModal
          onClose={onCloseModal}
          onSubmit={handleSubmit}
          First="Contact person name"
          Second="Email Address"
          Third="Phone number"
          Fourth="Company name"
          desc={true}
          desctext="Add your new client details"
          create={true}
          visible={isClientModalOpen}
          title={"Create Client"}
          isPending={isAdding || isUpdating}
        />
      )}
    </>
  );
};

export default ClientManagement;
