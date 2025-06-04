import { searchWeatherByCoordinate } from "@/api/getWeather";
import { useState } from "react";

const useGetCityWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchCityWeather = async (longitude: number, latitude: number) => {
    setLoading(true);
    try {
      const res = await searchWeatherByCoordinate(longitude, latitude);
      console.log("res***********PPPPPPPP", res);
      return res;
    } catch {
      setError("Erreur lors de la recherche");
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchCityWeather };
};

export default useGetCityWeather;
