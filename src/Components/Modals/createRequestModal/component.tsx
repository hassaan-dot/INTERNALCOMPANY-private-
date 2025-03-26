import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGetUser } from "@/hooks/useUser";
import { UserStore } from "@/src/Screens/UserManagement/usershook";
import { useModalStore } from "@/store/useModalStore";
import { CustomDropdownIndicator, MultiSelectDropdown } from "../..";
import { icons } from "../../../Resources";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";

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
}

const CreateModal: React.FC<ClientModalProps> = ({
  visible,
  user,
  onClose,
  create = false,
  deleteD = false,
  onSubmit,
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
}) => {
  const { rowData } = useModalStore();
  const { UserData, setUserData } = UserStore();
  const { data: UserApi, isPending, error } = useGetUser();

  type Item = {
    value: string;
    label: any;
  };

  const items: Item[] = [
    { value: "Priority", label: "Priority" },
    { value: "Normal", label: "Normal" },
  ];

  const [value, setValue] = useState<string>("");

  const [selectedUsers, setSelectedUsers] = useState([]);

  // const handleSubmit = (formData: any) => {
  //   if (rowData?.isEdit) onPressUpdatefunction(formData);
  //   else onPressAddfunction(formData);
  // };

  const [formData, setFormData] = useState(
    rowData ?? {
      title: "",
      description: "",
      perform_on: "2025-09-25T02:14:37.074Z",
      standing: "",
      users: [],
    }
  );
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      users: selectedUsers ? selectedUsers : rowData.users,
    }));
  }, [selectedUsers]); // Runs whenever selectedUsers changes

  // Now, just modify selectedUsers, and formData.users updates automatically

  const handleSelectUser = (value: string[]) => {
    console.log("selected", value);
    // setFormData((prev) => ({
    //   ...prev,
    //   users: [...prev.users, value],
    // }));
  };

  const handleSubmit = () => {
    // console.log("here it is", formData);
    onSubmit(formData);

    // );
  };
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const transformUsersToDropdownItems = (users: any[]) => {
    return (
      users?.map((user) => ({
        value: `${user?.first_name} ${user?.last_name}`,
        key: user?.id,
        original: user,
      })) || []
    );
  };
  // console.log()
  const userDropdownItems = transformUsersToDropdownItems(UserApi);

  const validateForm = () => {
    // if (create) {
    //   return (
    //     formData.contact_person_name.trim() !== "" &&
    //     formData.email.trim() !== "" &&
    //     formData.phone_number.trim() !== "" &&
    //     formData.company_name.trim() !== ""
    //   );
    // }
    return true;
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {create && (
                <>
                  <Image source={icons.modalIconOtp} style={styles.modalIcon} />
                  <Text style={styles.title}>Create Request</Text>
                </>
              )}

              {!create && (
                <Text style={styles.title}>Send Payment Reminder</Text>
              )}

              {desc && (
                <Text style={styles.subtitle}>
                  {"Add your new request as new details"}
                </Text>
              )}
            </View>

            <View style={{}}>
              <InputField
                title={"Title"}
                placeholder={"Enter title"}
                value={formData.title}
                onChangeText={(text) => handleInputChange("title", text)}
                titleStyle={styles.fontSize}
                style={[styles.input, { paddingVertical: 8 }]}
              />
            </View>

            <View>
              <InputField
                titleStyle={styles.fontSize}
                title={"description"}
                multiline={formData?.description?.length > 50}
                value={formData.description}
                onChangeText={(text) => handleInputChange("description", text)}
                placeholder={"Request Description"}
                style={[styles.input, { paddingVertical: 8 }]}
              />
            </View>

            <View>
              <CustomDropdownIndicator
                title={"Role"}
                Role={value}
                SetRole={(val) => handleInputChange("standing", val)}
                items={items}
              ></CustomDropdownIndicator>
            </View>

            <View>
              <MultiSelectDropdown
                title="Select Users"
                items={userDropdownItems}
                selectedItems={selectedUsers}
                setSelectedItems={setSelectedUsers}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                !validateForm() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              // disabled={!validateForm()}
            >
              <Text style={styles.addText}>
                {create
                  ? rowData?.isEdit
                    ? "Update Client"
                    : "Add Client"
                  : "Update Client"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;

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
