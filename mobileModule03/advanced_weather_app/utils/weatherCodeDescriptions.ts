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

export function weatherCodeToDescription(code: number): string {
  return weatherCodeDescriptions[code] || "Code météo inconnu";
}
