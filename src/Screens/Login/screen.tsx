import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import {
  CheckBox,
  InputField,
  OTPmodal,
  Password,
  TitleAndDescription,
} from "../../Components";
import styles from "./style";
import { useLogin } from "@/hooks/useLogin";
import { string } from "@/src/Resources/strings";
import * as yup from "yup";
import useFormValidation from "../../Components/FormValidation/component";
import {
  toastSuccess,
  toastError,
  toastInfo,
} from "../../../services/toast-messages";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen: React.FC = () => {
  const { mutate } = useLogin();
  const isMobileView = Platform.OS == "ios";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const {
    values,
    errors: errorsForm,
    submitAttempted: submitAttemptedForm,
    handleChange,
    handleSubmit,
  } = useFormValidation({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const data = {
        identifier: values.email,
        password: values.password,
      };
      mutate(data);
    },
  });

  function onSubmitFunction() {
    setModalVisible(false);
  }

  const validateForm = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      setErrors({ email: "", password: "" });
      return true;
    } catch (err) {
      const newErrors = { email: "", password: "" };
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof typeof newErrors] = error.message;
          }
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  const handlePressLogin = async () => {
    setSubmitAttempted(true);
    const isValid = await validateForm();

    if (isValid) {
      setIsVisible(true);
      const data = {
        identifier: email,
        password: password,
      };
      mutate(data);
    }
  };

  const handleInputChange = async (
    field: "email" | "password",
    value: string
  ) => {
    if (field === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }

    if (submitAttempted) {
      try {
        await loginSchema.validateAt(field, { [field]: value });
        setErrors((prev) => ({ ...prev, [field]: "" }));
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          setErrors((prev) => ({ ...prev, [field]: err.message }));
        }
      }
    }
  };

  const handleAction = () => {
    try {
      // toastSuccess("Success!", "Your action was completed successfully", {
      //   position: "bottom",
      //   topOffset: 50,
      // });

      toastError("Oops!", "Something went wrong");
    } catch (error) {
      toastError("Error", error.message);
    }
  };

  return (
    <View style={[styles.container, isMobileView && styles.container2]}>
      <View style={styles.login_desc1}>
        <View style={styles.container1}>
          <View style={{ alignSelf: "flex-end" }}>
            <TitleAndDescription title={string.login2} desc={string.login3} />
          </View>
        </View>
      </View>

      <View style={[styles.login_desc2, isMobileView && styles.login_desc22]}>
        <View style={styles.container3}>
          <View>
            <TitleAndDescription
              titleTextStyle={[
                styles.titleTextStyle,
                isMobileView && styles.titleTextStyle2,
              ]}
              textStyle={[
                styles.textStyle,
                isMobileView && styles.titleTextStyle2,
              ]}
              subtitleContainer={[
                styles.subtitle,
                isMobileView && styles.subtitle2,
              ]}
              title={isMobileView ? string.loginEmail : string.login}
              desc={isMobileView ? "email" : string.logindesc}
            />
          </View>

          <View style={styles.logincontainer2}>
            <InputField
              placeholder={string.enterEmail}
              title="Email"
              inputStyle={[
                isMobileView && styles.inputMobileView,
                submitAttempted && errors.email && styles.inputError,
              ]}
              value={email}
              onChangeText={(text) => handleInputChange("email", text)}
              titleStyle={{ marginBottom: 10 }}
              error={submitAttempted ? errors.email : undefined}
              errorMessage={
                submitAttempted && errors.email
                  ? errors.email
                  : values.email.length > 0 &&
                    !/^\S+@\S+\.\S+$/.test(values.email)
                  ? "Please enter a valid email"
                  : undefined
              }
            />
          </View>
          <View style={styles.logincontainer}>
            <Password
              placeholder={
                isMobileView ? string.EnterPassword : string.EnteryourPassword
              }
              title="Password"
              password={password}
              setPassword={(text) => handleInputChange("password", text)}
              inputStyle={
                submitAttempted && errors.password && styles.inputError
              }
              error={submitAttempted ? errors.password : undefined}
              errorMessage={
                submitAttempted && errors.password
                  ? errors.password
                  : password.length > 0 && password.length < 6
                  ? "Password must be at least 6 characters"
                  : undefined
              }
            />
          </View>
          <View style={[styles.section, isMobileView && styles.section2]}>
            {!isMobileView && (
              <CheckBox style={styles.checkbox} text={string.RememberMe} />
            )}
            <TouchableOpacity>
              <Text style={[styles.forget, isMobileView && styles.forget2]}>
                {string.Forgetpassword}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logincontainer}>
            <TouchableOpacity
              onPress={handlePressLogin}
              // onPress={handleAction}
              style={[styles.loginButton, isMobileView && styles.loginButton2]}
            >
              <Text
                style={[styles.loginText, isMobileView && styles.loginText2]}
              >
                {string.Login}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <OTPmodal visible={modalVisible} onSubmit={onSubmitFunction} />
      </View>
    </View>
  );
};

export default LoginScreen;
