import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet, View } from "react-native";
import App from "./root/index"; // Your main App component
import './src/i18n';
import { ActivityIndicator } from "react-native-paper";
// Define all your custom fonts

// FontLoader component
const FontLoader = ({ children }: any) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children;
};

// Main Page component
export default function Page() {
  LogBox.ignoreAllLogs(true);
  return (
    <FontLoader>
      <App />
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
