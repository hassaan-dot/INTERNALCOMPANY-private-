import { useGetEmployees } from "@/hooks/useEmployee";
import { useModalStore } from "@/store/useModalStore";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import {
  DateTimeSelector,
  MultiSelectDropdown,
  SingleSelectDropDown,
} from "../..";
import { icons } from "../../../Resources";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
// import { formatISODate } from "@/src/utils";

interface ClientModalProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  invoice: boolean;
  styleContainer: any;
  title: string;
  onClose: () => void;
  onSubmit: any;
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

// Validation schema
const requestSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  standing: yup.string().required("Priority selection is required"),
  users: yup.array().min(0, "At least one user must be selected"),
  perform_on: yup.string().required("Date/time selection is required"),
});

const CreateModal: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  create = false,
  onSubmit,
  desc = false,
  modalContainerprop,
}) => {
  const { rowData } = useModalStore();
  const { data: UserApi, isPending, error } = useGetEmployees();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  type Item = {
    value: string;
    label: any;
  };

  const items: Item[] = [
    { value: "Priority", label: "Priority" },
    { value: "Normal", label: "Normal" },
  ];

  const [date, setDate] = useState<any>(rowData?.perform_on ?? "");
  const [selectedUsers, setSelectedUsers] = useState<any[]>(
    rowData?.users || []
  );
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
      users: selectedUsers ? selectedUsers : rowData?.users || [],
    }));
  }, [selectedUsers]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      perform_on: date ? date : rowData?.perform_on || "",
    }));
  }, [date]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = async () => {
    try {
      await requestSchema.validate(formData, { abortEarly: false });
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
    setTouched({
      title: true,
      description: true,
      standing: true,
      users: true,
      perform_on: true,
    });

    const isValid = await validateForm();
    if (isValid) {
      onSubmit(formData);
    }
  };

  const transformUsersToDropdownItems = (users: any[]) => {
    if (!users) return [];
    return users.map((user) => ({
      value: `${user?.first_name} ${user?.last_name}`,
      key: user?.documentId,
    }));
  };

  const userDropdownItems = transformUsersToDropdownItems(UserApi?.data || []);

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

            <View style={{ marginBottom: 5 }}>
              <InputField
                title={"Title"}
                placeholder={"Enter title"}
                value={formData.title}
                onChangeText={(text) => handleInputChange("title", text)}
                onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                titleStyle={styles.fontSize}
                inputStyle={[styles.input, { paddingVertical: 8 }]}
                error={touched.title && errors.title}
                errorMessage={touched.title && errors.title}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View style={{ marginBottom: 5 }}>
              <InputField
                title={"Description"}
                placeholder={"Request Description"}
                value={formData.description}
                onChangeText={(text) => handleInputChange("description", text)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, description: true }))
                }
                titleStyle={styles.fontSize}
                inputStyle={[
                  styles.input,
                  {
                    paddingVertical: 8,
                  },
                ]}
                multiline={true}
                ispassword={false}
                error={touched.description && errors.description}
                errorMessage={touched.description && errors.description}
                placeholderTextColor="#757575"
              />
            </View>

            <View style={{ marginBottom: 5 }}>
              <SingleSelectDropDown
                title={"Select Priority"}
                selected={formData.standing}
                setSelected={(val) => handleInputChange("standing", val)}
                items={items}
                error={touched.standing && errors.standing}
              />
            </View>

            <View style={{ marginBottom: 5 }}>
              <MultiSelectDropdown
                title="Select Users"
                items={userDropdownItems}
                selectedItems={selectedUsers}
                setSelectedItems={setSelectedUsers}
                error={touched.users && errors.users}
                onBlur={() => setTouched((prev) => ({ ...prev, users: true }))}
                defaultSelectedItems={rowData?.userSelection ?? []}
              />
            </View>

            <View style={{ marginBottom: 12 }}>
              <DateTimeSelector
                onDateChange={(date) => {
                  setDate(date);
                  setTouched((prev) => ({ ...prev, perform_on: true }));
                  clearError("perform_on");
                }}
                title={"Select Date/Time:"}
                error={touched.perform_on && errors.perform_on}
                selectedDate={date}
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
                Object.keys(errors).length > 0 && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              // disabled={Object.keys(errors).length > 0}
            >
              <Text style={styles.addText}>
                {create ? "Create Request" : "Send Reminder"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;
