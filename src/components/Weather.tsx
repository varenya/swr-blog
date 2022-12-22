import { BasicWeatherInfo } from "../weather-client";
import { useWeather } from "./useWeather";
import React from "react";

type WeatherProps = {
  location: string;
};

function Weather({ weatherInfo }: { weatherInfo: BasicWeatherInfo }) {
  return (
    <div className="bg-white w-1/4 mx-auto rounded-lg p-4">
      <h1 className="text-2xl text-center">Weather</h1>
      <p>{weatherInfo.humidity}</p>
      <p>{weatherInfo.temperature}</p>
    </div>
  );
}

function WeatherLoader({ location }: WeatherProps) {
  const weatherData = useWeather(location);
  switch (weatherData.status) {
    case "error":
      return <h1>Error</h1>;
    case "loading":
      return <h1>Loading..</h1>;
    case "success":
      return <Weather weatherInfo={weatherData.data} />;
    default:
      const _exceptionCase: never = weatherData;
      return _exceptionCase;
  }
}

export { WeatherLoader };
