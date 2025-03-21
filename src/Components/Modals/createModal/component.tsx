import React from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "./styles";
import { icons, string } from "../../../Resources";
import InputField from "../../InputField/InputField";
interface ClientModalProps {
  visible: boolean;
  create?: boolean;
  desc?: boolean;
  invoice: boolean;
  styleContainer: any;
  title: string;

  onClose: () => void;
  // onSubmit: (data: ClientFormData) => void;
  onSubmit: () => void;
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
}

interface ClientFormData {
  contactPerson: string;
  email: string;
  phone: string;
  companyName: string;
}

const CreateModal: React.FC<ClientModalProps> = ({
  visible,
  user,
  onClose,
  create = false,
  onSubmit,
  title,
  desc = false,
  invoice = false,
  styleContainer,
  First,
  desctext,
  Firstchild,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  seventh,
  eigth,
  ninth,
  modalContainerprop,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, modalContainerprop]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {create && (
                <>
                  <Image
                    source={icons.modalIconOtp}
                    style={{ width: 60, height: 60 }}
                  ></Image>
                  <Text style={styles.title}>{title}</Text>
                </>
              )}

              {!create && (
                <Text style={styles.title}>Send Payment Reminder</Text>
              )}

              {desc && <Text style={styles.subtitle}>{desctext}</Text>}
            </View>
            {First && (
              <View style={[styleContainer]}>
                <InputField
                  title={First}
                  placeholder={First}
                  style={styles.input}
                  titleStyle={styles.fontSize}
                ></InputField>
                {Firstchild && (
                  <View style={{ marginLeft: 7 }}>
                    <InputField
                      title={Firstchild}
                      placeholder={Firstchild}
                      style={styles.input}
                      titleStyle={styles.fontSize}
                    ></InputField>
                  </View>
                )}
              </View>
            )}

            {Second && (
              <View>
                <InputField
                  title={Second}
                  placeholder={Second}
                  titleStyle={styles.fontSize}
                  style={styles.input}
                ></InputField>
              </View>
            )}

            {Third && (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  title={Third}
                  placeholder={Third}
                  style={styles.input}
                ></InputField>
              </View>
            )}

            {Fourth && create && !invoice && (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  title={Fourth}
                  placeholder={Fourth}
                  style={styles.input}
                ></InputField>
              </View>
            )}
            {(Fifth && !create) ||
              (invoice && (
                <View>
                  <InputField
                    titleStyle={styles.fontSize}
                    title={Fifth}
                    placeholder={Fifth}
                    style={styles.input}
                  ></InputField>
                </View>
              ))}
            {Sixth && invoice && (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  title={Sixth}
                  placeholder={Sixth}
                  style={styles.input}
                ></InputField>
              </View>
            )}

            {(seventh && !create) ||
              (invoice && (
                <View>
                  <InputField
                    titleStyle={styles.fontSize}
                    title={seventh}
                    placeholder={seventh}
                    style={styles.inputNote}
                  ></InputField>
                </View>
              ))}
            {(eigth && !create) ||
              (invoice && (
                <View>
                  <InputField
                    titleStyle={styles.fontSize}
                    placeholder={eigth}
                    title={eigth}
                    style={styles.input}
                  ></InputField>
                </View>
              ))}
            {(!user && create) || (
              <View>
                <InputField
                  titleStyle={styles.fontSize}
                  placeholder={ninth}
                  title={ninth}
                  style={styles.input}
                ></InputField>
              </View>
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              // onPress={handleSubmit(handleFormSubmit)}
              onPress={onSubmit}
            >
              <Text style={styles.addText}>
                {!create ? "Send Reminder" : "Add Client"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;
