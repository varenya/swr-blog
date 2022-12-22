import Head from "next/head";
import { useState } from "react";
import { CityDropDown } from "../src/components/Menu/Menu";
import { WeatherLoader } from "../src/components/Weather/Weather";

export default function Home() {
  const [city, selectedCity] = useState("london");
  function handleCity(city: string) {
    selectedCity(city);
  }
  return (
    <>
      <Head>
        <title>Weather Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col gap-8 justify-center items-center">
        <CityDropDown currentCity={city} handleCity={handleCity} />
        <WeatherLoader location={city} />
      </main>
    </>
  );
}
