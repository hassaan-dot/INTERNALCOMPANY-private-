import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./style";
import { icons } from "../../Resources";

interface CheckboxFieldProps {
  text: string;
  Correct?: boolean;
  textStyle: any;
  icon?: boolean;
  onSelect: (selectedOption: string) => void;
}



const CheckboxField: React.FC<CheckboxFieldProps> = ({
  text,
  Correct = true,
  icon = true,
  textStyle = {},
  onSelect,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onSelect(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          isSelected ? styles.selectedOptionTrue : styles.unSelected,
        ]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.optionText,
            textStyle,
            isSelected && styles.selectedOptionText,
          ]}
        >
          {text}
        </Text>

        <View style={styles.container1}>
          <TouchableOpacity style={styles.dashedSquare}>
            <View style={styles.outerCircle}>
              <View style={[styles.innerCircle]} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckboxField;
