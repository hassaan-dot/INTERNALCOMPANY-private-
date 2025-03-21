import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
} from "react-native";

import { styles } from "./styles";
import ButtonGroup from "../../HorizontalButtons/component";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

const categories: string[] = [
  "Everyone",
  "Management",
  "Sales",
  "Warehouse",
  "Finance",
  "Other",
];

interface NewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: any;
  Activate: any;
  clockIn: boolean;
  onSubmit:any
}

const AttendenceModal: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,
  clockIn,
  onSubmit,

  title = "News",
}) => {
  const [news, setNews] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };


  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          //   alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <View style={{ margin: 15 }}>
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#000",
                  fontSize: 18,
                  fontFamily: PoppinsRegular,
                  marginVertical: 6,
                }}
              >
                User Name : {"Uzair Ahmed"}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  color: "#667085",
                  fontSize: 14,
                  fontFamily: PoppinsRegular,
                  marginVertical: 6,
                }}
              >
                Check in details{" "}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "400",
                  color: "#667085",
                  fontSize: 14,
                  fontFamily: PoppinsRegular,
                  marginVertical: 6,
                }}
              >
                Check in details{" "}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "400",
                  color: "#667085",
                  fontSize: 14,
                  fontFamily: PoppinsRegular,
                  marginVertical: 6,
                }}
              >
                Check in details{" "}
              </Text>
            </View>
          </View>

          <ButtonGroup
          onPress={onSubmit}
            ContainerStyle={{ flexDirection: "row", flex: 1 }}
            Color1={""}
            textStyle1={{
              fontWeight: "500",
              color: "#344054",
              fontSize: 16,
              fontFamily: PoppinsRegular,
            }}
            style2={{
              paddingHorizontal: helpers.normalize(30),
              borderRadius: 8,
              borderWidth: 0,
            }}
            style1={{
              paddingHorizontal: helpers.normalize(30),
              paddingVertical: 5,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#D0D5DD",
            }}
            Color2={clockIn ? "#07504B" : "#FF3B30"}
            buttonTitle1={"Cancel"}
            buttonTitle2={clockIn ? "clock in" : "Clock out"}
          ></ButtonGroup>
        </View>
      </View>
    </Modal>
  );
};

export default AttendenceModal;
