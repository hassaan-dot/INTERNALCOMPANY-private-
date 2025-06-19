import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import {
  StyleSheet,
  View,
  Text,
  I18nManager,
  StyleProp,
  ViewStyle,
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
  items = [],
  error = false,
  selected = "",
  setSelected,
  errorMessage,
  title,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!!title && <Text style={styles.label}>{title}</Text>}
      <SelectList
        setSelected={setSelected}
        data={items}
        save="key"
        defaultOption={items?.find((i) => i.key === selected) || undefined}
        boxStyles={styles.boxStyles}
        inputStyles={styles.inputStyles}
        dropdownStyles={styles.dropdownStyles}
        dropdownItemStyles={styles.dropdownItemStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        placeholder={title || "اختر"}
        notFoundText="لا يوجد نتائج"
      />
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 8,
    color: "#333",
    fontFamily: PoppinsRegular,
    // textAlign: I18nManager.isRTL ? "right" : "left",
  },
  boxStyles: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  inputStyles: {
    fontSize: 14,
    fontFamily: PoppinsRegular,
    color: "#1D1D1D",
    // textAlign: I18nManager.isRTL ? "right" : "left",
  },
  dropdownStyles: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 12,
    marginTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItemStyles: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
  },
  dropdownTextStyles: {
    fontSize: 14,
    color: "#333",
    // textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: PoppinsRegular,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 6,
    // textAlign: I18nManager.isRTL ? "right" : "left",
  },
});

export default SingleSelectDropDown;
