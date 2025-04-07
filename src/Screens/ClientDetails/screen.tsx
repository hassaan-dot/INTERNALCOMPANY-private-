import { useGetOneClient } from "@/hooks/useClient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { ClientDetailsHeader, ScreenHeader } from "../../Components";
import { styles } from "./styles";

const ClientDetails = () => {
  const { id } = useLocalSearchParams();

  const { data } = useGetOneClient(id as string);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.container2}>
          <ScreenHeader title={"Client Details"}></ScreenHeader>
        </View>

        <View>
          <ClientDetailsHeader item={data} profile={true} />
        </View>
        {/* <View style={styles.container3}>
          <TabSelector
            tabs={["Purchasing Order List", "Invoice List"]}
            onSelect={(tab) => setSelectedTab(tab)}
            selectedTab={selectedTab}
          />
        </View>
        <View style={styles.container4}>
          <CompanyTable
            showActions={true}
            checkbox={true}
            DATA={DATA}
          ></CompanyTable>
        </View> */}
      </ScrollView>
    </>
  );
};

export default ClientDetails;
