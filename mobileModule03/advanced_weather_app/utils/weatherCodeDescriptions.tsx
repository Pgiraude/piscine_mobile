import { JSX } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export const weatherCodeDescriptions: Record<number, string> = {
  0: "Ciel dégagé",
  1: "Principalement dégagé",
  2: "Partiellement nuageux",
  3: "Couvert",
  45: "Brouillard",
  48: "Brouillard givrant",
  51: "Bruine faible",
  53: "Bruine modérée",
  55: "Bruine forte",
  56: "Bruine verglaçante faible",
  57: "Bruine verglaçante forte",
  61: "Pluie faible",
  63: "Pluie modérée",
  65: "Pluie forte",
  66: "Pluie verglaçante faible",
  67: "Pluie verglaçante forte",
  71: "Chute de neige faible",
  73: "Chute de neige modérée",
  75: "Chute de neige forte",
  77: "Grains de neige",
  80: "Averses de pluie faibles",
  81: "Averses de pluie modérées",
  82: "Averses de pluie violentes",
  85: "Averses de neige faibles",
  86: "Averses de neige fortes",
  95: "Orage faible",
  96: "Orage avec grêle faible",
  99: "Orage avec grêle : faible ou forte",
};

export function getWeatherIcon(code: number): JSX.Element {
  switch (true) {
    case [0, 1].includes(code):
      return (
        <FontAwesome name="sun-o" size={24} color="rgba(255, 169, 77, 1)" />
      );
    case [2, 3].includes(code):
      return (
        <AntDesign name="cloudo" size={24} color="rgba(208, 201, 214, 1)" />
      );
    case [45, 48].includes(code):
      return (
        <MaterialCommunityIcons
          name="weather-fog"
          size={24}
          color="rgba(208, 201, 214, 1)"
        />
      );
    case [51, 53, 55, 56, 57].includes(code):
      return (
        <Feather
          name="cloud-drizzle"
          size={24}
          color="rgba(137, 207, 240, 1)"
        />
      );
    case [61, 63, 65, 66, 67, 80, 81, 82].includes(code):
      return (
        <Feather name="cloud-rain" size={24} color="rgba(137, 207, 240, 1)" />
      );
    case [71, 73, 75, 77, 85, 86].includes(code):
      return (
        <MaterialCommunityIcons
          name="weather-snowy-heavy"
          size={24}
          color="rgba(137, 207, 240, 1)"
        />
      );
    case [95, 96, 99].includes(code):
      return (
        <Ionicons
          name="thunderstorm-outline"
          size={24}
          color="rgba(255, 215, 0, 1)"
        />
      );
    default:
      return (
        <MaterialCommunityIcons
          name="weather-cloudy-clock"
          size={24}
          color="white"
        />
      );
  }
}

export function weatherCodeToDescription(code: number): string {
  return weatherCodeDescriptions[code] || "Code météo inconnu";
}
