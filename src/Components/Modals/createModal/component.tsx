// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Modal,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
// } from "react-native";
// import { useForm } from "react-hook-form";
// import { styles } from "./styles";
// import { icons, string } from "../../../Resources";
// import InputField from "../../InputField/InputField";
// interface ClientModalProps {
//   visible: boolean;
//   create?: boolean;
//   desc?: boolean;
//   invoice: boolean;
//   styleContainer: any;
//   title: string;

//   onClose: () => void;
//   // onSubmit: (data: ClientFormData) => void;
//   onSubmit: any;
//   First: string;
//   Firstchild: string;
//   Second: string;
//   Third: string;
//   Fourth: string;
//   Fifth: string;
//   Sixth: string;
//   seventh: string;
//   eigth: string;
//   ninth: string;
//   desctext: string;
//   user: boolean;
//   modalContainerprop: any;
//   Data:any
// }

// interface ClientFormData {
//   contactPerson: string;
//   email: string;
//   phone: string;
//   companyName: string;
// }

// const CreateModal: React.FC<ClientModalProps> = ({
//   visible,
//   Data,
//   user,
//   onClose,
//   create = false,
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
//   // console.log(Da)
//   const [email, setEmail] = useState(Data?.data?.company_name)
//   const [phonenumber, setPhonenumber] = useState(Data?.data?.phone_number);
//   const [companyname, setCompanyname] = useState(Data?.data?.company_name);
//   const [contactpersonname, setContactpersonname] = useState(Data?.data?.contact_person_name);
//   console.log('hello11122,',email,phonenumber,Data.data.company_name)

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
//                   ></Image>
//                   <Text style={styles.title}>{title}</Text>
//                 </>
//               )}

//               {!create && (
//                 <Text style={styles.title}>Send Payment Reminder</Text>
//               )}

//               {desc && <Text style={styles.subtitle}>{desctext}</Text>}
//             </View>
//             {First && (
//               <View style={[styleContainer]}>
//                 <InputField
//                   title={First}
//                   placeholder={First}
//                   value={contactpersonname}
//                   onChangeText={(text) => {
//                     setContactpersonname(text);
//                   }}
//                   style={styles.input}
//                   titleStyle={styles.fontSize}
//                 ></InputField>
//                 {Firstchild && (
//                   <View style={{ marginLeft: 7 }}>
//                     <InputField
//                       title={Firstchild}
//                       placeholder={Firstchild}
//                       style={styles.input}
//                       titleStyle={styles.fontSize}
//                     ></InputField>
//                   </View>
//                 )}
//               </View>
//             )}

//             {Second && (
//               <View>
//                 <InputField
//                   title={Second}
//                   placeholder={Second}
//                   value={ email}
//                   onChangeText={(text) => {
//                     setEmail(text);
//                   }}
//                   titleStyle={styles.fontSize}
//                   style={styles.input}
//                 ></InputField>
//               </View>
//             )}

//             {Third && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={Third}
//                   value={phonenumber}
//                   onChangeText={(text) => {
//                     setPhonenumber(text);
//                   }}
//                   placeholder={Third}
//                   style={styles.input}
//                 ></InputField>
//               </View>
//             )}

//             {Fourth && create && !invoice && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={Fourth}
//                   value={companyname}
//                   onChangeText={(text) => {
//                     setCompanyname(text);
//                   }}
//                   placeholder={Fourth}
//                   style={styles.input}
//                 ></InputField>
//               </View>
//             )}
//             {(Fifth && !create) ||
//               (invoice && (
//                 <View>
//                   <InputField
//                     titleStyle={styles.fontSize}
//                     title={Fifth}
//                     placeholder={Fifth}
//                     style={styles.input}
//                   ></InputField>
//                 </View>
//               ))}
//             {Sixth && invoice && (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   title={Sixth}
//                   placeholder={Sixth}
//                   style={styles.input}
//                 ></InputField>
//               </View>
//             )}

//             {(seventh && !create) ||
//               (invoice && (
//                 <View>
//                   <InputField
//                     titleStyle={styles.fontSize}
//                     title={seventh}
//                     placeholder={seventh}
//                     style={styles.inputNote}
//                   ></InputField>
//                 </View>
//               ))}
//             {(eigth && !create) ||
//               (invoice && (
//                 <View>
//                   <InputField
//                     titleStyle={styles.fontSize}
//                     placeholder={eigth}
//                     title={eigth}
//                     style={styles.input}
//                   ></InputField>
//                 </View>
//               ))}
//             {(!user && create) || (
//               <View>
//                 <InputField
//                   titleStyle={styles.fontSize}
//                   placeholder={ninth}
//                   title={ninth}
//                   style={styles.input}
//                 ></InputField>
//               </View>
//             )}
//           </ScrollView>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.addButton}
//               // onPress={handleSubmit(handleFormSubmit)}
//               onPress={()=>onSubmit(companyname,email,contactpersonname,phonenumber)}
//             >
//               <Text style={styles.addText}>
//                 {!create ? "Send Reminder" : "Add Client"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default CreateModal;
import React, { useState, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { styles } from "./styles";
import { icons, string } from "../../../Resources";
import InputField from "../../InputField/InputField";

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
  deleteD:boolean;
  update:boolean,
  onPressUpdatefunction:any
}

