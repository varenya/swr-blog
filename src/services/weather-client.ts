import { z } from "zod";
import { mockApiResponse } from "../mock-api";

const basicWeatherInfo = z.object({
  humidity: z.number(),
  temperature: z.number(),
});

const availableWeatherInfo = z
  .object({
    available: z.literal(1),
  })
  .merge(basicWeatherInfo);

const unavailableWeatherInfo = z.object({
  available: z.literal(0),
});

// https://zod.dev/?id=discriminated-unions
const weatherInfoResponse = z.discriminatedUnion("available", [
  availableWeatherInfo,
  unavailableWeatherInfo,
]);

type WeatherInfo = z.infer<typeof weatherInfoResponse>;
type BasicWeatherInfo = z.infer<typeof basicWeatherInfo>;

async function getWeatherInfo(location: string): Promise<BasicWeatherInfo> {
  const weatherResponse = await mockApiResponse(location);
  if (!weatherResponse.ok) {
    throw new Error(weatherResponse.statusText, { cause: "network" });
  }
  const weatherInfo = weatherInfoResponse.parse(await weatherResponse.json());
  if (weatherInfo.available === 0) {
    throw new Error("Weather information not available for this location", {
      cause: "unavailble",
    });
  }
  return {
    humidity: weatherInfo.humidity,
    temperature: weatherInfo.temperature,
  };
}

export { getWeatherInfo };

export type { WeatherInfo, BasicWeatherInfo };
