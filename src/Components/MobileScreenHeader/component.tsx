import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './styles';

type HeaderProps = {
  Title: string;
};

const Header: React.FC<HeaderProps> = ({ Title }) => {
  return (
    <View>
      <Text style={styles.header}>{Title}</Text>
    </View>
  );
};

export default Header;
