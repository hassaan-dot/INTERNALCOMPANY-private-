import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
// import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import Svg, { LinearGradient, Stop, Rect } from "react-native-svg";
import { icons } from "../../Resources";

// import { Line, LinearGradient } from "react-native-svg";
type POItem = {
  id: string;
  name: string;
  actionText: string;
  code: string;
  avatar: string;
};

type NewsItem = {
  id: string;
  name: string;
  message: string;
  avatar: string;

};

const assignedPOs: POItem[] = [
  {
    id: "1",
    name: "John Doe",
    actionText: "Submit New PO",
    code: "ESN-45321",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];

const newsData: NewsItem[] = [
  {
    id: "1",
    name: "John Doe",
    message: "Celebrate our 50th anniversary",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];

interface CardSectionProps {
  onPress?: () => void; 
  OnCancel?:() => void;// Function prop (if needed)
}

const CardSection: React.FC<CardSectionProps> = ({ onPress,OnCancel }) => {
  return (
    <View style={styles.container}>
      {/* Your Assigned PO */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Assigned PO</Text>
        <View style={{ marginVertical: 10 }}>
        <Svg height="1" width="100%">
        <LinearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <Stop offset="50%" stopColor="#000" />
          <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </LinearGradient>
        <Rect x="0" y="0" width="100%" height="1" fill="url(#grad)" />
      </Svg>
        </View>
        <FlatList
          contentContainerStyle={{ marginHorizontal: 15, marginTop: 5 }}
          data={assignedPOs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.profileView}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={styles.customView}>
                <Text style={styles.actionText}>{item.actionText}</Text>
              </View>
              <View style={styles.customView}>
                <Text style={styles.code}>{item.code}</Text>
              </View>
              <View style={[styles.customView,{alignItems:'center'}]}>
                <Image source={icons.dashboardButtonNewscardIcon} style={{width:15,height:15,marginLeft:20}}></Image>
              </View>

            </View>
          )}
        />
      </View>

      <View style={styles.card2}>
        <View style={styles.newsHeader}>
          <Text style={styles.cardTitle}>News Panel</Text>
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Text style={styles.addButtonText}>Add News</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <HorizontalLine></HorizontalLine>
          <Svg height="1" width="100%">
        <LinearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <Stop offset="50%" stopColor="#000" />
          <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </LinearGradient>
        <Rect x="0" y="0" width="100%" height="1" fill="url(#grad)" />
      </Svg>
        </View>
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginHorizontal: 15, marginTop: 5 }}
          renderItem={({ item }) => (
            // <View style={styles.row}>
            //   <Image source={{ uri: item.avatar }} style={styles.avatar} />
            //   <Text style={styles.name}>{item.name}</Text>
            //   <Text style={styles.message}>{item.message}</Text>
            // </View>
            <View style={styles.row}>
              <View style={styles.profileView}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={styles.customView2}>
                <Text style={styles.actionText}>{item.message}</Text>
              </View>
              <View style={styles.customView3}></View>

              {/* <Text style={styles.code}>{item.code}</Text> */}
              {/* <Ionicons name="arrow-forward-circle-outline" size={20} color="#5C6BC0" /> */}
              {/* <TouchableOpacity>{"->"}</TouchableOpacity> */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CardSection;
