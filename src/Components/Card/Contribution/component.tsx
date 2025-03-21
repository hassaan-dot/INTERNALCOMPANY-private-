import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { string } from '../../../Resources';
import { images } from '../../../../public/material/Images/images'
import { navigate } from '../../../utils/NavigationService';

const Component: React.FC = () => {
  const handleViewContributions = () => {
    navigate('YourContributions');
  };

  return (
    <View style={styles.card}>
      <Image
        source={images?.circle_dollar}
        style={styles.icon}
      />
      <Text style={styles.cardTitle}>{string.your_contributions}</Text>
      <Text style={styles.cardDescription}>
        {string.contribution_card_desc}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleViewContributions}>
        <Text style={styles.buttonText}>{string.view_contributions}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Component;
