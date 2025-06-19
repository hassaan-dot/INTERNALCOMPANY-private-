import InputField from "@/src/Components/InputField/InputField";
import { useModalStore } from "@/store/useModalStore";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { PoppinsRegular } from "@/constants/fonts";
import helpers from "@/src/utils/helpers";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as yup from "yup";
import { styles } from "./styles";

import { useSendReminder } from "@/hooks/useClient";
import { useTranslation } from "react-i18next";

interface CreatePaymentReminderProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  modalContainerprop?: any;
  onSubmit: (formData: any) => void;
  desc?: boolean;
  desctext: string;
  create?: boolean;
}

const CreatePaymentReminder: React.FC<CreatePaymentReminderProps> = ({
  visible,
  onClose,
  title,
  modalContainerprop,
  onSubmit,
  desc,
  desctext,
  create,
}) => {
  const { t } = useTranslation();
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
    amount: yup.string().required(t("reminder.errors.amount_required")),
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
    try {
      await userSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = t(
              `reminder.errors.${error.path}`,
              { defaultValue: error.message }
            );
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    setTouched({ amount: true });

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
            blob,
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
        <View style={[styles.modalContainer, modalContainerprop]}>
          <Text style={styles.title}>{t(title)}</Text>

          <ScrollView>
            <View>
              <InputField
                titleStyle={styles.fontSize}
                title={t("reminder.amount")}
                style={[
                  styles.input,
                  { borderColor: errors.amount ? "red" : "#ddd" },
                ]}
                error={touched.amount && errors.amount}
                errorMessage={touched.amount && errors.amount}
                value={formData?.amount}
                onChangeText={(text) => handleInputChange("amount", text)}
                placeholder={t("reminder.amount_placeholder")}
                keyboardType="phone-pad"
                multiline={false}
                ispassword={false}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={[styles.inputContainer, { width: "100%" }]}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      marginBottom: 4,
                      fontFamily: PoppinsRegular,
                    }}
                  >
                    {t("reminder.upload_label")}
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
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                        <Feather name="paperclip" color={"#07504B"} size={12} />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={pickDocument} style={{ marginLeft: 7 }}>
                        {documents?.length < 1 && (
                          <Text style={{ paddingVertical: 4 }}>
                            {t("reminder.upload_placeholder")}
                          </Text>
                        )}
                      </TouchableOpacity>

                      {documents?.length > 0 && (
                        <FlatList
                          contentContainerStyle={{
                            width: helpers.normalize(200),
                            marginBottom: 2,
                          }}
                          horizontal
                          data={documents}
                          keyExtractor={(_, index) => index.toString()}
                          renderItem={({ item }) => (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderRadius: 9,
                                padding: 4,
                                marginHorizontal: 4,
                                backgroundColor: color[Math.floor(Math.random() * color.length)],
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={{
                                  flex: 1,
                                  marginLeft: 7,
                                  color: "white",
                                  fontFamily: PoppinsRegular,
                                }}
                              >
                                {item?.name}
                              </Text>
                              <TouchableOpacity onPress={() => removeDocument(documents.indexOf(item))}>
                                <AntDesign name="close" size={12} color="red" style={{ marginHorizontal: 10 }} />
                              </TouchableOpacity>
                            </View>
                          )}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>{t("reminder.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit} disabled={isSending}>
              <Text style={styles.addText}>
                {!isSending ? t("reminder.send") : <ActivityIndicator />}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePaymentReminder;
