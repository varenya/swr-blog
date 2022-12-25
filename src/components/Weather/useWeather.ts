import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { getWeatherInfo } from "../../services/weather-client";

import type { BasicWeatherInfo } from "../../services/weather-client";

type LoadData<DataType> =
  | { status: "success"; data: DataType }
  | { status: "loading" }
  | { status: "error"; error: Error };

function useWeather(location: string) {
  const { data, mutate } = useSWRImmutable(location, getWeatherInfo, {
    suspense: true,
  });
  return { data: data!, mutate };
}

export { useWeather };
