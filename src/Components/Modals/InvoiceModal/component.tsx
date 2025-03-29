// import { icons } from "@/assets/icons/icons";
// import { useModalStore } from "@/store/useModalStore";
// import React, { useEffect, useState } from "react";
// import {
//   Image,
//   Modal,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { DateTimeSelector, SingleSelectDropDown } from "../..";
// import InputField from "../../InputField/InputField";
// import { styles } from "./styles";

// interface ClientModalProps {
//   visible: boolean;
//   create?: boolean;
//   desc?: boolean;
//   invoice: boolean;
//   styleContainer: any;
//   title: string;
//   onClose: () => void;
//   onSubmit: (
//     companyName?: string,
//     email?: string,
//     contactPerson?: string,
//     phoneNumber?: string
//   ) => void;
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
//   Data: any;
//   deleteD: boolean;
//   update: boolean;
// }

// const InvoiceModal: React.FC<ClientModalProps> = ({
//   visible,
//   user,
//   onClose,
//   onSubmit,
//   create = false,
//   deleteD = false,
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
//   const { rowData } = useModalStore();
//   const [date, setDate] = useState<any>("");
//   type Item = {
//     value: string;
//     label: any;
//   };

//   const items: Item[] = [
//     { value: "Bank Transfer", label: "Bank Transfer" },
//     { value: "Cash", label: "Cash" },
//     { value: "Credit Card", label: "Credit Card" },
//     { value: "Others", label: "Others" },
//   ];
//   const itemsStatus: Item[] = [
//     { value: "Completed", label: "Completed" },
//     { value: "Pending", label: "Pending" },
//     { value: "Refund", label: "Refund" },
//     { value: "Others", label: "Others" },
//   ];

//   const [formData, setFormData] = useState(
//     rowData ?? {
//       date_of_payment: "",
//       payer: "",
//       amount: "",
//       payment_method: "",
//       payment_status: "",
//       purchase_order: "",
//     }
//   );
//   const handleInputChange = (field: keyof typeof formData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       date_of_payment: date ? date : rowData?.date_of_payment,
//     }));
//   }, [date]);

//   const handleSubmit = () => {
//     onSubmit(formData);
//   };

//   const validateForm = () => {
//     if (create) {
//       return (
//         formData.contact_person_name.trim() !== "" &&
//         formData.email.trim() !== "" &&
//         formData.phone_number.trim() !== "" &&
//         formData.company_name.trim() !== ""
//       );
//     }
//     return true;
//   };
//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.modalOverlay}>
//         <View style={[styles.modalContainer, modalContainerprop]}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View>
//               <Image
//                 source={icons.invoiceModalIcon}
//                 style={{ width: 40, height: 40 }}
//               />
//               <Text style={styles.title}>Add Invoice</Text>

//               {desc && <Text style={styles.subtitle}>{desctext}</Text>}
//             </View>

//             <View style={[styleContainer]}>
//               <InputField
//                 title={"Name"}
//                 placeholder={"Enter Invoice Name"}
//                 value={formData.contact_person_name}
//                 onChangeText={(text) => handleInputChange("payer", text)}
//                 style={styles.input}
//                 titleStyle={styles.fontSize}
//               />
//             </View>
//             <View style={{ marginBottom: 6 }}>
//               <InputField
//                 title={"Amount"}
//                 placeholder={"Enter Amount"}
//                 value={formData.email}
//                 onChangeText={(text) => handleInputChange("amount", text)}
//                 titleStyle={styles.fontSize}
//                 style={styles.input}
//                 keyboardType="email-address"
//               />
//             </View>
//             <View style={{ marginBottom: 6 }}>
//               <SingleSelectDropDown
//                 title="Payment Method"
//                 setSelected={(text) =>
//                   handleInputChange("payment_method", text)
//                 }
//                 items={items}
//               ></SingleSelectDropDown>
//             </View>

//             <View style={{ marginBottom: 6 }}>
//               <SingleSelectDropDown
//                 title="Payment Status"
//                 setSelected={(text) =>
//                   handleInputChange("payment_status", text)
//                 }
//                 items={itemsStatus}
//               ></SingleSelectDropDown>
//             </View>
//             <View style={{ marginBottom: 13 }}>
//               <DateTimeSelector
//                 onDateChange={(date) => setDate(date)}
//               ></DateTimeSelector>
//             </View>
//           </ScrollView>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.addButton,
//                 !validateForm() && styles.disabledButton,
//               ]}
//               onPress={() => handleSubmit()}
//             >
//               <Text style={styles.addText}>Add invoice</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default InvoiceModal;
import { icons } from "@/assets/icons/icons";
import { formatDate } from "@/src/utils";
import { useModalStore } from "@/store/useModalStore";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DateTimeSelector, SingleSelectDropDown } from "../..";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
import * as yup from "yup";

