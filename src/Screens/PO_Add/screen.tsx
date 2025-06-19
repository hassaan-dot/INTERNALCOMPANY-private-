import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { POForm, ScreenHeader } from "../../Components";
import Styles from "./styles";
import { useModalStore } from "@/store/useModalStore";
import { useTranslation } from "react-i18next";

const PO_AddScreen = () => {
  const router = useRouter();
  const { rowData } = useModalStore();
  const { t } = useTranslation();

  const onClickEye = (username: string, id: number) => {
    router.push(
      `/(app)/po-management/po-details?username=${username}&id=${id}`
    );
  };

  return (
    <View style={Styles.container}>
      <ScreenHeader
        title={rowData?.isEdit ? t("PO.update_po") : t("PO.add_po")}
      />
      <ScrollView style={Styles.container2}>
        <POForm onPress={() => onClickEye("", 0)} />
      </ScrollView>
    </View>
  );
};

export default PO_AddScreen;
