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
  // {
  //   name: "dashboard",
  //   label: "Client Management",
  //   href: "/(app)/dashboard",
  //   drawerIcon: (color, size, focused) => (
  //     <Image
  //       source={icons.drawertabUsersIcon}
  //       style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
  //     />
  //   ),
  // },
  // {
  //   name: "dashboard",
  //   label: "PO Management",
  //   href: "/(app)/dashboard",
  //   drawerIcon: (color, size, focused) => (
  //     <Image
  //       source={icons.drawertabLawIcon}
  //       style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
  //     />
  //   ),
  // },
  // {
  //   name: "dashboard",
  //   label: "Payment",
  //   href: "/(app)/dashboard",
  //   drawerIcon: (color, size, focused) => (
  //     <Image
  //       source={icons.drawertabnoteIcon}
  //       style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
  //     />
  //   ),
  // },
  // {
  //   name: "dashboard",
  //   label: "Requests",
  //   href: "/(app)/dashboard",
  //   drawerIcon: (color, size, focused) => (
  //     <Image
  //       source={icons.drawertabstarsupIcon}
  //       style={{ width: 20, height: 20, tintColor: focused ? "#fff" : "" }}
  //     />
  //   ),
  // },
];
