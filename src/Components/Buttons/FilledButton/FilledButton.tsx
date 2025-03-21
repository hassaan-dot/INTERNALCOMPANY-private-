import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import { Button } from 'react-native-paper';
import style from './Styling/Styles';

interface FilledButtonProps {
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: string; 
  leftIconImage?: any; 
  leftIconColor?: string;
  leftIconImageStyle?: StyleProp<ImageStyle>;
  rightIcon?: string; 
  rightIconImage?: any; 
  rightIconImageStyle?: StyleProp<ImageStyle>; 
  isUnSelected?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
  buttonGradient?: string[];
  isRed?: boolean;
  buttonBackground: string | null;
}


class FilledButton extends Component<FilledButtonProps> {
  gradientColor = () => {
    const { buttonGradient, isRed, disabled, isUnSelected } = this.props;

    if (isUnSelected) {
      return ['transparent', 'transparent'];
    }
    if (buttonGradient) {
      return buttonGradient;
    }
    if (isRed) {
      return ['#F94570', '#F94570'];
    }
    if (disabled) {
      return ['#cccccc', '#cccccc'];
    }

    return ['#000000', '#000000'];
  };

  render() {
    const {
      onPress,
      disabled,
      containerStyle,
      leftIconImage,
      leftIconImageStyle,
      rightIconImage,
      rightIconImageStyle,
      buttonBackground,
      titleStyle,
      title,
    } = this.props;

    const flex_Direction = rightIconImage || leftIconImage ? 'row' : 'column';
    const styles = style.getSheet(); 

    return (
      <TouchableOpacity
        onPress={onPress} 
        disabled={disabled}
      >
        <View
          style={[
            styles.containerStyle,
            containerStyle,
            { flexDirection: flex_Direction },
          ]}
        >
          {leftIconImage && (
            <Image
              style={[leftIconImageStyle, styles.rightIconsContainerStyle]}
              source={leftIconImage}
            />
          )}
          <Button
            {...this.props}
            color={'transparent'}
            disabled={disabled}
            compact
            mode='text'
            style={[styles.buttonStyle, { elevation: 4 }]}
            contentStyle={[styles.containerStyle, { backgroundColor: buttonBackground ?? 'transparent' }]}
            uppercase={false}
            labelStyle={[styles.textStyle, titleStyle]}
          >
            {title}
          </Button>

          {rightIconImage && (
            <Image
              style={[rightIconImageStyle, styles.rightIconsContainerStyle]}
              source={rightIconImage}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

export default FilledButton;
