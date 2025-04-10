import React from "react";
import { Image, Platform, Text, View } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { icons } from "@/assets/icons/icons";
import { styles } from "./styles";

type PredictorCardProps = {
  title: string;
  value: string | number;
  color: string;
  style: any;
  inc: string | number;
};

const PredictorCard: React.FC<PredictorCardProps> = ({
  color,
  style,
  title,
  value,
  inc,
}) => {
  const isMobileView = Platform.OS === "ios";

  const progress = typeof inc == "string" ? inc.slice(1, inc?.length) : inc;
  const normalized_progress = progress > "100" ? "100" : progress;

  return (
    <View style={[styles.card, style]}>
      <View>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.value, isMobileView && styles.value2]}>
          {value}
        </Text>
        {inc != null && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 20,
                padding: 5,
                backgroundColor: inc?.toString()?.startsWith("+")
                  ? "#29AB91"
                  : inc?.toString()?.startsWith("-")
                  ? "#EC4746"
                  : "#5A6470",
              }}
            />
            <Text
              style={[
                styles.increaseText,
                isMobileView && styles.increaseText2,
                {
                  color: inc?.toString()?.startsWith("+")
                    ? "#29AB91"
                    : inc?.toString()?.startsWith("-")
                    ? "#EC4746"
                    : "#5A6470",
                },
              ]}
            >
              {inc}% Inc
            </Text>
          </View>
        )}
      </View>

      {inc != null && (
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
              strokeDashoffset={
                283 - (283 * parseFloat(normalized_progress)) / 100
              }
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <SvgText
              x="50"
              y="55"
              fontSize="18"
              // fontWeight="bold"
              textAnchor="middle"
              fill={inc == 0 ? "#5A6470" : color}
            >
              {`${inc}%`}
            </SvgText>
          </Svg>
        </View>
      )}
    </View>
  );
};

export default PredictorCard;
