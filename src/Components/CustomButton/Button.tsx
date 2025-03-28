import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
  TextStyle,
  Image,
  Alert,
} from "react-native";
import { icons } from "../../Resources";
// import Ionicon_com from '../Ionicons/Ionicon';
import { handleDownload } from "@/src/utils";

// Define types for the component's props
interface CustomButtonProps {
  text?: string;
  title?: string;
  url?: string;
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
  Imagecontainer?: any;
  Imagecontainer2?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  Imagecontainer,
  title,
  desc,
  url,
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
  descTextprop,
  Imagecontainer2,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, { backgroundColor: Color }]}
      onPress={() => handleDownload(url, title)}
      disabled={false}
    >
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <View>
            {leftIcon && (
              <View>
                <Image
                  source={icons.documendPdfIcon}
                  style={[styles.image, Imagecontainer]}
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
              {desc && (
                <Text style={[styles.descText, descTextprop]}>
                  {(desc / 1024).toFixed(1)} MB
                </Text>
              )}
            </View>
          </View>
        </View>
        {rightIcon && (
          <View>
            <Image
              source={icons.documentDownloadIcon}
              style={[styles.image1, Imagecontainer2]}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "red",
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginVertical: 5,
    padding: 12,
    marginRight: 10,
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
    justifyContent: "space-between",
    flex: 1,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  image1: {
    width: 15,
    height: 15,
  },
});

export default CustomButton;
