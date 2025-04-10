import { View, Text, StyleSheet } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import helpers from "../../../utils/helpers";
import { PoppinsRegular } from "../../../Resources/fonts";
import { useGetUserWorkingHours, useGetAssignedPOStats } from "@/hooks/useUser";

const GraphCards = ({ id }: any) => {
  const { data: working_hours } = useGetUserWorkingHours(id);
  const { data: po_stats } = useGetAssignedPOStats(id);
  console.log("po_stats", po_stats);
  return (
    <View style={styles.container}>
      <View style={styles.barChartContainer}>
        <Text style={styles.chartTitle}>Daily Total Hours Works</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            noOfSections={4}
            stepValue={2}
            formatYLabel={(label: string) => parseInt(label).toString()}
            data={working_hours}
            barWidth={14}
            renderTooltip={(item, index) => {
              return (
                <View
                  style={{
                    marginBottom: 20,
                    marginLeft: -6,
                    backgroundColor: item?.frontColor,
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text>{item.value}</Text>
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
              data={po_stats ?? []}
              donut
              radius={70}
              innerRadius={50}
              showValuesAsLabels={false}
              showText={false}
            />
          </View>

          <View style={{ marginLeft: 40 }}>
            {po_stats?.map((item: any, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                  flex: 1,
                  justifyContent: "space-between",
                  width: helpers.wp(20),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-between",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                      width: helpers.wp(15),
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
                    <Text style={{ fontSize: 14 }}>{item?.text} </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 14 }}>
                      {isNaN(item?.percentage) ? 0 : item?.percentage}%
                    </Text>
                  </View>
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
    marginRight: 20,
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
    margin: 0,
    top: -10,
    // paddingRight: 25,
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

export default GraphCards;
