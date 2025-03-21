import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  function set0penfunction() {
    setModalVisible(true);
    // dispatch(loginApi(email, password,token_2fa,handleOtpSuccess, handleOtpFailure));
  }
  function onSubmitFunction() {
    navigation.navigate("Portal");
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
    <View style={styles.container}>
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

      <View style={styles.login_desc2}>
        <View style={{}}>
          <View>
            <TitleAndDescription
              titleTextStyle={styles.titleTextStyle}
              textStyle={styles.textStyle}
              subtitleContainer={{ marginTop: 15 }}
              title="Login"
              desc="Welcome Back,you have been missed!"
            ></TitleAndDescription>
          </View>

          <View style={{ marginTop: 20 }}>
            <InputField
              placeholder="Enter your email"
              title="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              titleStyle={{ marginBottom: 10 }}
            ></InputField>
          </View>
          <View style={{ marginTop: 15 }}>
            <InputField
              placeholder="Enter your Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              titleStyle={{ marginBottom: 10 }}
              title="Password"
            ></InputField>
          </View>
          <View style={styles.section}>
            <CheckBox
              style={{
                borderColor: "black",
                width: 15,
                height: 15,
                marginHorizontal: 0,
                marginRight: 8,
                borderRadius: 3,
              }}
              text={"Remember Me"}
            ></CheckBox>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: PoppinsRegular,
                  fontWeight: "400",
                }}
              >
                Forget password ?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={handlePressLogin}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* <Button
          // buttonStyle={ backgroundColor: "red", borderRadius: 10 }
          title="Login"
          style={styles.loginButton}

          >

          </Button> */}
        </View>
        <OTPmodal visible={modalVisible} onSubmit={onSubmitFunction}></OTPmodal>
      </View>
    </View>
  );
};

export default LoginScreen;
// import React, { useState } from "react";
// import {
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import {
//   CheckBox,
//   InputField,
//   TitleAndDescription,
//   OTPmodal,
// } from "../../Components";
// import styles from "./style";
// import { navigate } from "../../utils/NavigationService";
// import { PoppinsRegular } from "../../Resources/fonts";
// import { useNavigation } from "@react-navigation/native";

// // Get screen width & height
// const { width, height } = Dimensions.get("window");

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);

//   function setOpenFunction() {
//     setModalVisible(true);
//   }

//   function onSubmitFunction() {
//     navigation.navigate("Dashboard");
//     setModalVisible(false);
//   }

//   return (
//     <ScrollView
//       contentContainerStyle={styles.scrollContainer}
//       keyboardShouldPersistTaps="handled"
//     >
//       <View style={styles.container}>
//         <View style={styles.login_desc1}>
//           <View style={{ bottom: height * 0.05, marginLeft: width * 0.02}}>
//             <TitleAndDescription
//               title="Lorem Ipsum is simply"
//               desc="Lorem Ipsum is simply"
//             />
//           </View>
//         </View>

//         <View style={styles.login_desc2}>
//           <TitleAndDescription
//             titleTextStyle={styles.titleTextStyle}
//             textStyle={styles.textStyle}
//             subtitleContainer={{ marginTop: height * 0.02 }}
//             title="Login"
//             desc="Welcome Back, you have been missed!"
//           />

//           <View style={{ marginTop: height * 0.02 }}>
//             <InputField
//               placeholder="Enter your email"
//               title="Email"
//               titleStyle={{ marginBottom: height * 0.01 }}
//             />
//           </View>

//           <View style={{ marginTop: height * 0.015 }}>
//             <InputField
//               placeholder="Enter your Password"
//               title="Password"
//               titleStyle={{ marginBottom: height * 0.01 }}
//             />
//           </View>

//           <View style={styles.section}>
//             <CheckBox
//               style={{
//                 borderColor: "black",
//                 width: width * 0.04,
//                 height: width * 0.04,
//                 marginRight: width * 0.02,
//                 borderRadius: 3,
//               }}
//               text={"Remember Me"}
//             />
//             <TouchableOpacity>
//               <Text
//                 style={{
//                   fontSize: width * 0.03,
//                   fontFamily: PoppinsRegular,
//                   fontWeight: "400",
//                 }}
//               >
//                 Forget password ?
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ marginTop: height * 0.02, alignItems: "center" }}>
//             <TouchableOpacity
//               onPress={setOpenFunction}
//               style={[styles.loginButton, { width: width * 0.8 }]}
//             >
//               <Text style={styles.loginText}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <OTPmodal visible={modalVisible} onSubmit={onSubmitFunction} />
//       </View>
//     </ScrollView>
//   );
// };

// export default LoginScreen;
