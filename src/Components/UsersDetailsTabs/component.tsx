import React, { Dispatch, SetStateAction, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { styles } from "./styles";
import DropDownTitleView from "../DropdownWithTitle/Component";
interface TabSelectorProps {
  tabs: [string, string];
  style: any;
  textStyle: any;
  barColor: any;
  dropDownButton: boolean;
  containerStyle: any;
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  style,
  selectedTab,
  setSelectedTab,
  containerStyle,
  textStyle,
  barColor,
  dropDownButton = false,
}) => {
  const handleTabPress = (tabIndex: number) => {
    setSelectedTab(tabIndex);
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
        {tabs?.map((tab: any, index: number) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(index)}
            style={[styles.tab]}
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
            {selectedTab === index && (
              <View style={[styles.underline, { backgroundColor: barColor }]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      {dropDownButton && (
        <View style={{ marginRight: 10 }}>
          <DropDownTitleView
            placeholder={"Export as"}
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
