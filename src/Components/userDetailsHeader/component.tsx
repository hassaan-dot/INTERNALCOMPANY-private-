import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import { icons } from "../../Resources";
import { styles } from "./styles";
import StatusBadge from "../StatusIcon/component";
import truncateComponentName from "../WordTruncate/component";
import { formatDateForDisplay } from "@/src/utils";
// import { formatDate } from "@/src/utils";
interface UserProfileProps {
  name: string;
  email: string;
  contact: string;
  country: string;
  rows: number;
  profile: boolean;
  style: any;
  title: string;
  titleIcon: boolean;
  titleStyle: any;
  cardContainer: any;
  detailscreenContainer: any;
  horizontalwidth: any;
  data: any;
}

const UserProfile: React.FC<UserProfileProps> = ({
  rows,
  name = "Ahmed",
  email = "Ahmed@gmail.com",
  contact = "923174431419",
  country = "Saudia  Arabia",
  profile = false,
  style,
  title = "Details",
  titleIcon,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  horizontalwidth = "50%",
  data,
}) => {
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        {profile && (
          <View style={styles.profileSection}>
            <View style={styles.profileImage} />
            <View style={{ marginLeft: 5 }}>
              <Text style={styles.name}>{name}</Text>
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
                <StatusBadge text={data?.data?.po_status} />
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              flex: 1,
              marginTop: 12,
            }}
          >
            <View style={[styles.detailsItem, {}]}>
              <Text style={[styles.label, style, {}]}>PO Name: </Text>
              <Text style={[styles.link, style]}>
                {truncateComponentName(data?.data?.po_name, 20)}
              </Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Type: </Text>
              <Text style={[styles.link, style]}>{"Internal"}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Items Number: </Text>
              <Text style={[styles.link, style]}>
                {data?.data?.po_items?.length}
              </Text>
            </View>
            <View style={[styles.detailsItem, {}]}>
              <Text style={[styles.label, style]}>Creation Date: </Text>
              <Text style={[styles.link, style]}>
                {/* {formatDateForDisplay(data?.data?.createdAt)} */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
