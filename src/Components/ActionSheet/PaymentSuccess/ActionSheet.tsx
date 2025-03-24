import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ImageSourcePropType,
} from 'react-native';
import style from './style';
import {images} from '../../../Resources';
import helpers from '../../../utils/helpers';

// Define types for the options
interface Option {
  Text: string;
  Amount: string;
}

interface ActionSheetProps {
  title: string;
  image: ImageSourcePropType; // Type for images, to support both local and network images
  option2: Option[]; // Array of options for the first list
  options: Option[]; // Array of options for the second list
  buttonText: string;
  onCancel: () => void;
  dragHandlePress: () => void;
  onButtonPress: () => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  title,
  image,
  option2,
  options,
  buttonText,
  onCancel,
  dragHandlePress,
  onButtonPress,
}) => {
  const styles = style.getSheet();

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={dragHandlePress}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1} // Ensure the touch is detected
        onPress={onCancel}>
        <View style={styles.container} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.dragHandle}
            onPress={dragHandlePress}
          />
          <View style={styles.header}>
            <Image source={image} style={styles.headerImage} />
            <Text style={styles.headerTitle}>{title}</Text>
          </View>

          <Image
            source={images.receipt_distribution_line}
            style={styles.distributionLineImage}
          />
          <View style={styles.contentPadding}>
            {option2.map((option, index) => (
              <View style={styles.detailContainer} key={index}>
                <View style={styles.contentPadding}>
                  <Text style={styles.detailTextOne}>{option.Text}</Text>
                </View>
                <View style={styles.contentPadding}>
                  <Text style={styles.detailTextTwo}>{option.Amount}</Text>
                </View>
              </View>
            ))}
          </View>
          <Image
            source={images.receipt_distribution_line}
            style={styles.distributionLineImage}
          />

          <View style={styles.secondDetailContainerPadding}>
            {options.map((option, index) => (
              <View style={styles.detailContainer} key={index}>
                <View style={styles.contentPadding}>
                  <Text style={styles.detailTextOne}>{option.Text}</Text>
                </View>
                <View style={styles.contentPadding}>
                  <Text
                    style={{
                      fontSize: helpers.normalize(12),
                      color:
                        options.length - 1 === index ? '#F5169C' : '#333333',
                      fontWeight: options.length - 1 === index ? 'bold' : '400',
                    }}>
                    {`${options.length - 2 === index ? ' + ' : ' '}$${
                      option.Amount
                    }`}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.lastButton} onPress={onButtonPress}>
              <View style={styles.buttonTextStyle}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ActionSheet;
