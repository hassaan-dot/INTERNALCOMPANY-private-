import React, { useMemo } from "react";
import { View } from "react-native";
import { CompanyTable, ScreenHeader } from "../../Components";
// import Add_PO from "../../Screens/PO_Add/screen";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import {
  useCreateRequest,
  useDeleteRequest,
  useGetRequest,
  useUpdateRequest,
} from "@/hooks/useRequest";
import { useGetUser } from "@/hooks/useUser";
import { formatDateForAPI } from "@/services/dateFormatter";
import CreateRequestModal from "@/src/Components/Modals/createRequestModal/component";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "expo-router";
import { Requests_columns_schema } from "../ClientManagement/_schema";
import { styles } from "./styles";
import { formatDate } from "@/src/utils";

const Request = () => {
  const { data, refetch } = useGetRequest();
  useRefreshOnFocus(refetch);

  const requestData = useMemo(() => {
    return {
      data: data?.data?.map((item: any) => ({
        ...item,
        perform_on: formatDate(item?.perform_on),
      })),
      meta: data?.meta,
    };
  }, [data]);

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
    request_status,
  }: any) => {
    if (!standing) return;

    const data = {
      data: {
        title: title,
        description: description,
        perform_on: new Date(perform_on),
        standing: standing,
        users: users,
        request_status: request_status,
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
    request_status,
  }: any) => {
    const data = {
      data: {
        title,
        description,
        perform_on: formatDateForAPI(perform_on),
        standing,
        users,
        request_status,
      },
    };
    handleAdd(data);
  };

  const onPressEdit = ({
    title,
    description,
    perform_on,
    standing,
    users,
    documentId,
    request_status,
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
      request_status,
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

  const handleSubmit = (formData: any) => {
    if (rowData?.isEdit) onPressUpdatefunction(formData);
    else onPressAddfunction(formData);
  };
  const onOpenModal = () => {
    setIsRequestModalOpen(true);
    setRowData(null);
  };
  const onCloseModal = () => {
    setIsRequestModalOpen(false);
    setRowData(null);
  };

  const onClickEye = ({ documentId }: any) => {
    router.push(`/(app)/request/request-details?id=${documentId}`);
  };
  return (
    <>
      <View style={styles.container}>
        <ScreenHeader
          create={true}
          title={"Request List"}
          onPress={onOpenModal}
          filter={true}
        />

        <View>
          <CompanyTable
            columns_schema={Requests_columns_schema}
            checkbox={true}
            onPressUpdate={onPressEdit}
            onPressDelete={onPressDelete}
            DATA={requestData}
            showActions={true}
            pagination={true}
            showEye={true}
            showDel={true}
            showEdit={true}
            showStatus={true}
            showDocument={false}
            onClickEye={onClickEye}
          />
        </View>
      </View>
      {isRequestModalOpen && (
        <CreateRequestModal
          onSubmit={handleSubmit}
          onClose={onCloseModal}
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
