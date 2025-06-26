import useGetCityByCoordinate from "@/hooks/useGetCityByCoordinate";
import useGetLocation from "@/hooks/useGetLocation";
import useStore from "@/store/useStore";
import { CityInfosStatusEnum } from "@/type/city.type";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { Pressable } from "react-native";

const GeolocButton = () => {
  const setCityInfos = useStore((state) => state.setCityInfos);
  const { getCityByCoordinate, error: errorCity } = useGetCityByCoordinate();
  const { getLocation, errorMsg: errorLocation } = useGetLocation();

  useEffect(() => {
    if (errorCity || errorLocation) {
      setCityInfos({ data: undefined, status: CityInfosStatusEnum.API_ERROR });
    }
  }, [errorCity, errorLocation]);

  const handleGeolocation = async () => {
    const myLocation = await getLocation();
    if (myLocation) {
      const latitude = myLocation?.coords.latitude;
      const longitude = myLocation?.coords.longitude;
      const result = await getCityByCoordinate(longitude, latitude);
      if (result) {
        setCityInfos({ data: result, status: CityInfosStatusEnum.SUCCESS });
      } else {
        setCityInfos({
          data: undefined,
          status: CityInfosStatusEnum.NOT_FOUND,
        });
      }
    } else {
      setCityInfos({
        data: undefined,
        status: CityInfosStatusEnum.GEOLOCATION_ERROR,
      });
    }
  };

  return (
    <Pressable
      onPress={handleGeolocation}
      style={{
        width: 40,
        height: 40,
        backgroundColor: "rgba(255, 130, 67, 1)",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialIcons name="my-location" size={24} color="white" />
    </Pressable>
  );
};

export default GeolocButton;
