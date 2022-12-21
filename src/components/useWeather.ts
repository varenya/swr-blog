import useSWR from "swr";
import { getWeatherInfo } from "../weather-client";

import type { BasicWeatherInfo } from "../weather-client";

type LoadData<DataType> =
  | { status: "success"; data: DataType }
  | { status: "loading" }
  | { status: "error"; error: Error };

function useWeather(location: string): LoadData<BasicWeatherInfo> {
  const { data, error, isLoading } = useSWR(location, getWeatherInfo);
  if (error) {
    return { status: "error", error };
  }
  if (isLoading || !data) {
    return { status: "loading" };
  }
  return { status: "success", data };
}

export { useWeather };
