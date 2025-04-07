import { useGetDepartments } from "@/hooks/useDepartments";
import { useGetuserRole } from "@/hooks/userRole";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SingleSelectDropDown } from "../..";
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
  onLogin?: (username: string, password: string) => void;
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
  onPressUpdatefunction: any;
  isLogin?: boolean; // Flag to indicate if this is a login modal
}

const CreateUserModal: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  onSubmit,
  create = false,
  title,
  desc = false,
  styleContainer,
  First,
  desctext,
  Firstchild,
  Second,
  Third,
  modalContainerprop,
  isLogin = false, // Default to false
}) => {
  const { data: GetDepartments } = useGetDepartments();
  const { data: getRoles } = useGetuserRole();

  const { rowData } = useModalStore();
  const [formData, setFormData] = useState(
    rowData ?? {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      role: "",
      department: "",
    }
  );

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const transformdepsToDropdownItems = (deps: any[]) => {
    if (!deps) return [];
    return deps.map((dep) => ({
      value: `${dep?.name} `,
      key: dep?.id,
    }));
  };
  const transformRolesToDropdownItems = (roles: any[]) => {
    if (!roles) return [];
    return roles.map((role) => ({
      value: `${role?.name} `,
      key: role?.id,
    }));
  };

  const depsDropdownItems = transformdepsToDropdownItems(
    GetDepartments?.data || []
  );
  const rolesDropdownItems = transformRolesToDropdownItems(
    getRoles?.roles || []
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <View>
            {create && (
              <>
                <Image
                  source={icons.modalIconOtp}
                  style={{ width: 60, height: 60 }}
                />
                <Text style={styles.title}>{title}</Text>
              </>
            )}

            {!create && !isLogin && (
              <Text style={styles.title}>Send Payment Reminder</Text>
            )}

            {isLogin && <Text style={styles.title}>Login</Text>}

            {desc && <Text style={styles.subtitle}>{desctext}</Text>}
          </View>

          <ScrollView
            contentContainerStyle={
              {
                // backgroundColor: "red",
              }
            }
          >
            <View style={[styleContainer]}>
              <InputField
                title={First}
                placeholder={First}
                value={formData.first_name}
                onChangeText={(text) => handleInputChange("first_name", text)}
                style={styles.input}
                titleStyle={styles.fontSize}
              />

              <View style={{ marginLeft: 7 }}>
                <InputField
                  title={Firstchild}
                  placeholder={Firstchild}
                  value={formData.last_name}
                  onChangeText={(text) => handleInputChange("last_name", text)}
                  style={styles.input}
                  titleStyle={styles.fontSize}
                />
              </View>
            </View>

            <View>
              <InputField
                title={Second}
                placeholder={Second}
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>

            <View>
              <InputField
                title={"User Name"}
                placeholder={"Username"}
                value={formData.username}
                onChangeText={(text) => handleInputChange("username", text)}
                titleStyle={styles.fontSize}
                style={styles.input}
              />
            </View>

            {!rowData?.isEdit && (
              <View>
                <InputField
                  title={"Password"}
                  placeholder={"Password"}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  titleStyle={styles.fontSize}
                  style={styles.input}
                />
              </View>
            )}

            <View>
              <InputField
                titleStyle={styles.fontSize}
                title={Third}
                value={formData.phone_number}
                onChangeText={(text) => handleInputChange("phone_number", text)}
                placeholder={Third}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
            <View style={{ marginBottom: 5 }}>
              <SingleSelectDropDown
                items={rolesDropdownItems}
                title="Select Role"
                selected={rowData?.isEdit ? rowData?.role_name : ""}
                setSelected={(key) => handleInputChange("role", key)}
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <SingleSelectDropDown
                items={depsDropdownItems}
                title="Select Department"
                selected={rowData?.isEdit ? rowData?.department_name : ""}
                setSelected={(key) => handleInputChange("department", key)}
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
                // !validateForm() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              // disabled={!validateForm()}
            >
              <Text style={styles.addText}>
                {rowData?.isEdit ? "Edit User" : "Add User"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateUserModal;
