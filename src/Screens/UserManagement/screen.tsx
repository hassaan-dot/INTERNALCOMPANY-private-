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
import { CompanyTable, ScreenHeader } from "../../Components";
import { User_columns_schema } from "../ClientManagement/_schema";
import { styles } from "./styles";
import { UserStore } from "./usershook";

const UserManagement = () => {
  const { isUserModalOpen, setIsUserModalOpen, rowData, setRowData } =
    useModalStore();

  const { UserData, setUserData } = UserStore();

  const [ModalOpen, setModalOpen] = useState(false);

  const [AttendenceModalOpen, setAttendenceModalOpen] = useState(false);

  const { data, isPending, error } = useGetUser();

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
    roles,
    department,
    id,
  }: any) => {
    if (!id) return;

    const data = {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      roles,
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
    roles,
    department,
  }: any) => {
    const data = {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      roles,
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
    roles,
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
      roles,
      department,
      id,
      isEdit: true,
    };
    setRowData(data);
    setIsUserModalOpen(true);
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
    setIsUserModalOpen(true);
  };

  const onCloseModal = () => {
    setIsUserModalOpen(false);
    setRowData(null);
  };

  const onClickEye = (username: string, id: number) => {
    router.push(
      `/(app)/user-management/user-details?username=${username}&id=${id}`
    );
  };
  return (
    <>
      <View style={styles.container1}>
        <ScreenHeader
          create={true}
          title={"User Management"}
          onPress={onOpenModal}
        ></ScreenHeader>

        <View>
          <CompanyTable
            columns_schema={User_columns_schema}
            showActions={true}
            checkbox={true}
            pagination={true}
            DATA={data}
            showEye={true}
            onPressUpdate={onPressEdit}
            onPressDelete={onPressDelete}
            onClickEye={onClickEye}
          />
        </View>
      </View>

      {/* <AttendenceModal
        onSubmit={onSubmitFunc}
        clockIn={true}
        title={"Attendence"}
        isVisible={AttendenceModalOpen}
      /> */}

      {isUserModalOpen && (
        <CreateUserModal
          onClose={onCloseModal}
          onSubmit={handleSubmit}
          First="First Name"
          Firstchild="Last name"
          Second="Email Address"
          Third="Phone number"
          Fourth="Roles"
          seventh="Departmnet"
          eigth="Add document/Document"
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
