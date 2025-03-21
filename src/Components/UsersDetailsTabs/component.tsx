import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { styles } from "./styles";
import DropDownTitleView from "../DropdownWithTitle/Component";
interface TabSelectorProps {
  tabs: [string, string];
  onSelect: (tab: string) => void;
  style: any;
  textStyle: any;
  barColor: any;
  dropDownButton: boolean;
  containerStyle: any;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  style,
  onSelect,
  containerStyle,
  textStyle,
  barColor,
  dropDownButton = false,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    onSelect(tab);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={[styles.container, style]}>
        {tabs?.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.text,
                textStyle,
                selectedTab === tab && styles.activeText,
              ]}
            >
              {tab}
            </Text>
            {selectedTab === tab && (
              <View style={[styles.underline, { backgroundColor: barColor }]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      {dropDownButton && (
      <View style={{marginRight:10}}>
      
          <DropDownTitleView
          placeholder={'Export as'}
            containerStyle={{
              borderColor: "#07504B",
              borderWidth: 1,
              borderRadius: 6,
            }}
          ></DropDownTitleView>

      </View>
    )}
    </View>
  );
};

export default TabSelector;
