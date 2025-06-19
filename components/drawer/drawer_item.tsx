import { PoppinsRegular } from "@/constants/fonts";
import helpers from "@/src/utils/helpers";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { I18nManager } from "react-native";
// import styles from "./styles";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerContent: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  drawerItems: {
    flex: 1,
    backgroundColor: "white",
    marginTop: helpers.normalize(20),
  },
  drawerItem: {
    marginVertical: 0,
    borderRadius: 10,
    padding: 0,
    paddingVertical: 0,
    height: helpers.normalize(20),

    marginBottom: 12,
    // marginV:10,
    justifyContent: "center",
    // height: helpers.hp(5.5),
  },
  drawerItemLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A47C60",
    marginVertical: 0,
    fontFamily: PoppinsRegular,
  },
  submenuContainer: {
    marginLeft: 20,
  },
  submenuItem: {
    paddingVertical: 10,
  },
  submenuDots: {
    fontSize: 24,
    color: "#000",
  },
  submenuTextname: {
    fontSize: 14,
    marginLeft: 10,
  },
  signOutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  signOutIcon: {
    marginRight: 10,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

const CustomDrawerItem = ({ drawer_items }: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = useCallback((href: string) => {
    router.push(href as any);
  }, []);

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      <View style={styles.logoContainer}></View>
      <View style={styles.drawerItems}>
        {drawer_items
          ?.filter((item: any) => item.show)
          ?.map((item: any, index: number) => (
            <View key={index}>
              <DrawerItem
                focused={pathname === item.href}
                label={item.label}
                icon={item.drawerIcon}
                onPress={() => handleTabPress(item.href)}
                style={[
                  styles.drawerItem,
                  { flexDirection: I18nManager.isRTL ? "row-reverse" : "row" },
                ]}
                labelStyle={[
                  styles.drawerItemLabel,
                  { textAlign: I18nManager.isRTL ? "right" : "left" },
                  pathname.includes(item.name) && {
                    color: "#FFF",
                    fontWeight: "600",
                  },
                ]}
                activeTintColor="#2F317E"
                activeBackgroundColor="#07504B"
              />
            </View>
          ))}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerItem;
