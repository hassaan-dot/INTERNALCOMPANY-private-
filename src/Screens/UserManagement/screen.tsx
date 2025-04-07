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

const UserManagement = () => {
  const { isUserModalOpen, setIsUserModalOpen, rowData, setRowData } =
    useModalStore();

  const [AttendenceModalOpen, setAttendenceModalOpen] = useState(false);

  const { data, isPending, error, refetch } = useGetUser();
  useRefreshOnFocus(refetch);

  const router = useRouter();

  const { mutate: handleAdd } = useCreateUser();

  const { mutate: handleUpdate } = useUpdateUser();

  const { mutate: handleDelete } = useDeleteUser();

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
    const data = {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      role,
      department,
    };

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
  const onCliclTimeFunc = () => {
    setAttendenceModalOpen(true);
  };
  const onCliclTimeFuncClose = () => {
    setAttendenceModalOpen(false);
  };

  const onClickEye = ({ id }: any) => {
    router.push(`/(app)/user-management/user-details?id=${id}`);
  };
  return (
    <>
      <View style={styles.container1}>
        <ScreenHeader
          create={true}
          title={"User Management"}
          onPress={onOpenModal}
        />

        <View>
          <CompanyTable
            columns_schema={User_columns_schema}
            showActions={true}
            checkbox={true}
            pagination={true}
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
        </View>
      </View>

      <AttendenceModal
        onSubmit={onCliclTimeFuncClose}
        clockIn={true}
        title={"Attendence"}
        isVisible={AttendenceModalOpen}
      />

      {isUserModalOpen && (
        <CreateUserModal
          onClose={onCloseModal}
          onSubmit={handleSubmit}
          First="First Name"
          Firstchild="Last name"
          Second="Email Address"
          Third="Phone number"
          desc={true}
          desctext="Add your new users details"
          styleContainer={{ flexDirection: "row" }}
          create={true}
          visible={isUserModalOpen}
          title={"Create User"}
          user={true}
          ninth={"Departmment"}
        />
      )}
    </>
  );
};

export default UserManagement;
