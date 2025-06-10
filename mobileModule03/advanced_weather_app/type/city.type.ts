export enum CityInfosStatusEnum {
  SUCCESS = "ok",
  NOT_FOUND = "La ville n'a pas été trouvé",
  API_ERROR = "La connexion est perdu. S'il vous plait checkez votre connexion internet",
  GEOLOCATION_ERROR = "La géolocalisation est perdu. Veuillez l'activer dans vos paramètres",
}

export type CityInfos = {
  data: City | undefined;
  status: CityInfosStatusEnum;
};

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
