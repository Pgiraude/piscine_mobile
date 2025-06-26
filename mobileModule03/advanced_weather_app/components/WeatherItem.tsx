import customStyles from "@/styles/styles";
import {
  getWeatherIcon,
  weatherCodeToDescription,
} from "@/utils/weatherCodeDescriptions";
import { View, Text } from "react-native";

type WeatherItemProps = {
  title: string;
  subtitle?: string;
  weatherCode: number;
  idx?: number;
  children: React.ReactNode;
};

const WeatherItem = (props: WeatherItemProps) => {
  const { children, idx, title, subtitle, weatherCode } = props;

  return (
    <View
      key={idx}
      style={{
        marginRight: 8,
        padding: 8,
        borderRadius: 10,
        backgroundColor: "rgba(107, 79, 155, 1)",
        alignItems: "center",
        borderWidth: 1,
        width: 180,
        minWidth: 180,
        gap: 2,
      }}
    >
      <Text style={customStyles.city}>{title}</Text>
      {subtitle && <Text style={customStyles.region}>{subtitle}</Text>}
      {getWeatherIcon(weatherCode)}
      <Text style={{ color: "white" }}>
        {weatherCodeToDescription(weatherCode)}
      </Text>
      {children}
    </View>
  );
};

export default WeatherItem;
