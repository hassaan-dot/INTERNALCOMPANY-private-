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
import { DateTimeSelector } from "../..";
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
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date_of_payment: date ? date : rowData?.date_of_payment,
    }));
  }, [date]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const validateForm = () => {
    if (create) {
      return (
        formData.contact_person_name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone_number.trim() !== "" &&
        formData.company_name.trim() !== ""
      );
    }
    return true;
  };
  console.log("invoice paid", formData);
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
                value={formData.contact_person_name}
                onChangeText={(text) => handleInputChange("payer", text)}
                style={styles.input}
                titleStyle={styles.fontSize}
              />
            </View>

            <View>
              <InputField
                title={"Payment Method"}
                placeholder={"Select Method"}
                value={formData.email}
                onChangeText={(text) =>
                  handleInputChange("payment_method", text)
                }
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
            <View>
              <InputField
                title={"Amount"}
                placeholder={"Enter Amount"}
                value={formData.email}
                onChangeText={(text) => handleInputChange("amount", text)}
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
            <View>
              <InputField
                title={"Payment Status"}
                placeholder={"Select Status"}
                value={formData.email}
                onChangeText={(text) =>
                  handleInputChange("payment_status", text)
                }
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
            <View>
              <DateTimeSelector
                onDateChange={(date) => setDate(date)}
              ></DateTimeSelector>
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
              onPress={() => handleSubmit()}
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
