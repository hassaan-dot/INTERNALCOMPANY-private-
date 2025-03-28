import {
  useCreateClient,
  useDeleteClient,
  useGetClient,
  useGetOneClient,
  useUpdateClient,
} from "@/hooks/useClient";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { CompanyTable, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { columns_schema } from "./_schema";
import { styles } from "./styles";

import { useModalStore } from "@/store/useModalStore";
import { useGetOneRequest } from "@/hooks/useRequest";

const ClientManagement: React.FC<{ route: any }> = ({ route }) => {
  const { isClientModalOpen, setIsClientModalOpen, setRowData, rowData } =
    useModalStore();

  const [ReminderModalOpen, setReminderModalOpen] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  const { data, isPending, error } = useGetClient();

  const { mutate: handleAdd } = useCreateClient();
  const { mutate: handleUpdate } = useUpdateClient();
  const { mutate: handleDelete } = useDeleteClient();

  const onPressUpdatefunction = ({
    company_name,
    email,
    contact_person_name,
    phone_number,
    documentId,
  }: any) => {
    if (!documentId) return;

    const data = {
      data: {
        company_name: company_name,
        email: email,
        contact_person_name: contact_person_name,
        phone_number: phone_number,
      },
    };
    handleUpdate({ data, id: documentId });
  };

  const onPressAddfunction = ({
    company_name,
    email,
    contact_person_name,
    phone_number,
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
      },
    };

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
  }: any) => {
    const data = {
      company_name,
      email,
      contact_person_name,
      phone_number,
      documentId,
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
    console.log("deleted itwem is", documentId);
    handleDelete(data);
  };
  const onOpenModal = () => {
    setIsClientModalOpen(true);
  };

  const onCloseModal = () => {
    setIsClientModalOpen(false);
    setRowData(null);
  };

  function onCancelfunction2() {
    setReminderModalOpen(false);
  }
  // const { mutate: handleGetOne } = useGetOneClient();
  //
  const onClickEye = ({ contact_person_name, documentId }: any) => {
    // const data = {
    //   data: {
    //     contact_person_name,
    //   },
    // };
    // setRowData({ contact_person_name, documentId });
    // handleGetOne({ data, documentId });
    router.push(
      `/(app)/client-management/client-details?username=${contact_person_name}&id=${documentId}`
    );
    // router.push(`/(app)/request/request-details?username=${username}&id=${id}`);
  };
  function onPressfunction2() {
    setReminderModalOpen(false);
    navigation.navigate("client-details");
  }
  // console.log('setdata is',Data)
  return (
    <>
      <ScrollView style={styles.container}>
        <ScreenHeader
          create={true}
          title={"Client Management"}
          onPress={onOpenModal}
        ></ScreenHeader>

        <View>
          <CompanyTable
            onPressDelete={onPressDelete}
            onPressUpdate={onPressEdit}
            columns_schema={columns_schema}
            checkbox={true}
            showActions={true}
            showEye={true}
            onClickEye={onClickEye}
            pagination={true}
            DATA={data}
          ></CompanyTable>
        </View>
      </ScrollView>

      {isClientModalOpen && (
        <CreateModal
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
        />
      )}

      {/* <CreateModal
        onClose={onCancelfunction2}
        onSubmit={onPressfunction2}
        First="Contact person name"
        Second="Email Address"
        Third="Phone number"
        Fourth="Company name"
        Fifth="Amount"
        Sixth="Amount"
        seventh="Amount"
        desc={true}
        desctext="Add client payment details"
        visible={ReminderModalOpen}
      ></CreateModal> */}
    </>
  );
};

export default ClientManagement;
