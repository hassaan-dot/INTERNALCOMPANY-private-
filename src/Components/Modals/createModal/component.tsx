import { icons } from "@/assets/icons/icons";
import { useLocations } from "@/hooks/useLocation";
import { useModalStore } from "@/store/useModalStore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import InputField from "../../InputField/InputField";
import SingleSelectDropDown from "../../SingleSelectDropDown/component";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";

const CreateClientModal: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  onSubmit,
  create = false,
  desc = false,
  styleContainer,
  desctext,
  isPending,
  modalContainerprop,
}) => {
  const { t } = useTranslation();
  const { rowData } = useModalStore();
  const [formData, setFormData] = useState(
    rowData ?? {
      email: "",
      contact_person_name: "",
      company_name: "",
      phone_number: "",
      address: "",
      location: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { data: locations } = useLocations();
  const locationItems = locations?.data?.map((location: any) => ({
    key: location?.documentId,
    value: location?.location_name,
  }));

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          if (error.path) newErrors[error.path] = t(`client.errors.${error.path}`, { defaultValue: error.message });
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
      location: true,
      address: true,
    });

    const isValid = await validateForm();
    if (isValid) {
      onSubmit(formData);
    }
  };

  const clientSchema = yup.object().shape({
    company_name: yup
      .string()
      .required(t("client.errors.company_name_required"))
      .min(2, t("client.errors.company_name_min")),
    email: yup
      .string()
      .email(t("client.errors.email_invalid"))
      .required(t("client.errors.email_required")),
    address: yup
      .string()
      .required(t("client.errors.address_required"))
      .min(2, t("client.errors.address_min")),
    location: yup.string().required(t("client.errors.location_required")),
    contact_person_name: yup
      .string()
      .required(t("client.errors.contact_person_name_required"))
      .min(2, t("client.errors.contact_person_name_min")),
    phone_number: yup
      .string()
      .required(t("client.errors.phone_required"))
      .matches(/^[0-9]+$/, t("client.errors.phone_digits"))
      .min(10, t("client.errors.phone_min"))
      .max(15, t("client.errors.phone_max")),
  });

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
            <View>
              {create && (
                <>
                  <Image source={icons.modalIconOtp} style={{ width: 60, height: 60 }} />
                  <Text style={styles.title}>
                    {rowData?.isEdit ? t("client.updateTitle") : t("client.createTitle")}
                  </Text>
                </>
              )}
              {desc && <Text style={styles.subtitle}>{t(desctext)}</Text>}
            </View>

            <View style={styleContainer}>
              <InputField
                title={t("client.contact_person_name")}
                placeholder={t("client.contact_person_name")}
                value={formData.contact_person_name}
                onChangeText={(text) => handleInputChange("contact_person_name", text)}
                onBlur={() => handleBlur("contact_person_name")}
                titleStyle={styles.fontSize}
                inputStyle={styles.input}
                error={errors.contact_person_name}
                errorMessage={errors.contact_person_name}
                multiline={false}
                ispassword={false}
              />
            </View>

            <InputField
              title={t("client.email")}
              placeholder={t("client.email_placeholder")}
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

            <InputField
              title={t("client.phone_number")}
              placeholder={t("client.phone_number")}
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

            <InputField
              title={t("client.company_name")}
              placeholder={t("client.company_name")}
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

            <InputField
              title={t("client.address")}
              placeholder={t("client.address_placeholder")}
              value={formData.address}
              onChangeText={(text) => handleInputChange("address", text)}
              onBlur={() => handleBlur("address")}
              titleStyle={styles.fontSize}
              inputStyle={styles.input}
              error={errors.address}
              errorMessage={errors.address}
              multiline={false}
              ispassword={false}
            />

            <View style={styles.inputContainer}>
              <SingleSelectDropDown
                items={locationItems}
                containerStyle={{}}
                setSelected={(location) => handleInputChange("location", location)}
                selected={rowData?.location_name}
                title={t("client.location")}
                error={!!errors.location}
                errorMessage={errors.location}
              />
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>{t("client.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, Object.keys(errors).length > 0 && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={Object.keys(errors).length > 0 || isPending}
            >
              <Text style={styles.addText}>
                {isPending ? <ActivityIndicator /> : rowData?.isEdit ? t("client.update") : t("client.add")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateClientModal;
