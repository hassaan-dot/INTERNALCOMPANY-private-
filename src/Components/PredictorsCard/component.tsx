import React from "react";
import { Image, Platform, Text, View } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { icons } from "../../Resources";
import { styles } from "./styles";

type PredictorCardProps = {
  title: string;
  value: string | number;
  color: string;
  style: any;
};

const PredictorCard: React.FC<PredictorCardProps> = ({
  color,
  style,
  title,
  value,
}) => {
  const percentage: number = 74;
  const isMobileView = Platform.OS === "ios";

  return (
    <View style={[styles.card, style]}>
      <View>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.value, isMobileView && styles.value2]}>
          {value}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Image
            source={icons.trendupIcon}
            style={{
              width: 10,
              height: 10,
              borderRadius: 20,
              padding: 5,
              backgroundColor: "#29AB91",
            }}
          ></Image>
          <Text
            style={[styles.increaseText, isMobileView && styles.increaseText2]}
          >
            {" "}
            14% Inc
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Svg height={60} width={60} viewBox="0 0 100 100">
          <Circle
            cx={50}
            cy={50}
            r={45}
            stroke="#E0E0E0"
            strokeWidth={10}
            fill="none"
          />
          <Circle
            cx={50}
            cy={50}
            r={45}
            stroke={color}
            strokeWidth={10}
            fill="none"
            strokeDasharray={283}
            strokeDashoffset={283 - (283 * percentage) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <SvgText
            x="50"
            y="55"
            fontSize="18"
            // fontWeight="bold"
            textAnchor="middle"
            fill={color}
          >
            {`+${percentage}%`}
          </SvgText>
        </Svg>
      </View>
    </View>
  );
};

export default PredictorCard;
