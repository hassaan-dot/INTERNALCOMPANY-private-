import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import helpers from "../../utils/helpers";
import FilledButton from "../Buttons/FilledButton/FilledButton";
import CompanyTable from "../TableData/component";
import { PoppinsRegular } from "../../Resources/fonts";
import { Invoice_Schema } from "@/src/Screens/ClientManagement/_schema";
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
  titleIcon2: boolean;
  ButtonTitle2: string;
  onPress: () => void;
  DATA: any;
  schema: any;
  rowTextStyle: any;
}

const TableTitle: React.FC<UserProfileProps> = ({
  rowTextStyle,
  DATA,
  title,
  titleIcon = false,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  ButtonTitle,
  titleIcon2,
  ButtonTitle2,
  onPress,
  schema,
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
              marginBottom: 10,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
          >
            <Text style={[styles.detailsTitle, titleStyle]}>{title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginRight: 20 }}>
                {titleIcon && (
                  <FilledButton
                    titleStyle={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "black",
                    }}
                    title={ButtonTitle}
                    onPress={onPress}
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
              {titleIcon2 && (
                <FilledButton
                  titleStyle={{ fontSize: 10, fontWeight: 600, color: "black" }}
                  title={ButtonTitle2}
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
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              flexirection: "row",
              borderColor: "#E8E8E8",
              // width: horizontalwidth,
              flex: 1,
            }}
          ></View>
          <View style={{ margin: 15, marginHorizontal: 20 }}>
            <CompanyTable
              columns_schema={schema}
              DATA={DATA}
              checkbox={false}
              headerTextStyle={{
                color: "#2E2E2E",
                fontSize: 13.4,
                fontWeight: "500",
                fontFamily: PoppinsRegular,
              }}
              showStatus={true}
              rowTextStyle={rowTextStyle}
              pagination={false}
              headerRowStyle={{
                backgroundColor: "#F3F6FF",
                padding: 12,
                paddingHorizontal: 15,
              }}
            ></CompanyTable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TableTitle;
