import { View, Text, ScrollView, StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";

const Dashboard = () => {
  const barData = [
    { value: 5, label: "Mon", frontColor: "#b0dab9" },
    { value: 7, label: "Tue", frontColor: "#b7b3e3" },
    { value: 6, label: "Wed", frontColor: "#1a1a1a" },
    { value: 11, label: "Thu", frontColor: "#add8e6" },
    { value: 3, label: "Fri", frontColor: "#a3a3ff" },
    { value: 2, label: "Sat", frontColor: "#8b5a2b" },
    { value: 6, label: "Sun", frontColor: "#a0d7b4" },
  ];

  const pieData = [
    { value: 38.6, color: "#4caf50", text: "Completed" },
    { value: 22.5, color: "#ffeb3b", text: "Pending" },
    { value: 30.8, color: "#f44336", text: "Failed" },
    { value: 8.1, color: "#d9d9d9", text: "Refunded" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.barChartContainer}>
        <Text style={styles.chartTitle}>Daily Total Hours Works</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            // xAxisIndicesWidth={1000} // Reduce margin
            // labelsDistanceFromXaxis={0}
            // xAxisIndicesWidth={100}
            // labelsDistanceFromXaxis={1}
            data={barData}
            barWidth={14}
            // sideWidth={100} // Reduce space
            labelsDistanceFromXaxis={0} // Reduce space between labels and X-axis
            xAxisIndicesWidth={40}
            sideWidth={50}
            // sideWidth={200}
            spacing={40}
            roundedTop
            yAxisColor="#fff"
            xAxisColor="#ddd"
            noOfSections={3}
            yAxisTextStyle={styles.yAxisTextStyle}
            xAxisLabelTextStyle={styles.xAxisLabelTextStyle}
          />
        </View>
      </View>

      <View style={styles.pieChartContainer}>
        <Text style={styles.chartTitle}>Payment Reports</Text>
        <View style={styles.pieChartWrapper}>
          <View style={{ marginRight: 30 }}>
            <PieChart
              data={pieData}
              donut
              radius={60}
              innerRadius={40}
              showValuesAsLabels={false}
              showText={false}
            />
          </View>

          <View style={{ marginLeft: 40 }}>
            {pieData.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                  flex: 1,
                  justifyContent: "space-between",
                  width: helpers.wp(20),
                  // backgroundColor:'red'
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,

                    // justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: item.color,
                      borderRadius: 5,
                      marginRight: 20,
                    }}
                  />
                  <Text style={{ fontSize: 14 }}>{item.text} </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 14 }}>{item.value}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  barChartContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    // shadowOpacity: 0.1,

    
    flex: 0.5,
    // marginHorizontal: 10,
    marginRight:20,
  },
  pieChartContainer: {
    flex: 0.5,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    // shadowOpacity: 0.1,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartWrapper: {
    paddingHorizontal: 12,
    padding: 20,
    paddingBottom: 5,
  },
  yAxisTextStyle: {
    color: "#666",
    fontSize: 12,
    fontWeight: "400",
    margin:0,
    top:-10,
    fontFamily: PoppinsRegular,
  },
  xAxisLabelTextStyle: {
    color: "#666",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: PoppinsRegular,
    marginTop: 5,
    right: 15,
  },
  pieChartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  legendContainer: {
    marginLeft: 40,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    flex: 1,
    justifyContent: "space-between",
    width: helpers.wp(20),
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 20,
  },
  legendText: {
    fontSize: 14,
  },
  legendValue: {
    fontSize: 14,
  },
});

export default Dashboard;

// import { View, Text, ScrollView } from "react-native";
// import { BarChart, PieChart } from "react-native-gifted-charts";
// import helpers from "../../../utils/helpers";
// import { PoppinsRegular } from "../../../Resources/fonts";

// const Dashboard = () => {
//   const barData = [
//     { value: 5, label: "Mon", frontColor: "#b0dab9" },
//     { value: 7, label: "Tue", frontColor: "#b7b3e3" },
//     { value: 6, label: "Wed", frontColor: "#1a1a1a" },
//     { value: 11, label: "Thu", frontColor: "#add8e6" },
//     { value: 3, label: "Fri", frontColor: "#a3a3ff" },
//     { value: 2, label: "Sat", frontColor: "#8b5a2b" },
//     { value: 6, label: "Sun", frontColor: "#a0d7b4" },
//   ];

