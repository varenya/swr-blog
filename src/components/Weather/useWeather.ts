import useSWRImmutable from "swr/immutable";
import { getWeatherInfo } from "../../services/weather-client";

import type { BasicWeatherInfo } from "../../services/weather-client";

function useWeather(location: string) {
  const { data } = useSWRImmutable<BasicWeatherInfo>(location, getWeatherInfo, {
    suspense: true,
  });
  return data!;
}

export { useWeather };
