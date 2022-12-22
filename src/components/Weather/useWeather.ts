import useSWR from "swr";
import { getWeatherInfo } from "../../services/weather-client";

import type { BasicWeatherInfo } from "../../services/weather-client";

type LoadData<DataType> =
  | { status: "success"; data: DataType }
  | { status: "loading" }
  | { status: "error"; error: Error };

function useWeather(location: string): LoadData<BasicWeatherInfo> {
  const { data, error } = useSWR(location, getWeatherInfo);
  if (error) {
    return { status: "error", error };
  }
  if (!data) {
    return { status: "loading" };
  }
  return { status: "success", data };
}

export { useWeather };
