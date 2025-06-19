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
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "react-i18next"; // ✅ i18n hook

const Report: React.FC<{ route: any }> = ({ route }) => {
  const { t } = useTranslation(); // ✅ initialize translator
  const DATA = generateData();
  const { user } = useAuthStore();

  const [ModalOpen, setModalOpen] = useState(false);
  function CreatClient() {
    setModalOpen(true);
  }
  const [selectedTab, setSelectedTab] = useState<string>(
    t("report.po_list") // 🟡 Make sure this key exists in your translations
  );
  let showActions = useState<boolean>(
    selectedTab === t("report.po_list") ? true : false
  );
  let showStatus = useState<boolean>(
    selectedTab !== t("report.po_list") ? true : false
  );

  return (
    <>
      <ScrollView style={styles.container1}>
        <ScreenHeader title={t("report.title")} onPress={CreatClient} />
        <View style={{ marginTop: 15 }}>
          <View style={styles.container2}>
            {/* <Ballindicator></Ballindicator> */}
            <PredictorCard
              style={{}}
              title={t("report.total_applications")}
              color="#38CB89"
              value={3}
              inc={"+100"}
            />
            <PredictorCard
              style={{}}
              title={t("report.assigned")}
              color="#FFA600"
              value={100}
              inc={"+100"}
            />
            <PredictorCard
              style={{}}
              title={t("report.total_payments")}
              color="#FF5630"
              value={20}
              inc={"+100"}
            />
            <PredictorCard
              style={{}}
              title={t("report.total_user_active")}
              color="#38CB89"
              value={1}
              inc={"+100"}
            />
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>
          <GraphCard id={user?.documentId} />
        </View>
        <View style={{ marginTop: 10 }}>
          {/* <TabSelector
            containerStyle={styles.container3}
            dropDownButton={true}
            barColor={"#07504B"}
            style={{ backgroundColor: "" }}
            textStyle={styles.textStyle1}
            tabs={[
              t("report.po_reports"),
              t("report.payment_reports"),
              t("report.user_active_reports"),
            ]}
            onSelect={(tab) => setSelectedTab(tab)}
            selectedTab={selectedTab}
          /> */}
        </View>
        <View style={{ marginTop: 5 }}>
          {/* <Indicator></Indicator> */}
          {/* <CompanyTable
            showActions={true}
            checkbox={true}
            pagination={true}
            DATA={DATA}
          ></CompanyTable> */}
        </View>
      </ScrollView>
      <CreateModal
        create={true}
        visible={ModalOpen}
        title="Create"
        onClose={() => setModalOpen(false)}
        onSubmit={() => { }}
        desctext=""
      />
    </>
  );
};

export default Report;
