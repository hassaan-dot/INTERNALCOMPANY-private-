import { PoppinsRegular } from "@/constants/fonts";
import { useGetOnePO } from "@/hooks/usePO";
import LocalStorage from "@/services/local-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  InformationContainer,
  InvoiceModal,
  Note,
  NotesCard,
  ScreenHeader,
  StatusModal,
  TableTitle,
  UserProfile,
  VerticalsButton,
} from "../../Components";
import ConfirmRecieving from "../../Components/Modals/confirmRecieving/component";
import CreateModal from "../../Components/Modals/createModal/component";
import helpers from "../../utils/helpers";
import { generateData } from "../../utils/Props/TableDataUserManagemenr/props";
import { Invoice_Schema, Item_Schema } from "../ClientManagement/_schema";
import styles from "./styles";
import { useModalStore } from "@/store/useModalStore";
import { useCreateNote } from "@/hooks/useNotes";
import { useCreateInvoice, useGetInvoice } from "@/hooks/usePOpayments";
import { useGetItems } from "@/hooks/usePOitems";
const POdetails: React.FC<{ route: any }> = ({ route }) => {
  const DATA = generateData();
  // const token = await LocalStorage.get("token");
  const [ConfirmRecievingModalOpen, setConfirmRecievingModalOpen] =
    useState(false);

  const {
    isInvoicePoModalOpen,
    setisInvoicePoModalOpen,
    setIsNoteModalOpen,
    isNoteModalOpen,
  } = useModalStore();

  const [StatusModalOpen, setStatusModalOpen] = useState(false);
  const { mutate: handleAddNote } = useCreateNote();
  const { mutate: handleAddInvoice } = useCreateInvoice();

  const [NoteModalOpen, setNoteModalOpen] = useState(false);

  const { id } = useLocalSearchParams();
  const { data: InvoiceData } = useGetInvoice();
  const { data: ItemsData } = useGetItems();

  const { data } = useGetOnePO(id as string);

  const onPressAddNotefunction = async ({ note }: any) => {
    const userData: any = await LocalStorage.get("user");

    const data = {
      data: {
        note: note,
        purchase_order: id,
        user: userData?.id,
      },
    };

    handleAddNote(data);
  };

  function ConfirmRecievingOpenfunc() {
    setConfirmRecievingModalOpen(true);
  }
  function StatusModalOpenfunc() {
    setStatusModalOpen(true);
  }

  async function StatusModalClosefunc() {
    const user = await LocalStorage.get("user");
    setStatusModalOpen(false);
  }

  function NoteModalOpenfunc() {
    setIsNoteModalOpen(true);
  }

  function NoteModalClosefunc() {
    setNoteModalOpen(false);
  }

  function AddInvoiceModalOpenfunc() {
    setisInvoicePoModalOpen(true);
  }
  function AddInvoiceModalClosefunc() {
    setisInvoicePoModalOpen(false);
  }
  const onPressAddInvoicefunction = ({
    date_of_payment,
    payer,
    amount,
    payment_method,
    payment_status,
  }: any) => {
    const data = {
      data: {
        date_of_payment: date_of_payment,
        payer: payer,
        amount: amount,
        payment_method: payment_method,
        payment_status: payment_status,
        purchase_order: id,
      },
    };
    handleAddInvoice(data);
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: 25 }}>
          <ScreenHeader buttonView={true} title={"PO Details"}></ScreenHeader>
        </View>
        <View style={styles.container2}>
          <View style={styles.section}>
            <View style={{ flex: 1 }}>
              <UserProfile
                data={data}
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
                onClose={StatusModalClosefunc}
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
              Data={data}
              title={"Client Information"}
              horizontalwidth={helpers.wp(75.9)}
              detailscreenContainer={styles.container4}
            ></InformationContainer>
          </View>
          <View style={styles.container5}>
            <View style={{ flex: 1 }}>
              <NotesCard
                Data={data?.data}
                detailscreenContainer={styles.container6}
                titleStyle={styles.Text}
                title="Notes"
                TextTitle={"Hassaan,khawaja"}
                TextEnable={true}
                titleIcon={true}
                Document={false}
                ButtonTitle="Add notes"
                onPress={NoteModalOpenfunc}
                horizontalwidth={helpers.wp(39.9)}
              ></NotesCard>
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <NotesCard
                titleIcon={true}
                detailscreenContainer={styles.container6}
                height={60}
                titleStyle={styles.Text}
                Document={true}
                Data={data?.data}
                title="Documents"
                TextEnable={false}
                ButtonTitle="Upload"
                horizontalwidth={helpers.wp(35)}
              ></NotesCard>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <TableTitle
              DATA={data?.data?.invoices}
              schema={Invoice_Schema}
              rowTextStyle={{ marginLeft: 18, fontFamily: PoppinsRegular }}
              onPress={AddInvoiceModalOpenfunc}
              ButtonTitle="Add Invoice"
              titleIcon={true}
              title="Payment History"
            ></TableTitle>
          </View>
          <View style={{ margin: 20 }}>
            <TableTitle
              DATA={data?.data?.po_items}
              title="Items"
              rowTextStyle={{ marginLeft: 10, fontFamily: PoppinsRegular }}
              schema={Item_Schema}
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

      {isInvoicePoModalOpen && (
        <InvoiceModal
          onClose={AddInvoiceModalClosefunc}
          onSubmit={onPressAddInvoicefunction}
          visible={isInvoicePoModalOpen}
        ></InvoiceModal>
      )}
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
        onPress={onPressAddNotefunction}
        title={"Note"}
        isVisible={isNoteModalOpen}
      ></Note>
      <CreateModal create={false} visible={false}></CreateModal>
    </>
  );
};

export default POdetails;
