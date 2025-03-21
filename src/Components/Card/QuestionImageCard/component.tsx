import React from "react";
import { styles } from "./style";
import { ImageBackground, Text, View } from "react-native";
import { images } from "../../../../public/material/Images/images";

const QuestionCardImage = ({ Data }) => {
  return (
    <View style={styles.Imagecard}>
      <ImageBackground
        source={images?.QuestionCard_Background}
        resizeMode="cover"
        imageStyle={{ borderRadius: 15 }}
        style={styles.backgroundImage}
      >
        {" "}
        <View style={styles.overlay}></View>
        <Text style={styles.question}>{Data}</Text>
      </ImageBackground>
    </View>
  );
};
export default QuestionCardImage;
