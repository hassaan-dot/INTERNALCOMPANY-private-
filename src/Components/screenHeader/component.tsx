import { DEPARTMENT } from "@/constants/department";
import { PO_ACTIVE_STATUS } from "@/constants/po_status";
import { ROLE } from "@/constants/role";
import { useAuthStore } from "@/store/useAuthStore";
import React, { FC } from "react";
import { I18nManager, Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/assets/icons/icons";
import { SingleButton } from "../HorizontalButtons/component";
import styles from "./styles";
import DropDownTitleView from "../DropdownWithTitle/Component";
import { useModalStore } from "@/store/useModalStore";
import StatusBadge from "../StatusIcon/component";
import { useTranslation } from "react-i18next";

type ScreenHeaderProps = {
  create?: boolean;
  filter?: boolean;
  filterOptions?: { value: string; label: string }[];
  title?: string;
  completed?: boolean;
  onPress?: () => void;
  buttonView?: boolean;
  buttonViewMulitiple?: boolean;
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
  request_status?: string;
  standing?: string;
};

const RequestStatusBadge = ({ request_status }: { request_status: string }) => {
  if (request_status === "Rejected") {
    return (
      <StatusBadge text="Rejected" textColor="#EC4746" dot="#EC4746" color="#FECACA" />
    );
  }
  if (request_status === "To do") {
    return (
      <StatusBadge text="To do" dot="#ECFDF3" textColor="#ECFDF3" color="#5A6470" />
    );
  }
  if (request_status === "In Progress") {
    return (
      <StatusBadge text="In progress" textColor="white" dot="#ECFDF3" color="#A47C60" />
    );
  }
  if (request_status === "Done") {
    return <StatusBadge text="Done" dot="#12B76A" color="#ECFDF3" />;
  }
};

const ScreenHeader: FC<ScreenHeaderProps> = ({
  create,
  filter,
  filterOptions,
  showButton = true,
  request_status = null,
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
  standing,
}) => {
  const { user } = useAuthStore();
  const { setFilters, filters, setRowData } = useModalStore();
  const { t } = useTranslation();
  const isMobileView = Platform.OS === "ios";
  const isRTL = I18nManager.isRTL;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, isMobileView && styles.TitleDesign]}>
          {t(title)}
        </Text>

        <View style={styles.buttonContainer}>
          {request_status && <RequestStatusBadge request_status={request_status} />}
          {standing && (
            <View style={{ padding: 6, backgroundColor: "#F3F3F3", borderRadius: 4 }}>
              <Text style={{ color: "#555" }}>{standing}</Text>
            </View>
          )}

          {filter && filterOptions?.length > 0 && (
            <DropDownTitleView
              placeholder={t("screenHeader.filter")}
              containerStyle={[
                styles.createButton,
                {
                  borderColor: "#07504B",
                  borderWidth: 1,
                  borderRadius: 6,
                  flexDirection: isRTL ? "row-reverse" : "row",
                },
              ]}
              iconleft={true}
              textStyle={[
                styles.createText,
                { textAlign: isRTL ? "right" : "left" },
              ]}
              items={filterOptions}
              setOption={(value) => {
                setFilters({ ...filters, sort: value });
              }}
            />

          )}

          {showButton && create && (
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => {
                setRowData(null);
                onPress();
              }}
            >
              <Image
                source={icons.screenHeaderPlusIcon}
                style={{ width: 14, height: 14, marginRight: 7 }}
              />
              <Text style={styles.createText}>{t("screenHeader.create")}</Text>
            </TouchableOpacity>
          )}

          {completed && (
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createText}>{t("screenHeader.completed")}</Text>
            </TouchableOpacity>
          )}

          {buttonViewMulitiple && (
            <View style={{ flexDirection: "row", alignItems: "center", right: 15 }}>
              {user?.role?.name === ROLE.ADMIN &&
                data?.active_status === PO_ACTIVE_STATUS.DRAFT && (
                  <SingleButton
                    text={t("screenHeader.accept")}
                    color="#3A9671"
                    onPress={handleAccept}
                    isLoading={isAccepting}
                  />
                )}
              {user?.role?.name === ROLE.ADMIN &&
                data?.active_status === PO_ACTIVE_STATUS.DRAFT && (
                  <SingleButton
                    text={t("screenHeader.reject")}
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
                    text={t("screenHeader.confirmReceiving")}
                    color="#4682B4"
                    onPress={handleConfirm}
                    isLoading={isConfirming}
                  />
                )}
              {user?.role?.name === ROLE.ADMIN &&
                data?.active_status === PO_ACTIVE_STATUS.ACCEPTED &&
                data?.is_confirmed && (
                  <SingleButton
                    text={t("screenHeader.closePO")}
                    color="#F15252"
                    onPress={handleClosePO}
                    isLoading={isClosing}
                  />
                )}
              {data?.active_status === PO_ACTIVE_STATUS.CLOSED && (
                <SingleButton text={t("screenHeader.closed")} color="#F15252" />
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;
