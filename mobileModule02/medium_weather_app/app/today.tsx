import useStore from "@/store/useStore";
import { Text, View, ScrollView } from "react-native";
import React from "react";
import useGetCityWeather from "@/hooks/useGetCityWeather";
import { weatherCodeToDescription } from "@/utils/weatherCodeDescriptions";
import ErrorDisplay from "@/components/ErrorDisplay";
import { CityInfosStatusEnum } from "@/type/city.type";

const Today = () => {
  const cityInfos = useStore((state) => state.cityInfos);

  const { name, admin1, country, latitude, longitude, timezone } =
    cityInfos?.data || {};

  const { data, error } = useGetCityWeather(longitude, latitude, timezone);
  const { hourly } = data || {};

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
      <Text>Today</Text>
      {hasCityInfos && (
        <>
          <Text>{name}</Text>
          {admin1 && <Text>{admin1}</Text>}
          {country && <Text>{country}</Text>}
          {hasErrorAPI ? (
            <ErrorDisplay errorMessage={CityInfosStatusEnum.API_ERROR} />
          ) : (
            <ScrollView style={{ width: "100%" }}>
              {hourly &&
                hourly.map((h, idx) => (
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
                    <Text style={{ width: 80 }}>{h.time.slice(11, 16)}</Text>
                    <Text style={{ width: 60 }}>{h.temperature}°C</Text>
                    <Text style={{ width: 120 }}>
                      {weatherCodeToDescription(h.weathercode)}
                    </Text>
                    <Text style={{ width: 80 }}>{h.windspeed} km/h</Text>
                  </View>
                ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default Today;
