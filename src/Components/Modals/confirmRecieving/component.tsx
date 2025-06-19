import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { useForm } from "react-hook-form";
import { styles } from "./styles";
import { icons } from "@/assets/icons/icons";
import InputField from "../../InputField/InputField";
import { PoppinsRegular } from "@/constants/fonts";
import helpers from "@/src/utils/helpers";
import { AntDesign, Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { usePOActions } from "@/hooks/usePoActions";
import { useLocalSearchParams } from "expo-router";

interface ClientModalProps {
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

const ConfirmRecieving: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  create = false,
  onSubmit,
  title,
}) => {
  const { id } = useLocalSearchParams();
  const color = ["#07504B"];

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const [documents, setDocuments] = useState<any[]>([]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const {
    handleSendCode,
    isSendingCode,
    handleConfirmRecieving,
    isConfirming,
  } = usePOActions(id as string);

  const handleChangeText = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleFormSubmit = () => {
    const form_data = new FormData();
    form_data.append("code", otp?.join()?.split(",")?.join(""));

    documents.forEach((doc) => {
      form_data.append("proof_of_confirmation", doc.blob, doc.name);
    });

    handleConfirmRecieving(form_data);
  };

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

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginVertical: 5 }}>
              <>
                <Image
                  source={icons.modalIconOtp}
                  style={{ width: 60, height: 60 }}
                ></Image>
                <Text style={styles.title}>{title}</Text>
              </>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={[styles.inputContainer]}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      fontFamily: PoppinsRegular,
                      bottom: 3,
                    }}
                  >
                    {"upload proof of received"}
                  </Text>

                  <View
                    style={{
                      borderRadius: 6,
                      borderColor: "#ddd",
                      borderWidth: 1,
                      paddingVertical: 7,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View>
                        <TouchableOpacity
                          onPress={pickDocument}
                          style={{
                            backgroundColor: "#f6f6f6",
                            padding: 5,
                            paddingVertical: 0,
                            marginLeft: 7,
                            borderRadius: 4,
                            justifyContent: "center",
                          }}
                        >
                          <Feather
                            name="paperclip"
                            color={"#07504B"}
                            style={{}}
                            size={12}
                          ></Feather>
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

            <View>
              <View
                style={{ marginBottom: 20, marginTop: 16, paddingRight: 50 }}
              >
                <Text style={styles.title1}>
                  Enter the OTP confirmation code from client
                </Text>
              </View>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onChangeText={(text) => handleChangeText(index, text)}
                  />
                ))}
                <TouchableOpacity
                  onPress={handleSendCode}
                  disabled={isSendingCode}
                >
                  <Text style={styles.resendText}>
                    {isSendingCode ? "Sending" : "Send Code"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleFormSubmit}
              disabled={isConfirming}
            >
              <Text style={styles.addText}>
                {isConfirming ? "Confirming" : "Confirm"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmRecieving;
