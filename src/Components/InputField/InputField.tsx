// import React, {Component} from 'react';
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   TextInputProps,
// } from 'react-native';
// import {withTheme, Text} from 'react-native-paper';
// // import Icon from 'react-native-vector-icons/Ionicons';
// import helpers from '../../utils/helpers';
// import style from './Styling/Styles';
// import { PoppinsRegular } from '../../Resources/fonts';

// interface InputFieldProps extends TextInputProps {
//   theme: any; // `any` or use the appropriate type for the theme (e.g., `DefaultTheme` from react-native-paper)
//   containerStyle?: object;
//   title?: string;
//   rightIconImage?: any;
//   titleBackgroundColor?: string;
//   rightIcon?: string;
//   clearTextEntry?: boolean;
//   boldTitle?: string;
//   editable?: boolean;
//   secureTextEntry?: boolean;
//   placeholder?: string;
//   inputStyle?: object;
//   autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
//   backgroundColor?: string;
//   noBorder?: boolean;
//   multiline?: boolean;
//   leftIcon?: string;
//   leftIconImage?: any;
//   leftIconImageStyle?: object;
//   keyboardType?: TextInputProps['keyboardType'];
//   inputFieldShaddow?: boolean;
//   fieldTextColor?: string;
//   multilineTextFieldHeight?: number;
//   onRightIconPress?: () => void;
//   clearText?: () => void;
//   onChangeText?: (text: string) => void;
// }

// interface InputFieldState {
//   secureTextEntry: boolean;
//   clearTextEntry: boolean;
//   showError: boolean;
//   errorMessage?: {
//     title: string;
//     descp: string;
//   };
// }

// class InputField extends Component<InputFieldProps, InputFieldState> {
//   constructor(props: InputFieldProps) {
//     super(props);
//     this.state = {
//       secureTextEntry: props.secureTextEntry ?? false,
//       clearTextEntry: props.clearTextEntry ?? false,
//       showError: false,
//     };
//   }

//   showError = (msg?: string) => {
//     this.setState({
//       showError: true,
//       errorMessage: msg ? {title: 'Error', descp: msg} : undefined,
//     });
//   };

//   hideError = () => {
//     this.setState({
//       showError: false,
//       errorMessage: undefined,
//     });
//   };

//   handleTextChange = ({nativeEvent}: any) => {
//     this.setState({showError: false});
//     if (this.props.onChangeText) {
//       this.props.onChangeText(nativeEvent.text);
//     }
//   };

//   render() {
//     const {
//       theme,
//       containerStyle,
//       title,
//       rightIconImage,
//       titleBackgroundColor,
//       rightIcon,
//       clearTextEntry,
//       boldTitle,
//       editable,
//       secureTextEntry,
//       placeholder,
//       inputStyle,
//       autoCapitalize,
//       backgroundColor,
//       noBorder,
//       multiline,
//       leftIcon,
//       leftIconImage,
//       leftIconImageStyle,
//       keyboardType,
//       inputFieldShaddow,
//       fieldTextColor,
//       defaultValue,
//       multilineTextFieldHeight,
//     } = this.props;

//     const {colors} = theme;
//     const styles = style.getSheet(this.props.theme);

//     return (
//       <View {...this.props} style={[styles.containerStyle, containerStyle]}>
//         {title && (
//           <Text
//             style={[
//               styles.textStyle,
//               {
//                 fontFamily:PoppinsRegular,
//               },
//               {
//                 color: this.state.showError
//                   ? colors.primaryText
//                   : colors.primaryText,
//                 backgroundColor: titleBackgroundColor,
//               },
//             ]}>
//             {title}
//           </Text>
//         )}

//         {boldTitle && (
//           <Text
//             style={[
//               styles.boldTextStyle,
//               {
//                 color: this.state.showError
//                   ? colors.inputFieldError
//                   : colors.primaryText,
//               },
//             ]}>
//             {boldTitle}
//           </Text>
//         )}

