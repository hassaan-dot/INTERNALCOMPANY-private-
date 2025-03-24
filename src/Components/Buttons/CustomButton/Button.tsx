  import React from 'react';
  import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
  import My_Icon from '../../../utils/IconHelper/iconHelper';
  import { styles } from './style';

  interface CustomButtonProps {
    text?: boolean; // Optional, defaults to false
    title: string;
    style?: ViewStyle; // Optional, for custom button style
    textStyle?: TextStyle; // Optional, for custom text style
    onPress: () => void;
    Color?: string; // Optional, background color, defaults to '#FFF'
    disabled?: boolean; // Optional, defaults to false
    icon?: boolean; // Optional, defaults to true
    iconType?: string; // Optional, type of icon (e.g., FontAwesome)
    iconName?: string; // Optional, name of the icon (e.g., "home")
    iconColor?: string; // Optional, icon color
    iconSize?: number; // Optional, icon size
    iconStyle?: ViewStyle; // Optional, style for icon
  }

  const CustomButton: React.FC<CustomButtonProps> = ({
    text = false,
    title,
    style,
    textStyle,
    onPress,
    Color = '#FFF',
    disabled = false,
    icon = true,
    iconType,
    iconName,
    iconColor,
    iconSize,
    iconStyle,
  }) => {
    return (
      <TouchableOpacity
        style={[styles.button, style, { backgroundColor: Color }]}
        onPress={onPress}
        disabled={disabled}>
        {icon && iconName && (
          <My_Icon
            style={iconStyle}
            type={iconType}
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        )}
        {text && (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };

  export default CustomButton;
