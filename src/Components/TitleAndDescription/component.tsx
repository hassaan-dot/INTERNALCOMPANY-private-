import React from "react";
import {
  View,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { styles } from "./style";

interface ComponentProps {
  title?: string;
  desc?: string;
  subtitleContainer?: any;
  style?: ViewStyle;
  textStyle?: any; // Style for the description text
  titleTextStyle?: any; // Style for the title text
  icon?: boolean; // Whether to display the icon or not
  iconSource?: any; // Image source for the icon, can be an image path or require() call
  imageStyle?: ImageStyle; // Style for the icon image
}

const Component: React.FC<ComponentProps> = ({
  title,
  desc,
  subtitleContainer,
  style,
  textStyle,
  titleTextStyle,
  icon = false,
  iconSource,
  imageStyle,
}) => {
  return (
    <View style={[styles.descContainer, style]}>
      <View
        style={{
          flexDirection: icon ? "row" : "column",
          alignItems: icon ? "center" : "flex-start",
        }}
      >
        <View>
          {title && (
            <View
              style={[
                style,
                {
                  flexDirection: icon ? "row" : "column",
                  alignItems: "center",
                  // backgroundColor:'red',
                  // padding:20
                  // backgroundColor:"pink"
                },
              ]}
            >
              {icon && (
                <View>
                  <Image
                    source={iconSource}
                    style={[
                      { width: 35, height: 30, marginBottom: 4 },
                      imageStyle,
                    ]}
                  />
                </View>
              )}

              <View style={{}}>
                <Text style={[styles.title, titleTextStyle]}>{title}</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View>
        {desc && (
          <View style={(styles.subtitleCont, subtitleContainer)}>
            <Text style={[styles.subtitle, textStyle]}>{desc}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Component;
