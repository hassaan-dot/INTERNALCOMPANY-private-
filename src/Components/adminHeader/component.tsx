import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { styles } from "./style";
import { useTranslation } from "react-i18next";
import * as Updates from "expo-updates";

interface ProfileHeaderProps {
  profileImage: any;
  name: string;
  userType: string;
  desc: string;
  onMenuPress: () => void;
}

const Admineader: React.FC<ProfileHeaderProps> = ({
  profileImage,
  userType,
  name,
  desc,
  onMenuPress,
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = async () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    await i18n.changeLanguage(newLang);

    const isRTL = newLang === "ar";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      Updates.reloadAsync();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <View>
        <Text style={{ fontWeight: "700", fontSize: 16, color: "#000" }}>
          {t("adminHeader.title")}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <TouchableOpacity
          onPress={toggleLanguage}
          style={{ marginRight: 15, padding: 6 }}
        >
          <Text style={{ color: "#007bff", fontWeight: "bold" }}>
            {currentLang === "en" ? "AR" : "EN"}
          </Text>
        </TouchableOpacity> */}

        <Image
          source={{
            uri: profileImage || "https://randomuser.me/api/portraits/men/1.jpg",
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

export default Admineader;
