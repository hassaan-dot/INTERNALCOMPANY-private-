import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { PoppinsRegular } from "@/constants/fonts";

const SingleSelectDropDown = ({ items, selected, setSelected, title }: any) => {
  // const [selected, setSelected] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <SelectList
        setSelected={setSelected}
        data={items}
        value="key"
        save="value"
        boxStyles={styles.boxStyles}
        inputStyles={styles.inputStyles}
        dropdownStyles={styles.dropdownStyles}
        dropdownItemStyles={styles.dropdownItemStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        placeholder="Select option"
        searchPlaceholder="Search..."
        notFoundText="No options found"
        // defaultOption={{ key: "1", value: "Option 1" }} // Default selected option
      />
      {/* {selected ? (
        <Text style={styles.selectedText}>Selected: {selected}</Text>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    width: "100%",
    // maxWidth: 400,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 4,
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
    marginTop: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItemStyles: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownTextStyles: {
    fontSize: 16,
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
