import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { styles } from "./styles";
import { useModalStore } from "@/store/useModalStore";
import { ActivityIndicator } from "react-native";
interface ButtonProps {
  label: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onPress,
  type = "primary",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "secondary" ? styles.cancelButton : styles.addButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          type === "secondary" ? styles.buttonTextCancel : {},
        ]}
      >
        {disabled ? <ActivityIndicator /> : label}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonRow: React.FC<{
  onCancel: () => void;
  onAdd: () => void;
  isLoading?: boolean;
}> = ({ onCancel, onAdd, isLoading = false }) => {
  const { rowData } = useModalStore();
  return (
    <View style={styles.buttonRow}>
      <CustomButton label="Cancel" onPress={onCancel} type="secondary" />
      <CustomButton
        label={rowData?.isEdit ? "Update" : "Add"}
        onPress={onAdd}
        disabled={isLoading}
      />
    </View>
  );
};

export { CustomButton, ButtonRow };
