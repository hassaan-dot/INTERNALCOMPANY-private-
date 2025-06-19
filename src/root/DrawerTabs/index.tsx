import { ProfileHeader } from "@/src/Components";
import { PoppinsRegular } from "@/src/Resources/fonts";
import ClientDetails from "@/src/Screens/ClientDetails/screen";
import ClientManagement from "@/src/Screens/ClientManagement/screen";
import Dashboard from "@/src/Screens/Dashboard/screen";
import PaymentDetails from "@/src/Screens/PaymentDetails/screen";
import PaymentHis from "@/src/Screens/PaymentHistory/screen";
import PO_Add from "@/src/Screens/PO_Add/screen";
import PO_Management from "@/src/Screens/PO_Management/screen";
import POdetails from "@/src/Screens/POdetails/screen";
import Request from "@/src/Screens/Request/screen";
import RequestDetails from "@/src/Screens/RequestDetails/screen";
import UserDetails from "@/src/Screens/UserDetails/screen";
import UserManagement from "@/src/Screens/UserManagement/screen";
import helpers from "@/src/utils/helpers";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../assets/icons/icons";

const Stack = createStackNavigator();

const UserManagementfunction = () => {
  return (
    <Stack.Navigator
    // initialRouteName="User Management"
    >
      <Stack.Screen
        name="User Management"
        component={UserManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User Details"
        component={UserDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const ClientManagementfunction = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Client Management"
        component={ClientManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Client Details"
        component={ClientDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const POManagementfunction = () => {
  return (
    <Stack.Navigator initialRouteName="Purchasing Order">
      <Stack.Screen
        name="Purchasing Order"
        component={PO_Management}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add New PO"
        component={PO_Add}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="POdetails"
        component={POdetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const Requestfunction = () => {
  return (
    <Stack.Navigator initialRouteName="Request List">
      <Stack.Screen
        name="Request List"
        component={Request}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Request Details"
        component={RequestDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const PaymentHistoryFunc = () => {
  return (
    <Stack.Navigator initialRouteName="Payment History">
      <Stack.Screen
        name="Payment History"
        component={PaymentHis}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment Details"
        component={PaymentDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Define drawer items after function declarations
const drawer_items = [
  {
    name: "Dashboard",
    component: Dashboard,
  },
  {
    name: "User Management",
    component: UserManagementfunction,
  },
  {
    name: "Client Management",
    component: ClientManagementfunction,
  },
  {
    name: "Payment History",
    component: PaymentHistoryFunc,
  },
  {
    name: "Purchasing Order",
    component: POManagementfunction,
  },
  {
    name: "Request List",
    component: Requestfunction,
  },
];

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerContent: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  drawerItems: {
    flex: 1,
    backgroundColor: "white",
    marginTop: helpers.normalize(20),
  },
  drawerItem: {
    marginVertical: 0,
    borderRadius: 10,
    padding: 0,
    // paddingVertical:20,

    marginBottom: 12,
    // marginV:10,
    justifyContent: "center",
    height: helpers.hp(5.5),
  },
  drawerItemLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A47C60",
    fontFamily: PoppinsRegular,
  },
  submenuContainer: {
    marginLeft: 20,
  },
  submenuItem: {
    paddingVertical: 10,
  },
  submenuDots: {
    fontSize: 24,
    color: "#000",
  },
  submenuTextname: {
    fontSize: 14,
    marginLeft: 10,
  },
  signOutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  signOutIcon: {
    marginRight: 10,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

const Drawer = createDrawerNavigator();

// Static drawer tabs with all screens

// Static student data for courses
const studentData = [
  { id: "1", CourseId: "101", CourseName: "Mathematics" },
  { id: "2", CourseId: "102", CourseName: "Physics" },
  { id: "3", CourseId: "103", CourseName: "Chemistry" },
  { id: "4", CourseId: "104", CourseName: "Biology" },
];

// Custom Drawer Content Component
const CustomDrawerContent = (props: any) => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const activeRoute = props.state.routeNames[props.state.index];

  const handleTabPress = (tabName: string) => {
    if (tabName === "Courses") {
      setIsCoursesOpen(!isCoursesOpen);
    } else {
      setIsCoursesOpen(false);
      props.navigation.navigate(tabName); // Navigate to the selected screen
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      <View style={styles.logoContainer}>
        {/* <Image source={Images.Logo} style={styles.logo} /> */}
      </View>
      <View style={styles.drawerItems}>
        {drawer_items.map((item: any, index: number) => (
          <View key={index}>
            <DrawerItem
              focused={activeRoute === item.name}
              label={item.name}
              icon={({ color, size, focused = activeRoute == item.name }) =>
                item.icon ? item.icon(color, size, focused) : null
              }
              onPress={() => handleTabPress(item.name)}
              style={styles.drawerItem}
              labelStyle={[
                styles.drawerItemLabel,
                activeRoute === item.name && {
                  color: "#FFF",
                  fontWeight: "600",
                },
              ]}
              // activeTintColor="#2F317E"
              activeBackgroundColor="#07504B"
            />

            {item.name === "Courses" && isCoursesOpen && (
              <ScrollView style={styles.submenuContainer}>
                <FlatList
                  data={studentData}
                  style={{ marginLeft: 10 }}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          `Course Selected`,
                          `You selected: ${item.CourseName}`
                        )
                      }
                      style={styles.submenuItem}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginHorizontal: 0,
                        }}
                      >
                        <View>
                          <Text style={styles.submenuDots}>{"."}</Text>
                        </View>
                        <View>
                          <Text style={[styles.submenuTextname]}>
                            {item.CourseName}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
            )}
          </View>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

// Main Drawer Navigator
const Drawer_Tabs = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: () => <ProfileHeader />,
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#fff",
          width: helpers.wp(19),
          borderWidth: 0,
          borderColor: "#fff",
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          color: "#333",
          fontFamily: PoppinsRegular,
        },
        // drawerActiveTintColor: '#2F317E',
        // drawerInactiveTintColor: '#888',
        // drawerType:''
        drawerType: Platform.OS == "ios" ? "slide" : "permanent",
        // swipeEdgeWidth: 50,
        drawerPosition: "left",
      }}
    >
      {drawer_items.map((item: any, index: number) => (
        <Drawer.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{}}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default Drawer_Tabs;
