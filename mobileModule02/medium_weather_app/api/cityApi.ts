export const fetchCitiesByName = async (city: string) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=10&language=fr&format=json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données de géocodage");
  }
  const data = await response.json();
  return data.results;
};

export const fetchCityByCoordinate = async (
  longitude: number,
  latitude: number
) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(
    latitude
  )}&lon=${encodeURIComponent(longitude)}&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données de nominatim");
  }
  const data = await response.json();
  return data;
};
