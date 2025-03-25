import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import {
  CheckBox,
  InputField,
  OTPmodal,
  TitleAndDescription,
} from "../../Components";
import styles from "./style";

import { useNavigation } from "@react-navigation/native";
import { PoppinsRegular } from "../../Resources/fonts";
import { useLogin } from "@/hooks/useLogin";
import { string } from "@/src/Resources/strings";
import ActionSheet from "@/src/Components/ActionSheet/DropdownItems/ActionSheet";
import ConfirmDelievery from "@/src/Components/ActionSheet/ConfirmDelievery/ActionSheet";

const LoginScreen: React.FC = () => {
  const isMobileView = Platform.OS == "ios";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  function set0penfunction() {
    setModalVisible(true);
    // dispatch(loginApi(email, password,token_2fa,handleOtpSuccess, handleOtpFailure));
  }
  function onSubmitFunction() {
    // navigation.navigate("Portal");
    setModalVisible(false);
  }
  const [isVisible, setIsVisible] = useState(false);

  const { mutate } = useLogin();

  const handlePressLogin = () => {
    setIsVisible(true);
    const data = {
      identifier: email,
      password: password,
    };
    mutate(data);
  };
  const onButtonPress = () => {
    return setIsVisible(false);
  };

  return (
    <View style={[styles.container, isMobileView && styles.container2]}>
      <View style={styles.login_desc1}>
        {/* <View
         style={{ width:helpers.wp(50),paddingHorizontal:40,paddingBottom:50 }}
         >
          <View>
          <TitleAndDescription
            title="Lorem Ipsum is simply"
            desc="Lorem Ipsum is simply"
          ></TitleAndDescription>
          </View>
    
        </View> */}
      </View>

      <View style={[styles.login_desc2, isMobileView && styles.login_desc22]}>
        <View style={{}}>
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
            <InputField
              placeholder={
                isMobileView ? string.EnterPassword : string.EnteryourPassword
              }
              inputStyle={isMobileView && styles.inputMobileView}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              titleStyle={{ marginBottom: 10 }}
              title="Password"
            ></InputField>
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
