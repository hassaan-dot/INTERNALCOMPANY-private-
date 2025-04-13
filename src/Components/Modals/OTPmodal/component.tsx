import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "@/assets/icons/icons";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { useModalStore } from "@/store/useModalStore";
import { useOtpLogin } from "@/hooks/useLogin";

interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ visible, onClose, onSubmit }) => {
  const { rowData } = useModalStore();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const { mutate, isPending } = useOtpLogin();

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    mutate({
      code: otp?.join()?.split(",")?.join(""),
      email: rowData?.email,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={onClose}>
              <Entypo
                name="circle-with-cross"
                size={25}
                style={{ right: -10 }}
                color="red"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <Image
              source={icons.modalIconOtp}
              style={{ width: 55, height: 55 }}
            />
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
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChangeText(index, text)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>
              {isPending ? <ActivityIndicator /> : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OTPModal;
