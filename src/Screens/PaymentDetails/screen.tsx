import { useGetOneInvoice } from "@/hooks/usePOpayments";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { PaymentDetailsCard, ScreenHeader } from "../../Components";
import styles from "./styles";
const PaymentDetails: React.FC<{ route: any }> = ({ route }) => {
  const { id } = useLocalSearchParams();
  const { data, isPending } = useGetOneInvoice(id);

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.container2}>
          <ScreenHeader title={"Payment Details"}></ScreenHeader>
        </View>
        <View style={styles.container3}>
          <View style={styles.LoginBox}>
            <PaymentDetailsCard
              style={styles.textStyle}
              titleStyle={styles.Text}
              rows={1}
              Data={data}
              title={"Payment Information"}
              // horizontalwidth={helpers.wp(75.9)}
              detailscreenContainer={styles.detailScreenContainer}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PaymentDetails;
