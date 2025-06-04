import { searchCityByName } from "@/api/getCities";
import { useState } from "react";

export type City = {
  id: number;
  name: string;
  country_code: string;
  latitude: number;
  longitude: number;
  country: string;
  timezone?: string;
  population?: number;
  postcodes?: string[];
  country_id?: number;
  admin1?: string;
  admin2?: string;
  admin3?: string;
};

const useCityAutocomplete = () => {
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchCities = async (cityName: string) => {
    setLoading(true);
    try {
      const res = await searchCityByName(cityName);
      setResults(res);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erreur lors de la recherche");
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, fetchCities };
};

export default useCityAutocomplete;
