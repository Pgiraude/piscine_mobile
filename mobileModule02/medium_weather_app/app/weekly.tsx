import useStore from "@/store/useStore";
import { Text, View, ScrollView } from "react-native";
import React from "react";
import useGetCityWeather from "@/hooks/useGetCityWeather";
import { weatherCodeToDescription } from "@/utils/weatherCodeDescriptions";
import ErrorDisplay from "@/components/ErrorDisplay";
import { CityInfosStatusEnum } from "@/type/city.type";

const Weekly = () => {
  const cityInfos = useStore((state) => state.cityInfos);

  const {
    name = "",
    admin1 = "",
    country = "",
    latitude = 0,
    longitude = 0,
    timezone = "",
  } = cityInfos?.data || {};

  const { error, data } = useGetCityWeather(longitude, latitude, timezone);
  const { daily } = data || {};

  if (cityInfos && cityInfos?.status !== CityInfosStatusEnum.SUCCESS) {
    return <ErrorDisplay errorMessage={cityInfos?.status} />;
  }

  const hasErrorAPI = !!error;
  const hasCityInfos = !!cityInfos;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Weekly</Text>
      {hasCityInfos && (
        <>
          <Text>{name}</Text>
          <Text>{admin1}</Text>
          <Text>{country}</Text>
          {hasErrorAPI ? (
            <ErrorDisplay errorMessage={CityInfosStatusEnum.API_ERROR} />
          ) : (
            <ScrollView style={{ width: "100%" }}>
              {daily &&
                daily.map((d, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 8,
                      borderBottomWidth: 1,
                      borderColor: "#eee",
                    }}
                  >
                    <Text style={{ width: 100 }}>{d.date}</Text>
                    <Text style={{ width: 80 }}>Min: {d.temp_min}°C</Text>
                    <Text style={{ width: 80 }}>Max: {d.temp_max}°C</Text>
                    <Text style={{ width: 120 }}>
                      {weatherCodeToDescription(d.weathercode)}
                    </Text>
                  </View>
                ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default Weekly;
