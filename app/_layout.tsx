import { Fonts } from "@/constants/fonts";
import { QueryProvider } from "@/services/query-client";
import { useAuthStore } from "@/store/useAuthStore";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { Stack } from "expo-router/stack";
import React, { useEffect } from "react";
import { ThemeProvider } from "../src/utils/theme/theme";
import { View } from "react-native";
// import Toast from "react-native-toast-message";
import { toastConfig } from "@/services/toastConfig";
import { I18nManager } from "react-native";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { loadData, isLoadingData } = useAuthStore();
  const [loaded] = useFonts(Fonts);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (loaded && !isLoadingData) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoadingData]);

  if (!loaded || isLoadingData) {
    return null;
  }

  return (
    <View style={{ flex: 1, direction: I18nManager.isRTL ? "rtl" : "ltr" }}>
      <QueryProvider>
        <ThemeProvider>
          <Stack screenOptions={{}}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </QueryProvider>
      {/* <Toast config={toastConfig} /> */}
    </View>
  );

};

export default RootLayout;
