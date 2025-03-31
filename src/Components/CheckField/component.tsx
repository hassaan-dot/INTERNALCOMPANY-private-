import { PO_STATUS } from "@/constants/po_status";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

interface CheckboxFieldProps {
  text: PO_STATUS;
  Correct?: boolean;
  textStyle?: any;
  icon?: boolean;
  onSelect: (value: PO_STATUS) => void;
  selected: PO_STATUS;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  text,
  Correct = true,
  icon = true,
  textStyle = {},
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          selected === text ? styles.selectedOptionTrue : styles.unSelected,
        ]}
        onPress={() => onSelect(text)}
      >
        <Text
          style={[
            styles.optionText,
            textStyle,
            selected === text && styles.selectedOptionText,
          ]}
        >
          {text}
        </Text>

        <View style={styles.container1}>
          <TouchableOpacity style={styles.dashedSquare}>
            <View style={styles.outerCircle}>
              {selected === text && <View style={[styles.innerCircle]} />}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckboxField;
