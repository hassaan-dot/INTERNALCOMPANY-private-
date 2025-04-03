import { PoppinsRegular } from "@/constants/fonts";
import { ProfileHeader } from "@/src/Components";
import helpers from "@/src/utils/helpers";
import { Drawer } from "expo-router/drawer";
import React, { useMemo } from "react";
import { Platform, useWindowDimensions } from "react-native";
import DrawerItem from "./drawer_item";
import { Image } from "react-native";
import { icons } from "@/assets/icons/icons";
import { useAuthStore } from "@/store/useAuthStore";
import { ROLE } from "@/constants/role";
import { drawerIconProps } from "@/constants/types";

const Sidebar = () => {
  const { user } = useAuthStore();
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

  const drawer_items = useMemo(
    () => [
      {
        name: "dashboard",
        label: "Dashboard",
        href: "/(app)/dashboard",
        drawerIcon: ({ color, size, focused }: drawerIconProps) => (
          <Image
            source={icons.drawertabdashboardIcon}
            style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
          />
        ),
        show: true,
      },
      {
        name: "user-management",
        label: "User Management",
        href: "/(app)/user-management",
        drawerIcon: ({ color, size, focused }: drawerIconProps) => (
          <Image
            source={icons.drawertabUsersIcon}
            style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
          />
        ),
        show: user?.role?.name == ROLE.ADMIN,
      },
      {
        name: "client-management",
        label: "Client Management",
        href: "/(app)/client-management",
        drawerIcon: ({ color, size, focused }: drawerIconProps) => (
          <Image
            source={icons.drawertabUsersIcon}
            style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
          />
        ),
        show: user?.role?.name == ROLE.ADMIN,
      },
      {
        name: "payment",
        label: "Payment History",
        href: "/(app)/payment",
        drawerIcon: ({ color, size, focused }: drawerIconProps) => (
          <Image
            source={icons.drawertabnoteIcon}
            style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
          />
        ),
        show: true,
      },
      {
        name: "po-management",
        label: "PO Management",
        href: "/(app)/po-management",
        drawerIcon: ({ color, size, focused }: drawerIconProps) => (
          <Image
            source={icons.drawertabstarsupIcon}
            style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
          />
        ),
        show: true,
      },
      {
        name: "request",
        label: "Request",
        href: "/(app)/request",
        drawerIcon: ({ color, size, focused }: drawerIconProps) => (
          <Image
            source={icons.drawertabnoteIcon}
            style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
          />
        ),
        show: true,
      },
      {
        name: "report",
        label: "Report",
        href: "/(app)/report",
        drawerIcon: ({ color, size, focused }: drawerIconProps) => (
          <Image
            source={icons.drawertabstarsupIcon}
            style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
          />
        ),
        show: user?.role?.name == ROLE.ADMIN,
      },
    ],
    []
  );

  return (
    <Drawer
      initialRouteName="dashboard"
      drawerContent={() => <DrawerItem drawer_items={drawer_items} />}
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
      {drawer_items
        ?.filter((item) => item.show)
        ?.map((item, index) => (
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
