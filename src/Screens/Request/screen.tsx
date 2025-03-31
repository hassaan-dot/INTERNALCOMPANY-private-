import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CompanyTable, ScreenHeader } from "../../Components";
// import Add_PO from "../../Screens/PO_Add/screen";
import {
  useCreateRequest,
  useDeleteRequest,
  useGetOneRequest,
  useGetRequest,
  useUpdateRequest,
} from "@/hooks/useRequest";
import { useGetUser } from "@/hooks/useUser";
import CreateRequestModal from "@/src/Components/Modals/createRequestModal/component";
import { useModalStore } from "@/store/useModalStore";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Requests_columns_schema } from "../ClientManagement/_schema";
import { UserStore } from "../UserManagement/usershook";
import { styles } from "./styles";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { formatDate } from "@/src/utils";
import { formatDateForAPI } from "@/services/dateFormatter";
const Request: React.FC<{ route: any }> = ({ route }) => {
  const { data, refetch } = useGetRequest();

  const {
    data: UserApi,
    isPending,
    error,
    refetch: handleUserRefetch,
  } = useGetUser();

  useRefreshOnFocus(refetch);
  useRefreshOnFocus(handleUserRefetch);

  const { mutate: handleAdd } = useCreateRequest();
  const { mutate: handleDelete } = useDeleteRequest();

  const router = useRouter();
  const { setIsRequestModalOpen, isRequestModalOpen, setRowData, rowData } =
    useModalStore();

  const { mutate: handleUpdate } = useUpdateRequest();

  const onPressUpdatefunction = ({
    title,
    description,
    perform_on,
    standing,
    users,
    documentId,
  }: any) => {
    if (!standing) return;

    const data = {
      data: {
        title: title,
        description: description,
        perform_on: perform_on,
        standing: standing,
        users: users,
      },
    };
    handleUpdate({ data, id: documentId });
  };

  const onPressAddfunction = ({
    title,
    description,
    perform_on,
    standing,
    users,
  }: any) => {
    const data = {
      data: {
        title,
        description,
        perform_on: formatDateForAPI(perform_on),
        standing,
        users,
      },
    };
    console.log("datafrom requests", data);
    handleAdd(data);
  };

  function Create() {
    // router.push(`/(app)/request/request-details`);

    setIsRequestModalOpen(true);
  }

  const onPressEdit = ({
    title,
    description,
    perform_on,
    standing,
    users,
    documentId,
  }: any) => {
    const data = {
      title,
      description,
      perform_on,
      standing,
      users: users?.map((u: any) => u.documentId),
      userSelection: users?.map((u: any) => ({
        key: u.documentId,
        label: `${u.first_name}${u.last_name}  `,
      })),
      documentId,
      isEdit: true,
    };
    setRowData(data);
    setIsRequestModalOpen(true);
  };
  const onPressDelete = (documentId: string) => {
    const data = {
      data: {
        documentId: documentId,
      },
    };
    handleDelete(data);
  };
  const onOpenModal = () => {
    setIsRequestModalOpen(true);
  };
  const handleSubmit = (formData: any) => {
    if (rowData?.isEdit) onPressUpdatefunction(formData);
    else onPressAddfunction(formData);
  };
  const onCloseModal = () => {
    setIsRequestModalOpen(false);
    setRowData(null);
  };
  // const onClickEye = ({ title, documentId }: any) => {
  //   const data = {
  //     data: {
  //       title,
  //     },
  //   };
  //   setRowData({ title, documentId });
  //   handleGetOne({ data, documentId });

  //   // router.push(`/(app)/request/request-details?username=${username}&id=${id}`);
  // };

  const onClickEye = ({ documentId }: any) => {
    router.push(`/(app)/request/request-details?id=${documentId}`);
    // router.push(`/(app)/request/request-details?username=${username}&id=${id}`);
  };
  return (
    <>
      <View style={styles.container}>
        <ScreenHeader
          create={true}
          // filter={true}
          title={"Request List"}
          onPress={Create}
        />

        <View>
          <CompanyTable
            columns_schema={Requests_columns_schema}
            checkbox={true}
            onPressUpdate={onPressEdit}
            onPressDelete={onPressDelete}
            DATA={data}
            showActions={true}
            pagination={true}
            showEye={true}
            onClickEye={onClickEye}
          ></CompanyTable>
        </View>
      </View>
      {isRequestModalOpen && (
        <CreateRequestModal
          onSubmit={handleSubmit}
          onClose={() => setIsRequestModalOpen(false)}
          // onPressUpdatefunction={onPressUpdatefunction}
          desc={true}
          styleContainer={{ flexDirection: "row" }}
          create={true}
          visible={isRequestModalOpen}
          user={true}
        />
      )}
    </>
  );
};

export default Request;
