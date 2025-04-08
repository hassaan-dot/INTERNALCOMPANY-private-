import React from "react";
import { View } from "react-native";
import ButtonGroup from "../HorizontalButtons/component";
import { styles } from "./styles";
import helpers from "../../utils/helpers";
interface UserProfileProps {
  name: string;
  email: string;
  contact: string;
  country: string;
  rows: number;
  profile: boolean;
  style: any;
  title: string;
  titleIcon: boolean;
  titleStyle: any;
  buttons: any;
  onPress2: any;
  onPress: () => void;
  btn1Disable?: boolean;
  btn2Disable?: boolean;
}

const VerticalsButton: React.FC<UserProfileProps> = ({
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
              textStyle2={{ color: "#07504B" }}
              Color1="#07504B"
              Color2="#FFF"
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
