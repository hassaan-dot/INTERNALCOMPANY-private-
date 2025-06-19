import React from "react";
import { Text, View, I18nManager } from "react-native";
import Avatar from "../Avatar/component";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";

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

const ClientDetailsHeader: React.FC<UserProfileProps> = ({
  profile = false,
  style,
  title = "Details",
  titleIcon,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  item,
  horizontalwidth = "50%",
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={[styles.detailsTitle, titleStyle]}>
                {t("clientDetails.headerTitle", { defaultValue: title })}
              </Text>
              <HorizontalLine color="#B0C4DE" width={horizontalwidth} />
            </View>
            {!titleIcon && <View>{/* Placeholder for future icon */}</View>}
          </View>

          <View style={styles.detailsContent}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>
                  {t("clientDetails.name")}:
                </Text>
                <Text style={[styles.link, style]}>
                  {item?.data?.contact_person_name}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>
                  {t("clientDetails.contact")}:
                </Text>
                <Text style={[styles.link, style]}>
                  {item?.data?.phone_number}
                </Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>
                  {t("clientDetails.email")}:
                </Text>
                <Text style={[styles.link, style]}>
                  {item?.data?.email}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>
                  {t("clientDetails.company")}:
                </Text>
                <Text style={[styles.link, style]}>
                  {item?.data?.company_name}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={styles.label}>{t("clientDetails.address")}:</Text>
                <Text style={styles.link}>{item?.data?.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClientDetailsHeader;
