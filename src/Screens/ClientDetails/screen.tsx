import { useGetOneClient } from "@/hooks/useClient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  ClientDetailsHeader,
  CompanyTable,
  ScreenHeader,
  TabSelector,
} from "../../Components";
import { styles } from "./styles";
import {
  Invoice_Schema,
  Po_Schema,
  Po_Schema_Client,
} from "../ClientManagement/_schema";
import { useGetPO } from "@/hooks/usePO";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useGetInvoice } from "@/hooks/usePOpayments";
import { ActivityIndicator } from "react-native";

const ClientDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isPending } = useGetOneClient(id as string);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { data: InvoiceData } = useGetInvoice(id as string);

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.container2}>
          <ScreenHeader title={"Client Details"}></ScreenHeader>
        </View>

        <View>
          <ClientDetailsHeader item={data} profile={true} />
        </View>
        <View style={styles.container3}>
          <TabSelector
            tabs={["Purchasing Order List", "Invoice List"]}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </View>
        <View style={styles.container4}>
          <CompanyTable
            columns_schema={
              selectedTab === 0 ? Po_Schema_Client : Invoice_Schema
            }
            checkbox={true}
            showActions={true}
            showEye={true}
            showDel={false}
            showEdit={false}
            isPO={true}
            showStatus={true}
            DATA={selectedTab === 0 ? data?.data?.purchase_orders : InvoiceData}
            pagination={true}
            // onPressUpdate={onPressEdit}
            // onPressDelete={handleDelete}
            onClickEye={({ documentId }) => {
              if (selectedTab === 0) {
                router.push(`/(app)/payment/payment-details`);
              } else {
                router.push(`/(app)/payment/payment-details?id=${documentId}`);
              }
            }}
          />

          {/* <CompanyTable showActions={true} checkbox={true} DATA={[]} /> */}
        </View>
      </ScrollView>
    </>
  );
};

export default ClientDetails;