const CreateModal: React.FC<ClientModalProps> = ({
  visible,
  onPressUpdatefunction,
  Data,
  user,
  onClose,
  create = false,
  deleteD=false,
  update=false,
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
  // Initialize state with default values or data from props
  const [formData, setFormData] = useState({
    email: Data?.data?.email || "",
    phoneNumber: Data?.data?.phone_number || "",
    companyName: Data?.data?.company_name || "",
    contactPersonName: Data?.data?.contact_person_name || "",
  });
  {console.log('from',formData)}


  // Update form data when Data prop changes
  useEffect(() => {
    if (Data) {
      setFormData({
        email: Data?.data?.email || "",
        phoneNumber: Data?.data?.phone_number || "",
        companyName: Data?.data?.company_name || "",
        contactPersonName: Data?.data?.contact_person_name || "",
      });
    }
  }, [Data]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (create) {
      // For create client form
      onSubmit(
        formData.companyName,
        formData.email,
        formData.contactPersonName,
        formData.phoneNumber
      );
    } else if (invoice) {
      // For invoice related forms
      // You might need to adjust this based on your actual requirements
      onSubmit();
    } else {
      // For other forms like payment reminder
      onSubmit();
    }
  };

  const validateForm = () => {
    if (create) {
      // Basic validation for create client form
      return (
        formData.contactPersonName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phoneNumber.trim() !== "" &&
        formData.companyName.trim() !== ""
      );
    }
    // Add other validation logic for different forms if needed
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
                  <Image
                    source={icons.modalIconOtp}
                    style={{ width: 60, height: 60 }}
                  />
                  <Text style={styles.title}>{title}</Text>
                </>
              )}

              {!create && (
                <Text style={styles.title}>Send Payment Reminder</Text>
              )}

              {desc && <Text style={styles.subtitle}>{desctext}</Text>}
            </View>

            {First && (
              <View style={[styleContainer]}>
                <InputField
                  title={First}
                  placeholder={First}
                  value={formData.contactPersonName}
                  onChangeText={(text) => handleInputChange('contactPersonName', text)}
                  style={styles.input}
                  titleStyle={styles.fontSize}
                />
                {Firstchild && (
                  <View style={{ marginLeft: 7 }}>
                    <InputField
                      title={Firstchild}
                      placeholder={Firstchild}
                      style={styles.input}
                      titleStyle={styles.fontSize}
                    />
                  </View>
                )}
              </View>
            )}

            {Second && (
              <View>
                <InputField
                  title={Second}
                  placeholder={Second}
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  titleStyle={styles.fontSize}
                  style={styles.input}
                  keyboardType="email-address"
                />
              </View>
            )}

            {Third && (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  title={Third}
                  value={formData.phoneNumber}
                  onChangeText={(text) => handleInputChange('phoneNumber', text)}
                  placeholder={Third}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
              </View>
            )}

            {Fourth && create && !invoice && (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  title={Fourth}
                  value={formData.companyName}
                  onChangeText={(text) => handleInputChange('companyName', text)}
                  placeholder={Fourth}
                  style={styles.input}
                />
              </View>
            )}

            {(Fifth && !create) ||
              (invoice && (
                <View>
                  <InputField
                    titleStyle={styles.fontSize}
                    title={Fifth}
                    placeholder={Fifth}
                    style={styles.input}
                  />
                </View>
              ))}

            {Sixth && invoice && (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  title={Sixth}
                  placeholder={Sixth}
                  style={styles.input}
                />
              </View>
            )}

            {(seventh && !create) ||
              (invoice && (
                <View>
                  <InputField
                    titleStyle={styles.fontSize}
                    title={seventh}
                    placeholder={seventh}
                    style={styles.inputNote}
                    multiline
                  />
                </View>
              ))}

            {(eigth && !create) ||
              (invoice && (
                <View>
                  <InputField
                    titleStyle={styles.fontSize}
                    placeholder={eigth}
                    title={eigth}
                    style={styles.input}
                  />
                </View>
              ))}

            {(!user && create) || (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  placeholder={ninth}
                  title={ninth}
                  style={styles.input}
                />
              </View>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, !validateForm() && styles.disabledButton]}
              onPress={()=>onPressUpdatefunction(formData.companyName,formData.email,formData.contactPersonName,formData.phoneNumber,create,deleteD,update)}
                // onSubmit(formData.companyName,formData.email,formData.contactPersonName,formData.phoneNumber,create,deleteD,update)}
// disabled={!validateForm()}
            >
              <Text style={styles.addText}>
                {!create ? "Send Reminder" :   "Add Client"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;