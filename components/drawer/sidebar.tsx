// import { PoppinsRegular } from "@/constants/fonts";
// import { drawer_items } from "@/constants/sidebar";
// import { ProfileHeader } from "@/src/Components";
// import helpers from "@/src/utils/helpers";
// import { Drawer } from "expo-router/drawer";
// import React from "react";
// import { Platform } from "react-native";
// import DrawerItem from "./drawer_item";

// const Sidebar = () => {
//   return (
//     <Drawer
//       initialRouteName="dashboard"
//       drawerContent={() => <DrawerItem />}
//       screenOptions={{
//         header: (props) => <ProfileHeader {...props} />,
//         headerShown: true,
//         drawerStyle: {
//           backgroundColor: "#fff",
//           // width: helpers.wp(19),
//           flex: 1,
//           borderWidth: 0,
//           borderColor: "#fff",
//         },
//         drawerLabelStyle: {
//           fontSize: 16,
//           fontWeight: "600",
//           color: "#333",
//           fontFamily: PoppinsRegular,
//         },
//         // drawerActiveTintColor: '#2F317E',
//         // drawerInactiveTintColor: '#888',
//         // drawerType:''
//         drawerType: Platform.OS == "ios" ? "slide" : "permanent",
//         // swipeEdgeWidth: 50,
//         drawerPosition: "left",
//       }}
//     >
//       {drawer_items?.map((item) => (
//         <Drawer.Screen
//           name={item.name}
//           options={{
//             // headerShown: false,
//             drawerLabel: item.label,
//             title: item.label,
//             drawerIcon: item.drawerIcon,
//           }}
//         />
//       ))}
//     </Drawer>
//   );
// };

// export default Sidebar;
import { PoppinsRegular } from "@/constants/fonts";
import { drawer_items } from "@/constants/sidebar";
import { ProfileHeader } from "@/src/Components";
import helpers from "@/src/utils/helpers";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Platform, useWindowDimensions } from "react-native";
import DrawerItem from "./drawer_item";

const Sidebar = () => {
  const { width } = useWindowDimensions();

  const getDrawerWidth = () => {
    if (Platform.OS === "web") {
      return Math.min(width * 0.18, 300);
    }

    return width >= 768 ? 60 : width * 0.7;
  };

  const getDrawerType = () => {
    if (Platform.OS === "web") {
      return "permanent";
    }

    if (Platform.OS === "ios") {
      return "slide";
    }

    return width >= 768 ? "permanent" : "slide";
  };

  return (
    <Drawer
      initialRouteName="dashboard"
      drawerContent={() => <DrawerItem />}
      screenOptions={{
        header: (props) => <ProfileHeader {...props} />,
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#fff",
          width: getDrawerWidth(),
          borderWidth: 0,
          borderColor: "#fff",
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          color: "#333",
          fontFamily: PoppinsRegular,
        },
        drawerType: getDrawerType(),
        drawerPosition: "left",
        swipeEdgeWidth: Platform.select({
          web: 0,
          default: 50,
        }),
        overlayColor: "transparent",
      }}
    >
      {drawer_items?.map((item, index) => (
        <Drawer.Screen
          key={index}
          name={item.name}
          options={{
            drawerLabel: item.label,
            title: item.label,
            drawerIcon: item.drawerIcon,
          }}
        />
      ))}
    </Drawer>
  );
};

export default Sidebar;
