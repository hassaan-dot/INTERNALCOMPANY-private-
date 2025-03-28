import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGetUser } from "@/hooks/useUser";
import { UserStore } from "@/src/Screens/UserManagement/usershook";
import { useModalStore } from "@/store/useModalStore";
import {
  CustomDropdownIndicator,
  DateTimeSelector,
  MultiSelectDropdown,
} from "../..";
import { icons } from "../../../Resources";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";

interface ClientModalProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  invoice: boolean;
  styleContainer: any;
  title: string;
  onClose: () => void;
  onSubmit: (
    companyName?: string,
    email?: string,
    contactPerson?: string,
    phoneNumber?: string
  ) => void;
  First: string;
  Firstchild: string;
  Second: string;
  Third: string;
  Fourth: string;
  Fifth: string;
  Sixth: string;
  seventh: string;
  eigth: string;
  ninth: string;
  desctext: string;
  user: boolean;
  modalContainerprop: any;
  Data: any;
  deleteD: boolean;
  update: boolean;
}

const CreateModal: React.FC<ClientModalProps> = ({
  visible,
  user,
  onClose,
  create = false,
  deleteD = false,
  onSubmit,
  title,
  desc = false,
  invoice = false,
  styleContainer,
  First,
  desctext,
  Firstchild,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  seventh,
  eigth,
  ninth,
  modalContainerprop,
}) => {
  const { rowData } = useModalStore();
  const { data: UserApi, isPending, error } = useGetUser();

  type Item = {
    value: string;
    label: any;
  };

  const items: Item[] = [
    { value: "Priority", label: "Priority" },
    { value: "Normal", label: "Normal" },
  ];

  const [date, setDate] = useState<any>("");
  const setDatefunction = (date: any) => {};
  const [selectedUsers, setSelectedUsers] = useState([]);

  // const handleSubmit = (formData: any) => {
  //   if (rowData?.isEdit) onPressUpdatefunction(formData);
  //   else onPressAddfunction(formData);
  // };

  const [formData, setFormData] = useState(
    rowData ?? {
      title: "",
      description: "",
      perform_on: "",
      standing: "",
      users: [],
    }
  );
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      users: selectedUsers ? selectedUsers : rowData.users,
    }));
  }, [selectedUsers]);
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      perform_on: date ? date : rowData?.perform_on,
    }));
  }, [date]);

  const handleSubmit = () => {
    onSubmit(formData);
  };
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const transformUsersToDropdownItems = (users: any[]) => {
    return (
      users?.map((user) => ({
        value: `${user?.first_name} ${user?.last_name}`,
        key: user?.id,
        original: user,
      })) || []
    );
  };
  const userDropdownItems = transformUsersToDropdownItems(UserApi);

  const validateForm = () => {
    // if (create) {
    //   return (
    //     formData.contact_person_name.trim() !== "" &&
    //     formData.email.trim() !== "" &&
    //     formData.phone_number.trim() !== "" &&
    //     formData.company_name.trim() !== ""
    //   );
    // }
    return true;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {create && (
                <>
                  <Image source={icons.modalIconOtp} style={styles.modalIcon} />
                  <Text style={styles.title}>Create Request</Text>
                </>
              )}

              {!create && (
                <Text style={styles.title}>Send Payment Reminder</Text>
              )}

              {desc && (
                <Text style={styles.subtitle}>
                  {"Add your new request as new details"}
                </Text>
              )}
            </View>

            <View style={{}}>
              <InputField
                title={"Title"}
                placeholder={"Enter title"}
                value={formData.title}
                onChangeText={(text) => handleInputChange("title", text)}
                titleStyle={styles.fontSize}
                style={[styles.input, { paddingVertical: 8 }]}
              />
            </View>

            <View>
              <InputField
                titleStyle={styles.fontSize}
                title={"description"}
                multiline={formData?.description?.length > 50}
                value={formData.description}
                onChangeText={(text) => handleInputChange("description", text)}
                placeholder={"Request Description"}
                style={[styles.input, { paddingVertical: 8 }]}
              />
            </View>
            <View>
              <DateTimeSelector
                // Date={date}
                onDateChange={(date) => setDate(date)}
                // setDate={setDate}
                title="Select Date/Time:"
              ></DateTimeSelector>
            </View>

            <View>
              <CustomDropdownIndicator
                title={"Role"}
                Role={formData.standing}
                SetRole={(val) => handleInputChange("standing", val)}
                items={items}
              />
            </View>

            <View>
              <MultiSelectDropdown
                title="Select Users"
                items={userDropdownItems}
                selectedItems={selectedUsers}
                setSelectedItems={setSelectedUsers}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                !validateForm() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              // disabled={!validateForm()}
            >
              <Text style={styles.addText}>
                {create
                  ? rowData?.isEdit
                    ? "Update Client"
                    : "Add Client"
                  : "Update Client"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;
