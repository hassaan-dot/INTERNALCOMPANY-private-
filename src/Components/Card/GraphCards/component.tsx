// import { View, Text, StyleSheet } from "react-native";
// import { BarChart, PieChart } from "react-native-gifted-charts";
// import helpers from "../../../utils/helpers";
// import { PoppinsRegular } from "../../../Resources/fonts";
// import { useGetUserWorkingHours, useGetAssignedPOStats } from "@/hooks/useUser";
// import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";

// const GraphCards = ({ id }: any) => {
//   const { data: working_hours = [], refetch: refetch_hours } =
//     useGetUserWorkingHours(id);
//   const { data: po_stats, refetch: refetchStats } = useGetAssignedPOStats(id);
//   useRefreshOnFocus(refetch_hours);
//   useRefreshOnFocus(refetchStats);

//   const maxValue = Math.min(
//     24,
//     Math.max(...working_hours.map((item) => item.value || 0))
//   );

//   const roundTo = maxValue > 10 ? 5 : 1;
//   const roundedMax = Math.ceil(maxValue / roundTo) * roundTo;
//   let noOfSections = 5;
//   let stepValue = Math.ceil(roundedMax / noOfSections);
//   if (stepValue * noOfSections < roundedMax) {
//     stepValue += 1;
//   }
//   noOfSections = Math.ceil(roundedMax / stepValue);

//   return (
//     <View style={styles.container}>
//       <View style={styles.barChartContainer}>
//         <Text style={styles.chartTitle}>Daily Total Hours Works</Text>
//         <View style={styles.chartWrapper}>
//           <BarChart
//             noOfSections={noOfSections}
//             stepValue={stepValue}
//             formatYLabel={(label: string) => parseInt(label).toString()}
//             data={working_hours}
//             barWidth={14}
//             renderTooltip={(item, index) => {
//               return (
//                 <View
//                   style={{
//                     // marginBottom: 20,
//                     marginLeft: -6,
//                     position: "relative",
//                     // margin: 10,

//                     backgroundColor: item?.frontColor,
//                     paddingHorizontal: 6,
//                     paddingVertical: 2,
//                     borderRadius: 4,
//                   }}
//                 >
//                   <Text style={{ color: "#fff", fontSize: 12 }}>
//                     {item?.value?.toFixed(1)}
//                   </Text>
//                 </View>
//               );
//             }}
//             isAnimated
//             xAxisIndicesWidth={40}
//             spacing={40}
//             roundedTop
//             yAxisColor="#fff"
//             xAxisColor="#ddd"
//             yAxisTextStyle={styles.yAxisTextStyle}
//             xAxisLabelTextStyle={styles.xAxisLabelTextStyle}
//           />
//         </View>
//       </View>

//       <View style={styles.pieChartContainer}>
//         <Text style={styles.chartTitle}>PO Assignment Report</Text>
//         <View style={styles.pieChartWrapper}>
//           <View style={{ marginRight: 30 }}>
//             <PieChart
//               data={po_stats ?? []}
//               donut
//               radius={70}
//               innerRadius={50}
//               showValuesAsLabels={false}
//               showText={false}
//             />
//           </View>

//           <View style={{ marginLeft: 40 }}>
//             {po_stats?.map((item: any, index: number) => (
//               <View
//                 key={index}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginBottom: 5,
//                   flex: 1,
//                   justifyContent: "space-between",
//                   width: helpers.wp(20),
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "flex-between",
//                     marginBottom: 10,
//                   }}
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       alignItems: "center",
//                       flex: 1,
//                       width: helpers.wp(15),
//                     }}
//                   >
//                     <View
//                       style={{
//                         width: 10,
//                         height: 10,
//                         backgroundColor: item.color,
//                         borderRadius: 5,
//                         marginRight: 20,
//                       }}
//                     />
//                     <Text style={{ fontSize: 14 }}>{item?.text} </Text>
//                   </View>
//                   <View>
//                     <Text style={{ fontSize: 14 }}>
//                       {isNaN(item?.percentage) ? 0 : item?.percentage}%
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   barChartContainer: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 16,
//     flex: 0.5,
//     marginRight: 20,
//   },
//   pieChartContainer: {
//     flex: 0.5,
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 16,
//   },
//   chartTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   chartWrapper: {
//     paddingHorizontal: 12,
//     padding: 20,
//     paddingBottom: 5,
//   },
//   yAxisTextStyle: {
//     color: "#666",
//     fontSize: 12,
//     fontWeight: "400",
//     margin: 0,
//     top: -10,
//     fontFamily: PoppinsRegular,
//   },
//   xAxisLabelTextStyle: {
//     color: "#666",
//     fontSize: 12,
//     fontWeight: "400",
//     fontFamily: PoppinsRegular,
//     marginTop: 5,
//   },
//   pieChartWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 70,
//   },
//   legendContainer: {
//     marginLeft: 40,
//   },
//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//     flex: 1,
//     justifyContent: "space-between",
//     width: helpers.wp(20),
//   },
//   legendColor: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 20,
//   },
//   legendText: {
//     fontSize: 14,
//   },
//   legendValue: {
//     fontSize: 14,
//   },
// });

