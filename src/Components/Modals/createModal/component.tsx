import { useModalStore } from "@/store/useModalStore";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { icons } from "../../../Resources";
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

const clientSchema = yup.object().shape({
  company_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email address is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must be in format: user@example.com"
    ),
  contact_person_name: yup
    .string()
    .required("Contact person name is required")
    .min(2, "Contact name must be at least 2 characters"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number can only contain numbers")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be longer than 15 digits"),
});

const CreateModal: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  onSubmit,
  create = false,
  desc = false,
  styleContainer,
  First,
  desctext,
  Second,
  Third,
  Fourth,
  modalContainerprop,
}) => {
  const { rowData } = useModalStore();
  const [formData, setFormData] = useState(
    rowData ?? {
      email: "",
      contact_person_name: "",
      company_name: "",
      phone_number: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setTouched((prev) => ({ ...prev, [field]: true }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    clientSchema
      .validateAt(field, formData)
      .then(() => {
        if (errors[field]) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      })
      .catch((err) => {
        setErrors((prev) => ({
          ...prev,
          [field]: err.message,
        }));
      });
  };

  const validateForm = async () => {
    try {
      await clientSchema.validate(formData, { abortEarly: false });
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
      company_name: true,
      email: true,
      contact_person_name: true,
      phone_number: true,
    });

    const isValid = await validateForm();
    console.log("isValid", isValid);
    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View>
              {create && (
                <>
                  <Image
                    source={icons.modalIconOtp}
                    style={{ width: 60, height: 60 }}
                  />
                  <Text style={styles.title}>
                    {rowData?.isEdit ? "Update" : "Create"} Client
                  </Text>
                </>
              )}

              {desc && <Text style={styles.subtitle}>{desctext}</Text>}
            </View>

            <View style={[styleContainer]}>
              <InputField
                title={First}
                placeholder={First}
                value={formData.contact_person_name}
                onChangeText={(text) =>
                  handleInputChange("contact_person_name", text)
                }
                onBlur={() => handleBlur("contact_person_name")}
                titleStyle={styles.fontSize}
                inputStyle={styles.input}
                error={errors.contact_person_name}
                errorMessage={errors.contact_person_name}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View>
              <InputField
                title={Second}
                placeholder={Second}
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                onBlur={() => handleBlur("email")}
                titleStyle={styles.fontSize}
                inputStyle={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                errorMessage={errors.email}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View>
              <InputField
                title={Third}
                placeholder={Third}
                value={formData.phone_number}
                onChangeText={(text) => handleInputChange("phone_number", text)}
                onBlur={() => handleBlur("phone_number")}
                titleStyle={styles.fontSize}
                inputStyle={styles.input}
                keyboardType="phone-pad"
                error={errors.phone_number}
                errorMessage={errors.phone_number}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View>
              <InputField
                title={Fourth}
                placeholder={Fourth}
                value={formData.company_name}
                onChangeText={(text) => handleInputChange("company_name", text)}
                onBlur={() => handleBlur("company_name")}
                titleStyle={styles.fontSize}
                inputStyle={styles.input}
                error={errors.company_name}
                errorMessage={errors.company_name}
                multiline={false}
                ispassword={false}
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
              disabled={Object.keys(errors).length > 0}
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
