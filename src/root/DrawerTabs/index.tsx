// import {
//     View,
//     Image,
//     Text,
//     TouchableOpacity,
//     FlatList,
//     Alert,
//     ScrollView,
//     StyleSheet,
//   } from 'react-native';
//   import {
//     createDrawerNavigator,
//     DrawerContentScrollView,
//     DrawerItem,
//   } from '@react-navigation/drawer';
//   import Ionicons from 'react-native-vector-icons/Ionicons';
//   import Ionicons_material from 'react-native-vector-icons/MaterialIcons';
//   import Ionicons_Entypo from 'react-native-vector-icons/Entypo';
//   import Ionicons_FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
// import { useState } from 'react';
// //   import Images from '../../assets/Images';

//   // Define all static screens
//   const DashboardScreen = () => (
//     <View style={styles.screen}>
//       <Text>Dashboard Screen</Text>
//     </View>
//   );

//   const UserManagementScreen = () => (
//     <View style={styles.screen}>
//       <Text>User Management Screen</Text>
//     </View>
//   );

//   const CoursesScreen = () => (
//     <View style={styles.screen}>
//       <Text>Courses Screen</Text>
//     </View>
//   );

//   const EnrollmentsScreen = () => (
//     <View style={styles.screen}>
//       <Text>Enrollments Screen</Text>
//     </View>
//   );

//   const TranscriptScreen = () => (
//     <View style={styles.screen}>
//       <Text>Transcript Screen</Text>
//     </View>
//   );

//   const InvoicesScreen = () => (
//     <View style={styles.screen}>
//       <Text>Invoices Screen</Text>
//     </View>
//   );

//   const FeedbackScreen = () => (
//     <View style={styles.screen}>
//       <Text>Feedback Screen</Text>
//     </View>
//   );

//   // Styles
//   const styles = StyleSheet.create({
//     screen: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     drawerContent: {
//       flex: 1,
//     },
//     logoContainer: {
//       alignItems: 'center',
//       paddingVertical: 20,
//     },
//     logo: {
//       width: 100,
//       height: 100,
//     },
//     drawerItems: {
//       flex: 1,
//     },
//     drawerItem: {
//       marginVertical: 5,
//     },
//     drawerItemLabel: {
//       fontSize: 16,
//       fontWeight: '600',
//     },
//     submenuContainer: {
//       marginLeft: 20,
//     },
//     submenuItem: {
//       paddingVertical: 10,
//     },
//     submenuDots: {
//       fontSize: 24,
//       color: '#000',
//     },
//     submenuTextname: {
//       fontSize: 14,
//       marginLeft: 10,
//     },
//     signOutContainer: {
//       padding: 20,
//       borderTopWidth: 1,
//       borderTopColor: '#ccc',
//     },
//     signOutButton: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     signOutIcon: {
//       marginRight: 10,
//     },
//     signOutText: {
//       fontSize: 16,
//       fontWeight: '600',
//     },
//   });

//   const Drawer = createDrawerNavigator();

//   // Static drawer tabs with all screens
//   const drawerTabs = [
//     {
//       name: 'Dashboard',
//       component: DashboardScreen,
//       options: {
//         drawerLabel: 'Dashboard',
//         title: 'Dashboard',
//         drawerIcon: (color, size) => (
//           <Ionicons_material name="dashboard" size={size} color={'skyblue'} />
//         ),
//       },
//     },
//     {
//       name: 'UserManagement',
//       component: UserManagementScreen,
//       options: {
//         drawerLabel: 'User Management',
//         title: 'User Management',
//         drawerIcon: (color, size) => (
//           <Ionicons_material name="people" size={size} color={'green'} />
//         ),
//       },
//     },
//     {
//       name: 'Courses',
//       component: CoursesScreen,
//       options: {
//         drawerLabel: 'Courses',
//         title: 'Courses',
//         drawerIcon: (color, size) => (
//           <Ionicons_material name="my-library-books" size={size} color={'red'} />
//         ),
//       },
//     },
//     {
//       name: 'Enrollments',
//       component: EnrollmentsScreen,
//       options: {
//         drawerLabel: 'Enrollments',
//         title: 'Enrollments',
//         drawerIcon: (color, size) => (
//           <Ionicons_material name="app-registration" size={size} color={'pink'} />
//         ),
//       },
//     },
//     {
//       name: 'Transcript',
//       component: TranscriptScreen,
//       options: {
//         drawerLabel: 'Transcript',
//         title: 'Transcript',
//         drawerIcon: (color, size) => (
//           <Ionicons_Entypo name="newsletter" size={size} color={'orange'} />
//         ),
//       },
//     },
//     {
//       name: 'Invoices',
//       component: InvoicesScreen,
//       options: {
//         drawerLabel: 'Invoices',
//         title: 'Invoices',
//         drawerIcon: (color, size) => (
//           <Ionicons_FontAwesome6
//             name="file-invoice"
//             size={size}
//             color={'yellow'}
//           />
//         ),
//       },
//     },
//     {
//       name: 'Feedback',
//       component: FeedbackScreen,
//       options: {
//         drawerLabel: 'Feedback',
//         title: 'Feedback',
//         drawerIcon: (color, size) => (
//           <Ionicons
//             name="chatbox-ellipses-outline"
//             size={size}
//             color={'purple'}
//           />
//         ),
//       },
//     },
//   ];

