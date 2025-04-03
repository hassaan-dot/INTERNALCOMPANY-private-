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
  onClose: () => void;
  title: any;
  Activate: any;
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
  const PO_STATUS = [
    { key: "SALESPERSON", value: "Salesperson" },
    { key: "PURCHASING_DEPARTMENT", value: "Purchasing Department" },
    { key: "OPERATION_DEPARTMENT", value: "Operation Department" },
    { key: "WAREHOUSE_DEPARTMENT", value: "Warehouse Department" },
    { key: "PLACED_FOR_COLLECTION", value: "Placed For Collection" },
    { key: "READY_TO_SHIP", value: "Ready To Ship" },
    { key: "DELIVERY", value: "Delivery" },
  ];

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
            value={news}
            onChangeText={setNews}
          />
          <View style={styles.chipContainer}>
            {PO_STATUS.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.chip,
                  selectedCategories.includes(category.value)
                    ? styles.chipSelected
                    : styles.chipUnselected,
                ]}
                onPress={() => toggleCategory(category.key)}
              >
                <Text style={styles.chipText}>{category.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={onClose}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NewsModal;