interface ClientModalProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  invoice: boolean;
  styleContainer: any;
  title: string;
  onClose: () => void;
  onSubmit: (formData: any) => void;
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

// Validation schema
const invoiceSchema = yup.object().shape({
  payer: yup
    .string()
    .required("Payer name is required")
    .min(2, "Payer name must be at least 2 characters"),
  amount: yup
    .string()
    .required("Amount is required")
    .matches(/^[0-9]+(\.[0-9]{1,2})?$/, "Amount must be a valid number"),
  payment_method: yup.string().required("Payment method is required"),
  payment_status: yup.string().required("Payment status is required"),
  date_of_payment: yup.string().required("Payment date is required"),
});

const InvoiceModal: React.FC<ClientModalProps> = ({
  visible,
  user,
  onClose,
  onSubmit,
  create = false,
  deleteD = false,
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
  const [date, setDate] = useState<any>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  type Item = {
    value: string;
    label: any;
  };

  const items: Item[] = [
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Cash", label: "Cash" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Others", label: "Others" },
  ];

  const itemsStatus: Item[] = [
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Refund", label: "Refund" },
    { value: "Others", label: "Others" },
  ];

  const [formData, setFormData] = useState(
    rowData ?? {
      date_of_payment: "",
      payer: "",
      amount: "",
      payment_method: "",
      payment_status: "",
      purchase_order: "",
    }
  );

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date_of_payment: date ? date : rowData?.date_of_payment || "",
    }));
    if (date) {
      setTouched((prev) => ({ ...prev, date_of_payment: true }));
      clearError("date_of_payment");
    }
  }, [date]);

  const validateForm = async () => {
    try {
      await invoiceSchema.validate(formData, { abortEarly: false });
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
    // Mark all fields as touched
    setTouched({
      payer: true,
      amount: true,
      payment_method: true,
      payment_status: true,
      date_of_payment: true,
    });

    const isValid = await validateForm();
    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={icons.invoiceModalIcon}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.title}>Add Invoice</Text>

              {desc && <Text style={styles.subtitle}>{desctext}</Text>}
            </View>

            <View style={[styleContainer]}>
              <InputField
                title={"Name"}
                placeholder={"Enter Invoice Name"}
                value={formData.payer}
                onChangeText={(text) => handleInputChange("payer", text)}
                onBlur={() => setTouched((prev) => ({ ...prev, payer: true }))}
                style={styles.input}
                titleStyle={styles.fontSize}
                error={touched.payer && errors.payer}
                errorMessage={touched.payer && errors.payer}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View style={{ marginBottom: 6 }}>
              <InputField
                title={"Amount"}
                placeholder={"Enter Amount"}
                value={formData.amount}
                onChangeText={(text) => handleInputChange("amount", text)}
                onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="numeric"
                error={touched.amount && errors.amount}
                errorMessage={touched.amount && errors.amount}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View style={{ marginBottom: 6 }}>
              <SingleSelectDropDown
                title="Payment Method"
                selected={formData.payment_method}
                setSelected={(text) =>
                  handleInputChange("payment_method", text)
                }
                items={items}
                error={touched.payment_method && errors.payment_method}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, payment_method: true }))
                }
              />
            </View>

            <View style={{ marginBottom: 6 }}>
              <SingleSelectDropDown
                title="Payment Status"
                selected={formData.payment_status}
                setSelected={(text) =>
                  handleInputChange("payment_status", text)
                }
                items={itemsStatus}
                error={touched.payment_status && errors.payment_status}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, payment_status: true }))
                }
              />
            </View>

            <View style={{ marginBottom: 13 }}>
              <DateTimeSelector
                onDateChange={(date) => setDate(date)}
                error={touched.date_of_payment && errors.date_of_payment}
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
                Object.keys(errors).length > 0 && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={Object.keys(errors).length > 0}
            >
              <Text style={styles.addText}>Add invoice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvoiceModal;
