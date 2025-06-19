import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import { I18nManager } from "react-native";
import * as Updates from "expo-updates";
import i18n from "@/src/i18n";

const Home = () => {
  const { token } = useAuthStore();

  useEffect(() => {
    const isArabic = i18n.language === "ar";
    if (I18nManager.isRTL !== isArabic) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(isArabic);
      Updates.reloadAsync();
    }
  }, []);

  if (!token) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(app)/dashboard" />;
};

export default Home;