// export default GraphCards;
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";
import { useGetUserWorkingHours, useGetAssignedPOStats } from "@/hooks/useUser";
import { useRefreshOnFocus } from "@/hooks/useRefetchOnFocus";

type GraphCardsProps = {
  id: number | string;
};

type BarChartItem = {
  value: number;
  label?: string;
  frontColor?: string;
};

type PieChartItem = {
  value: number;
  color: string;
  text: string;
  percentage: number;
};

const GraphCards: React.FC<GraphCardsProps> = ({ id }) => {
  const { data: working_hours = [], refetch: refetch_hours } =
    useGetUserWorkingHours(id);
  const { data: po_stats = [], refetch: refetchStats } =
    useGetAssignedPOStats(id);

  useRefreshOnFocus(refetch_hours);
  useRefreshOnFocus(refetchStats);

  const maxValue = Math.min(
    24,
    Math.max(
      ...(working_hours?.map((item: BarChartItem) => item.value || 0) ?? [])
    )
  );

  const roundTo = maxValue > 10 ? 5 : 1;
  const roundedMax = Math.ceil(maxValue / roundTo) * roundTo;
  let noOfSections = 5;
  let stepValue = Math.ceil(roundedMax / noOfSections);
  if (stepValue * noOfSections < roundedMax) {
    stepValue += 1;
  }
  noOfSections = Math.ceil(roundedMax / stepValue);

  return (
    <View style={styles.container}>
      <View style={styles.barChartContainer}>
        <Text style={styles.chartTitle}>Daily Total Hours Works</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            noOfSections={noOfSections}
            stepValue={stepValue}
            formatYLabel={(label: string) => parseInt(label).toString()}
            data={working_hours}
            barWidth={14}
            renderTooltip={(item: BarChartItem, index: number) => {
              return (
                <View
                  style={{
                    marginLeft: -6,
                    position: "relative",
                    backgroundColor: item?.frontColor,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 12 }}>
                    {item?.value?.toFixed(1)}
                  </Text>
                </View>
              );
            }}
            isAnimated
            xAxisIndicesWidth={40}
            spacing={40}
            roundedTop
            yAxisColor="#fff"
            xAxisColor="#ddd"
            yAxisTextStyle={styles.yAxisTextStyle}
            xAxisLabelTextStyle={styles.xAxisLabelTextStyle}
          />
        </View>
      </View>

      <View style={styles.pieChartContainer}>
        <Text style={styles.chartTitle}>PO Assignment Report</Text>
        <View style={styles.pieChartWrapper}>
          <View style={{ marginRight: 30 }}>
            <PieChart
              data={po_stats}
              donut
              radius={70}
              innerRadius={50}
              showValuesAsLabels={false}
              showText={false}
            />
          </View>

          <View style={{ marginLeft: 40 }}>
            {po_stats.map((item: PieChartItem, index: number) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: helpers.wp(15),
                  }}
                >
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.legendText}>{item.text}</Text>
                </View>
                <Text style={styles.legendValue}>
                  {isNaN(item.percentage) ? 0 : item.percentage}%
                </Text>
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
    flex: 0.5,
    marginRight: 20,
  },
  pieChartContainer: {
    flex: 0.5,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
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
    margin: 0,
    top: -10,
    fontFamily: PoppinsRegular,
  },
  xAxisLabelTextStyle: {
    color: "#666",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: PoppinsRegular,
    marginTop: 5,
  },
  pieChartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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

export default GraphCards;
