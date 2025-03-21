import App from './root/index'; // Your main App component
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { LogBox, StyleSheet, View } from 'react-native';

// Define all your custom fonts
const customFonts = {

  'Poppins-Regular': require('./assets/fonts/Poppins/PoppinsRegular.ttf'),
  'Poppins-SemiBold': require('./assets/fonts/Poppins/PoppinsSemiBold.ttf'),
  'Poppins-Bold': require('./assets/fonts/Poppins/PoppinsBold.ttf'),
  'Poppins-Light': require('./assets/fonts/Poppins/PoppinsLight.ttf'),
  'Poppins-Medium': require('./assets/fonts/Poppins/PoppinsMedium.ttf'),
//   'Montserrat-Bold': require(''),
//   'Montserrat-SemiBold': require('@/src/assets/fonts/Montserrat-SemiBold.ttf'),
//   'Montserrat-Regular': require('@/src/assets/fonts/Montserrat-Regular.ttf'),
//   'Montserrat-Light': require('@/src/assets/fonts/Montserrat-Light.ttf'),
//   'Montserrat-Medium': require('@/src/assets/fonts/Montserrat-Medium.ttf'),
  'Roboto-Medium': require('./assets/fonts/Roboto/RobotoMedium.ttf'),
  'Roboto-Regular': require('./assets/fonts/Roboto/RobotoRegular.ttf'),
  'Rochester-Regular': require('./assets/fonts/Rochester/RochesterRegular.ttf'),
//   'StyleScript-Regular': require('@/src/assets/fonts/StyleScriptRegular.ttf'),
//   'OpenSans-SemiCondensedMedium': require('@/src/assets/fonts/OpenSansSemiCondensedMedium.ttf'),
};

// FontLoader component
const FontLoader = ({ children }) => {
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
        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      </View>
    );
  }

  return children; // Render the children (your app) once fonts are loaded
};

// Main Page component
export default function Page() {
    LogBox.ignoreAllLogs(true);
  return (

    <FontLoader >
      <App />
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});