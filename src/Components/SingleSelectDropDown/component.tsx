import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { PoppinsRegular } from "@/constants/fonts";

type DropDownItem = {
  key: string;
  value: string;
};

type Props = {
  items: DropDownItem[];
  selected?: string;
  setSelected: (value: string) => void;
  title?: string;
  error?: boolean;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const SingleSelectDropDown: React.FC<Props> = ({
  items,
  error = false,
  selected = "",
  setSelected,
  errorMessage,
  title,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{title}</Text>
      <SelectList
        setSelected={setSelected}
        data={items}
        save="key"
        defaultOption={selected} // Set the default option
        boxStyles={[styles.boxStyles, { borderColor: error && "red" }]}
        inputStyles={[styles.inputStyles, { color: selected && "#000000" }]}
        dropdownStyles={styles.dropdownStyles}
        dropdownItemStyles={styles.dropdownItemStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        placeholder={`${selected}` || "Select"}
        searchPlaceholder="Search..."
        placeholderTextColor=""
        notFoundText="No options found"
      />
      {/* {selected ? (
        <Text style={styles.selectedText}>Selected: {selected}</Text>
      ) : null} */}
      {error && (
        <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // width: "100%",
    // maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    color: "#000",
    fontFamily: PoppinsRegular,
  },
  boxStyles: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingLeft: 10,
    paddingVertical: 9,
  },
  inputStyles: {
    fontSize: 14,
    color: "#757575",
  },
  dropdownStyles: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    // marginTop: 8,
    backgroundColor: "white",
  },
  dropdownItemStyles: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownTextStyles: {
    fontSize: 13,
    color: "#333",
  },
  selectedText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});

export default SingleSelectDropDown;
