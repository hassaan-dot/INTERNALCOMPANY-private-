import { icons } from "@/assets/icons/icons";
import {
  useGetOneRequest,
  useRemoveDocument,
  useUploadDocument,
} from "@/hooks/useRequest";
import { formatDate, handleDownload } from "@/src/utils";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import {
  CustomDropdownIndicator,
  InputField,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";
import * as DocumentPicker from "expo-document-picker";

const RequestDetails: React.FC<{ route: any }> = ({ route }) => {
  const { id } = useLocalSearchParams();
  const { data: request_data, isPending } = useGetOneRequest(id as string);

  const [Value, setValue] = useState<string>("234");

  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const { mutate: handleUpload } = useUploadDocument();
  const { mutate: handleDeleteDoc, isPending: isDeleting } =
    useRemoveDocument();

  type Item = {
    label: string;
    value: any;
  };

  const items: Item[] = [
    { label: "Priority", value: "Priority" },
    { label: "Normal", value: "Normal" },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*", // All image types (jpeg, png, etc.)
          "application/pdf", // PDF files
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
          "application/msword", // .doc
          "application/vnd.ms-excel", // .xls
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
          "text/csv", // .csv
        ],
        multiple: true,
      });

      if (!result.canceled) {
        const newDocsPromises = result.assets.map(async (file) => {
          const response = await fetch(file.uri);
          const blob = await response.blob();

          return {
            uri: file.uri,
            name: file.name,
            type: file.mimeType || "application/octet-stream",
            blob: blob,
          };
        });

        const newDocs = await Promise.all(newDocsPromises);

        const formData = new FormData();
        newDocs.forEach((doc) => {
          formData.append("documents", doc.blob, doc.name);
        });

        handleUpload({ data: formData, id: request_data?.data?.documentId });
      }
    } catch (err) {
      console.log("Document picker error:", err);
    }
  };

  const [showDeleting, setShowDeleting] = useState<any>();

  const handleRemoveDoc = (doc_id: string | number) => {
    setShowDeleting(doc_id);
    handleDeleteDoc({ data: { doc_id }, id: request_data?.data?.documentId });
  };

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <>
      <ScrollView contentContainerStyle={styles.custom4}>
        <View style={styles.custom3}>
          <ScreenHeader
            title={"Request Details"}
            request_status={request_data?.data?.request_status}
          />
        </View>

        <View style={styles.custom1}>
          <View style={styles.custom2}>
            <View style={[styles.container]}>
              <InputField
                style={styles.inputContainer}
                placeholder="Enter a request title"
                value={request_data?.data?.title}
                editable={false}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <View style={styles.rowContainer}>
                <Text style={styles.date}>Date to perform:</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>
                    {formatDate(request_data?.data?.perform_on)}
                  </Text>
                </View>
                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      padding: 12,
                      borderRadius: 4,
                      paddingHorizontal: 20,
                      backgroundColor: "#f9f9f9",
                    }}
                    disabled={true}
                  >
                    <Text style={styles.date}>
                      {request_data?.data?.standing}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <InputField
                  editable={false}
                  style={styles.inputField}
                  multiline={true}
                  placeholderTextColor={"#000000"}
                  value={request_data?.data?.description}
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
                  {`${request_data?.data?.users?.length} ${
                    request_data?.data?.users?.length > 1 ? "Users" : "User"
                  }`}
                </Text>
                <FlatList
                  data={request_data?.data?.users}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.custom6}
                  renderItem={({ item }) => (
                    <View style={styles.userRow}>
                      <Avatar.Text size={40} style={styles.avatar} />
                      <Text
                        style={styles.customText}
                      >{`${item?.first_name} ${item?.last_name}`}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
          <View style={styles.custom7}>
            <Text style={styles.sectionTitle}>Files</Text>
            {request_data?.data?.documents?.map((doc: any) => (
              <View style={styles.custom9}>
                <View style={styles.custom8}>
                  <Image
                    source={icons.requestFileIcon}
                    style={{ width: 20, height: 20 }}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => handleDownload(doc?.url, doc?.name)}
                  key={doc.id}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={styles.files}>{doc?.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={isDeleting}
                  onPress={() => handleRemoveDoc(doc?.id)}
                  style={{ marginLeft: 20 }}
                >
                  {showDeleting == doc?.id && isDeleting ? (
                    <ActivityIndicator />
                  ) : (
                    <Image
                      source={icons.tableDeleteIcon}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: "red",
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ))}
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={styles.buttonfile}
                onPress={pickDocument}
              >
                <View>
                  <Feather name="plus" size={20} style={{ marginRight: 10 }} />
                </View>
                <View>
                  <Text style={styles.desc1}>Add File</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RequestDetails;
