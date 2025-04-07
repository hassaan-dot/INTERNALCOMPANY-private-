import React from "react";
import { ScrollView, View } from "react-native";
import { GraphCard, ScreenHeader, UserProfile } from "../../Components";
import { styles } from "./styles";

import { useLocalSearchParams } from "expo-router";
import { useGetOneUser } from "@/hooks/useUser";
import UserDetailHeader from "./header";

const UserDetails = () => {
  const { id } = useLocalSearchParams();

  const { data } = useGetOneUser(id as string);

  return (
    <>
      <ScrollView style={styles.container1}>
        <ScreenHeader title={"User Detail"}></ScreenHeader>

        <UserDetailHeader item={data} />
        <View style={styles.container2}>
          <GraphCard />
        </View>
      </ScrollView>
    </>
  );
};

export default UserDetails;
//B0C4DE
