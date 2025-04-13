import { icons } from "@/assets/icons/icons";
import { formatDate } from "@/src/utils";
import { useModalStore } from "@/store/useModalStore";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DateTimeSelector, SingleSelectDropDown } from "../..";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";
import * as yup from "yup";
import { formatDateForAPI } from "@/services/dateFormatter";
import {
  useCreateInvoice,
  useDeleteInvoice,
  useUpdateInvoice,
} from "@/hooks/usePOpayments";
import { useLocalSearchParams } from "expo-router";
import {
  useCreateItems,
  useDeleteItem,
  useUpdateItems,
} from "@/hooks/usePOitems";

interface ClientModalProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  invoice: boolean;
  styleContainer: any;
  title: string;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  First: string;
  Firstchild: string;
  Second: string;
  Third: string;
  Fourth: string;
  Fifth: string;
  Sixth: string;
  seventh: string;
  eigth: string;
  ninth: string;
  desctext: string;
  user: boolean;
  modalContainerprop: any;
  Data: any;
  deleteD: boolean;
  update: boolean;
}

// Validation schema
const itemModalSchema = yup.object().shape({
  item_number: yup.string().required("Item number is required"),
  item_name: yup.string().required("Item name  is required"),
  price: yup.number().required("Price is required"),
  company: yup.string().required("Company is required"),
  item_status: yup.string().required("Status is required"),
});

const ItemModal: React.FC<ClientModalProps> = ({
  visible,
  onClose,
  desc = false,
  styleContainer,
  desctext,
  modalContainerprop,
}) => {
  const { id } = useLocalSearchParams();
  const { rowData } = useModalStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  type Item = {
    value: string;
    key: any;
  };

  const itemsStatus: Item[] = [
    { value: "Delivered", key: "Delivered" },
    { value: "Processing", key: "Processing" },
  ];

  const [formData, setFormData] = useState(
    rowData ?? {
      item_number: "",
      item_name: "",
      price: "",
      company: "",
      item_status: "",
      purchase_order: id,
    }
  );

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = async () => {
    try {
      await itemModalSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  const { mutate: handleAddItems } = useCreateItems();
  const { mutate: handleUpdateItems } = useUpdateItems();

  const onPressUpdateItemsfunction = ({
    item_number,
    item_name,
    price,
    company,
    item_status,
    purchase_order,
  }: any) => {
    const data = {
      data: {
        item_number: item_number,
        item_name: item_name,
        price: price,
        company: company,
        item_status: item_status,
        purchase_order: purchase_order,
      },
    };

    handleUpdateItems({ data, documentId: rowData?.documentId });
  };

  const onPressAddItemsfunction = ({
    item_number,
    item_name,
    price,
    company,
    item_status,
  }: any) => {
    const data = {
      data: {
        item_number: item_number,
        item_name: item_name,
        price: price,
        company: company,
        item_status: item_status,
        purchase_order: id,
      },
    };
    handleAddItems(data);
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({
      item_number: true,
      item_name: true,
      price: true,
      company: true,
      item_status: true,
    });

    const isValid = await validateForm();
    if (isValid) {
      if (rowData?.isEdit) onPressUpdateItemsfunction(formData);
      else onPressAddItemsfunction(formData);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={icons.invoiceModalIcon}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.title}>{`${
                rowData?.isEdit ? "Update Item" : "Create Item"
              }`}</Text>

              {desc && <Text style={styles.subtitle}>{desctext}</Text>}
            </View>

            <View style={[styleContainer]}>
              <InputField
                title={"Item Number"}
                placeholder={"Enter Item Number"}
                value={formData.item_number}
                onChangeText={(text) => handleInputChange("item_number", text)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, item_number: true }))
                }
                style={styles.input}
                titleStyle={styles.fontSize}
                error={touched.item_number && errors.item_number}
                errorMessage={touched.item_number && errors.item_number}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View style={{ marginBottom: 6 }}>
              <InputField
                title={"Item Name"}
                placeholder={"Enter Item Name"}
                value={formData.item_name}
                onChangeText={(text) => handleInputChange("item_name", text)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, item_name: true }))
                }
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="numeric"
                error={touched.item_name && errors.item_name}
                errorMessage={touched.item_name && errors.item_name}
                multiline={false}
                ispassword={false}
              />
            </View>
            <View style={{ marginBottom: 6 }}>
              <InputField
                title={"Price"}
                placeholder={"Enter Price"}
                value={formData.price}
                onChangeText={(text) => handleInputChange("price", text)}
                onBlur={() => setTouched((prev) => ({ ...prev, price: true }))}
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="numeric"
                error={touched.price && errors.price}
                errorMessage={touched.price && errors.price}
                multiline={false}
                ispassword={false}
              />
            </View>
            <View style={{ marginBottom: 6 }}>
              <InputField
                title={"Company Name"}
                placeholder={"Enter Company Name"}
                value={formData.company}
                onChangeText={(text) => handleInputChange("company", text)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, company: true }))
                }
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="numeric"
                error={touched.company && errors.company}
                errorMessage={touched.company && errors.company}
                multiline={false}
                ispassword={false}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <SingleSelectDropDown
                title="Status"
                selected={formData.item_status}
                setSelected={(text) => handleInputChange("item_status", text)}
                items={itemsStatus}
                error={touched.item_status && errors.item_status}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, item_status: true }))
                }
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                Object.keys(errors).length > 0 && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={Object.keys(errors).length > 0}
            >
              <Text style={styles.addText}>{`${
                rowData?.isEdit ? "Update" : "Create"
              }`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ItemModal;
