import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { styles } from "./styles";
import LocalStorage from "@/services/local-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";

const SignoutDropdown = ({ visible, setVisible }: any) => {
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
