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

interface Props {
  onPress: () => void;
}

interface Document {
  uri: string;
  name: string;
  type: string;
}

// Validation schema
const poSchema = yup.object().shape({
  isEdit: yup.boolean(),
  po_name: yup
    .string()
    .required("PO name is required")
    .min(2, "PO name must be at least 2 characters"),
  client: yup
    .string()
    .required("selection is required")
    .min(1, "Client must be at least 1 selecton"),

  notes: yup.string().nullable(),
});

const POForm: React.FC<Props> = ({ onPress }) => {
  const { rowData } = useModalStore();
  const color = ["#07504B"];
  const [documents, setDocuments] = useState<Document[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    po_name: rowData?.po_name || "",
    client: rowData?.client?.documentId || "",
    documentId: rowData?.documentId || "",
    notes: "",
    isEdit: rowData?.isEdit || false,
  });
  const { mutate: handleUpdate } = useUpdatePO();

  const { mutate: handleAdd } = useCreatePO(setFormData);

  const { data: allClientList } = useGetAllClients();

  const router = useRouter();

  const onPressUpdatefunction = async () => {
    setTouched({
      po_name: true,
      client: true,
    });
    const isValid = await validateForm();
    if (!isValid) return;
    const data = {
      po_name: formData?.po_name,
      client: formData?.client,
    };

    handleUpdate({ data, id: formData?.documentId });
  };

  const handleSubmit = () => {
    if (rowData?.isEdit) {
      onPressUpdatefunction();
    } else {
      onPressAddfunction();
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
        type: "*/*",
        multiple: true,
      });

      if (!result.canceled) {
        const newDocs = result.assets.map((file) => file);
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
    setTouched({
      po_name: true,
      client: true,
      notes: true,
    });
    const isValid = await validateForm();
    if (!isValid) return;
    const data = {
      po_name: formData?.po_name,
      client: formData?.client,
      note: formData?.notes,
    };

    const form_data = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      form_data.append(key, value as any);
    });

    // Append documents to form data
    documents.forEach((doc, index) => {
      form_data.append(`po_documents[${index}]`, doc as any);
    });

    handleAdd(form_data);
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <InputField
              placeholder="PO Name"
              title="PO Name"
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
              title="Select Client"
              selected={
                rowData?.isEdit &&
                `${rowData?.client?.contact_person_name} (${rowData?.client?.company_name})`
              }
              error={touched.client && errors.client}
              errorMessage={touched.client && errors.client}
            ></SingleSelectDropDown>
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
                  // marginTop: -5,
                  bottom: 3,
                }}
              >
                Documents
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
                                {item.name}
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

                        {documents.map((doc, index) => null)}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        {!rowData?.isEdit && (
          <View style={[{ marginRight: helpers.normalize(10) }]}>
            <InputField
              inputStyle={styles.input}
              title="Add notes"
              multiline={true}
              placeholder="Add your notes"
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
            edit={rowData?.isEdit}
            addDisabled={Object.keys(errors).length > 0}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default POForm;
