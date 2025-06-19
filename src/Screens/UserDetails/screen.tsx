import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { GraphCard, ScreenHeader, UserProfile } from "../../Components";
import { styles } from "./styles";

import { useLocalSearchParams } from "expo-router";
import { useGetOneUser } from "@/hooks/useUser";
import UserDetailHeader from "./header";
import { useTranslation } from "react-i18next";

const UserDetails = () => {
  const { id, documentId } = useLocalSearchParams();

  const { data, isPending } = useGetOneUser(id as string);

  const { t } = useTranslation();

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <>
      <ScrollView style={styles.container1}>
        <ScreenHeader
          title={t("User_Detail")}
          filter={false}
          showButton={false}
          buttonView={false}
          buttonViewMulitiple={false}
        />

        <UserDetailHeader
          item={data}
          contact_person_name=""
          email=""
          phone_number=""
          company_name=""
          rows={1}
          profile={false}
          style={{}}
          title=""
          titleIcon={false}
          titleStyle={{}}
          cardContainer={{}}
          detailscreenContainer={{}}
          horizontalwidth="50%"
        />

        <View style={styles.container2}>
          <GraphCard id={documentId as string} />
        </View>
      </ScrollView>
    </>
  );
};

export default UserDetails;
//B0C4DE
