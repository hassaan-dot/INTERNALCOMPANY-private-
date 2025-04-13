import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { GraphCard, ScreenHeader, UserProfile } from "../../Components";
import { styles } from "./styles";

import { useLocalSearchParams } from "expo-router";
import { useGetOneUser } from "@/hooks/useUser";
import UserDetailHeader from "./header";

const UserDetails = () => {
  const { id, documentId } = useLocalSearchParams();

  const { data, isPending } = useGetOneUser(id as string);

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <>
      <ScrollView style={styles.container1}>
        <ScreenHeader title={"User Detail"} />
        <UserDetailHeader item={data} />
        <View style={styles.container2}>
          <GraphCard id={documentId} />
        </View>
      </ScrollView>
    </>
  );
};

export default UserDetails;
//B0C4DE
