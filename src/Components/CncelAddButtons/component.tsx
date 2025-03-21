import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { styles } from "./styles";
interface ButtonProps {
  label: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onPress,
  type = "primary",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "secondary" ? styles.cancelButton : styles.addButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          type === "secondary" ? styles.buttonTextCancel : {},
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonRow: React.FC<{ onCancel: () => void; onAdd: () => void }> = ({
  onCancel,
  onAdd,
}) => {
  return (
    <View style={styles.buttonRow}>
      <CustomButton label="Cancel" onPress={onCancel} type="secondary" />
      <CustomButton label="Add" onPress={onAdd} />
    </View>
  );
};

export { CustomButton, ButtonRow };
