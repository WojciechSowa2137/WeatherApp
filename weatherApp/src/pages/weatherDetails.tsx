import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import splitCord from "../functions/splitCord";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

async function getWeatherInfo(lat: string, lon: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );
    if (!response.ok) {
      throw new Error("Something is wrong with WeatherDetails fetch");
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Something is wrong with WeatherDetails fetch");
  }
}

function useWeatherInfo() {
  const [info, setInfo] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { weatherId } = useParams<{ weatherId?: string }>();
  const cords = splitCord(weatherId || "");
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
      {isError && <p>Something went wrong</p>}
      {!isLoading && !isError && (
        <div key={info?.id}>
          <span>{info?.name}</span>
          <span>{info?.main.temp}°C</span>
          <span>{info?.weather[0].description}</span>
          <span>
            {info?.main.temp_min}°C TO {info?.main.temp_max}°C
          </span>
          <span>Wind speed {info?.wind.speed}m/s</span>
        </div>
      )}
    </>
  );
}
