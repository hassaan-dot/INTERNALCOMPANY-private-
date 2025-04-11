import { useGetDashboardStats } from "@/hooks/useDashboard";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { Admineader } from "@/src/Components";
import { useModalStore } from "@/store/useModalStore";
import React from "react";
import { Platform, ScrollView, View } from "react-native";
import {
  CardSection,
  NewsModal,
  PredictorCard,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";

const Dashboard = () => {
  const isMobileView = Platform.OS == "ios" || Platform.OS == "android";
  const { data, refetch } = useGetDashboardStats();
  useRefreshOnFocus(refetch);

  const { isNewsModalOpen, setIsNewsModalOpen } = useModalStore();
  function Activate() {
    setIsNewsModalOpen(true);
  }
  function deActivate() {
    setIsNewsModalOpen(false);
  }
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container]}
      >
        <View style={styles.container4}>
          {isMobileView && (
            <View>
              <Admineader />
            </View>
          )}
          <View>
            <ScreenHeader title="Dashboard" />
          </View>
        </View>

        <View style={[styles.container2]}>
          <View style={[styles.container5, isMobileView && styles.container7]}>
            <PredictorCard
              style={styles.container6}
              color={"#38CB89"}
              title={"Total Paid PO"}
              value={data?.total_paid_po?.count}
              inc={data?.total_paid_po?.increment}
            />
            <PredictorCard
              style={styles.container6}
              color={"#FFA600"}
              title={"In Progress PO"}
              value={data?.total_inprogress_po?.count}
              inc={data?.total_inprogress_po?.increment}
            />
          </View>
          <View style={[styles.container5]}>
            <PredictorCard
              style={styles.container6}
              color={"#FF5630"}
              title={"Over Due PO"}
              value={data?.total_overdue_po?.count}
              inc={data?.total_overdue_po?.increment}
            />
            <PredictorCard
              style={styles.container6}
              color={"#38CB89"}
              title={"Total PO"}
                value={data?.total_po?.count}
                inc={data?.total_po?.increment}
            />
          </View>
        </View>
        <View style={styles.container3}>
          <CardSection onPress={Activate} OnCancel={deActivate} />
        </View>
      </ScrollView>
      {isNewsModalOpen && (
        <NewsModal onClose={deActivate} isVisible={isNewsModalOpen} />
      )}
    </>
  );
};

export default Dashboard;
