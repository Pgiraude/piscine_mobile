import { WeatherApiResponse } from "@/hooks/useGetCityByCoordinate";

export const searchWeatherByCoordinate = async (
  longitude: number,
  latitude: number
): Promise<WeatherApiResponse> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    latitude.toString()
  )}&longitude=${encodeURIComponent(
    longitude.toString()
  )}&hourly=temperature_2m`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des données de weather forecast"
    );
  }
  const data = await response.json();

  return data;
};
