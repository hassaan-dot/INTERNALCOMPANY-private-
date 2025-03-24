import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  ScreenHeader,
  InformationContainer,
  Note,
  StatusModal,
  CreatetModal,
} from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import helpers from "../../utils/helpers";
import styles from "./styles";
import ConfirmRecieving from "../../Components/Modals/confirmRecieving/component";
const PaymentDetails: React.FC<{ route: any }> = ({ route }) => {
  const [ModalOpen, setModalOpen] = useState(false);
  function Create() {}
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.container2}>
          <ScreenHeader title={'Payment Details'} onPress={Create}></ScreenHeader>
        </View>
        <View style={styles.container3}>
          <View style={styles.LoginBox}>
            <InformationContainer
              style={styles.textStyle}
              titleStyle={styles.Text}
              rows={1}
              title={"Client Information"}
              horizontalwidth={helpers.wp(75.9)}
              detailscreenContainer={styles.detailScreenContainer}
            ></InformationContainer>
          </View>
        </View>
      </ScrollView>

      <StatusModal title={"Change status"} isVisible={false}></StatusModal>
      <CreatetModal
        First="First Name"
        Firstchild="Last name"
        Second="Email Address"
        Third="Phone number"
        Fifth="Amount"
        Sixth="Invoice type"
        seventh="Add notes"
        eigth="Add document/Document"
        invoice={true}
        styleContainer={{ flexDirection: "row" }}
        create={true}
        visible={false}
        title={"Add Invoice"}
      ></CreatetModal>
      <ConfirmRecieving
        title={"Confirm Client Recieving"}
        create={true}
        styleContainer={{ flexDirection: "row" }}
        First="Client Name"
        Firstchild="PO Number"
        Second="upload proof of received "
        visible={false}
      ></ConfirmRecieving>
      <Note title={"Note"} isVisible={false}></Note>
      <CreateModal create={false} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PaymentDetails;
