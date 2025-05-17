import { icons } from "@/assets/icons/icons";
import { useDeleteNews, useGetNews } from "@/hooks/useDashboard";
import { useGetPO } from "@/hooks/usePO";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useAuthStore } from "@/store/useAuthStore";
import { PO_ACTIVE_STATUS } from "@/constants/po_status";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { LinearGradient, Rect, Stop } from "react-native-svg";
import Avatar from "../Avatar/component";
import truncateComponentName from "../WordTruncate/component";
import { styles } from "./styles";
import { formatDate } from "@/src/utils";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native-paper";
import ConfirmModal from "../ConfirmationModal/ConfirmModal";

interface CardSectionProps {
  onPress?: () => void;
  OnCancel?: () => void;
}

const RenderPoStatus = ({
  active_status,
  is_confirmed,
}: {
  active_status: PO_ACTIVE_STATUS;
  is_confirmed: boolean;
}) => {
  const { t } = useTranslation();

  if (active_status === PO_ACTIVE_STATUS.DRAFT) {
    return <Text style={[styles.code, { color: "#5A6470" }]}>{t("po_status.draft")}</Text>;
  }

  if (active_status === PO_ACTIVE_STATUS.CLOSED) {
    return <Text style={[styles.code, { color: "#EC4746" }]}>{t("po_status.closed")}</Text>;
  }

  if (is_confirmed) {
    return <Text style={[styles.code, { color: "#12B76A" }]}>{t("po_status.confirmed")}</Text>;
  } else if (active_status === PO_ACTIVE_STATUS.ACCEPTED) {
    return <Text style={[styles.code, { color: "#12B76A" }]}>{t("po_status.accepted")}</Text>;
  }

  if (active_status === PO_ACTIVE_STATUS.REJECTED) {
    return <Text style={[styles.code, { color: "#EC4746" }]}>{t("po_status.rejected")}</Text>;
  }
};

const CardSection: React.FC<CardSectionProps> = ({ onPress, OnCancel }) => {
  const { t } = useTranslation();
  const isMobileView = Platform.OS === "ios";
  const { user } = useAuthStore();
  const { data, refetch } = useGetNews();
  useRefreshOnFocus(refetch);

  const { mutate: handleDeleteNews } = useDeleteNews();
  const { data: getPo } = useGetPO();
  const router = useRouter();
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleNavigateToDetails = (documentId: string) => {
    return router.push(`/(app)/po-management/po-details?id=${documentId}`);
  };

  const handleNavigateToAllPo = () => {
    return router.push(`/(app)/po-management`);
  };

  const confirmDelete = () => {
    if (selectedNewsId) {
      handleDeleteNews(selectedNewsId);
      setShowConfirmModal(false);
      setSelectedNewsId(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedNewsId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.container1}>
          <View>
            <Text style={styles.cardTitle}>{t("po_section.title")}</Text>
          </View>
          {getPo?.data?.length > 8 && (
            <View>
              <TouchableOpacity
                style={styles.addButton && styles.addButton1}
                onPress={() => handleNavigateToAllPo()}
              >
                <Text style={styles.addButtonText}>{t("po_section.see_all")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ marginVertical: 10 }}>
          <Svg height="1" width="100%">
            <LinearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
              <Stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <Stop offset="50%" stopColor="#000" />
              <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </LinearGradient>
            <Rect x="0" y="0" width="100%" height="1" fill="url(#grad)" />
          </Svg>
        </View>

        <FlatList
          contentContainerStyle={{ marginHorizontal: 15, marginTop: 5 }}
          data={getPo?.data?.slice(0, 8)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.profileView}>
                <Avatar
                  width={30}
                  height={30}
                  borderRadius={15}
                  marginRight={7}
                />
                <Text style={styles.name}>
                  {`${item?.po_created_by?.first_name}  ${item?.po_created_by?.last_name}`}
                </Text>
              </View>

              <View style={styles.customView}>
                <Text style={styles.actionText}>
                  {truncateComponentName(item?.po_name, 12)}
                </Text>
              </View>
              <View style={styles.customView}>
                <RenderPoStatus
                  active_status={item?.active_status}
                  is_confirmed={item?.is_confirmed}
                />
              </View>
              <View>
                <Text style={styles.actionText}>
                  {formatDate(item?.createdAt)}
                </Text>
              </View>
              <View style={[styles.customView, { alignItems: "center" }]}>
                <TouchableOpacity
                  onPress={() => handleNavigateToDetails(item?.documentId)}
                >
                  <Image
                    source={icons.dashboardButtonNewscardIcon}
                    style={{ width: 15, height: 15, marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={[styles.card2, isMobileView && styles.card3]}>
        <View style={[styles.newsHeader, isMobileView && styles.newsHeader2]}>
          <Text style={styles.cardTitle}>{t("news_panel.title")}</Text>
          {user?.role?.name === "Admin" && (
            <TouchableOpacity style={styles.addButton} onPress={onPress}>
              <Text style={styles.addButtonText}>{t("news_panel.add_news")}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginVertical: 10 }}>
          <Svg height="1" width="100%">
            <LinearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
              <Stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <Stop offset="50%" stopColor="#000" />
              <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </LinearGradient>
            <Rect x="0" y="0" width="100%" height="1" fill="url(#grad)" />
          </Svg>
        </View>
        <FlatList
          data={data?.data}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled={false}
          contentContainerStyle={{ marginHorizontal: 15, marginTop: 5 }}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.profileView}>
                <Avatar
                  width={30}
                  height={30}
                  borderRadius={15}
                  marginRight={7}
                />
                <Text style={styles.name}>
                  {item.user?.first_name} {item.user?.last_name}
                </Text>
              </View>
              <View style={styles.customView2}>
                <Text style={styles.actionText}>{item.news}</Text>
              </View>
              {user?.role?.name === "Admin" && (
                <TouchableOpacity
                  style={[
                    styles.customView3,
                    { alignItems: "flex-end", justifyContent: "flex-end" },
                  ]}
                  onPress={() => {
                    setSelectedNewsId(item?.documentId);
                    setShowConfirmModal(true);
                  }}
                >
                  <Image
                    source={icons.tableDeleteIcon}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        message={t("Are you sure you want to delete this news?")}
        confirmText={t("Delete")}
        cancelText={t("Cancel")}
      />
    </View>
  );
};

export default CardSection;
