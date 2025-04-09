import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  CompanyTable,
  GraphCard,
  PredictorCard,
  ScreenHeader,
  TabSelector,
} from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { generateData } from "../../utils/Props/TableDataUserManagemenr/props";
import { styles } from "./styles";
const Report: React.FC<{ route: any }> = ({ route }) => {
  const DATA = generateData();

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
  return (
    <>
      <ScrollView style={styles.container1}>
        <ScreenHeader title={"Reports"} onPress={CreatClient}></ScreenHeader>

        <View style={{ marginTop: 15 }}>
          <View style={styles.container2}>
            {/* <Ballindicator></Ballindicator> */}
            <PredictorCard color="#38CB89" />
            <PredictorCard color="#FFA600" />
            <PredictorCard color="#FF5630" />
            <PredictorCard color="#38CB89" />
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>
          <GraphCard></GraphCard>
        </View>
        <View style={{ marginTop: 10 }}>
          <TabSelector
            containerStyle={styles.container3}
            dropDownButton={true}
            barColor={"#07504B"}
            style={{ backgroundColor: "" }}
            textStyle={styles.textStyle1}
            tabs={["PO reports", "payment reports", "User active reports"]}
            onSelect={(tab) => setSelectedTab(tab)}
            selectedTab={selectedTab}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          {/* <Indicator></Indicator> */}
          <CompanyTable
            showActions={true}
            checkbox={true}
            pagination={true}
            DATA={DATA}
          ></CompanyTable>
        </View>
      </ScrollView>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default Report;
