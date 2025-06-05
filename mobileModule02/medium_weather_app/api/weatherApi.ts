type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  current_weather: {
    interval: number;
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  };
  current_weather_units: {
    interval: string;
    is_day: string;
    temperature: string;
    time: string;
    weathercode: string;
    winddirection: string;
    windspeed: string;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    weathercode: number[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
    time: string;
    weathercode: string;
  };
  hourly: {
    temperature_2m: number[];
    time: string[];
    weathercode: number[];
    windspeed_10m: number[];
  };
  hourly_units: {
    temperature_2m: string;
    time: string;
    weathercode: string;
    windspeed_10m: string;
  };
};

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
