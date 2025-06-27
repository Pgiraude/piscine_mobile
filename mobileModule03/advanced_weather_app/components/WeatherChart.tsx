import customStyles from "@/styles/styles";
import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-gifted-charts";

type WeatherChartProps = {
  data: {
    value: number;
    label: string;
  }[];
  data2?: {
    value: number;
    label: string;
  }[];
  color1?: string;
  color2?: string;
  legend1?: string;
  legend2?: string;
};

const WeatherChart = (props: WeatherChartProps) => {
  const { data, data2, color1, color2, legend1, legend2 } = props;
  const { width } = useWindowDimensions();

  const chartWidth = width - 100;

  return (
    <View style={customStyles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={{ width: chartWidth, maxHeight: 300 }}>
          <LineChart
            textShiftY={10}
            textShiftX={10}
            yAxisLabelSuffix="°C"
            nestedScrollEnabled
            height={150}
            width={chartWidth}
            noOfSections={10}
            hideRules
            scrollAnimation
            focusEnabled
            showTextOnFocus
            animateOnDataChange
            animationDuration={1000}
            onDataChangeAnimationDuration={300}
            initialSpacing={20}
            spacing={50}
            hideDataPoints
            thickness={5}
            xAxisLabelTextStyle={{ color: "rgba(255, 130, 67, 1)" }}
            yAxisTextStyle={{
              color: "rgba(255, 130, 67, 1)",
            }}
            yAxisColor="rgba(255, 130, 67, 1)"
            showVerticalLines
            verticalLinesColor="rgba(255, 130, 67, 0.5)"
            xAxisColor="rgba(255, 130, 67, 1)"
            color="rgba(255, 130, 67, 1)"
            data={data}
            data2={data2}
            color1={color1}
            color2={color2}
          />
          {(legend1 || legend2) && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                gap: 15,
              }}
            >
              {legend1 && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 15,
                      height: 2,
                      backgroundColor: color1 || "#0BA5A4",
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{ fontSize: 15, color: "rgba(255, 130, 67, 1)" }}
                  >
                    {legend1}
                  </Text>
                </View>
              )}
              {legend2 && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 15,
                      height: 2,
                      backgroundColor: color2 || "#FF6B6B",
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "rgba(255, 130, 67, 1)",
                    }}
                  >
                    {legend2}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default WeatherChart;
