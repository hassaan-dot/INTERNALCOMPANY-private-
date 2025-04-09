import { icons } from "@/assets/icons/icons";
import { useDeleteNews, useGetNews } from "@/hooks/useDashboard";
import { useGetPO } from "@/hooks/usePO";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
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

interface CardSectionProps {
  onPress?: () => void;
  OnCancel?: () => void;
}

const CardSection: React.FC<CardSectionProps> = ({ onPress, OnCancel }) => {
  const isMobileView = Platform.OS === "ios";
  const { user } = useAuthStore();
  const { data, refetch } = useGetNews();
  useRefreshOnFocus(refetch);

  const { mutate: handleDeleteNews } = useDeleteNews();
  const { data: getPo } = useGetPO();
  const router = useRouter();
  const handleNavigateToDetails = (documentId: string) => {
    router.push(`/(app)/po-management/po-details?id=${documentId}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Assigned PO</Text>
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
          data={getPo?.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <View style={styles.row}>
                <View style={styles.profileView}>
                  <Avatar
                    width={30}
                    height={30}
                    borderRadius={15}
                    marginRight={7}
                  ></Avatar>
                  <Text style={styles.name}>
                    {`${item?.po_created_by?.first_name}  ${item?.po_created_by?.last_name}`}
                  </Text>
                </View>

                <View style={styles.customView}>
                  <Text style={styles.actionText}>
                    {truncateComponentName(item?.documentId, 10)}
                  </Text>
                </View>
                <View style={styles.customView}>
                  <Text
                    style={[
                      styles.code,
                      {
                        color:
                          item?.active_status == "Accepted"
                            ? "#07504b"
                            : item?.active_status == "Rejected"
                            ? "red"
                            : "",
                      },
                    ]}
                  >
                    {item?.active_status}
                  </Text>
                </View>
                <View style={[styles.customView, { alignItems: "center" }]}>
                  <TouchableOpacity
                    onPress={() => handleNavigateToDetails(item?.documentId)}
                  >
                    <Image
                      source={icons.dashboardButtonNewscardIcon}
                      style={{ width: 15, height: 15, marginLeft: 20 }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        />
      </View>

      <View style={[styles.card2, isMobileView && styles.card3]}>
        <View style={[styles.newsHeader, isMobileView && styles.newsHeader2]}>
          <Text style={styles.cardTitle}>News Panel</Text>
          {user?.role?.name === "Admin" && (
            <TouchableOpacity style={styles.addButton} onPress={onPress}>
              <Text style={styles.addButtonText}>Add News</Text>
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
                ></Avatar>
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
                  onPress={() => handleDeleteNews(item?.documentId)}
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
    </View>
  );
};

export default CardSection;
