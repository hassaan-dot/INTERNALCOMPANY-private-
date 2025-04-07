import { Avatar, HorizontalLine } from "@/src/Components";
import React from "react";
import { Text, View } from "react-native";
import helpers from "../../utils/helpers";
import { styles } from "./header_style";

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
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        <View style={styles.profileSection}>
          <Avatar />
          <View style={{ marginLeft: 0, marginRight: helpers.normalize(20) }}>
            <Text style={styles.name}>{item?.first_name}</Text>
          </View>
        </View>
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text style={[styles.detailsTitle, titleStyle]}>Details</Text>
              <HorizontalLine color="#B0C4DE" width={horizontalwidth} />
            </View>
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
                  {item?.first_name} {item?.last_name}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Contact: </Text>
                <Text style={[styles.link, style]}>
                  {item?.phone_number ?? "-"}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Role: </Text>
                <Text style={[styles.link, style]}>
                  {item?.role?.name ?? "-"}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 6 }}>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Email: </Text>
                <Text style={[styles.link, style]}>{item?.email}</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Username: </Text>
                <Text style={[styles.link, style]}>{item?.username}</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={[styles.label, style]}>Department: </Text>
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
