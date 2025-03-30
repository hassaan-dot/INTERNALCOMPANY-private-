import { useDeletePO, useGetPO } from "@/hooks/usePO";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { CompanyTable, ScreenHeader } from "../../Components";
import CreateModal from "../../Components/Modals/createModal/component";
import { Po_Schema } from "../ClientManagement/_schema";
import Styles from "./styles";
import { useAuthStore } from "@/store/useAuthStore";
import { ROLE } from "@/constants/role";
import { DEPARTMENT } from "@/constants/department";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";

const PO_Management = () => {
  const { user } = useAuthStore();
  const [ModalOpen, setModalOpen] = useState(false);

  const { data, isPending, error, refetch } = useGetPO();
  useRefreshOnFocus(refetch);

  const { mutate: DeletePO } = useDeletePO();

  const onClickEye = ({ documentId, id }: any) => {
    router.push(`/(app)/po-management/po-details?id=${documentId}`);
  };

  const router = useRouter();

  const Handlenavigation = (username: string, id: number) => {
    router.push(`/(app)/po-management/po-add`);
  };
  const onPressDelete = (documentId: string) => {
    const data = {
      data: {
        documentId: documentId,
      },
    };
    DeletePO(data);
  };

  return (
    <>
      <View style={Styles.container}>
        <ScreenHeader
          create={true}
          filter={true}
          onPress={Handlenavigation}
          title={"Purchasing Orders"}
          showButton={
            (user?.role?.name === ROLE.EMPLOYEE &&
              user.department.name === DEPARTMENT.SALES) ||
            user?.role?.name === ROLE.ADMIN
          }
        ></ScreenHeader>

        <View>
          <CompanyTable
            columns_schema={Po_Schema}
            checkbox={true}
            showActions={true}
            showEye={true}
            showStatus={true}
            DATA={data}
            pagination={true}
            onPressDelete={onPressDelete}
            onClickEye={onClickEye}
          ></CompanyTable>
        </View>
      </View>
      <CreateModal create={true} visible={ModalOpen}></CreateModal>
    </>
  );
};

export default PO_Management;
