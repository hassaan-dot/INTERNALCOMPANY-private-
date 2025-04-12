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
import { icons } from "@/assets/icons/icons";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
import * as yup from "yup";

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
  desctext: string;
  user: boolean;
  modalContainerprop: any;
  Data: any;
  update: boolean;
  onPressUpdatefunction: any;
}

const CreateUserModal: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  onSubmit,
  create = false,
  title,
  desc = false,
  styleContainer,
  desctext,
  modalContainerprop,
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

  const userSchema = yup.object().shape({
    first_name: yup.string().required("required").min(1, "required"),
    last_name: yup.string().required("required").min(1, "required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number can only contain numbers")
      .min(10, "Phone number must be at least 10 digits"),
    role: yup.string().required("Required").min(1, "required"),
  });

  const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field);
  };

  const validateForm = async () => {
    const schema = create || !rowData?.isEdit ? userSchema : loginSchema;

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const allFields = {
      first_name: true,
      last_name: true,
      email: true,
      username: true,
      password: true,
      phone_number: true,
      role: true,
      department: true,
    };

    setTouched(allFields);
    const isValid = await validateForm();

    if (isValid) {
      const finalData = {
        ...formData,
        department: formData.department === "" ? null : formData.department,
      };

      onSubmit(finalData);
    }
  };

  const transformdepsToDropdownItems = (deps: any[]) => {
    const items = (deps || []).map((dep) => ({
      value: `${dep?.name}`,
      key: dep?.id,
    }));
    items.push({ value: "No option", key: "" });
    return items;
  };

  const transformRolesToDropdownItems = (roles: any[]) => {
    const items = (roles || []).map((role) => ({
      value: `${role?.name}`,
      key: role?.id,
    }));
    return items;
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
            <Image
              source={icons.modalIconOtp}
              style={{ width: 60, height: 60 }}
            />
            <Text style={styles.title}>{title}</Text>

            {desc && <Text style={styles.subtitle}>{desctext}</Text>}
          </View>

          <ScrollView>
            <View style={[styleContainer]}>
              <InputField
                title={"First name"}
                placeholder={"First name"}
                value={formData.first_name}
                onChangeText={(text) => handleInputChange("first_name", text)}
                style={[
                  styles.input,
                  { borderColor: errors.first_name ? "red" : "#ddd" },
                ]}
                error={touched.first_name && errors.first_name}
                errorMessage={touched.first_name && errors.first_name}
                titleStyle={styles.fontSize}
              />

              <View style={{ marginLeft: 7 }}>
                <InputField
                  title={"Last name"}
                  placeholder={"last name"}
                  value={formData.last_name}
                  style={[
                    styles.input,
                    { borderColor: errors.last_name ? "red" : "#ddd" },
                  ]}
                  error={touched.last_name && errors.first_name}
                  errorMessage={touched.last_name && errors.last_name}
                  onChangeText={(text) => handleInputChange("last_name", text)}
                  titleStyle={styles.fontSize}
                />
              </View>
            </View>

            <View>
              <InputField
                title={"Email Address"}
                placeholder={"email@example.com"}
                value={formData.email}
                style={[
                  styles.input,
                  { borderColor: errors.email ? "red" : "#ddd" },
                ]}
                error={touched.email && errors.first_name}
                errorMessage={touched.email && errors.email}
                onChangeText={(text) => handleInputChange("email", text)}
                titleStyle={styles.fontSize}
                keyboardType="email-address"
              />
            </View>

            <View>
              <InputField
                title={"User Name"}
                placeholder={"username"}
                value={formData.username}
                onChangeText={(text) => handleInputChange("username", text)}
                titleStyle={styles.fontSize}
                style={[
                  styles.input,
                  { borderColor: errors.username ? "red" : "#ddd" },
                ]}
                error={touched.username && errors.first_name}
                errorMessage={touched.username && errors.username}
              />
            </View>

            {!rowData?.isEdit && (
              <View>
                <InputField
                  title={"Password"}
                  placeholder={"Enter password"}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  titleStyle={styles.fontSize}
                  style={[
                    styles.input,
                    { borderColor: errors.password ? "red" : "#ddd" },
                  ]}
                  error={touched.password && errors.first_name}
                  errorMessage={touched.password && errors.password}
                />
              </View>
            )}

            <View>
              <InputField
                titleStyle={styles.fontSize}
                title={"Phone number"}
                style={[
                  styles.input,
                  { borderColor: errors.phone_number ? "red" : "#ddd" },
                ]}
                error={touched.phone_number && errors.first_name}
                errorMessage={touched.phone_number && errors.phone_number}
                value={formData.phone_number}
                onChangeText={(text) => handleInputChange("phone_number", text)}
                placeholder={"Phone number"}
                keyboardType="phone-pad"
              />
            </View>

            <View style={{ marginBottom: 5 }}>
              <SingleSelectDropDown
                items={rolesDropdownItems}
                title="Select Role"
                selected={rowData?.isEdit ? rowData?.role_name : ""}
                setSelected={(key) => handleInputChange("role", key)}
                error={touched.role && errors.role}
                errorMessage={touched.role && errors.role}
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <SingleSelectDropDown
                items={depsDropdownItems}
                title="Select Department"
                selected={rowData?.isEdit ? rowData?.department_name : ""}
                setSelected={(key) => handleInputChange("department", key)}
                error={touched.department && errors.department}
                errorMessage={touched.department && errors.department}
              />
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
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
