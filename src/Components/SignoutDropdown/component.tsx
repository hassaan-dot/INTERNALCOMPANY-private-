import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { styles } from "./styles";
import LocalStorage from "@/services/local-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";

type SignoutDropdownProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const SignoutDropdown: React.FC<SignoutDropdownProps> = ({
  visible,
  setVisible,
}: any) => {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleSignout = async () => {
    await LocalStorage.remove("token");
    await LocalStorage.remove("user");
    setToken(null);
    setUser(null);
    router.replace("/(auth)/login");
    setVisible(false);
  };

  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={handleSignout}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SignoutDropdown;
