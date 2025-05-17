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
import ConfirmModal from "@/src/Components/ConfirmationModal/ConfirmModal";

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { mutate: handleAdd } = useCreateUser();
  const { mutate: handleUpdate, isPending: isAdding } = useUpdateUser();
  const { mutate: handleDelete, isPending: isUpdating } = useDeleteUser();

  const onPressUpdatefunction = (formData: any) => {
    if (!formData.id) return;
    const data = { ...formData };
    handleUpdate({ data, id: formData.id });
  };

  const onPressAddfunction = (formData: any) => {
    let data = { ...formData };
    if (data.department === "") delete data.department;
    handleAdd(data);
  };

  const handleSubmit = (formData: any) => {
    if (rowData?.isEdit) onPressUpdatefunction(formData);
    else onPressAddfunction(formData);
  };

  const onPressEdit = (user: any) => {
    const data = {
      ...user,
      role: user?.role?.id,
      role_name: user?.role?.name,
      department: user?.department?.id,
      department_name: user?.department?.name,
      isEdit: true,
    };
    setRowData(data);
    setIsUserModalOpen(true);
  };

  const onPressDelete = (documentId: string) => {
    setSelectedUserId(documentId);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      handleDelete({ data: { documentId: selectedUserId } });
      setShowConfirmModal(false);
      setSelectedUserId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedUserId(null);
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

      <ConfirmModal
        visible={showConfirmModal}
        title={t("confirmation.title")}
        message={t("confirmation.delete_user")}
        confirmText={t("confirmation.confirm")}
        cancelText={t("confirmation.cancel")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        confirmColor="#f44336"
      />
    </>
  );
};

export default UserManagement;
