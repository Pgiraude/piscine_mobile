import { Text, View } from "react-native";
import useStore from "@/store/useStore";
import React, { useEffect, useState } from "react";
import useGetCityWeather from "@/hooks/useGetCityWeather";
import { WeatherApiResponse } from "@/hooks/useGetCityByCoordinate";

const Index = () => {
  const searchText = useStore((state) => state.searchText);
  const isGeoError = useStore((state) => state.isGeoError);
  const cityInfos = useStore((state) => state.cityInfos);

  const [weather, setWeather] = useState<WeatherApiResponse | undefined>(
    undefined
  );

  const { fetchCityWeather } = useGetCityWeather();

  const {
    name = "",
    admin1 = "",
    country = "",
    latitude,
    longitude,
  } = cityInfos || {};

  const fetchWeather = async () => {
    if (longitude && latitude) {
      const res = await fetchCityWeather(longitude, latitude);
      setWeather(res);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [cityInfos]);

  // useEffect(() => {
  //   if (longitude && latitude) {
  //     const res = fetchCityWeather(longitude, latitude);
  //     console.log("res", res);
  //   }
  // }, [longitude, latitude, fetchCityWeather]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isGeoError ? (
        <Text style={{ color: "red" }}>{searchText}</Text>
      ) : (
        <>
          <Text>Current</Text>
          <Text>{name}</Text>
          <Text>{admin1}</Text>
          <Text>{country}</Text>
          <Text>{weather?.hourly?.temperature_2m[0]}</Text>
        </>
      )}
    </View>
  );
};

export default Index;
