import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScreenHeader, CompanyTable } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { useNavigation } from "@react-navigation/native";
import { generateData } from "../../utils/Props/TableDataUserManagemenr/props";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { useGetClient } from "@/hooks/useClient";
import { columns_schema } from "./_schema";

const ClientManagement: React.FC<{ route: any }> = ({ route }) => {
  const [AddModalOpen, setAddModalOpen] = useState(false);
  const [ReminderModalOpen, setReminderModalOpen] = useState(false);
  const navigation = useNavigation();
  function CreatClient() {
    setAddModalOpen(true);
  }
  function onPressfunction() {
    setAddModalOpen(false);
    setReminderModalOpen(true);
  }
  function onCancelfunction() {
    setAddModalOpen(false);
    // setReminderModalOpen(true)
  }
  function onCancelfunction2() {
    setReminderModalOpen(false);
    // setReminderModalOpen(true)
  }
  const router = useRouter();
  const onClickEye = (username: string, id: number) => {
    router.push(
      `/(app)/client-management/client-details?username=${username}&id=${id}`
    );
  };
  function onPressfunction2() {
    setReminderModalOpen(false);
    // setReminderModalOpen(true)
    navigation.navigate("client-details");
  }

  const { data, isPending, error } = useGetClient();

  return (
    <>
      <View style={styles.container}>
        <ScreenHeader
          create={true}
          title={"Client Management"}
          onPress={CreatClient}
        ></ScreenHeader>

        <View>
          <CompanyTable
            columns_schema={columns_schema}
            checkbox={true}
            showActions={true}
            showEye={true}
            onClickEye={onClickEye}
            pagination={true}
            DATA={data}
          ></CompanyTable>
        </View>
      </View>
      <CreateModal
        onClose={onCancelfunction}
        onSubmit={onPressfunction}
        First="Contact person name"
        Second="Email Address"
        Third="Phone number"
        Fourth="Company name"
        desc={true}
        desctext="Add your new client details"
        create={true}
        visible={AddModalOpen}
        title={"Create Client"}
      ></CreateModal>
      <CreateModal
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
      ></CreateModal>
    </>
  );
};

export default ClientManagement;
