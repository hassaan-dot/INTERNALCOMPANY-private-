import React, { useState } from "react";
import { View } from "react-native";
import { ScreenHeader, POForm } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { useNavigation } from "@react-navigation/native";
import Styles from './styles'
const PO_Add: React.FC<{ route: any }> = ({ route }) => {
  const navigation=useNavigation()
  const [ModalOpen, setModalOpen] = useState(false);
  function onPressfunc() {
    return navigation.navigate('POdetails')
    }
  return (
    <>
      <View
        style={Styles.container}
      >
        <ScreenHeader title={route.name}></ScreenHeader>
        <View style={Styles.container2}>
          <POForm onPress={onPressfunc}></POForm>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PO_Add;