//         <View
//           style={[
//             styles.innerContainerStyle,
//             backgroundColor ? { backgroundColor } : {},
//             {
//               borderColor: this.state.showError
//                 ? colors.inputFieldError
//                 : colors.border,
//               borderWidth: noBorder ? 0 : this.state.showError ? 1 : 1,
//               borderRadius: helpers.normalize(8),
//             },
//             inputFieldShaddow && {
//               shadowColor: colors.shadowColor,
//               shadowOffset: {width: 0, height: 2},
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,
//               elevation: 1,
//             },
//           ]}>
//           {(leftIcon || leftIconImage) && (
//             <View style={[styles.iconStyle]}>
//               {leftIconImage && (
//                 <Image
//                   source={leftIconImage}
//                   style={[styles.iconImageStyle, leftIconImageStyle]}
//                   resizeMode="contain"
//                 />
//               )}
//             </View>
//           )}

//           <TextInput
//             textContentType="none"
//             {...this.props}
//             autoCorrect={false}
//             keyboardType={keyboardType}
//             defaultValue={defaultValue}
//             autoCapitalize={autoCapitalize}
//             style={[
//               styles.inputStyle,
//               inputStyle,
//               {
//                 color: this.state.showError
//                   ? colors.inputFieldError
//                   : fieldTextColor || colors.primaryText || '#4E5D78',
//                   fontSize: helpers.normalize(14),
//                   marginTop:multiline? helpers.normalize(10):0,
//               },
//               {height: multiline ? multilineTextFieldHeight : helpers.normalize(50)},
//             ]}
//             selectionColor={colors.heighlighter}
//             secureTextEntry={this.state.secureTextEntry}
//             textAlignVertical={multiline ? 'top' : 'center'}
//             placeholder={placeholder}
//             placeholderTextColor={'#666666'}
//             editable={editable}
//             numberOfLines={multiline ? 4 : 1}
//             onChange={this.handleTextChange}
//           />

//           {secureTextEntry && (
//             <TouchableOpacity
//               style={{justifyContent: 'center'}}
//               onPress={() =>
//                 this.setState({secureTextEntry: !this.state.secureTextEntry})
//               }>
//             </TouchableOpacity>
//           )}

//           {clearTextEntry && (
//             <TouchableOpacity
//               style={{justifyContent: 'center'}}
//               onPress={() => this.props.clearText && this.props.clearText()}
//               >
//             </TouchableOpacity>
//           )}

//           {(rightIcon || rightIconImage) && (
//             <TouchableOpacity
//               style={{
//                 justifyContent: 'center',
//                 paddingRight: helpers.normalize(4),
//               }}
//               onPress={this.props.onRightIconPress}>
//               {rightIconImage && (
//                 <Image
//                   style={styles.iconImageStyle}
//                   source={rightIconImage}
//                   resizeMode="contain"
//                 />
//               )}
//             </TouchableOpacity>
//           )}
//         </View>

//         {this.state.showError && this.state.errorMessage && (
//           <View style={[styles.errorBoxStyle]}>
//             <View style={{flex: 1, flexDirection: 'column'}}>
//               <Text style={[styles.errorTitleStyle]}>
//                 {this.state.errorMessage.title}
//               </Text>
//               <Text style={[styles.errorDescpStyle]}>
//                 {this.state.errorMessage.descp}
//               </Text>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   }
// }

// export default withTheme(InputField);
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
  multiline:any,
  secureTextEntry?: boolean;
} & TextInputProps;

const InputField: React.FC<InputFieldProps> = ({
  title,
  value,
  onChangeText,
  titleStyle,
  placeholder,
  secureTextEntry,
  multiline=false,
  inputStyle,
  ...props
  
}) => {
  return (

    <View style={styles.container}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <TextInput
         returnKeyType="done" // Adds a "Done" button
         onSubmitEditing={Keyboard.dismiss} 
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}

        placeholder={placeholder}
        placeholderTextColor={"#000"}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
    // </KeyboardAvoidingView>
  //  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
    marginVertical:5
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    fontFamily: PoppinsRegular,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00504B",
    borderRadius: 10,
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
    paddingVertical:8 ,
    // textAlignVertical:'top',
    fontFamily: PoppinsRegular,
    paddingHorizontal: 10,
    // fontSize: 15,
    height: 50,
  },
});

export default InputField;
