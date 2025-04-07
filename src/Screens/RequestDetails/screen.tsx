import { useGetOneRequest } from "@/hooks/useRequest";
import { formatDate } from "@/src/utils";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import {
  CustomDropdownIndicator,
  InputField,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";

const RequestDetails: React.FC<{ route: any }> = ({ route }) => {
  const { id } = useLocalSearchParams();
  const { data: getRequest, isFetching } = useGetOneRequest(id as string);

  const [Value, setValue] = useState<string>("234");

  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  type Item = {
    label: string;
    value: any;
  };

  const items: Item[] = [
    { label: "Priority", value: "Priority" },
    { label: "Normal", value: "Normal" },
  ];

  if (isFetching) return <ActivityIndicator style={{ flex: 1 }} />;
  return (
    <>
      <View style={styles.custom4}>
        <View style={styles.custom3}>
          <ScreenHeader title={"Request Details"} />
        </View>

        <View style={styles.custom1}>
          <View style={styles.custom2}>
            <View style={[styles.container]}>
              <InputField
                style={styles.inputContainer}
                placeholder="Enter a request title"
                value={getRequest?.data?.title}
                editable={false}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <View style={styles.rowContainer}>
                <Text style={styles.date}>Date to perform:</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {formatDate(getRequest?.data?.perform_on)}
                  </Text>
                </View>
                <View style={{}}>
                  <CustomDropdownIndicator
                    items={items}
                    placeholder="Priority"
                    Role={Value}
                    SetRole={setValue}
                  />
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <InputField
                  editable={false}
                  style={styles.inputField}
                  multiline={true}
                  placeholderTextColor={"#000000"}
                  value={getRequest?.data?.description}
                  placeholder="Request description"
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                />
              </View>
            </View>
            <View style={{ marginRight: 20, marginTop: 20 }}>
              <View style={styles.custom5}>
                <Text style={styles.sectionTitle}>
                  {/* {`${getUser?.length} Users`} */}
                  {`${getRequest?.data?.users?.length} ${
                    getRequest?.data?.users?.length > 1 ? "Users" : "User"
                  }`}
                </Text>
                <FlatList
                  data={getRequest?.data?.users}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.custom6}
                  renderItem={({ item }) => (
                    <View style={styles.userRow}>
                      <Avatar.Text size={40} style={styles.avatar} />
                      <Text style={styles.customText}>{item?.username}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
          <View style={styles.custom7}>
            <Text style={styles.sectionTitle}>Files</Text>
            <View style={styles.custom9}>
              <Image source={{}} style={styles.custom8}></Image>
              {/* {!file && (
                <Card.Title
                  title={"file.pdf"}
                  subtitle="Note about this file"
                />
              )} */}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default RequestDetails;
