import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  ScreenHeader,
  UserProfile,
  VerticalsButton,
  InformationContainer,
  NotesCard,
  TableTitle,
  Note,
  StatusModal,
  CreatetModal,
} from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import helpers from "../../utils/helpers";
import styles from "./styles";
import ConfirmRecieving from "../../Components/Modals/confirmRecieving/component";
import { generateData } from "../../utils/Props/TableDataUserManagemenr/props";
const POdetails: React.FC<{ route: any }> = ({ route }) => {
  const DATA = generateData();
  const [ConfirmRecievingModalOpen, setConfirmRecievingModalOpen]=useState(false);
  const [StatusModalOpen, setStatusModalOpen] = useState(false);
  const [NoteModalOpen, setNoteModalOpen] = useState(false);
  const [AddInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false);

  function ConfirmRecievingOpenfunc() {
    setConfirmRecievingModalOpen(true);
  }
  function StatusModalOpenfunc() {
    setStatusModalOpen(true);
  }
  function StatusModalClosefunc() {
    setStatusModalOpen(false);
  }

  function NoteModalOpenfunc() {
    setNoteModalOpen(true);
  }
  function NoteModalClosefunc() {
    setNoteModalOpen(false);
  }

  function AddInvoiceModalOpenfunc() {
    setAddInvoiceModalOpen(true);
  }
  function AddInvoiceModalClosefunc() {
    setAddInvoiceModalOpen(false);
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: 25 }}>
          <ScreenHeader buttonView={true} title={route.name}></ScreenHeader>
        </View>
        <View style={styles.container2}>
          <View style={styles.section}>
            <View style={{ flex: 1 }}>
              <UserProfile
                style={{ color: "#2E2E2E" }}
                titleStyle={{ fontWeight: "400" }}
                rows={1}
                title={"PO Details"}
                cardContainer={styles.card}
                detailscreenContainer={styles.container3}
              ></UserProfile>
            </View>
            <View>
              <VerticalsButton
                onPress={StatusModalOpenfunc}
                profile={true}
                buttons={2}
              ></VerticalsButton>
            </View>
          </View>
          <View style={styles.LoginBox}>
            <InformationContainer
              style={{ color: "#080808" }}
              titleStyle={styles.Text}
              rows={1}
              title={"Client Information"}
              horizontalwidth={helpers.wp(75.9)}
              detailscreenContainer={styles.container4}
            ></InformationContainer>
          </View>
          <View style={styles.container5}>
            <View style={{ width: helpers.wp(40) }}>
              <NotesCard
                detailscreenContainer={styles.container6}
                titleStyle={styles.Text}
                title="Notes"
                TextTitle={"Hassaan,khawaja"}
                TextEnable={true}
                titleIcon={true}
                ButtonTitle="Add notes"
                onPress={NoteModalOpenfunc}
                horizontalwidth={helpers.wp(39.9)}
              ></NotesCard>
            </View>
            <View style={{ width: helpers.wp(35) }}>
              <NotesCard
                titleIcon={true}
                detailscreenContainer={styles.container6}
                height={60}
                titleStyle={styles.Text}
                Document={true}
                title="Documents"
                TextEnable={false}
                ButtonTitle="Upload"
                horizontalwidth={helpers.wp(35)}
              ></NotesCard>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <TableTitle
              DATA={DATA}
              onPress={AddInvoiceModalOpenfunc}
              ButtonTitle="Add Invoice"
              titleIcon={true}
              title="Payment History"
            ></TableTitle>
          </View>
          <View style={{ margin: 20 }}>
            <TableTitle
              DATA={DATA}
              title="Items"
              titleIcon={true}
              titleIcon2={true}
              ButtonTitle="Add New item"
              ButtonTitle2="Filter"
            ></TableTitle>
          </View>
        </View>
      </ScrollView>

      <StatusModal
        onClose={StatusModalClosefunc}
        title={"Change status"}
        isVisible={StatusModalOpen}
      ></StatusModal>
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
        visible={AddInvoiceModalOpen}
        onClose={AddInvoiceModalClosefunc}
        title={"Add Invoice"}
        modalContainerprop={{ flex: 1 }}
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
      <Note
        onClose={NoteModalClosefunc}
        title={"Note"}
        isVisible={NoteModalOpen}
      ></Note>
      <CreateModal create={false} visible={false}></CreateModal>
    </>
  );
};

export default POdetails;
