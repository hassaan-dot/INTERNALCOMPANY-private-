// import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../../Resources";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
import { CustomDropdownIndicator, SingleSelectDropDown } from "../..";
import { useEffect, useState } from "react";
import { useModalStore } from "@/store/useModalStore";

interface ClientModalProps {
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
  onLogin?: (username: string, password: string) => void; // New login prop
  First: string;
  Firstchild: string;
  Second: string;
  Third: string;
  Fourth: string;
  Fifth: string;
  Sixth: string;
  seventh: string;
  eigth: string;
  ninth: string;
  desctext: string;
  user: boolean;
  modalContainerprop: any;
  Data: any;
  deleteD: boolean;
  update: boolean;
  onPressUpdatefunction: any;
  isLogin?: boolean; // Flag to indicate if this is a login modal
}

const CreateUserModal: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  onSubmit,
  Data,
  user,
  create = false,
  deleteD = false,
  update = false,
  onLogin, // Destructure the new prop
  title,
  desc = false,
  invoice = false,
  styleContainer,
  First,
  desctext,
  Firstchild,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  seventh,
  eigth,
  ninth,
  modalContainerprop,
  isLogin = false, // Default to false
}) => {
  const [Role, SetRole] = useState();
  const [Dep, SetDep] = useState();

  const { rowData } = useModalStore();
  const [formData, setFormData] = useState(
    rowData ?? {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      roles: "",
      department: "",
    }
  );

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // const validateForm = () => {
  //   if (isLogin) {
  //     // Validation for login form
  //     return formData.username.trim() !== "" && formData.password.trim() !== "";
  //   }

  //   if (create) {
  //     // Basic validation for create client form
  //     return (
  //       formData.first_name.trim() !== "" &&
  //       formData.email.trim() !== "" &&
  //       formData.phone_number.trim() !== "" &&
  //       formData.last_name.trim() !== ""
  //     );
  //   }
  //   // Add other validation logic for different forms if needed
  //   return true;
  // };

  type Item = {
    key: any;
    value: string;
  };

  // const { data } = useUserRole();
  // const { data } = useGetDepartment();

  const items1: Item[] = [
    { value: "Admin", key: 1 },
    { value: "Employee", key: 2 },
  ];
  const items2: Item[] = [
    { value: "anything", key: 1 },
    // { label: "Employee", value: "2" },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {create && (
                <>
                  <Image
                    source={icons.modalIconOtp}
                    style={{ width: 60, height: 60 }}
                  />
                  <Text style={styles.title}>{title}</Text>
                </>
              )}

              {!create && !isLogin && (
                <Text style={styles.title}>Send Payment Reminder</Text>
              )}

              {isLogin && <Text style={styles.title}>Login</Text>}

              {desc && <Text style={styles.subtitle}>{desctext}</Text>}
            </View>

            <>
              <View style={[styleContainer]}>
                <InputField
                  title={First}
                  placeholder={First}
                  value={formData.first_name}
                  onChangeText={(text) => handleInputChange("first_name", text)}
                  style={styles.input}
                  titleStyle={styles.fontSize}
                />

                <View style={{ marginLeft: 7 }}>
                  <InputField
                    title={Firstchild}
                    placeholder={Firstchild}
                    value={formData.last_name}
                    onChangeText={(text) =>
                      handleInputChange("last_name", text)
                    }
                    style={styles.input}
                    titleStyle={styles.fontSize}
                  />
                </View>
              </View>

              <View>
                <InputField
                  title={Second}
                  placeholder={Second}
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  titleStyle={styles.fontSize}
                  style={styles.input}
                  keyboardType="email-address"
                />
              </View>

              <View>
                <InputField
                  title={"User Name"}
                  placeholder={"Username"}
                  value={formData.username}
                  onChangeText={(text) => handleInputChange("username", text)}
                  titleStyle={styles.fontSize}
                  style={styles.input}
                  keyboardType="email-address"
                />
              </View>

              <View>
                <InputField
                  title={"Password"}
                  placeholder={"Password"}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  titleStyle={styles.fontSize}
                  style={styles.input}
                  keyboardType="email-address"
                />
              </View>

              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  title={Third}
                  value={formData.phone_number}
                  onChangeText={(text) =>
                    handleInputChange("phone_number", text)
                  }
                  placeholder={Third}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={{ marginBottom: 5 }}>
                <SingleSelectDropDown
                  items={items1}
                  title="Select Role"
                  selected={Role}
                  setSelected={SetRole}
                />
              </View>

              <View style={{ marginBottom: 10 }}>
                <SingleSelectDropDown
                  items={items2}
                  title="Select Department"
                  selected={Dep}
                  setSelected={SetDep}
                />
              </View>
            </>

            {isLogin && (
              <>
                <View>
                  <InputField
                    title="Username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChangeText={(text) => handleInputChange("username", text)}
                    style={styles.input}
                    titleStyle={styles.fontSize}
                  />
                </View>
                <View>
                  <InputField
                    title="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    style={styles.input}
                    titleStyle={styles.fontSize}
                    secureTextEntry
                  />
                </View>
              </>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                // !validateForm() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              // disabled={!validateForm()}
            >
              <Text style={styles.addText}>
                {isLogin ? "Login" : !create ? "Send Reminder" : "Add Client"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateUserModal;
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from "react-native";
// import { styles } from "./styles";
// import { icons } from "../../../Resources";
// import InputField from "../../InputField/InputField";

// interface ClientData {
//   key?: string; // Document ID
//   email?: string;
//   phone_number?: string;
//   company_name?: string;
//   contact_person_name?: string;
// }

// interface ClientModalProps {
//   visible: boolean;
//   create?: boolean;
//   desc?: boolean;
//   invoice?: boolean;
//   styleContainer?: any;
//   title: string;
//   onClose: () => void;
//   onSubmit?: (
//     companyName?: string,
//     email?: string,
//     contactPerson?: string,
//     phoneNumber?: string,
//     documentId?: string
//   ) => void;
//   First?: string;
//   Firstchild?: string;
//   Second?: string;
//   Third?: string;
//   Fourth?: string;
//   Fifth?: string;
//   Sixth?: string;
//   seventh?: string;
//   eigth?: string;
//   ninth?: string;
//   desctext?: string;
//   user?: boolean;
//   modalContainerprop?: any;
//   Data?: {
//     data?: ClientData;
//   };
//   // Data:any,
//   deleteD?: boolean;
//   update?: boolean;
//   onPressUpdatefunction?: (
//     companyName: string,
//     email: string,
//     contactPerson: string,
//     phoneNumber: string,
//     documentId: string
//   ) => void;
//   onDeleteFunction?: (documentId: string) => void;
// }

// const CreateModal: React.FC<ClientModalProps> = ({
//   visible,
//   onPressUpdatefunction,
//   onDeleteFunction,
//   Data,
//   user,
//   onClose,
//   create = false,
//   deleteD = false,
//   update = true,
//   onSubmit,
//   title,
//   desc = false,
//   invoice = false,
//   styleContainer,
//   First,
//   desctext,
//   Firstchild,
//   Second,
//   Third,
//   Fourth,
//   Fifth,
//   Sixth,
//   seventh,
//   eigth,
//   ninth,
//   modalContainerprop,
// }) => {
//   // Initialize form state with proper typing

//   const [formData, setFormData] = useState<{
//     email: string;
//     phoneNumber: string;
//     companyName: string;
//     contactPersonName: string;
//     documentId?: string;
//   }>({
//     email: "",
//     phoneNumber: "",
//     companyName: "",
//     contactPersonName: "",
//     documentId: '',
//   });

//   // Update form data when Data prop changes
//   useEffect(() => {
//     if (Data) {
//       setFormData({
//         email: Data?.data?.email || "",
//         phoneNumber: Data?.data?.phone_number || "",
//         companyName: Data?.data?.company_name || "",
//         contactPersonName: Data?.data?.contact_person_name || "",
//         documentId: Data?.key,
//       });
//     } else {
//       // Reset form when creating new client
//       setFormData({
//         email: "",
//         phoneNumber: "",
//         companyName: "",
//         contactPersonName: "",
//         documentId: '',
//       });
//     }
//   }, [Data]);

//   const handleInputChange = (field: keyof typeof formData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const validateForm = (): boolean => {
//     if (create || update) {
//       return (
//         formData.contactPersonName.trim() !== "" &&
//         formData.email.trim() !== "" &&
//         formData.phoneNumber.trim() !== "" &&
//         formData.companyName.trim() !== ""
//       );
//     }
//     return true;
//   };

//   const handleSubmit = () => {

//       // onSubmit(
//       //   formData.companyName,
//       //   formData.email,
//       //   formData.contactPersonName,
//       //   formData.phoneNumber
//       // );

//     else if (update && onPressUpdatefunction && formData?.documentId?.key) {
//       console.log('//////////////////////')
//       onPressUpdatefunction(
//         formData.companyName,
//         formData.email,
//         formData.contactPersonName,
//         formData.phoneNumber,
//         formData?.documentId?.key
//       );
//     } else if (deleteD && onDeleteFunction && formData.documentId) {
//       // For deletion
//       onDeleteFunction(formData.documentId);
//     } else if (onSubmit) {
//       // For other operations
//       onSubmit();
//     }
//   };

//   const getButtonText = (): string => {
//     if (deleteD) return "Delete Client";
//     if (update) return "Update Client";
//     if (create) return "Add Client";
//     if (invoice) return "Send Invoice";
//     return "Send Reminder";
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.modalOverlay}>
//         <View style={[styles.modalContainer, modalContainerprop]}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View>
//               {create && (
//                 <>
//                   <Image
//                     source={icons.modalIconOtp}
//                     style={{ width: 60, height: 60 }}
//                   />
//                   <Text style={styles.title}>{title}</Text>
//                 </>
//               )}

//               {!create && !invoice && (
//                 <Text style={styles.title}>Send Payment Reminder</Text>
//               )}

//               {desc && <Text style={styles.subtitle}>{desctext}</Text>}
//             </View>

//             {First && (
//               <View style={[styleContainer]}>
//                 <InputField
//                   title={First}
//                   placeholder={First}
//                   value={formData.contactPersonName}
//                   onChangeText={(text) =>
//                     handleInputChange("contactPersonName", text)
//                   }
//                   style={styles.input}
//                   titleStyle={styles.fontSize}
//                 />
//                 {Firstchild && (
//                   <View style={{ marginLeft: 7 }}>
//                     <InputField
//                       title={Firstchild}
//                       placeholder={Firstchild}
//                       style={styles.input}
//                       titleStyle={styles.fontSize}
//                     />
//                   </View>
//                 )}
//               </View>
//             )}

//             {Second && (
//               <View>
//                 <InputField
//                   title={Second}
//                   placeholder={Second}
//                   value={formData.email}
//                   onChangeText={(text) => handleInputChange("email", text)}
//                   titleStyle={styles.fontSize}
//                   style={styles.input}
//                   keyboardType="email-address"
//                 />
//               </View>
//             )}

//             {Third && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={Third}
//                   value={formData.phoneNumber}
//                   onChangeText={(text) =>
//                     handleInputChange("phoneNumber", text)
//                   }
//                   placeholder={Third}
//                   style={styles.input}
//                   keyboardType="phone-pad"
//                 />
//               </View>
//             )}

//             {Fourth && (create || update) && !invoice && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={Fourth}
//                   value={formData.companyName}
//                   onChangeText={(text) =>
//                     handleInputChange("companyName", text)
//                   }
//                   placeholder={Fourth}
//                   style={styles.input}
//                 />
//               </View>
//             )}

//             {Fifth && !create && !update && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={Fifth}
//                   placeholder={Fifth}
//                   style={styles.input}
//                 />
//               </View>
//             )}

//             {Sixth && invoice && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={Sixth}
//                   placeholder={Sixth}
//                   style={styles.input}
//                 />
//               </View>
//             )}

//             {seventh && !create && !update && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={seventh}
//                   placeholder={seventh}
//                   style={styles.inputNote}
//                   multiline
//                 />
//               </View>
//             )}

//             {eigth && !create && !update && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   placeholder={eigth}
//                   title={eigth}
//                   style={styles.input}
//                 />
//               </View>
//             )}

//             {ninth && !user && (create || update) && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   placeholder={ninth}
//                   title={ninth}
//                   style={styles.input}
//                 />
//               </View>
//             )}
//           </ScrollView>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.addButton,
//                 (create || update) && !validateForm() && styles.disabledButton,
//               ]}
//               onPress={handleSubmit}
//               disabled={(create || update) && !validateForm()}
//             >
//               <Text style={styles.addText}>{getButtonText()}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default CreateModal;
