import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { styles } from "./styles";
import LocalStorage from "@/services/local-storage";

const categories: string[] = [
  "Everyone",
  "Management",
  "Sales",
  "Warehouse",
  "Finance",
  "Other",
];

interface NewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: any;
  Activate: any;
  onPress: () => void;

  // OnCancel :() => void;
}

const Note: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,
  onPress,

  title = "News",
}) => {
  const [news, setNews] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
