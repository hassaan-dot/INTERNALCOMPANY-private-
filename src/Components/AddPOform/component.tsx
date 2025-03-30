// // import React, { useState } from "react";
// // import { View } from "react-native";
// // import InputField from "../InputField/InputField";
// // import helpers from "../../utils/helpers";
// // import { ButtonRow } from "../CncelAddButtons/component";
// // import styles from "./styles";
// // import { useCreatePO } from "@/hooks/usePO";
// // import { useRouter } from "expo-router";

// // interface Props {
// //   onPress: () => void;
// // }

// // const POForm: React.FC<Props> = ({ onPress }) => {
// //   const [formData, setFormData] = useState<any>({
// //     po_name: "",
// //     company_name: "",
// //     contact_name: "",
// //     email: "",
// //     phone_number: "",
// //     address: "",
// //     location: null,
// //     notes: "",
// //   });

// //   const { mutate: handleAdd } = useCreatePO(setFormData);
// //   // Handler to update state
// //   const handleInputChange = (field: keyof typeof formData, value: string) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //   };
// //   const router = useRouter();
// //   const handleClose = () => {
// //     router.back();
// //   };
// //   const onPressAddfunction = () => {
// //     const data: any = {
// //       po_name: formData?.po_name,
// //       company_name: formData?.contact_name,
// //       contact_name: formData?.company_name,
// //       email: formData?.email,
// //       phone_number: formData?.phone_number,
// //       address: formData?.address,
// //       location: 1,
// //       note: formData?.notes,
// //     };

// //     const form_data = new FormData();

// //     Object.entries(data).forEach(([key, value]) => {
// //       form_data.append(key, value as any);
// //     });

// //     handleAdd(form_data);
// //   };
// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.row}>
// //         <View style={styles.inputContainer}>
// //           <InputField
// //             placeholder="Reference Name"
// //             title="PO Name"
// //             style={styles.input1}
// //             value={formData?.po_name}
// //             onChangeText={(text) => handleInputChange("po_name", text)}
// //           />
// //         </View>
// //         <View style={styles.inputContainer}>
// //           <InputField
// //             placeholder="Company Name"
// //             title="Company Name"
// //             style={styles.input1}
// //             value={formData?.company_name}
// //             onChangeText={(text) => handleInputChange("company_name", text)}
// //           />
// //         </View>
// //       </View>
// //       <View style={styles.row}>
// //         <View style={styles.inputContainer}>
// //           <InputField
// //             placeholder="Contact Name"
// //             title="Contact Name"
// //             style={styles.input1}
// //             value={formData?.contact_name}
// //             onChangeText={(text) => handleInputChange("contact_name", text)}
// //           />
// //         </View>
// //         <View style={styles.inputContainer}>
// //           <InputField
// //             placeholder="Enter Email Address"
// //             title="Email Address"
// //             style={styles.input1}
// //             value={formData?.email}
// //             onChangeText={(text) => handleInputChange("email", text)}
// //           />
// //         </View>
// //       </View>
// //       <View style={styles.row}>
// //         <View style={styles.inputContainer}>
// //           <InputField
// //             placeholder={"Phone number"}
// //             title="Phone Number"
// //             style={styles.input1}
// //             value={formData?.phone_number}
// //             onChangeText={(text) => handleInputChange("phone_number", text)}
// //           />
// //         </View>
// //         <View style={styles.inputContainer}>
// //           <InputField
// //             placeholder="Enter Home Address"
// //             title="Address"
// //             style={styles.input1}
// //             value={formData?.address}
// //             onChangeText={(text) => handleInputChange("address", text)}
// //           />
// //         </View>
// //       </View>
// //       <View style={[{ marginRight: helpers.normalize(21) }]}>
// //         <InputField
// //           inputStyle={styles.input}
// //           title="Add notes"
// //           multiline={true}
// //           placeholder={"Add your notes"}
// //           value={formData?.notes}
// //           onChangeText={(text) => handleInputChange("notes", text)}
// //         />
// //       </View>
// //       <View style={styles.buttonRow}>
// //         <ButtonRow onCancel={handleClose} onAdd={onPressAddfunction} />
// //       </View>
// //     </View>
// //   );
// // };

// // export default POForm;
// import React, { useState } from "react";
// import { ScrollView, View } from "react-native";
// import InputField from "../InputField/InputField";
// import helpers from "../../utils/helpers";
// import { ButtonRow } from "../CncelAddButtons/component";
// import styles from "./styles";
// import { useCreatePO } from "@/hooks/usePO";
// import { useRouter } from "expo-router";
// import * as yup from "yup";

// interface Props {
//   onPress: () => void;
// }

