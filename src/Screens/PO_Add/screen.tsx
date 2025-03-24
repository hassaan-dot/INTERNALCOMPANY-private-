import React, { useState } from "react";
import { View } from "react-native";
import { ScreenHeader, POForm } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { useNavigation } from "@react-navigation/native";
import Styles from './styles'
import { useRouter } from "expo-router";
const PO_AddScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation=useNavigation()
  const [ModalOpen, setModalOpen] = useState(false);
  function onPressfunc() {
    return navigation.navigate('POdetails')
    }
    const router = useRouter()
    const onClickEye = (username:string, id: number) => {
      router.push(`/(app)/po-management/po-details?username=${username}&id=${id}`)
    }
  return (
    <>
      <View
        style={Styles.container}
      >
        <ScreenHeader title={'Add PO'}></ScreenHeader>
        <View style={Styles.container2}>
          <POForm onPress={onClickEye}></POForm>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PO_AddScreen;
