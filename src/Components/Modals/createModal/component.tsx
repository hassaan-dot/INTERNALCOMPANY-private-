import { useModalStore } from "@/store/useModalStore";
import React, { useState } from "react";
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
  const [formData, setFormData] = useState(
    rowData ?? {
      email: "",
      contact_person_name: "",
      company_name: "",
      phone_number: "",
    }
  );
  console.log("rawig", rowData);
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const validateForm = () => {
    if (create) {
      // Basic validation for create client form
      return (
        formData.contact_person_name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone_number.trim() !== "" &&
        formData.company_name.trim() !== ""
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
                  <Text style={styles.title}>
                    {rowData?.isEdit ? "Update" : "Create"} Client
                  </Text>
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
                  value={formData.contact_person_name}
                  onChangeText={(text) =>
                    handleInputChange("contact_person_name", text)
                  }
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
                  onChangeText={(text) => handleInputChange("email", text)}
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
                  value={formData.phone_number}
                  onChangeText={(text) =>
                    handleInputChange("phone_number", text)
                  }
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
                  value={formData.company_name}
                  onChangeText={(text) =>
                    handleInputChange("company_name", text)
                  }
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
              style={[
                styles.addButton,
                !validateForm() && styles.disabledButton,
              ]}
              onPress={() => handleSubmit()}
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
