import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  ScreenHeader,
  CompanyTable,
  UserProfile,
  TabSelector,
  ClientDetailsHeader,
} from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
// import TabSelector from "../../Components";
import { styles } from "./styles";
import { generateData } from "@/src/utils/Props/TableDataUserManagemenr/props";
import { useLocalSearchParams } from "expo-router";
import { useModalStore } from "@/store/useModalStore";
import { useGetOneClient } from "@/hooks/useClient";
const ClientDetails = () => {
  const { id } = useLocalSearchParams();
  const [ModalOpen, setModalOpen] = useState(false);

  const { data } = useGetOneClient(id as string);
  function CreatClient() {
    setModalOpen(true);
  }
  const [selectedTab, setSelectedTab] = useState<string>(
    "Purchasing Order List"
  );
  let showActions = useState<boolean>(
    selectedTab == "Purchasing Order List" ? true : false
  );
  let showStatus = useState<boolean>(
    selectedTab !== "Purchasing Order List" ? true : false
  );
  const DATA = generateData();

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.container2}>
          <ScreenHeader
            title={"Client Details"}
            onPress={CreatClient}
          ></ScreenHeader>
        </View>

        <View>
          <ClientDetailsHeader item={data} profile={true} />
        </View>
        <View style={styles.container3}>
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
        </View>
      </ScrollView>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default ClientDetails;
