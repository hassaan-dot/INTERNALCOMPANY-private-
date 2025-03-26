import React, { useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { MobileScreenHeader } from "@/src/Components";
import { Admineader } from "@/src/Components";
import {
  CardSection,
  NewsModal,
  PredictorCard,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";

const Dashboard = () => {
  const isMobileView = Platform.OS == "ios" || Platform.OS == "android";
  const [isVisisble, setIsVisible] = useState(false);
  function Activate() {
    setIsVisible(true);
  }
  function deActivate() {
    setIsVisible(false);
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
              <Admineader></Admineader>
            </View>
          )}
          <View>
            <ScreenHeader title={"Dashboard"}></ScreenHeader>
          </View>
        </View>

        <View style={[styles.container2]}>
          <View style={[styles.container5, isMobileView && styles.container7]}>
            <PredictorCard
              style={styles.container6}
              color={"#38CB89"}
            ></PredictorCard>

            <PredictorCard
              style={styles.container6}
              color={"#FFA600"}
            ></PredictorCard>
          </View>

          <View style={[styles.container5]}>
            <PredictorCard
              style={styles.container6}
              color={"#FF5630"}
            ></PredictorCard>
            <PredictorCard
              style={styles.container6}
              color={"#38CB89"}
            ></PredictorCard>
          </View>
        </View>
        <View style={styles.container3}>
          <CardSection onPress={Activate} OnCancel={deActivate}></CardSection>
        </View>
      </ScrollView>
      <NewsModal onClose={deActivate} isVisible={isVisisble}></NewsModal>
    </>
  );
};

export default Dashboard;
