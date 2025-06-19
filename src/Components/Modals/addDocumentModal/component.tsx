import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { PoppinsRegular } from "@/constants/fonts";
import { useDeleteDoc, useUpdatePO } from "@/hooks/usePO";
import helpers from "@/src/utils/helpers";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList } from "react-native";
import { styles } from "./styles";

interface addDocumentModalProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  invoice: boolean;
  styleContainer: any;
  title: string;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => void;
  First: string;
  Firstchild: string;
  Second: string;
}

interface ClientFormData {
  contactPerson: string;
  email: string;
  phone: string;
  companyName: string;
}

const AddDocumentModal: React.FC<addDocumentModalProps> = ({
  visible,
  onClose,
}) => {
  const { id } = useLocalSearchParams();
  const color = ["#07504B"];

  const [documents, setDocuments] = useState<any[]>([]);

  const { mutate: handleUpdatePo, isPending: isUpdating } = useUpdatePO(false);

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
        setDocuments((prev) => [...prev, ...newDocs]);
      }
    } catch (err) {
      // Document picker error handled silently
    }
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    const formData = new FormData();
    documents.forEach((doc) => {
      formData.append("po_documents", doc.blob, doc.name);
    });

    handleUpdatePo({ data: formData, id });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={styles.container1}>
                <View style={[styles.inputContainer]}>
                  <Text style={styles.filetext}>{"upload file"}</Text>

                  <View style={styles.container2}>
                    <View style={styles.container4}>
                      <View>
                        <TouchableOpacity
                          onPress={pickDocument}
                          style={styles.pickdocument}
                        >
                          <Feather
                            name="paperclip"
                            color={"#07504B"}
                            style={{}}
                            size={12}
                          />
                        </TouchableOpacity>
                      </View>

                      <View>
                        <TouchableOpacity
                          onPress={pickDocument}
                          style={{
                            marginLeft: 7,
                          }}
                        >
                          {documents.length < 1 && (
                            <Text style={{ paddingVertical: 4 }}>
                              Upload your attachments/Documents
                            </Text>
                          )}
                        </TouchableOpacity>

                        {documents.length > 0 && (
                          <View style={{}}>
                            <FlatList
                              contentContainerStyle={{
                                width: helpers.normalize(200),
                                marginBottom: 2,
                              }}
                              showsHorizontalScrollIndicator={false}
                              horizontal={true}
                              data={documents}
                              keyExtractor={(_, index) => index.toString()}
                              renderItem={({ item }) => (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    // borderWidth: 1,
                                    // borderColor: "gray",
                                    borderRadius: 9,
                                    padding: 4,
                                    marginHorizontal: 4,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                      width: 0,
                                      height: 1,
                                    },
                                    backgroundColor:
                                      color[
                                      Math.floor(Math.random() * color.length)
                                      ],
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,
                                  }}
                                >
                                  <Text
                                    style={{
                                      flex: 1,
                                      marginLeft: 7,
                                      color: "white",
                                      fontFamily: PoppinsRegular,
                                    }}
                                    numberOfLines={1}
                                  >
                                    {item?.name}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() =>
                                      removeDocument(documents?.indexOf(item))
                                    }
                                  >
                                    <AntDesign
                                      name="close"
                                      size={12}
                                      color="red"
                                      style={{ marginHorizontal: 10 }}
                                    />
                                  </TouchableOpacity>
                                </View>
                              )}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleUpload}
              disabled={isUpdating}
            >
              <Text style={styles.addText}>
                {isUpdating ? <ActivityIndicator /> : "Upload"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddDocumentModal;
