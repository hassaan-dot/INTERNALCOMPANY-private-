import React from "react";
import { View, Text, TouchableOpacity, Modal, I18nManager, TouchableWithoutFeedback } from "react-native";
import { styles } from "./styles";
import LocalStorage from "@/services/local-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useClockIntUserAttendence, useClockOutUserAttendence, useGetUserAttendence, useUpdateUser } from "@/hooks/useUser";
import { useTranslation } from "react-i18next";
import CreateUserModal from "@/src/Components/Modals/CreateModalUser/component";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type SignoutDropdownProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const SignoutDropdown: React.FC<SignoutDropdownProps> = ({ visible, setVisible }) => {
  const { user, setUser, setToken } = useAuthStore();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { data: attendance } = useGetUserAttendence(user?.documentId);
  const { mutate: clockIn } = useClockIntUserAttendence(user?.documentId);
  const { mutate: clockOut } = useClockOutUserAttendence(user?.documentId);
  const { mutate: updateUser } = useUpdateUser();

  const isRTL = i18n.language === "ar";

  const handleSignout = async () => {
    await LocalStorage.remove("token");
    await LocalStorage.remove("user");
    setToken(null);
    setUser(null);
    setVisible(false);
    router.replace("/(auth)/login");
  };

  const handleProfileUpdate = (data: any) => {
    if (user?.id) {
      const updateData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,
        phone_number: data.phone_number,
        national_id: data.national_id,
      };

      updateUser({
        data: updateData,
        id: user.id
      });

      setUser({ ...user, ...updateData });
      setShowProfileModal(false);
    }
  };

  const handleOverlayPress = () => {
    if (!showProfileModal) {
      setVisible(false);
    }
  };

  return (
    <>
      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.dropdown,
                  isRTL ? { left: 25, right: "auto" } : { right: 25, left: "auto" },
                ]}
              >
                <View style={styles.menuItem}>
                  <Text style={styles.usernameText}>
                    {user?.first_name} {user?.last_name}
                  </Text>
                  {user?.role?.name && (
                    <Text style={styles.userMetaText}>{user.role.name}</Text>
                  )}
                  {user?.department && (
                    <Text style={styles.userMetaText}>{user.department}</Text>
                  )}
                </View>

                <View style={styles.divider} />

                <TouchableOpacity
                  style={[styles.menuItem]}
                  onPress={() => setShowProfileModal(true)}
                >
                  <View style={styles.menuIcon}>
                    <Ionicons name="settings-outline" size={20} color="#333" />
                  </View>
                  <Text style={styles.menuText}>{t("user.profile")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, styles.menuItemLast]}
                  onPress={handleSignout}
                >
                  <View style={styles.menuIcon}>
                    <Ionicons name="log-out-outline" size={20} color="#f44336" />
                  </View>
                  <Text style={styles.signOutText}>{t("user.sign_out")}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <CreateUserModal
        visible={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onSubmit={handleProfileUpdate}
        title={t("user.profile")}
        profileMode={true}
        userData={user}
      />
    </>
  );
};

export default SignoutDropdown;
