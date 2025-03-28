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
import helpers from "@/src/utils/helpers";
import LocalStorage from "@/services/local-storage";

const LoginScreen: React.FC = () => {
  const isMobileView = Platform.OS == "ios";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  function onSubmitFunction() {
    setModalVisible(false);
  }
  const [isVisible, setIsVisible] = useState(false);

  const { mutate } = useLogin();
  // If LocalStorage.save returns a Promise:

  const handlePressLogin = () => {
    setIsVisible(true);
    const data = {
      identifier: email,
      password: password,
    };
    mutate(data);
  };

  return (
    <View style={[styles.container, isMobileView && styles.container2]}>
      <View style={styles.login_desc1}>
        <View style={styles.container1}>
          <View style={{ alignSelf: "flex-end" }}>
            <TitleAndDescription
              title="Lorem Ipsum is simply"
              desc="Lorem Ipsum is simply"
            ></TitleAndDescription>
          </View>
        </View>
      </View>

      <View style={[styles.login_desc2, isMobileView && styles.login_desc22]}>
        <View style={{ margin: helpers.normalize(20) }}>
          <View>
            <TitleAndDescription
              titleTextStyle={[
                styles.titleTextStyle,
                isMobileView && styles.titleTextStyle2,
              ]}
              textStyle={[
                styles.textStyle,
                ,
                isMobileView && styles.titleTextStyle2,
              ]}
              subtitleContainer={[
                styles.subtitle,
                isMobileView && styles.subtitle2,
              ]}
              title={isMobileView ? string.loginEmail : string.login}
              desc={isMobileView ? "email" : string.logindesc}
            ></TitleAndDescription>
          </View>

          <View style={{ marginTop: 20 }}>
            <InputField
              placeholder={string.enterEmail}
              title="Email"
              inputStyle={isMobileView && styles.inputMobileView}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              titleStyle={{ marginBottom: 10 }}
            ></InputField>
          </View>
          <View style={{ marginTop: 15 }}>
            <Password
              placeholder={
                isMobileView ? string.EnterPassword : string.EnteryourPassword
              }
              title="Password"
              password={password}
              setPassword={setPassword}
            ></Password>
          </View>
          <View style={[styles.section, isMobileView && styles.section2]}>
            {!isMobileView && (
              <CheckBox
                style={styles.checkbox}
                text={string.RememberMe}
              ></CheckBox>
            )}
            <TouchableOpacity>
              <Text style={[styles.forget, isMobileView && styles.forget2]}>
                {string.Forgetpassword}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={handlePressLogin}
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
        <OTPmodal visible={modalVisible} onSubmit={onSubmitFunction}></OTPmodal>
        {/* <ActionSheet
  Visible={isVisible}
  onButtonPress={onButtonPress}
></ActionSheet> */}
        {/* <ConfirmDelievery
       Visible={isVisible}
       onButtonPress={onButtonPress}
  ></ConfirmDelievery> */}
      </View>
    </View>
  );
};

export default LoginScreen;
