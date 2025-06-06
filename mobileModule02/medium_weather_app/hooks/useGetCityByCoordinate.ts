import { fetchCitiesByName, fetchCityByCoordinate } from "@/api/cityApi";

import { useState } from "react";

const useGetCityByCoordinate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const getCityByCoordinate = async (longitude: number, latitude: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetchCityByCoordinate(longitude, latitude);
      const address = res?.address;
      const cityName =
        address?.city ||
        address?.town ||
        address?.village ||
        address?.county ||
        address?.state;
      if (cityName) {
        const city = await fetchCitiesByName(cityName);
        if (Array.isArray(city) && city.length > 0) {
          return city[0];
        }
      }
      setError("Aucune ville trouvée");
      return undefined;
    } catch {
      setError("Erreur lors de la recherche");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getCityByCoordinate };
};

export default useGetCityByCoordinate;
