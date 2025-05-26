import { icons } from "@/assets/icons/icons";
import { PoppinsRegular } from "@/constants/fonts";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Select, { components, SingleValue } from "react-select"; // Import SingleValue for typing
// import { customStyles, styles } from "./Styles";
import { I18nManager } from "react-native";

// Define the type for items
type Item = {
  label: string;
  value: string;
};

// const CustomDropdownIndicator = (props) => {
//   return (
//     <components.DropdownIndicator {...props}>
//       {/* <Image source={icons.Drop_Down_Icon_Down} style={styles.arrowIconStyle} /> */}
//     </components.DropdownIndicator>
//   );
// };

interface DropDownTitleViewProps {
  title: string;
  iconleft: boolean;
  containerStyle: any;
  textStyle: any;
  placeholder: string;
  items: any;
  setOption: any;
  Role: any;
}

const DropDownTitleView: React.FC<DropDownTitleViewProps> = ({
  title,
  Role,
  setOption,
  iconleft = false,
  containerStyle,
  textStyle,
  placeholder,
  items,
}) => {
  return (
    <View style={styles.container}>
      {title && (
        <View style={[{ marginLeft: 2, marginBottom: 4 }]}>
          <Text style={[textStyle]}>{title}</Text>
        </View>
      )}
      <View style={[styles.custom, containerStyle]}>
        {iconleft && (
          <Image
            source={icons.screenHeaderFilterIcon}
            style={{ width: 14, height: 14 }}
          />
        )}
        <Select
          options={items}
          styles={customStyles}
          value={Role}
          placeholder="Filters"
          onChange={(selectedOption: SingleValue<Item>) =>
            setOption(selectedOption ? selectedOption.value : "createdAt:desc")
          }
          // isSearchable={true}
          components={{
            DropdownIndicator: null,
          }}
          isSearchable={false}
          editable={false}
          menuPortalTarget={document.body} // Web-specific
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // marginBottom: 20, // Space between form fields
    // width: '100%', // Take full width of parent
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    marginLeft: 5,
    // fontFamily: PoppinsRegular,
    // fontFamily:PoppinsRegular,
    // marginBottom: 8,
  },
  custom: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android
  },
  arrowIconStyle: {
    width: 20,
    height: 20,
    tintColor: "#666",
    alignSelf: "flex-end",
    // flex:1
  },
});

// Custom styles for react-select (web)
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    // backgroundColor: "red",
    // flex: 1,
    border: "none",
    boxShadow: "none",
    minHeight: "auto",
    width: "100%",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#333",
    //dropdown
    margin: 0,
    padding: 0,
  }),
  placeholder: (provided: any) => ({
    ...provided,

    color: "#07504B",
    fontWeight: "500",
    fontSize: 15,
    fontFamily: PoppinsRegular,
    textAlign: I18nManager.isRTL ? "right" : "left",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#07504B",
    fontWeight: "500",
    fontSize: 15,
    fontFamily: PoppinsRegular,
    textAlign: I18nManager.isRTL ? "right" : "left",
  }),
  // dropdownIndicator: (provided: any) => ({
  //   ...provided,
  //   padding: 0,
  // }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    marginTop: 4,
    // borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ddd",
    // flex: 1,
    width: "180%",

    // marginRight: 100,
    right: -20,
    // left: 2,
    // position: "relative",

    // paddingHorizontal: 30,
    // backgroundColor: "red",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    // zIndex: 9999,
    direction: I18nManager.isRTL ? "rtl" : "ltr",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#fff" : "white",
    color: "#333",
    padding: 10,
    paddingHorizontal: 20,

    fontFamily: PoppinsRegular,
    fontSize: 10,
    textAlign: I18nManager.isRTL ? "right" : "left",
    ":active": {
      backgroundColor: "#fff",
    },
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};
export default DropDownTitleView;
