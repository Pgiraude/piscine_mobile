export type WeatherApiResponse = {
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
