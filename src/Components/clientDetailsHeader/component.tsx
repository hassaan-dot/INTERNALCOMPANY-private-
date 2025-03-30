import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import { icons } from "../../Resources";
import { styles } from "./styles";
import StatusBadge from "../StatusIcon/component";
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
  contact_person_name,
  email,
  phone_number,
  company_name,
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
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        {profile && (
          <View style={styles.profileSection}>
            <View style={styles.profileImage} />
            <View style={{ marginLeft: 6, marginRight: helpers.normalize(20) }}>
              <Text style={styles.name}>{item?.data?.contact_person_name}</Text>
            </View>
          </View>
        )}
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text style={[styles.detailsTitle, titleStyle]}>{title}</Text>
              <HorizontalLine
                color="#B0C4DE"
                width={horizontalwidth}
              ></HorizontalLine>
            </View>
            {!titleIcon && (
              <View>
                {/* <Image
                  source={icons.tableStatusIcon}
                  style={{ width: helpers.wp(5), height: helpers.hp(5) }}
                ></Image> */}
                {/* <StatusBadge></StatusBadge> */}
              </View>
            )}
          </View>

          <View
            style={{
              // flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              marginTop: 12,
              // backgroundColor: "red",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Name: </Text>
                <Text style={[styles.link, style]}>
                  {item?.data?.contact_person_name}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Contact: </Text>
                <Text style={[styles.link, style]}>
                  {item?.data?.phone_number}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Email: </Text>
                <Text style={[styles.link, style]}>{item?.data?.email}</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Company: </Text>
                <Text style={[styles.link, style]}>
                  {item?.data?.company_name}
                </Text>
              </View>
            </View>
          </View>

          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flex: 1,
            }}
            // style={styles.customStyle}
          >
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Email: </Text>
              <Text style={[styles.link, style]}>{email}</Text>
            </View>

            <View style={styles.detailsItem}>
              <Text style={styles.label}>Country: </Text>
              <Text style={styles.link}>{country}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={styles.label}>Department: </Text>
              <Text style={styles.link}>{country}</Text>
            </View>
          </View> */}

          {/* <View
            // style={{
            //   flexDirection: "row",
            //   justifyContent: "space-between",
            //   marginTop: 10,
            // }}
            style={styles.customStyle}

          >
            <View style={styles.detailsItem}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.link}>{email}</Text>
            </View>

            <View style={styles.detailsItem}>
              <Text style={styles.label}>Country: </Text>
              <Text style={styles.link}>{country}</Text>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default ClientDetailsHeader;
