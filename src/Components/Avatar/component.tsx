import React from "react";
import { Image, ImageStyle, StyleSheet } from "react-native";

interface AvatarProps {
  uri?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  marginRight?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  uri = "https://api.tryitout.info/uploads/profile_icon_design_free_vector_29decaa99c.jpg",
  width = 80,
  height = 80,
  borderRadius = 40,
  marginRight = 15,
}) => {
  return (
    <Image
      source={{ uri }}
      style={[styles.avatar, { width, height, borderRadius, marginRight }]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 15,
    // marginRight: 15,
  } as ImageStyle,
});

export default Avatar;
