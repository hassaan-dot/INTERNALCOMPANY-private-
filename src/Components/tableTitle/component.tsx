import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import helpers from "../../utils/helpers";
import FilledButton from "../Buttons/FilledButton/FilledButton";
import CompanyTable from "../TableData/component";
import { PoppinsRegular } from "../../Resources/fonts";

interface TableTitleProps {
  title: string;
  titleIcon?: boolean;
  titleStyle?: any;
  cardContainer?: any;
  detailscreenContainer?: any;
  ButtonTitle?: string;
  titleIcon2?: boolean;
  ButtonTitle2?: string;
  onPress?: () => void;
  DATA: any;
  schema: any;
  rowTextStyle?: any;
  onPressEdit?: (item: any) => void;
  onPressDel?: (item: any) => void;
  onClickEye?: (item: any) => void;
  showEye?: boolean;
}

const TableTitle: React.FC<TableTitleProps> = ({
  rowTextStyle,
  DATA,
  title,
  titleIcon = false,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  ButtonTitle = "",
  titleIcon2,
  ButtonTitle2 = "",
  onPress = () => { },
  onPressEdit,
  onPressDel,
  schema,
  onClickEye,
  showEye = true,
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
                    buttonBackground="#F3f6FF"
                    containerStyle={{
                      height: 0,
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      borderRadius: 5.333,
                    }}
                  />
                )}
              </View>
              {titleIcon2 && (
                <FilledButton
                  titleStyle={{ fontSize: 10, fontWeight: 600, color: "black" }}
                  title={ButtonTitle2}
                  onPress={onPress}
                  buttonBackground="#F3f6FF"
                  containerStyle={{
                    height: 0,
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    borderRadius: 5.333,
                  }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              flexDirection: "row",
              borderColor: "#E8E8E8",
              flex: 1,
            }}
          ></View>
          <View style={{ margin: 15, marginHorizontal: 20 }}>
            <CompanyTable
              columns_schema={schema}
              DATA={DATA}
              checkbox={false}
              showDel={true}
              showEdit={true}
              showActions={true}
              showEye={showEye}
              onPressUpdate={onPressEdit}
              onPressDelete={onPressDel}
              onClickEye={onClickEye}
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
              showDocument={false}
            ></CompanyTable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TableTitle;
