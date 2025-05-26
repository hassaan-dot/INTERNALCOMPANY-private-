import { icons } from "@/assets/icons/icons";
import { useGetDepartments } from "@/hooks/useDepartments";
import { useGetuserRole } from "@/hooks/userRole";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";
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
import { SingleSelectDropDown } from "../..";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";

const CreateUserModal = ({
  visible,
  onClose,
  onSubmit,
  title,
  desc = false,
  styleContainer,
  desctext,
  modalContainerprop,
  isPending,
}) => {
  const { t } = useTranslation();
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
      jobs_title: "",
    }
  );

  const [step, setStep] = useState(1);

  const userSchema = yup.object().shape({
    first_name: yup.string().required(t("required")),
    last_name: yup.string().required(t("required")),
    email: yup.string().email(t("invalid_email")).required(t("required")),
    username: yup.string().required(t("required")),
    password: yup.string().min(6, t("min_password")).required(t("required")),
    phone_number: yup
      .string()
      .required(t("required"))
      .matches(/^[0-9]+$/, t("phone_numbers_only"))
      .min(10, t("min_phone")),
    role: yup.string().required(t("required")),
    department: yup.string().required(t("required")),
    jobs_title: yup.string().required(t("required")),
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field);
  };

  const validateStep = async () => {
    try {
      const partialSchema = step === 1
        ? yup.object().shape({
          first_name: userSchema.fields.first_name,
          last_name: userSchema.fields.last_name,
          email: userSchema.fields.email,
          username: userSchema.fields.username,
          password: userSchema.fields.password,
          phone_number: userSchema.fields.phone_number,
        })
        : yup.object().shape({
          role: userSchema.fields.role,
          department: userSchema.fields.department,
          jobs_title: userSchema.fields.jobs_title,
        });

      await partialSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleFinalSubmit = async () => {
    setTouched({
      role: true,
      department: true,
      jobs_title: true,
    });
    const isValid = await validateStep();
    if (isValid) {
      const finalData = {
        ...formData,
        department: formData.department === "" ? null : formData.department,
      };
      onSubmit(finalData);
    }
  };

  const depsDropdownItems = (GetDepartments?.data || []).map((dep) => ({
    value: t(`departments.${dep.name}`),
    key: dep.id,
  }));

  const rolesDropdownItems = (getRoles?.roles || []).map((role) => ({
    value: t(`roles.${role.name}`),
    key: role.id,
  }));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <Image source={icons.modalIconOtp} style={{ width: 60, height: 60 }} />
          <Text style={styles.title}>{t(title)}</Text>
          {desc && <Text style={styles.subtitle}>{t(desctext)}</Text>}

          <ScrollView>
            {step === 1 && (
              <>
                <View style={styleContainer}>
                  <InputField
                    title={t("first_name")}
                    placeholder={t("first_name")}
                    value={formData.first_name}
                    onChangeText={(text) => handleInputChange("first_name", text)}
                    style={[styles.input, { borderColor: errors.first_name ? "red" : "#ddd" }]}
                    error={touched.first_name && errors.first_name}
                    errorMessage={touched.first_name && errors.first_name}
                    titleStyle={styles.fontSize}
                  />

                  <View style={{ marginLeft: 7 }}>
                    <InputField
                      title={t("last_name")}
                      placeholder={t("last_name")}
                      value={formData.last_name}
                      onChangeText={(text) => handleInputChange("last_name", text)}
                      style={[styles.input, { borderColor: errors.last_name ? "red" : "#ddd" }]}
                      error={touched.last_name && errors.last_name}
                      errorMessage={touched.last_name && errors.last_name}
                      titleStyle={styles.fontSize}
                    />
                  </View>
                </View>

                <InputField
                  title={t("email")}
                  placeholder={t("email_placeholder")}
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  style={[styles.input, { borderColor: errors.email ? "red" : "#ddd" }]}
                  error={touched.email && errors.email}
                  errorMessage={touched.email && errors.email}
                  keyboardType="email-address"
                  titleStyle={styles.fontSize}
                />

                <InputField
                  title={t("username")}
                  placeholder={t("username")}
                  value={formData.username}
                  onChangeText={(text) => handleInputChange("username", text)}
                  style={[styles.input, { borderColor: errors.username ? "red" : "#ddd" }]}
                  error={touched.username && errors.username}
                  errorMessage={touched.username && errors.username}
                  titleStyle={styles.fontSize}
                />

                {!rowData?.isEdit && (
                  <InputField
                    title={t("password")}
                    placeholder={t("password")}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    style={[styles.input, { borderColor: errors.password ? "red" : "#ddd" }]}
                    error={touched.password && errors.password}
                    errorMessage={touched.password && errors.password}
                    titleStyle={styles.fontSize}
                  />
                )}

                <InputField
                  title={t("phone_number")}
                  placeholder={t("phone_number")}
                  value={formData.phone_number}
                  onChangeText={(text) => handleInputChange("phone_number", text)}
                  style={[styles.input, { borderColor: errors.phone_number ? "red" : "#ddd" }]}
                  error={touched.phone_number && errors.phone_number}
                  errorMessage={touched.phone_number && errors.phone_number}
                  keyboardType="phone-pad"
                  titleStyle={styles.fontSize}
                />
              </>
            )}

            {step === 2 && (
              <>
                <SingleSelectDropDown
                  items={rolesDropdownItems}
                  title={t("select_role")}
                  selected={rowData?.isEdit ? rowData?.role_name : ""}
                  setSelected={(key) => handleInputChange("role", key)}
                  error={touched.role && errors.role}
                  errorMessage={touched.role && errors.role}
                />

                <SingleSelectDropDown
                  items={depsDropdownItems}
                  title={t("select_department")}
                  selected={rowData?.isEdit ? rowData?.department_name : ""}
                  setSelected={(key) => handleInputChange("department", key)}
                  error={touched.department && errors.department}
                  errorMessage={touched.department && errors.department}
                />

                <InputField
                  title={t("jobs_title")}
                  placeholder={t("jobs_title")}
                  value={formData.jobs_title}
                  onChangeText={(text) => handleInputChange("jobs_title", text)}
                  style={[styles.input, { borderColor: errors.jobs_title ? "red" : "#ddd" }]}
                  error={touched.jobs_title && errors.jobs_title}
                  errorMessage={touched.jobs_title && errors.jobs_title}
                  titleStyle={styles.fontSize}
                />
              </>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>{t("Cancel")}</Text>
            </TouchableOpacity>
            {step === 1 ? (
              <TouchableOpacity style={styles.addButton} onPress={handleNext}>
                <Text style={styles.addText}>{t("Next")}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleFinalSubmit}
                disabled={isPending}
              >
                <Text style={styles.addText}>
                  {isPending ? <ActivityIndicator /> : t(rowData?.isEdit ? "edit_user" : "add_user")}
                </Text>
              </TouchableOpacity>
            )}
            {step === 2 && (
              <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
                <Text style={styles.cancelText}>{t("Back")}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateUserModal;
