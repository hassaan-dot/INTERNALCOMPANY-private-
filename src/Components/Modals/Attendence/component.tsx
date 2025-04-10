import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import { styles } from "./styles";
import ButtonGroup from "../../HorizontalButtons/component";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";
import { Entypo, Feather } from "@expo/vector-icons";
import { Image } from "react-native";
import { icons } from "@/assets/icons/icons";
import { formatDateForDisplay } from "@/src/utils";
import {
  useClockIntUserAttendence,
  useClockOutUserAttendence,
  useGetUserAttendence,
} from "@/hooks/useUser";
import { useAuthStore } from "@/store/useAuthStore";

interface NewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: any;
  currentUser: any;
  name: string;
}

const AttendenceModal: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,
  currentUser,
  title = "",
}) => {
  const { user } = useAuthStore();

  const { data: getAll } = useGetUserAttendence(currentUser.documentId);
  console.log("getAll", getAll);
  const ActivateFunction = () => {
    const { mutate } = useClockIntUserAttendence();
    return mutate(currentUser.documentId);
  };

  const showClockIn = getAll?.data?.clock_in == null;
  const showClockOut = getAll?.data?.clock_out == null;

  const handleAttendence = () => {
    if (showClockIn) {
      // ClockIn;
      ActivateFunction();
    } else if (showClockOut) {
      // const { data: clockOutAttendence } = useClockOutUserAttendence({
      //   id: currentUser,
      // });
    }
  };
  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View style={styles.container1}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <View style={{ margin: 15 }}>
            <Text style={styles.chipText2}>
              {`Name : ${currentUser.first_name} ${currentUser.last_name}`}
            </Text>

            <Text style={styles.chipText}>
              Check-in:{" "}
              {/* {`${formatDateForDisplay(getAll?.data?.clock_in || "")} ` || ""} */}
            </Text>
            <Text style={styles.chipText}>
              Check-out: {getAll?.data?.clock_out || ""}
            </Text>
          </View>

          {(showClockIn || showClockOut) && (
            <ButtonGroup
              onPress={handleAttendence}
              onPress2={onClose}
              ContainerStyle={{ flexDirection: "row", flex: 1 }}
              Color1={""}
              textStyle1={{
                fontWeight: "500",
                color: "#344054",
                fontSize: 16,
                fontFamily: PoppinsRegular,
              }}
              style2={{
                // paddingHorizontal: helpers.normalize(30),
                paddingHorizontal: 60,

                // width: "40%",
                borderRadius: 8,
                borderWidth: 0,
              }}
              style1={{
                paddingHorizontal: 60,
                paddingVertical: 5,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#D0D5DD",
              }}
              Color2={showClockIn ? "#07504B" : "#FF3B30"}
              buttonTitle1={"Cancel"}
              buttonTitle2={showClockIn ? "Clock In" : "Clock Out"}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AttendenceModal;
