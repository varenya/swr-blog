import { getWeatherInfo } from "../../services/weather-client";

import { useQuery } from "@tanstack/react-query";

function useWeather(location: string) {
  const { data } = useQuery({
    queryKey: [location],
    queryFn: async () => await getWeatherInfo(location),
    suspense: true,
    retry: false,
  });
  return data!;
}

export { useWeather };
