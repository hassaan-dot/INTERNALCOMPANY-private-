import React from "react";
import { View, Text, Image } from "react-native";
import helpers from "../../utils/helpers";
import { icons } from "@/assets/icons/icons";
import { styles } from "./styles";
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
  colorProp: any;
  Data: any;
}

const InformationContainer: React.FC<UserProfileProps> = ({
  rows,
  name = "Ahmed",
  email = "Ahmed@gmail.com",
  contact = "923174431419",
  country = "Saudia  Arabia",
  profile = false,
  style,
  Data,
  title = "Details",
  titleIcon,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  horizontalwidth = "50%",
  colorProp = "#D0D5DD",
}) => {
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        {profile && (
          <View style={styles.profileSection}>
            <View style={styles.profileImage} />
            <View style={{ marginLeft: 10 }}>
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
            <View style={{ paddingTop: 0 }}>
              <Text style={[styles.detailsTitle, titleStyle]}>{title}</Text>
            </View>
            {titleIcon && (
              <View>
                <Image
                  source={icons.tableStatusIcon}
                  style={{ width: helpers.wp(5), height: helpers.hp(5) }}
                ></Image>
              </View>
            )}
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              flexirection: "row",
              borderColor: "#E8E8E8",
              flex: 1,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              margin: 25,
            }}
          >
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style, { color: "#080808" }]}>
                Contact Person Name{" "}
              </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.client?.contact_person_name}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Company Name </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.client?.company_name}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Address </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.client?.address}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              margin: 25,
              marginTop: 0,
              marginBottom: 40,
            }}
          >
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Email </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.client?.email}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Phone Number: </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.client?.phone_number}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InformationContainer;
