import React, { useState, useCallback } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { CheckboxField } from "../../index";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";
import { Entypo } from "@expo/vector-icons";
import { PO_STATUS, PO_STATUS_LIST } from "@/constants/po_status";
import { useLocalSearchParams } from "expo-router";
import { usePOActions } from "@/hooks/usePoActions";
import { ActivityIndicator } from "react-native";

interface NewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  current_status: PO_STATUS;
}

const StatusModal: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,
  current_status,
  title = "News",
}) => {
  const [selected, setSelected] = useState<PO_STATUS>(current_status);

  const handleChange = useCallback(
    (value: PO_STATUS) => {
      setSelected(value);
    },
    [setSelected]
  );

  const { id } = useLocalSearchParams();

  const { handleChangeStatus, isChangingStatus } = usePOActions(id as string);

  const handleSubmit = () => {
    const data = {
      po_status: selected,
    };
    handleChangeStatus(data);
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
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={onClose}>
              <Entypo
                name="circle-with-cross"
                size={25}
                style={{ right: -10 }}
                color="red"
              ></Entypo>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{title}</Text>

          <View>
            {PO_STATUS_LIST?.map((category) => (
              <CheckboxField
                text={category}
                onSelect={handleChange}
                selected={selected}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSubmit}
            disabled={isChangingStatus}
          >
            <Text style={styles.sendText}>
              {isChangingStatus ? <ActivityIndicator /> : "Add status"}
            </Text>
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
    width: "28%",
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
