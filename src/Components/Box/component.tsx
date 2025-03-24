import React from 'react';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { styles } from './styles';

interface CustomButtonProps {
  text?: boolean; 
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle; 
  onPress: () => void;
  Color?: string; 
  disabled?: boolean; 
  icon?: boolean; 
  iconType?: string; 
  iconName?: string; 
  iconColor?: string;
  iconSize?: number; 
  iconStyle?: ViewStyle; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text = false,
  style,
  onPress,
  Color ,
  disabled = false,
  icon = true,
  iconType,
  iconName,
  textStyle,
  iconColor,
  iconSize,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: Color }]}
      onPress={onPress}
      disabled={disabled}>
    </TouchableOpacity>
  );
};

export default CustomButton;
