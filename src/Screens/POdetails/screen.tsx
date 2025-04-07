import { PoppinsRegular } from "@/constants/fonts";
import { useCreateNote } from "@/hooks/useNotes";
import { useGetOnePO } from "@/hooks/usePO";
import { useCreateInvoice } from "@/hooks/usePOpayments";
import { usePOActions } from "@/hooks/usePoActions";
import { formatDateForAPI } from "@/services/dateFormatter";
import LocalStorage from "@/services/local-storage";
import PoDetailProfile from "@/src/Components/poDetailsProfileHeader/component";
import { useModalStore } from "@/store/useModalStore";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  AssignEmployee,
  InformationContainer,
  InvoiceModal,
  Note,
  NotesCard,
  ScreenHeader,
  StatusModal,
  TableTitle,
  VerticalsButton,
} from "../../Components";
import ConfirmRecieving from "../../Components/Modals/confirmRecieving/component";
import helpers from "../../utils/helpers";
import { Invoice_Schema, Item_Schema } from "../ClientManagement/_schema";
import styles from "./styles";
import { PO_ACTIVE_STATUS } from "@/constants/po_status";
import { useAuthStore } from "@/store/useAuthStore";

const PODetailScreen = () => {
  const {
    isInvoicePoModalOpen,
    setisInvoicePoModalOpen,
    setIsNoteModalOpen,
    isNoteModalOpen,
    isStatusModalOpen,
    setIsStatusModalOpen,
    isAssignEmployeeModalOpen,
    setisAssignEmployeeModalOpen,
  } = useModalStore();
  const { user } = useAuthStore();
  const { id } = useLocalSearchParams();
  const { mutate: handleAddNote } = useCreateNote();
  const { mutate: handleAddInvoice } = useCreateInvoice();
  const { data } = useGetOnePO(id as string);

  const {
    handleAccept,
    handleReject,
    handleConfirmRecieving,
    handlePOClose,
    isAccepting,
    isRejecting,
    isConfirming,
    isClosing,
  } = usePOActions(id as string);

  const onPressAddNotefunction = ({ note }: any) => {
    const data = {
      data: {
        note: note,
        purchase_order: id,
        user: user?.documentId,
      },
    };

    handleAddNote(data);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  function NoteModalOpenfunc() {
    setIsNoteModalOpen(true);
  }

  const handleNoteModalClose = () => {
    setIsNoteModalOpen(false);
  };

  function AddInvoiceModalOpenfunc() {
    setisInvoicePoModalOpen(true);
  }

  function onCloseAssignModal() {
    setisAssignEmployeeModalOpen(false);
  }
  function onOpenAssignModal() {
    setisAssignEmployeeModalOpen(true);
  }
  function AddInvoiceModalClosefunc() {
    setisInvoicePoModalOpen(false);
  }
  const { handlePOAssign } = usePOActions(id as string);

  const handleSubmit = ({ users }: any) => {
    handlePOAssign({ users: { users } });
  };
  const onPressAddInvoicefunction = ({
    date_of_payment,
    payer,
    amount,
    payment_method,
    payment_status,
  }: any) => {
    const data = {
      data: {
        date_of_payment: formatDateForAPI(date_of_payment),
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
          <ScreenHeader
            buttonViewMulitiple={true}
            title={"PO Details"}
            data={data?.data}
            handleAccept={handleAccept}
            handleReject={handleReject}
            handleConfirm={handleConfirmRecieving}
            handleClosePO={handlePOClose}
            isAccepting={isAccepting}
            isRejecting={isRejecting}
            isConfirming={isConfirming}
            isClosing={isClosing}
          />
        </View>
        <View style={styles.container2}>
          <View style={styles.section}>
            <View style={{ flex: 1 }}>
              <PoDetailProfile
                data={data}
                style={{ color: "#2E2E2E" }}
                titleStyle={{ fontWeight: "400" }}
                title={"PO Details"}
                cardContainer={styles.card}
                detailscreenContainer={styles.container3}
              />
            </View>
            <View>
              <VerticalsButton
                onPress={() => setIsStatusModalOpen(true)}
                profile={true}
                onPress2={onOpenAssignModal}
                btn1Disable={
                  data?.data?.active_status !== PO_ACTIVE_STATUS.ACCEPTED
                }
                btn2Disable={
                  data?.data?.active_status !== PO_ACTIVE_STATUS.ACCEPTED
                }
              />
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
                detailscreenContainer={styles.container6}
                height={60}
                titleStyle={styles.Text}
                Document={true}
                Data={data?.data}
                title="Documents"
                TextEnable={false}
                horizontalwidth={helpers.wp(35)}
              ></NotesCard>
            </View>
          </View>
          <View style={{ margin: 20 }}>
            <TableTitle
              DATA={data?.data?.invoices}
              schema={Invoice_Schema}
              rowTextStyle={{ marginLeft: 8, fontFamily: PoppinsRegular }}
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

      {isStatusModalOpen && (
        <StatusModal
          onClose={handleCloseStatusModal}
          title={"Change status"}
          isVisible={isStatusModalOpen}
          current_status={data?.data?.po_status}
        />
      )}

      {isInvoicePoModalOpen && (
        <InvoiceModal
          onClose={AddInvoiceModalClosefunc}
          onSubmit={onPressAddInvoicefunction}
          visible={isInvoicePoModalOpen}
        ></InvoiceModal>
      )}
      {/* <ConfirmRecieving
        title={"Confirm Client Recieving"}
        create={true}
        styleContainer={{ flexDirection: "row" }}
        First="Client Name"
        Firstchild="PO Number"
        Second="upload proof of received "
        visible={false}
      /> */}
      {isNoteModalOpen && (
        <Note
          onClose={handleNoteModalClose}
          onPress={onPressAddNotefunction}
          title={"Note"}
          isVisible={isNoteModalOpen}
        ></Note>
      )}
      {isAssignEmployeeModalOpen && (
        <AssignEmployee
          onClose={onCloseAssignModal}
          onSubmit={handleSubmit}
          desc={true}
          visible={isAssignEmployeeModalOpen}
          title={"Assign Employee"}
        />
      )}
    </>
  );
};

export default PODetailScreen;
