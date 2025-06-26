import { Text, View } from "react-native";
import useStore from "@/store/useStore";
import React from "react";
import useGetCityWeather from "@/hooks/useGetCityWeather";
import {
  getWeatherIcon,
  weatherCodeToDescription,
} from "@/utils/weatherCodeDescriptions";
import ErrorDisplay from "@/components/ErrorDisplay";
import { CityInfosStatusEnum } from "@/type/city.type";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import customStyles from "@/styles/styles";
import PageTitle from "@/components/PageTitle";
import Welcome from "@/components/Welcome";

const Index = () => {
  const cityInfos = useStore((state) => state.cityInfos);

  const { name, admin1, country, latitude, longitude, timezone } =
    cityInfos?.data || {};

  const { error, data } = useGetCityWeather(longitude, latitude, timezone);
  const { current } = data || {};

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
      {hasCityInfos ? (
        <View style={customStyles.card}>
          <PageTitle city={name} region={admin1} country={country} />
        </View>
      ) : (
        <Welcome />
      )}
      {hasErrorAPI ? (
        <ErrorDisplay errorMessage={CityInfosStatusEnum.API_ERROR} />
      ) : (
        current && (
          <View style={customStyles.card}>
            <View style={customStyles.infoLine}>
              <FontAwesome6
                name="temperature-full"
                size={30}
                color="rgba(255, 130, 67, 1)"
              />
              <Text style={customStyles.temp}>{current?.temperature} °C</Text>
            </View>
            <View style={customStyles.infoLine}>
              <Feather name="wind" size={30} color="rgba(255, 130, 67, 1)" />
              <Text style={customStyles.value}>{current?.windspeed} km/h</Text>
            </View>
            <View style={customStyles.infoLine}>
              {getWeatherIcon(current?.weathercode)}
              <Text style={customStyles.weather}>
                {weatherCodeToDescription(current?.weathercode)}
              </Text>
            </View>
            <View style={customStyles.infoLine}>
              <Text style={customStyles.label}>Longitude</Text>
              <Text style={customStyles.value}>{longitude}</Text>
            </View>
            <View style={customStyles.infoLine}>
              <Text style={customStyles.label}>Latitude</Text>
              <Text style={customStyles.value}>{latitude}</Text>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Index;
