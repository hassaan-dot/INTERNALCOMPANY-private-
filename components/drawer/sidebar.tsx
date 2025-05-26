import { PoppinsRegular } from "@/constants/fonts";
import { icons } from "@/assets/icons/icons";
import { ROLE } from "@/constants/role";
import { drawerIconProps } from "@/constants/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, StyleSheet, I18nManager } from "react-native";
import React, { useMemo } from "react";
// import logo from "@/assets/images/logo.png";
import logo from "../../src/assets/images/logo.png";


const Sidebar = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const drawer_items = useMemo(
    () => [
      {
        name: "dashboard",
        label: t("drawer.dashboard"),
        href: "/(app)/dashboard",
        icon: icons.drawertabdashboardIcon,
        show: true,
      },
      {
        name: "user-management",
        label: t("drawer.userManagement"),
        href: "/(app)/user-management",
        icon: icons.drawertabUsersIcon,
        show: user?.role?.name === ROLE.ADMIN,
      },
      {
        name: "client-management",
        label: t("drawer.clientManagement"),
        href: "/(app)/client-management",
        icon: icons.drawertabUsersIcon,
        show: user?.role?.name === ROLE.ADMIN,
      },
      {
        name: "payment",
        label: t("drawer.payment"),
        href: "/(app)/payment",
        icon: icons.drawertabLawIcon,
        show: true,
      },
      {
        name: "po-management",
        label: t("drawer.poManagement"),
        href: "/(app)/po-management",
        icon: icons.drawertabstarsupIcon,
        show: true,
      },
      {
        name: "request",
        label: t("drawer.request"),
        href: "/(app)/request",
        icon: icons.drawertabnoteIcon,
        show: true,
      },
      {
        name: "report",
        label: t("drawer.report"),
        href: "/(app)/report",
        icon: icons.drawertabstarsupIcon,
        show: user?.role?.name === ROLE.ADMIN,
      },
    ],
    [t, user?.role?.name]
  );

  return (
    <View
      style={[
        styles.sidebarContainer,
        {
          direction: I18nManager.isRTL ? "rtl" : "ltr",
          alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
        },
      ]}
    >
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />
      {drawer_items
        .filter((item) => item.show)
        .map((item, index) => {
          const isActive = pathname.includes(item.name);
          return (
            <TouchableOpacity
              onPress={() => router.push(item.href)}
              style={[
                styles.menuItem,
                isActive && styles.activeMenuItem,
                {
                  flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                  justifyContent: I18nManager.isRTL ? 'flex-end' : 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                },
              ]}
            >
              <Image
                source={item.icon}
                style={[styles.icon, isActive && { tintColor: "#fff" }]}
              />
              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                  {
                    textAlign: I18nManager.isRTL ? "right" : "left",
                    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
                    flex: 1,
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 260,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 10,
    borderColor: "#eee",
    height: "100%",
    borderRightWidth: I18nManager.isRTL ? 0 : 1,
    borderLeftWidth: I18nManager.isRTL ? 1 : 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "transparent",
    width: "100%",
  },
  activeMenuItem: {
    backgroundColor: "#07504B",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: I18nManager.isRTL ? 0 : 12,
    marginLeft: I18nManager.isRTL ? 12 : 0,
  },
  label: {
    fontFamily: PoppinsRegular,
    fontSize: 14,
    color: "#A47C60",
    flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    direction: I18nManager.isRTL ? "rtl" : "ltr",
  },
  activeLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  logo: {
    width: 160,
    height: 60,
    marginBottom: 20,
    alignSelf: I18nManager.isRTL ? "center" : "center",
  },
});

export default Sidebar;
