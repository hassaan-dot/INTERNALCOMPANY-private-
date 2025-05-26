import Sidebar from "@/components/drawer/sidebar";
import LocalStorage from "@/services/local-storage";
import { ProfileHeader } from "@/src/Components";
import { useAuthStore } from "@/store/useAuthStore";
import { Redirect, Slot } from "expo-router";
import { View, StyleSheet, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";

export default function AuthLayout() {
  const { token } = useAuthStore();
  const { i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  if (!token) return <Redirect href={"/(auth)/login"} />;

  return (
    <View style={styles.wrapper}>
      {!isRTL && <Sidebar />}
      <View
        style={[
          styles.content,
          {
            direction: isRTL ? "rtl" : "ltr",
            textAlign: isRTL ? "right" : "left",
          },
        ]}
      >
        <ProfileHeader />
        <Slot />
      </View>
      {isRTL && <Sidebar />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
});
