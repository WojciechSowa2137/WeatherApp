import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import splitCord from "../functions/splitCord";

async function getWeatherInfo(lat: string, lon: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );
    if (!response.ok) {
      throw new Error("Something is wrong with WeatherDetails fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something is wrong with WeatherDetails fetch");
  }
}

function useWeatherInfo() {
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { weatherId } = useParams();
  const cords = splitCord(weatherId);
  useEffect(() => {
    getWeatherInfo(cords[0], cords[1])
      .then((data) => {
        setInfo(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { info, isError, isLoading };
}
export default function WeatherDetails() {
  const { info, isError, isLoading } = useWeatherInfo();
  console.log(info);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Wersja robacza trza zmienić</p>}
      {!isLoading && !isError && (
        <div key={info.id}>
          <span>{info.name}</span>
          <span>{info.main.temp}°C</span>
          <span>{info.weather[0].description}</span>
          <span>
            {info.main.temp_min}°C TO {info.main.temp_max}°C
          </span>
          <span>Wind speed {info.wind.speed}m/s</span>
        </div>
      )}
    </>
  );
}
