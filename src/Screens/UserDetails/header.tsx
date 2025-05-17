import React from "react";
import { Text, View, I18nManager } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./header_style";
import { HorizontalLine } from "@/src/Components";
import helpers from "../../utils/helpers";

interface UserProfileProps {
  contact_person_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  rows: number;
  profile: boolean;
  style: any;
  title: string;
  titleIcon: boolean;
  titleStyle: any;
  cardContainer: any;
  detailscreenContainer: any;
  horizontalwidth: any;
  item: any;
}

const UserDetailHeader: React.FC<UserProfileProps> = ({
  style,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  item,
  horizontalwidth = "50%",
}) => {
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  return (
    <View style={[styles.card, cardContainer]}>
      <View style={[styles.row, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View style={{ flexDirection: isRTL ? "row-reverse" : "row", justifyContent: "space-between" }}>
            <View>
              <Text style={[styles.detailsTitle, titleStyle]}>
                {t("user_detail.details")}
              </Text>
              <HorizontalLine color="#B0C4DE" width={horizontalwidth} />
            </View>
          </View>

          <View style={{ flex: 1, marginTop: 12 }}>
            <View style={{ flexDirection: isRTL ? "row-reverse" : "row", flexWrap: "wrap" }}>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>{t("user_detail.id")}:</Text>
                <Text style={[styles.link, style]}>{item?.id}</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>{t("user_detail.name")}:</Text>
                <Text style={[styles.link, style]}>
                  {item?.first_name} {item?.last_name}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>{t("user_detail.contact")}:</Text>
                <Text style={[styles.link, style]}>
                  {item?.phone_number ?? "-"}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>{t("user_detail.role")}:</Text>
                <Text style={[styles.link, style]}>
                  {item?.role?.name ?? "-"}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: isRTL ? "row-reverse" : "row", flexWrap: "wrap", marginTop: 6 }}>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>{t("user_detail.email")}:</Text>
                <Text style={[styles.link, style]}>{item?.email}</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>{t("user_detail.username")}:</Text>
                <Text style={[styles.link, style]}>{item?.username}</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>{t("user_detail.department")}:</Text>
                <Text style={[styles.link, style]}>
                  {item?.department?.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserDetailHeader;
