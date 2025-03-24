// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Svg, { Circle } from "react-native-svg";

// const PredictorCard = () => {
//   const percentage = 74; // Circular progress value

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>Total Paid PO</Text>
//       <Text style={styles.value}>5672</Text>
//       <View style={styles.row}>
//         <View style={styles.increaseContainer}>
//           <Text style={styles.increaseText}>+14% Inc</Text>
//         </View>
//         <Svg height="40" width="40" viewBox="0 0 100 100">
//           {/* Background Circle */}
//           <Circle cx="50" cy="50" r="45" stroke="#E0E0E0" strokeWidth="10" fill="none" />
//           {/* Progress Circle */}
//           <Circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="#4CAF50"
//             strokeWidth="10"
//             fill="none"
//             strokeDasharray="283" // Full circle length (2 * π * r)
//             strokeDashoffset={283 - (283 * percentage) / 100}
//             strokeLinecap="round"
//             transform="rotate(-90 50 50)" // Start from the top
//           />
//           <Text x="50%" y="50%" fontSize="20" textAnchor="middle" fill="#4CAF50" dy="5">
//             +{percentage}%
//           </Text>
//         </Svg>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     width: 200,
//   },
//   title: {
//     color: "#999",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   value: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#000",
//     marginVertical: 5,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   increaseContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E8F5E9",
//     padding: 5,
//     borderRadius: 10,
//   },
//   increaseText: {
//     color: "#4CAF50",
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });

// export default PredictorCard;
import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import helpers from "../../utils/helpers";
import { icons } from "../../Resources";
import { PoppinsLight, PoppinsMedium, PoppinsRegular } from "../../Resources/fonts";

type PredictorCardProps = {
  color: string;
  style:any
};

const PredictorCard: React.FC<PredictorCardProps> = ({ color,style }) => {
  const percentage: number = 74; // Circular progress value
  const isMobileView = Platform.OS === "ios";

  return (
    <View style={[styles.card,style]}>
      <View>
        <Text style={[styles.title]}>Total Paid PO</Text>
        <Text style={[styles.value,isMobileView&&styles.value2]}>5672</Text>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:10,}}>
          <Image source={icons.trendupIcon} style={{width:10,height:10,borderRadius:20,padding:5,backgroundColor:'#29AB91',}}></Image>
        <Text style={[styles.increaseText,isMobileView&&styles.increaseText2]}> 14% Inc</Text>

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

const styles = StyleSheet.create({
  
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginRight:20,
    flex:1,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    flexDirection: "row",
    // alignItems:'center',
    justifyContent: "space-between",

    // elevation: 3,
    // width: helpers.wp(18),
  },
  title: {
    color: "#999",
    fontSize: 14,
    fontWeight: "500",
    fontFamily:PoppinsRegular
  },
  value: {
    fontSize: 28,
    fontWeight: "300",
    color: "#000",
    // marginVertical: 5,
    fontFamily:PoppinsRegular
  },
  value2: {
    fontSize: 15,
    fontWeight: "500",
    color: "#29292B",
    fontFamily:PoppinsRegular
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:10
  },
  increaseContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 5,
    borderRadius: 10,
  },
  increaseText: {
    // color: "#4CAF50",
    fontSize: 12,
    fontWeight: "200",
    marginLeft:5,
    fontFamily:PoppinsRegular

  },
  increaseText2: {
    color: "#333333",
    fontSize: 8,
    fontWeight: "400",
    marginLeft:5,
    fontFamily:PoppinsRegular

  },
});

export default PredictorCard;
