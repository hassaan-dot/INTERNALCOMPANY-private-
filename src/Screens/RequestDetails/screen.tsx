import { useGetUser } from "@/hooks/useUser";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import {
  CustomDropdownIndicator,
  DateTimeSelector,
  InputField,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";
import { useModalStore } from "@/store/useModalStore";

const RequestDetails: React.FC<{ route: any }> = ({ route }) => {
  const { data, isPending, error } = useGetUser();
  const { setRowData, rowData } = useModalStore();

  const [Value, setValue] = useState<string>("");

  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [date, setDate] = useState<string>("30 May 2021 20:45");

  const [priority, setPriority] = useState<string>("Medium");

  const [file, setFile] = useState();
  // console.log("RequestTitle", title);
  // console.log("Description", description);
  // console.log("date", date);
  // console.log("Priority", Value);

  type Item = {
    label: string;
    value: any;
  };

  const items: Item[] = [
    { label: "Priority", value: "Priority" },
    { label: "Normal", value: "Normal" },
  ];

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
                // value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <View style={styles.rowContainer}>
                <Text style={styles.text}>Date to perform:</Text>
                <View style={styles.dateContainer}>
                  <DateTimeSelector />
                </View>
                <View style={{ marginTop: 20 }}>
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
                  style={styles.inputField}
                  placeholderTextColor={"#000000"}
                  placeholder="Request description"
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                />
              </View>
            </View>
            <View style={{ marginRight: 20, marginTop: 20 }}>
              <View style={styles.custom5}>
                <Text
                  style={styles.sectionTitle}
                >{`${data?.length} Users`}</Text>
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.custom6}
                  renderItem={({ item }) => (
                    <View style={styles.userRow}>
                      <Avatar.Text size={40} style={styles.avatar} />
                      <Text style={styles.customText}>{item?.first_name}</Text>
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
