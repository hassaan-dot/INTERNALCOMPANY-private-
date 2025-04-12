import { useLogin } from "@/hooks/useLogin";
import { string } from "@/src/Resources/strings";
import React, { useState } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as yup from "yup";
import {
  CheckBox,
  InputField,
  OTPmodal,
  Password,
  TitleAndDescription,
} from "../../Components";
import useFormValidation from "../../Components/FormValidation/component";
import styles from "./style";
import { useModalStore } from "@/store/useModalStore";
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
  const { width } = useWindowDimensions();

  // Define a breakpoint (e.g., 640 like Tailwind's "sm")
  const isSmallScreen = width < 850;
  // Use the breakpoint to conditionally apply styles
  console.log("isSmallScreen", isSmallScreen);

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
  const { isActivityIndicator, setisActivityIndicator } = useModalStore();
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
      setisActivityIndicator(true);
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

  return (
    <>
      <View style={[styles.container, isMobileView && styles.container2]}>
        {!isSmallScreen && (
          <View style={styles.login_desc1}>
            <View style={styles.container1}>
              <View style={{ alignSelf: "flex-end", flex: 1 }}>
                {!isSmallScreen && (
                  <TitleAndDescription
                    title={string.login2}
                    desc={string.login3}
                  />
                )}
              </View>
            </View>
          </View>
        )}

        <View style={[styles.login_desc2, isMobileView && styles.login_desc22]}>
          <View
            style={[
              styles.container3,
              { width: isSmallScreen ? "85%" : "65%" },
            ]}
          >
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
                title="Email..."
                inputStyle={[
                  styles.input,
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
                container2={{}}
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
                <CheckBox
                  style={styles.checkbox}
                  textstyle={{ marginLeft: 0 }}
                  text={string.RememberMe}
                />
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
                style={[
                  styles.loginButton,
                  isMobileView && styles.loginButton2,
                ]}
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
      {/* {isActivityIndicator && <Indicator></Indicator>} */}
    </>
  );
};

export default LoginScreen;
