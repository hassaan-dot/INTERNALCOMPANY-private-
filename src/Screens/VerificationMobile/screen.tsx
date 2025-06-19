import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import {
  InputField,
  OTPmodal,
  TitleAndDescription
} from "../../Components";
import styles from "./style";

import { useLogin } from "@/hooks/useLogin";
import { string } from "@/src/Resources/strings";
import { useNavigation } from "@react-navigation/native";

const VerficationScreen: React.FC = () => {
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

  const { mutate, data, isError, error } = useLogin();

  const handlePressLogin = () => {
    const data = {
      email,
      password,
    };
    mutate(data);
  };

  return (
    <View style={[styles.container, isMobileView && styles.container2]}>
      <View style={[styles.login_desc2, isMobileView && styles.login_desc22]}>
        <View style={{}}>
          <View>
            <TitleAndDescription
              titleTextStyle={[
                styles.titleTextStyle,
                isMobileView && styles.titleTextStyle2,
              ]}
              textStyle={[styles.textStyle]}
              subtitleContainer={[isMobileView && styles.subtitle2]}
              title={isMobileView ? string.otpTitle : string.login}
              desc={isMobileView ? string.otpdesc : undefined}
            ></TitleAndDescription>
          </View>

          <View style={{ marginTop: 20 }}>
            <InputField
              placeholder={string.enterCode}
              title="Code"
              inputStyle={isMobileView && styles.inputMobileView}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              titleStyle={{ marginBottom: 10 }}
              multiline={false}
              ispassword={false}
              errorMessage=""
            ></InputField>
          </View>

          <View style={[styles.section]}>
            <Text style={[styles.forget2, styles.forget3]}>
              {string.DidntrecieveCode}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.forget2]}>{string.ResendCode}</Text>
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
                {string.Submit}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <OTPmodal
          visible={modalVisible}
          onSubmit={onSubmitFunction}
          onClose={() => setModalVisible(false)}
        ></OTPmodal>
      </View>
    </View>
  );
};

export default VerficationScreen;
