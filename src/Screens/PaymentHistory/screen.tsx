import { PoppinsRegular } from "@/constants/fonts";
import {
  useCreateInvoice,
  useDeleteInvoice,
  useGetInvoice,
  useUpdateInvoice,
} from "@/hooks/usePOpayments";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { CompanyTable, InvoiceModal, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { Invoice_Schema } from "../ClientManagement/_schema";
import styles from "./styles";
import { useModalStore } from "@/store/useModalStore";
const PaymentHistoryScreen: React.FC<{ route: any }> = ({ route }) => {
  const router = useRouter();

  const onClickEye = ({ documentId }: any) => {
    router.push(`/(app)/payment/payment-details?id=${documentId}`);
  };

  const { mutate: handleDelete } = useDeleteInvoice();

  const { data: InvoiceData, refetch } = useGetInvoice();
  useRefreshOnFocus(refetch);

  const { rowData, setRowData, setisInvoicePoModalOpen, isInvoicePoModalOpen } =
    useModalStore();

  const onPressEdit = ({
    date_of_payment,
    payer,
    amount,
    payment_method,
    payment_status,
    purchase_order,
    documentId,
  }: any) => {
    const data = {
      date_of_payment,
      payer,
      amount,
      payment_method,
      payment_status,
      documentId: documentId,
      purchase_order: purchase_order?.documentId,
      isEdit: true,
    };
    setRowData(data);
    setisInvoicePoModalOpen(true);
  };

  const onPressDelete = (documentId: string) => {
    handleDelete(documentId);
  };

  return (
    <>
      <View style={styles.container}>
        <ScreenHeader title={"Payment History"} filter={true}></ScreenHeader>

        <View style={styles.container1}>
          <CompanyTable
            showActions={true}
            onPressDelete={onPressDelete}
            onPressUpdate={onPressEdit}
            rowTextStyle={{ marginLeft: 10, fontFamily: PoppinsRegular }}
            headerTextStyle={{ left: 10 }}
            pagination={true}
            DATA={InvoiceData}
            columns_schema={Invoice_Schema}
            showEye={true}
            showDocument={false}
            showStatus={true}
            showEdit={true}
            showDel={true}
            onClickEye={onClickEye}
          />
        </View>
      </View>
      {isInvoicePoModalOpen && (
        <InvoiceModal
          onClose={() => {
            setRowData(null);
            setisInvoicePoModalOpen(false);
          }}
          visible={isInvoicePoModalOpen}
        />
      )}
    </>
  );
};

export default PaymentHistoryScreen;
