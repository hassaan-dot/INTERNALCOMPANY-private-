import { PoppinsRegular } from "@/constants/fonts";
import { useCreateNote } from "@/hooks/useNotes";
import { useGetOnePO } from "@/hooks/usePO";
import { useCreateInvoice, useDeleteInvoice } from "@/hooks/usePOpayments";
import { usePOActions } from "@/hooks/usePoActions";
import { formatDateForAPI } from "@/services/dateFormatter";
import LocalStorage from "@/services/local-storage";
import PoDetailProfile from "@/src/Components/poDetailsProfileHeader/component";
import { useModalStore } from "@/store/useModalStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import {
  AddDocumentModal,
  AssignEmployee,
  InformationContainer,
  InvoiceModal,
  Note,
  NotesCard,
  PoItemModal,
  ScreenHeader,
  StatusModal,
  TableTitle,
  VerticalsButton,
} from "../../Components";
import ConfirmRecieving from "../../Components/Modals/confirmRecieving/component";
import helpers from "../../utils/helpers";
import styles from "./styles";
import { PO_ACTIVE_STATUS } from "@/constants/po_status";
import { useAuthStore } from "@/store/useAuthStore";
import { useDeleteItem } from "@/hooks/usePOitems";
import { useSchemas } from "@/hooks/useSchemas";
import { useTranslation } from "react-i18next";

