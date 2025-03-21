import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { AttendenceModal, CompanyTable, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { generateData } from "../../utils/Props/TableDataUserManagemenr/props";
import { styles } from "./styles";

const UserManagement = () => {
  const navigation = useNavigation();
  const [ModalOpen, setModalOpen] = useState(false);
  const [AttendenceModalOpen, setAttendenceModalOpen] = useState(false);
  function CreatClient() {
    setModalOpen(true);
  }
  function onPressfunction() {
    setModalOpen(false);
    setAttendenceModalOpen(true);
  }
  function onSubmitFunc() {
    setAttendenceModalOpen(false);
    navigation.navigate("User Details");
  }
  const DATA = generateData();
  return (
    <>
      <View style={styles.container1}>
        <ScreenHeader
          create={true}
          title={"User Management"}
          onPress={CreatClient}
        ></ScreenHeader>

        <View>
          <CompanyTable
            col1={"Name"}
            col2={"Email"}
            col3={"Phone number"}
            col4={"Person Contact"}
            col5={"Action"}
            showActions={true}
            checkbox={true}
            pagination={true}
            DATA={DATA}
          ></CompanyTable>
        </View>
      </View>

      <AttendenceModal
        onSubmit={onSubmitFunc}
        clockIn={true}
        title={"Attendence"}
        isVisible={AttendenceModalOpen}
      ></AttendenceModal>

      <CreateModal
        onSubmit={onPressfunction}
        First="First Name"
        Firstchild="Last name"
        Second="Email Address"
        Third="Phone number"
        Fourth="Roles"
        // Fifth="Departmnet"
        // Sixth="Departmnet"
        seventh="Departmnet"
        eigth="Add document/Document"
        desc={true}
        desctext="Add your new users details"
        // invoice={true}
        styleContainer={{ flexDirection: "row" }}
        create={true}
        visible={ModalOpen}
        title={"Create User"}
        user={true}
        ninth={"Departmment"}
      ></CreateModal>
    </>
  );
};

export default UserManagement;
