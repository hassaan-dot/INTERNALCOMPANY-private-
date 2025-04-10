import React, { useEffect, useMemo, useRef } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { PoppinsRegular } from "../../Resources/fonts";
import helpers from "../../utils/helpers";
import FilledButton from "../Buttons/FilledButton/FilledButton";
import CustomButton from "../CustomButton/Button";
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
  TextEnable: boolean;
  Document: boolean;
  TextTitle: string;
  height: any;
  ButtonTitle: string;
  onPress: () => void;
  onClose: () => void;
  Data: any;
}

const NotesCard: React.FC<UserProfileProps> = ({
  Data,
  ButtonTitle,
  title = "Details",
  titleIcon = false,
  titleStyle,
  cardContainer,
  detailscreenContainer,
  TextEnable = false,
  Document = false,
  onPress,
  onClose,
}) => {
  const notes = useMemo(() => Data?.po_notes, [Data]);
  const docs = useMemo(() => Data?.po_documents, [Data]);
  const verticalScrollRef = useRef<ScrollView>(null);
  const horizontalScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    // For iOS, we need to trigger a small scroll to make indicators appear
    if (verticalScrollRef.current) {
      verticalScrollRef.current.scrollTo({ y: 1, animated: false });
    }
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollTo({ x: 1, animated: false });
    }
  }, []);
  return (
    <View style={[styles.card, cardContainer]}>
      <View style={styles.row}>
        <View style={[styles.detailsSection, detailscreenContainer]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginRight: 20,
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
              flex: 1,
            }}
          ></View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 10,
              // backgroundColor: "red",
              height: helpers.normalize(115),
              // paddingBottom: helpers.normalize(20),
            }}
          >
            {TextEnable && null}
            {TextEnable && !Document && (
              <ScrollView
                persistentScrollbar={true} // Android
                showsVerticalScrollIndicator={true}
                scrollIndicatorInsets={{ right: 1 }} // iOS
                ref={verticalScrollRef}
              >
                {notes?.map((note, index) => (
                  <View key={index}>
                    <View style={styles.profileView}>
                      <Image
                        source={{
                          uri: "https://randomuser.me/api/portraits/men/1.jpg",
                        }}
                        style={styles.avatar}
                      />
                      <Text style={styles.name}>{note?.user?.username}</Text>
                      {/* <Image
                        source={icons.editPencilicon}
                        style={styles.avatar1}
                      /> */}
                    </View>
                    <View
                      style={{
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "#F8F8F8",
                        paddingLeft: 15,
                        paddingRight: 40,
                        marginRight: 30,
                        marginBottom: 10,
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
                        {note?.note}
                      </Text>
                      <View style={{ flexDirection: "row", marginTop: 8 }}>
                        <Text style={{ fontSize: 10, color: "#666" }}></Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "#666",
                            marginLeft: 10,
                          }}
                        ></Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
            {Document && !TextEnable && (
              <View style={{ paddingBottom: helpers.normalize(5) }}>
                <View style={{ marginVertical: 10, flexDirection: "row" }}>
                  {docs?.map((doc: any, index: number) => (
                    <View>
                      <CustomButton
                        key={index}
                        Color="#F3F6FF"
                        desc={doc?.size}
                        title={doc?.name}
                        url={doc?.url}
                      />
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
