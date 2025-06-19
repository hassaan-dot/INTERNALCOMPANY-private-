import { useGetOneClient } from "@/hooks/useClient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import {
  ClientDetailsHeader,
  CompanyTable,
  ScreenHeader,
  TabSelector,
} from "../../Components";
import { styles } from "./styles";
import { useGetPO } from "@/hooks/usePO";
import { useGetInvoice } from "@/hooks/usePOpayments";
import { useTranslation } from "react-i18next";
import { useSchemas } from "@/hooks/useSchemas";

const ClientDetails = () => {
  const { t } = useTranslation();
  const { Po_Schema_Client, Invoice_Schema } = useSchemas();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isPending } = useGetOneClient(id as string);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { data: InvoiceData } = useGetInvoice(id as string);

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <ScreenHeader title={t("clientDetails.title")} />
      </View>

      <View>
        <ClientDetailsHeader
          item={data}
          profile={true}
          contact_person_name={data?.data?.contact_person_name}
          email={data?.data?.email}
          phone_number={data?.data?.phone_number}
          company_name={data?.data?.company_name}
          rows={1}
          style={{}}
          title={t("clientDetails.title")}
          titleIcon={false}
          titleStyle={{}}
          cardContainer={{}}
          detailscreenContainer={{}}
          horizontalwidth="50%"
        />
      </View>

      <View style={styles.container3}>
        <TabSelector
          tabs={[
            t("clientDetails.tabs.po_list"),
            t("clientDetails.tabs.invoice_list"),
          ]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          style={{}}
          textStyle={{}}
          barColor="#07504B"
          dropDownButton={false}
          containerStyle={{}}
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
          onClickEye={({ documentId }) => {
            const basePath =
              selectedTab === 0
                ? "/(app)/po-management/po-details"
                : "/(app)/payment/payment-details";
            router.push(`${basePath}?id=${documentId}`);
          }}
          onPressUpdate={() => { }}
          onPressDelete={() => { }}
          showDocument={false}
        />
      </View>
    </ScrollView>
  );
};

export default ClientDetails;
