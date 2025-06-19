import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../Screens/Login/screen";
import drawerTabs from "./DrawerTabs/index";
import FontLoader from "../../assets/fonts/font";
import { I18nManager } from 'react-native';

// Dummy Screens (Replace with your actual screens)
const LoginScreen1 = ({ navigation }: { navigation: any }) => (
  <View style={styles.screen}>
    <Text>Login Screen</Text>
    <Button title="Login" onPress={() => navigation.navigate("Home")} />
  </View>
);

const DashboardScreen = () => (
  <View style={styles.screen}>
    <Text>Dashboard Screen</Text>
  </View>
);

const UserManagementScreen = () => (
  <View style={styles.screen}>
    <Text>User Management Screen</Text>
  </View>
);

const ClientManagementScreen = () => (
  <View style={styles.screen}>
    <Text>Client Management Screen</Text>
  </View>
);

const POManagementScreen = () => (
  <View style={styles.screen}>
    <Text>PO Management Screen</Text>
  </View>
);

const RequestScreen = () => (
  <View style={styles.screen}>
    <Text>Request Screen</Text>
  </View>
);

const ReportsScreen = () => (
  <View style={styles.screen}>
    <Text>Reports Screen</Text>
  </View>
);

const PaymentHistoryScreen = () => (
  <View style={styles.screen}>
    <Text>Payment History Screen</Text>
  </View>
);

// Drawer Navigator
const Drawer = createDrawerNavigator();

// Stack Navigator
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Portal"
        component={drawerTabs} // Drawer Navigator after Login
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    //  </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sidebar: {
    flex: 1,
    paddingTop: 40,
    paddingStart: 20, // replaces paddingHorizontal for RTL-aware layout
    paddingEnd: 20,
    backgroundColor: "#f5f5f5",
    alignItems: I18nManager.isRTL ? "flex-end" : "flex-start", // align text RTL
  },
  item: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: I18nManager.isRTL ? "right" : "left", // flip text
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr", // for Android text rendering
    color: "red",
  },
});

export default MainNavigator;
