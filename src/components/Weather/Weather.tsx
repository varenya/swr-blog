import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useWeather } from "./useWeather";
import { WeatherError } from "./WeatherError";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

type WeatherProps = {
  location: string;
};

function WeatherContentLoader() {
  return (
    <div className="bg-gray-100 w-1/4 mx-auto rounded-lg p-8">
      <header className="flex justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 -ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
          />
        </svg>
        <h1 className="text-4xl text-center">Weather</h1>
      </header>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Temperature
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 animate-bounce">
            .....
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Humidity
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 animate-bounce">
            ......
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Weather({ location }: { location: string }) {
  const weatherInfo = useWeather(location);
  return (
    <div className="bg-gray-100 w-1/4 mx-auto rounded-lg p-8">
      <header className="flex justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 -ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
          />
        </svg>
        <h1 className="text-4xl text-center">Weather</h1>
      </header>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Temperature
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {weatherInfo.temperature}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Humidity
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {weatherInfo.humidity}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function WeatherLoader({ location }: WeatherProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      FallbackComponent={WeatherError}
      resetKeys={[location]}
      onReset={reset}
    >
      <Suspense fallback={<WeatherContentLoader />}>
        <Weather location={location} />
      </Suspense>
    </ErrorBoundary>
  );
}

export { WeatherLoader };
