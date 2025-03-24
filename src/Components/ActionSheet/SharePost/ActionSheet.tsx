import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ImageSourcePropType,
  StatusBar,
} from 'react-native';
import style from './style';
import helpers from '../../../utils/helpers';

interface ShareOption {
  icon: ImageSourcePropType; // Icon image
  label: string; // Option label text
  onPress: () => void; // Action on button press
}

interface ActionSheetProps {
  title: string;
  shareOptions: ShareOption[]; // List of share options
  onCancel: () => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  title,
  shareOptions,
  onCancel,
}) => {
  const styles = style.getSheet();

  return (
    <>
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.5)"
        barStyle="light-content"
      />

      <Modal
        visible={true}
        transparent={true}
        animationType="slide"
        onRequestClose={onCancel}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onCancel}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.dragIcon} />
            {/* Title */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {/* Share Options */}
            <View style={styles.shareOptionsContainer}>
              {shareOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.shareButton}
                  onPress={option.onPress}>
                  <Image source={option.icon} style={styles.iconStyle} />
                  <Text style={styles.shareLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ActionSheet;
