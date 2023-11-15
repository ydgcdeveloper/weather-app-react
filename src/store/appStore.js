import { create } from "zustand";

export const useAppStore = create((set) => ({
  city: "",
  setCity: (city) => set({ city }),
  fetchError: null,
  setFetchError: (fetchError) => set({ fetchError }),
  dataWeather: null,
  setDataWeather: (dataWeather) => set({ dataWeather }),
  isLoadingData: false,
  setIsLoadingData: (isLoadingData) => set({ isLoadingData }),
}));
