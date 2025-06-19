import { useGetUser } from "@/hooks/useUser";
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
import { icons } from "@/assets/icons/icons";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";

interface FormData {
  title: string;
  description: string;
  perform_on: string;
  standing: string;
  users: any[];
  request_status: string;
  documentId?: string;
}

interface CreateRequestModalProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  styleContainer?: any;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

interface DropDownItem {
  value: string;
  key: string;
}

const requestSchema = yup.object().shape({
  title: yup.string().required().min(3),
  description: yup.string().required().min(10),
  standing: yup.string().required(),
  users: yup.array().min(1),
  perform_on: yup.string().required(),
  request_status: yup.string().required(),
});

const CreateModal: React.FC<CreateRequestModalProps> = ({
  visible,
  onClose,
  create = true,
  onSubmit,
  desc = false,
  styleContainer,
}) => {
  const { t } = useTranslation();
  const { rowData } = useModalStore();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const { data: UserApi } = useGetUser();

  const [date, setDate] = useState<Date | null>(
    rowData?.isEdit ? new Date(rowData?.perform_on) : null
  );

  const [selectedUsers, setSelectedUsers] = useState<any[]>(
    rowData?.users || []
  );

  const [formData, setFormData] = useState<FormData>({
    title: rowData?.title || "",
    description: rowData?.description || "",
    perform_on: rowData?.perform_on || "",
    standing: rowData?.standing || "",
    users: rowData?.users || [],
    request_status: create ? "To do" : rowData?.request_status || "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      users: selectedUsers || [],
    }));
  }, [selectedUsers]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = async () => {
    try {
      await requestSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof FormData] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = async () => {
    setTouched({
      title: true,
      description: true,
      standing: true,
      perform_on: true,
      request_status: true,
    });
    if (currentStep === 1) {
      const isValid = await requestSchema.validateAt("title", formData)
        && await requestSchema.validateAt("description", formData)
        && await requestSchema.validateAt("standing", formData)
        && await requestSchema.validateAt("perform_on", formData)
        && await requestSchema.validateAt("request_status", formData);
      if (isValid) setCurrentStep(2);
    }
  };

  const handleSubmit = async () => {
    setTouched((prev) => ({ ...prev, users: true }));
    const isValid = await validateForm();
    if (isValid) {
      const data = {
        ...formData,
        perform_on: date?.toISOString() || "",
        documentId: rowData?.documentId,
      };
      onSubmit(data);
    }
  };

  const userDropdownItems = (UserApi?.data || []).map((user: any) => ({
    value: `${user?.first_name} ${user?.last_name}`,
    key: user?.documentId,
  }));

  // Check if all required fields for step 1 are filled
  const isStep1Valid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.standing !== "" &&
      formData.perform_on !== "" &&
      formData.request_status !== ""
    );
  };

  // Check if all required fields for step 2 are filled
  const isStep2Valid = () => {
    return selectedUsers.length > 0;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, styleContainer]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={icons.modalIconOtp} style={styles.modalIcon} />
            <Text style={styles.title}>
              {rowData?.isEdit ? t("request.edit") : t("request.create")}
            </Text>
            {desc && (
              <Text style={styles.subtitle}>
                {!rowData?.isEdit
                  ? t("request.create_desc")
                  : t("request.edit_desc")}
              </Text>
            )}
            {currentStep === 1 && (
              <>
                <InputField
                  title={t("request.title_label")}
                  placeholder={t("request.title_placeholder")}
                  value={formData.title}
                  onChangeText={(text) => handleInputChange("title", text)}
                  onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                  titleStyle={styles.fontSize}
                  inputStyle={styles.input}
                  error={touched.title && errors.title}
                  errorMessage={touched.title && errors.title}
                  multiline={false}
                  ispassword={false}
                />

                <InputField
                  title={t("request.description_label")}
                  placeholder={t("request.description_placeholder")}
                  value={formData.description}
                  onChangeText={(text) => handleInputChange("description", text)}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, description: true }))
                  }
                  titleStyle={styles.fontSize}
                  inputStyle={styles.input}
                  multiline
                  ispassword={false}
                  error={touched.description && errors.description}
                  errorMessage={touched.description && errors.description}
                />

                <DateTimeSelector
                  onDateChange={(d) => {
                    setDate(d);
                    handleInputChange("perform_on", d?.toISOString() || "");
                  }}
                  selectedDate={date}
                  error={touched.perform_on ? errors.perform_on : undefined}
                />

                <SingleSelectDropDown
                  title={t("request.select_priority")}
                  selected={formData.standing}
                  setSelected={(val) => handleInputChange("standing", val)}
                  items={[
                    { key: "Priority", value: t("request.priority") },
                    { key: "Normal", value: t("request.normal") },
                  ]}
                  error={touched.standing ? Boolean(errors.standing) : undefined}
                />

                <SingleSelectDropDown
                  title={t("request.status")}
                  selected={formData.request_status}
                  setSelected={(val) => handleInputChange("request_status", val)}
                  items={[
                    { key: "To do", value: t("request.todo") },
                    { key: "In Progress", value: t("request.in_progress") },
                    { key: "Rejected", value: t("request.rejected") },
                    { key: "Done", value: t("request.done") },
                  ]}
                  error={touched.request_status ? Boolean(errors.request_status) : undefined}
                />
              </>
            )}

            {currentStep === 2 && (
              <MultiSelectDropdown
                title={t("request.select_users")}
                items={userDropdownItems}
                selectedItems={selectedUsers}
                setSelectedItems={setSelectedUsers}
                error={touched.users ? errors.users : undefined}
                placeholder={t("request.select_users_placeholder")}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>{t("Cancel")}</Text>
              </TouchableOpacity>
              {currentStep === 1 ? (
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    !isStep1Valid() && { opacity: 0.5 }
                  ]}
                  onPress={handleNext}
                  disabled={!isStep1Valid()}
                >
                  <Text style={styles.addText}>{t("Next")}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    !isStep2Valid() && { opacity: 0.5 }
                  ]}
                  onPress={handleSubmit}
                  disabled={!isStep2Valid()}
                >
                  <Text style={styles.addText}>
                    {rowData?.isEdit ? t("request.edit") : t("request.create")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;
