import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScreenHeader, CompanyTable } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { useNavigation } from "@react-navigation/native";
import {generateData} from '../../utils/Props/TableDataUserManagemenr/props'
import {styles} from './styles'
const ClientManagement: React.FC<{ route: any }> = ({ route }) => {
  const DATA= generateData();

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
  function onPressfunction2() {
    setReminderModalOpen(false);
    // setReminderModalOpen(true)
    navigation.navigate("Client Details");
  }

  return (
    <>
      <View style={styles.container}>
        <ScreenHeader
          create={true}
          title={route.name}
          onPress={CreatClient}
        ></ScreenHeader>

        <View>
          <CompanyTable
            col1={"Company no"}
            col2={"Email"}
            col3={"Phone number"}
            col4={"Person Contact"}
            col5={"Action"}
            checkbox={true}
            showActions={true}
            pagination={true}
            DATA={DATA}
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
