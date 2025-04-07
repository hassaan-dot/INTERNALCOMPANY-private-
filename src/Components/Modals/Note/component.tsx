import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";

interface NewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: any;
  Activate: any;
  onPress: () => void;
}

const Note: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,
  onPress,

  title = "News",
}) => {
  const [formData, setFormData] = useState({
    note: "",
  });
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSend = () => {
    onPress(formData);
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          //   alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
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
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your news here..."
            multiline
            value={formData.note}
            onChangeText={(text) => {
              handleInputChange("note", text);
            }}
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Note;
