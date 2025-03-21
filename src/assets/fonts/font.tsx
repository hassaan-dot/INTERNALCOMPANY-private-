// // FontLoader.js
// import React, { useState, useEffect } from 'react';
// import { ActivityIndicator } from 'react-native';
// import * as Font from 'expo-font';
// import App from '../../../app/index';

// // Define all your custom fonts
// const customFonts = {
//   'Poppins-Regular': require('./Poppins/PoppinsRegular.ttf'),
//   'Poppins-SemiBold': require('./Poppins/PoppinsSemiBold.ttf'),
// //   'Poppins-Bold': require('./Poppins/PoppinsRegular.ttf'),
// //   'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
// //   'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
// //   'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
// //   'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
// //   'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
// //   'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
// //   'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
// //   'Roboto-Medium': require('./assets/fonts/RobotoMedium.ttf'),
// //   'Roboto-Regular': require('./assets/fonts/RobotoRegular.ttf'),
// //   'Rochester-Regular': require('./assets/fonts/RochesterRegular.ttf'),
// //   'StyleScript-Regular': require('./assets/fonts/StyleScriptRegular.ttf'),
// //   'OpenSans-SemiCondensedMedium': require('./assets/fonts/OpenSansSemiCondensedMedium.ttf'),
// };

// export default function FontLoader() {
//   const [fontsLoaded, setFontsLoaded] = useState(false);

//   useEffect(() => {
//     async function loadFonts() {
//       await Font.loadAsync(customFonts);
//       setFontsLoaded(true);
//     }

//     loadFonts();
//   }, []);

//   if (!fontsLoaded) {
//     return <ActivityIndicator size="large" color="#0000ff" />; // Show a loading indicator
//   }

//   return <App />; // Render your app once fonts are loaded
// }import { ActivityIndicator, StyleSheet, View } from 'react-native';
import App from '../../../src/root/index'; // Your main App component
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { LogBox, StyleSheet, View } from 'react-native';

// Define all your custom fonts
const customFonts = {

  'Poppins-Regular': require('./Poppins/PoppinsRegular.ttf'),
  'Poppins-SemiBold': require('./Poppins/PoppinsSemiBold.ttf'),
  'Poppins-Bold': require('./Poppins/PoppinsBold.ttf'),
  'Poppins-Light': require('./Poppins/PoppinsLight.ttf'),
  'Poppins-Medium': require('./Poppins/PoppinsMedium.ttf'),
//   'Montserrat-Bold': require(''),
//   'Montserrat-SemiBold': require('@/src/assets/fonts/Montserrat-SemiBold.ttf'),
//   'Montserrat-Regular': require('@/src/assets/fonts/Montserrat-Regular.ttf'),
//   'Montserrat-Light': require('@/src/assets/fonts/Montserrat-Light.ttf'),
//   'Montserrat-Medium': require('@/src/assets/fonts/Montserrat-Medium.ttf'),
  'Roboto-Medium': require('./Roboto/RobotoMedium.ttf'),
  'Roboto-Regular': require('./Roboto/RobotoRegular.ttf'),
  'Rochester-Regular': require('./Rochester/RochesterRegular.ttf'),
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