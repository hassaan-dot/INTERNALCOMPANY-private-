import React from "react";
import { View } from "react-native";
import InputField from "../InputField/InputField";
import helpers from "../../utils/helpers";
import { ButtonRow } from "../CncelAddButtons/component";
import styles from "./styles";
interface Props {
  onPress: () => void;
}

const POForm: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Reference Name"
            title="PO Name"
            style={styles.input1}
          ></InputField>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Contact Name"
            title="Company Name"
            style={styles.input1}
          ></InputField>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Contact Name"
            title="Contact Name"
            style={styles.input1}
          ></InputField>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Name"
            title="Email Address"
            style={styles.input1}
          ></InputField>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="+923174431419"
            title="Phone Number"
            style={styles.input1}
          ></InputField>
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Enter Address"
            title="Address"
            style={styles.input1}
          ></InputField>
        </View>
      </View>
      <View style={[{ marginRight: helpers.normalize(21) }]}>
        <InputField
          inputStyle={styles.input}
          title="Add notes"
          placeholder={"Add your notes"}
        ></InputField>
      </View>
      <View style={styles.buttonRow}>
        <ButtonRow onAdd={onPress}></ButtonRow>
      </View>
    </View>
  );
};

export default POForm;
