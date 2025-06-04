import { PERMISSION_DENIED } from "@/constants/geoloc";
import useGetCityByCoordinate from "@/hooks/useGetCityByCoordinate";
import useLocation from "@/hooks/useLocation";
import useStore from "@/store/useStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";

const GeolocButton = () => {
  const setSearchText = useStore((state) => state.setSearchText);
  const setIsGeoError = useStore((state) => state.setIsGeoError);
  const { fetchCityByCoordinate } = useGetCityByCoordinate();
  const location = useLocation();

  const handleGeolocation = async () => {
    const myLocation = await location.getLocation();
    if (myLocation) {
      const latitude = myLocation?.coords.latitude;
      const longitude = myLocation?.coords.longitude;
      setIsGeoError(false);
      const result = await fetchCityByCoordinate(longitude, latitude);
      if (result) {
        setSearchText(result.name);
      } else {
        setSearchText("Not Found");
      }
    } else {
      setIsGeoError(true);
      setSearchText(PERMISSION_DENIED);
    }
  };

  return (
    <Pressable
      onPress={handleGeolocation}
      style={{
        width: 40,
        height: 40,
        backgroundColor: "#007AFF",
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
