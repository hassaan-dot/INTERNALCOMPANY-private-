import { Fonts } from "@/constants/fonts";
import { QueryProvider } from "@/services/query-client";
import { useAuthStore } from "@/store/useAuthStore";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { Stack } from "expo-router/stack";
import React, { useEffect } from "react";
import { ThemeProvider } from "../src/utils/theme/theme";
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
    <QueryProvider>
      <ThemeProvider>
        <Stack screenOptions={{}}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(app)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default RootLayout;
