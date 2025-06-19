import { icons } from "@/assets/icons/icons";
import { useGetDepartments } from "@/hooks/useDepartments";
import { useGetuserRole } from "@/hooks/userRole";
import { useModalStore } from "@/store/useModalStore";
import { useGetUserAttendence, useGetUserWorkingHours } from "@/hooks/useUser";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import * as yup from "yup";
import { SingleSelectDropDown } from "../..";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/src/utils";
import { BarChart } from "react-native-gifted-charts";

interface UserData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  password?: string;
  role: string;
  department: string | null;
  job_title: string;
  national_id: string;
  is_absher_verified: boolean;
  [key: string]: any;
}

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: UserData) => void;
  title: string;
  desc?: boolean;
  styleContainer?: any;
  desctext?: string;
  modalContainerprop?: any;
  isPending?: boolean;
  profileMode?: boolean;
  userData?: UserData | null;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  visible,
  onClose,
  onSubmit,
  title,
  desc = false,
  styleContainer,
  desctext,
  modalContainerprop,
  isPending,
  profileMode = false,
  userData = null,
}) => {
  const { t } = useTranslation();
  const { data: GetDepartments } = useGetDepartments();
  const { data: getRoles } = useGetuserRole();
  const { rowData } = useModalStore();

  const { data: attendance, isPending: isAttendanceLoading } = useGetUserAttendence(
    profileMode && userData ? userData.documentId : null
  );

  const { data: working_hours = [], isPending: isHoursLoading } = useGetUserWorkingHours(
    profileMode && userData ? userData.documentId : null
  );

  const maxValue = Math.min(
    24,
    Math.max(...(working_hours?.map((item: any) => item.value || 0) ?? []))
  );

  const roundTo = maxValue > 10 ? 5 : 1;
  const roundedMax = Math.ceil(maxValue / roundTo) * roundTo;
  let noOfSections = 5;
  let stepValue = Math.ceil(roundedMax / noOfSections);
  if (stepValue * noOfSections < roundedMax) {
    stepValue += 1;
  }
  noOfSections = Math.ceil(roundedMax / stepValue);

  const [formData, setFormData] = useState<UserData>(
    profileMode && userData
      ? { ...userData, password: undefined }
      : (rowData && typeof rowData === 'object'
        ? rowData as UserData
        : {
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          phone_number: "",
          password: "",
          role: "",
          department: null,
          job_title: "",
          national_id: "",
          is_absher_verified: false,
        })
  );

  const [step, setStep] = useState(1);

  const userSchema = yup.object().shape(
    profileMode ? {
      first_name: yup.string().required(t("required")),
      last_name: yup.string().required(t("required")),
      email: yup.string().email(t("invalid_email")).required(t("required")),
      username: yup.string().required(t("required")),
      phone_number: yup
        .string()
        .required(t("required"))
        .matches(/^[0-9]+$/, t("phone_numbers_only"))
        .min(10, t("min_phone")),
      national_id: yup
        .string()
        .required(t("required"))
        .matches(/^[0-9]{10}$/, t("national_id_must_be_10_digits")),
    } : {
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
      job_title: yup.string().required(t("required")),
      national_id: yup
        .string()
        .required(t("required"))
        .matches(/^[0-9]{10}$/, t("national_id_must_be_10_digits")),
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field);
  };

  const validateStep = async () => {
    try {
      if (profileMode) {
        await userSchema.validate(formData, { abortEarly: false });
        return true;
      }

      const partialSchema =
        step === 1
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
            job_title: userSchema.fields.job_title,
            national_id: userSchema.fields.national_id,
          });

      await partialSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
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
    if (profileMode) {
      setTouched({
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        phone_number: true,
        national_id: true,
      });
    } else {
      setTouched({
        role: true,
        department: true,
        job_title: true,
        national_id: true,
      });
    }

    const isValid = await validateStep();
    if (isValid) {
      const finalData = {
        ...formData,
        department: formData.department === "" ? null : formData.department,
      };
      onSubmit(finalData);
    }
  };

  const depsDropdownItems = (GetDepartments?.data || []).map((dep: any) => ({
    value: t(`departments.${dep.name}`),
    key: dep.id,
  }));

  const rolesDropdownItems = (getRoles?.roles || []).map((role: any) => ({
    value: t(`roles.${role.name}`),
    key: role.id,
  }));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <Image source={icons.modalIconOtp} style={{ width: 60, height: 60 }} />
          <Text style={styles.title}>{t(title || "")}</Text>
          {desc && <Text style={styles.subtitle}>{t(desctext || "")}</Text>}

          <ScrollView>
            {(step === 1 || profileMode) && (
              <>
                <View style={styleContainer}>
                  <InputField
                    title={t("first_name")}
                    placeholder={t("first_name")}
                    value={formData.first_name || ""}
                    onChangeText={(text) => handleInputChange("first_name", text)}
                    style={[styles.input, { borderColor: errors.first_name ? "red" : "#ddd" }]}
                    error={touched.first_name ? errors.first_name : undefined}
                    errorMessage={touched.first_name ? errors.first_name : undefined}
                    titleStyle={styles.fontSize}
                    multiline={false}
                    ispassword={false}
                  />
                  <View style={{ marginLeft: 7 }}>
                    <InputField
                      title={t("last_name")}
                      placeholder={t("last_name")}
                      value={formData.last_name || ""}
                      onChangeText={(text) => handleInputChange("last_name", text)}
                      style={[styles.input, { borderColor: errors.last_name ? "red" : "#ddd" }]}
                      error={touched.last_name ? errors.last_name : undefined}
                      errorMessage={touched.last_name ? errors.last_name : undefined}
                      titleStyle={styles.fontSize}
                      multiline={false}
                      ispassword={false}
                    />
                  </View>
                </View>
                <InputField
                  title={t("email")}
                  placeholder={t("email")}
                  value={formData.email || ""}
                  onChangeText={(text) => handleInputChange("email", text)}
                  style={[styles.input, { borderColor: errors.email ? "red" : "#ddd" }]}
                  error={touched.email ? errors.email : undefined}
                  errorMessage={touched.email ? errors.email : undefined}
                  titleStyle={styles.fontSize}
                  multiline={false}
                  ispassword={false}
                />
                <InputField
                  title={t("username")}
                  placeholder={t("username")}
                  value={formData.username || ""}
                  onChangeText={(text) => handleInputChange("username", text)}
                  style={[styles.input, { borderColor: errors.username ? "red" : "#ddd" }]}
                  error={touched.username ? errors.username : undefined}
                  errorMessage={touched.username ? errors.username : undefined}
                  titleStyle={styles.fontSize}
                  multiline={false}
                  ispassword={false}
                />
                {!profileMode && (
                  <InputField
                    title={t("password")}
                    placeholder={t("password")}
                    value={formData.password || ""}
                    onChangeText={(text) => handleInputChange("password", text)}
                    style={[styles.input, { borderColor: errors.password ? "red" : "#ddd" }]}
                    error={touched.password ? errors.password : undefined}
                    errorMessage={touched.password ? errors.password : undefined}
                    titleStyle={styles.fontSize}
                    secureTextEntry
                    multiline={false}
                    ispassword={true}
                  />
                )}
                <InputField
                  title={t("phone_number")}
                  placeholder={t("phone_number")}
                  value={formData.phone_number || ""}
                  onChangeText={(text) => handleInputChange("phone_number", text)}
                  style={[styles.input, { borderColor: errors.phone_number ? "red" : "#ddd" }]}
                  error={touched.phone_number ? errors.phone_number : undefined}
                  errorMessage={touched.phone_number ? errors.phone_number : undefined}
                  titleStyle={styles.fontSize}
                  keyboardType="numeric"
                  multiline={false}
                  ispassword={false}
                />
                <InputField
                  title={t("national_id")}
                  placeholder={t("national_id")}
                  value={formData.national_id || ""}
                  onChangeText={(text) => handleInputChange("national_id", text)}
                  style={[styles.input, { borderColor: errors.national_id ? "red" : "#ddd" }]}
                  error={touched.national_id ? errors.national_id : undefined}
                  errorMessage={touched.national_id ? errors.national_id : undefined}
                  titleStyle={styles.fontSize}
                  multiline={false}
                  ispassword={false}
                />
                {profileMode && (
                  <>
                    <View style={styles.chartSection}>
                      <Text style={styles.sectionTitle}>{t("attendance.working_hours")}</Text>
                      {isHoursLoading ? (
                        <ActivityIndicator style={{ marginVertical: 20 }} />
                      ) : working_hours?.length > 0 ? (
                        <View style={styles.chartWrapper}>
                          <BarChart
                            noOfSections={noOfSections}
                            stepValue={stepValue}
                            formatYLabel={(label: string) => parseInt(label).toString()}
                            data={working_hours}
                            barWidth={14}
                            renderTooltip={(item: any) => (
                              <View
                                style={{
                                  marginLeft: -6,
                                  position: "relative",
                                  backgroundColor: item?.frontColor,
                                  paddingHorizontal: 6,
                                  paddingVertical: 2,
                                  borderRadius: 4,
                                }}
                              >
                                <Text style={{ color: "#fff", fontSize: 12 }}>
                                  {item?.value?.toFixed(1)}
                                </Text>
                              </View>
                            )}
                            isAnimated
                            xAxisIndicesWidth={40}
                            spacing={40}
                            roundedTop
                            yAxisColor="#fff"
                            xAxisColor="#ddd"
                            yAxisTextStyle={styles.yAxisTextStyle}
                            xAxisLabelTextStyle={styles.xAxisLabelTextStyle}
                          />
                        </View>
                      ) : (
                        <Text style={styles.noAttendance}>{t("attendance.no_hours_data")}</Text>
                      )}
                    </View>
                  </>
                )}
              </>
            )}

            {!profileMode && step === 2 && (
              <>
                <SingleSelectDropDown
                  items={rolesDropdownItems}
                  title={t("select_role")}
                  selected={rowData?.isEdit ? rowData?.role_name : ""}
                  setSelected={(key) => handleInputChange("role", key)}
                  error={!!(touched.role && errors.role)}
                  errorMessage={touched.role ? errors.role : undefined}
                />

                <SingleSelectDropDown
                  items={depsDropdownItems}
                  title={t("select_department")}
                  selected={rowData?.isEdit ? rowData?.department_name : ""}
                  setSelected={(key) => handleInputChange("department", key)}
                  error={!!(touched.department && errors.department)}
                  errorMessage={touched.department ? errors.department : undefined}
                />

                <InputField
                  title={t("job_title")}
                  placeholder={t("job_title")}
                  value={formData.job_title || ""}
                  onChangeText={(text) => handleInputChange("job_title", text)}
                  style={[styles.input, { borderColor: errors.job_title ? "red" : "#ddd" }]}
                  error={touched.job_title ? errors.job_title : undefined}
                  errorMessage={touched.job_title ? errors.job_title : undefined}
                  titleStyle={styles.fontSize}
                  multiline={false}
                  ispassword={false}
                />
              </>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>{t("Cancel")}</Text>
            </TouchableOpacity>
            {profileMode ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleFinalSubmit}
                disabled={isPending}
              >
                <Text style={styles.addText}>
                  {isPending ? <ActivityIndicator /> : t("update_profile")}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
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
                      {isPending ? <ActivityIndicator /> : t(rowData && rowData.isEdit ? "edit_user" : "add_user")}
                    </Text>
                  </TouchableOpacity>
                )}
                {step === 2 && (
                  <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
                    <Text style={styles.cancelText}>{t("Back")}</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateUserModal;