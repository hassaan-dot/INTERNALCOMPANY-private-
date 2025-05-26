import React from "react";
import { View, Text, TouchableOpacity, Modal, I18nManager } from "react-native";
import { styles } from "./styles";
import LocalStorage from "@/services/local-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useClockIntUserAttendence, useClockOutUserAttendence, useGetUserAttendence } from "@/hooks/useUser";
import { useTranslation } from "react-i18next";

type SignoutDropdownProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const SignoutDropdown: React.FC<SignoutDropdownProps> = ({ visible, setVisible }) => {
  const { user, setUser, setToken } = useAuthStore();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { data: attendance } = useGetUserAttendence(user?.documentId);
  const { mutate: clockIn } = useClockIntUserAttendence(user?.documentId);
  const { mutate: clockOut } = useClockOutUserAttendence(user?.documentId);

  const isRTL = i18n.language === "ar";

  const handleSignout = async () => {
    await LocalStorage.remove("token");
    await LocalStorage.remove("user");
    setToken(null);
    setUser(null);
    setVisible(false);
    router.replace("/(auth)/login");
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.dropdown,
            isRTL ? { left: 25, right: "auto" } : { right: 25, left: "auto" },
          ]}
        >
          <Text style={[styles.usernameText, { textAlign: isRTL ? "right" : "left" }]}>
            {t("user.welcome")}, {user?.first_name} {user?.last_name}
          </Text>

          <TouchableOpacity onPress={handleSignout}>
            <Text style={[styles.signOutText, { textAlign: isRTL ? "right" : "left" }]}>
              {t("user.sign_out")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SignoutDropdown;
