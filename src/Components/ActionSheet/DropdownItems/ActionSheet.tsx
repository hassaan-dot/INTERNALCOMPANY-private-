import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FontAwesome6, Entypo } from "@expo/vector-icons";
import style from "./style";

interface Option {
  name: string;
  status: "completed" | "pending";
}

interface ActionSheetProps {
  options: Option[];
  buttonText: string;
  dragHandlePress?: () => void;
  onButtonPress?: () => void;
  Visible?: boolean;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  options = [
    { name: "Salesman", status: "completed" },
    { name: "Postman", status: "completed" },
    { name: "Driver", status: "completed" },
    { name: "Technician", status: "completed" },
    { name: "Manager", status: "completed" },
    { name: "Manager", status: "pending" },
    { name: "Manager", status: "pending" },
  ],
  buttonText,
  dragHandlePress,
  onButtonPress,
  Visible,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const styles = style.getSheet();

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const lastButtonPressed = useCallback(() => {
    if (onButtonPress) {
      onButtonPress();
    }
    hide();
  }, [onButtonPress, hide]);

  return (
    <Modal
      visible={Visible}
      transparent={true}
      animationType="slide"
      onRequestClose={hide}
    >
      <TouchableOpacity
        style={styles.overlay}
        //  onPress={dragHandlePress}
        disabled={true}
        onPress={onButtonPress}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.container2} onPress={onButtonPress}>
            <Entypo name="circle-with-cross" color="#CDCDCD" size={25} />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onButtonPress}>
              <FontAwesome6 name="arrow-left" size={23} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Confirm Amount</Text>
          </View>
          <View style={styles.container3}>
            {options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionRow,
                  {
                    backgroundColor:
                      option.status == "completed" ? "#34C759" : "#FF9500",
                  },
                ]}
              >
                <View>
                  <Text style={styles.option}>{option.name}</Text>
                </View>
                <View>
                  <Text style={styles.option}>{option.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ActionSheet;
