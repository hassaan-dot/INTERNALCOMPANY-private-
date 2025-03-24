import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { styles } from "./style";
import helpers from "../../../utils/helpers";
import { icons } from "../../../Resources";
import { navigate } from "../../../utils/NavigationService";

interface ComponentProps {
  image?: any;
  title: string;
  amount: string | number;
  paymentStatus:string;
  onViewReceipt: () => void;
  onContributeAgain: () => void;
}

const Component: React.FC<ComponentProps> = ({
  image,
  title,
  amount,
  paymentStatus,
  onViewReceipt,
  onContributeAgain,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef<TouchableOpacity | null>(null);

  const openModal = () => {
    if (iconRef.current) {
      iconRef.current.measure((fx, fy, width, height, px, py) => {
        setModalPosition({
          x: px + width / 2, // Center the modal horizontally
          y: py + height + 10, // Position below the icon with some margin
        });
        setIsModalVisible(true);
      });
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleButtonPress = () => {
    closeModal();
    navigate("ReportProblem");
  };

  return (
    <View style={styles.cardContainer}>
      {image && (
        <View style={styles.imageView}>
          <Image source={image} style={styles.cardImage} />
        </View>
      )}
      <View style={styles.cardContent}>
        <View style={styles.rowFlex}>
          <Text style={styles.cardTitle}>{title}</Text>
          <TouchableOpacity
            ref={iconRef}
            onPress={openModal}
            style={{ marginLeft: helpers.normalize(10) }}
          >
            <Image
              source={icons.PostFieldMeni_Icon}
              style={{
                width: helpers.normalize(20),
                height: helpers.normalize(40),
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.rowFlex, { marginTop: helpers.normalize(10) }]}>
          <Text
            style={[
              styles.cardAmountlabelText,
              { marginVertical: helpers.normalize(5) },
            ]}
          >
            Amount:
          </Text>
          <Text style={styles.cardAmountText}>${amount}</Text>
        </View>
        <View style={styles.rowFlex}>
          <Text style={styles.cardAmountlabelText}>Payment Status:</Text>
          <Text
            style={[
              styles.paymentStatus,
              paymentStatus === "Successful" ? styles.success : styles.failed,
            ]}
          >
            {paymentStatus}
          </Text>
        </View>

        {paymentStatus === "Failed" && (
          <Text style={styles.failedReason}>Why did my payment fail?</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.viewReceiptButton}
            onPress={onViewReceipt}
          >
            <Text style={styles.viewReceiptButtonText}>View Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contributeAgainButton}
            onPress={onContributeAgain}
          >
            <Text style={styles.contributeAgainButtonText}>
              Contribute Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <TouchableOpacity
            style={[
              styles.modalContent,
              {
                position: "absolute",
                top: modalPosition.y - helpers.normalize(22),
                left: modalPosition.x - helpers.normalize(150), // Adjust horizontal alignment
              },
            ]}
            onPress={handleButtonPress}
          >
            <View style={styles.modalHeader}>
              <View>
                <Image
                  source={icons.report_sign_icon}
                  style={styles.reportSignIcon}
                />
              </View>
              <View>
                <Text style={styles.modalText}>Report a Problem</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Component;
