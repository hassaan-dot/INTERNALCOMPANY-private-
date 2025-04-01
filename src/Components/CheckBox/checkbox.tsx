// import React, { useState } from "react";
// import { View, TouchableOpacity, Image, Text } from "react-native";
// import styles from "./Styles";
// import { icons } from "../../Resources";
// import { PoppinsRegular } from "../../Resources/fonts";

// // Define the types for props
// interface CustomCheckboxFieldProps {
//   field: {
//     required?: boolean; // Assuming field can have a required property
//   };
//   style: any;
//   text?: string;
//   isRequired?: boolean; // Whether the field is required or not
//   isReadOnly?: boolean; // Whether the checkbox is read-only
//   bgColor?: string;
//   value?: boolean; // Whether the field is required or not

//   handleInputChange?: (
//     event: { target: { value: boolean } },
//     field?: any
//   ) => void; // Input change handler
// }

// const CustomCheckboxField: React.FC<CustomCheckboxFieldProps> = ({
//   field,
//   isRequired,
//   isReadOnly,
//   bgColor,
//   value,
//   text,
//   style,
//   handleInputChange,
// }: any) => {
//   // Managing checked state as a local state
//   const [isChecked, setIsChecked] = useState<boolean>(value || false);

//   const handleToggle = () => {
//     if (!isReadOnly && handleInputChange) {
//       const newCheckedValue = !isChecked;
//       setIsChecked(newCheckedValue); // Update the local state
//       handleInputChange({ target: { value: newCheckedValue } }, field);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.fieldContainer}>
//         <TouchableOpacity
//           onPress={handleToggle}
//           style={[
//             styles.checkbox,
//             style,
//             isChecked && styles.checked,
//             isRequired && field.required && !isChecked && styles.errorCheckbox,
//             bgColor && bgColor !== "" ? { backgroundColor: bgColor } : {},
//           ]}
//         >
//           {/* <Image
//             source={isChecked ? icons.check_Mark_Icon : icons.uncheck_Mark_Icon}
//             style={isChecked ? styles.checkbox : styles.uncheckbox}
//           /> */}
//         </TouchableOpacity>
//         <Text
//           style={{
//             marginLeft: 0,
//             color: "#000000",
//             marginBottom: 2,
//             fontWeight: "200",
//             fontSize: 12,
//             fontFamily: PoppinsRegular,
//           }}
//         >
//           {text}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default CustomCheckboxField;
import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import styles from "./Styles";
import { icons } from "@/assets/icons/icons";
import { PoppinsRegular } from "../../Resources/fonts";

interface CustomCheckboxFieldProps {
  field?: { required?: boolean };
  style?: any;
  text?: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  bgColor?: string;
  // check?: boolean;
  value: boolean; // Controlled component
  handleInputChange?: (
    event: { target: { value: boolean } },
    field?: any
  ) => void;
}

const CustomCheckboxField: React.FC<CustomCheckboxFieldProps> = ({
  field,
  isRequired,
  isReadOnly,
  value,
  text,
  style,
  // check,
  handleInputChange,
}) => {
  const handleToggle = () => {
    setCheck(!check);

    if (!isReadOnly && handleInputChange) {
      handleInputChange({ target: { value: !value } }, field);
    }
  };
  const [check, setCheck] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TouchableOpacity
          onPress={handleToggle}
          style={[
            styles.checkbox,
            value && styles.checked,
            check && styles.checked,
          ]}
        >
          <Image
            source={
              check ? icons.toastNotificationIcon : icons.uncheck_Mark_Icon
            }
            style={{ width: 25, height: 25, tintColor: "#07504B" }}
          />
        </TouchableOpacity>
        {text && (
          <Text
            style={{
              marginLeft: 5,
              color: "#000000",
              fontSize: 12,
              fontFamily: PoppinsRegular,
            }}
          >
            {text}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CustomCheckboxField;
