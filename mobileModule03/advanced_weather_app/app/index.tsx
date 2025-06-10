import { Text, View, StyleSheet } from "react-native";
import useStore from "@/store/useStore";
import React from "react";
import useGetCityWeather from "@/hooks/useGetCityWeather";
import { weatherCodeToDescription } from "@/utils/weatherCodeDescriptions";
import ErrorDisplay from "@/components/ErrorDisplay";
import { CityInfosStatusEnum } from "@/type/city.type";

const Index = () => {
  const cityInfos = useStore((state) => state.cityInfos);

  const { name, admin1, country, latitude, longitude, timezone } =
    cityInfos?.data || {};

  const { error, data } = useGetCityWeather(longitude, latitude, timezone);
  const { current } = data || {};

  if (cityInfos && cityInfos?.status !== CityInfosStatusEnum.SUCCESS) {
    return <ErrorDisplay errorMessage={cityInfos?.status} />;
  }

  const hasErrorAPI = !!error;
  const hasCityInfos = !!cityInfos;

  return (
    <View style={styles.container}>
      <Text>Current</Text>
      {hasCityInfos && (
        <>
          <Text>{name}</Text>
          {admin1 && <Text>{admin1}</Text>}
          {country && <Text>{country}</Text>}
          {latitude && <Text>latitude: {latitude}</Text>}
          {longitude && <Text>longitude: {longitude}</Text>}
          {hasErrorAPI ? (
            <ErrorDisplay errorMessage={CityInfosStatusEnum.API_ERROR} />
          ) : (
            <>
              <Text>{current?.temperature} °C</Text>
              <Text>{weatherCodeToDescription(current?.weathercode)}</Text>
              <Text>{current?.windspeed} km/h</Text>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
