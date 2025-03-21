import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { styles } from "./styles";
import helpers from "../../utils/helpers";
import { icons } from "../../Resources";
// import {helpers} from '../../utils/helpers'
import FilledButton from "../Buttons/FilledButton/FilledButton";
import CustomButton from "../CustomButton/Button";
import { PoppinsRegular } from "../../Resources/fonts";
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
  TextEnable: boolean;
  Document: boolean;
  TextTitle: string;
  height: any;
  ButtonTitle: string;
  onPress:()=>void
  onClose:()=>void
}

const NotesCard: React.FC<UserProfileProps> = ({
  rows,
  ButtonTitle,
  height = helpers.hp(40),
  name = "Ahmed",
  email = "Ahmed@gmail.com",
  contact = "923174431419",
  country = "Saudia  Arabia",
  profile = false,
  style,
  title = "Details",
  titleIcon = false,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  horizontalwidth = "50%",
  colorProp = "#D0D5DD",
  TextEnable = false,
  Document = false,
  TextTitle,
  onPress,
  onClose
}) => {
  const [data, setData] = useState([
    {
      name: "Documents.PDF",
      type: "image/png",
      size: 1 * 1024 * 1024, // 1MB in bytes
    },
    {
      name: "Documents.PDF",
      type: "image/png",
      size: 1 * 1024 * 1024, // 1MB in bytes
    },
  ]);
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginRight:20,
            }}
          >
            <Text style={[styles.detailsTitle, titleStyle]}>{title}</Text>
            {titleIcon && (
              <FilledButton
              onPress={onPress}
                titleStyle={{ fontSize: 10, fontWeight: 600, color: "black" }}
                title={ButtonTitle}
                containerStyle={{
                  backgroundColor: "#F3f6FF",
                  height: 0,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderRadius: 5.333,
                }}
              ></FilledButton>
            )}
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              flexirection: "row",
              borderColor: "#E8E8E8",
              // width: horizontalwidth,
              flex:1
            }}
          ></View>
          <View style={{ marginLeft: 20, marginTop: 10, marginBottom: 30 }}>
            {TextEnable && (
              <View style={styles.profileView}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/1.jpg",
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.name}>{TextTitle}</Text>
                <Image source={icons.editPencilicon} style={styles.avatar1} />
              </View>
            )}
            {TextEnable && !Document && (
              <View
                style={{
                  padding: 15,
                  borderRadius: 10,
                  backgroundColor: "#F8F8F8",
                  paddingLeft: 15,
                  paddingRight: 40,
                  marginRight:30
                }}
              >
                <Text
                  style={{
                    color: "#080808",
                    fontWeight: "400",
                    fontSize: 12,
                    lineHeight: 20,
                    fontFamily: PoppinsRegular,
                  }}
                >
                  Client confirmed receipt of claim documents but requested a
                  two-week extension for submitting the remaining evidence. No
                  objections raised about policy terms. Follow-up scheduled for
                  January 30, 2025.
                </Text>
              </View>
            )}
            {Document && TextEnable == false && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  //   padding: 20,
                }}
              >
                {/* <CustomButton
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    // height: 50,
                    borderRadius: 8,
                    // alignItems: "center",
                    // justifyContent: "center",
                    marginVertical: 10,
                    // flex:1,
                    padding:20,
                  }}
                  textStyle={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#0000",
                  }}

                  text={'Hassaan Khawaja'}
                //   Color="#F3F6FF"
                //   title={"Hassaan khawaja"}
                ></CustomButton> */}
                <View style={{ marginVertical: 10,flexDirection:'row' }}>
                  {data.map((doc, index) => (
                    <View style={{marginBottom:48}}>
                      <CustomButton
                        Color="#F3F6FF"
                        desc={doc.size}
                        title={doc.name}
                      ></CustomButton>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotesCard;
