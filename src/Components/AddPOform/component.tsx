import { PoppinsRegular } from "@/constants/fonts";
import { useLocations } from "@/hooks/useLocation";
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
  po_name: yup
    .string()
    .required("PO name is required")
    .min(2, "PO name must be at least 2 characters"),
  company_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  contact_name: yup
    .string()
    .required("Contact name is required")
    .min(2, "Contact name must be at least 2 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number can only contain numbers")
    .min(10, "Phone number must be at least 10 digits"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  notes: yup.string().optional(),
});

const POForm: React.FC<Props> = ({ onPress }) => {
  const { rowData } = useModalStore();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    po_name: rowData?.po_name || "",
    company_name: rowData?.company_name || "",
    contact_name: rowData?.contact_name || "",
    email: rowData?.email || "",
    phone_number: rowData?.phone_number || "",
    address: rowData?.address || "",
    location: rowData?.location?.id || "",
    documentId: rowData?.documentId || "",
    notes: "",
  });
  const { mutate: handleUpdate } = useUpdatePO();

  const { data: locations } = useLocations();

  const { mutate: handleAdd } = useCreatePO(setFormData);
  const router = useRouter();

  const onPressUpdatefunction = ({
    po_name,
    company_name,
    contact_name,
    email,
    phone_number,
    address,
    location,
    documentId,
    notes,
  }: any) => {
    const data = {
      po_name,
      company_name,
      contact_name,
      email,
      phone_number,
      address,
    };
    console.log("data", data);
    handleUpdate({ data, id: documentId });
  };
  const handleSubmit = () => {
    if (rowData?.isEdit) {
      onPressUpdatefunction(formData);
    } else {
      onPressAddfunction();
    }
  };

  const locationItems = locations?.data?.map((location: any) => ({
    key: location?.id,
    value: location?.location_name,
  }));

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
        const newDocs = result.assets.map((file) => ({
          uri: file.uri,
          name: file.name || "Document",
          type: file.mimeType || "application/octet-stream",
        }));
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
      company_name: true,
      contact_name: true,
      email: true,
      phone_number: true,
      address: true,
      notes: true,
    });
    const isValid = await validateForm();
    if (!isValid) return;
    const data = {
      po_name: formData?.po_name,
      company_name: formData?.company_name,
      contact_name: formData?.contact_name,
      email: formData?.email,
      phone_number: formData?.phone_number,
      address: formData?.address,
      location: formData?.location,
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Reference Name"
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
          <InputField
            placeholder="Company Name"
            title="Company Name"
            inputStyle={styles.input1}
            value={formData.company_name}
            onChangeText={(text) => handleInputChange("company_name", text)}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, company_name: true }))
            }
            error={touched.company_name && errors.company_name}
            errorMessage={touched.company_name && errors.company_name}
            multiline={false}
            ispassword={false}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Contact Name"
            title="Contact Name"
            inputStyle={styles.input1}
            value={formData.contact_name}
            onChangeText={(text) => handleInputChange("contact_name", text)}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, contact_name: true }))
            }
            error={touched.contact_name && errors.contact_name}
            errorMessage={touched.contact_name && errors.contact_name}
            multiline={false}
            ispassword={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Enter Email Address"
            title="Email Address"
            inputStyle={styles.input1}
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            keyboardType="email-address"
            autoCapitalize="none"
            error={touched.email && errors.email}
            errorMessage={touched.email && errors.email}
            multiline={false}
            ispassword={false}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Phone number"
            title="Phone Number"
            inputStyle={styles.input1}
            value={formData.phone_number}
            onChangeText={(text) => handleInputChange("phone_number", text)}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, phone_number: true }))
            }
            keyboardType="phone-pad"
            error={touched.phone_number && errors.phone_number}
            errorMessage={touched.phone_number && errors.phone_number}
            multiline={false}
            ispassword={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Enter Home Address"
            title="Address"
            inputStyle={styles.input1}
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
            onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
            error={touched.address && errors.address}
            errorMessage={touched.address && errors.address}
            multiline={false}
            ispassword={false}
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
                paddingVertical: 9,
                // height: 42,
                marginRight: 22,
                // marginTop: 5,
                // width: "100%",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <TouchableOpacity
                    onPress={pickDocument}
                    style={{
                      backgroundColor: "#f6f6f6",
                      padding: 5,
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
                      <Text>Upload your attachments/Documents</Text>
                    )}
                  </TouchableOpacity>
                  {documents.length > 0 && (
                    <View style={{}}>
                      <FlatList
                        style={{ width: "60%" }}
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

                              borderRadius: 8,
                            }}
                          >
                            {item.type.startsWith("image/") ? (
                              <Image
                                source={{ uri: item.uri }}
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginRight: 8,
                                }}
                              />
                            ) : null}
                            <Text
                              style={{ flex: 1, marginLeft: 7 }}
                              numberOfLines={1}
                            >
                              {item.name}
                            </Text>
                            <TouchableOpacity
                              onPress={() => removeDocument(item)}
                            >
                              <AntDesign
                                name="close"
                                size={12}
                                color="red"
                                style={{ marginLeft: 10 }}
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
          <View style={[styles.inputContainer, { marginRight: 60 }]}>
            <SingleSelectDropDown
              items={locationItems}
              containerStyle={{ marginRight: 20 }}
              setSelected={(location) =>
                handleInputChange("location", location)
              }
              title="Enter Location"
            ></SingleSelectDropDown>
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
            value={formData.notes}
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
    </ScrollView>
  );
};

export default POForm;
