import { icons } from "@/assets/icons/icons";
import {
  useGetOneRequest,
  useRemoveDocument,
  useUploadDocument,
} from "@/hooks/useRequest";
import { formatDate, handleDownload } from "@/src/utils";
import { Feather } from "@expo/vector-icons";
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
  InputField,
  ScreenHeader,
} from "../../Components";
import { styles } from "./styles";
import * as DocumentPicker from "expo-document-picker";
import { useTranslation } from "react-i18next";

const RequestDetails: React.FC<{ route: any }> = ({ route }) => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const { data: request_data, isPending } = useGetOneRequest(id as string);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { mutate: handleUpload } = useUploadDocument();
  const { mutate: handleDeleteDoc, isPending: isDeleting } = useRemoveDocument();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*",
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
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
      // Document picker error handled silently
    }
  };

  const [showDeleting, setShowDeleting] = useState<any>();
  const handleRemoveDoc = (doc_id: string | number) => {
    setShowDeleting(doc_id);
    handleDeleteDoc({ data: { doc_id }, id: request_data?.data?.documentId });
  };

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <ScrollView contentContainerStyle={styles.custom4}>
      <View style={styles.custom3}>
        <ScreenHeader
          title={t("request_details.title")}
          request_status={request_data?.data?.request_status}
          standing={request_data?.data?.standing}
        />
      </View>

      <View style={styles.custom1}>
        <View style={styles.custom2}>
          <View style={styles.container}>
            <InputField
              title=""
              style={styles.inputContainer}
              placeholder={t("request_details.enter_title")}
              value={request_data?.data?.title}
              editable={false}
              onChangeText={setTitle}
              multiline={false}
              ispassword={false}
              errorMessage=""
            />
            <View style={styles.rowContainer}>
              <Text style={styles.date}>{t("request_details.perform_on")}</Text>
              <View style={styles.dateContainer}>
                <Text style={styles.date}>
                  {formatDate(request_data?.data?.perform_on)}
                </Text>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <InputField
                title=""
                editable={false}
                style={styles.inputField}
                multiline={true}
                placeholderTextColor={"#000000"}
                value={request_data?.data?.description}
                placeholder={t("request_details.description")}
                onChangeText={setDescription}
                ispassword={false}
                errorMessage=""
              />
            </View>
          </View>

          <View style={{ marginRight: 20, marginTop: 20 }}>
            <View style={styles.custom5}>
              <Text style={styles.sectionTitle}>
                {`${request_data?.data?.users?.length} ${request_data?.data?.users?.length > 1 ? t("request_details.users") : t("request_details.user")}`}
              </Text>
              <FlatList
                data={request_data?.data?.users}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.custom6}
                renderItem={({ item }) => (
                  <View style={styles.userRow}>
                    <Text style={styles.customText}>
                      {`${item?.first_name} ${item?.last_name}`}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        <View style={styles.custom7}>
          <Text style={styles.sectionTitle}>{t("request_details.files")}</Text>
          {request_data?.data?.documents?.map((doc: any) => (
            <View key={doc.id} style={styles.custom9}>
              <View style={styles.custom8}>
                <Image
                  source={icons.requestFileIcon}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <TouchableOpacity
                onPress={() => handleDownload(doc?.url, doc?.name)}
                style={{ marginLeft: 10 }}
              >
                <Text style={styles.files}>{doc?.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isDeleting}
                onPress={() => handleRemoveDoc(doc?.id)}
                style={{ marginLeft: 20 }}
              >
                {showDeleting === doc?.id && isDeleting ? (
                  <ActivityIndicator />
                ) : (
                  <Image
                    source={icons.tableDeleteIcon}
                    style={{ width: 20, height: 20, tintColor: "red" }}
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity style={styles.buttonfile} onPress={pickDocument}>
              <View>
                <Feather name="plus" size={20} style={{ marginHorizontal: 10, color: "#fff" }} />
              </View>
              <View>
                <Text style={styles.desc1}>{t("request_details.add_file")}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestDetails;
