import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet, View, Text } from "react-native";
import React from "react";

const SingleSelectDropDown = () => {
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "Option 1" },
    { key: "2", value: "Option 2" },
    { key: "3", value: "Option 3" },
    { key: "4", value: "Option 4" },
    { key: "5", value: "Option 5" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an option</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={styles.boxStyles}
        inputStyles={styles.inputStyles}
        dropdownStyles={styles.dropdownStyles}
        dropdownItemStyles={styles.dropdownItemStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        placeholder="Select option"
        searchPlaceholder="Search..."
        notFoundText="No options found"
        defaultOption={{ key: "1", value: "Option 1" }} // Default selected option
      />
      {selected ? (
        <Text style={styles.selectedText}>Selected: {selected}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4a4a",
    marginBottom: 8,
  },
  boxStyles: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputStyles: {
    fontSize: 16,
    color: "#333",
  },
  dropdownStyles: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
