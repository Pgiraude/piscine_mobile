import { CityInfos } from "@/type/city.type";
import { create } from "zustand";

type Store = {
  cityInfos: CityInfos | undefined;
  setCityInfos: (city: CityInfos | undefined) => void;
};

const useStore = create<Store>((set) => ({
  cityInfos: undefined,
  setCityInfos: (city: CityInfos | undefined) => set({ cityInfos: city }),
}));

export default useStore;
