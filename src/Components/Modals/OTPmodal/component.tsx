import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "@/assets/icons/icons";
import { styles } from "./styles";
interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({
  visible,
  onClose,
  onSubmit,
}: any) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleChangeText = (index: number, value: string) => {
    if (value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={icons.modalIconOtp}
              style={{ width: 55, height: 55 }}
            ></Image>
          </View>
          <View style={{ marginBottom: 20, marginTop: 16, paddingRight: 50 }}>
            <Text style={styles.title}>
              Enter the OTP confirmation code sent to your phone
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

          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OTPModal;
