import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { icons } from "@/assets/icons/icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState(
    (state) => state?.routes?.[state.index]?.name
  );
  const { t } = useTranslation();

  if (currentRoute === "Login") return null;

  const items = [
    {
      label: t("sidebar.dashboard"),
      screen: "Dashboard",
      source: icons.drawertabdashboardIcon,
    },
    {
      label: t("sidebar.userManagement"),
      screen: "User Management",
      source: icons.drawertabUsersIcon,
    },
    {
      label: t("sidebar.clientManagement"),
      screen: "Client Management",
      source: icons.drawertabUsersIcon,
    },
    {
      label: t("sidebar.poManagement"),
      screen: "PO Management",
      source: icons.drawertabLawIcon,
    },
    {
      label: t("sidebar.payment"),
      screen: "Payment",
      source: icons.drawertabUsersIcon,
    },
    {
      label: t("sidebar.requests"),
      screen: "Request",
      source: icons.drawertabUsersIcon,
    },
    {
      label: t("sidebar.reports"),
      screen: "Reports",
      source: icons.drawertabUsersIcon,
    },
  ];

  return (
    <View style={styles.sidebar}>
      <View style={styles.childView}>
        {items.map((item) => {
          const isActive = currentRoute === item.screen;
          return (
            <TouchableOpacity
              key={item.screen}
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
