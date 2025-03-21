import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  ScreenHeader,
  CompanyTable,
  UserProfile,
  TabSelector,
  GraphCard,
} from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
// import TabSelector from "../../Components";
import { styles } from "./styles";
const UserDetails: React.FC<{ route: any }> = ({ route }) => {
  const [ModalOpen, setModalOpen] = useState(false);
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
  console.log("showActions", showActions, "showStatus", showStatus);
  return (
    <>
      <ScrollView style={styles.container1}>
        <ScreenHeader title={route?.name} onPress={CreatClient}></ScreenHeader>

        <UserProfile profile={true}></UserProfile>
        <View style={styles.container2}>
          <GraphCard></GraphCard>
        </View>
      </ScrollView>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default UserDetails;
//B0C4DE
