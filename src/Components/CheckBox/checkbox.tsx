import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import styles from "./Styles";
import { icons } from "@/assets/icons/icons";
import { PoppinsRegular } from "../../Resources/fonts";

interface CustomCheckboxFieldProps {
  field?: { required?: boolean };
  style?: any;
  text?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  bgColor?: string;
  textstyle: any;
  // check?: boolean;
  value: boolean; // Controlled component
  handleInputChange?: (
    event: { target: { value: boolean } },
    field?: any
  ) => void;
}

const CustomCheckboxField: React.FC<CustomCheckboxFieldProps> = ({
  field,
  isRequired,
  isReadOnly,
  value,
  text,
  style,
  textstyle,
  // check,
  handleInputChange,
}) => {
  const handleToggle = () => {
    setCheck(!check);

    if (!isReadOnly && handleInputChange) {
      handleInputChange({ target: { value: !value } }, field);
    }
  };
  const [check, setCheck] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TouchableOpacity
          onPress={handleToggle}
          style={[
            styles.checkbox,
            value && styles.checked,
            check && styles.checked,
          ]}
        >
          <Image
            source={
              check ? icons.toastNotificationIcon : icons.uncheck_Mark_Icon
            }
            style={{ width: 25, height: 25, tintColor: "#07504B" }}
          />
        </TouchableOpacity>
        {text && (
          <Text
            style={[
              {
                marginLeft: 5,
                color: "#000000",
                fontSize: 12,
                fontFamily: PoppinsRegular,
              },
              textstyle,
            ]}
          >
            {text}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CustomCheckboxField;
