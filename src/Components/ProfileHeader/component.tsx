import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { icons } from "@/src/Resources";
import helpers from "../../utils/helpers";
import SearchBar from "../SearchBar/searchBar";
import SignoutDropdown from "../SignoutDropdown/component";
interface ProfileHeaderProps {
  profileImage: any; // Can be a local image source or a URI string
  name: string;
  userType: string;
  desc: string;
  onMenuPress: () => void; // Function for the menu button press
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({}) => {
  const [visible, setVisible] = React.useState(false);
  const onMenuPress = () => {
    setVisible(!visible);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <View style={{ marginLeft: 30 }}>
        <SearchBar></SearchBar>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ right: helpers.normalize(40) }}>
          <View
            style={{
              backgroundColor: "#FF5630",
              borderRadius: 80,
              zIndex: 999999,
              justifyContent: "center",
              padding: 3,
              alignItems: "center",
              marginLeft: 10,
              top: 6,
            }}
          >
            <Text style={{ fontSize: 6, color: "#fff" }}>03</Text>
          </View>
          <Image
            source={icons.profileHeaderBellIcon}
            style={{ width: 20, height: 20, marginBottom: 6 }}
          ></Image>
        </View>
        <View>
          <TouchableOpacity onPress={onMenuPress}>
            <SignoutDropdown visible={visible} setVisible={setVisible} />
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
