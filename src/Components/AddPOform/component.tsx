import { PoppinsRegular } from "@/constants/fonts";
import { useCreatePO, useUpdatePO } from "@/hooks/usePO";
import { useModalStore } from "@/store/useModalStore";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import helpers from "../../utils/helpers";
import { ButtonRow } from "../CncelAddButtons/component";
import InputField from "../InputField/InputField";
import SingleSelectDropDown from "../SingleSelectDropDown/component";
import styles from "./styles";
import { useGetAllClients } from "@/hooks/useClient";
import { useTranslation } from "react-i18next";

interface Props {
  onPress: () => void;
}

const POForm: React.FC<Props> = ({ onPress }) => {
  const { t } = useTranslation();

  const poSchema = yup.object().shape({
    isEdit: yup.boolean(),
    po_name: yup
      .string()
      .required(t("form.validation.poRequired"))
      .min(2, t("form.validation.poMin")),
    client: yup
      .string()
      .required(t("form.validation.clientRequired"))
      .min(1, t("form.validation.clientMin")),
    notes: yup.string().nullable(),
  });

  const { rowData, setRowData } = useModalStore();
  const color = ["#07504B"];
  const [documents, setDocuments] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    po_name: rowData?.po_name || "",
    client: rowData?.client?.documentId || "",
    documentId: rowData?.documentId || "",
    notes: "",
    isEdit: rowData?.isEdit || false,
  });

  const { mutate: handleUpdate, isPending: isUpdating } = useUpdatePO();
  const { mutate: handleAdd, isPending: isAdding } = useCreatePO(setFormData);
  const { data: allClientList } = useGetAllClients();
  const router = useRouter();

  const onPressUpdatefunction = async () => {
    setTouched({ po_name: true, client: true });
    const isValid = await validateForm();
    if (!isValid) return;

    const data = {
      po_name: formData.po_name,
      client: formData.client,
    };

    handleUpdate({ data, id: formData.documentId });
  };

  const handleSubmit = () => {
    if (rowData?.isEdit) {
      onPressUpdatefunction();
    } else {
      onPressAddfunction();
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleClose = () => {
    setRowData(null);
    router.back();
  };

  const validateForm = async () => {
    try {
      await poSchema.validate(formData, { abortEarly: false });
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
      console.log("invalid", err);
      return false;
    }
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

  const onPressAddfunction = async () => {
    setTouched({ po_name: true, client: true, notes: true });
    const isValid = await validateForm();
    if (!isValid) return;

    const data = {
      po_name: formData.po_name,
      client: formData.client,
      note: formData.notes,
    };

    const form_data = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      form_data.append(key, value as any);
    });

    documents.forEach((doc) => {
      form_data.append("po_documents", doc.blob, doc.name);
    });

    handleAdd(form_data);
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <InputField
              placeholder={t("form.poName")}
              title={t("form.poName")}
              inputStyle={styles.input1}
              value={formData.po_name}
              onChangeText={(text) => handleInputChange("po_name", text)}
              onBlur={() => setTouched((prev) => ({ ...prev, po_name: true }))}
              error={touched.po_name && errors.po_name}
              errorMessage={touched.po_name && errors.po_name}
              multiline={false}
              ispassword={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <SingleSelectDropDown
              items={allClientList}
              containerStyle={{ marginRight: 20 }}
              setSelected={(client) => handleInputChange("client", client)}
              title={t("form.selectClient")}
              selected={
                rowData?.isEdit &&
                `${rowData?.client?.contact_person_name} (${rowData?.client?.company_name})`
              }
              error={touched.client && errors.client}
              errorMessage={touched.client && errors.client}
            />
          </View>
        </View>

        {!rowData?.isEdit && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "start",
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
                {t("form.documents")}
              </Text>

              <View
                style={{
                  borderRadius: 6,
                  borderColor: "#ddd",
                  borderWidth: 1,
                  paddingVertical: 7,
                  marginRight: 22,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                      <Feather name="paperclip" color="#07504B" size={12} />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity onPress={pickDocument} style={{ marginLeft: 7 }}>
                      {documents.length < 1 && (
                        <Text style={{ paddingVertical: 4 }}>
                          {t("form.uploadAttachments")}
                        </Text>
                      )}
                    </TouchableOpacity>

                    {documents.length > 0 && (
                      <FlatList
                        contentContainerStyle={{
                          width: helpers.normalize(200),
                          marginBottom: 2,
                        }}
                        showsHorizontalScrollIndicator={false}
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
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 1 },
                              backgroundColor:
                                color[Math.floor(Math.random() * color.length)],
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
                              {item.name}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                removeDocument(documents.indexOf(item))
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
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {!rowData?.isEdit && (
          <View style={{ marginRight: helpers.normalize(10) }}>
            <InputField
              inputStyle={styles.input}
              title={t("form.notes")}
              multiline
              placeholder={t("form.addNotes")}
              value={formData?.notes}
              onChangeText={(text) => handleInputChange("notes", text)}
              ispassword={false}
            />
          </View>
        )}

        <View style={styles.buttonRow}>
          <ButtonRow
            onCancel={handleClose}
            onAdd={handleSubmit}
            isLoading={isAdding || isUpdating}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default POForm;
