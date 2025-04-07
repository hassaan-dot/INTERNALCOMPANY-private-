import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { POForm, ScreenHeader } from "../../Components";
import Styles from "./styles";
import { useModalStore } from "@/store/useModalStore";

const PO_AddScreen = () => {
  const router = useRouter();
  const { rowData } = useModalStore();
  const onClickEye = (username: string, id: number) => {
    router.push(
      `/(app)/po-management/po-details?username=${username}&id=${id}`
    );
  };
  return (
    <>
      <View style={Styles.container}>
        <ScreenHeader title={rowData?.isEdit ? "Update PO" : "Add PO"} />
        <ScrollView style={Styles.container2}>
          <POForm onPress={onClickEye}></POForm>
        </ScrollView>
      </View>
    </>
  );
};

export default PO_AddScreen;
