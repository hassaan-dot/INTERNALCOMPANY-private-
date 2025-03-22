import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  CardSection,
  NewsModal,
  PredictorCard,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";

const Dashboard = () => {
  const [isVisisble, setIsVisible] = useState(false);
  function Activate() {
    setIsVisible(true);
  }
  function deActivate() {
    setIsVisible(false);
  }
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.container4}>
        <ScreenHeader title={"Dashboard"}></ScreenHeader>

        </View>
        <View></View>
        <View style={styles.container2}>
          <PredictorCard color={"#38CB89"}></PredictorCard>
          <PredictorCard color={"#FFA600"}></PredictorCard>
          <PredictorCard color={"#FF5630"}></PredictorCard>
          <PredictorCard color={"#38CB89"}></PredictorCard>
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
