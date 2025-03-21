import React, { useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
// import { Card, Avatar } from "react-native-paper";
import {
  CustomDropdownIndicator,
  InputField,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";

interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: "1", name: "Amir" },
  { id: "2", name: "Hamid M." },
  { id: "3", name: "Daniel Koffman" },
];

const RequestDetails: React.FC<{ route: any }> = ({ route }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("30 May 2021 20:45");
  const [priority, setPriority] = useState<string>("Medium");
  const [file, setFile] = useState();

  return (
    <>
      <View style={styles.custom4}>
        <View style={styles.custom3}>
          <ScreenHeader title={route?.name} />
        </View>
        <View style={styles.custom1}>
          <View style={styles.custom2}>
            <View style={[styles.container]}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter request title</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.text}>Date to perform:</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{date}</Text>
                </View>
                <CustomDropdownIndicator />
              </View>
              <View style={styles.descriptionContainer}>
                <InputField
                  style={styles.inputField}
                  placeholderTextColor={"#000000"}
                  placeholder="Description"
                />
              </View>
            </View>
            <View style={{}}>
              <View style={styles.custom5}>
                <Text style={styles.sectionTitle}>3 Users</Text>
                <FlatList
                  data={users}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.custom6}
                  renderItem={({ item }) => (
                    <View style={styles.userRow}>
                      {/* <Avatar.Text size={40} style={styles.avatar} /> */}
                      <Text style={styles.customText}>{item.name}</Text>
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
