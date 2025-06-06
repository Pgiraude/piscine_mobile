import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useGetLocation = () => {
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<Location.LocationObject | undefined>(
    undefined
  );
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const getLocation = async () => {
    try {
      if (!hasPermission) {
        setErrorMsg("Permission de localisation refusée");
        return undefined;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      setLocation(currentLocation);
      return currentLocation;
    } catch (error) {
      setErrorMsg("Erreur lors de l'obtention de la position");
    }
  };

  return { location, errorMsg, getLocation };
};

export default useGetLocation;