//   const pieData = [
//     { value: 38.6, color: "#4caf50", text: "Completed" },
//     { value: 22.5, color: "#ffeb3b", text: "Pending" },
//     { value: 30.8, color: "#f44336", text: "Failed" },
//     { value: 8.1, color: "#d9d9d9", text: "Refunded" },
//   ];
//   const CustomBar = ({ value, frontColor, barWidth }) => {
//     return (
//       <View
//         style={{
//           width: barWidth,
//           height: value,
//           backgroundColor: frontColor,
//           borderTopLeftRadius: 2, // Custom top-left radius
//           borderTopRightRadius: 2, // Custom top-right radius
//           borderBottomLeftRadius: 0, // Keep bottom sharp
//           borderBottomRightRadius: 0, // Keep bottom sharp
//         }}
//       />
//     );
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         // padding: 20,
//         // backgroundColor: "#f8f9fa",
//         flexDirection: "row",
//         // marginLeft: 20,
//         // padding:10,
//         // justifyContent: "space-between",
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: "#fff",
//           padding: 20,
//           borderRadius: 16,
//           // margin: 20,
//           shadowOpacity: 0.1,
//           paddingHorizontal: 0,
//           // paddingRight: 20,
//           flex: 0.5,
//           marginHorizontal: 10,
//           // marginRight:80,
//           // flex:1
//         }}
//       >
//         <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 25 }}>
//           Daily Total Hours Works
//         </Text>
//         <View style={{ paddingHorizontal: 12, padding: 20, paddingBottom: 5 }}>
//           <BarChart
//             // yAxisLabelWidth={100}
//             // endSpacing={100}
//             xAxisIndicesWidth={100}
//             labelsDistanceFromXaxis={1}
//             data={barData}
//             barWidth={14}
//             sideWidth={200}
//             // xAxisLength={100}
//             spacing={40}
//             // barBorderRadius={5}
//             // showValuesOnTopOfBars
//             // renderBar={(bar) => <CustomBar {...bar} />} // Custom bar rendering
//             // roundedTop
//             roundedTop
//             // roundedBottom
//             // yAxisThickness={1}
//             yAxisColor="#fff"
//             // xAxisThickness={1}
//             xAxisColor="#ddd"
//             noOfSections={4}
//             // isAnimated
//             // showValuesOnTopOfBars
//             // showGradient
//             // hideRules
//             yAxisLabelContainerStyle={{}}
//             yAxisTextStyle={{
//               color: "#666",
//               fontSize: 12,
//               fontWeigth: "400",
//               fontFamily: PoppinsRegular,
//             }}
//             xAxisLabelTextStyle={{
//               color: "#666",
//               fontSize: 12,
//               fontWeigth: "400",
//               fontFamily: PoppinsRegular,
//               marginTop: 5,
//               right: 15,
//             }}
//           />
//         </View>
//       </View>

//       <View
//         style={{
//           flex: 0.5,

//           backgroundColor: "#fff",
//           padding: 20,
//           // justifyContent: "center",
//           borderRadius: 10,
//           shadowOpacity: 0.1,
//         }}
//       >
//         <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
//           Payment Reports
//         </Text>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",

//             // backgroundColor: "red",
//           }}
//         >
//           <PieChart
//             data={pieData}
//             donut
//             radius={60}
//             innerRadius={40}
//             showValuesAsLabels={false}
//             showText={false}
//           />
// <View style={{ marginLeft: 40 }}>
//   {pieData.map((item, index) => (
//     <View
//       key={index}
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 5,
//         flex: 1,
//         justifyContent: "space-between",
//         width: helpers.wp(20),
//         // backgroundColor:'red'
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",

//           // justifyContent: "space-between",
//         }}
//       >
//         <View
//           style={{
//             width: 10,
//             height: 10,
//             backgroundColor: item.color,
//             borderRadius: 5,
//             marginRight: 20,
//           }}
//         />
//         <Text style={{ fontSize: 14 }}>{item.text} </Text>
//       </View>
//       <View>
//         <Text style={{ fontSize: 14 }}>{item.value}%</Text>
//       </View>
//     </View>
//   ))}
// </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Dashboard;
