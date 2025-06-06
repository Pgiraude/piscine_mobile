import { WeatherApiResponse } from "@/type/weather.type";

export const fetchWeather = async (
  longitude: number,
  latitude: number,
  timezone: string
): Promise<WeatherApiResponse> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    latitude.toString()
  )}&longitude=${encodeURIComponent(
    longitude.toString()
  )}&hourly=temperature_2m,weathercode,windspeed_10m&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${encodeURIComponent(
    timezone
  )}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Erreur lors de la récupération des données de weather forecast"
    );
  }
  const data = await response.json();

  return data;
};
