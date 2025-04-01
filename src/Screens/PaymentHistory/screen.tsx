import { PoppinsRegular } from "@/constants/fonts";
import {
  useCreateInvoice,
  useDeleteInvoice,
  useGetInvoice,
} from "@/hooks/usePOpayments";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { CompanyTable, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { Invoice_Schema } from "../ClientManagement/_schema";
import styles from "./styles";
const PaymentHistoryScreen: React.FC<{ route: any }> = ({ route }) => {
  const [ModalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const onClickEye = ({ documentId }: any) => {
    router.push(`/(app)/payment/payment-details?id=${documentId}`);
  };
  const { mutate: handleAddInvoice } = useCreateInvoice();
  const { mutate: handleDelete } = useDeleteInvoice();

  const { data: InvoiceData, refetch } = useGetInvoice();
  useRefreshOnFocus(refetch);

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
        purchase_order: 60,
      },
    };
    handleAddInvoice(data);
  };
  const onPressDelete = (documentId: string) => {
    const data = {
      data: {
        documentId: documentId,
      },
    };
    handleDelete(data);
  };
  return (
    <>
      <View style={styles.container}>
        <ScreenHeader title={"Payment History"}></ScreenHeader>

        <View style={styles.container1}>
          <CompanyTable
            showActions={true}
            onPressDelete={onPressDelete}
            rowTextStyle={{ marginLeft: 10, fontFamily: PoppinsRegular }}
            headerTextStyle={{ left: 10 }}
            pagination={true}
            DATA={InvoiceData}
            columns_schema={Invoice_Schema}
            showEye={true}
            showDocument={true}
            showStatus={true}
            onClickEye={onClickEye}
          ></CompanyTable>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PaymentHistoryScreen;
