import React from "react";
import { View, Text, Image } from "react-native";
import helpers from "../../utils/helpers";
import { icons } from "../../Resources";
import { styles } from "./styles";
import { Styles } from "../modalHeader/styles";
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

const PaymnetDetails: React.FC<UserProfileProps> = ({
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
  data,
}) => {
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
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
          <View style={styles.container1}>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style, {}]}>Transaction ID </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.date_of_payment}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Date Of Invoice </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.date_of_payment}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Recipient </Text>
              <Text style={[styles.link, style]}>{Data?.data?.payer}</Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Amount </Text>
              <Text style={[styles.link, style]}>{Data?.data?.amount}</Text>
            </View>
          </View>

          <View style={styles.container1}>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>
                Firrms reference number{" "}
              </Text>
              <Text style={[styles.link, style]}>{Data?.data?.documentId}</Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Collection Rate </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.phone_number}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Total Paid </Text>
              <Text style={[styles.link, style]}>{contact}</Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Pending Payments </Text>
              <Text style={[styles.link, style]}>{contact}</Text>
            </View>
          </View>
          <View style={styles.container1}>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Payment Method </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.payment_method}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}>Percentage Of payment </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.phone_number}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}></Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.phone_number}
              </Text>
            </View>
            <View style={[styles.detailsItem]}>
              <Text style={[styles.label, style]}> </Text>
              <Text style={[styles.link, style]}>
                {Data?.data?.phone_number}
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
              marginTop: 10,
              margin: 25,
            }}
          >
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Name: </Text>
              <Text style={[styles.link, style]}>{name}</Text>
            </View>
            <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Contact: </Text>
              <Text style={[styles.link, style]}>{contact}</Text>
            </View> */}
          {/* <View style={styles.detailsItem}>
              <Text style={[styles.label, style]}>Role: </Text>
              <Text style={[styles.link, style]}>{contact}</Text>
            </View> */}
          {/* </View> */}

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

export default PaymnetDetails;
