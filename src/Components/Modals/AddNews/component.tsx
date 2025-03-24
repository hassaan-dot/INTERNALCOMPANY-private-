import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { styles } from "./styles";

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
  onClose :() => void;
  title: any;
  Activate:any
  // OnCancel :() => void;
}

const NewsModal: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,

  // OnCancel,
  
  title = "News",
}) => {
  const [news, setNews] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // const handleSend = () => {
  //   OnCancel
  // };

  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={onClose}
    >
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
            value={news}
            onChangeText={setNews}
          />
          <View style={styles.chipContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.chip,
                  selectedCategories.includes(category)
                    ? styles.chipSelected
                    : styles.chipUnselected,
                ]}
                onPress={() => toggleCategory(category)}
              >
                <Text style={styles.chipText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.sendButton} 
          onPress={onClose}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    </Modal>
  );
};

export default NewsModal;