//   // Static student data for courses
//   const studentData = [
//     { id: '1', CourseId: '101', CourseName: 'Mathematics' },
//     { id: '2', CourseId: '102', CourseName: 'Physics' },
//     { id: '3', CourseId: '103', CourseName: 'Chemistry' },
//     { id: '4', CourseId: '104', CourseName: 'Biology' },
//   ];

//   // Custom Drawer Content Component
//   const CustomDrawerContent = (props) => {
//     const [isCoursesOpen, setIsCoursesOpen] = useState(false);

//     const handleTabPress = (tabName) => {
//       if (tabName === 'Courses') {
//         setIsCoursesOpen(!isCoursesOpen);
//       } else {
//         setIsCoursesOpen(false);
//         props.navigation.navigate(tabName); // Navigate to the selected screen
//       }
//     };

//     return (
//       <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
//         <View style={styles.logoContainer}>
//           {/* <Image source={Images.Logo} style={styles.logo} /> */}
//         </View>
//         <View style={styles.drawerItems}>
//           {drawerTabs.map((item, index) => (
//             <View key={index}>
//               <DrawerItem
//                 label={item.options.drawerLabel}
//                 icon={({color, size}) => item.options.drawerIcon(color, size)}
//                 onPress={() => handleTabPress(item.name)}
//                 style={styles.drawerItem}
//                 labelStyle={styles.drawerItemLabel}
//               />

//               {item.name === 'Courses' && isCoursesOpen && (
//                 <ScrollView style={styles.submenuContainer}>
//                   <FlatList
//                     data={studentData}
//                     style={{ marginLeft: 10 }}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                       <TouchableOpacity
//                         onPress={() =>
//                           Alert.alert(
//                             `Course Selected`,
//                             `You selected: ${item.CourseName}`,
//                           )
//                         }
//                         style={styles.submenuItem}
//                       >
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             marginHorizontal: 0,
//                           }}
//                         >
//                           <View>
//                             <Text style={styles.submenuDots}>{'.'}</Text>
//                           </View>
//                           <View>
//                             <Text style={[styles.submenuTextname]}>
//                               {item.CourseName}
//                             </Text>
//                           </View>
//                         </View>
//                       </TouchableOpacity>
//                     )}
//                   />
//                 </ScrollView>
//               )}
//             </View>
//           ))}
//         </View>
//         <View style={styles.signOutContainer}>
//           <TouchableOpacity
//             style={styles.signOutButton}
//             onPress={() => Alert.alert('Sign Out', 'Are you sure you want to sign out?')}
//           >
//             <Ionicons
//               name="log-out-outline"
//               size={24}
//               color="pink"
//               style={styles.signOutIcon}
//             />
//             <Text style={styles.signOutText}>Sign Out</Text>
//           </TouchableOpacity>
//         </View>
//       </DrawerContentScrollView>
//     );
//   };

//   // Main Drawer Navigator
//   const Drawer_Tabs = () => {
//     return (
//       <Drawer.Navigator
//         initialRouteName="Dashboard" // Set the default screen to Dashboard
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//         screenOptions={{
//           drawerStyle: {
//             backgroundColor: '#F0F1F6',
//             width: 280,
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 0 },
//             shadowOpacity: 0.1,
//             shadowRadius: 10,
//           },
//           drawerLabelStyle: {
//             fontSize: 16,
//             fontWeight: '600',
//             color: '#333',
//           },
//           drawerActiveTintColor: '#2F317E',
//           drawerInactiveTintColor: '#888',
//           drawerType: 'permanent',
//           swipeEdgeWidth: 50,
//           drawerPosition: 'left',
//         }}
//       >
//         {drawerTabs.map((item, index) => (
//           <Drawer.Screen
//             key={index}
//             name={item.name}
//             component={item.component}
//             options={item.options}
//           />
//         ))}
//       </Drawer.Navigator>
//     );
//   };

