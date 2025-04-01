import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";

type InputFieldProps = {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  titleStyle?: any;
  inputStyle?: any;
  multiline: any;
  ispassword: boolean;
  secureTextEntry?: boolean;
  placeholderTextColor?: any;
  error?: any;
  errorMessage: any;
  editable?: boolean;
} & TextInputProps;

const InputField: React.FC<InputFieldProps> = ({
  title,
  value,
  onChangeText,
  titleStyle,
  placeholder,

  editable = true,
  secureTextEntry,
  multiline = false,
  inputStyle,
  ispassword,
  error,
  errorMessage,
  placeholderTextColor = "#757575",
  ...props
}) => {
  return (
    <View style={styles.container}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <TextInput
        returnKeyType="done" // Adds a "Done" button
        onSubmitEditing={Keyboard.dismiss}
        style={[styles.input, inputStyle, { borderColor: error && "red" }]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType="datetime"
        placeholder={placeholder}
        editable={editable}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        error={error}
        {...props}
      />
      {errorMessage && (
        <Text style={{ color: "red", marginTop: 2 }}>{errorMessage}</Text>
      )}
    </View>
    // </KeyboardAvoidingView>
    //  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    fontFamily: PoppinsRegular,
  },
  input: {
    borderWidth: 1,
    // borderColor: "#00504B",
    borderRadius: 10,
    padding: 10,
    fontWeight: "500",
    fontSize: 14,
    paddingVertical: 14,

    fontFamily: PoppinsRegular,
    paddingHorizontal: 10,
  },
});

export default InputField;
