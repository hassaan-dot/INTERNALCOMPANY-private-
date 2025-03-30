import React, { Dispatch, SetStateAction } from "react";
import { View, Text } from "react-native";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { styles } from "./styles";
import { PoppinsRegular } from "@/constants/fonts";

interface MultiSelectDropdownProps {
  items: { key: string; value: string }[];
  placeholder: string;
  selectedItems: any[];
  setSelectedItems: Dispatch<SetStateAction<any[]>>;
  title: string;
  error?: any;
  defaultSelectedItems?: any[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  items,
  placeholder,
  selectedItems,
  setSelectedItems,
  title,
  error,
  defaultSelectedItems,
}) => {
  console.log("default", defaultSelectedItems);
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            // marginBottom: 4,
            fontFamily: PoppinsRegular,
          }}
        >
          {title}
        </Text>
      </View>
      <MultipleSelectList
        defaultOptions={defaultSelectedItems}
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
      />
      {error && <Text style={{ color: "red", marginTop: -6 }}>{error}</Text>}
    </View>
  );
};

export default MultiSelectDropdown;
