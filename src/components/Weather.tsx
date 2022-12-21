import React from "react";
import { useWeather } from "./useWeather";

type WeatherProps = {
  location: string;
};

function Weather({ location }: WeatherProps) {
  const weatherData = useWeather(location);
  switch (weatherData.status) {
    case "error":
      return <h1>Error</h1>;
    case "loading":
      return <h1>Loading..</h1>;
    case "success":
      return (
        <div>
          <h1>Weather</h1>
          <p>{weatherData.data.humidity}</p>
          <p>{weatherData.data.temperature}</p>
        </div>
      );
    default:
      const _exceptionCase: never = weatherData;
      return _exceptionCase;
  }
}

export { Weather };
