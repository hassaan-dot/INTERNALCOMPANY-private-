
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
} from "react-native";
import { icons } from "../../Resources";
import styles from './Styles'
interface SearchBarProps {
  placeholder?: string;
  onChangeText: (text: string | null) => void;
  Searching: (text: string | null) => void;
  value: string;
  style?: object;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChangeText,
  Searching,
  value,
  style,
}) => {
  const [valueHolder,setValueHolder]=useState('Search......')
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [visible]);

  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={icons.searchBarIcon}
          style={{ width: 16, height: 16,marginRight:6 }}
        ></Image>
        <TextInput
          // ref={inputRef}
        
          style={styles.searchInput}
          placeholder={valueHolder ||'Search...'}
          placeholderTextColor="#849198"
          // editable={visible}
          onChangeText={(text) => setValueHolder(text)}
          onPressIn={() => setVisible(true)}
          value={value}
        />
      </View>
    </View>
  );
};



export default SearchBar;
