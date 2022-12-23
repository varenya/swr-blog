import { z } from "zod";

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

function getWeatherUrl(location: string) {
  return `https://weatherapi/en/${location}`;
}

async function getWeatherInfo(location: string): Promise<BasicWeatherInfo> {
  const url = getWeatherUrl(location);
  const weatherResponse = await fetch(url);
  if (!weatherResponse.ok) {
    throw new Error(weatherResponse.statusText);
  }
  const weatherInfo = weatherInfoResponse.parse(await weatherResponse.json());
  if (weatherInfo.available === 0) {
    throw new Error("Weather information not available!");
  }
  return {
    humidity: weatherInfo.humidity,
    temperature: weatherInfo.temperature,
  };
}

export { getWeatherInfo, getWeatherUrl };

export type { WeatherInfo, BasicWeatherInfo };
