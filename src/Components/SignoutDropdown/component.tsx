import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
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

const SignoutDropdown: React.FC<SignoutDropdownProps> = ({
  visible,
  setVisible,
}) => {
  const { user, setUser, setToken } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();

  const { data: attendance } = useGetUserAttendence(user?.documentId);
  const { mutate: clockIn } = useClockIntUserAttendence(user?.documentId);
  const { mutate: clockOut } = useClockOutUserAttendence(user?.documentId);

  const handleSignout = async () => {
    await LocalStorage.remove("token");
    await LocalStorage.remove("user");
    setToken(null);
    setUser(null);
    setVisible(false);
    router.replace("/(auth)/login");
  };

  const handleClock = () => {
    if (!attendance?.data?.clock_in_at) {
      clockIn(); // hasn't clocked in yet
    } else {
      clockOut(); // already clocked in, so clock out
    }
  };

  const isClockedIn = Boolean(attendance?.data?.clock_in_at && !attendance?.data?.clock_out_at);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dropdown}>
          <Text style={styles.usernameText}>
            {t("user.welcome")}, {user?.first_name} {user?.last_name}
          </Text>

          <TouchableOpacity onPress={handleSignout}>
            <Text style={styles.signOutText}>{t("user.sign_out")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SignoutDropdown;
