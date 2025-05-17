import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import {
  useCreateUser,
  useDeleteUser,
  useGetUser,
  useUpdateUser,
} from "@/hooks/useUser";
import CreateUserModal from "@/src/Components/Modals/CreateModalUser/component";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { AttendenceModal, CompanyTable, ScreenHeader } from "../../Components";
import { User_columns_schema } from "../ClientManagement/_schema";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";

const UserManagement = () => {
  const { t } = useTranslation();

  const {
    isUserModalOpen,
    setIsUserModalOpen,
    rowData,
    setRowData,
    isAttendenceModalOpen,
    setisAttendenceModalOpen,
  } = useModalStore();

  const { data, isPending, error, refetch } = useGetUser();
  useRefreshOnFocus(refetch);

  const router = useRouter();
  const [currentUser, setcurrentUser] = useState<any>(null);
  const { mutate: handleAdd } = useCreateUser();
  const { mutate: handleUpdate, isPending: isAdding } = useUpdateUser();
  const { mutate: handleDelete, isPending: isUpdating } = useDeleteUser();

  const onPressUpdatefunction = ({
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
    role,
    department,
    id,
  }: any) => {
    if (!id) return;

    const data = {
      first_name,
      last_name,
      username,
      email,
      phone_number,
      role,
      department,
    };

    handleUpdate({ data, id });
  };

  const onPressAddfunction = ({
    first_name,
    last_name,
    username,
    email,
    phone_number,
    password,
    role,
    department,
  }: any) => {
    let data: any = {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      role,
    };
    if (department) {
      data = {
        ...data,
        department,
      };
    }
    handleAdd(data);
  };

  const handleSubmit = (formData: any) => {
    if (rowData?.isEdit) onPressUpdatefunction(formData);
    else onPressAddfunction(formData);
  };

  const onPressEdit = ({
    first_name,
    last_name,
    username,
    email,
    password,
    phone_number,
    role,
    department,
    id,
  }: any) => {
    const data = {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      role: role?.id,
      role_name: role?.name,
      department: department?.id,
      department_name: department?.name,
      id,
      isEdit: true,
    };
    setRowData(data);
    setIsUserModalOpen(true);
  };

  const onPressDelete = (documentId: string, id: any) => {
    const data = {
      data: {
        documentId: id,
      },
    };
    handleDelete(data);
  };

  const onOpenModal = () => {
    setIsUserModalOpen(true);
  };

  const onCloseModal = () => {
    setIsUserModalOpen(false);
    setRowData(null);
  };

  const onCliclTimeFunc = ({ documentId, first_name, last_name }: any) => {
    setisAttendenceModalOpen(true);
    setcurrentUser({ documentId, first_name, last_name });
  };

  const onCliclTimeFuncClose = () => {
    setisAttendenceModalOpen(false);
  };

  const onClickEye = ({ id, documentId }: any) => {
    router.push(
      `/(app)/user-management/user-details?id=${id}&documentId=${documentId}`
    );
  };

  return (
    <>
      <ScrollView style={styles.container1}>
        <ScreenHeader
          create={true}
          title={t("user_management.title")}
          onPress={onOpenModal}
          filter={true}
        />

        <CompanyTable
          columns_schema={User_columns_schema}
          showActions={true}
          checkbox={true}
          DATA={data}
          onPressUpdate={onPressEdit}
          onPressDelete={onPressDelete}
          onClickEye={onClickEye}
          showEye={true}
          onClickTime={onCliclTimeFunc}
          showDel={true}
          showEdit={true}
          showTime={true}
        />
      </ScrollView>

      {isAttendenceModalOpen && (
        <AttendenceModal
          onClose={onCliclTimeFuncClose}
          title={t("user_management.attendance")}
          currentUser={currentUser}
          isVisible={isAttendenceModalOpen}
          name={``}
        />
      )}
      {isUserModalOpen && (
        <CreateUserModal
          onClose={onCloseModal}
          onSubmit={handleSubmit}
          desc={true}
          desctext={t("user_management.add_user_desc")}
          styleContainer={{ flexDirection: "row" }}
          create={true}
          visible={isUserModalOpen}
          title={t("user_management.create_user")}
          user={true}
          isPending={isAdding || isUpdating}
        />
      )}
    </>
  );
};

export default UserManagement;