// // Validation schema
// const poSchema = yup.object().shape({
//   po_name: yup
//     .string()
//     .required("PO name is required")
//     .min(2, "PO name must be at least 2 characters"),
//   company_name: yup
//     .string()
//     .required("Company name is required")
//     .min(2, "Company name must be at least 2 characters"),
//   contact_name: yup
//     .string()
//     .required("Contact name is required")
//     .min(2, "Contact name must be at least 2 characters"),
//   email: yup
//     .string()
//     .email("Please enter a valid email")
//     .required("Email is required"),
//   phone_number: yup
//     .string()
//     .required("Phone number is required")
//     .matches(/^[0-9]+$/, "Phone number can only contain numbers")
//     .min(10, "Phone number must be at least 10 digits"),
//   address: yup
//     .string()
//     .required("Address is required")
//     .min(5, "Address must be at least 5 characters"),
//   notes: yup.string().optional(),
// });

// const POForm: React.FC<Props> = ({ onPress }) => {
//   const [formData, setFormData] = useState({
//     po_name: "",
//     company_name: "",
//     contact_name: "",
//     email: "",
//     phone_number: "",
//     address: "",
//     location: null,
//     notes: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [touched, setTouched] = useState<Record<string, boolean>>({});

//   const { mutate: handleAdd } = useCreatePO(setFormData);
//   const router = useRouter();

//   const handleInputChange = (field: keyof typeof formData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//     setTouched((prev) => ({ ...prev, [field]: true }));
//     clearError(field);
//   };

//   const clearError = (field: string) => {
//     if (errors[field]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   const handleClose = () => {
//     router.back();
//   };

//   const validateForm = async () => {
//     try {
//       await poSchema.validate(formData, { abortEarly: false });
//       setErrors({});
//       return true;
//     } catch (err) {
//       if (err instanceof yup.ValidationError) {
//         const newErrors: Record<string, string> = {};
//         err.inner.forEach((error) => {
//           if (error.path) {
//             newErrors[error.path] = error.message;
//           }
//         });
//         setErrors(newErrors);
//       }
//       return false;
//     }
//   };

//   const onPressAddfunction = async () => {
//     // Mark all fields as touched
//     setTouched({
//       po_name: true,
//       company_name: true,
//       contact_name: true,
//       email: true,
//       phone_number: true,
//       address: true,
//       notes: true,
//     });

//     const isValid = await validateForm();
//     if (!isValid) return;

//     const data = {
//       po_name: formData.po_name,
//       company_name: formData.company_name,
//       contact_name: formData.contact_name,
//       email: formData.email,
//       phone_number: formData.phone_number,
//       address: formData.address,
//       location: 1,
//       note: formData.notes,
//     };

//     const form_data = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       form_data.append(key, value as any);
//     });

//     handleAdd(form_data);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.row}>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Reference Name"
//             title="PO Name"
//             inputStyle={styles.input1}
//             value={formData.po_name}
//             onChangeText={(text) => handleInputChange("po_name", text)}
//             onBlur={() => setTouched((prev) => ({ ...prev, po_name: true }))}
//             error={touched.po_name && errors.po_name}
//             errorMessage={touched.po_name && errors.po_name}
//             multiline={false}
//             ispassword={false}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Company Name"
//             title="Company Name"
//             inputStyle={styles.input1}
//             value={formData.company_name}
//             onChangeText={(text) => handleInputChange("company_name", text)}
//             onBlur={() =>
//               setTouched((prev) => ({ ...prev, company_name: true }))
//             }
//             error={touched.company_name && errors.company_name}
//             errorMessage={touched.company_name && errors.company_name}
//             multiline={false}
//             ispassword={false}
//           />
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Contact Name"
//             title="Contact Name"
//             inputStyle={styles.input1}
//             value={formData.contact_name}
//             onChangeText={(text) => handleInputChange("contact_name", text)}
//             onBlur={() =>
//               setTouched((prev) => ({ ...prev, contact_name: true }))
//             }
//             error={touched.contact_name && errors.contact_name}
//             errorMessage={touched.contact_name && errors.contact_name}
//             multiline={false}
//             ispassword={false}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Enter Email Address"
//             title="Email Address"
//             inputStyle={styles.input1}
//             value={formData.email}
//             onChangeText={(text) => handleInputChange("email", text)}
//             onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             error={touched.email && errors.email}
//             errorMessage={touched.email && errors.email}
//             multiline={false}
//             ispassword={false}
//           />
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Phone number"
//             title="Phone Number"
//             inputStyle={styles.input1}
//             value={formData.phone_number}
//             onChangeText={(text) => handleInputChange("phone_number", text)}
//             onBlur={() =>
//               setTouched((prev) => ({ ...prev, phone_number: true }))
//             }
//             keyboardType="phone-pad"
//             error={touched.phone_number && errors.phone_number}
//             errorMessage={touched.phone_number && errors.phone_number}
//             multiline={false}
//             ispassword={false}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Enter Home Address"
//             title="Address"
//             inputStyle={styles.input1}
//             value={formData.address}
//             onChangeText={(text) => handleInputChange("address", text)}
//             onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
//             error={touched.address && errors.address}
//             errorMessage={touched.address && errors.address}
//             multiline={false}
//             ispassword={false}
//           />
//         </View>
//       </View>
//       <View style={{ flexDirection: "row" }}>
//         <View style={styles.inputContainer}>
//           <View
//             style={{
//               borderRadius: 12,
//               borderColor: "#ddd",
//               // padding: 20,
//               // paddingVertical: 8,
//               flex: 1,

