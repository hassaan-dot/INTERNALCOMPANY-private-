import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { POForm, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import Styles from "./styles";
const PO_AddScreen: React.FC<{ route: any }> = ({ route }) => {
  const [ModalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const onClickEye = (username: string, id: number) => {
    router.push(
      `/(app)/po-management/po-details?username=${username}&id=${id}`
    );
  };
  return (
    <>
      <View style={Styles.container}>
        <ScreenHeader title={"Add PO"}></ScreenHeader>
        <View style={Styles.container2}>
          <POForm onPress={onClickEye}></POForm>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PO_AddScreen;
