import { City } from "@/hooks/useCityAutocomplete";
import { create } from "zustand";

type Store = {
  searchText: string;
  setSearchText: (text: string) => void;
  isGeoError: boolean;
  setIsGeoError: (val: boolean) => void;
  cityInfos: City | undefined;
  setCityInfos: (city: City | undefined) => void;
};

const useStore = create<Store>((set) => ({
  searchText: "",
  setSearchText: (text: string) => set({ searchText: text }),
  isGeoError: false,
  setIsGeoError: (val: boolean) => set({ isGeoError: val }),
  cityInfos: undefined,
  setCityInfos: (city: City | undefined) => set({ cityInfos: city }),
}));

export default useStore;
