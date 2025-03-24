import { Image } from "react-native";
import { icons } from "../assets/icons/icons";

type drawerIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export const drawer_items = [
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
  },
  {
    name: "payment",
    label: "Payment",
    href: "/(app)/payment",
    drawerIcon: ({ color, size, focused }: drawerIconProps) => (
      <Image
        source={icons.drawertabnoteIcon}
        style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
      />
    ),
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
  },
  {
    name: "request",
    label: "Request",
    href: "/(app)/request",
    drawerIcon: ({ color, size, focused }: drawerIconProps) => (
      <Image
        source={icons.drawertabstarsupIcon}
        style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
      />
    ),
  },
];
