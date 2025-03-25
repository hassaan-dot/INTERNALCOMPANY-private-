import {
  useCreateClient,
  useGetClient,
  useUpdateClient,
} from "@/hooks/useClient";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { CompanyTable, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { columns_schema } from "./_schema";
import { styles } from "./styles";

import { useModalStore } from "@/store/useModalStore";

const ClientManagement: React.FC<{ route: any }> = ({ route }) => {
  const { isClientModalOpen, setIsClientModalOpen } = useModalStore();

  const [ReminderModalOpen, setReminderModalOpen] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const [Data, setData] = useState("");
  const { data, isPending, error } = useGetClient();
  const { mutate: handleAdd } = useCreateClient();
  const { mutate: handleUpdate } = useUpdateClient();

  const onPressUpdatefunction = (
    company_name: string,
    email: string,
    contact_person_name: string,
  ) => {
    if (!company_name) return;
    if (!email) return;
    if (!contact_person_name) return;

    const data = {
      data: {
        company_name: company_name,
        email: email,
        contact_person_name: contact_person_name,
        phone_number: 1111,
      },
    };
    handleUpdate(data);
  };
  const onPressfunction = (
    company_name: string,
    email: string,
    contact_person_name: string,
    phone_number: number
  ) => {
    if (!company_name) return;
    if (!email) return;
    if (!contact_person_name) return;

    const data = {
      data: {
        company_name: company_name,
        email: email,
        contact_person_name: contact_person_name,
        phone_number: 1111,
      },
    };

    handleAdd(data);
  };

  const onOpenModal = () => {
    setIsClientModalOpen(true);
  };

  const onCloseModal = () => {
    setIsClientModalOpen(false);
  };

  function onCancelfunction2() {
    setReminderModalOpen(false);
  }

  const onClickEye = (username: string, id: number) => {
    router.push(
      `/(app)/client-management/client-details?username=${username}&id=${id}`
    );
  };
  function onPressfunction2() {
    setReminderModalOpen(false);
    navigation.navigate("client-details");
  }

  const onPressUpdate = (
    company_name: string,
    email: string,
    contact_person_name: string,
    phone_number: any
  ) => {
    const data = {
      data: {
        company_name,
        email,
        contact_person_name,
        phone_number,
      },
    };
    if (data) {
      setData(data);
    }

    if (Data) {
      setIsClientModalOpen(true);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <ScreenHeader
          create={true}
          title={"Client Management"}
          onPress={onOpenModal}
        ></ScreenHeader>

        <View>
          <CompanyTable
            onPressUpdate={onPressUpdate}
            columns_schema={columns_schema}
            checkbox={true}
            showActions={true}
            showEye={false}
            onClickEye={onClickEye}
            pagination={true}
            DATA={data}
          ></CompanyTable>
        </View>
      </View>

      <CreateModal
        onClose={onCloseModal}
        onPressUpdatefunction={onPressUpdatefunction}
        onSubmit={onPressfunction}
        Data={Data}
        First="Contact person name"
        Second="Email Address"
        Third="Phone number"
        Fourth="Company name"
        desc={true}
        desctext="Add your new client details"
        create={true}
        visible={isClientModalOpen}
        title={"Create Client"}
      ></CreateModal>

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
