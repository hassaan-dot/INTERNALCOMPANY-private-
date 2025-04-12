// import { Ionicons } from "@expo/vector-icons"; // Using Expo icons
// import React, { useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import styles from "./styles";
// const Password = ({
//   password,
//   setPassword,
//   styleContainer,
//   inputStyle,
//   placeholder,
//   title,
//   titleStyle,
//   error,
//   errorMessage,
//   placeholderTextColor = "#757575",
// }: any) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <View>
//       {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

//       <View style={[styles.container2, inputStyle]}>
//         <TextInput
//           style={[styles.container1]}
//           placeholder={placeholder}
//           secureTextEntry={!showPassword}
//           value={password}
//           placeholderTextColor={placeholderTextColor}
//           onChangeText={(text) => setPassword(text)}
//           error={error}
//         />
//         <TouchableOpacity
//           onPress={() => setShowPassword(!showPassword)}
//           style={{
//             position: "absolute",
//             right: 10,
//             top: "50%", // Center the icon
//             transform: [{ translateY: -12 }],
//           }}
//         >
//           <Ionicons
//             name={showPassword ? "eye" : "eye-off"}
//             size={24}
//             color="gray"
//           />
//         </TouchableOpacity>
//       </View>
//       {errorMessage && (
//         <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>
//       )}
//     </View>
//   );
// };

// export default Password;
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import styles from "./styles";

type PasswordProps = {
  password: string;
  setPassword: (value: string) => void;
  styleContainer?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderTextColor?: string;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  error?: boolean;
  errorMessage?: string;
};

const Password: React.FC<PasswordProps> = ({
  password,
  setPassword,
  styleContainer,
  inputStyle,
  placeholder = "Enter your password",
  placeholderTextColor = "#757575",
  title,
  titleStyle,
  error,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styleContainer}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

      <View style={[styles.container2, inputStyle]}>
        <TextInput
          style={styles.container1}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={password}
          placeholderTextColor={placeholderTextColor}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
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
