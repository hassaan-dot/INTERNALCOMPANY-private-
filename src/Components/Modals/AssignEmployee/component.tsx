import { icons } from "@/assets/icons/icons";
import { useGetEmployees } from "@/hooks/useEmployee";
import { useModalStore } from "@/store/useModalStore";
import { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { MultiSelectDropdown, SingleSelectDropDown } from "../..";
import { styles } from "./styles";

interface AssignEmployeeProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  desc?: boolean;
  desctext?: string;
  modalContainerprop?: any;
}

interface Employee {
  key: string;
  value: string;
}

interface FormData {
  users: Employee[];
}

const AssignEmployee: React.FC<AssignEmployeeProps> = ({
  visible,
  onClose,
  onSubmit,
  title,
  desc = false,
  desctext = "",
  modalContainerprop,
}) => {
  const { rowData } = useModalStore();
  const { data } = useGetEmployees();

  const [formData, setFormData] = useState<FormData>({ users: [] });
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const handleInputChange = (field: keyof FormData, value: Employee[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      users: selectedUsers ? selectedUsers : rowData?.users || [],
    }));
  }, [selectedUsers]);

  const handleSubmit = () => {
    if (formData.users.length === 0) {
      alert("Please select at least one employee.");
      return;
    }
    onSubmit(formData);
  };

  const transformToDropdownItems = (items: any[]): Employee[] =>
    items?.map((item) => ({
      value: item?.username,
      key: item?.documentId,
    })) || [];

  const EmployeeDropdownItems = transformToDropdownItems(data?.data || []);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <View>
            <Image
              source={icons.modalIconOtp}
              style={{ width: 60, height: 60 }}
            />
            <Text style={styles.title}>{title}</Text>
            {desc && <Text style={styles.subtitle}>{desctext}</Text>}
          </View>

          <View style={{ marginBottom: 10 }}>
            {/* <SingleSelectDropDown
              items={EmployeeDropdownItems}
              title="Select Employees"
              setSelected={(data: Employee[]) =>
                handleInputChange("users", data)
              }
              selected={formData.users}
              multiple
            /> */}
            <MultiSelectDropdown
              title="Select Employees"
              items={EmployeeDropdownItems}
              selectedItems={selectedUsers}
              setSelectedItems={setSelectedUsers}
              defaultSelectedItems={rowData?.userSelection ?? []}
            ></MultiSelectDropdown>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.addText}>Assign</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AssignEmployee;
