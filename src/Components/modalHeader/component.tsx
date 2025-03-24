import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Styles } from "./styles";
import { icons } from "../../Resources";

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  ShowBackIcon?: boolean;
  handleFunction: () => void;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  ShowBackIcon,
  handleFunction,
}) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.rowContainer}>
        {ShowBackIcon && (
          <TouchableOpacity
            onPress={() => handleFunction()}
          >
            <Image
              source={icons.arrowBack_Icon}
              style={[
                Styles.ArrowBackIcon,
                { tintColor: "#E22691" },
              ]}
            ></Image>
          </TouchableOpacity>
        )}
      </View>
      <View style={Styles.each}>
        <Text style={Styles.title}>{title}</Text>
      </View>
      <View style={Styles.ArrowCrossIcon}>
        <TouchableOpacity onPress={() => handleFunction()}>
          <Image
            source={icons.Cross_Icon}
            style={Styles.ImageCrossIcon}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalHeader;
