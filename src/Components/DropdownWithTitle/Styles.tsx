// import { StyleSheet } from "react-native";
// import helpers from "../../utils/helpers";
// import { MontserratRegular, PoppinsRegular } from "../../Resources/fonts";
// import { StylesConfig } from "react-select"; // Use react-select for web picker
// interface Item {
//   label: string;
//   value: string;
// }
// export const customStyles: StylesConfig<Item, false> = {
//   container: (provided) => ({
//     ...provided,
//   }),
//   control: (provided, state) => ({
//     ...provided,
//     backgroundColor: "#F5F5F5",
//     borderColor: state.isFocused ? "#F5F5F5" : "#ccc",
//     borderWidth: state.isFocused ? 0 : 0,
//     padding: 2,
//   }),
//   placeholder: (provided, state) => ({
//     ...provided,
//     borderWidth: 0,
//     borderColor: state.isFocused ? "#F5F5F5" : "#ccc",
//     color: "#2C2C2D",
//     fontFamily: PoppinsRegular,
//     fontSize: helpers.normalize(9),

//     fontWeight:'300',
//     borderRadius:8,
//     fontFaimily:MontserratRegular
//   }),
//   valueContainer: (provided) => ({
//     ...provided,
//     borderWidth: 0,
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: "#333",
//     fontSize:helpers.normalize (10),
//     fontFamily: PoppinsRegular,
//     borderWidth: 0,
//     backgroundColor: "#F5F5F5",
//   }),
//   input: (provided) => ({
//     ...provided,
//     borderWidth: 0,
//   }),
//   indicatorsContainer: (provided) => ({
//     ...provided,
//     color: "#F5F5F5",
//   }),
//   dropdownIndicator: (provided, state) => ({
//     ...provided,
//     transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
//     transition: "transform 0.2s",
//     color: "#F5F5F5",
//   }),
//   indicatorSeparator: () => ({
//     display: "none",
//   }),
//   menu: (provided) => ({
//     ...provided,
//     marginTop: 2,
//     borderRadius: 8,
//     borderWidth: 0,
//     zIndex: 9999999,
//   }),
//   menuList: (provided) => ({
//     ...provided,
//     backgroundColor: "#F5F5F5",
//     zIndex: 9999999,
//     fontSize:5,
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     borderWidth: 0,
//     backgroundColor: "#F5F5F5",
//     zIndex: 9999999999999,
//     color: state.isFocused ? "black" : "black",
//     // padding: 10,
//     fontSize: helpers.normalize(14),
//     fontFamily: PoppinsRegular,
//     borderRadius: 20,

//   }),
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: helpers.normalize(0),
//     paddingTop:helpers.normalize(0),
//     borderRadius: helpers.normalize(8),
//     backgroundColor: "#F5F5F5",
//     zIndex: 999999,
//     flex:1

//   },
//   custom:{flexDirection:'row',alignItems:'center'},

//   iconBottom: {
//     bottom: helpers.normalize(7),
//   },
//   iconTop: {},
//   title: {
//     fontSize: helpers.normalize(16),
//     color: "#979797",
//     fontFamily: MontserratRegular,
//     paddingHorizontal: helpers.normalize(10),
//   },
//   placeholderStyle: {
//     color: "red",
//     fontFamily: MontserratRegular,
//     fontSize: helpers.normalize(16),
//   },

//   dropDownPickerStyle: {
//     backgroundColor: "#F5F5F5",
//     borderWidth: 1, // Remove border of the dropdown button
//     borderRadius: helpers.normalize(8),
//   },

//   dropDownContainerStyle: {
//     backgroundColor: "#F5F5F5",
//     zIndex: 999999,
//     borderWidth: 0, // Remove border of the dropdown container
//     borderRadius: helpers.normalize(8),

//   },
//   arrowIconStyle: {
//     width: 20,
//     height: 20,
//     marginLeft:20,
//     // right: helpers.normalize(-8),
//     // top: helpers.normalize(-8),
//   },
// });
// export default styles;
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
    fontFamily: PoppinsRegular,
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
export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: "auto",
    width: "100%",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#333",
    margin: 0,
    padding: 0,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#999",
    fontSize: 14,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#333",
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 9999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#f0f0f0" : "white",
    color: "#333",
    padding: 10,
    fontSize: 14,
    ":active": {
      backgroundColor: "#f5f5f5",
    },
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};
