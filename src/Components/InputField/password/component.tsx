import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Expo icons
import styles from "./styles";
import { PoppinsRegular } from "@/constants/fonts";
const Password = ({
  password,
  setPassword,
  styleContainer,
  placeholder,
  title,
  titleStyle,
}: any) => {
  //   const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  console.log("Password", password);
  console.log("setPassword", setPassword);

  return (
    <View>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

      <View style={[styles.container1, styleContainer]}>
        <TextInput
          style={{
            fontFamily: PoppinsRegular,
            flex: 1,
            // gap: 0,
            // paddingVertical: 10,
          }} // Space for icon
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%", // Center the icon
            transform: [{ translateY: -12 }],
          }}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Password;
