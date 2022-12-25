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
function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function mockApiResponse(location: string): Promise<Response> {
  switch (location) {
    case "london":
      return new Response(
        JSON.stringify({ available: 1, humidity: 5, temperature: 20 })
      );
    case "delhi":
      await delay(2000);
      return new Response(
        JSON.stringify({ available: 1, humidity: 10, temperature: 30 })
      );
    case "istanbul":
      return new Response(JSON.stringify({ available: 0 }), {
        status: 502,
        statusText: "Server timed out",
      });
    case "mumbai":
      return new Response(JSON.stringify({ available: 0 }));
    default:
      return new Response(JSON.stringify({ available: 0 }));
  }
}

async function getWeatherInfo(location: string): Promise<BasicWeatherInfo> {
  const weatherResponse = await mockApiResponse(location);
  if (!weatherResponse.ok) {
    throw new Error(weatherResponse.statusText);
  }
  const weatherInfo = weatherInfoResponse.parse(await weatherResponse.json());
  if (weatherInfo.available === 0) {
    throw new Error("Weather information not available for this location");
  }
  return {
    humidity: weatherInfo.humidity,
    temperature: weatherInfo.temperature,
  };
}

export { getWeatherInfo, getWeatherUrl };

export type { WeatherInfo, BasicWeatherInfo };