const PODetailScreen = () => {
  const { t } = useTranslation();
  const { Invoice_Schema, Item_Schema } = useSchemas();
  const {
    isInvoicePoModalOpen,
    setisInvoicePoModalOpen,
    setIsNoteModalOpen,
    isNoteModalOpen,
    isStatusModalOpen,
    setIsStatusModalOpen,
    isAssignEmployeeModalOpen,
    setisAssignEmployeeModalOpen,
    confirmRecievingModalOpen,
    setConfirmRecievingModalOpen,
    setRowData,
    setIsPoItemsModalOpen,
    isPoItemsModalOpen,
    setDocumentModalOpen,
    documentModalOpen,
  } = useModalStore();
  const { user } = useAuthStore();
  const { id } = useLocalSearchParams();
  const { mutate: handleAddNote } = useCreateNote();
  const { data, isPending } = useGetOnePO(id as string);
  const {
    handleAccept,
    handleReject,
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
    setRowData(null);
    setIsStatusModalOpen(false);
  };

  function NoteModalOpenfunc() {
    setIsNoteModalOpen(true);
  }

  const handleNoteModalClose = () => {
    setRowData(null);
    setIsNoteModalOpen(false);
  };
  const handleDocumentModalOpenfunc = () => {
    setDocumentModalOpen(true);
  };

  function AddInvoiceModalOpenfunc() {
    setRowData(null);
    setisInvoicePoModalOpen(true);
  }
  function AddItemModalOpenfunc() {
    setRowData(null);
    setIsPoItemsModalOpen(true);
  }

  function onCloseAssignModal() {
    setRowData(null);
    setisAssignEmployeeModalOpen(false);
  }
  function onOpenAssignModal() {
    setRowData(null);
    setisAssignEmployeeModalOpen(true);
  }
  function AddInvoiceModalClosefunc() {
    setRowData(null);
    setisInvoicePoModalOpen(false);
  }
  const { handlePOAssign } = usePOActions(id as string);
  const handleSubmit = ({ users }: any) => {
    handlePOAssign({ users: { users } });
  };

  const handleConfirmRecievingfunc = () => {
    setConfirmRecievingModalOpen(true);
  };

  const onPressEdit = ({
    date_of_payment,
    payer,
    amount,
    payment_method,
    payment_status,
    documentId,
  }: any) => {
    const data = {
      date_of_payment,
      payer,
      amount,
      payment_method,
      payment_status,
      documentId: documentId,
      purchase_order: id,
      isEdit: true,
    };
    setRowData(data);
    setisInvoicePoModalOpen(true);
  };

  const onPressEditItems = ({
    item_number,
    item_name,
    price,
    company,
    item_status,
    documentId,
  }: any) => {
    const data = {
      item_number,
      item_name,
      price,
      company,
      item_status,
      purchase_order: id,
      documentId,
      isEdit: true,
    };
    setRowData(data);
    setIsPoItemsModalOpen(true);
  };
  const router = useRouter();
  const { mutate: delInvoice } = useDeleteInvoice();
  const { mutate: delItem } = useDeleteItem();

  const handleInvoiceDelete = (documentId: number) => {
    delInvoice(documentId);
  };
  const handleItemsDelete = (documentId: number) => {
    delItem(documentId);
  };

  const onClickPaymentEye = ({ documentId }: { documentId: string }) => {
    router.push(`/(app)/payment/payment-details?id=${documentId}`);
  };

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: 25 }}>
          <ScreenHeader
            buttonViewMulitiple={true}
            title={t("po_detail.title")}
            data={data?.data}
            handleAccept={handleAccept}
            handleReject={handleReject}
            handleConfirm={handleConfirmRecievingfunc}
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
                title={t("po_detail.title")}
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
                  (user?.role?.name !== "Admin" &&
                    data?.data?.po_created_by?.documentId !== user?.documentId &&
                    user?.department?.name != "Sales") ||
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
              title={t("po_detail.client_info")}
              horizontalwidth={helpers.wp(75.9)}
              detailscreenContainer={styles.container4}
            />
          </View>
          <View style={styles.container5}>
            <View style={{ flex: 1 }}>
              <NotesCard
                Data={data?.data}
                detailscreenContainer={styles.container6}
                titleStyle={styles.Text}
                title={t("po_detail.notes")}
                TextTitle="Hassaan,khawaja"
                TextEnable={true}
                titleIcon={true}
                Document={false}
                ButtonTitle={t("po_detail.add_note")}
                onPress={NoteModalOpenfunc}
                horizontalwidth={helpers.wp(39.9)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <NotesCard
                detailscreenContainer={styles.container6}
                height={60}
                titleStyle={styles.Text}
                Document={true}
                Data={data?.data}
                titleIcon={true}
                title={t("po_detail.documents")}
                onPress={handleDocumentModalOpenfunc}
                ButtonTitle={t("po_detail.upload_file")}
                TextEnable={false}
                horizontalwidth={helpers.wp(35)}
              />
            </View>
          </View>

          <View style={{ margin: 20 }}>
            <TableTitle
              DATA={data?.data?.invoices}
              schema={Invoice_Schema}
              rowTextStyle={{ marginLeft: 8, fontFamily: PoppinsRegular }}
              onPress={AddInvoiceModalOpenfunc}
              ButtonTitle={t("po_detail.add_invoice")}
              titleIcon={true}
              title={t("po_detail.payment_history")}
              onPressEdit={onPressEdit}
              onPressDel={handleInvoiceDelete}
              onClickEye={onClickPaymentEye}
            />
          </View>

          <View style={{ margin: 20 }}>
            <TableTitle
              DATA={data?.data?.po_items}
              title={t("po_detail.items")}
              rowTextStyle={{ marginLeft: 10, fontFamily: PoppinsRegular }}
              schema={Item_Schema}
              titleIcon={true}
              onPressEdit={onPressEditItems}
              onPressDel={handleItemsDelete}
              onPress={AddItemModalOpenfunc}
              ButtonTitle={t("po_detail.add_item")}
              showEye={false}
            />
          </View>
        </View>
      </ScrollView>

      {isStatusModalOpen && (
        <StatusModal
          onClose={handleCloseStatusModal}
          title={t("po_detail.change_status")}
          isVisible={isStatusModalOpen}
          current_status={data?.data?.po_status}
        />
      )}

      {isInvoicePoModalOpen && (
        <InvoiceModal
          onClose={AddInvoiceModalClosefunc}
          visible={isInvoicePoModalOpen}
          invoice={false}
          styleContainer={{}}
          title={t("po_detail.add_invoice")}
          onSubmit={() => { }}
          First=""
          Firstchild=""
          Second=""
          Third=""
          Fourth=""
          Fifth=""
          Sixth=""
          seventh=""
          eigth=""
          ninth=""
          desctext=""
          user={false}
          modalContainerprop={{}}
          Data={null}
          deleteD={false}
          update={false}
        />
      )}

      {confirmRecievingModalOpen && (
        <ConfirmRecieving
          title={t("po_detail.confirm_client_receiving")}
          styleContainer={{ flexDirection: "row" }}
          Second={t("po_detail.upload_proof")}
          onClose={() => {
            setConfirmRecievingModalOpen(false);
          }}
          visible={confirmRecievingModalOpen}
          invoice={false}
          onSubmit={() => { }}
          First=""
          Firstchild=""
        />
      )}

      {isNoteModalOpen && (
        <Note
          onClose={handleNoteModalClose}
          onPress={onPressAddNotefunction}
          title={t("po_detail.note")}
          isVisible={isNoteModalOpen}
          Activate={true}
        />
      )}

      {isAssignEmployeeModalOpen && (
        <AssignEmployee
          onClose={onCloseAssignModal}
          onSubmit={handleSubmit}
          desc={true}
          visible={isAssignEmployeeModalOpen}
          title={t("po_detail.assign_employee")}
        />
      )}

      {documentModalOpen && (
        <AddDocumentModal
          onClose={() => {
            setDocumentModalOpen(false);
          }}
          visible={documentModalOpen}
          invoice={false}
          styleContainer={{}}
          title={t("po_detail.add_document")}
          onSubmit={() => { }}
          First=""
          Firstchild=""
          Second=""
        />
      )}

      {isPoItemsModalOpen && (
        <PoItemModal
          visible={isPoItemsModalOpen}
          onClose={() => {
            setIsPoItemsModalOpen(false);
            setRowData(null);
          }}
          invoice={false}
          styleContainer={{}}
          title={t("po_detail.add_item")}
          onSubmit={() => { }}
          First=""
          Firstchild=""
          Second=""
          Third=""
          Fourth=""
          Fifth=""
          Sixth=""
          seventh=""
          eigth=""
          ninth=""
          desctext=""
          user={false}
          modalContainerprop={{}}
          Data={null}
          deleteD={false}
          update={false}
        />
      )}
    </>
  );
};

export default PODetailScreen;
