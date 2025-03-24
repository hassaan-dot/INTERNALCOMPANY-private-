import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { styles } from "./styles";
type ButtonGroupProps = {
  buttonCount?: number;
  onPress?: () => void;
  buttonText?: string;
  ContainerStyle: any;
  buttonTitle2: any;
  buttonTitle1: any;
  Color1: any;
  Color2: any;
  textStyle1: any;
  textStyle2: any;
  style1:any
  style2:any
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttonCount,
  onPress,
  ContainerStyle,
  buttonTitle1,
  buttonTitle2,
  Color1,
  textStyle1,
  textStyle2,
  Color2,
  style1,
  style2,
  buttonText = "Button",
}) => {
  return (
    <View style={[styles.container, ContainerStyle]}>
      <TouchableOpacity
        style={[styles.button,style1, { backgroundColor: Color1 }]}
        // onPress={() => onPress && onPress()}
      >
        <Text style={[styles.text, textStyle1]}>{buttonTitle1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button,style2, { backgroundColor: Color2 }]}
        onPress={onPress}
      >
        <Text style={[styles.text, textStyle2]}>{buttonTitle2}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonGroup;
