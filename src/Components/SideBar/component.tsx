import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { icons } from "../../Resources";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const Sidebar: React.FC = () => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState(
    (state) => state?.routes?.[state.index]?.name
  );
  console.log("curren index", currentRoute);
  return currentRoute === "Login" ? null : (
    <View style={styles.sidebar}>
      <View style={styles.childView}>
        {[
          {
            label: "Dashboard",
            screen: "Dashboard",
            source: icons.drawertabdashboardIcon,
          },
          {
            label: "User Management",
            screen: "User Management",
            source: icons.drawertabUsersIcon,
          },

          {
            label: "Client Management",
            screen: "Client Management",
            source: icons.drawertabUsersIcon,
          },

          {
            label: "PO Management",
            screen: "PO Management",
            source: icons.drawertabLawIcon,
          },
          {
            label: "Payment",
            screen: "Payment",
            source: icons.drawertabUsersIcon,
          },

          {
            label: "Requests",
            screen: "Request",
            source: icons.drawertabUsersIcon,
          },

          {
            label: "Reports",
            screen: "Reports",
            source: icons.drawertabUsersIcon,
          },
        ].map((item) => {
          const isActive = currentRoute === item.screen;

          return (
            <TouchableOpacity
              key={item.label}
              style={isActive ? styles.active : styles.item}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Image
                source={item.source}
                style={[
                  styles.custom,
                  { tintColor: isActive ? "#fff" : "#A47C60" },
                ]}
              />
              <Text style={isActive ? styles.itemText : styles.inactive}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Sidebar;
