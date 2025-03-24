// // import React from "react";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import { Image } from "react-native";
// // import { icons } from "../../assets/icons/icons"; // Adjust path if needed
// // import { Tabs } from "expo-router";

// // type drawerIconProps = {
// //   color: string;
// //   size: number;
// //   focused: boolean;
// // };

// // // Define tab items dynamically
// // const Bottom_Items = [
// //     {
// //       name: "dashboard",
// //       label: "Dashboard",
// //       href: "/(app)/dashboard",
// //       tabBarIcon: ({ color, size, focused }: drawerIconProps) => (
// //         <Image
// //           source={icons.drawertabdashboardIcon}
// //           style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" ,backgroundColor:'red'}}
// //         />
// //       ),
// //     },
// //     {
// //       name: "user-management",
// //       label: "User Management",
// //       href: "/(app)/user-management",
// //       tabBarIcon: ({ color, size, focused }: drawerIconProps) => (
// //         <Image
// //           source={icons.drawertabUsersIcon}
// //           style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
// //         />
// //       ),
// //     },
// //     {
// //       name: "client-management",
// //       label: "Client Management",
// //       href: "/(app)/client-management",
// //       tabBarIcon: ({ color, size, focused }: drawerIconProps) => (
// //         <Image
// //           source={icons.drawertabUsersIcon}
// //           style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
// //         />
// //       ),
// //     },

// //   ];

// // // Create Tab Navigator
// // const Tab = createBottomTabNavigator();

// // export default function BottomTabs() {
// //   return (
// //     <Tabs
// //       screenOptions={({ route }) => ({

// //         tabBarIcon: ({ focused }: TabIconProps) => {
// //           const tab = Bottom_Items.find((item) => item.name === route.name);
// //           return tab ? (
// //             <Image
// //               source={icons.drawertabUsersIcon}
// //               style={{ width: 20, height: 20, tintColor: focused ? "#007bff" : "#aaa" }}
// //             />
// //           ) : null;
// //         },
// //         tabBarActiveTintColor: "#007bff",
// //         tabBarInactiveTintColor: "#aaa",
// //         headerShown: false,
// //       })}
// //     >
// //       {Bottom_Items?.map((tab) => (
// //         <Tab.Screen
// //         key={tab.name}
// //         name={tab.name}
// //         // component={tab.href}
// //         options={{tabBarIcon:tab.tabBarIcon}}
// //          />
// //       ))}
// //     </Tabs>
// //   );
// // }
// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Image } from "react-native";
// import { icons } from "../../assets/icons/icons"; // Adjust path if needed
// import { Tabs } from "expo-router";

// type TabIconProps = {
//   color: string;
//   size: number;
//   focused: boolean;
// };

// // Define tab items dynamically
// const Bottom_Items = [
//   {
//     name: "dashboard",
//     label: "Dashboard",
//     href: "/(app)/dashboard",
//     tabBarIcon: ({ color, size, focused }: TabIconProps) => (
//       <Image
//         source={icons.drawertabdashboardIcon}
//         style={{ width: size, height: size, tintColor: focused ? "#007bff" : "#aaa" }}
//       />
//     ),
//   },
//   {
//     name: "user-management",
//     label: "User Management",
//     href: "/(app)/user-management",
//     tabBarIcon: ({ color, size, focused }: TabIconProps) => (
//       <Image
//         source={icons.drawertabUsersIcon}
//         style={{ width: size, height: size, tintColor: focused ? "#007bff" : "#aaa" }}
//       />
//     ),
//   },
//   {
//     name: "client-management",
//     label: "Client Management",
//     href: "/(app)/client-management",
//     tabBarIcon: ({ color, size, focused }: TabIconProps) => (
//       <Image
//         source={icons.drawertabUsersIcon}
//         style={{ width: size, height: size, tintColor: focused ? "#007bff" : "#aaa" }}
//       />
//     ),
//   },
// ];

// // Create Tab Navigator
// const Tab = createBottomTabNavigator();

// export default function BottomTabs() {
//   return (
//     <Tab.Navigator
//     initialRouteName="dashboard"
//       screenOptions={{
//         tabBarActiveTintColor: "#007bff",
//         tabBarInactiveTintColor: "#aaa",
//         headerShown: false,
//       }}
//     >
//       {Bottom_Items.map((tab) => (
//         <Tab.Screen
//           key={tab.name}
//           name={tab.name}
//           component={() => null} // Replace with actual component if needed
//           options={{
//             tabBarLabel: tab.label,
//             tabBarIcon: tab.tabBarIcon,
//           }}
//         />
//       ))}
//     </Tab.Navigator>
//   );
// }import React from "react";
import { Image } from "react-native";
import { icons } from "../../assets/icons/icons"; // Adjust path if needed
import { Tabs } from "expo-router";
import helpers from "@/src/utils/helpers";

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

// Define tab items dynamically
const Bottom_Items = [
  {
    name: "dashboard",
    href: "/(app)/dashboard", // Expo Router href
    tabBarIcon: ({ color, size, focused }: TabIconProps) => (
      <Image
        source={icons.BottomHomeIcon}
        style={{
          width: size + 5, // Slightly bigger icons
          height: size + 5,
          tintColor: focused ? "#07504B" : "#aaa",
        }}
      />
    ),
  },
  {
    name: "users",
    href: "/(tabs)/users/index",
    tabBarIcon: ({ color, size, focused }: TabIconProps) => (
      <Image
        source={icons.bottomChatIcon}
        style={{
          width: size + 5,
          height: size + 5,
          tintColor: focused ? "#07504B" : "#aaa",
        }}
      />
    ),
  },
  {
    name: "profile",
    href: "/(tabs)/profile/index",
    tabBarIcon: ({ color, size, focused }: TabIconProps) => (
      <Image
        source={icons.bottomaddSquareIcon}
        style={{
          width: size + 5,
          height: size + 5,
          tintColor: focused ? "#007bff" : "#aaa",
        }}
      />
    ),
  },

  {
    name: "profile4",
    href: "/(tabs)/usershappy/index",
    tabBarIcon: ({ color, size, focused }: TabIconProps) => (
      <Image
        source={icons.bottomThumSquareIcon}
        style={{
          width: size + 5,
          height: size + 5,
          tintColor: focused ? "#007bff" : "#aaa",
        }}
      />
    ),
  },
  {
    name: "profile5",
    href: "/(tabs)/usershappy2/index",
    tabBarIcon: ({ color, size, focused }: TabIconProps) => (
      <Image
        source={icons.bottomaddProfileIcon}
        style={{
          width: size + 5,
          height: size + 5,
          tintColor: focused ? "#07504B" : "#aaa",
        }}
      />
    ),
  },
];

export default function BottomTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: {
          marginTop: 20, // Adjust icon position
          width: 30, // Set a fixed width (optional)
          height: 30, // Set a fixed height (optional)
        },
        tabBarShowLabel: false, // Hide titles
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5, // Shadow effect for Android
          shadowOpacity: 0.1, // Light shadow for iOS
          height: helpers.hp(10), // Increased tab height
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      {Bottom_Items.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: tab.tabBarIcon,
          }}
        />
      ))}
    </Tabs>
  );
}
