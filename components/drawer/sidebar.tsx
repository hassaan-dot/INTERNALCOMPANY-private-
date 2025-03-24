import { PoppinsRegular } from "@/constants/fonts";
import { drawer_items } from "@/constants/sidebar";
import { ProfileHeader } from "@/src/Components";
import helpers from "@/src/utils/helpers";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Platform } from "react-native";
import DrawerItem from "./drawer_item";

const Sidebar = () => {
  return (
    <Drawer
      initialRouteName="dashboard"
      drawerContent={() => <DrawerItem />}
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
        drawerType: Platform.OS == "ios" ? "slide" : "permanent",
        // swipeEdgeWidth: 50,
        drawerPosition: "left",
      }}
    >
      {drawer_items?.map((item) => (
        <Drawer.Screen
          name={item.name}
          options={{
            // headerShown: false,
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
