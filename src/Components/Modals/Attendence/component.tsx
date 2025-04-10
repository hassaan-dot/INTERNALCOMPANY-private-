import React, { useMemo, useState } from "react";
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
import { formatDate } from "@/src/utils";

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

  const { data: attendance } = useGetUserAttendence(currentUser?.documentId);

  const { mutate: handleClockIn } = useClockIntUserAttendence(
    currentUser?.documentId
  );
  const { mutate: handleClockOut } = useClockOutUserAttendence(
    currentUser?.documentId
  );

  const isClockedOut = useMemo(() => {
    if (!attendance?.data) return true;
    else if (attendance?.data && attendance?.data?.clock_out) return true;
    else return false;
  }, [attendance?.data]);

  console.log("isClokedOut", isClockedOut);

  const handleAttendence = () => {
    if (isClockedOut) handleClockIn();
    else handleClockOut();
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View style={styles.container1}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <View style={{ margin: 15 }}>
            <Text style={styles.chipText2}>
              {`Name : ${currentUser?.first_name} ${currentUser?.last_name}`}
            </Text>

            <Text style={styles.chipText}>
              Clock-In: {formatDate(attendance?.data?.clock_in) ?? "-"}
            </Text>
            <Text style={styles.chipText}>
              Clock-Out: {formatDate(attendance?.data?.clock_out) ?? "-"}
            </Text>
          </View>

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
            Color2={isClockedOut ? "#07504B" : "#FF3B30"}
            buttonTitle1={"Cancel"}
            buttonTitle2={isClockedOut ? "Clock In" : "Clock Out"}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AttendenceModal;
