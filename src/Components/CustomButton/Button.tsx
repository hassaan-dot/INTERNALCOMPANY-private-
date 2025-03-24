import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
  TextStyle,
  Image,
} from "react-native";
import { icons } from "../../Resources";
import helpers from "../../utils/helpers";
// import Ionicon_com from '../Ionicons/Ionicon';

// Define types for the component's props
interface CustomButtonProps {
  text?: string;
  title?: string;
  style?: any;
  textStyle?: any;
  onPress: () => void;
  Color?: any;
  disabled?: boolean;
  leftIcon?: boolean;
  leftIconType?: string;
  leftIconName?: string;
  leftIconColor?: string;
  leftIconSize?: number;
  leftIconStyle?: ViewStyle;
  rightIcon?: boolean;
  rightIconType?: string;
  rightIconName?: string;
  rightIconColor?: string;
  rightIconSize?: number;
  rightIconStyle?: ViewStyle;
  desc: any;
  descTextprop: any;
  Imagecontainer?:any
  Imagecontainer2?:any
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  Imagecontainer,
  title,
  style,
  textStyle,
  onPress,
  Color,
  disabled = false,
  leftIcon = true,
  leftIconType,
  leftIconName,
  leftIconColor,
  leftIconSize = 20,
  leftIconStyle,
  rightIcon = true,
  rightIconType,
  rightIconName,
  rightIconColor,
  rightIconSize = 20,
  rightIconStyle,
  desc,
  descTextprop,
  Imagecontainer2
}) => {
  console.log(title)
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: Color }]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.contentContainer}>
        <View style={{alignItems:'center',flexDirection:'row'}}>
          <View>
            {leftIcon && (
              <View>
                <Image
                  source={icons.documendPdfIcon}
                  style={[styles.image,Imagecontainer]}
                ></Image>
              </View>
            )}
          </View>
          <View>
            <View>
              {title && (
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
              )}
            </View>
            <View>
              {text && (
                <Text style={[styles.descText, descTextprop]}>{desc}</Text>
              )}
            </View>
          </View>
        </View>
        <View>
          {rightIcon && (
            <Image source={icons.documentDownloadIcon} style={[styles.image1,Imagecontainer2]}></Image>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: 'red',
    // height: 25,
    borderRadius: 8,
    // width:helpers.wp(13),
    alignItems: "center",
    // justifyContent: "center",
    flex:1,
    marginVertical: 5,
    padding: 12,
    marginRight:10,
    paddingHorizontal: 10,
  },
  descText: { fontSize: 8, fontWeight: "500", color: "#000000", marginTop: 4 },
  buttonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "black",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
    flex:1
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  image: {
    width: 30,
    height: 30,
    marginRight:5,
  },
  image1: {
    width: 15,
    height: 15,
    // marginRight:5,
  },
});

export default CustomButton;
// import React from "react";
// import {
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   ViewStyle,
//   TextStyle,
//   View,
//   Image,
// } from "react-native";
// import { icons } from "../../Resources";
// // import Ionicon_com from '../Ionicons/Ionicon';

// interface CustomButtonProps {
//   text?: boolean;
//   title: string;
//   style?: ViewStyle;
//   textStyle?: TextStyle;
//   onPress: () => void;
//   Color?: string;
//   disabled?: boolean;
//   leftIcon?: boolean;
//   leftIconType?: string;
//   leftIconName?: string;
//   leftIconColor?: string;
//   leftIconSize?: number;
//   leftIconStyle?: ViewStyle;
//   rightIcon?: boolean;
//   rightIconType?: string;
//   rightIconName?: string;
//   rightIconColor?: string;
//   rightIconSize?: number;
//   rightIconStyle?: ViewStyle;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//   text = false,
//   title,
//   style,
//   textStyle,
//   onPress,
//   Color = "#FFF",
//   disabled = false,
//   leftIcon = false,
//   leftIconType,
//   leftIconName,
//   leftIconColor,
//   leftIconSize = 20,
//   leftIconStyle,
//   rightIcon = false,
//   rightIconType,
//   rightIconName,
//   rightIconColor,
//   rightIconSize = 20,
//   rightIconStyle,
// }) => {
//   return (
// <TouchableOpacity
//   style={[styles.button, style, { backgroundColor: Color }]}
//   onPress={onPress}
//   disabled={disabled}
// >
//   <View style={styles.contentContainer}>
//     {leftIcon && leftIconName && (
//       <Image>
//         <Image source={icons.tableReadIcon} style={styles.image}></Image>
//       </Image>
//     )}

//     {text && <Text style={[styles.buttonText, textStyle]}>{title}</Text>}

//     {rightIcon && rightIconName && (
//       <Image source={icons.tableReadIcon} style={styles.image}></Image>
//     )}
//   </View>
// </TouchableOpacity>
//   );
// };
// const styles = StyleSheet.create({
//   button: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     height: 50,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   contentContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   buttonText: {
//     alignSelf: 'center',
//     color: '#fff',
//     fontSize: 15,
//     // fontWeight: '',
//   },
//   disabledButton: {
//     backgroundColor: '#ccc',
//   },
//   image: {
//   width: 20,
//   height: 20,
// },
// });
// const styles = StyleSheet.create({
//   button: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     height: 50,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 10,
//     paddingHorizontal: 15,
//   },
// contentContainer: {
//   flexDirection: "row",
//   alignItems: "center",
// },
//   buttonText: {
//     color: "#fff",
//     fontSize: 15,
//     marginHorizontal: 8,
//   },
// image: {
//   width: 20,
//   height: 20,
// },

// });

// export default CustomButton;
