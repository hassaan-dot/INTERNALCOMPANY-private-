import React, { FC } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import ProfileHeader from "../ProfileHeader/component";
import { icons } from "../../Resources";
import { useNavigation } from "@react-navigation/native";
import ButtonGroup from "../HorizontalButtons/component";
import helpers from "../../utils/helpers";

type ClientManagementProps = {
  create?: boolean;
  filter?: boolean;
  title?: string;
  completed?: boolean;
  onPress?: () => void;
  buttonView: boolean;
  buttonViewMulitiple: boolean;
};

const ClientManagement: FC<ClientManagementProps> = ({
  create,
  filter,
  completed,
  title,
  onPress,
  buttonViewMulitiple = false,
  buttonView = false,
}) => {
  return (
    <View style={styles.container}>
      {/* <ProfileHeader /> */}

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.buttonContainer}>
          {create && (
            <TouchableOpacity style={styles.createButton} onPress={onPress}>
              <Image
                source={icons.screenHeaderPlusIcon}
                style={{ width: 15, height: 15, marginRight: 7 }}
              ></Image>
              <Text style={styles.createText}>create</Text>
            </TouchableOpacity>
          )}

          {filter && (
            <TouchableOpacity style={styles.createButton}>
              <Image
                source={icons.screenHeaderFilterIcon}
                style={{ width: 15, height: 15, marginRight: 7 }}
              ></Image>

              <Text style={styles.createText}>Filter</Text>
            </TouchableOpacity>
          )}

          {completed && (
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createText}>Completed</Text>
            </TouchableOpacity>
          )}
          {buttonView && (
            <View>
              <ButtonGroup
                ContainerStyle={{ flexDirection: "row", flex: 1, right: 10 }}
                Color1={"#E61216"}
                style2={{
                  paddingHorizontal: helpers.normalize(27),
                  borderRadius: 11,
                  borderWidth: 0,
                }}
                style1={{
                  paddingHorizontal: helpers.normalize(27),
                  borderRadius: 11,
                  borderWidth: 0,
                }}
                Color2={"#3A9671"}
                buttonTitle1={"Reject"}
                buttonTitle2={"Accept"}
              ></ButtonGroup>
            </View>
          )}
          {buttonViewMulitiple && (
            <>
              <View style={{flexDirection:'row',alignItems:'center',right:15}}>
                <ButtonGroup
                  ContainerStyle={{ flexDirection: "row", flex: 1 }}
                  Color1={"#E61216"}
                  style2={{
                    // paddingHorizontal: helpers.normalize(27),
                    borderRadius: 11,
                    borderWidth: 0,
                  }}
                  style1={{
                    // paddingHorizontal: helpers.normalize(27),
                    borderRadius: 11,
                    borderWidth: 0,
                  }}
                  Color2={"#3A9671"}
                  buttonTitle1={"Reject"}
                  buttonTitle2={"Accept"}
                ></ButtonGroup>
                <ButtonGroup
                  ContainerStyle={{ flexDirection: "row", flex: 1 }}
                  Color1={"#4682B4"}
                  
                  style2={{
                    // paddingHorizontal: helpers.normalize(27),
                    borderRadius: 11,
                    borderWidth: 0,
                  }}
                  style1={{
                    // paddingHorizontal: helpers.normalize(27),
                    borderRadius: 11,
                    borderWidth: 0,
                  }}
                  Color2={"#F15252"}
                  buttonTitle1={"Confirm Recieving"}
                  buttonTitle2={"Close PO"}
                ></ButtonGroup>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ClientManagement;
