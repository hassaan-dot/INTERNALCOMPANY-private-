import { PoppinsRegular } from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // marginBottom: 20, // Space between form fields
    // width: '100%', // Take full width of parent
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 4,
    marginLeft: 5,
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
export const customStyles = {
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
    color: "#07504b",
    fontSize: 14,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#000",
    fontWeight: "500",
    fontSize: 14,
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
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
    width: "100%",
    // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 9999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#fff" : "white",
    color: "#333",
    padding: 10,
    fontSize: 14,
    ":active": {
      backgroundColor: "#fff",
    },
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};
