import useStore from "@/store/useStore";
import { Text, View } from "react-native";
import React from "react";
import useGetCityWeather from "@/hooks/useGetCityWeather";
import ErrorDisplay from "@/components/ErrorDisplay";
import { CityInfosStatusEnum } from "@/type/city.type";
import customStyles from "@/styles/styles";
import { Feather } from "@expo/vector-icons";
import WeatherChart from "@/components/WeatherChart";
import ScrollWeatherItems from "@/components/ScrollWeatherItems";
import WeatherItem from "@/components/WeatherItem";
import PageTitle from "@/components/PageTitle";

const Today = () => {
  const cityInfos = useStore((state) => state.cityInfos);

  const { name, admin1, country, latitude, longitude, timezone } =
    cityInfos?.data || {};

  const { data, error } = useGetCityWeather(longitude, latitude, timezone);
  const { hourly } = data || {};

  const LineChartData = hourly
    ?.map((h) => ({
      value: h.temperature,
      label: h.time.slice(11, 16),
    }))
    .filter((_, index) => index % 3 === 0);

  if (cityInfos && cityInfos?.status !== CityInfosStatusEnum.SUCCESS) {
    return (
      <View style={customStyles.container}>
        <ErrorDisplay errorMessage={cityInfos?.status} />
      </View>
    );
  }

  const hasErrorAPI = !!error;
  const hasCityInfos = !!cityInfos;

  return (
    <View style={customStyles.container}>
      {hasCityInfos && (
        <>
          <PageTitle city={name ?? ""} region={admin1} country={country} />
          {hasErrorAPI ? (
            <ErrorDisplay errorMessage={CityInfosStatusEnum.API_ERROR} />
          ) : (
            <>
              <WeatherChart data={LineChartData || []} />
              <ScrollWeatherItems>
                {hourly &&
                  hourly.map((h, idx) => (
                    <WeatherItem
                      key={idx}
                      idx={idx}
                      title={h.time.slice(11, 16)}
                      subtitle={`${h.temperature}°C`}
                      weatherCode={h.weathercode}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Feather name="wind" size={18} color="#023047" />
                        <Text style={{ marginLeft: 4 }}>
                          {h.windspeed} km/h
                        </Text>
                      </View>
                    </WeatherItem>
                  ))}
              </ScrollWeatherItems>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Today;