//               backgroundColor: "red",
//               marginRight: 22,
//             }}
//           >
//             //Documents
//           </View>
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Location"
//             title="Enter Location"
//             inputStyle={styles.input1}
//             value={formData.address}
//             onChangeText={(text) => handleInputChange("address", text)}
//             onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
//             error={touched.address && errors.address}
//             errorMessage={touched.address && errors.address}
//             multiline={false}
//             ispassword={false}
//           />
//         </View>
//       </View>
//       <View style={[{ marginRight: helpers.normalize(21) }]}>
//         <InputField
//           inputStyle={styles.input}
//           title="Add notes"
//           multiline={true}
//           placeholder="Add your notes"
//           value={formData.notes}
//           onChangeText={(text) => handleInputChange("notes", text)}
//           ispassword={false}
//         />
//       </View>
//       <View style={styles.buttonRow}>
//         <ButtonRow
//           onCancel={handleClose}
//           onAdd={onPressAddfunction}
//           addDisabled={Object.keys(errors).length > 0}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default POForm;
import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, Image } from "react-native";
import InputField from "../InputField/InputField";
import helpers from "../../utils/helpers";
import { ButtonRow } from "../CncelAddButtons/component";
import styles from "./styles";
import { useCreatePO } from "@/hooks/usePO";
import { useRouter } from "expo-router";
import * as yup from "yup";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Feather } from "@expo/vector-icons";
import { PoppinsRegular } from "@/constants/fonts";

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
  const [formData, setFormData] = useState({
    po_name: "",
    company_name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    address: "",
    location: null,
    notes: "",
  });

  const [documents, setDocuments] = useState<Document[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { mutate: handleAdd } = useCreatePO(setFormData);
  const router = useRouter();

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

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        const newDocs = result.assets.map((file) => ({
          uri: file.uri,
          name: file.fileName || "Image",
          type: file.type || "image/jpeg",
        }));
        setDocuments((prev) => [...prev, ...newDocs]);
      }
    } catch (err) {
      console.log("Image picker error:", err);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const onPressAddfunction = async () => {
    // Mark all fields as touched
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
      po_name: formData.po_name,
      company_name: formData.company_name,
      contact_name: formData.contact_name,
      email: formData.email,
      phone_number: formData.phone_number,
      address: formData.address,
      location: 1,
      note: formData.notes,
    };

    const form_data = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      form_data.append(key, value as any);
    });

    // Append documents to form data
    documents.forEach((doc, index) => {
      form_data.append(`documents[${index}]`, {
        uri: doc.uri,
        name: doc.name,
        type: doc.type,
      } as any);
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
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              fontFamily: PoppinsRegular,
              marginTop: 4,
            }}
          >
            Documents
          </Text>

          <View
            style={{
              borderRadius: 6,
              borderColor: "#ddd",
              borderWidth: 1,
              padding: 12,
              marginRight: 20,
              marginTop: 5,
              // minHeight: 100,
            }}
          >
            <View style={{ flexDirection: "row", paddingVertical: 8 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#f6f6f6",
                  padding: 5,
                  borderRadius: 4,
                  justifyContent: "center",
                }}
              >
                <Feather name="paperclip" color={"#07504B"} size={12}></Feather>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={pickDocument}
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: 8,
                  borderRadius: 8,
                  marginRight: 8,
                }}
              >
                <Text>Add Document</Text>
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={pickImage}
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text>Add Image</Text>
              </TouchableOpacity> */}
            </View>

            {documents.length > 0 && (
              <View>
                {documents.map((doc, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f9f9f9",
                      padding: 8,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    {doc.type.startsWith("image/") ? (
                      <Image
                        source={{ uri: doc.uri }}
                        style={{ width: 40, height: 40, marginRight: 8 }}
                      />
                    ) : (
                      <AntDesign
                        name="file1"
                        size={24}
                        color="black"
                        style={{ marginRight: 8 }}
                      />
                    )}
                    <Text style={{ flex: 1 }} numberOfLines={1}>
                      {doc.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeDocument(index)}>
                      <AntDesign name="close" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Location"
            title="Enter Location"
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
      <View style={[{ marginRight: helpers.normalize(21) }]}>
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
      <View style={styles.buttonRow}>
        <ButtonRow
          onCancel={handleClose}
          onAdd={onPressAddfunction}
          addDisabled={Object.keys(errors).length > 0}
        />
      </View>
    </ScrollView>
  );
};

export default POForm;
