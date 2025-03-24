
import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FontAwesome6, Entypo } from "@expo/vector-icons";
import style from "./style";
import CustomButton from "../../CustomButton/Button";

interface Option {
  name: string;
  status: "completed" | "pending";
}

interface ActionSheetProps {
  options: Option[];
  buttonText: string;
  dragHandlePress?: () => void;
  onButtonPress?: () => void;
  Visible?: boolean;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  options = [
    { name: "Salesman", status: "completed" },
    { name: "Postman", status: "completed" },
    { name: "Driver", status: "completed" },
    { name: "Technician", status: "completed" },
    { name: "Manager", status: "completed" },
    { name: "Manager", status: "pending" },
    { name: "Manager", status: "pending" },
  ],
  buttonText,
  dragHandlePress,
  onButtonPress,
  Visible,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const styles = style.getSheet();

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const lastButtonPressed = useCallback(() => {
    if (onButtonPress) {
      onButtonPress();
    }
    hide();
  }, [onButtonPress, hide]);

  return (
    <Modal
      visible={Visible}
      transparent={true}
      animationType="slide"
      onRequestClose={hide}
    >
      <TouchableOpacity
        style={styles.overlay}
        //  onPress={dragHandlePress}
        disabled={true}
        onPress={onButtonPress}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.container2} onPress={onButtonPress}>
            <Entypo name="circle-with-cross" color="#CDCDCD" size={25} />
          </TouchableOpacity>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onButtonPress}>
              <FontAwesome6 name="arrow-left" size={23} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Confirmation Delivery</Text>
          </View>
          <View style={styles.container3}>
            <View style={styles.optionRow}>
            <Text style={styles.optionText2}>
             Enter the OTP recieved code here
            </Text>
           <TouchableOpacity style={{paddingVertical:13,paddingHorizontal:20 ,backgroundColor:'#07504B',borderRadius:8}}>
               <Text style={styles.optionText} >
                Resend
               </Text>
           </TouchableOpacity>

            </View>
            <View>
          <CustomButton
          style={{flex:0,marginRight:0,paddingVertical:15}}
         Color="#CCD9FF"
         desc={''}
         Imagecontainer={{width:40,height:40}}
         Imagecontainer2={{width:25,height:25}}
         textStyle={{fontSize:14,fontWeight:'600'}}
         title={'Upload Picture'}
          ></CustomButton>
          </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.lastButton} onPress={onButtonPress}>
              <View style={styles.buttonTextStyle}>
                <Text style={styles.buttonText}>{'Submit'}</Text>
              </View>
            </TouchableOpacity>
          </View>
       
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ActionSheet;
