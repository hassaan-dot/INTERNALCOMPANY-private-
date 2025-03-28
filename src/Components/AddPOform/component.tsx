// import React from "react";
// import { View } from "react-native";
// import InputField from "../InputField/InputField";
// import helpers from "../../utils/helpers";
// import { ButtonRow } from "../CncelAddButtons/component";
// import styles from "./styles";
// interface Props {
//   onPress: () => void;
// }

// const POForm: React.FC<Props> = ({ onPress }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.row}>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Reference Name"
//             title="PO Name"
//             style={styles.input1}
//           ></InputField>
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Contact Name"
//             title="Company Name"
//             style={styles.input1}
//           ></InputField>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Contact Name"
//             title="Contact Name"
//             style={styles.input1}
//           ></InputField>
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Name"
//             title="Email Address"
//             style={styles.input1}
//           ></InputField>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="+923174431419"
//             title="Phone Number"
//             style={styles.input1}
//           ></InputField>
//         </View>
//         <View style={styles.inputContainer}>
//           <InputField
//             placeholder="Enter Address"
//             title="Address"
//             style={styles.input1}
//           ></InputField>
//         </View>
//       </View>
//       <View style={[{ marginRight: helpers.normalize(21) }]}>
//         <InputField
//           inputStyle={styles.input}
//           title="Add notes"
//           placeholder={"Add your notes"}
//         ></InputField>
//       </View>
//       <View style={styles.buttonRow}>
//         <ButtonRow onAdd={onPress}></ButtonRow>
//       </View>
//     </View>
//   );
// };

// export default POForm;
import React, { useState } from "react";
import { View } from "react-native";
import InputField from "../InputField/InputField";
import helpers from "../../utils/helpers";
import { ButtonRow } from "../CncelAddButtons/component";
import styles from "./styles";
import { useCreatePO } from "@/hooks/usePO";
import { useRouter } from "expo-router";

interface Props {
  onPress: () => void;
}

const POForm: React.FC<Props> = ({ onPress }) => {
  const [formData, setFormData] = useState<any>({
    po_name: "",
    company_name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    address: "",
    location: null,
    notes: "",
  });

  const { mutate: handleAdd } = useCreatePO(setFormData);
  // Handler to update state
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  const onPressAddfunction = () => {
    const data: any = {
      po_name: formData?.po_name,
      company_name: formData?.contact_name,
      contact_name: formData?.company_name,
      email: formData?.email,
      phone_number: formData?.phone_number,
      address: formData?.address,
      location: 1,
      note: formData?.notes,
    };

    const form_data = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      form_data.append(key, value as any);
    });

    handleAdd(form_data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Reference Name"
            title="PO Name"
            style={styles.input1}
            value={formData?.po_name}
            onChangeText={(text) => handleInputChange("po_name", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Company Name"
            title="Company Name"
            style={styles.input1}
            value={formData?.company_name}
            onChangeText={(text) => handleInputChange("company_name", text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Contact Name"
            title="Contact Name"
            style={styles.input1}
            value={formData?.contact_name}
            onChangeText={(text) => handleInputChange("contact_name", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Enter Email Address"
            title="Email Address"
            style={styles.input1}
            value={formData?.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder={"Phone number"}
            title="Phone Number"
            style={styles.input1}
            value={formData?.phone_number}
            onChangeText={(text) => handleInputChange("phone_number", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            placeholder="Enter Home Address"
            title="Address"
            style={styles.input1}
            value={formData?.address}
            onChangeText={(text) => handleInputChange("address", text)}
          />
        </View>
      </View>
      <View style={[{ marginRight: helpers.normalize(21) }]}>
        <InputField
          inputStyle={styles.input}
          title="Add notes"
          multiline={true}
          placeholder={"Add your notes"}
          value={formData?.notes}
          onChangeText={(text) => handleInputChange("notes", text)}
        />
      </View>
      <View style={styles.buttonRow}>
        <ButtonRow onCancel={handleClose} onAdd={onPressAddfunction} />
      </View>
    </View>
  );
};

export default POForm;
