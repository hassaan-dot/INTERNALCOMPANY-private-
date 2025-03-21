import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import helpers from "../../utils/helpers";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import { icons } from "../../Resources";
import {styles} from './styles'
import StatusBadge from "../StatusIcon/component";
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
  titleStyle:any;
  cardContainer:any;
  detailscreenContainer:any
  horizontalwidth:any
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
  cardContainer
  ,detailscreenContainer,
  horizontalwidth='50%'
}) => {
  return (
    <View style={[styles.card,cardContainer]}>
      <View style={styles.row}>
        {profile && (
          <View style={styles.profileSection}>
            <View style={styles.profileImage} />
            <View style={{ marginLeft:5 }}>
              <Text style={styles.name}>{name}</Text>
            </View>
          </View>
        )}
        <View style={[styles.detailsSection,detailscreenContainer]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text style={[styles.detailsTitle,titleStyle]}>{title}</Text>
              <HorizontalLine color="#B0C4DE" width={horizontalwidth}></HorizontalLine>
            </View>
            {!titleIcon && (
              <View>
                {/* <Image
                  source={icons.tableStatusIcon}
                  style={{ width: helpers.wp(5), height: helpers.hp(5) }}
                ></Image> */}
                <StatusBadge></StatusBadge>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              marginTop: 12,
            }}
          >
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Name: </Text>
              <Text style={[styles.link, style]}>{name}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Contact: </Text>
              <Text style={[styles.link, style]}>{contact}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Role: </Text>
              <Text style={[styles.link, style]}>{contact}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Role: </Text>
              <Text style={[styles.link, style]}>{contact}</Text>
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


export default UserProfile;
