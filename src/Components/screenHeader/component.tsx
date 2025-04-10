import { DEPARTMENT } from "@/constants/department";
import { PO_ACTIVE_STATUS } from "@/constants/po_status";
import { ROLE } from "@/constants/role";
import { useAuthStore } from "@/store/useAuthStore";
import React, { FC } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/assets/icons/icons";
import { SingleButton } from "../HorizontalButtons/component";
import styles from "./styles";

type ScreenHeaderProps = {
  create?: boolean;
  filter?: boolean;
  title?: string;
  completed?: boolean;
  onPress?: () => void;
  buttonView: boolean;
  buttonViewMulitiple: boolean;
  showButton?: boolean;
  data?: any;
  handleAccept?: any;
  handleReject?: any;
  handleConfirm?: any;
  handleClosePO?: any;
  isAccepting?: boolean;
  isRejecting?: boolean;
  isConfirming?: boolean;
  isClosing?: boolean;
};

const ScreenHeader: FC<ScreenHeaderProps> = ({
  create,
  filter,
  showButton = true,
  completed,
  title,
  onPress,
  buttonViewMulitiple = false,
  data = null,
  handleAccept,
  handleReject,
  handleConfirm,
  handleClosePO,
  isAccepting,
  isRejecting,
  isConfirming,
  isClosing,
}: any) => {
  const { user } = useAuthStore();

  const isMobileView = Platform.OS === "ios";
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, isMobileView && styles.TitleDesign]}>
          {title}
        </Text>

        <View style={styles.buttonContainer}>
          {showButton && create && (
            <TouchableOpacity style={styles.createButton} onPress={onPress}>
              <Image
                source={icons.screenHeaderPlusIcon}
                style={{ width: 15, height: 15, marginRight: 7 }}
              ></Image>
              <Text style={styles.createText}>create</Text>
            </TouchableOpacity>
          )}

          {filter && (
            <TouchableOpacity style={styles.createButton}>
              <Image
                source={icons.screenHeaderFilterIcon}
                style={{ width: 15, height: 15, marginRight: 7 }}
              ></Image>

              <Text style={styles.createText}>Filter</Text>
            </TouchableOpacity>
          )}

          {completed && (
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createText}>Completed</Text>
            </TouchableOpacity>
          )}
          {buttonViewMulitiple && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  right: 15,
                }}
              >
                {user?.role?.name === ROLE.ADMIN &&
                  data?.active_status === PO_ACTIVE_STATUS.DRAFT && (
                    <SingleButton
                      text="Accept"
                      color="#3A9671"
                      onPress={handleAccept}
                      isLoading={isAccepting}
                    />
                  )}
                {user?.role?.name === ROLE.ADMIN &&
                  data?.active_status === PO_ACTIVE_STATUS.DRAFT && (
                    <SingleButton
                      text="Reject"
                      color="#E61216"
                      onPress={handleReject}
                      isLoading={isRejecting}
                    />
                  )}
                {(user?.role?.name === ROLE.ADMIN ||
                  user?.department?.name === DEPARTMENT.SALES) &&
                  data?.active_status === PO_ACTIVE_STATUS.ACCEPTED &&
                  !data?.is_confirmed && (
                    <SingleButton
                      text="Confirm Receiving"
                      color="#4682B4"
                      onPress={handleConfirm}
                      isLoading={isConfirming}
                    />
                  )}
                {user?.role?.name === ROLE.ADMIN &&
                  data?.active_status === PO_ACTIVE_STATUS.ACCEPTED &&
                  data?.is_confirmed && (
                    <SingleButton
                      text="Close PO"
                      color="#F15252"
                      onPress={handleClosePO}
                      isLoading={isClosing}
                    />
                  )}
                {data?.active_status === PO_ACTIVE_STATUS.CLOSED && (
                  <SingleButton text="Closed" color="#F15252" />
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;
