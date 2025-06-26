import { fetchWeather } from "@/api/weatherApi";
import { useEffect, useState } from "react";

type HourlyWeather = {
  time: string;
  temperature: number;
  weathercode: number;
  windspeed: number;
};

type DailyWeather = {
  date: string;
  temp_max: number;
  temp_min: number;
  weathercode: number;
};

type WeatherInfos = {
  current: any;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

const parseHourlyWeather = (res: any): HourlyWeather[] => {
  const { time, temperature_2m, weathercode, windspeed_10m } = res.hourly;
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  return time
    .map((t: string, i: number) => ({
      time: t,
      temperature: temperature_2m[i],
      weathercode: weathercode[i],
      windspeed: windspeed_10m[i],
    }))
    .filter((weather: HourlyWeather) => {
      if (weather.time.startsWith(today)) return true;
      if (
        weather.time.startsWith(tomorrowStr) &&
        weather.time.slice(11, 16) === "00:00"
      )
        return true;
      return false;
    });
};

const parseDailyWeather = (res: any): DailyWeather[] => {
  const { time, temperature_2m_max, temperature_2m_min, weathercode } =
    res.daily;
  return time.map((date: string, i: number) => ({
    date,
    temp_max: temperature_2m_max[i],
    temp_min: temperature_2m_min[i],
    weathercode: weathercode[i],
  }));
};

const useGetCityWeather = (
  longitude: number | undefined,
  latitude: number | undefined,
  timezone: string | undefined
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<WeatherInfos | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (longitude && latitude && timezone) {
        setLoading(true);
        setError(undefined);
        try {
          const res = await fetchWeather(longitude, latitude, timezone);
          const hourly = parseHourlyWeather(res);
          const daily = parseDailyWeather(res);
          setData({
            current: res.current_weather,
            hourly,
            daily,
          });
        } catch {
          setError("Erreur lors de la recherche");
          setData(undefined);
        } finally {
          setLoading(false);
        }
      } else {
        setData(undefined);
      }
    };
    fetchData();
  }, [longitude, latitude, timezone]);

  return { data, loading, error };
};

export default useGetCityWeather;
