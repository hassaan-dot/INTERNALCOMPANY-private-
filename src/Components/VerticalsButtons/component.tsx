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
  onPress: () => void;
}

const VerticalsButton: React.FC<UserProfileProps> = ({
  rows,
  name = "Ahmed",
  email = "Ahmed@gmail.com",
  contact = "923174431419",
  country = "Saudia  Arabia",
  profile = false,
  style,
  title = "Details",
  titleIcon,
  titleStyle,
  buttons,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.row]}>
        <View
          style={[
            styles.profileSection,
            { padding: !profile ? helpers.hp(0) : helpers.normalize(30), 
              paddingVertical:!profile ? helpers.hp(0) : helpers.normalize(35),
              paddingHorizontal: !profile ? helpers.hp(0) : helpers.normalize(45),
            
            },
          ]}
        >
          {!profile && (
            <ButtonGroup
              onPress={onPress}
              textStyle2={{ color: "#07504B" }}
              Color1="#07504B"
              Color2="#FFF"
              style2={{ borderColor: "#07504B" }}
              buttonTitle1="Assign Employee"
              buttonTitle2="Change Status"
              ContainerStyle={{}}
              buttonCount={buttons}
            ></ButtonGroup>
          )}
        </View>
      </View>
    </View>
  );
};

export default VerticalsButton;
