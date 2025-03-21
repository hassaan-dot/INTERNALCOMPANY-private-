import React, { useState } from "react";
import { View } from "react-native";
import { ScreenHeader, CompanyTable } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { useNavigation } from "@react-navigation/native";
import { generateData } from "../../utils/Props/TableDataUserManagemenr/props";
import Styles from "./styles";
const PO_Management: React.FC<{ route: any }> = ({ route }) => {

  const navigation = useNavigation();

  const DATA = generateData();

  const [ModalOpen, setModalOpen] = useState(false);

  function onPressfunc() {
    return navigation.navigate("Add New PO");
  }

  function Create() {
  }
  return (
    <>
      <View style={Styles.container}>
        <ScreenHeader
          create={true}
          filter={true}
          onPress={onPressfunc}
          title={route.name}
        ></ScreenHeader>

        <View>
          <CompanyTable
            col1={"Name"}
            col2={"Email"}
            col3={"Phone number"}
            col4={"Person Contact"}
            col5={"Action"}
            checkbox={true}
            showActions={true}
            DATA={DATA}
          ></CompanyTable>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PO_Management;
