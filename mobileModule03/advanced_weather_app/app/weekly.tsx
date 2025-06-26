import useStore from "@/store/useStore";
import { Text, View, ScrollView } from "react-native";
import React from "react";
import useGetCityWeather from "@/hooks/useGetCityWeather";
import {
  getWeatherIcon,
  weatherCodeToDescription,
} from "@/utils/weatherCodeDescriptions";
import ErrorDisplay from "@/components/ErrorDisplay";
import { CityInfosStatusEnum } from "@/type/city.type";
import customStyles from "@/styles/styles";
import WeatherChart from "@/components/WeatherChart";
import ScrollWeatherItems from "@/components/ScrollWeatherItems";
import WeatherItem from "@/components/WeatherItem";
import PageTitle from "@/components/PageTitle";

const Weekly = () => {
  const cityInfos = useStore((state) => state.cityInfos);

  const { name, admin1, country, latitude, longitude, timezone } =
    cityInfos?.data || {};

  const { error, data } = useGetCityWeather(longitude, latitude, timezone);
  const { daily } = data || {};

  if (cityInfos && cityInfos?.status !== CityInfosStatusEnum.SUCCESS) {
    return (
      <View style={customStyles.container}>
        <ErrorDisplay errorMessage={cityInfos?.status} />
      </View>
    );
  }

  const tempMaxData = daily?.map((d) => ({
    value: d.temp_max,
    label: d.date.slice(5, 10),
  }));

  const tempMinData = daily?.map((d) => ({
    value: d.temp_min,
    label: d.date.slice(5, 10),
  }));

  const hasErrorAPI = !!error;
  const hasCityInfos = !!cityInfos;

  return (
    <View style={customStyles.container}>
      {hasCityInfos && (
        <>
          <PageTitle city={name} region={admin1} country={country} />

          {hasErrorAPI ? (
            <ErrorDisplay errorMessage={CityInfosStatusEnum.API_ERROR} />
          ) : (
            <>
              <WeatherChart
                data={tempMaxData || []}
                data2={tempMinData || []}
                color1="orange"
                color2="blue"
                legend1="Max"
                legend2="Min"
              />
              <ScrollWeatherItems>
                {daily &&
                  daily.map((h, idx) => (
                    <WeatherItem
                      key={idx}
                      idx={idx}
                      title={h.date.slice(5, 10)}
                      weatherCode={h.weathercode}
                    >
                      <Text style={{ color: "orange" }}>{h.temp_max}°C</Text>
                      <Text style={{ color: "blue" }}>{h.temp_min}°C</Text>
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

export default Weekly;
