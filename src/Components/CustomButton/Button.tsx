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
import { icons } from "@/assets/icons/icons";
// import Ionicon_com from '../Ionicons/Ionicon';
import { handleDownload } from "@/src/utils";
import { useDeleteDoc } from "@/hooks/usePO";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

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
  doc_id: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  Imagecontainer,
  title,
  desc,
  url,
  style,
  textStyle,
  Color,
  leftIcon = true,
  rightIcon = true,
  descTextprop,
  Imagecontainer2,
  doc_id,
}) => {
  const { id } = useLocalSearchParams();
  const { mutate: handleDeleteDoc, isPending: isDeleting } = useDeleteDoc();

  const handleDelete = () => {
    const data = {
      doc_id,
    };

    handleDeleteDoc({ data, id });
  };

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={icons.documentDownloadIcon}
              style={[styles.image1, Imagecontainer2]}
            />
            <TouchableOpacity onPress={handleDelete}>
              {isDeleting ? (
                <ActivityIndicator style={{ marginLeft: 20 }} />
              ) : (
                <Image
                  source={icons.tableDeleteIcon}
                  style={[styles.image1, Imagecontainer2, { tintColor: "red" }]}
                />
              )}
            </TouchableOpacity>
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
    marginRight: 8,
  },
  image1: {
    width: 17,
    height: 17,
    marginLeft: 20,
  },
});

export default CustomButton;
