// import {
//   NavigationContainer,
//   useNavigationContainerRef,
//   useNavigationState,
// } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import React from "react";
// import { StatusBar, View } from "react-native";
// import { ProfileHeader, Sidebar } from "../Components";
// import ClientDetails from "../Screens/ClientDetails/screen";
// import DashboardScreen from "../Screens/Dashboard/screen";
// // import { ProfileHeader, Sidebar } from "../Components";
// import ClientManagement from "../Screens/ClientManagement/screen";
// // import DashboardScreen from "../Screens/Dashboard/screen";
// // import LoginScreen from "../Screens/Login/screen";
// import PO_Add from "../Screens/PO_Add/screen";
// import PO_Management from "../Screens/PO_Management/screen";
// import POdetails from "../Screens/POdetails/screen";
// import Reports from "../Screens/Report/screen";
// import Request from "../Screens/Request/screen";
// import RequestDetails from "../Screens/RequestDetails/screen";
// import UserDetails from "../Screens/UserDetails/screen";
// import LoginScreen from "../Screens/Login/screen";
// import PaymentDetails from "../Screens/PaymentDetails/screen";
// import PaymentHis from "../Screens/PaymentHistory/screen";
// import UserManagement from "../Screens/UserManagement/screen";

// type RootStackParamList = {
//   Login: undefined;
//   Dashboard: undefined;
//   "Client Details": undefined;
//   "User Management": undefined;
//   "Client Management": undefined;
//   "PO Management": undefined;
//   "Add New PO": undefined;
//   POdetails: undefined;
//   Request: undefined;
//   "Request Details": undefined;
//   Reports: undefined;
//   "User Details": undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const UserManagementfunction = () => {
//   return (
//     <Stack.Navigator initialRouteName="User Management">
//       <Stack.Screen
//         name="User Management"
//         component={UserManagement}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="User Details"
//         component={UserDetails}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
// const ClientManagementfunction = () => {
//   return (
//     <Stack.Navigator initialRouteName="Client Management">
//       <Stack.Screen
//         name="Client Management"
//         component={ClientManagement}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Client Details"
//         component={ClientDetails}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
// const POManagementfunction = () => {
//   return (
//     <Stack.Navigator initialRouteName="Purchasing Order">
//       <Stack.Screen
//         name="Purchasing Order"
//         component={PO_Management}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Add New PO"
//         component={PO_Add}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="POdetails"
//         component={POdetails}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
// const Requestfunction = () => {
//   return (
//     <Stack.Navigator initialRouteName="Request List">
//       <Stack.Screen
//         name="Request List"
//         component={Request}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Request Details"
//         component={RequestDetails}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
// const PaymentHistoryFunc = () => {
//   return (
//     <Stack.Navigator initialRouteName="Payment History">
//       <Stack.Screen
//         name="Payment History"
//         component={PaymentHis}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Payment Details"
//         component={PaymentDetails}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// const MainNavigator = () => {
//   const state = useNavigationState((state) => state);
//   const currentRoute = state?.routes?.[state.index]?.name || "Login";

//   return (
//     <View style={{ flex: 1, flexDirection: "row" }}>
//       {/* {currentRoute !== "Login" && <Sidebar />} */}

//       <View style={{ flex: 1 }}>
//         {/* {currentRoute !== "Login" && <ProfileHeader></ProfileHeader>} */}
//         {/* <NavigationContainer> */}
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Dashboard"
//             component={DashboardScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="User Management"
//             component={UserManagementfunction}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Client Management"
//             component={ClientManagementfunction}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="PO Management"
//             component={POManagementfunction}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Request"
//             component={Requestfunction}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Reports"
//             component={Reports}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Payment"
//             component={PaymentHistoryFunc}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//         {/* </NavigationContainer> */}
//       </View>
//     </View>
//   );
// };

// export default MainNavigator;
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../Screens/Login/screen";
import drawerTabs from "./DrawerTabs/index";
import FontLoader from "../../assets/fonts/font";
// Dummy Screens (Replace with your actual screens)
const LoginScreen1 = ({ navigation }) => (
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

// Custom Sidebar Component
const Sidebar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Text style={styles.item}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("User Management")}>
        <Text style={styles.item}>User Management</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Client Management")}
      >
        <Text style={styles.item}>Client Management</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PO Management")}>
        <Text style={styles.item}>PO Management</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Request")}>
        <Text style={styles.item}>Request</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Reports")}>
        <Text style={styles.item}>Reports</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Payment History")}>
        <Text style={styles.item}>Payment History</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  item: {
    fontSize: 18,
    paddingVertical: 10,
    color: "red",
  },
});

export default MainNavigator;