//   export default Drawer_Tabs;
import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons_material from "react-native-vector-icons/MaterialIcons";
import Ionicons_Entypo from "react-native-vector-icons/Entypo";
import Ionicons_FontAwesome6 from "react-native-vector-icons/FontAwesome5";
import { ProfileHeader } from "@/src/Components";
import Dashboard from "@/src/Screens/Dashboard/screen";
import { createStackNavigator } from "@react-navigation/stack";
import UserManagement from "@/src/Screens/UserManagement/screen";
import UserDetails from "@/src/Screens/UserDetails/screen";
import ClientManagement from "@/src/Screens/ClientManagement/screen";
import ClientDetails from "@/src/Screens/ClientDetails/screen";
import PO_Management from "@/src/Screens/PO_Management/screen";
import PO_Add from "@/src/Screens/PO_Add/screen";
import POdetails from "@/src/Screens/POdetails/screen";
import Request from "@/src/Screens/Request/screen";
import RequestDetails from "@/src/Screens/RequestDetails/screen";
import PaymentHis from "@/src/Screens/PaymentHistory/screen";
import PaymentDetails from "@/src/Screens/PaymentDetails/screen";
import helpers from "@/src/utils/helpers";
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsRegular,
} from "@/src/Resources/fonts";
import { icons } from "../../assets/icons/icons";
const Stack = createStackNavigator();

const UserManagementfunction = () => {
  return (
    <Stack.Navigator initialRouteName="User Management">
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
    <Stack.Navigator initialRouteName="Client Management">
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
const drawerTabs = [
  {
    name: "Dashboard",
    component: Dashboard,
    options: {
      drawerLabel: "Dashboard",
      title: "Dashboard",
      drawerIcon: ( color, size, focused ) => (
        <Image
          source={icons.drawertabdashboardIcon}
          style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
        />
      ),
    },
  },
  {
    name: "User Management",
    component: UserManagementfunction,
    options: {
      drawerLabel: "User Management",
      title: "User Management",
      drawerIcon: ( color, size, focused ) => (
        <Image
          source={icons.drawertabUsersIcon}
          style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
        />
      ),
    },
  },
  {
    name: "Client Management",
    component: ClientManagementfunction,
    options: {
      drawerLabel: "Client Management",
      title: "Client Management",
      drawerIcon: ( color, size, focused ) => (
        <Image
          source={icons.drawertabUsersIcon}
          style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
        />
      ),
    },
  },
  {
    name: "PO Management",
    component: POManagementfunction,
    options: {
      drawerLabel: "PO Management",
      title: "PO Management",
      drawerIcon: ( color, size, focused ) => (
        <Image
          source={icons.drawertabLawIcon}
          style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
        />
      ),
    },
  },
  {
    name: "Payment",
    component: PaymentHistoryFunc,
    options: {
      drawerLabel: "Payment",
      title: "Payment",
      drawerIcon: ( color, size, focused ) => (
        <Image
          source={icons.drawertabnoteIcon}
          style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
        />
      ),
    },
  },
  {
    name: "Requests",
    component: Requestfunction,
    options: {
      drawerLabel: "Requests",
      title: "Requests",
      drawerIcon: ( color, size, focused ) => (
        <Image
          source={icons.drawertabstarsupIcon}
          style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
        />
      ),
    },
  },
];

// Static student data for courses
const studentData = [
  { id: "1", CourseId: "101", CourseName: "Mathematics" },
  { id: "2", CourseId: "102", CourseName: "Physics" },
  { id: "3", CourseId: "103", CourseName: "Chemistry" },
  { id: "4", CourseId: "104", CourseName: "Biology" },
];

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const activeRoute = props.state.routeNames[props.state.index];

  const handleTabPress = (tabName) => {
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
        {drawerTabs.map((item, index) => (
          <View key={index}>
            <DrawerItem
              focused={activeRoute === item.name}
              label={item.options.drawerLabel}
              icon={({ color, size, focused = activeRoute == item.name }) =>
                item.options.drawerIcon(color, size, focused)
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
      {/* <View style={styles.signOutContainer}>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() =>
            Alert.alert("Sign Out", "Are you sure you want to sign out?")
          }
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color="pink"
            style={styles.signOutIcon}
          />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View> */}
    </DrawerContentScrollView>
  );
};

// Main Drawer Navigator
const Drawer_Tabs = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard" // Set the default screen to Dashboard
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: (props) => <ProfileHeader {...props} />,
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
        drawerType:Platform.OS=='ios'?'slide': "permanent",
        // swipeEdgeWidth: 50,
        drawerPosition: "left",
      }}
    >
      {drawerTabs.map((item, index) => (
        <Drawer.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default Drawer_Tabs;
