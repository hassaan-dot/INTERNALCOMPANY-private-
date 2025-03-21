import { DimensionValue, View } from "react-native";

interface GridViewProps {
  data: any[];
  renderItem(item: any): JSX.Element;
  col?: number;
}

const GridView = (props: GridViewProps) => {
  const { data, col = 2, renderItem } = props;
  return (
    <View className="w-full flex-row flex-wrap">
      {data?.map((item, index) => {
        const width = `${100 / col}%` as DimensionValue;
        return (
          <View key={index} style={{ width }}>
            <View className="p-1">{renderItem(item)}</View>
          </View>
        );
      })}
    </View>
  );
};

export default GridView;
