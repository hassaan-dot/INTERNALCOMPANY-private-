import { Ionicons } from "@expo/vector-icons"; // Using Expo icons
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
const Password = ({
  password,
  setPassword,
  styleContainer,
  inputStyle,
  placeholder,
  title,
  titleStyle,
  error,
  errorMessage,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

      <View style={[styles.container1, inputStyle]}>
        <TextInput
          style={[styles.container2]}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={error}
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
      {errorMessage && (
        <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Password;
