import { searchCityByCoordinate, searchCityByName } from "@/api/getCities";
import { searchWeatherByCoordinate } from "@/api/getWeather";
import { useState } from "react";
import { City } from "./useCityAutocomplete";

export type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
    // Ajoute d'autres champs si besoin (ex: humidity, wind, etc.)
  };
  hourly_units: {
    temperature_2m: string;
    // Ajoute d'autres unités si besoin
  };
};

const useGetCityByCoordinate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchCityByCoordinate = async (longitude: number, latitude: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await searchCityByCoordinate(longitude, latitude);
      const address = res?.address;
      const cityName =
        address?.city ||
        address?.town ||
        address?.village ||
        address?.county ||
        address?.state;
      if (cityName) {
        const city = await searchCityByName(cityName);
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

  return { loading, error, fetchCityByCoordinate };
};

export default useGetCityByCoordinate;
