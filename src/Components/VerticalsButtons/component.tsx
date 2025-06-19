import React from "react";
import { View } from "react-native";
import ButtonGroup from "../HorizontalButtons/component";
import { styles } from "./styles";
import helpers from "../../utils/helpers";

interface VerticalsButtonProps {
  profile?: boolean;
  buttons?: any;
  onPress: () => void;
  onPress2: () => void;
  btn1Disable?: boolean;
  btn2Disable?: boolean;
}

const VerticalsButton: React.FC<VerticalsButtonProps> = ({
  profile = false,
  buttons,
  onPress,
  onPress2,
  btn1Disable,
  btn2Disable,
}) => {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.row,
          {
            minWidth: 200,
          },
        ]}
      >
        <View
          style={[
            styles.profileSection,
            {
              padding: helpers.normalize(15),
            },
          ]}
        >
          {(!btn1Disable || !btn2Disable) && profile && (
            <ButtonGroup
              onPress={onPress}
              onPress2={onPress2}
              textStyle1={{ color: "#FFF" }}
              textStyle2={{ color: "#07504B" }}
              Color1="#07504B"
              Color2="#FFF"
              style1={{}}
              style2={{ borderColor: "#07504B" }}
              buttonTitle1="Assign Employee"
              buttonTitle2="Change Status"
              ContainerStyle={{}}
              buttonCount={buttons}
              btn1Disable={btn1Disable}
              btn2Disable={btn2Disable}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default VerticalsButton;
