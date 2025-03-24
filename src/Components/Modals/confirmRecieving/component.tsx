import React, { useState } from "react";
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
  onSubmit: (data: ClientFormData) => void;
  First: string;
  Firstchild: string;
  Second: string;
  Third: string;
  Fourth: string;
  Fifth: string;
  Sixth: string;
  seventh: string;
  eigth: string;
}

interface ClientFormData {
  contactPerson: string;
  email: string;
  phone: string;
  companyName: string;
}

const ConfirmRecieving: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  create = false,
  onSubmit,
  title,
  desc = false,
  invoice = false,
  styleContainer,
  First,
  Firstchild,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  seventh,
  eigth,
}) => {
  const { control, handleSubmit, reset } = useForm<ClientFormData>();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleChangeText = (index: number, value: string) => {
    if (value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };
  const handleFormSubmit = (data: ClientFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {create && (
                <>
                  <Image
                    source={icons.modalIconOtp}
                    style={{ width: 60, height: 60 }}
                  ></Image>
                  <Text style={styles.title}>{title}</Text>
                </>
              )}

              {!create && (
                <Text style={styles.title}>Send Payment Reminder</Text>
              )}

              {desc && (
                <Text style={styles.subtitle}>
                  Add your new client details.
                </Text>
              )}
            </View>
            {First && (
              <View style={[styleContainer]}>
                <View style={{ flex: 1 }}>
                  <InputField
                    title={First}
                    placeholder={First}
                    style={styles.input}
                    titleStyle={styles.fontSize}
                  ></InputField>
                </View>
                {Firstchild && (
                  <View style={{ marginLeft: 5 }}>
                    <InputField
                      title={Firstchild}
                      placeholder={Firstchild}
                      style={styles.input}
                      titleStyle={styles.fontSize}
                    ></InputField>
                  </View>
                )}
              </View>
            )}

            {Second && (
              <View style={{}}>
                <InputField
                  title={Second}
                  placeholder={Second}
                  titleStyle={styles.fontSize}
                  style={styles.input}
                ></InputField>
              </View>
            )}
            <View>
              <View
                style={{ marginBottom: 20, marginTop: 16, paddingRight: 50 }}
              >
                <Text style={styles.title1}>
                  Enter the OTP confirmation code from client
                </Text>
              </View>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChangeText(index, text)}
                  />
                ))}
                <TouchableOpacity>
                  <Text style={styles.resendText}>Resend Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmit(handleFormSubmit)}
            >
              <Text style={styles.addText}>
                {!create ? "Send Reminder" : "Add Client"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmRecieving;
