import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./style";

interface ProfileHeaderProps {
  profileImage: any; // Can be a local image source or a URI string
  name: string;
  userType: string;
  desc: string;
  onMenuPress: () => void; // Function for the menu button press
}

const Admineader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  userType,
  name,
  desc,
  onMenuPress,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        // alignItems: "center",
      }}
    >
      <View style={{ justifyContent: "flex-end" }}>
        <Text style={{ fontWeight: "700", fontSize: 16, color: "#000" }}>
          {"Admin user"}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
        </View>
      </View>
    </View>
  );
};

export default Admineader;
