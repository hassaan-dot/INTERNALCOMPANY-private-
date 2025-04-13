import { icons } from "@/assets/icons/icons";
import InputField from "@/src/Components/InputField/InputField";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import * as yup from "yup";
import { styles } from "./styles";
import { AntDesign, Feather } from "@expo/vector-icons";
import { PoppinsRegular } from "@/constants/fonts";
import helpers from "@/src/utils/helpers";

import { useSendReminder } from "@/hooks/useClient";

interface CreatePaymentReminderProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  invoice: boolean;
  styleContainer: any;
  title: string;
  onClose: () => void;
  onSubmit: (
    companyName?: string,
    email?: string,
    contactPerson?: string,
    phoneNumber?: string
  ) => void;
  onLogin?: (username: string, password: string) => void;
  desctext: string;
  user: boolean;
  modalContainerprop: any;
  Data: any;
  update: boolean;
  onPressUpdatefunction: any;
}

const CreatePaymentReminder: React.FC<CreatePaymentReminderProps> = ({
  visible,
  onClose,
  onSubmit,
  create = false,
  title,

  modalContainerprop,
}) => {
  const { rowData } = useModalStore();
  const [documents, setDocuments] = useState<any[]>([]);
  const color = ["#07504B"];
  const { mutate: handleSend, isPending: isSending } = useSendReminder(
    rowData?.documentId
  );

  const [formData, setFormData] = useState({
    amount: "",
    documents: "",
  });

  const userSchema = yup.object().shape({
    amount: yup.string().required("Amount is required"),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field);
  };

  const validateForm = async () => {
    const schema = userSchema;

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const allFields = {
      amount: true,
    };

    setTouched(allFields);
    const isValid = await validateForm();

    if (!isValid) return;

    const form_data = new FormData();
    form_data.append("amount", formData?.amount);

    documents.forEach((doc) => {
      form_data.append("docs", doc.blob, doc.name);
    });

    handleSend(form_data);
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
      console.log("Document picker error:", err);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <View>
            <Text style={styles.title}>{title}</Text>{" "}
          </View>

          <ScrollView>
            <View>
              <InputField
                titleStyle={styles.fontSize}
                title={"Amount"}
                style={[
                  styles.input,
                  { borderColor: errors.amount ? "red" : "#ddd" },
                ]}
                error={touched.amount && errors.amount}
                errorMessage={touched.amount && errors.amount}
                value={formData?.amount}
                onChangeText={(text) => handleInputChange("amount", text)}
                placeholder={"Enter Amount"}
                keyboardType="phone-pad"
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={[styles.inputContainer, { width: "100%" }]}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      marginBottom: 4,
                      fontFamily: PoppinsRegular,
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
                          {documents?.length < 1 && (
                            <Text style={{ paddingVertical: 4 }}>
                              Upload your attachments/Documents
                            </Text>
                          )}
                        </TouchableOpacity>

                        {documents?.length > 0 && (
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
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addText}>{"Send Reminder"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePaymentReminder;
