import { rest } from "msw";
import { WeatherInfo } from "../src/weather-client";

export const handlers = [
  rest.get<WeatherInfo>(
    "https://mockweatherapi.com/en/:location",
    (req, res, ctx) => {
      const location = req.params.location;
      if (location === "london") {
        return res(ctx.json({ available: 1, humidity: 5, temperature: 20 }));
      }
      return res(ctx.json({ available: 0 }));
    }
  ),
];
