import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import createStyles from './Style'; 

interface HorizontalLineProps {
  width?: string | number; 
  color?: string; 
  lineHeight?: number; 
  marginVertical?: number; 
  text?: string;
  lineStyle?: ViewStyle; 
  containerMain?: ViewStyle;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({
  width = '100%', 
  color = '#ddd',
  lineHeight = 1, 
  marginVertical = 0, 
  text, 
  lineStyle, 
  containerMain,
}) => {
  const styles = createStyles(width, color, lineHeight, marginVertical);

  return (
    <View style={[styles.container, containerMain]}>
      <View style={[styles.line, lineStyle]} />
      
      {text && <Text style={styles.text}>{text}</Text>}

      <View style={[styles.line, lineStyle]} />
    </View>
  );
};

export default HorizontalLine;
