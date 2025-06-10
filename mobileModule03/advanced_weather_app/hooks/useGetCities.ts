import { fetchCitiesByName } from "@/api/cityApi";
import { City } from "@/type/city.type";
import { useState } from "react";

const useGetCities = () => {
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchCities = async (cityName: string) => {
    setLoading(true);
    try {
      const res = await fetchCitiesByName(cityName);
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

export default useGetCities;
