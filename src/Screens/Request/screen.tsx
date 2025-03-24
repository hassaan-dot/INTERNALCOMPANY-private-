import React, { useState } from "react";
import { View } from "react-native";
import { ScreenHeader, CompanyTable } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
// import Add_PO from "../../Screens/PO_Add/screen";
import { useNavigation } from "@react-navigation/native";
import {generateData} from '../../utils/Props/TableDataUserManagemenr/props'
import {styles} from './styles'
import { useRouter } from "expo-router";
const Request: React.FC<{ route: any }> = ({ route }) => {
  
  const DATA= generateData();

  const navigation = useNavigation()
  const [ModalOpen, setModalOpen] = useState(false);
  function Create() {
    return navigation.navigate('Request Details')
  }
  const router = useRouter()
  const onClickEye = (username:string, id: number) => {
    router.push(`/(app)/request/request-details?username=${username}&id=${id}`)
  }
  return (
    <>
      
      <View style={styles.container}>
      <ScreenHeader
        create={true}
        // filter={true}
        title={'Request List'}
        onPress={Create}
      ></ScreenHeader>

        <View>
          <CompanyTable
            col1={"Transaction ID"}
            col2={"Date of Invoice"}
            col3={"Recipient"}
            col4={"Amount"}
            col5={"Action"}
            checkbox={true}
            // showStatus={true}
            DATA={DATA}
            showActions={true}
            pagination={true}
            showEye={true}
            onClickEye={onClickEye}

            
          ></CompanyTable>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default Request;
