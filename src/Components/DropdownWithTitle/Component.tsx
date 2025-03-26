import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Select, { SingleValue } from "react-select"; // Import SingleValue for typing
import { components } from "react-select";
import { styles } from "./Styles.tsx";
import { customStyles } from "./Styles.tsx";
import { icons } from "@/src/Resources";

// Define the type for items
type Item = {
  label: string;
  value: string;
};

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image source={icons.Drop_Down_Icon_Down} style={styles.arrowIconStyle} />
    </components.DropdownIndicator>
  );
};

interface DropDownTitleViewProps {
  title: string;
  iconleft: boolean;
  containerStyle: any;
  placeholder: string;
  items: any;
  SetRole: any;
  Role: any;
}

const DropDownTitleView: React.FC<DropDownTitleViewProps> = ({
  title,
  Role,
  SetRole,
  iconleft = false,
  containerStyle,
  placeholder,
  items,
}) => {
  return (
    <View style={styles.container}>
      {title && (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={[styles.custom, containerStyle]}>
        {iconleft && (
          <Image
            source={icons.Drop_Down_Icon_Down}
            style={{ width: 25, height: 25 }}
          ></Image>
        )}
        <Select
          options={items}
          placeholder={placeholder}
          styles={customStyles}
          onChange={(selectedOption: SingleValue<Item>) =>
            SetRole(selectedOption ? selectedOption.value : null)
          }
          isSearchable={true}
          components={{
            DropdownIndicator: CustomDropdownIndicator,
          }}
          menuPortalTarget={document.body} // Web-specific
        />
      </View>
    </View>
  );
};

export default DropDownTitleView;
