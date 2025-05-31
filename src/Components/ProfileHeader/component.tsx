import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import LanguageSwitcher from "../Language/LanguageSwitcher";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import LocalStorage from "@/services/local-storage";
import {
  useGetUserAttendence,
} from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import SignoutDropdown from "../SignoutDropdown/component";
import { useQueryClient } from "@tanstack/react-query";
import AttendenceModal from "../Modals/Attendence/component";

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, "0");
  const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const ProfileHeader: React.FC = () => {
  const { user, setUser, setToken } = useAuthStore();
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: attendance } = useGetUserAttendence(user?.documentId);
  const [visible, setVisible] = useState(false);
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [timer, setTimer] = useState("00:00:00");

  const isClockedIn = useMemo(() => {
    const clockIn = attendance?.data?.clock_in;
    const clockOut = attendance?.data?.clock_out;

    return (
      !!clockIn &&
      !clockOut &&
      !isNaN(new Date(clockIn).getTime()) &&
      clockIn !== "null" &&
      clockIn !== null &&
      clockIn !== undefined
    );
  }, [attendance?.data?.clock_in, attendance?.data?.clock_out]);

  const onMenuPress = () => setVisible(!visible);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isClockedIn && attendance?.data?.clock_in) {
      const start = new Date(attendance.data.clock_in).getTime();
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - start) / 1000);
        setTimer(formatDuration(elapsed));
      }, 1000);
    } else {
      setTimer("00:00:00");
    }

    return () => clearInterval(interval);
  }, [isClockedIn, attendance?.data?.clock_in]);

  const handleSignOut = async () => {
    await LocalStorage.remove("token");
    await LocalStorage.remove("user");
    setToken(null);
    setUser(null);
    router.replace("/(auth)/login");
  };

  const currentUser = {
    documentId: user?.documentId,
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
  };

  return (
    <View style={styles.container}>
      <View />

      <View style={styles.actionButtonsContainer}>
        <LanguageSwitcher />

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setAttendanceModalVisible(true)}
            style={styles.clockButtonIcon}
          >
            <Ionicons
              name={isClockedIn ? "stop-circle-outline" : "play-circle-outline"}
              size={28}
              color={isClockedIn ? "#f44336" : "#4CAF50"}
            />
          </TouchableOpacity>
        </View>
        {isClockedIn && <Text style={styles.timerText}>{timer}</Text>}

        <TouchableOpacity onPress={onMenuPress}>
          <SignoutDropdown visible={visible} setVisible={setVisible} />
          <Image
            source={{ uri: "https://api.tryitout.info/uploads/profile_icon_design_free_vector_29decaa99c.jpg" }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <AttendenceModal
          isVisible={attendanceModalVisible}
          onClose={() => setAttendanceModalVisible(false)}
          currentUser={currentUser}
          title={t("user_management.attendance")}
          name=""
        />
      </View>
    </View>
  );
};

export default ProfileHeader;
