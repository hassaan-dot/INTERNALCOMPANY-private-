import React, { useState } from "react";
import { View } from "react-native";
import { ScreenHeader, CompanyTable } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { generateData } from "../../utils/Props/TableDataUserManagemenr/props";
import Styles from "./styles";
import { useRouter } from "expo-router";
const PaymentHistoryScreen: React.FC<{ route: any }> = ({ route }) => {
  const DATA = generateData();
  const [ModalOpen, setModalOpen] = useState(false);
  function CreatClient() {
    setModalOpen(true);
  }
  const router = useRouter()
  const onClickEye = (username:string, id: number) => {
    router.push(`/(app)/payment/payment-details?username=${username}&id=${id}`)
  }
  return (
    <>
      <View style={Styles.container}>
        <ScreenHeader
          create={true}
          title={'Payment History'}
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
            showEye={true}
            onClickEye={onClickEye}
          ></CompanyTable>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PaymentHistoryScreen;
