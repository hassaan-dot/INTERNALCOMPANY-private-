import React, { Dispatch, SetStateAction } from "react";
import { View, Text } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { styles } from "./styles";

interface MultiSelectDropdownProps {
  items: { key: string; value: string }[];
  placeholder: string;
  selectedItems: any[];
  setSelectedItems: Dispatch<SetStateAction<any[]>>;
  title: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  items,
  placeholder,
  selectedItems,
  setSelectedItems,
  title,
}) => {
  console.log("selected items :", selectedItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <MultipleSelectList
        setSelected={(val: any) => setSelectedItems(val)}
        data={items}
        save="key"
        placeholder={placeholder}
        searchPlaceholder="Search users..."
        notFoundText="No users found"
        boxStyles={styles.dropdownBox}
        inputStyles={styles.dropdownInput}
        dropdownStyles={styles.dropdownList}
        badgeStyles={styles.dropdownBadge}
        badgeTextStyles={styles.dropdownBadgeText}
        multiple={true}
        defaultOptions={items}
        selectedItems={selectedItems}
      />
    </View>
  );
};

export default MultiSelectDropdown;
