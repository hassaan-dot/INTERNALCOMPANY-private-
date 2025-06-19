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
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const isMobileView = Platform.OS === "ios" || Platform.OS === "android";
  const { data, refetch } = useGetDashboardStats();
  useRefreshOnFocus(refetch);

  const { isNewsModalOpen, setIsNewsModalOpen } = useModalStore();
  const Activate = () => setIsNewsModalOpen(true);
  const deActivate = () => setIsNewsModalOpen(false);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container]}
      >
        <View style={styles.container4}>
          {isMobileView && (
            <View>
              <Admineader
                profileImage="https://randomuser.me/api/portraits/men/1.jpg"
                name="Admin User"
                userType="Administrator"
                desc="System Administrator"
                onMenuPress={() => { }}
              />
            </View>
          )}
          <View>
            <ScreenHeader title={t("dashboard.title")} />
          </View>
        </View>

        <View style={[styles.container2]}>
          <View style={[styles.container5, isMobileView && styles.container7]}>
            <PredictorCard
              style={styles.container6}
              color={"#38CB89"}
              title={t("dashboard.total_paid_po")}
              value={data?.total_paid_po?.count}
              inc={data?.total_paid_po?.increment}
            />
            <PredictorCard
              style={styles.container6}
              color={"#FFA600"}
              title={t("dashboard.in_progress_po")}
              value={data?.total_inprogress_po?.count}
              inc={data?.total_inprogress_po?.increment}
            />
          </View>
          <View style={[styles.container5]}>
            <PredictorCard
              style={styles.container6}
              color={"#FF5630"}
              title={t("dashboard.over_due_po")}
              value={data?.total_overdue_po?.count}
              inc={data?.total_overdue_po?.increment}
            />
            <PredictorCard
              style={styles.container6}
              color={"#38CB89"}
              title={t("dashboard.total_po")}
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
