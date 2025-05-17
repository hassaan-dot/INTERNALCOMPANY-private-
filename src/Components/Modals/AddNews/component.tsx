import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { useGetDepartments } from "@/hooks/useDepartments";
import { useCreateNews } from "@/hooks/useDashboard";
import { useTranslation } from "react-i18next";

interface NewsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: any;
  Activate?: any;
}

const NewsModal: React.FC<NewsModalProps> = ({
  isVisible,
  onClose,
  title,
}) => {
  const [formData, setFormData] = useState({
    news: "",
    department: "everyone",
  });

  const { t } = useTranslation();
  const { data: departments } = useGetDepartments();
  const { mutate: handleAdd } = useCreateNews();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSend = () => {
    if (!formData?.news) return;
    let data: any = { news: formData?.news };

    if (formData?.department !== "everyone") {
      data.department = formData?.department;
    }

    handleAdd(data);
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
        <View style={styles.container}>
          <Text style={styles.title}>{title ?? t("news.title")}</Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={onClose}>
              <Entypo
                name="circle-with-cross"
                size={25}
                style={{ right: -10, bottom: 30 }}
                color="red"
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder={t("news.placeholder")}
            multiline
            value={formData?.news}
            onChangeText={(text) => handleInputChange("news", text)}
          />

          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={[
                styles.chip,
                formData?.department === "everyone"
                  ? styles.chipSelected
                  : styles.chipUnselected,
              ]}
              onPress={() => handleInputChange("department", "everyone")}
            >
              <Text
                style={[
                  formData?.department === "everyone"
                    ? styles.chipText
                    : styles.chipUnselectedText,
                ]}
              >
                {t("news.everyone")}
              </Text>
            </TouchableOpacity>

            {departments?.data?.map((dep: any) => (
              <TouchableOpacity
                key={dep.id}
                style={[
                  styles.chip,
                  formData?.department === dep?.documentId
                    ? styles.chipSelected
                    : styles.chipUnselected,
                ]}
                onPress={() => handleInputChange("department", dep?.documentId)}
              >
                <Text
                  style={[
                    formData?.department === dep?.documentId
                      ? styles.chipText
                      : styles.chipUnselectedText,
                  ]}
                >
                  {t(`departments.${dep?.name?.trim()}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>{t("news.send")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NewsModal;
