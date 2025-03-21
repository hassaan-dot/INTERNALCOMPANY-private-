
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { CheckboxField} from '../../index'
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

const questions = [
  "Sales Person",
  "Warehouse Department",
  "Operations Department",
  "Shopping Department",
  "Sales Person",
  "Warehouse Department",
  "Operations Department",
 
];

interface NewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

const StatusModal: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,
  title = "News",
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const toggleSelection = (question: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const handleSend = () => {
    console.log("Selected Questions:", selectedQuestions);
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <View>
            {questions.map((category) => (
              <CheckboxField
                text={category}
              
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={onClose}
          >
            <Text style={styles.sendText}>Add status</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    paddingHorizontal: 30,
    width: helpers.wp(28),
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    left: -2,
  },
  sendButton: {
    backgroundColor: "#07504B",
    padding: 10,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  sendText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: PoppinsRegular,
  },
  closeButton: {
    marginTop: 10,
  },
  closeText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default StatusModal;
