import { rest } from "msw";
import { WeatherInfo } from "../src/services/weather-client";

export const handlers = [
  rest.get("https://weatherapi/en/:location", (req, res, ctx) => {
    const location = req.params.location;
    if (location === "delhi") {
      return res(
        ctx.delay(2000),
        ctx.json<WeatherInfo>({ available: 1, humidity: 10, temperature: 30 })
      );
    } else if (location === "istanbul") {
      return res(ctx.status(500), ctx.json<WeatherInfo>({ available: 0 }));
    } else if (location === "london") {
      return res(
        ctx.delay(2000),
        ctx.json<WeatherInfo>({
          available: 1,
          humidity: 5,
          temperature: 20,
        })
      );
    }
  }),
];
