import { icons } from "@/assets/icons/icons";
import { useCreateInvoice, useUpdateInvoice } from "@/hooks/usePOpayments";
import { useModalStore } from "@/store/useModalStore";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { DateTimeSelector, SingleSelectDropDown } from "../..";
import InputField from "../../InputField/InputField";
import { styles } from "./styles";

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
const invoiceSchema = yup.object().shape({
  payer: yup
    .string()
    .required("Payer name is required")
    .min(2, "Payer name must be at least 2 characters"),
  amount: yup
    .number()
    .min(1, "Amount must be greater than 0")
    .required("Amount is required"),
  payment_method: yup.string().required("Payment method is required"),
  payment_status: yup.string().required("Payment status is required"),
  date_of_payment: yup.string().required("Payment date is required"),
});

const InvoiceModal: React.FC<ClientModalProps> = ({
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

  const items: Item[] = [
    { value: "Bank Transfer", key: "Bank Transfer" },
    { value: "Cash", key: "Cash" },
    { value: "Credit Card", key: "Credit Card" },
    { value: "Other", key: "Other" },
  ];

  const itemsStatus: Item[] = [
    { value: "Completed", key: "Completed" },
    { value: "Pending", key: "Pending" },
    { value: "Failed", key: "Failed" },
  ];

  const [formData, setFormData] = useState(
    rowData ?? {
      date_of_payment: "",
      payer: "",
      amount: "",
      payment_method: "",
      payment_status: "",
      documentId: rowData?.documentId,
      purchase_order: "",
    }
  );

  const [date, setDate] = useState<Date | null>(
    rowData?.isEdit ? new Date(rowData?.date_of_payment) : null
  );

  // console.log("date", date);

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | undefined
  ) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    clearError(field.toString());
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
      await invoiceSchema.validate(formData, { abortEarly: false });
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
  const { mutate: handleAddInvoice, isPending: isAdding } = useCreateInvoice();
  const { mutate: handleUpdateInvoice, isPending: isUpdating } =
    useUpdateInvoice();

  const onPressUpdateInvoicefunction = ({
    date_of_payment,
    payer,
    amount,
    payment_method,
    payment_status,
    purchase_order,
    documentId,
  }: any) => {
    const data = {
      data: {
        date_of_payment: new Date(date_of_payment),
        payer: payer,
        amount: amount,
        payment_method: payment_method,
        payment_status: payment_status,
        purchase_order: purchase_order,
      },
    };

    handleUpdateInvoice({ data, documentId });
  };

  const onPressAddInvoicefunction = ({
    date_of_payment,
    payer,
    amount,
    payment_method,
    payment_status,
  }: any) => {
    const data = {
      data: {
        date_of_payment: new Date(date_of_payment),
        payer: payer,
        amount: amount,
        payment_method: payment_method,
        payment_status: payment_status,
        purchase_order: id,
      },
    };
    handleAddInvoice(data);
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({
      payer: true,
      amount: true,
      payment_method: true,
      payment_status: true,
      date_of_payment: true,
    });

    const isValid = await validateForm();
    if (isValid) {
      if (rowData?.isEdit) onPressUpdateInvoicefunction(formData);
      else onPressAddInvoicefunction(formData);
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
              <Text style={styles.title}>{`${rowData?.isEdit ? "Update Invoice" : "Create Invoice"
                }`}</Text>

              {desc && <Text style={styles.subtitle}>{desctext}</Text>}
            </View>

            <View style={[styleContainer]}>
              <InputField
                title={"Name"}
                placeholder={"Enter Invoice Name"}
                value={formData.payer}
                onChangeText={(text) => handleInputChange("payer", text)}
                onBlur={() => setTouched((prev) => ({ ...prev, payer: true }))}
                style={styles.input}
                titleStyle={styles.fontSize}
                error={touched.payer && errors.payer}
                errorMessage={touched.payer && errors.payer}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View style={{ marginBottom: 6 }}>
              <InputField
                title={"Amount"}
                placeholder={"Enter Amount"}
                value={formData.amount}
                onChangeText={(text) => handleInputChange("amount", text)}
                onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
                titleStyle={styles.fontSize}
                style={styles.input}
                keyboardType="numeric"
                error={touched.amount && errors.amount}
                errorMessage={touched.amount && errors.amount}
                multiline={false}
                ispassword={false}
              />
            </View>

            <View style={{ marginBottom: 6 }}>
              <SingleSelectDropDown
                title="Payment Method"
                selected={formData.payment_method}
                setSelected={(text) =>
                  handleInputChange("payment_method", text)
                }
                items={items}
                error={touched.payment_method && errors.payment_method}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, payment_method: true }))
                }
              />
            </View>

            <View style={{ marginBottom: 6 }}>
              <SingleSelectDropDown
                title="Payment Status"
                selected={formData.payment_status}
                setSelected={(text) =>
                  handleInputChange("payment_status", text)
                }
                items={itemsStatus}
                error={touched.payment_status && errors.payment_status}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, payment_status: true }))
                }
              />
            </View>

            <View style={{ marginBottom: 13 }}>
              <DateTimeSelector
                selectedDate={date}
                onDateChange={(date) => {
                  handleInputChange("date_of_payment", date?.toISOString());
                  setDate(date);
                  setTouched((prev) => ({ ...prev, date_of_payment: true }));
                  clearError("date_of_payment");
                }}
                showTime={false}
                error={touched.date_of_payment && errors.date_of_payment}
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
              disabled={
                Object.keys(errors).length > 0 || isAdding || isUpdating
              }
            >
              <Text style={styles.addText}>
                {(isAdding || isUpdating) && <ActivityIndicator />}
                {!isAdding &&
                  !isUpdating &&
                  (rowData?.isEdit ? "Update" : "Create")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvoiceModal;
