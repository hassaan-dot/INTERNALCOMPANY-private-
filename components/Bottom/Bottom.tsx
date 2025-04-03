import { Image } from "react-native";
import { icons } from "../../assets/icons/icons";
import { Tabs } from "expo-router";
import helpers from "@/src/utils/helpers";

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const Bottom_Items = [
  {
    name: "dashboard",
    href: "/(app)/dashboard",
    tabBarIcon: ({ color, size, focused }: TabIconProps) => (
      <Image
        source={icons.BottomHomeIcon}
        style={{
          width: size + 5,
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
