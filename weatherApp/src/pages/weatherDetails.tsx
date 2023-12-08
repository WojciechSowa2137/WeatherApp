import { useState, useEffect } from "react";

async function getWeatherInfo(lat: string, lon: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const data = response.json();
  return data;
}

function useWeatherInfo() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    getWeatherInfo("44.34", "10.99").then((data) => {
      setInfo(data);
    });
  }, []);
  return { info };
}
export default function WeatherDetails() {
  const { info } = useWeatherInfo();
  console.log(info);
  return <div>Weather</div>;
}
